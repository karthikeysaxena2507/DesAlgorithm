const { pc1_32,
    pc1_64, pc1_128, pc2_32, pc2_64, pc2_128,
	init_perm_32, init_perm_64, init_perm_128, inv_perm_32,
	inv_perm_64, inv_perm_128, exp_table_128, exp_table_32,
	exp_table_64, s_boxes_32, s_boxes_64, s_boxes_128,
	perm_tab_128, perm_tab_32, perm_tab_64 } = require("./data");

// FUNCTION TO PERFORM CIRCULAR LEFT SHIFT BY 1
const shift_left_once = (key_chunk, num) => 
{  
    let shifted = "";  
    for(let i = 1; i < num; i++) shifted += key_chunk[i];  
    shifted += key_chunk[0];   
    return shifted; 
} 

// FUNCTION TO PERFORM CIRCULAR LEFT SHIFT BY 2
const shift_left_twice = (key_chunk, num) => { 
    let shifted = ""; 
    for(let i = 0; i < 2; i++)
    { 
        for(let j = 1; j < num; j++) shifted += key_chunk[j]; 
        shifted += key_chunk[0]; 
        key_chunk = shifted; 
        shifted = ""; 
    } 
    return key_chunk; 
}

// FUNCTION TO CONVERT A NUMBER FROM DECIMAL TO BINARY
const convertDecimalToBinary = (decimal) => {
	let binary = "";
    while(decimal !== 0) 
    {
		binary = (decimal % 2 === 0 ? "0" : "1") + binary; 
		decimal = Math.floor(decimal/2);
	}
	while(binary.length < 4) binary = "0" + binary;
    return binary;
}

// FUNCTION TO CONVERT A BINARY NUMBER TO DECIMAL
const convertBinaryToDecimal = (binary) => {
    let decimal = 0;
	let counter = 0;
	let size = binary.length;
	for(let i = size-1; i >= 0; i--)
	{
    	if(binary[i] === '1') decimal += Math.pow(2, counter);
        counter++;
	}
	return decimal;
}

// FUNCTION TO CALCULATE XOR OF 2 STRINGS
const Xor = (a, b) => {
	let res = ""; 
	let size = b.length;
	for(let i = 0; i < size; i++) (a[i] !== b[i]) ? (res += '1') : (res += '0');
	return res; 
}

// FUNCTION TO GENERATE KEYS
const generate_keys = (n, len, weak_key, main_key) => {

	let key;
	if(weak_key !== "") key = weak_key;
	else key = main_key;

	let pc1, pc2, key_limit, key_length;
    if(len === 32) 
	{
		pc1 = pc1_32;
		pc2 = pc2_32;
		key_limit = 28;
		key_length = 24;
	}

	else if(len === 64) 
	{
		pc1 = pc1_64;
		pc2 = pc2_64;
		key_limit = 56;
		key_length = 48;
	}

	else if(len === 128)
	{
		pc1 = pc1_128;
		pc2 = pc2_128;
		key_limit = 112;
		key_length = 96;
	}

	/**
	 * 1. COMPRESSING THE KEY USING PC1 TABLE
	 */
	let perm_key = ""; 
	for(let i = 0; i < key_limit; i++) perm_key += key[pc1[i]-1]; 

	/**
	 * 2. DIVIDING THE RESULT IN 2 EQUAL HALVES
	 */
	let left= perm_key.substr(0, (key_limit/2)); 
	let right= perm_key.substr((key_limit/2), key_limit); 

	/**
	 * 3. GENERATING N KEYS
	 */
    let round_keys = [];

	for(let i = 0; i < n ; i++)
    { 
		// FOR ROUNDS 1, 2, 9, 16 THE KEY PARTS ARE SHIFTED BY ONE
		if(i === 0 || i === 1 || i === 8 || i === 15)
        {
			left = shift_left_once(left, (key_limit/2)); 
			right = shift_left_once(right, (key_limit/2));
		} 
		// FOR OTHER, KEY PARTS ARE SHIFTED BY TWO
		else
        {
			left= shift_left_twice(left, (key_limit/2)); 
			right= shift_left_twice(right, (key_limit/2));
		}
        // COMBINING THE CHUNKS
        let combined_key = left + right;
        let round_key = "";

        // USING PC2 TABLE TO TRANSPOSE THE BITS
        for(let j = 0; j < key_length; j++) round_key += combined_key[pc2[j]-1]; 

        round_keys.push(round_key);
	} 

    return round_keys;

}

// IMPLEMENTING THE ALGORITHM
const DES = (plainText, keys, n, len) => { 

	let init_perm, inv_perm, exp_table, perm_tab, key_length, s_boxes, width;

	if(len === 32) 
	{
		init_perm = init_perm_32;
		inv_perm = inv_perm_32;
		exp_table = exp_table_32;
		perm_tab = perm_tab_32;
		s_boxes = s_boxes_32;
		key_length = 24;
		width = 4;
	}

	else if(len === 64) 
	{
		init_perm = init_perm_64;
		inv_perm = inv_perm_64;
		exp_table = exp_table_64;
		perm_tab = perm_tab_64;
		s_boxes = s_boxes_64;
		key_length = 48;
		width = 8;
	}

	else if(len === 128)
	{
		init_perm = init_perm_128;
		inv_perm = inv_perm_128;
		exp_table = exp_table_128;
		perm_tab = perm_tab_128;
		s_boxes = s_boxes_128;
		key_length = 96;
		width = 16;
	}

	/**
	 * 1. APPLYING THE INITIAL PERMUTATION
	 */
  	let perm = ""; 
	for(let i = 0; i < len; i++) perm += plainText[init_perm[i]-1]; 

	/**
	 * 2. DIVIDING THE RESULT INTO 2 EQUAL HALVES
	 */
	let left = perm.substr(0, (len/2)); 
	let right = perm.substr((len/2), (len/2));

	/**
	 * 3. ENCRYPTING THE PLAIN TEXT N TIMES
	 */
	for(let i = 0; i < n; i++) 
    { 
    	let right_expanded = ""; 

		/**
		 * 3.1 EXPANDING THE RIGHT HALF OF THE TEXT
		 */
    	for(let j = 0; j < key_length; j++) right_expanded += right[exp_table[j]-1]; 
    
        /**
		 * 3.2 THE RESULT IS XORED WITH THE ROUND KEY
		 */
		let xored = Xor(keys[i], right_expanded);  
		let res = ""; 

		// /**
		//  *  3.4. The result is divided into equal parts and passed 
		//  *	through substitution boxes. After passing through a 
		//  *	substituion box, each box is reduces equal number of bits.
		//  */
		for (let i = 0; i < width; i++) 
		{
			// Finding row and column indices to lookup the
			// substituition box
			let row1 = xored.substr(i * 6, 1) + xored.substr(i * 6 + 5, 1);
			let row = convertBinaryToDecimal(row1);
			let col1 = xored.substr(i * 6 + 1, 4);
			let col = convertBinaryToDecimal(col1);
			let val = s_boxes[(i%8)][row][col];
			res += convertDecimalToBinary(val);
		}
		
		// 3.5. ANOTHER PERMUTATION IS APPLIED
		let perm2 = ""; 
		for(let j = 0; j < (len/2); j++) perm2 += res[perm_tab[j]-1]; 

		// 3.6. THE RESULT IS XORED WITH THE LEFT HALF
		xored = Xor(perm2, left);

		// 3.7. SWAPPING THE LEFT AND RIGHT PARTS OF PLAIN TEXT
		left = xored; 
		if(i < (n-1))
        { 
			let temp = right;
			right = xored;
			left = temp;
		} 
	} 

	/**
	 *  4. COMBINIG THE HALVES OF PLAIN TEXT
	 */
	let combined_text = left + right;   
	let ciphertext = ""; 

	/**
	 * 5. APPLYING INVERSE OF PERMUTATION
	 */
	for(let i = 0; i < len; i++) ciphertext += combined_text[inv_perm[i]-1]; 
	
	/**
	 * RETURNING THE CIPHER TEXT
	 */
	return ciphertext; 
}

module.exports = {shift_left_once, shift_left_twice, Xor, generate_keys, DES};