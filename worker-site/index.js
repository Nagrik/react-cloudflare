import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

// eslint-disable-next-line no-restricted-globals
addEventListener("fetch", event => {
    event.respondWith(handleEvent(event));
    // let { pathname } = new URL(event.request.url);
    // console.log(pathname);
});


async function handleEvent(event) {
    try {
        const resp = await fetch(event.request);
        return resp;
    } catch (e) {
        let pathname = new URL(event.request.url).pathname;
        return new Response(`"${pathname}" not found`, {
            status: 404,
            statusText: "not found"
        });
    }
}