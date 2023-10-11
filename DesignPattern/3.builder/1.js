class Shop {
    constructor() {}

    static build(builder) {
        builder.step1()
        builder.step2()
        return builder.get()
    }
}

class Car {
    doors = 0
    constructor() {}

    addParts() {
        this.doors = 4
    }

    say() {
        console.log(` I am a ${this.doors} - door car`)
    }
}

class CarBuilder {
    car = null
    constructor() {}

    step1() {
        this.car = new Car()
    }

    step2() {
        this.car.addParts()
    }

    get() {
        return this.car
    }
}

;(() => {
    const carBuilder = new CarBuilder()
    const car = Shop.build(carBuilder)
    const say = car.say()
})()
