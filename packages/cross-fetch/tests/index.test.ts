import { Fetcher, fetcher } from "@fetch-impl/fetcher";
import cfetch from "cross-fetch";
import { describe, expect, test } from "vitest";
import { useCrossFetch } from "../src";

describe("cross-fetch", () => {
	test("global fetcher", () => {
		expect(fetcher.fetch).not.toBe(cfetch);
		useCrossFetch();
		expect(fetcher.fetch).toBe(cfetch);
	});

	test("local fetcher", async () => {
		const fetcher = new Fetcher();
		expect(fetcher.fetch).not.toBe(cfetch);
		useCrossFetch(fetcher);
		expect(fetcher.fetch).toBe(cfetch);
	});
});
