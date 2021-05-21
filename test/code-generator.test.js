const fiscalGenerator = require("../src/code-generator");

describe('should generate the fiscal code', () => {

    const codeGenerator = new fiscalGenerator("", "Bertoldi","","","");
    test("should return 3 consonant of the surname", () => {
        expect(codeGenerator.surnameCode).toBe("Brt");
    });

    const codeGenerator2 = new fiscalGenerator("", "Beroi","","","");
    test("should return 2 consonant and 1 vowel of the surname", () => {
        expect(codeGenerator2.surnameCode).toBe("Bre");
    });

    const codeGenerator3 = new fiscalGenerator("", "Aeooi","","","");
    test("should return 3 vowel of the surname", () => {
        expect(codeGenerator3.surnameCode).toBe("Aeo");
    });
})