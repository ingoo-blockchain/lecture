class Component {
    $target
    $state

    constructor($target) {
        this.$target = $target
        this.setup()
        this.render()
    }

    setup() {}
    template() {
        return ''
    }

    render() {
        this.$target.innerHTML = this.template()
        this.setEvent()
    }

    setEvent() {}

    setState(newState) {
        this.$state = { ...this.$state, ...newState }
        this.render()
    }
}

class App extends Component {
    setup() {
        this.$state = { list: [{ content: 1 }, { content: 2 }, { content: 3 }] }
    }

    template() {
        const { list } = this.$state

        return `
        <button id='add'>추가</button>
        <ul>
            ${list.map((comment) => `<li>${comment.content}</li>`).join('')}
        </ul>
        
    `
    }

    setEvent() {
        this.$target.querySelector('button').addEventListener('click', () => {
            const { list } = this.$state
            this.setState({ list: [...list, { content: list.length + 1 }] })
        })
    }
}

new App(document.querySelector('#app'))
