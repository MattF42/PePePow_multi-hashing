cmd_Release/obj.target/multihashing/fugue.o := cc '-DNODE_GYP_MODULE_NAME=multihashing' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DBUILDING_NODE_EXTENSION' -I/usr/include/nodejs/include/node -I/usr/include/nodejs/src -I/usr/include/nodejs/deps/openssl/config -I/usr/include/nodejs/deps/openssl/openssl/include -I/usr/include/nodejs/deps/uv/include -I/usr/include/nodejs/deps/zlib -I/usr/include/nodejs/deps/v8/include -I../crypto -I../../nan  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -fPIC -O3 -fno-omit-frame-pointer  -MMD -MF ./Release/.deps/Release/obj.target/multihashing/fugue.o.d.raw   -c -o Release/obj.target/multihashing/fugue.o ../fugue.c
Release/obj.target/multihashing/fugue.o: ../fugue.c ../fugue.h \
 ../sha3/sph_fugue.h ../sha3/sph_types.h
../fugue.c:
../fugue.h:
../sha3/sph_fugue.h:
../sha3/sph_types.h:
