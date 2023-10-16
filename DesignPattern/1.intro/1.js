class AdvancedShipping {
    constructor() {}

    login(credentials) {}
    setStart(start) {}
    setDestination(destination) {}
    calculate(weight) {
        return '$39.50'
    }
}

class ShippingAdapter extends AdvancedShipping {
    constructor(credentials) {
        super()
        this.login(credentials)
    }

    request(zipStart, zipEnd, weight) {
        this.setStart(zipStart)
        this.setDestination(zipEnd)
        return this.calculate(weight)
    }
}

// run
;(() => {
    const credentials = { token: '30a8-6ee1' }
    const adapter = new ShippingAdapter(credentials)

    const cost = adapter.request('78701', '10010', '2 lbs')
    console.log(`Cost : ${cost}`)
})()
