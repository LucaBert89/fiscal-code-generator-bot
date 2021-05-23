class fiscalCode {
    constructor(name, surname, birthday, sex, birthCity) {
        this.name = name;
        this.surname = surname;
        this.birthday = birthday;
        this.sex = sex;
        this.birthCity = birthCity;
    }
    get surnameCode() {
        const consonant = this.surname.replace(/\s+/g, '').match(/[bcdfghjklmnpqrstvwxys]/gi);
        const vowel = this.surname.replace(/\s+/g, '').match(/[aeiou]/gi);
        return consonant && consonant.length > 0 ? surnameGenerator(consonant,vowel) : vowel.slice(0,3).join("").toUpperCase(); 
    }
    get nameCode() {
        const consonant = this.name.replace(/\s+/g, '').match(/[bcdfghjklmnpqrstvwxys]/gi);
        const vowel = this.name.replace(/\s+/g, '').match(/[aeiou]/gi);
        if(consonant.length >= 4) {
            return consonant.slice(0,4).map((e,i) => {if(i != 1) return e}).join("").toUpperCase();
        } else {
            return consonant && consonant.length > 0 ? surnameGenerator(consonant,vowel) : vowel.slice(0,3).join("").toUpperCase(); 
        }
    }
    get birthdayCode() {
        const dayTable = {
            "01":"A",
            "02": "B",
            "03": "C",
            "04": "D",
            "05": "E",
            "06": "H",
            "07": "L",
            "08": "M",
            "09": "P",
            "10": "R",
            "11": "S",
            "12": "T"

        }
        console.log(dayTable[this.birthday.slice(3,5)]);
        return this.birthday.slice(-2) + dayTable[this.birthday.slice(3, 5)];
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