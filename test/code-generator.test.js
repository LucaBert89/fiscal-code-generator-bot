const fiscalGenerator = require("../src/code-generator");

describe('should generate the fiscal code', () => {
    
    const codeGenerator = new fiscalGenerator("", "Bertoldi","","","");
    test("should return 3 consonant of the surname", () => {
        expect(codeGenerator.surnameCode).toBe("Brt");
    });
})