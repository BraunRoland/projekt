export class Bucket {
    city: string;
    country: string;
    date: Date;
    bucket: boolean;

    constructor(location: string, date: Date) {
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
        this.bucket = true;
    }

    writeDate(): string {
        return `${this.date.getFullYear()}.${this.date.getMonth() + 1}.${this.date.getDate()}`;
    }
}

//https://retoolapi.dev/IwrmvF/bucket