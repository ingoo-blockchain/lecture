class BoardItem {
    constructor() {}
}

class BoardList {
    list = []
    constructor() {
        const storage = window.localStorage.getItem('list') || null
        this.list = JSON.parse(storage)
    }

    get() {
        return this.list
    }
    set(item) {
        this.list.push(JSON.parse(item))
    }
}

class Board {}
