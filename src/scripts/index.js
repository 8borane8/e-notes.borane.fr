const periods = JSON.parse(document.querySelector("#periods-data").innerHTML);
const marks = JSON.parse(document.querySelector("#marks-data").innerHTML);

function loadMarks(marks){
    const table = document.querySelector("#table");

    table.innerHTML = `<div>
        <p>Matière</p>
        <p>Notes</p>
        <p>Moyenne</p>
    </div>`;

    const subjects = marks.reduce((acc, m) => {
        if(!Object.keys(acc).includes(m.subject))
            acc[m.subject] = [];

        acc[m.subject].push({
            value: m.value,
            coef: m.coef,
            
            class: m.class
        });

        return acc;
    }, {});

    const averages = [];

    for(let s of Object.keys(subjects)){
        const marks = subjects[s].reduce((acc, m) => acc + m.value * m.coef, 0);
        const coefs = subjects[s].reduce((acc, m) => acc + m.coef, 0);
          
        const average = marks / coefs;
        averages.push(average);

        table.innerHTML += `<div>
            <p>${s}</p>
            <div></div>
            <p>${Math.round(average * 100) / 100}</p>
        </div>`;
        
        const marksContainer = document.querySelector("#table > div:last-child > div");
        for(let m of subjects[s]){
            const html = m.coef > 0 ? `${m.value}${m.coef == 1 ? "" : ` <span>(${m.coef})</span>`}` : `(${m.value})`;
            marksContainer.innerHTML += `<div>
                <p>${html}</p>
                <div>
                    <p>Classe</p>
                    <div>
                        <p>Moyenne</p>
                        <p>${m.class.average}</p>
                    </div>
                    <div>
                        <p>Minimum</p>
                        <p>${m.class.min}</p>
                    </div>
                    <div>
                        <p>Maximum</p>
                        <p>${m.class.max}</p>
                    </div>
                </div>
            </div>`;
        }
    }

    const average = averages.reduce((a, b) => a + b, 0) / averages.length;
    document.querySelector("#average-label").innerHTML = isNaN(average) ? "Inconnue" : Math.round(average * 100) / 100;
}

const periodsContainer = document.querySelector("#periods-container");

const date = Date.now();
for(let p of periods){
    const button = document.createElement("button");
    button.innerHTML = p.name;

    if(!periodsContainer.querySelector(".active") && new Date(p.startDate).getTime() <= date && date <= new Date(p.endDate).getTime()){
        button.classList.add("active");
        loadMarks(marks.filter(m => m.period == p.period));
    }

    button.addEventListener("click", () => {
        periodsContainer.querySelector(".active").classList.remove("active");
        button.classList.add("active");

        if(p.period.endsWith("Z")){
            loadMarks(marks);
            return;
        }

        loadMarks(marks.filter(m => m.period == p.period));
    });

    periodsContainer.appendChild(button);
}