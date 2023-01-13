import Component from '/js/core/Component.js'
import request from '/js/utils/request.js'

class Comment extends Component {
    async setup() {
        this.$state = {
            list: [
                { content: 1, updated: false },
                { content: 2, updated: false },
            ],
        }
        // const response = await request.get('http://localhost:3000')
    }
    // bin
    content(content) {
        return `
        <span class="comment-update-btn">${content}</span>
        <span class="comment-delete-btn">❌</span>
    `
    }

    update(content) {
        return `
            <span>
                <input type="text" class="comment-update-input" data-value="" value="${content}" />
            </span>
            <span class="comment-delete-btn">❌</span>
        `
    }

    template() {
        const { list } = this.$state

        return `<ul class="comment">
        <li class="comment-form">
            <form id="commentFrm">
                <h4>
                    댓글쓰기
                    <span></span>
                </h4>
                <span class="ps_box">
                    <input
                        type="text"
                        placeholder="댓글 내용을 입력해주세요."
                        class="int"
                        name="content"
                    />
                </span>
                <input type="submit" class="btn" value="등록" />
            </form>
        </li>
        <li id="comment-list">
            ${list
                .map(
                    (comment, index) => `<ul class="comment-row" data-index="${index}">
                                        <li class="comment-id">web7722</li>
                                        <li class="comment-content">
                                            ${
                                                comment.updated
                                                    ? this.update(comment.content)
                                                    : this.content(comment.content)
                                            }
                                            
                                        </li>
                                        <li class="comment-date">2022-01-08</li>
                                    </ul>`,
                )
                .join('')}
        </li>
    </ul>`

        // return `
        // <ul>
        //     ${list
        //         .map(
        //             (comment, index) => `
        //             <li>${comment.content}</li>
        //             <button class='deleteBtn' data-index='${index}'>삭제</button>
        //         `,
        //         )
        //         .join('')}
        // </ul>
        // <button class='addBtn'>추가</button>
        // `
    }

    setEvent() {
        // 4단계
        this.addEvent('submit', '#commentFrm', (e) => {
            e.preventDefault()
            const { list } = this.$state
            const { content } = e.target
            this.setState({ list: [...list, { content: content.value, updated: false }] })

            content.focus()
            e.target.reset()
        })

        this.addEvent('click', '.comment-update-btn', (e) => {
            const ul = e.target.parentNode.parentNode
            const { index } = ul.dataset

            const list = [...this.$state.list]
            list[index].updated = true

            this.setState({ list })
        })

        this.addEvent('click', '.comment-delete-btn', (e) => {
            const ul = e.target.parentNode.parentNode
            const { index } = ul.dataset

            const list = [...this.$state.list]
            list.splice(index, 1)
            this.setState({ list })
        })

        this.addEvent('keypress', '.comment-update-input', (e) => {
            if (e.keyCode !== 13) return

            const ul = e.target.parentNode.parentNode.parentNode
            const { index } = ul.dataset
            const list = [...this.$state.list]
            list[index].content = e.target.value
            list[index].updated = false
            this.setState({ list })
        })

        // 3단계
        // this.addEvent('click', '.addBtn', ({ target }) => {
        //     const { list } = this.$state
        //     this.setState({ list: [...list, { content: list.length + 1 }] })
        // })

        // this.addEvent('click', '.deleteBtn', ({ target }) => {
        //     const list = [...this.$state.list]
        //     list.splice(target.dataset.index, 1)
        //     this.setState({ list })
        // })

        // 2단계
        // this.$target.addEventListener('click', ({ target }) => {
        //     const list = [...this.$state.list]

        //     if (target.classList.contains('addBtn')) {
        //         this.setState({ list: [...list, { content: list.length + 1 }] })
        //     }

        //     if (target.classList.contains('deleteBtn')) {
        //         list.splice(target.dataset.index, 1)
        //         this.setState({ list })
        //     }
        // })

        // 1단계
        // this.$target.querySelector('button').addEventListener('click', () => {
        //     const { list } = this.$state
        //     this.setState({ list: [...list, { content: list.length + 1 }] })
        // })
    }
}

export default Comment
