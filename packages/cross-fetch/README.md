# @fetch-impl/cross-fetch

User Configurable Fetch Implementation. cross-fetch adapter.

## Usage

```ts
import { useCrossFetch } from "@fetch-impl/cross-fetch";
import fetch from "@fetch-impl/fetcher";

// configure fetch to use cross-fetch
useCrossFetch();

// use fetch as usual
fetch("https://example.com").then(async (res) => {
    console.log(res.status, await res.text());
});
```
