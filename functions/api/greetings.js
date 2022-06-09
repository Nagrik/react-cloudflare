// GET requests to /filename would return "Hello, world!"

import App from "../../src/App";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
        ${<App/>}
</body>
</html>
`
export const onRequestGet = () => {
    return new Response(html)
}

// POST requests to /filename with a JSON-encoded body would return "Hello, <name>!"
export const onRequestPost = async ({ request }) => {
    const { name } = await request.json()
    return new Response(`Hello, ${name}!`)
}