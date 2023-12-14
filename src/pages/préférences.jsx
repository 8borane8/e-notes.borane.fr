return {
    url: "/préférences",
    template: "app",

    title: "E-Notes - Préférences",
    favicon: "/favicon.ico",

    styles: [
        "/styles/préférences.css"
    ],
    scripts: [
        "/scripts/préférences.js"
    ],

    head: <>
        <meta property="og:title" content="E-Notes - Préférences" />

        <meta name="og:description" content="Préférences" />
        <meta name="description" content="Préférences" />
        <meta name="keywords" content="e-notes préférences" />
    </>,

    body: <> 
        
    </>,

    onrequest: req => {
        if(!Object.keys(req.cookies).includes("token"))
            req.url = "/connexion";
    }
};