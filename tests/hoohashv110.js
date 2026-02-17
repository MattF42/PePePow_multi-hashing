const multiHashing = require('../build/Release/multihashing')
const assert = require('assert')

// Test 1: Valid 80-byte block header
console.log('Test 1: Valid 80-byte block header')
try {
    var blockHeader = Buffer.from("7000000001e980924e4e1109230383e66d62945ff8e749903bea4336755c00000000000051928aff1b4d72416173a8c3948159a09a73ac3bb556aa6bfbcad1a85da7f4c1d13350531e24031b939b9e2b", "hex");
    console.log('Input length:', blockHeader.length);
    
    var hash = multiHashing.hoohashv110(blockHeader);
    console.log('Output hash:', hash.toString('hex'));
    console.log('Output length:', hash.length);
    
    assert.equal(hash.length, 32, 'Hash should be 32 bytes');
    console.log('✓ Test 1 passed\n');
} catch (e) {
    console.error('✗ Test 1 failed:', e.message);
    process.exit(1);
}

// Test 2: Invalid input length (should throw error)
console.log('Test 2: Invalid input length (should throw error)')
try {
    var shortInput = Buffer.from("7000000001e980924e4e1109230383e66d62945ff8e749903bea433", "hex");
    console.log('Input length:', shortInput.length);
    
    var hash = multiHashing.hoohashv110(shortInput);
    console.error('✗ Test 2 failed: Should have thrown an error for invalid input length');
    process.exit(1);
} catch (e) {
    console.log('Got expected error:', e.message);
    assert(e.message.includes('80 bytes'), 'Error message should mention 80 bytes requirement');
    console.log('✓ Test 2 passed\n');
}

// Test 3: Another valid 80-byte block header (different values)
console.log('Test 3: Another valid 80-byte block header')
try {
    // Create a different 80-byte header
    var blockHeader2 = Buffer.alloc(80);
    blockHeader2.writeUInt32LE(1, 0);  // version
    blockHeader2.fill(0xaa, 4, 36);    // prev block hash
    blockHeader2.fill(0xbb, 36, 68);   // merkle root
    blockHeader2.writeUInt32LE(Date.now() / 1000, 68); // timestamp
    blockHeader2.writeUInt32LE(0x1d00ffff, 72);        // bits
    blockHeader2.writeUInt32LE(12345, 76);             // nonce
    
    console.log('Input length:', blockHeader2.length);
    
    var hash2 = multiHashing.hoohashv110(blockHeader2);
    console.log('Output hash:', hash2.toString('hex'));
    console.log('Output length:', hash2.length);
    
    assert.equal(hash2.length, 32, 'Hash should be 32 bytes');
    console.log('✓ Test 3 passed\n');
} catch (e) {
    console.error('✗ Test 3 failed:', e.message);
    process.exit(1);
}

// Test 4: Deterministic output (same input should give same output)
console.log('Test 4: Deterministic output check')
try {
    var testInput = Buffer.alloc(80);
    testInput.fill(0x42);
    
    var hash1 = multiHashing.hoohashv110(testInput);
    var hash2 = multiHashing.hoohashv110(testInput);
    
    assert.deepEqual(hash1, hash2, 'Same input should produce same output');
    console.log('Hash 1:', hash1.toString('hex'));
    console.log('Hash 2:', hash2.toString('hex'));
    console.log('✓ Test 4 passed\n');
} catch (e) {
    console.error('✗ Test 4 failed:', e.message);
    process.exit(1);
}

// Test 5: Different nonces should produce different hashes
console.log('Test 5: Different nonces produce different hashes')
try {
    var header1 = Buffer.alloc(80);
    header1.fill(0x42);
    header1.writeUInt32LE(1000, 76); // nonce at offset 76
    
    var header2 = Buffer.alloc(80);
    header2.fill(0x42);
    header2.writeUInt32LE(2000, 76); // different nonce
    
    var hash1 = multiHashing.hoohashv110(header1);
    var hash2 = multiHashing.hoohashv110(header2);
    
    assert(!hash1.equals(hash2), 'Different nonces should produce different hashes');
    console.log('Hash 1 (nonce=1000):', hash1.toString('hex'));
    console.log('Hash 2 (nonce=2000):', hash2.toString('hex'));
    console.log('✓ Test 5 passed\n');
} catch (e) {
    console.error('✗ Test 5 failed:', e.message);
    process.exit(1);
}

console.log('All tests passed! ✓');
