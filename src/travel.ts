import { Bucket } from "./Bucket.ts";
import { Utazas } from "./Utazas.ts";
let utazasArr: Utazas[] = [];
let bucketArr: Bucket[] = [];

function tablazatKiiras(): void {
    const tablazat = document.getElementById('tableAdat') as HTMLTableSectionElement;
    utazasArr.forEach((u: Utazas,id) => {
        const tr = document.createElement('tr') as HTMLTableRowElement;
        const hely = document.createElement('td') as HTMLTableCellElement;
        hely.textContent = u.city+ `, ${u.country}`;
        const kulonb = u.dateEnd.getTime() - u.dateStart.getTime();
        const ido = document.createElement('td') as HTMLTableCellElement;
        ido.innerHTML = `${u.writeDateStart()} - <br>${u.writeDateEnd()}`
        const penz = document.createElement('td') as HTMLTableCellElement;
        penz.textContent = `${u.price.toLocaleString()} Ft`;
        const ertek = document.createElement('td') as HTMLTableCellElement;
        let ertekStrting: string = '';
        for (let i = 1; i < 6; i++) {
            if (i <= u.rating) {
                ertekStrting += '&#9733; '
            }
            else {
                ertekStrting += '&#9734; '
            }
            //&#9733; fekete
            //&#9734; ures
        }
        ertek.innerHTML = ertekStrting;
        ertek.className = 'csillag';
        tablazat.appendChild(tr);
        tr.appendChild(hely);
        tr.appendChild(ido);
        tr.appendChild(penz);
        tr.appendChild(ertek);
    });
}

function reszletek(id: number): void {
    console.log(utazasArr[id]);
}

async function utazasLekerdezes() {
    const adatok: Utazas[] = [];
    
    const response = await fetch("https://retoolapi.dev/PxmLfg/utazas");
    const data = await response.json();
    data.forEach((adat: any) => {
        adatok.push(new Utazas(adat.location,adat.price,new Date(adat.date_1),new Date(adat.date_2),adat.rating,adat.bucket));
    });

    return adatok;
}



async function bucketLekerdezes() {
        const adatok: Bucket[] = [];
    
    const response = await fetch("https://retoolapi.dev/IwrmvF/bucket");
    const data = await response.json();
    data.forEach((adat: any) => {
        adatok.push(new Bucket(adat.location, new Date(adat.date)));
    });

    return adatok;
}
async function frissites() {
    utazasArr = await utazasLekerdezes();
    bucketArr = await bucketLekerdezes();
}



async function init() {
    await frissites();
    console.log(utazasArr, bucketArr);
    console.log(bucketArr[0]?.writeDate(), utazasArr[0]?.writeDateStart(), utazasArr[0]?.writeDateEnd());
    tablazatKiiras();
}

document.addEventListener("DOMContentLoaded", init);

