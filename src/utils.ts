export function debounce<T extends (...args: never) => never>(cb: T, wait: number = 100) {
	let h: number;
	type parameters = Parameters<T>;
	const callBack = cb as unknown as (...args: parameters) => void;
	const callable = (...args: parameters) => {
		clearTimeout(h);
		h = setTimeout(() => callBack(...args), wait);
	};
	return callable as (...args: Parameters<T>) => void;
}

export function tryParseInt(str: string | null | undefined, fallback: number) {
	const val = Number(str);
	// Check if the string is a valid number.
	if (isNaN(val)) {
		// If the string is not a valid number, return the fallback value, truncated to an integer.
		return Math.trunc(fallback);
	}

	// If the string is a valid number, return the parsed number truncated to an integer.
	return Math.trunc(val);
}

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}