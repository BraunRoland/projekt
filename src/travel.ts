import { Bucket } from "./Bucket.ts";
import { Utazas } from "./Utazas.ts";
let utazasArr: Utazas[] = [];
let bucketArr: Bucket[] = [];
let elozo: HTMLElement | null = null;

function tablazatKiiras(array: Utazas[]): void {
    const tablazat = document.getElementById('tableAdat') as HTMLTableSectionElement;
    tablazat.innerHTML = '';
    array.forEach((u: Utazas,id) => {
        const tr = document.createElement('tr') as HTMLTableRowElement;
        const hely = document.createElement('td') as HTMLTableCellElement;
        hely.textContent = u.city+ `, ${u.country}`;
        hely.dataset.key = 'city';
        const kulonb = u.dateEnd.getTime() - u.dateStart.getTime();
        const ido = document.createElement('td') as HTMLTableCellElement;
        ido.dataset.key = 'dateStart,dateEnd';
        ido.innerHTML = `${u.writeDateStart()} - <br>${u.writeDateEnd()}`
        const penz = document.createElement('td') as HTMLTableCellElement;
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
        tablazat.appendChild(tr);
        tr.appendChild(hely);
        tr.appendChild(ido);
        tr.appendChild(penz);
        tr.appendChild(ertek);
    });
}

function ascClick(event: Event) {
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

async function bucketLekerdezes() {
        const adatok: Bucket[] = [];
    
    const response = await fetch("https://retoolapi.dev/IwrmvF/bucket");
    const data = await response.json();
    data.forEach((adat: any) => {
        adatok.push(new Bucket(adat.id, adat.location, new Date(adat.date),false));
    });

    return adatok;
}
async function frissites() {
    utazasArr = await utazasLekerdezes();
    bucketArr = await bucketLekerdezes();
}

function eventAdder(): void {
    const thArr = document.getElementsByTagName('th');
    for(const elem of thArr) {
        elem.addEventListener('click',ascClick)
    }
}

async function init() {
    await frissites();
    console.log(utazasArr, bucketArr);
    console.log(bucketArr[0]?.writeDate(), utazasArr[0]?.writeDateStart(), utazasArr[0]?.writeDateEnd());
    tablazatKiiras(utazasArr);
    eventAdder();
}

document.addEventListener("DOMContentLoaded", init);

