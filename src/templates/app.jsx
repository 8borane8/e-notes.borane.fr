return {
    name: "app",

    styles: [
        "/styles/app.css",
    ],
    scripts: [],

    head: <>
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="E-Notes" />
        <meta property="og:url" content="https://e-notes.borane.fr" />
        <meta property="og:image" content="https://e-notes.borane.fr/favicon.ico" />
        <meta name="theme-color" content="#0f8fd1" />
    </>,

    body: <>
        <div id="app"></div>
    </>,

    onrequest: req => {
        req.cookies = {};

        if(req.headers.cookie == undefined)
            return;

        req.cookies = Object.fromEntries(
            req.headers.cookie.split(";").map(
                p => p.split("=")
            ).map(p => [p[0].trim(), p[1].trim()])
        );
    }
};