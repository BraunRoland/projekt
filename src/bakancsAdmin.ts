import { Bucket } from "./Bucket.ts";
import { Utazas } from "./Utazas.ts";
const table = document.getElementById("tableKiiras") as HTMLTableSectionElement;
const closeU = document.getElementById('utazasClose') as HTMLSpanElement;
const modiU = document.getElementById('utazasModi') as HTMLDivElement;
const header = document.getElementById('headerForm') as HTMLHeadElement;
const form = document.getElementById('utazasForm') as HTMLFormElement;
const letrehozas = document.getElementById('create') as HTMLButtonElement;
const formBtn = document.getElementById('createForm') as HTMLButtonElement;
let modiAlert;



let uniqueU: Utazas[];
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
        a.dataset.id = elem.id.toString();
        if (elem.bucket == true) {
            a.innerHTML = '&#9989;';
        }
        else {
            a.innerHTML = '&#10060;';
        }
        if (elem instanceof Bucket) {
            a.dataset.class = "bucket";
        }
        else if (elem instanceof Utazas) {
            a.dataset.class = 'utazas';
        }
        a.removeEventListener('click', modal);
        a.addEventListener('click', modal);
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

function modal(e: Event) {
    const target = e.currentTarget as HTMLAnchorElement;
    if (target.dataset.class == 'bucket') {
        bucketModal(true,parseInt(target.dataset.id!))
    }
    else if (target.dataset.class = 'utazas') {
        console.log('Utazas');
        bucketModal(false, parseInt(target.dataset.id!))
    }
}

closeU.onclick = function() {
    modiU.style.display = 'none';
    
}

function bucketModal(bucket: boolean, id: (number | undefined))  {
    console.log('belep')
    form.innerHTML = '';
    modiU.style.display = 'block'
    let elem: (Bucket | Utazas | undefined) = undefined;

    const alert = document.createElement("div") as HTMLDivElement;
    alert.id = 'modiAlert';
    alert.className = 'alert alert-danger'
    alert.hidden = true;
    
    const button = document.createElement('button') as HTMLButtonElement;
    button.id = 'createForm';
    button.className = 'btn btn-primary submit';
    button.innerText = 'Létrehozás';
    button.type = 'submit';
    button.dataset.class = 'utazas';
    if (id != undefined) {
        button.dataset.id = id!.toString();
    }
    else {
        button.dataset.id = 'uj'
    }

    if (bucket == true) {
        elem = bakancsArr.find(e => e.id === id) as Bucket;
        button.dataset.class = 'bucket';
    }
    else if (bucket == false && id != undefined) {
        elem = uniqueU.find(e => e.id === id) as Utazas;
    }
    
    const cityDiv = document.createElement('div') as HTMLDivElement;
    cityDiv.className = 'mb-3 mt-3';
    
    const citylabel = document.createElement('label') as HTMLLabelElement;
    citylabel.setAttribute('for','city');
    citylabel.className = 'form-label';
    citylabel.innerText = 'Város:';

    
    const cityInp = document.createElement('input') as HTMLInputElement;
    cityInp.type = 'text';
    cityInp.className = 'form-control';
    cityInp.id = 'city';
    cityInp.placeholder = 'Add meg a várost';
    cityInp.name = 'city';
    
    cityDiv.appendChild(citylabel);
    cityDiv.appendChild(cityInp);

    const countryDiv = document.createElement('div') as HTMLDivElement;
    countryDiv.className = 'mb-3';
    
    const countrylabel = document.createElement('label') as HTMLLabelElement;
    countrylabel.setAttribute('for','country');
    countrylabel.className = 'form-label';
    countrylabel.innerText = 'Ország:';
    
    const countryInp = document.createElement('input') as HTMLInputElement;
    countryInp.type = 'text';
    countryInp.className = 'form-control';
    countryInp.id = 'country';
    countryInp.placeholder = 'Add meg az országot';
    countryInp.name = 'country';

    countryDiv.appendChild(countrylabel);
    countryDiv.appendChild(countryInp);

    const date1Div = document.createElement('div') as HTMLDivElement;
    date1Div.className = 'mb-3';
    
    const date1label = document.createElement('label') as HTMLLabelElement;
    date1label.setAttribute('for','date1');
    date1label.className = 'form-label';
    date1label.innerText = 'Tervezett Dátum:';
    
    const date1Inp = document.createElement('input') as HTMLInputElement;
    date1Inp.type = 'date';
    date1Inp.className = 'form-control';
    date1Inp.id = 'date1';
    date1Inp.placeholder = 'Add meg a tervezett dátumot';
    date1Inp.name = 'date1';

    date1Div.appendChild(date1label);
    date1Div.appendChild(date1Inp);

    form.appendChild(cityDiv);
    form.appendChild(countryDiv);
    form.appendChild(date1Div);

    if(id != undefined && elem != undefined) {
        cityInp.value = elem.city;
        countryInp.value = elem.country;
        console.log(elem);
        if (elem instanceof Bucket) {
            date1Inp.value = elem.date.toISOString().split('T')[0]!;
        }
        else if (elem instanceof Utazas) {
            date1Inp.value = elem.dateStart.toISOString().split('T')[0]!;
        }
    } 


    if(bucket == true) {
        date1label.innerText ="Kezdési dátum:"
        date1Inp.placeholder = "Add meg a utazás elejét"
        
        const date2Div = document.createElement('div') as HTMLDivElement;
        date2Div.className = 'mb-3';
        
        const date2Label = document.createElement('label') as HTMLLabelElement;
        date2Label.setAttribute('for','date2');
        date2Label.className = 'form-label';
        date2Label.innerText = 'Utazás vége:';
        
        const date2Inp = document.createElement('input') as HTMLInputElement;
        date2Inp.type = 'date';
        date2Inp.className = 'form-control';
        date2Inp.id = 'date2';
        date2Inp.placeholder = 'Add meg az utazás végét';
        date2Inp.name = 'date2';

        date2Div.appendChild(date2Label);
        date2Div.appendChild(date2Inp);

        const priceDiv = document.createElement('div') as HTMLDivElement;
        priceDiv.className = 'mb-3';
        
        const priceLabel = document.createElement('label') as HTMLLabelElement;
        priceLabel.setAttribute('for','price');
        priceLabel.className = 'form-label';
        priceLabel.innerText = 'Ár:';
        
        const priceInp = document.createElement('input') as HTMLInputElement;
        priceInp.type = 'number';
        priceInp.className = 'form-control';
        priceInp.id = 'price';
        priceInp.placeholder = 'Add meg az árat';
        priceInp.name = 'price';

        priceDiv.appendChild(priceLabel);
        priceDiv.appendChild(priceInp);

        const ratingDiv = document.createElement('div') as HTMLDivElement;
        ratingDiv.className = "mb-3";

        const ratingLabel = document.createElement('label') as HTMLLabelElement;
        ratingLabel.setAttribute('for','rating');
        ratingLabel.className = 'form-label';
        ratingLabel.innerText = 'Értékelés:';
        
        const ratingSelect = document.createElement('select') as HTMLSelectElement;
        ratingSelect.className = 'form-select';
        ratingSelect.id = 'select';
        for (let i = 1; i < 6; i++) {
            const opt = document.createElement('option') as HTMLOptionElement;
            opt.value = i.toString();
            opt.innerText = i.toString();
            ratingSelect.appendChild(opt);
        }

        ratingDiv.appendChild(ratingLabel);
        ratingDiv.appendChild(ratingSelect);
        
        form.appendChild(date2Div);
        form.appendChild(priceDiv);
        form.appendChild(ratingDiv);
    } 

    modiAlert = document.getElementById('modiForm') as HTMLDivElement;

    form.appendChild(alert);
    form.appendChild(button);
}

async function ujHozzadasa(type: string, id: number) {
    try {
        const utazas: (Utazas | Bucket) = peldanyositas(type);
        if(utazas instanceof Utazas) {
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
            if(id != 0) {
                bucketTorles(utazas.id);
            }
            utazasFormTorles();
        }
        else if(utazas instanceof Bucket) {
            const response = await fetch('https://retoolapi.dev/IwrmvF/bucket', 
                {
                    method: "POST",
                    headers: 
                    {
                        "Content-Type": "applications/json"
                    },
                    body: JSON.stringify({id: utazas.id, location: utazas.location(), bucket: utazas.bucket, date: utazas.date})
                }
            );
            utazasTorles(utazas.id);
            bucketFormTorles();
        }
        await frissites();
        arrayLetrehozas();
        kiiras();
        modiAlert!.hidden = true;
        modiAlert!.innerHTML = '';
        modiU.style.display = 'none';
    }
    catch (err) {
        if (err instanceof Error) {
            modiAlert!.hidden = false;
            modiAlert!.innerHTML = `<strong>Hiba!</strong> ${err.message}`;
        } 
    }
}

async function utazasTorles(id: number) {
    const response = await fetch(`https://retoolapi.dev/PxmLfg/utazas/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function bucketTorles(id: number) {
    const response = await fetch(`https://retoolapi.dev/IwrmvF/bucket/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

function utazasFormTorles() {
    const cityForm = document.getElementById('city') as HTMLInputElement;
    const countryForm = document.getElementById('country') as HTMLInputElement;
    const date1Form = document.getElementById('date1') as HTMLInputElement;

    cityForm.value = '';
    countryForm.value = '';
    date1Form.value = '';
}

function bucketFormTorles() {
    const cityForm = document.getElementById('city') as HTMLInputElement;
    const countryForm = document.getElementById('country') as HTMLInputElement;
    const date1Form = document.getElementById('date1') as HTMLInputElement;
    const date2Form = document.getElementById('date2') as HTMLInputElement;
    const priceForm = document.getElementById('price') as HTMLInputElement;
  
    cityForm.value = '';
    countryForm.value = '';
    date1Form.value = '';
    date2Form.value = '';
    priceForm.value = '';
}


function peldanyositas(type: string): (Utazas | Bucket) {
    const cityForm = document.getElementById('city') as HTMLInputElement;
    const countryForm = document.getElementById('country') as HTMLInputElement;
    const date1Form = document.getElementById('date1') as HTMLInputElement;
    const location = `${cityForm.value}, ${countryForm.value}`
    if(type == 'utazas') {
        const date2Form = document.getElementById('date2') as HTMLInputElement;
        const priceForm = document.getElementById('price') as HTMLInputElement;
        const ratingForm = document.getElementById('rating') as HTMLSelectElement;
        let ratingV: string = "";
        for (const select of ratingForm) {
            if (select.selected) {
                ratingV = select.value;
            }
        }
        if(date1Form.value == "" || date2Form.value == "") {
            throw new Error("Nem jó a dátum!");
        }
        const utazas = new Utazas(utazasArr.length+1,location,parseInt(priceForm.value),new Date(date1Form.value), new Date(date2Form.value),parseInt(ratingV),true)
        return utazas; 
    }
    if(date1Form.value == '') {
        throw new Error('Nem jó a dátum!')
    }
    const bucket = new Bucket(bakancsArr.length+1,location, new Date(date1Form.value), true)
    return bucket;

}



function arrayLetrehozas(): void {
    console.log(utazasArr,bakancsArr)
    uniqueU = [...new Map(utazasArr.map(u => [u.location(), u])).values()];
    unique = [...bakancsArr,...uniqueU];
    console.log(unique);
}

async function init(){
    await frissites();
    arrayLetrehozas();
    kiiras();
}

letrehozas.addEventListener('click', () => {
    bucketModal(false, undefined);
})

form.addEventListener('submit', (e: Event) => {
    const target = e.currentTarget as HTMLButtonElement;
    if(target.dataset.id = 'uj') {
        ujHozzadasa('utazas', 0);
    }
    else {
        if(target.dataset.class = 'bucket') {
            ujHozzadasa('utazas', parseInt(target.dataset.id));
        }
        else if (target.dataset.class = 'utazas') {
            ujHozzadasa('bucket', parseInt(target.dataset.id));
        }
    }
})

document.addEventListener('DOMContentLoaded', init)