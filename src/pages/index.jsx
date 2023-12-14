const expressapi = require("@borane/expressapi");

return {
    url: "/",
    template: "app",

    title: "E-Notes - Calculez votre moyenne EcoleDirecte !",
    favicon: "/favicon.ico",

    styles: [
        "/styles/index.css"
    ],
    scripts: [
        "/scripts/index.js"
    ],

    head: <>
        <meta property="og:title" content="E-Notes - Calculez votre moyenne EcoleDirecte !" />

        <meta name="og:description" content="Calculez votre moyenne EcoleDirecte !" />
        <meta name="description" content="Calculez votre moyenne EcoleDirecte !" />
        <meta name="keywords" content="e-notes, moyenne, ecoledirecte" />
    </>,

    body: async req => {
        const response = await expressapi.RequestHelper.request({
            url: `http://api.ecoledirecte.com/v3/eleves/${req.cookies.id}/notes.awp?verbe=get&v=6.9.1`,
            method: "POST",
            headers: {
                "User-Agent": req.headers["user-agent"],
                "X-Token": req.cookies.token
            },
            body: `data={"anneeScolaire": ""}`
        });

        if(response.code != 200)
            return <><p>Une erreur est survenue, merci de supprimer vos cookies.</p></>;

        const periods = response.data.periodes.map(p => ({
            period: p.codePeriode,
            name: p.periode,

            startDate: p.dateDebut,
            endDate: p.dateFin
        }));

        const marks = response.data.notes.map(m => ({
            subject: m.libelleMatiere,
            period: m.codePeriode,

            value: Math.round(parseFloat(m.valeur.replace(',', '.')) / parseFloat(m.noteSur) * 2000) / 100,
            coef: m.nonSignificatif ? 0 : parseFloat(m.coef.replace(',', '.')),

            class: {
                average: Math.round(parseFloat(m.moyenneClasse) / parseFloat(m.noteSur) * 2000) / 100,
                min: Math.round(parseFloat(m.minClasse) / parseFloat(m.noteSur) * 2000) / 100,
                max: Math.round(parseFloat(m.maxClasse) / parseFloat(m.noteSur) * 2000) / 100
            }
        })).filter(m => !isNaN(m.value));

        return <>
            <div id="periods-container"></div>
            <div id="table">
                <div>
                    <p>Matière</p>
                    <p>Notes</p>
                    <p>Moyenne</p>
                </div>
            </div>
            <p>
                Moyenne Générale: <span id="average-label">Inconnue</span>
                <a href="/préférences" aria-label="préférences">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                        <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </a>
            </p>

            <span id="periods-data">{JSON.stringify(periods)}</span>
            <span id="marks-data">{JSON.stringify(marks)}</span>
        </>;
    },

    onrequest: req => {
        if(!Object.keys(req.cookies).includes("token"))
            req.url = "/connexion";
    }
};