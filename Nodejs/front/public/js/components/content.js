import Component from '/js/core/Component'

class Content extends Component {
    constructor(_target, _props) {
        super(_target, _props)
        console.log(_props)
    }
    setup() {
        this.$state = {
            content: props.content,
        }
    }

    template() {
        return `
            <span class="comment-update-btn">${this.$state.content}</span>
            <span class="comment-delete-btn">❌</span>
        `
    }
}

export default Content
