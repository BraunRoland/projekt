import { Bucket } from "./Bucket.ts";
import { Utazas } from "./Utazas.ts";
let utazasArr: Utazas[] = [];
let bucketArr: Bucket[] = [];


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
    console.log(bucketArr[0]?.writeDate(bucketArr[0].date), utazasArr[0]?.writeDate(utazasArr[0].dateStart), utazasArr[0]?.writeDate(utazasArr[0].dateEnd))
}

document.addEventListener("DOMContentLoaded", init);

