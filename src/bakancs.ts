import { Bucket } from "./Bucket.ts";
import { Utazas } from "./Utazas.ts";
const table = document.getElementById("tableKiiras") as HTMLTableSectionElement;

let utazasArr: Utazas[] = [];
let bakancsArr: Bucket[] =[];
let unique: (Utazas | Bucket)[] = [];

function kiiras(): void {
    unique.forEach(elem => {
        const tr = document.createElement("tr") as HTMLTableRowElement;
        const loc = document.createElement('td') as HTMLTableCellElement;
        loc.innerText = elem.location();
        const date = document.createElement('td') as HTMLTableCellElement;
        if (elem instanceof Bucket) {
            date.innerText = elem.writeDate();
        }
        else if (elem instanceof Utazas) {
            date.innerText = elem.writeDateStart();
        }
        const bool = document.createElement('td') as HTMLTableCellElement;
        const a = document.createElement('a') as HTMLAnchorElement;
        if (elem.bucket == true) {
            a.innerHTML = '&#9989;';
        }
        else {
            a.innerHTML = '&#10060;';
        }
        a.className = 'bucketBtn';
        table.appendChild(tr);
        tr.appendChild(loc);
        tr.appendChild(date);
        tr.appendChild(bool);
        bool.appendChild(a);
    })
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
        adatok.push(new Bucket(adat.id, adat.location, new Date(adat.date), adat.bucket));
    });

    return adatok;
}
async function frissites() {
    utazasArr = await utazasLekerdezes();
    bakancsArr = await bucketLekerdezes();
}

function arrayLetrehozas(): void {
    console.log(utazasArr,bakancsArr)
    let uniqueU: Utazas[] = [...new Map(utazasArr.map(u => [u.location(), u])).values()];
    //ezt Ai-al neztem meg
    unique = [...bakancsArr,...uniqueU];
    console.log(unique);
}

async function init(){
    await frissites();
    arrayLetrehozas();
    kiiras();
}

document.addEventListener('DOMContentLoaded', init)