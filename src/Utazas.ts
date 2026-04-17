export class Utazas {
    city: string;
    country: string;
    price: number;
    dateStart: Date;
    dateEnd: Date;
    rating: number;
    bucket: boolean;
    
    constructor(city: string, country: string, price: number, date_1: Date, date_2: Date, rating: number, bucket: boolean) {
        if(city == null || city == null) {
            throw new Error("Nem lehet üres a város és az ország mező!"); 
        }
        else if(price < 0 || price == null) {
            throw new Error("Nem megfelelő az ár!"); 
        }
        else if (!(date_1.getTime()) || !(date_2.getTime())) {
            throw new Error("Nem megfelelő a dátum!");
        }
        else if (rating < 0 || rating > 5 || rating == null) {
            throw new Error("Nem megfelelő a értékelés!"); 
        }
        if (date_1.getTime() > date_2.getTime()) {
            this.dateStart = date_2;
            this.dateEnd = date_1;
        }
        else {
            this.dateStart = date_1;
            this.dateEnd = date_2;
        }
        this.city = city;
        this.country = country;
        this.price = price;
        this.rating = rating;
        this.bucket = bucket;
    }

    writeDate(date: Date): string {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
}

//https://retoolapi.dev/PxmLfg/utazas