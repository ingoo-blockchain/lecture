import Component from '/js/core/Component.js'
import Comment from '/js/components/comment.js'

import Header from '/js/components/header.js'
import List from '/js/components/list.js'

class App extends Component {
    setup() {
        this.$state = {
            list: [
                { id: 1, userid: 'web7722', content: 'hello world1', register: '2023-01-09' },
                { id: 2, userid: 'web7722', content: 'hello world2', register: '2023-01-09' },
                { id: 3, userid: 'web7722', content: 'hello world3', register: '2023-01-09' },
            ],
        }
        console.log(this.$state)
    }

    mounted() {
        const commentForm = document.querySelector('.comment-form')
        const commentList = document.querySelector('#comment-list')

        new Header(commentForm, { add: this.add.bind(this) })
        new List(commentList, { name: 'web7722' })
    }

    template() {
        return `
        <ul class="comment">
            <li class="comment-form"></li>
            <li id="comment-list"></li>
        </ul>
        `
    }

    add(content) {
        const { list } = this.$state
        this.setState({ list: [...list, { content: content.value, updated: false }] })
    }
}

export default App
