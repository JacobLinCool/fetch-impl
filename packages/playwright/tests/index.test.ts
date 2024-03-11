import fetch, { Fetcher } from "@fetch-impl/fetcher";
import { chromium, firefox, webkit } from "playwright";
import { describe, expect, test } from "vitest";
import { usePlaywright } from "../src";

const TARGET_URL = "https://example.com/";
const TIMEOUT = 30_000;

describe("playwright", () => {
	test("chromium", { timeout: TIMEOUT }, async () => {
		usePlaywright(chromium.launch());
		const our = await fetch(TARGET_URL).then((res) => res.text());
		const glb = await globalThis.fetch(TARGET_URL).then((res) => res.text());
		expect(our).toBe(glb);
	});

	test("firefox", { timeout: TIMEOUT }, async () => {
		usePlaywright(firefox.launch());
		const our = await fetch(TARGET_URL).then((res) => res.text());
		const glb = await globalThis.fetch(TARGET_URL).then((res) => res.text());
		expect(our).toBe(glb);
	});

	test("webkit", { timeout: TIMEOUT }, async () => {
		usePlaywright(webkit.launch());
		const our = await fetch(TARGET_URL).then((res) => res.text());
		const glb = await globalThis.fetch(TARGET_URL).then((res) => res.text());
		expect(our).toBe(glb);
	});

	test("local fetcher", { timeout: TIMEOUT }, async () => {
		const fetcher = new Fetcher();
		usePlaywright(chromium.launch(), fetcher);
		const our = await fetcher.fetch(TARGET_URL).then((res) => res.text());
		const glb = await globalThis.fetch(TARGET_URL).then((res) => res.text());
		expect(our).toBe(glb);
	});
});
