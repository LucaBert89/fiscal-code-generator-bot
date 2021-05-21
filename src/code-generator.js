class fiscalCode {
    constructor(name, surname, sex, birthday, birthCity) {
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.birthday = birthday;
        this.birthCity = birthCity;
    }
    get surnameCode() {
        const consonant = this.surname.match(/[bcdfghjklmnpqrstvwxys]/gi);
        const vowel = this.surname.match(/[aeiou]/gi);
        if(consonant && consonant.length > 0 ) {
            return surnameGenerator(consonant, vowel);
        } else {
            return vowel.slice(0,3).join("");
        }
       
    }
}

function surnameGenerator(consonant, vowel) {
        const fiscalConsonant = consonant.slice(0,3).join("");
        if(fiscalConsonant.length === 3) {
            return fiscalConsonant;
        } else {
            const addVowel = fiscalConsonant + vowel.slice(0,3-fiscalConsonant.length).join("");
            return addVowel;
        }
} 

module.exports = fiscalCode;