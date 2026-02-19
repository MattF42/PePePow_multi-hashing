node-multi-hashing
===============

[![Build Status](https://travis-ci.org/zone117x/node-multi-hashing.png?branch=master)](https://travis-ci.org/zone117x/node-multi-hashing)

[![NPM](https://nodei.co/npm/multi-hashing.png?downloads=true&stars=true)](https://nodei.co/npm/multi-hashing/)

Cryptocurrency hashing functions for node.js.


Algorithms
----------
* quark
* x11
* x13
* nist5
* scrypt
* scryptn
* scryptjane
* keccak
* bcrypt
* skein
* groestl
* blake
* fugue
* qubit
* hefty1
* shavite3
* cryptonight
* boolberry
* sha256d
* lbry
* yespower
* lyra2re2
* memehash
* xelisv2
* hoohashv110


Usage
-----

Install

```bash
npm install multi-hashing
```

So far this native Node.js addon can do the following hashing algos

```javascript
var multiHashing = require('multi-hashing');

var algorithms = ['quark', 'x11', 'scrypt', 'scryptn', 'scryptjane', 'keccak', 'bcrypt', 'skein', 'blake', 'yescrypt-0.5', 'yespower', 'lyra2re2'];

var data = new Buffer("7000000001e980924e4e1109230383e66d62945ff8e749903bea4336755c00000000000051928aff1b4d72416173a8c3948159a09a73ac3bb556aa6bfbcad1a85da7f4c1d13350531e24031b939b9e2b", "hex");

var hashedData = algorithms.map(function(algo){
    if (algo === 'scryptjane'){
        //scryptjane needs block.nTime and nChainStartTime (found in coin source)
        var yaCoinChainStartTime = 1367991200;
        var nTime = Math.round(Date.now() / 1000);
        return multiHashing[algo](data, nTime, yaCoinChainStartTime);
    }
    else{
        return multiHashing[algo](data);
    }
});


console.log(hashedData);
//<SlowBuffer 0b de 16 ef 2d 92 e4 35 65 c6 6c d8 92 d9 66 b4 3d 65 ..... >


```

### HoohashV110 Usage

HoohashV110 requires exactly 80 bytes of input (Bitcoin block header format):

```javascript
var multiHashing = require('multi-hashing');

// 80-byte block header
var blockHeader = Buffer.from("7000000001e980924e4e1109230383e66d62945ff8e749903bea4336755c00000000000051928aff1b4d72416173a8c3948159a09a73ac3bb556aa6bfbcad1a85da7f4c1d13350531e24031b939b9e2b", "hex");

var hash = multiHashing.hoohashv110(blockHeader);
console.log(hash); // 32-byte hash output
```

### Algorithm Selection for Pool Software

When implementing pool software, algorithm selection should be based on block version bits:

- **HoohashV110**: Use when block version has bit `0x4000` set (version & 0x4000 == 0x4000)
- **XelisV2**: Use when block version has bit `0x8000` set (version & 0x8000 == 0x8000)
- **Default algorithm**: Use for other block versions as specified by the coin

Example algorithm selection logic:

```javascript
function selectHashAlgorithm(blockVersion) {
    if (blockVersion & 0x4000) {
        return 'hoohashv110';
    } else if (blockVersion & 0x8000) {
        return 'xelisv2';
    } else {
        return 'default'; // or other configured algorithm
    }
}
```

Credits
-------
* [NSA](http://www.nsa.gov/) and [NIST](http://www.nist.gov/) for creation or sponsoring creation of SHA2 and SHA3 algos
* [Keccak](http://en.wikipedia.org/wiki/Keccak) - Guido Bertoni, Joan Daemen, Michaël Peeters, and Gilles Van Assche
* [Skein](http://en.wikipedia.org/wiki/Skein_(hash_function)) - Bruce Schneier, Stefan Lucks, Niels Ferguson, Doug Whiting, Mihir Bellare, Tadayoshi Kohno, Jon Callas and Jesse Walker.
* [BLAKE](http://en.wikipedia.org/wiki/BLAKE_(hash_function)) - Jean-Philippe Aumasson, Luca Henzen, Willi Meier, and Raphael C.-W. Phan
* [Grøstl](http://en.wikipedia.org/wiki/Gr%C3%B8stl) - Praveen Gauravaram, Lars Knudsen, Krystian Matusiewicz, Florian Mendel, Christian Rechberger, Martin Schläffer, and Søren S. Thomsen
* [JH](http://en.wikipedia.org/wiki/JH_(hash_function)) - Hongjun Wu
* [Fugue](http://en.wikipedia.org/wiki/Fugue_(hash_function)) - Shai Halevi, William E. Hall, and Charanjit S. Jutla
* [scrypt](http://en.wikipedia.org/wiki/Scrypt) - Colin Percival
* [bcrypt](http://en.wikipedia.org/wiki/Bcrypt) - Niels Provos and David Mazières
* [X11](http://www.darkcoin.io/), [Hefty1](http://heavycoin.github.io/about.html), [Quark](http://www.qrk.cc/) creators (they just mixed together a bunch of the above algos)
