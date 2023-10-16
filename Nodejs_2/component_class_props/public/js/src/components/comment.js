import Component from '../../core/component.js'
import CommentForm from '../contents/comment/form.js'
import CommentItem from '../contents/comment/item.js'

export default class Comment extends Component {
    setup() {
        this.state = {
            comments: [
                { id: 1, userid: 'web7722', content: '안녕하세요', date: '2023-10-16' },
                { id: 2, userid: 'web7722', content: '안녕하세요', date: '2023-10-16' },
                { id: 3, userid: 'web7722', content: '안녕하세요', date: '2023-10-16' },
            ],
        }
    }
    template() {
        console.log(this.state)
        return `
        <ul class="comment">
            <li class="comment-form">
                <h4>
                    댓글쓰기
                    <span>(${this.state.comments.length})</span>
                </h4>
                <form id='commentFrm' class='commentFrm' data-component='comment-form'></form>
            </li>
            <li class="component-list" data-component='comment-items'>
                
            </li>
        </ul>
        `
    }
    mounted() {
        const commentForm = this.target.querySelector('[data-component="comment-form"]')
        const insertItem = this.insertItem.bind(this)
        new CommentForm(commentForm, { insertItem })

        const commentItem = this.target.querySelector('[data-component="comment-items"]')
        const deleteItem = this.deleteItem.bind(this)
        const updateItem = this.updateItem.bind(this)
        new CommentItem(commentItem, { comments: this.state.comments, deleteItem, updateItem })
    }

    deleteItem(id) {
        const newState = this.state.comments.filter((v) => v.id !== parseInt(id))
        this.setState({ ...this.state, comments: [...newState] })
    }

    insertItem(content) {
        const id =
            this.state.comments.length !== 0
                ? this.state.comments[this.state.comments.length - 1].id + 1
                : 1
        const newState = this.state.comments.push({
            id,
            userid: 'web7722',
            content,
            date: '2023-10-16',
        })

        this.setState({ ...this.state, ...newState })
    }

    updateItem(id, content) {
        const index = this.state.comments.findIndex((v) => v.id === parseInt(id))
        const newState = this.state.comments
        newState[index].content = content
        this.setState({ ...this.state, comments: [...newState], updated: null })
    }

    setEvent() {}
}

// const commentForm = () => {
//     return `
//     <form id="commentFrm" class="commentFrm">
// <span class="ps-box">
//     <input type="text" name='content' id='content' placeholder="댓글 내용을 입력해주세요." />
// </span>
// <button type="submit" class="btn">등록</button>
//     </form>
//     `
// }

// export default class Comment extends Component {
//     setup() {
//         const comments = []
//         this.state = { comments, updated: null }
//     }

//     commentContentRow(row) {
//         const { content } = row
//         const commentUpdateInput = `<input type="text" class="comment-update-input" value="${content}"/>`
//         const isUpdated = row.id === parseInt(this.state.updated)
//         if (isUpdated) {
//             return commentUpdateInput
//         }

//         return content
//     }

//     commentRow() {
//         return this.state.comments
//             .map(
//                 (item) => `
// <ul class="comment-row" data-index="${item.id}">
//     <li>${item.userid}</li>
//     <li>
//         <span class='comment-content'>${this.commentContentRow(
//             item,
//             this.state.updated,
//         )}</span>
//         <span class='comment-delete'>❌</span>
//     </li>
//     <li>${item.date}</li>
// </ul>
//     `,
//             )
//             .join('')
//     }

//     handleSubmit(e) {
// e.preventDefault()
// const { value: content } = e.target.content
// const id = this.state.comments.length + 1
// const newState = this.state.comments.push({
//     id,
//     userid: 'web7722',
//     content,
//     date: '2023-10-16',
// })

// this.setState({ ...this.state, ...newState, updated: null })
//     }

//     handleClick(e) {
//         const { value: type } = e.target.classList
//         const { index: id } = e.target.parentNode.parentNode.dataset

//         if (type === 'comment-delete') {
//             const newState = this.state.comments.filter((v) => v.id !== parseInt(id))
//             this.setState({ ...this.state, comments: [...newState] })
//         }

//         if (type === 'comment-content') {
//             this.setState({ comments: [...this.state.comments], updated: id })
//         }
//     }

//     handleKeydown({ keyCode, target }) {
//         if (keyCode === 13) {
//             const { index: id } = target.parentNode.parentNode.parentNode.dataset
//             const index = this.state.comments.findIndex((v) => v.id === parseInt(id))
//             const newState = this.state.comments
//             newState[index].content = target.value
//             this.setState({ ...this.state, comments: [...newState], updated: null })
//             document.removeEventListener('keydown', this.handleKeydown)
//         }
//     }

//     template() {
//         const { comments, updated } = this.state
//         const comment_row = this.commentRow(comments, updated)
//         const comment_form = commentForm()
//         return `
//     <ul class="comment">
//         <li class="comment-form">
//             <h4>
//                 댓글쓰기
//                 <span>(${comments.length})</span>
//             </h4>
//             ${comment_form}
//         </li>
//         <li class="component-list">
//             ${comment_row}
//         </li>
//     </ul>
// `
//     }

//     setEvent() {
//         const handleSubmit = this.handleSubmit.bind(this)
//         this.addEvent('submit', '#commentFrm', handleSubmit)

//         const handleClick = this.handleClick.bind(this)
//         this.addEvent('click', '.component-list', handleClick)

//         // 컴포넌트 쪼개면서 등록해야함.
//         // const handleKeydown = this.handleKeydown.bind(this)
//         // this.addEvent('keydown', handleKeydown)
//     }
// }
