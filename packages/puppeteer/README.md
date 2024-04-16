# @fetch-impl/puppeteer

User Configurable Fetch Implementation. Puppeteer adapter, supports fetch in real browser.

## Usage

```ts
import puppeteer from "puppeteer";
import { usePuppeteer } from "@fetch-impl/puppeteer";
import fetch from "@fetch-impl/fetcher";

// configure fetch to use puppeteer
usePuppeteer(puppeteer.launch());

// use fetch as usual
fetch("https://example.com").then(async (res) => {
    console.log(res.status, await res.text());
});
```

Note: The browser will not be closed automatically. You should close it manually when you are done with it.
