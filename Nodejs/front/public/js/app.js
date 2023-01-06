import Comment from '/js/components/comment.js'

class App {
    constructor() {
        const $app = document.querySelector('#app')
        new Comment($app)
    }
}

new App()

export default App
