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
