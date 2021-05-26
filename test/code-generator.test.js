const fiscalGenerator = require("../src/code-generator");
const fetch = require("node-fetch");

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
     test("if there are more than 3 consonant it should return the first,third and fourth consonants of the name", () => {
         expect(codeGenerator.nameCode).toBe("RRD");
     });
     
     const codeGenerator1 = new fiscalGenerator("Manuel", "Bertoldi","","","");
     test("if the consonant are three return the first three consonant of the name", () => {
         expect(codeGenerator1.nameCode).toBe("MNL");
     });

     const codeGenerator3 = new fiscalGenerator("Ciro", "Bertoldi","","","");
     test("if the consonant are less than three, return vowel", () => {
         expect(codeGenerator3.nameCode).toBe("CRI");
     });
   
 })

 describe('should generate the birthday combination for the fiscal code', () => {

    const codeGenerator = new fiscalGenerator("Ricardo", "Bertoldi","08/12/1987","","");
     test("take the last two digits of the YEAR and the code for the month", () => {
         expect(codeGenerator.birthdayCode).toBe("87T");
     });
   
 })

 describe('should generate the code of the gender for the fiscal code', () => {

    const codeGenerator = new fiscalGenerator("Ricardo", "Bertoldi","08/12/1987","M","");
     test("take the last two digits of the YEAR and the code for the month", () => {
         expect(codeGenerator.genderCode).toBe("08");
     });

     const codeGenerator1 = new fiscalGenerator("Ricardo", "Bertoldi","08/12/1987","F","");
     test("take the last two digits of the YEAR and the code for the month", () => {
         expect(codeGenerator1.genderCode).toBe("48");
     });
   
 })
 
 describe('should generate the code of the city', () => {

    const codeGenerator = new fiscalGenerator("Ricardo", "Bertoldi","08/12/1987","M","Trento");
     test("take the code of the city added inside object", async  () => {
         const data = await codeGenerator.birthCityCode();
         expect(data).toEqual("L378");
     });
   
 })