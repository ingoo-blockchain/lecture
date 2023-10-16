import Comment from './src/components/comment.js'

class App {
    constructor() {
        const root = document.querySelector('#app')
        new Comment(root)
    }
}

new App()
