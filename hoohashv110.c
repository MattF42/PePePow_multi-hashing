#include "hoohashv110.h"
#include "crypto/hoohash/hoohash.h"
#include <string.h>

void hoohashv110_hash(const char* input, char* output, uint32_t len)
{
    hoohashv110(input, len, (uint8_t*)output);
}
