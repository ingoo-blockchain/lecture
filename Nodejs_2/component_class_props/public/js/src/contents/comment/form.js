import Component from '../../../core/component.js'

export default class CommentForm extends Component {
    setup() {}
    template() {
        return `
        <span class="ps-box">
            <input type="text" name='content' id='content' placeholder="댓글 내용을 입력해주세요." />
        </span>
        <button type="submit" class="btn">등록</button>
        `
    }
    mounted() {}

    handleSubmit(e) {
        e.preventDefault()

        const { value: content } = e.target.content
        this.props.insertItem(content)
    }

    setEvent() {
        const handleSubmit = this.handleSubmit.bind(this)
        this.addEvent('submit', '.commentFrm', handleSubmit)
    }
}
