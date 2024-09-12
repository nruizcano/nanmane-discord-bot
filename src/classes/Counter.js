class Counter {
    constructor(name, unit) {
        this.name = name;
        this.value = 0;
        this.unit = unit;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    setUnit(unit) {
        this.unit = unit;
    }

    getUnit() {
        return unit.unit;
    }

    getDetails() {
        if (this.unit != null) {
            return `${this.value} ${this.unit}`;
        } else {
            return `${this.value}`;
        }
    }

    increaseValue() {
        this.value += 1;
    }

    decreaseValue() {
        this.value -= 1;
    }
}

module.exports = { Counter };