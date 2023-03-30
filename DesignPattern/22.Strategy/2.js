class Character {
    #name
    #movingStrategy
    #attackStrategy

    constructor(_name) {
        this.#name = _name
    }

    get name() {
        return this.#name
    }

    move() {
        this.#movingStrategy.move()
    }

    attack() {
        this.#attackStrategy.attack()
    }

    set movingStrategy(strategy) {
        this.#movingStrategy = strategy
    }

    set attackStrategy(strategy) {
        this.#attackStrategy = strategy
    }
}

class BonoBono extends Character {
    constructor(_name) {
        super(_name)
    }
}

class Hani extends Character {
    constructor(_name) {
        super(_name)
    }
}

// Javascript Interface 구현
class MovingStrategy {
    constructor() {
        if (this.constructor === MovingStrategy)
            throw new Error('정의된 인터페이스는 자기 자신을 객체를 가질수 없습니다.')

        return this
    }

    move() {
        throw new Error('정의된 인터페이스는 자신을 호출할수 없습니다.')
    }
}

class FlyingStrategy extends MovingStrategy {
    move() {
        console.log(` 날아 다닌다~`)
    }
}

class WalkingStrategy extends MovingStrategy {
    move() {
        console.log(' 걸어 다닌다~')
    }
}

class AttackStrategy {
    constructor() {
        if (this.constructor === MovingStrategy)
            throw new Error('정의된 인터페이스는 자기 자신을 객체를 가질수 없습니다.')

        return this
    }

    attack() {
        throw new Error('정의된 인터페이스는 자신을 호출할수 없습니다.')
    }
}

class PunchStrategy extends AttackStrategy {
    attack() {
        console.log(' 주먹으로 때린다.')
    }
}

class MissileStrategy extends AttackStrategy {
    attack() {
        console.log(' 미사일 날린다~')
    }
}

class Main {
    static start() {
        const hani = new Hani('hani')
        const bonobono = new BonoBono('bonobono')

        hani.movingStrategy = new WalkingStrategy()
        hani.attackStrategy = new MissileStrategy()

        bonobono.movingStrategy = new FlyingStrategy()
        bonobono.attackStrategy = new PunchStrategy()

        const list = [hani, bonobono]

        for (const instance of list) {
            console.log(`my name is ${instance.name}`)

            instance.move()
            instance.attack()
        }
    }
}

Main.start()
