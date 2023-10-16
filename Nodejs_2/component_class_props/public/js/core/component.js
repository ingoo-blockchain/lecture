class Component {
    props
    target
    state = {}
    constructor(target, props) {
        this.props = props
        this.target = target
        this.setup()
        this.setEvent()
        this.render()
    }

    setup() {}
    template() {
        return ''
    }
    setState(newState) {
        this.state = { ...this.state, ...newState }
        this.render()
    }

    mounted() {}

    render() {
        this.target.innerHTML = this.template()
        this.mounted()
    }
    setEvent() {}
    addEvent(eventType, selector, callback) {
        this.target.addEventListener(eventType, (e) => {
            if (!e.target.closest(selector)) return false
            callback(e)
        })
    }
}

export default Component
