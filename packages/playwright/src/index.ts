import { fetch as f, fetcher } from "@fetch-impl/fetcher";
import debug from "debug";
import type { Browser } from "playwright-core";

export const log = debug("fetch:playwright");

/**
 * Configures the `fetch` implementation to use Playwright for making HTTP requests.
 *
 * @param _browser - The Playwright browser instance or a promise that resolves to a browser instance.
 * @param instance - The fetcher instance to configure.
 */
export function usePlaywright(_browser: Browser | Promise<Browser>, instance = fetcher): void {
	let idx = 0;
	const _context = (async () => _browser)().then((browser) => browser.newContext());

	instance.set(async (...args) => {
		const i = idx++;
		const url = args[0].toString();
		log("Fetching", i, url, args[1]);

		const context = await _context;
		const page = await context.newPage();
		await page.goto(url);

		const res = await page.evaluate(async (args) => {
			/* c8 ignore next 11 */
			// v8 coverage is not working for code running in browser
			const res = await fetch(...args);
			const body = Array.from(await res.arrayBuffer().then((buf) => new Uint32Array(buf)));

			return {
				body: body,
				status: res.status,
				statusText: res.statusText,
				// @ts-ignore headers is iterable in browser
				headers: Object.fromEntries(res.headers),
			};
		}, args);
		log("Fetched", i, res.status, res.statusText, res.headers, res.body.length, "bytes");
		const body = new Uint32Array(res.body).buffer;

		page.close().catch(() => log("Failed to close page", i));
		return new Response(body, res);
	});
}

export * from "@fetch-impl/fetcher";
export default f;
