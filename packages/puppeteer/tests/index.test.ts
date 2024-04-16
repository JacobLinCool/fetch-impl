import fetch, { Fetcher } from "@fetch-impl/fetcher";
import puppeteer from "puppeteer";
import { describe, expect, test } from "vitest";
import { usePuppeteer } from "../src";

const TARGET_URL = "https://example.com/";
const TIMEOUT = 30_000;

describe("puppeteer", () => {
	test("global fetcher", { timeout: TIMEOUT }, async () => {
		usePuppeteer(puppeteer.launch());
		const our = await fetch(TARGET_URL).then((res) => res.text());
		const glb = await globalThis.fetch(TARGET_URL).then((res) => res.text());
		expect(our).toBe(glb);
	});

	test("local fetcher", { timeout: TIMEOUT }, async () => {
		const fetcher = new Fetcher();
		usePuppeteer(puppeteer.launch(), fetcher);
		const our = await fetcher.fetch(TARGET_URL).then((res) => res.text());
		const glb = await globalThis.fetch(TARGET_URL).then((res) => res.text());
		expect(our).toBe(glb);
	});
});
