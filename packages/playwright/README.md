# @fetch-impl/playwright

User Configurable Fetch Implementation. Playwright adapter, supports fetch in real browser (chromium, firefox, webkit).

## Usage

```ts
import { chromium } from "playwright";
import { usePlaywright } from "@fetch-impl/playwright";
import fetch from "@fetch-impl/fetcher";

// configure fetch to use playwright
usePlaywright(chromium.launch());

// use fetch as usual
fetch("https://example.com").then(async (res) => {
    console.log(res.status, await res.text());
});
```

Note: A new context is automatically created and reused for all fetch requests. The browser will not be closed automatically. You should close it manually when you are done with it.
