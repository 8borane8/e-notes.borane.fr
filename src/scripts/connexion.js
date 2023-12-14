const inputUsername = document.querySelector("#app > form > input[name='username']");
const inputPassword = document.querySelector("#app > form > input[name='password']");
const labelError = document.querySelector("#app > form > p:nth-last-child(2)");
const player = document.querySelector("#app > form > :last-child");

document.querySelector("form").addEventListener("submit", async e => {
    e.preventDefault();

    if(player.style.opacity == 1)
        return;

    labelError.style.opacity = 0;
    player.style.opacity = 1;
    
    const response = await (await fetch("https://api.ecoledirecte.com/v3/login.awp?v=4.46.1", {
        method: "POST",
        body: `data=${JSON.stringify({
            "identifiant": encodeURIComponent(inputUsername.value),
            "motdepasse": encodeURIComponent(inputPassword.value)
        })}`
    })).json();

    if(response.code != 200){
        labelError.style.opacity = 1;
        player.style.opacity = 0;
        return;
    }

    SlickCookies.set("id", response.data.accounts[0].id, 1 / 12);
    SlickCookies.set("token", response.token, 1 / 12);

    Slick.redirect("/");
});