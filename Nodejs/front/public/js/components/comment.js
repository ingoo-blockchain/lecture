import Component from '/js/core/Component.js'

class Comment extends Component {
    setup() {
        this.$state = { list: [{ content: 1 }, { content: 2 }] }
    }

    template() {
        const { list } = this.$state

        return `
        <ul>
            ${list
                .map(
                    (comment, index) => `
                    <li>${comment.content}</li>
                    <button class='deleteBtn' data-index='${index}'>삭제</button>
                `,
                )
                .join('')}
        </ul>
        <button class='addBtn'>추가</button>
        `
    }

    setEvent() {
        this.addEvent('click', '.addBtn', ({ target }) => {
            const { list } = this.$state
            this.setState({ list: [...list, { content: list.length + 1 }] })
        })

        this.addEvent('click', '.deleteBtn', ({ target }) => {
            this.setState({ list: [...this.$state.list].splice(target.dataset.index, 1) })
        })

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
