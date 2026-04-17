import { describe, expect, test } from "vitest"
import { Utazas } from "../src/Utazas.ts"


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
    test('hibás ár', () => {
        const lista: Utazas[] =[];
        expect(()=> 
            lista.push(new Utazas("Budapest, Magyaro", -1, new Date("2026.03.12"),new Date("2026.03.16"),5,false))
    ).toThrow();
    });
})

describe('Bucket', () => {

})