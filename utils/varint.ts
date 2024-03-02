const MSB = 0x80;
const REST = 0x7f;
const MSBALL = ~REST;
const INT = 2 ** 31;

export const encode = (num: number, buf: Uint8Array, offset = 0): [buf: Uint8Array, written: number] => {
	if (num > Number.MAX_SAFE_INTEGER) {
		throw new RangeError('Could not encode varint');
	}

	const start = offset;

	while (num >= INT) {
		buf[offset++] = (num & 0xff) | MSB;
		num /= 128;
	}

	while (num & MSBALL) {
		buf[offset++] = (num & 0xff) | MSB;
		num >>>= 7;
	}

	buf[offset] = num | 0;
	return [buf, offset - start + 1];
};

export const decode = (buf: Uint8Array, offset = 0): [num: number, read: number] => {
	// deno-lint-ignore prefer-const
	let l = buf.length;

	let res = 0;
	let shift = 0;
	let counter = offset;
	let b: number;

	do {
		if (counter >= l) {
			throw new RangeError('Could not decode varint');
		}

		b = buf[counter++];
		res += shift < 28 ? (b & REST) << shift : (b & REST) * Math.pow(2, shift);
		shift += 7;
	} while (b >= MSB);

	return [res, counter - offset];
};

const N1 = 2 ** 7;
const N2 = 2 ** 14;
const N3 = 2 ** 21;
const N4 = 2 ** 28;
const N5 = 2 ** 35;
const N6 = 2 ** 42;
const N7 = 2 ** 49;
const N8 = 2 ** 56;
const N9 = 2 ** 63;

export const encodingLength = (value: number): number => {
	return value < N1
		? 1
		: value < N2
		? 2
		: value < N3
		? 3
		: value < N4
		? 4
		: value < N5
		? 5
		: value < N6
		? 6
		: value < N7
		? 7
		: value < N8
		? 8
		: value < N9
		? 9
		: 10;
};
