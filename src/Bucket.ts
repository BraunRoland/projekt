export class Bucket {
    id: number;
    city: string;
    country: string;
    date: Date;
    bucket: boolean;

    constructor(id: number, location: string, date: Date, bucket: boolean) {
        let hely = location.split(",")
        let city  =  hely[0]?.trim();
        let country  =  hely[1]?.trim()
        
        if(city == null || country == null || city == '' || country == '') {
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
        this.bucket = bucket;
        this.id = id;
    }

    writeDate(): string {
        return `${this.date.getFullYear()}.${this.date.getMonth() + 1}.${this.date.getDate()}`;
    }

    location(): string {
        return `${this.city}, ${this.country}`;
    }
}

//https://retoolapi.dev/IwrmvF/bucket