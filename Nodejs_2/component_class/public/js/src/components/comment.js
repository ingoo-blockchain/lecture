import Component from '../../core/component.js'

const commentForm = () => {
    return `
    <form id="commentFrm" class="commentFrm">
        <span class="ps-box">
            <input type="text" name='content' id='content' placeholder="댓글 내용을 입력해주세요." />
        </span>
        <button type="submit" class="btn">등록</button>
    </form>
    `
}

export default class Comment extends Component {
    setup() {
        const comments = []
        // comments.push()
        this.state = { comments, updated: null }
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

    commentRow() {
        return this.state.comments
            .map(
                (item) => `
        <ul class="comment-row" data-index="${item.id}">
            <li>${item.userid}</li>
            <li>
                <span class='comment-content'>${this.commentContentRow(
                    item,
                    this.state.updated,
                )}</span>
                <span class='comment-delete'>❌</span>
            </li>
            <li>${item.date}</li>
        </ul>
    `,
            )
            .join('')
    }

    handleSubmit(e) {
        e.preventDefault()
        const { value: content } = e.target.content
        const id = this.state.comments.length + 1
        const newState = this.state.comments.push({
            id,
            userid: 'web7722',
            content,
            date: '2023-10-16',
        })

        this.setState({ ...this.state, ...newState, updated: null })
    }

    handleClick(e) {
        const { value: type } = e.target.classList
        const { index: id } = e.target.parentNode.parentNode.dataset

        if (type === 'comment-delete') {
            const newState = this.state.comments.filter((v) => v.id !== parseInt(id))
            this.setState({ ...this.state, comments: [...newState] })
        }

        if (type === 'comment-content') {
            this.setState({ comments: [...this.state.comments], updated: id })
        }
    }

    handleKeydown(e) {
        if (e.keyCode === 13) {
            const { index: id } = e.target.parentNode.parentNode.parentNode.dataset
            const index = this.state.comments.findIndex((v) => v.id === parseInt(id))
            const newState = this.state.comments
            newState[index].content = e.target.value
            this.setState({ ...this.state, comments: [...newState], updated: null })
            document.removeEventListener('keydown', this.handleKeydown)
        }
    }

    template() {
        const { comments, updated } = this.state
        const comment_row = this.commentRow(comments, updated)
        const comment_form = commentForm()
        return `
        <ul class="comment">
            <li class="comment-form">
                <h4>
                    댓글쓰기
                    <span>(${comments.length})</span>
                </h4>
                ${comment_form}
            </li>
            <li class="component-list">
                ${comment_row}
            </li>
        </ul>
    `
    }

    setEvent() {
        const handleSubmit = this.handleSubmit.bind(this)
        this.target.querySelector('#commentFrm').addEventListener('submit', handleSubmit)

        const handleClick = this.handleClick.bind(this)
        this.target.querySelector('.component-list').addEventListener('click', handleClick)

        if (this.state.updated) {
            const handleKeydown = this.handleKeydown.bind(this)
            document
                .querySelector('.comment-update-input')
                .addEventListener('keydown', handleKeydown)
        }
    }
}
