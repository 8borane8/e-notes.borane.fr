return {
    url: "/connexion",
    template: "app",

    title: "E-Notes - Connexion",
    favicon: "/favicon.ico",

    styles: [
        "/styles/connexion.css"
    ],
    scripts: [
        "/scripts/connexion.js",
        "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
    ],

    head: <>
        <meta property="og:title" content="E-Notes - Connexion" />

        <meta name="og:description" content="Connexion" />
        <meta name="description" content="Connexion" />
        <meta name="keywords" content="e-notes connexion" />
    </>,

    body: <>
        <form>
            <div>
                <img src="./assets/favicon.png" alt="favicon" width="90" height="58.7" />
                <p>E-Notes</p>
            </div>
            
            <p>Connectez-vous</p>

            <input type="text" placeholder="Identifiant" name="username" autocomplete="username" required />
            <input type="password" placeholder="Mot de passe" name="password" autocomplete="current-password" required />

            <a href="https://api.ecoledirecte.com/mot-de-passe-oublie.awp">Mot de passe oublié ?</a>
            <input type="submit" value="Connexion" />
            
            <p>Identifiant ou mot de passe incorrect !</p>
            <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_ht6o1bdu.json" background="transparent" speed="1" loop autoplay></lottie-player>
        </form>
    </>,

    onrequest: req => {
        if(Object.keys(req.cookies).includes("token"))
            req.url = "/";
    }
};