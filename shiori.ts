import "https://deno.land/x/dotenv@v3.2.2/load.ts";

export async function login() {
    const sUri = Deno.env.get("shiori_uri");
    if (!sUri) { return undefined }
    const sUsername = Deno.env.get("shiori_username");
    const sPassword = Deno.env.get("shiori_password");
    const endpoint = sUri + "/api/login";
    const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
            username: sUsername,
            password: sPassword,
            remember_me: true,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        const err = await response.text();
        console.log(err);
    }

    const jsonResp = await response.json();
    return jsonResp['session'];
}

export async function get_bookmarks(sessionToken: string, pub: boolean) {
    const sUri = Deno.env.get("shiori_uri");
    if (!sUri) { return undefined }
    if (sessionToken == undefined ) { return undefined }
    const endpoint = sUri + "/api/bookmarks";
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Session-Id": sessionToken,
        }
    });

    if (!response.ok) {
        const err = await response.text();
        console.log(err);
    }

    const bm_list = [];
    const jsonResp = await response.json();

    if (pub == true) {
        for (const bm of jsonResp['bookmarks']) {
            if (bm.public == 1) {
                bm_list.push({url: bm.url, title: bm.title});
            }
        }
    } else {
        for (const bm of jsonResp['bookmarks']) {
            bm_list.push({url: bm.url, title: bm.title});
        }
    }
    return bm_list;
}

/*
    Example Usage:
        const sessionToken = await login();
        const public_bookmarks = await get_bookmarks(sessionToken, true);
        console.log(public_bookmarks);
*/