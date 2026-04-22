class LoginError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'LoginError';
        Object.setPrototypeOf(this,LoginError.prototype);
    }
}

const modal = document.getElementById('loginModal') as HTMLDivElement;
const btn = document.getElementById('loginBtn') as HTMLButtonElement;
const close = document.getElementsByClassName('close')[0] as HTMLSpanElement;
const submit = document.getElementById('loginForm') as HTMLFormElement;
const alert = document.getElementById('loginAlert') as HTMLDivElement;
const user = document.getElementById('username') as HTMLInputElement;
const pswd = document.getElementById('pwd') as HTMLInputElement;
const path = window.location.pathname;

btn.onclick = function() {
    modal.style.display = 'block';
}
close.onclick = function() {
    modal.style.display = 'none';
    user.value = "";
    pswd.value = "";
    alert.style.display = 'none';
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        user.value = "";
        pswd.value = "";
        alert.style.display = 'none';
    }
}

function changeWindow(url: string): void {
    console.log("siker");
    window.location.href = url;
}

submit.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(`username: ${user.value.trim()}`);
    console.log(`password: ${pswd.value.trim()}`);
    try {
        if (user.value == 'Admin' && pswd.value == 'Admin') {
            console.log(path);
            const pathParts = path.split("/");
            const fileName = pathParts.pop();
            const newName = fileName!.replace('.html','Admin.html');
            let newPath: string = `/pages/${newName}`;
            alert.style.display = 'none';
            console.log(newPath);
            changeWindow(newPath);
        }
        else {
            throw new LoginError('Rossz felhasználónév és/vagy jelszó!')
        }
    }
    catch (err) {
        if (err instanceof LoginError) {
            alert.style.display = 'block';
        }
    }
});