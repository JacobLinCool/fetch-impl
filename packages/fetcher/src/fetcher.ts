/**
 * User Configurable Fetch Implementation.
 */
export class Fetcher {
	fetch = globalThis.fetch;

	/**
	 * Sets the fetch function to be used.
	 * @param f - The fetch function to set.
	 */
	public set(f: typeof fetch): void {
		this.fetch = f;
	}
}

/**
 * The fetcher instance used for making HTTP requests.
 */
export const fetcher = new Fetcher();

/**
 * The shorthand fetch function.
 */
const _fetch = (...args: Parameters<typeof fetch>): ReturnType<typeof fetch> =>
	fetcher.fetch(...args);

export default _fetch;
export { _fetch as fetch };
