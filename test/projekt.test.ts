import { describe, expect, test } from "vitest";
import { Utazas } from "../src/Utazas.ts";


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
})

describe('Bucket', () => {

})