export class Bucket {
    city: string;
    country: string;
    date: Date;

    constructor(location: string, date: Date) {
        let hely = location.split(",")
        let city  =  hely[0]?.trim();
        let country  =  hely[1]?.trim()
        
        if(city == null || country == null) {
            throw new Error("Nem lehet üres a város és az ország mező!"); 
        }

        if (date instanceof Date) {
            this.date = date;
        }
        else {
            throw new Error("Nem jó a dátum!")
        }
        this.city = city;
        this.country = country;
    }

    writeDate(date: Date): string {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
}

//https://retoolapi.dev/IwrmvF/bucket