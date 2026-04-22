export class Utazas {
    id: number;
    city: string;
    country: string;
    price: number;
    dateStart: Date;
    dateEnd: Date;
    rating: number;
    bucket: boolean;
    
    constructor(id: number, location: string, price: number, date_1: Date, date_2: Date, rating: number, bucket: boolean) {
        let hely = location.split(",")
        let city  =  hely[0]?.trim();
        let country  =  hely[1]?.trim();

        if(city == null || country == null || city == '' || country == '') {
            throw new Error("Nem lehet üres a város és az ország mező!"); 
        }
        else if(price < 1 || price == null) {
            throw new Error("Nem megfelelő az ár!"); 
        }
        else if (rating < 0 || rating > 5 || rating == null) {
            throw new Error("Nem megfelelő a értékelés!"); 
        }
        if ( date_1 instanceof Date && date_2 instanceof Date)
        {
            if (date_1.getTime() > date_2.getTime()) {
                this.dateStart = date_2;
                this.dateEnd = date_1;
            }
            else  {
                this.dateStart = date_1;
                this.dateEnd = date_2;
            }
        }
        else {
            throw new Error("Nem jó a dátum!");
        }

        this.city = city;
        this.country = country;
        this.price = price;
        this.rating = rating;
        this.bucket = bucket;
        this.id = id;
    }

    writeDateStart(): string {
        return `${this.dateStart.getFullYear()}.${this.dateStart.getMonth() + 1}.${this.dateStart.getDate()}`;
    }

    writeDateEnd(): string {
        return `${this.dateEnd.getFullYear()}.${this.dateEnd.getMonth() + 1}.${this.dateEnd.getDate()}`;
    }
}

//https://retoolapi.dev/PxmLfg/utazas