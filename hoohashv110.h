#ifndef HOOHASHV110_H
#define HOOHASHV110_H

#ifdef __cplusplus
extern "C" {
#endif

#include <stdint.h>

void hoohashv110_hash(const char* input, char* output, uint32_t len);

#ifdef __cplusplus
}
#endif

#endif
