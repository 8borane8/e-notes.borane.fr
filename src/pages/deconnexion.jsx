return {
    url: "/deconnexion",
    template: "app",

    title: "E-Notes - Déconnexion",
    favicon: "/favicon.ico",

    styles: [],
    scripts: [
        "/scripts/deconnexion.js"
    ],

    head: <>
        <meta property="og:title" content="E-Notes - Déconnexion" />

        <meta name="og:description" content="Déconnexion" />
        <meta name="description" content="Déconnexion" />

        <meta name="keywords" content="e-notes déconnexion" />
    </>,

    body: <></>,

    onrequest: async req => {
        if(!Object.keys(req.cookies).includes("token"))
            req.url = "/connexion";
    }
};