export class Bucket {
    city: string;
    country: string;
    date: Date;

    constructor(city: string, country: string, date: Date) {
        if(city == null || country == null) {
            throw new Error("Nem lehet üres a város és az ország mező!"); 
        }
        else if (!(date.getTime())) {
            throw new Error("Nem megfelelő a dátum!");
        }

        this.city = city;
        this.country = country;
        this.date = date;
    }

    writeDate(date: Date): string {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
}