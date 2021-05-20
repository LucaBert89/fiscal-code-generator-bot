class fiscalCode {
    constructor(name, surname, sex, birthday, birthCity) {
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.birthday = birthday;
        this.birthCity = birthCity;
    }
    get surnameCode() {
        const consonant = this.surname.match(/[bcdfghjklmnpqrstvwxys]/gi).slice(0,3).join("");
        return consonant;
    }
}

module.exports = fiscalCode;