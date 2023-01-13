class Component {
    target
    state
    props

    constructor(_target, _props) {
        this.target = _target
        this.props = _props
        this.setup()
        this.render()
        this.setEvent()
    }

    setup() {}
    template() {
        return ''
    }

    mounted() {}

    render() {
        this.target.innerHTML = this.template()
        this.mounted()
    }

    setState(newState) {
        this.state = { ...this.state, ...newState }
        this.render()
    }
    setEvent() {}
    addEvent(eventType, selector, callback) {
        const children = [...this.target.querySelectorAll(selector)]
        const isTarget = (target) => children.includes(target) || target.closest(selector)

        this.target.addEventListener(eventType, (event) => {
            if (!isTarget(event.target)) return false
            callback(event)
        })
    }
}

export default Component
