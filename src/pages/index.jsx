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

    body: req => {
        const periods = req.response.data.periodes.map(p => ({
            period: p.codePeriode,
            name: p.periode,

            startDate: p.dateDebut,
            endDate: p.dateFin
        }));

        const marks = req.response.data.notes.map(m => ({
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
            <p>Moyenne Générale: <span id="average-label">Inconnue</span></p>

            <span id="periods-data">{JSON.stringify(periods)}</span>
            <span id="marks-data">{JSON.stringify(marks)}</span>
        </>;
    },

    onrequest: async req => {
        if(!Object.keys(req.cookies).includes("token")){
            req.url = "/connexion";
            return;
        }
            
        const response = await expressapi.RequestHelper.request({
            url: `http://api.ecoledirecte.com/v3/eleves/${req.cookies.id}/notes.awp?verbe=get&v=6.9.1`,
            method: "POST",
            headers: {
                "User-Agent": req.headers["user-agent"],
                "X-Token": req.cookies.token
            },
            body: `data={"anneeScolaire": ""}`
        });

        if(response.code != 200){
            req.url = "/deconnexion";
            return;
        }

        req.response = response;
    }
};