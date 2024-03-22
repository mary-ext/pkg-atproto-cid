# atproto-cid

[View on JSR](https://jsr.io/@mary/atproto-cid)\
[Source code](https://codeberg.org/mary-ext/pkg-atproto-cid)

Bare minimum implementation for creating, parsing and formatting AT Protocol-blessed CIDv1 format.

```ts
// Parsing a CID string
parse('bafyreihffx5a2e7k5uwrmmgofbvzujc5cmw5h4espouwuxt3liqoflx3ee');
// -> { version: 1, code: 113, digest: { ... }, bytes: Uint8Array(36) }

// Creating a CID containing CBOR data
const cid = await create(0x71, buffer);

// Serializing CID into string
format(cid); // -> bafyrei...
```
