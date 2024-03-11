# User Configurable Fetch Implementation

Can be used as a global fetch implementation or as a local fetch implementation specific to a package.

## Adapters

-   [@fetch-impl/cross-fetch](https://www.npmjs.com/package/@fetch-impl/cross-fetch) - Use [cross-fetch](https://www.npmjs.com/package/cross-fetch) as the fetch implementation.
-   [@fetch-impl/playwright](https://www.npmjs.com/package/@fetch-impl/playwright) - Use [playwright](https://www.npmjs.com/package/playwright) browser as the fetch implementation.

## Usage

The default fetch implementation is `globalThis.fetch`. Which works in almost all modern environments (browsers, Node.js, Deno, Cloudflare Workers, etc).

```ts
import fetch from "@fetch-impl/fetcher";

// use fetch as usual
fetch("https://example.com").then(async (res) => {
    console.log(res.status, await res.text());
});
```

You can replace the default fetch implementation with a custom one using `fetcher.set`:

```ts
import fetch, { fetcher } from "@fetch-impl/fetcher";

// configure fetch to use a custom fetch implementation
fetcher.set(async (...args) => {
    return new Response("Hello, World!", { status: 200 });
});

// use fetch as usual, but it will use the custom fetch implementation and always return "Hello, World!"
fetch("https://example.com").then(async (res) => {
    console.log(res.status, await res.text());
});
```

If you are a package author and want to let your users configure the fetch implementation, you can use `Fetcher` to create a configurable local fetch implementation:

```ts
// add a fetch.ts file like this to your package
import { Fetcher } from "@fetch-impl/fetcher";

export const fetcher = new Fetcher();
export const fetch = (...args) => fetcher.fetch(...args);
export default fetch;
```

```ts
// and use your own fetch implementation like this
import fetch from "./fetch";

// use fetch as usual
export async function makeRequest(url: string): Promise<string> {
    const res = await fetch(url);
    return res.text();
}

// don't forget to re-export the fetcher instance so that your users can configure the fetch implementation
export * from "./fetch";
```

Your users can then configure the fetch implementation like this:

```ts
import { makeRequest, fetcher } from "your-package";
import { useCrossFetch } from "@fetch-impl/cross-fetch";

// user configure fetch to use a custom fetch implementation
useCrossFetch(fetcher);

// user use makeRequest as usual, but it will use the custom fetch implementation
makeRequest("https://example.com").then((text) => {
    console.log(text);
});
```
