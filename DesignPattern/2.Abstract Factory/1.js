class Employee {
    constructor(name) {
        this.name = name
    }

    say() {
        console.log(`I am employee ${this.name}`)
    }
}

class EmployeeFactory {
    constructor() {}

    create(name) {
        return new Employee(name)
    }
}

class Vendor {
    constructor(name) {
        this.name = name
    }

    say() {
        console.log(`I am vender ${this.name}`)
    }
}

class VendorFactory {
    constructor() {}

    create(name) {
        return new Vendor(name)
    }
}

;(() => {
    const persons = []

    const employeeFactory = new EmployeeFactory()
    const vendorFactory = new VendorFactory()

    persons.push(employeeFactory.create('Joan DiSilva'))
    persons.push(employeeFactory.create("Tim O'Neill"))
    persons.push(vendorFactory.create('Gerald Watson'))
    persons.push(vendorFactory.create('Nicole McNight'))

    for (const person of persons) {
        person.say()
    }
})()
