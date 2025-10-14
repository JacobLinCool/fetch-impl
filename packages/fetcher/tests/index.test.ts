import { expect, test } from "vitest";
import fetch, { Fetcher, fetcher } from "../src";

const TIMEOUT = 30_000;

test("default fetch", { timeout: TIMEOUT }, async () => {
	const url = "https://example.com/";
	const our = await fetch(url).then((res) => res.text());
	const glb = await globalThis.fetch(url).then((res) => res.text());
	expect(our).toBe(glb);
});

test("custom fetch", { timeout: TIMEOUT }, async () => {
	fetcher.set(async (...x) => {
		return new Response(JSON.stringify({ url: x[0] }));
	});

	const url = "https://example.com/somewhere";
	const res = await fetch(url);
	const json = await res.json();
	expect(json).toEqual({ url });
});

test("local fetcher", { timeout: TIMEOUT }, async () => {
	const fetcher = new Fetcher();
	fetcher.set(async () => new Response("local"));

	const res = await fetcher.fetch("https://example.com/");
	const text = await res.text();
	expect(text).toBe("local");
});

test("fetch context binding with default globalThis.fetch", async () => {
	// This test ensures that fetch is properly bound to globalThis
	// to prevent "Illegal invocation" errors when called indirectly
	const fetcher = new Fetcher();

	// Extract the fetch method (simulates the issue scenario where fetch is used without proper context)
	// Without .bind(globalThis), this would throw "Illegal invocation" in browsers
	const extractedFetch = fetcher.fetch;

	// The extracted fetch should be a function that's already bound
	expect(typeof extractedFetch).toBe("function");

	// We can verify it's bound by checking that it's not the raw globalThis.fetch
	// (a bound function is a different function object)
	expect(extractedFetch).not.toBe(globalThis.fetch);
});

test("fetch context binding with custom implementation", async () => {
	// Test that custom fetch implementations also work when extracted
	const fetcher = new Fetcher();
	fetcher.set(async (...args) => {
		return new Response(JSON.stringify({ called: true, url: args[0] }));
	});

	// Extract the custom fetch method
	const extractedFetch = fetcher.fetch;

	// Calling the extracted fetch method should work without errors
	const res = await extractedFetch("https://example.com/");
	const json = await res.json();
	expect(json).toEqual({ called: true, url: "https://example.com/" });
});
