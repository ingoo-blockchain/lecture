import Component from '/js/core/component.js'
import { navigate } from '/js/lib/navigate.js'

class Header extends Component {
    setup() {}

    template() {
        return `
            <h1 id='logo'>
                <a href='/'>Logo</a>
            </h1>
            <ul id='nav'>
                <li><a href='/about'>About us</a></li>
                <li><a href='/login'>Login Page</a></li>
                <li><a href='/comment'>Comment Page</a></li>
            </ul>
        `
    }

    setEvent() {
        this.addEvent('click', '#app', (e) => {
            const target = e.target.closest('a')
            if (!(target instanceof HTMLAnchorElement)) return

            e.preventDefault()
            const targetURL = e.target.href.replace('http://localhost:3005', '')
            navigate(targetURL)
        })
    }
}

export default Header
