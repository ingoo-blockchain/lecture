import Component from '../../../core/component.js'

export default class CommentItem extends Component {
    setup() {
        this.state = {
            updated: null,
        }
    }

    template() {
        return this.props.comments.map(
            (item) => `
            <ul class="comment-row">
                <li>${item.userid}</li>
                <li>
                    <span class='comment-content' data-component="comment-content" data-id='${
                        item.id
                    }' data-content=''>${this.commentContentRow(item)}<span>
                    <span class='comment-delete' data-id="${item.id}">❌</span>
                </li>
                <li>${item.date}</li>
            </ul>
        `,
        )
    }

    mounted() {}

    handleDelete(e) {
        const { id } = e.target.dataset
        this.props.deleteItem(id)
    }

    commentContentRow(row) {
        const { content } = row
        const commentUpdateInput = `<input type="text" class="comment-update-input" value="${content}"/>`
        const isUpdated = row.id === parseInt(this.state.updated)
        if (isUpdated) {
            return commentUpdateInput
        }

        return content
    }

    handleUpdate(e) {
        const { id } = e.target.dataset
        if (!id) return
        this.setState({ updated: parseInt(id) })
    }

    handleKeyDown({ keyCode, target }) {
        if (keyCode !== 13) return

        const { id } = target.parentNode.dataset
        const { value: content } = target
        this.props.updateItem(id, content)
    }

    setEvent() {
        const handleDelete = this.handleDelete.bind(this)
        this.addEvent('click', '.comment-delete', handleDelete)

        const handleUpdate = this.handleUpdate.bind(this)
        this.addEvent('click', '.comment-content', handleUpdate)

        if (!this.state.updated) {
            const handleKeyDown = this.handleKeyDown.bind(this)
            this.addEvent('keydown', '.comment-update-input', handleKeyDown)
        }
    }
}
