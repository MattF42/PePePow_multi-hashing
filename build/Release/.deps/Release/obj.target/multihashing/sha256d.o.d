cmd_Release/obj.target/multihashing/sha256d.o := cc '-DNODE_GYP_MODULE_NAME=multihashing' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DBUILDING_NODE_EXTENSION' -I/usr/include/nodejs/include/node -I/usr/include/nodejs/src -I/usr/include/nodejs/deps/openssl/config -I/usr/include/nodejs/deps/openssl/openssl/include -I/usr/include/nodejs/deps/uv/include -I/usr/include/nodejs/deps/zlib -I/usr/include/nodejs/deps/v8/include -I../crypto -I../../nan  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -fPIC -O3 -fno-omit-frame-pointer  -MMD -MF ./Release/.deps/Release/obj.target/multihashing/sha256d.o.d.raw   -c -o Release/obj.target/multihashing/sha256d.o ../sha256d.c
Release/obj.target/multihashing/sha256d.o: ../sha256d.c ../sha256d.h \
 ../sha3/sph_sha2.h ../sha3/sph_types.h
../sha256d.c:
../sha256d.h:
../sha3/sph_sha2.h:
../sha3/sph_types.h:
