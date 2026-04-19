import { describe, expect, test } from "vitest";
import { Utazas } from "../src/Utazas.ts";
import { Bucket } from "../src/Bucket.ts";


describe('Utazas', () => {
    test('sikeres felvétel', () => {
        const lista: Utazas[] =[];
        lista.push(new Utazas("Budapest, Magyrország", 30000, new Date("2026.03.12"),new Date("2026.03.16"),5,false));
        expect(lista.length).toBe(1);
    });
    test('hibás helyszin', () => {
        const lista: Utazas[] =[];
        expect(()=> 
            lista.push(new Utazas("Budapest", 30000, new Date("2026.03.12"),new Date("2026.03.16"),5,false))
    ).toThrow();
    });
    test('hibás ár - minusz', () => {
        const lista: Utazas[] =[];
        expect(()=> 
            lista.push(new Utazas("Budapest, Magyaro", -1, new Date("2026.03.12"),new Date("2026.03.16"),5,false))
    ).toThrow();
    });

    test('hibás ár - 0', () => {
        expect(() => new Utazas("Budapest, Magyaro", 0, new Date("2026.03.12"),new Date("2026.03.16"),5,false)).toThrow();
    });
    test('date_1 a nagyobb', () => {
        let utazas: Utazas = new Utazas("Budapest, Magyaro", 3000, new Date("2026.03.17"),new Date("2026.03.14"),5,false);
        expect(utazas.dateStart).toEqual(new Date("2026.03.14"));
    });
    test('date_2 a nagyobb', () =>{
        let utazas: Utazas = new Utazas("Budapest, Magyaro", 450000, new Date("2026.03.10"),new Date("2026.03.16"),5,false);
        expect(utazas.dateStart).toEqual(new Date('2026.03.10'));
    });
    test('mindkettő dátum ugyanaz', () => {
        let utazas: Utazas = new Utazas("Budapest, Magyaro", 20456, new Date("2026.03.16"),new Date("2026.03.16"),5,false);
    });
    test('writeDateStart()', () => {
        let utazas: Utazas = new Utazas("Budapest, Magyaro", 450000, new Date("2026.03.10"),new Date("2026.03.16"),5,false);
        expect(utazas.writeDateStart()).toBe('2026.3.10');
    });
    test('writeDateEnd()', () => {
        let utazas: Utazas = new Utazas("Budapest, Magyaro", 450000, new Date("2026.03.10"),new Date("2026.03.16"),5,false);
        expect(utazas.writeDateEnd()).toBe('2026.3.16');
    });
});

describe('Bucket', () => {
    test('sikeres felvétel', () => {
        expect(()=> new Bucket('Budapest, Magyarország',new Date('2026.05.14'))).not.toThrow();
    });
    test('hibás helyszin', () => {
        expect(() => new Bucket('Budapest',new Date('2026.05.14'))).toThrow();
    });
    test('Hibás helyszin vesszővel', () => {
        expect(() => new Bucket('Budapest, ',new Date('2026.05.14'))).toThrow();
    });
    test('writeDate()', () => {
        let bucket: Bucket = new Bucket('Budapest, Magyarország',new Date('2026.05.14'));
        expect(bucket.writeDate()).toBe('2026.5.14');
    });
});