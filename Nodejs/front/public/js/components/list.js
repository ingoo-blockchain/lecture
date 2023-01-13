import Component from '/js/core/Component.js'

class List extends Component {
    setup() {}
    template() {
        return `
            <ul class="comment-row" data-index="0">
                <li class="comment-id">web7722</li>
                <li class="comment-content">content</li>
                <li class="comment-date">2022-01-08</li>
            </ul>
        `
    }
}

export default List
