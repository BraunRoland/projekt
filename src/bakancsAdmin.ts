import { Bucket } from "./Bucket.ts";
import { Utazas } from "./Utazas.ts";
const table = document.getElementById("tableKiiras") as HTMLTableSectionElement;
const closeU = document.getElementById('utazasClose') as HTMLSpanElement;
const modiU = document.getElementById('utazasModi') as HTMLDivElement;
const header = document.getElementById('headerForm') as HTMLHeadElement;
const form = document.getElementById('utazasForm') as HTMLFormElement;
const letrehozas = document.getElementById('create') as HTMLButtonElement;



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
    if (bucket == true) {
        elem = bakancsArr.find(e => e.id === id) as Bucket;
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
}

/** 

--Bucketform--

<div class="mb-3 mt-3">
    <label for="city" class="form-label">Város:</label>
    <input type="text" class="form-control" id="city" placeholder="Add meg a várost" name="city">
</div>
<div class="mb-3">
    <label for="country" class="form-label">Ország:</label>
    <input type="text" class="form-control" id="country" placeholder="add meg az országot" name="country">
</div>
<div class="mb-3">
    <label for="date1" class="form-label">Utazás kezdete:</label>
    <input type="date" class="form-control" id="date1" placeholder="add meg a kezdést" name="date1">
</div>

--UtazasForm--

<div class="mb-3 mt-3">
    <label for="city" class="form-label">Város:</label>
    <input type="text" class="form-control" id="city" placeholder="Add meg a várost" name="city">
</div>
<div class="mb-3">
    <label for="country" class="form-label">Ország:</label>
    <input type="text" class="form-control" id="country" placeholder="add meg az országot" name="country">
</div>
<div class="mb-3">
    <label for="date1" class="form-label">Utazás kezdete:</label>
    <input type="date" class="form-control" id="date1" placeholder="add meg a kezdést" name="date1">
</div>
<div class="mb-3">
    <label for="date2" class="form-label">Utazás vége:</label>
    <input type="date" class="form-control" id="date2" placeholder="add meg a végét" name="date2">
</div>
<div class="mb-3">
    <label for="price" class="form-label">Összeg:</label>
    <input type="number" class="form-control" id="price" placeholder="add meg az összeget" name="price">
</div>
<div class="mb-3">
    <label for="date2" class="form-label">Értékelés:</label>
    <select class="form-select" id="rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
<div id="modiAlert" class="alert alert-danger" hidden>

</div>
<button delete id="delete" type="button" class="btn btn-danger delete">Törlés</button>
<button type="submit" id="submit" class="btn btn-primary submit">Módosítás</button>
<button type="button" id="createForm" class="btn btn-primary submit" hidden> Létrehozás</button>
                
**/


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

document.addEventListener('DOMContentLoaded', init)