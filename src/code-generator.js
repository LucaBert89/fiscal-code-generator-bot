const fetch = require("node-fetch");
const control = require("./controlChart");

class fiscalCode {
    constructor(name, surname, birthday, gender, birthCity) {
        this.name = name;
        this.surname = surname;
        this.birthday = birthday;
        this.gender = gender;
        this.birthCity = birthCity;
    }
    get surnameCode() {
        const consonant = this.surname.replace(/\s+/g, '').match(/[bcdfghjklmnpqrstvwxys]/gi);
        const vowel = this.surname.replace(/\s+/g, '').match(/[aeiou]/gi);
        return consonant && consonant.length > 0 ? this.surnameGenerator(consonant,vowel) : vowel.slice(0,3).join("").toUpperCase(); 
    }
    get nameCode() {
        const consonant = this.name.replace(/\s+/g, '').match(/[bcdfghjklmnpqrstvwxys]/gi);
        const vowel = this.name.replace(/\s+/g, '').match(/[aeiou]/gi);
        if(consonant.length >= 4) {
            return consonant.slice(0,4).map((e,i) => {if(i != 1) return e}).join("").toUpperCase();
        } else {
            return consonant && consonant.length > 0 ? this.surnameGenerator(consonant,vowel) : vowel.slice(0,3).join("").toUpperCase(); 
        }
    }
    surnameGenerator(consonant, vowel) {
        const fiscalConsonant = consonant.slice(0,3).join("");
        if(fiscalConsonant.length === 3) {
            return fiscalConsonant.toUpperCase();
        } else {
            const addVowel = fiscalConsonant + vowel.slice(0,3-fiscalConsonant.length).join("");
            return addVowel.toUpperCase();
        }
    }
    get birthdayCode() {
        const monthTable = {
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
        return this.birthday.slice(-2) + monthTable[this.birthday.slice(3, 5)];
    }
    get genderCode() {
        if(this.gender === "F") {
            return (parseInt(this.birthday.slice(0,2)) + 40).toString();
        } else {
            return this.birthday.slice(0,2);
        }
    }
    async birthCityCode() {
        const response = await fetch("https://www.istat.it/storage/codici-unita-amministrative/Elenco-comuni-italiani.csv");
        const data = await response.text();
        const tableRows = data.split(/\n/);
        
        for(const table of tableRows) {
            const row = table.split(";");
            if(row[6] === `${this.birthCity}`) {return row[19];}
        }
    }
    async controlCharacter() {
        const string = this.surnameCode + this.nameCode + this.birthdayCode + this.genderCode + await this.birthCityCode();
        const conversionArray = [];
        string.split("").forEach(function(e,i) {
            return ((i+1) % 2 === 0) ? conversionArray.push(control.conversion.pair[e]) : conversionArray.push(control.conversion.odd[e]);
        });
        return control.conversion.controlChar[conversionArray.reduce(function(total, current) { return total + current}) % 26];
    }
}


module.exports = fiscalCode
