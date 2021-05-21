class fiscalCode {
    constructor(name, surname, sex, birthday, birthCity) {
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.birthday = birthday;
        this.birthCity = birthCity;
    }
    get surnameCode() {
        const consonant = this.surname.replace(/\s+/g, '').match(/[bcdfghjklmnpqrstvwxys]/gi);
        const vowel = this.surname.replace(/\s+/g, '').match(/[aeiou]/gi);
        return consonant && consonant.length > 0 ? surnameGenerator(consonant,vowel) : vowel.slice(0,3).join("").toUpperCase();

    }
}

function surnameGenerator(consonant, vowel) {
        const fiscalConsonant = consonant.slice(0,3).join("");
        if(fiscalConsonant.length === 3) {
            return fiscalConsonant.toUpperCase();
        } else {
            const addVowel = fiscalConsonant + vowel.slice(0,3-fiscalConsonant.length).join("");
            return addVowel.toUpperCase();
        }
} 

module.exports = fiscalCode;