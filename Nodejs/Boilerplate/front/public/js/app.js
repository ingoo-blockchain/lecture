import Component from '/js/core/component.js'
import Header from '/js/layout/header.js'
import router from '/js/routes/index.js'

class App extends Component {
    setup() {
        
    }
    mounted() {
        new Header(document.querySelector('#header'))
        new router(document.querySelector('#container'))
    }

    template() {
        return `
            <div id='wrap'>
                <div id='header'></div>
                <div id='container'></div>
                <div id='footer'></div>
            </div>
        `
    }
}

export default App
