import fetch, { fetcher } from "@fetch-impl/fetcher";
import cfetch from "cross-fetch";

/**
 * Use cross-fetch as the default fetcher.
 * @param instance The fetcher instance to configure.
 */
export function useCrossFetch(instance = fetcher): void {
	instance.set(cfetch);
}

export * from "@fetch-impl/fetcher";
export default fetch;
