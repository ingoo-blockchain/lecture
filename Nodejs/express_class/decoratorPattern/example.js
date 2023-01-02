class Espressso {
    constructor() {
        this.cost = 2500
    }
}

class Americano extends Espressso {
    constructor() {
        super()
        this.cost = this.cost + 500
        this.water = 250
    }
}

class CafeLatter extends Americano {
    constructor() {
        super()
        this.cost = this.cost + 500
        this.milk = 100
    }
}

console.log(new Espressso())
console.log(new Americano())
console.log(new CafeLatter())

class Water {
    constructor(espressso) {
        espressso.cost = espressso.cost + 500
        espressso.water = 250
        return espressso
    }
}

class Milk {
    constructor(espressso) {
        espressso.cost = espressso.cost + 500
        espressso.milk = 100
        return espressso
    }
}

const espressso = new Espressso()
const water = new Water(espressso)
const antoccino = new Milk(new Espressso())
console.log(water)
console.log(new Milk(water))
console.log(antoccino)
