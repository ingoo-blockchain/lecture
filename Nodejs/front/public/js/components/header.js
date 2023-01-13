import Component from '/js/core/Component.js'

class Header extends Component {
    constructor(_target, _props) {
        super(_target, _props)
        console.log(this)
    }

    setup() {}

    template() {
        return `
        <form id="commentFrm">
            <h4>
                댓글쓰기
                <span></span>
            </h4>
            <span class="ps_box">
                <input type="text" placeholder="댓글 내용을 입력해주세요." class="int" name="content" />
            </span>
            <input type="submit" class="btn" value="등록" />
        </form>
        `
    }

    setEvent() {
        this.addEvent('submit', '#commentFrm', (e) => {
            e.preventDefault()
            // const { list } = this.$state
            const { content } = e.target
            // this.setState({ list: [...list, { content: content.value, updated: false }] })
            // this.props.add(content.value)
            this.$props.add(content.value)
            content.focus()
            e.target.reset()
        })
    }
}

export default Header
