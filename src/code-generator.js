
const fetch = require("node-fetch");

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
    get birthCityCode() {
        getDataCsv(this.birthCity);
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

async function getDataCsv(birthCity) {
    const response = await fetch("https://www.istat.it/storage/codici-unita-amministrative/Elenco-comuni-italiani.csv");
    const data = await response.text();
    const tableRows = data.split(/\n/);
    tableRows.forEach(e =>{
        const row = e.split(";");
        if(row[6] === `${birthCity}`) {
            return row[19];
        }
    })
}

  getDataCsv();

module.exports = fiscalCode;