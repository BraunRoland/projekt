const modal = document.getElementById('loginModal') as HTMLDivElement;
const btn = document.getElementById('loginBtn') as HTMLButtonElement;
const close = document.getElementsByClassName('close')[0] as HTMLSpanElement;

btn.onclick = function() {
    modal.style.display = 'block';
}
close.onclick = function() {
    modal.style.display = 'none';
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}