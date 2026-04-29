import { Utazas } from "./Utazas.ts";
let utazasArr: Utazas[] = [];
let elozo: HTMLElement | null = null;
const modal = document.getElementById('modifyModal') as HTMLDivElement;
const close = document.getElementsByClassName('close')[0] as HTMLSpanElement;
const form = document.getElementById('modiForm') as HTMLDivElement;
const cityForm = document.getElementById('city') as HTMLFormElement;
const countryForm = document.getElementById('country') as HTMLFormElement;
const date1Form = document.getElementById('date1') as HTMLFormElement;
const date2Form = document.getElementById('date2') as HTMLFormElement;
const ratingForm = document.getElementById('rating') as HTMLSelectElement;
const priceForm = document.getElementById('price') as HTMLFormElement;
const deleteBtn = document.getElementById('delete') as HTMLButtonElement;
const submitBtn = document.getElementById('submit') as HTMLButtonElement;
const createBtn = document.getElementById("createForm") as HTMLButtonElement;
const alert = document.getElementById('modiAlert') as HTMLDivElement;



function tablazatKiiras(array: Utazas[]): void {
    const tablazat = document.getElementById('tableAdat') as HTMLTableSectionElement;
    tablazat.innerHTML = '';
    array.forEach((u: Utazas,id) => {
        const tr = document.createElement('tr') as HTMLTableRowElement;
        const hely = document.createElement('td') as HTMLTableCellElement;
        hely.textContent = u.location();  
        hely.dataset.key = 'city';
        const kulonb = u.dateEnd.getTime() - u.dateStart.getTime();
        const ido = document.createElement('td') as HTMLTableCellElement;
        ido.dataset.key = 'dateStart,dateEnd';
        ido.innerHTML = `${u.writeDateStart()} - <br>${u.writeDateEnd()}`
        const penz = document.createElement('td') as HTMLTableCellElement;
        const td = document.createElement('td') as HTMLTableCellElement;
        const gomb = document.createElement('a') as HTMLElement;
        penz.dataset.key = 'price';
        penz.textContent = `${u.price.toLocaleString()} Ft`;
        const ertek = document.createElement('td') as HTMLTableCellElement;
        let ertekStrting: string = '';
        for (let i = 1; i < 6; i++) {
            if (i <= u.rating) {
                ertekStrting += '&#9733;'
            }
            else {
                ertekStrting += '&#9734;'
            }
            //&#9733; fekete
            //&#9734; ures
        }
        ertek.innerHTML = ertekStrting;
        ertek.className = 'csillag';
        ertek.dataset.key = 'rating';
        gomb.textContent = 'Módosítás';
        gomb.className = 'btn btn-primary'
        gomb.dataset.id = u.id.toString();
        gomb.onclick = function() {
            tablaModositas(id, u.id!);
        }
        td.appendChild(gomb);
        tr.appendChild(hely);
        tr.appendChild(ido);
        tr.appendChild(penz);
        tr.appendChild(ertek);
        tr.appendChild(td);
        tablazat.appendChild(tr);
    });
}

function tablaModositas(id: number, arrId: number): void {
    modal.style.display = 'block';
    deleteBtn.style.display = 'block';
    submitBtn.hidden = false;
    createBtn.hidden = true;
    alert.hidden = true;
    alert.innerHTML = '';

    console.log(utazasArr[id]);
    cityForm.value = utazasArr[id]!.city;
    countryForm.value = utazasArr[id]!.country;
    let date1Value = utazasArr[id]!.dateStart.toISOString().split('T')[0];
    let date2Value = utazasArr[id]!.dateEnd.toISOString().split('T')[0];
    date1Form.value = date1Value;
    date2Form.value = date2Value;
    form.dataset.id = arrId.toString();
    deleteBtn.dataset.id = arrId.toString();
    for (const select of ratingForm) {
        if (select.value == utazasArr[id]!.rating.toString()) {
            select.selected = true;
        }
    }
    priceForm.value = (utazasArr[id]!.price).toString();
    console.log(utazasArr[id]!.city, utazasArr[id]!.country, utazasArr[id]!.dateStart, utazasArr[id]!.dateEnd,(utazasArr[id]!.rating).toString(), (utazasArr[id]!.price).toString());
};

async function modositas(id: number) {
    try {
        const utazas = peldanyositas();
        const response = await fetch(`https://retoolapi.dev/PxmLfg/utazas/${id}`,
            {
                method: "PATCH",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({location: utazas.location(), date_1: utazas.dateStart, date_2: utazas.dateEnd, rating: utazas.rating, price: utazas.price})
            }
        );
        await frissites();
        tablazatKiiras(utazasArr);
        alert.hidden = true;
        alert.innerHTML = '';
        formTorles();
        modal.style.display = 'none';
    }
    catch (err) {
        if (err instanceof Error) {
            alert.hidden = false;
            alert.innerHTML = `<strong>Hiba!</strong> ${err.message}`;
        }
    }
}

async function torles(id: number) {
    const response = await fetch(`https://retoolapi.dev/PxmLfg/utazas/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    await frissites();
    tablazatKiiras(utazasArr);
    alert.hidden = true;
    alert.innerHTML = '';
    formTorles();
    modal.style.display = 'none';
}

function formTorles() {
    priceForm.value = "";
    cityForm.value = "",
    countryForm.value = "";
    date1Form.value = "";
    date2Form.value = "";
}

async function create() {
    formTorles();
    deleteBtn.style.display = 'none';
    modal.style.display = 'block';
    submitBtn.hidden = true;
    createBtn.hidden = false;
}

async function  post() {
    console.log('belep');

    try {
        const utazas: Utazas = peldanyositas();
        const response = await fetch(`https://retoolapi.dev/PxmLfg/utazas`,
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: utazas.id, price: utazas.price, bucket: utazas.bucket, date_1: utazas.dateStart, date_2: utazas.dateEnd, rating: utazas.rating, location: utazas.location()})
            }
        );
        await frissites();
        tablazatKiiras(utazasArr);
        alert.hidden = true;
        alert.innerHTML = '';
        formTorles();
        modal.style.display = 'none';
    }
    catch (err) {
        if (err instanceof Error) {
            alert.hidden = false;
            alert.innerHTML = `<strong>Hiba!</strong> ${err.message}`;
        }
    }
}

function peldanyositas(): Utazas {
    let ratingV: string = "";
    for (const select of ratingForm) {
        if (select.selected) {
            ratingV = select.value;
        }
    }
    const location = `${cityForm.value}, ${countryForm.value}`
    if(date1Form.value == "" || date2Form.value == "") {
        throw new Error("Nem jó a dátum!");
    }
    const utazas = new Utazas(utazasArr.length+1,location,parseInt(priceForm.value),new Date(date1Form.value), new Date(date2Form.value),parseInt(ratingV),false)
    return utazas;  
}

close.onclick = function() {
    modal.style.display = 'none';

}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


function ascClick(event: Event) {
    console.log("ascClick")
    const elem = event.currentTarget as HTMLElement;
    const key = elem.dataset.key;
    sortAsc(key!, elem);
}

function descClick(event: Event) {
    const elem = event. currentTarget as HTMLElement;
    const key = elem.dataset.key;
    sortDesc(key!,elem);
}

function sortAsc(key: string, elem: HTMLElement): void {
    console.log("sortAsc");
    let arr: Utazas[] = utazasArr;
    if (key === 'city') {
        arr.sort((a,b) => a[key].localeCompare(b[key]));
    }
    else if (key === 'rating' || key === 'price') {
        arr.sort((a,b) => a[key] - b[key]);
    }
    else if (key === 'dateStart,dateEnd') {
        const keys:string[] = key.split(',');
        const targetKey = keys[0];
        arr.sort((a,b) => {
            const dateA = new Date((a as any)[targetKey!]).getTime();
            const dateB = new Date((b as any)[targetKey!]).getTime();
            return dateA - dateB;
        })
    }
    elem.removeEventListener('click',ascClick);
    elem.addEventListener('click',descClick);
    console.log(elozo);
    if (elozo != null) {
        const clean = elozo.innerHTML.split(' ')
        elozo.innerHTML = clean[0]!;
    };
    elem.innerHTML += ' &#8593;';
    elozo = elem;
    console.log(arr);
    console.log(utazasArr);
    tablazatKiiras(arr);
}

function sortDesc(key: string, elem: HTMLElement) {
    let arr: Utazas[] = utazasArr;
    if (key === 'city') {
        arr.sort((a,b) => b[key].localeCompare(a[key]));
    }
    else if (key === 'rating' || key === 'price') {
        arr.sort((a,b) => b[key] - a[key]);
    }
    else if (key === 'dateStart,dateEnd') {
        const keys:string[] = key.split(',');
        const targetKey = keys[1];
        arr.sort((a,b) => {
            const dateA = new Date((a as any)[targetKey!]).getTime();
            const dateB = new Date((b as any)[targetKey!]).getTime();
            return dateB - dateA;
        })
    }
    elem.removeEventListener('click',descClick);
    elem.addEventListener('click',ascClick);
    console.log(elozo);
    if (elozo != null) {
        const clean = elozo.innerHTML.split(' ')
        elozo.innerHTML = clean[0]!;
    }
    elem.innerHTML += ' &#8595;';
    elozo = elem;
    tablazatKiiras(arr);
}

async function utazasLekerdezes() {
    const adatok: Utazas[] = [];
    
    const response = await fetch("https://retoolapi.dev/PxmLfg/utazas");
    const data = await response.json();
    data.forEach((adat: any) => {
        adatok.push(new Utazas(adat.id,adat.location,adat.price,new Date(adat.date_1),new Date(adat.date_2),adat.rating,adat.bucket));
    });

    return adatok;
}

async function frissites() {
    utazasArr = await utazasLekerdezes();
}

function eventAdder(): void {
    const thArr = document.getElementsByTagName('th');
    console.log(thArr);
    for(const elem of thArr) {
        if(Object.keys(elem.dataset).length > 0) {
            elem.addEventListener('click',ascClick)
        }
    }
}

async function init() {
    await frissites();
    tablazatKiiras(utazasArr);
    eventAdder();
}

form.addEventListener('submit', (e: Event) => {
    const target = e.target as HTMLElement;
    e.preventDefault();
        modositas(parseInt(target.dataset.id!));
    // console.log(target);
    // console.log(target.dataset.id);
});

deleteBtn.addEventListener('click', (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    torles(parseInt(target.dataset.id!));
})

createBtn.addEventListener('click', () => {
    post();
})

document.getElementById('create')?.addEventListener('click', () => {
    create();
})
document.addEventListener('DOMContentLoaded',init)