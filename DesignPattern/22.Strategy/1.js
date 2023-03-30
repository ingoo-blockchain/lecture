class Character {
    name
    constructor(_name) {
        this.name = _name
    }

    attack() {}
    move() {}
}

class BonoBono extends Character {
    constructor(_name) {
        super(_name)
    }

    attack() {
        console.log(`${this.name} 공격`)
    }

    move() {
        console.log(`${this.name} 이동`)
    }
}

class Hani extends Character {
    constructor(_name) {
        super(_name)
    }

    attack() {
        console.log(`${this.name} 공격`)
    }

    move() {
        console.log(`${this.name} 이동`)
    }
}

class Main {
    static start() {
        const bonobono = new BonoBono('bonobono')
        const hani = new Hani('hani')

        bonobono.attack()
        bonobono.move()

        console.log(`-------`)

        hani.attack()
        hani.move()
    }
}

Main.start()
