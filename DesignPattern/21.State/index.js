class Green {
    light
    constructor(light) {
        this.light = light
    }

    go() {
        console.log('Green --> for 1 minute')
        this.light.change(new Yellow(this.light))
    }
}

class Yellow {
    light
    constructor(light) {
        this.light = light
    }

    go() {
        console.log('Yellow --> for 10 seconds')
        this.light.change(new Red(this.light))
    }
}

class Red {
    light
    constructor(light) {
        this.light = light
    }

    go() {
        console.log(`Red --> for 1 minute`)
        this.light.change(new Green(this.light))
    }
}

class TrafficLight {
    constructor() {
        this.count = 0
        this.change = (state) => {
            if (this.count++ >= 10) return
            this.currentState = state
            this.currentState.go()
        }
        this.start = () => {
            this.currentState.go()
        }
        this.currentState = new Red(this)
    }
}

const run = () => {
    let light = new TrafficLight()
    light.start()
}

run()
