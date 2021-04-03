const {
    initial_permutation, 
    inverse_permutation, 
    substition_boxes, 
    permutation_tab, 
    expansion_table,
    pc1, pc2 } = require("./data");



// Function to do a circular left shift by 1
const shift_left_once = (key_chunk) => 
{  
    let shifted = "";  
    for(let i = 1; i < 28; i++) shifted += key_chunk[i];  
    shifted += key_chunk[0];   
    return shifted; 
} 

// Function to do a circular left shift by 2
const shift_left_twice = (key_chunk) => { 
    let shifted = ""; 
    for(let i = 0; i < 2; i++)
    { 
        for(let j = 1; j < 28; j++) shifted += key_chunk[j]; 
        shifted += key_chunk[0]; 
        key_chunk = shifted; 
        shifted = ""; 
    } 
    return key_chunk; 
}

// Function to convert a number in decimal to binary
const convertDecimalToBinary = (decimal) => {
	let binary = "";
    while(decimal !== 0) 
    {
		binary = (decimal % 2 === 0 ? "0" : "1") + binary; 
		decimal = decimal/2;
	}
	while(binary.length < 4) binary = "0" + binary;
    return binary;
}

// Function to convert a number in binary to decimal
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

// Function to generate keys
const generate_keys = (n) => {

    const key = "1010101010111011000010010001100000100111001101101100110011011101";

	// 1. Compressing the key using the PC1 table
	let perm_key = ""; 
	for(let i = 0; i < 56; i++) perm_key+= key[pc1[i]-1]; 

    console.log("PERM_KEY => ", perm_key);

	// 2. Dividing the result into two equal halves
	let left= perm_key.substr(0, 28); 
	let right= perm_key.substr(28, 56); 

	// Generating n keys

    let round_keys = [];

	for(let i = 0; i < n ; i++)
    { 
		// For rounds 1, 2, 9, 16 the key_chunks are shifted by one.
		if(i === 0 || i === 1 || i === 8 || i === 15)
        {
			left = shift_left_once(left); 
			right = shift_left_once(right);
		} 
		// For other rounds, the key_chunks are shifted by two
		else
        {
			left= shift_left_twice(left); 
			right= shift_left_twice(right);
		}
        // The chunks are combined
        let combined_key = left + right;
        let round_key = "";

        // Finally, the PC2 table is used to transpose the key bits
        for(let j = 0; j < 48; j++) round_key += combined_key[pc2[j]-1]; 

        round_keys.push(round_key);
	} 

	// console.log("GENERATED KEYS => ", round_keys);

    return round_keys;

}

// Function to compute xor between two strings
const Xor = (a, b) => {
	let res = ""; 
	let size = b.length;
	for(let i = 0; i < size; i++) (a[i] !== b[i]) ? (res += '1') : (res += '0');
	return res; 
} 

// Implementing the algorithm
const DES = (plainText, keys, n) => { 

	//1. Applying the initial permutation
  	let perm = ""; 
	for(let i = 0; i < 64; i++) perm += plainText[initial_permutation[i]-1]; 
	
	// 2. Dividing the result into two equal halves 
	let left = perm.substr(0, 32); 
	let right = perm.substr(32, 32);

	// The plain text is encrypted n times  
	for(let i = 0; i < n; i++) 
    { 
    	let right_expanded = ""; 

		// 3.1. The right half of the plain text is expanded
    	for(let j = 0; j < 48; j++) right_expanded += right[expansion_table[j]-1]; 
    
        // 3.3. The result is xored with a key
		let xored = Xor(keys[i], right_expanded);  
		let res = ""; 

		// 3.4. The result is divided into 8 equal parts and passed 
		// through 8 substitution boxes. After passing through a 
		// substituion box, each box is reduces from 6 to 4 bits.
		for(let j = 0; j < 8; j++)
        { 
			// Finding row and column indices to lookup the
			// substituition box
      		let row1 = xored.substr(j*6,1) + xored.substr(j*6 + 5,1);
      		let row = convertBinaryToDecimal(row1);
      		let col1 = xored.substr(j*6 + 1,1) + xored.substr(j*6 + 2,1) + xored.substr(j*6 + 3,1) + xored.substr(j*6 + 4,1);;
			let col = convertBinaryToDecimal(col1);
			let val = substition_boxes[j][row][col];
			res += convertDecimalToBinary(val);  
		} 

		// 3.5. Another permutation is applied
		let perm2 = ""; 
		for(let j = 0; j < 32; j++) perm2 += res[permutation_tab[j]-1]; 

		// 3.6. The result is xored with the left half
		xored = Xor(perm2, left);
		// 3.7. The left and the right parts of the plain text are swapped 
		left = xored; 
		if(i < (n-1))
        { 
			let temp = right;
			right = xored;
			left = temp;
		} 
		console.log("i => ", i);
	} 
	// 4. The halves of the plain text are applied
	let combined_text = left + right;   
	let ciphertext = ""; 

	// The inverse of the initial permuttaion is applied
	for(let i = 0; i < 64; i++) ciphertext += combined_text[inverse_permutation[i]-1]; 
	
	//And we finally get the cipher text
	return ciphertext; 
}

module.exports = {shift_left_once, shift_left_twice, generate_keys, Xor, DES};