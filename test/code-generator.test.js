const fiscalGenerator = require("../src/code-generator");

describe('should generate the surname combination for the fiscal code', () => {

   const codeGenerator = new fiscalGenerator("", "Bertoldi","","","");
    test("should return 3 consonants of the surname", () => {
        expect(codeGenerator.surnameCode).toBe("BRT");
    });

    const codeGenerator2 = new fiscalGenerator("", "Beroi","","","");
    test("should return 2 consonants and 1 vowel of the surname", () => {
        expect(codeGenerator2.surnameCode).toBe("BRE");
    });

    const codeGenerator3 = new fiscalGenerator("", "Aeooi","","","");
    test("should return 3 vowels of the surname", () => {
        expect(codeGenerator3.surnameCode).toBe("AEO");
    });

    const codeGenerator4 = new fiscalGenerator("", "Beer Root","","","");
    test("should return 3 vowels of the surname", () => {
        expect(codeGenerator4.surnameCode).toBe("BRR");
    });
})

describe('should generate the name combination for the fiscal code', () => {

    const codeGenerator = new fiscalGenerator("Ricardo", "Bertoldi","","","");
     test("should return the first,third and fourth consonants of the name", () => {
         expect(codeGenerator.nameCode).toBe("Rrd");
     });
     
     const codeGenerator1 = new fiscalGenerator("Manuel", "Bertoldi","","","");
     test("should return the first three consonant of the name", () => {
         expect(codeGenerator1.nameCode).toBe("Mnl");
     });
   
 })