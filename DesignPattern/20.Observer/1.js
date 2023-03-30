class Click {
    constructor() {
        this.handlers = []
    }

    subscribe(fn) {
        this.handlers.push(fn)
    }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter((item) => item !== fn)
    }

    fire(o, thisObj) {
        const socpe = thisObj || globalThis
        this.handlers.forEach((item) => {
            item.call(socpe, o)
        })
    }
}

class Main {
    static start() {
        const clickHandler = (item) => console.log(`fired: ${item}`)
        const moveHandler = (item) => console.log(`hello:  ${item}`)

        const click = new Click()

        click.subscribe(clickHandler)
        click.fire('#event 1')
        click.unsubscribe(clickHandler)
        click.fire('#event 2')
        click.subscribe(clickHandler, { name: 'ingoo' })
        click.subscribe(moveHandler, { name: 'ingoo' })
        click.fire('#event 3')
    }
}

Main.start()
