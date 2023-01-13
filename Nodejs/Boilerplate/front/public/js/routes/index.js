import Home from '/js/pages/home.js'
import Comment from '/js/pages/comment.js'
import Login from '/js/pages/login.js'

export const BASE_URL = 'http://localhost:3005'

export const routes = [
    { path: /^\/$/, element: Home },
    // { path: /^\/comment\/[\w]+$/, element: Comment },
    { path: /^\/login$/, element: Login },
    { path: /^\/comment$/, element: Comment },
]

export default class Router {
    target
    currentPage
    constructor(_target) {
        this.target = _target
        this.init()
        this.route()
    }

    findMatchedRoute() {
        const result = routes.find((route) => {
            console.log(route.path, location.pathname)
            return route.path.test(location.pathname)
        })
        console.log('console.log .. : ', result)
        return routes.find((route) => route.path.test(location.pathname))
    }

    route() {
        this.currentPage = null
        const TargetPage = this.findMatchedRoute()?.element || 'NotFound'
        // console.log(targetPage)
        this.currentPage = new TargetPage(this.target)
    }

    init() {
        window.addEventListener('historychange', ({ detail }) => {
            const { to, isReplace } = detail

            if (isReplace || to === location.pathname) history.replaceState(null, '', to)
            else history.pushState(null, '', to)

            this.route()
        })

        window.addEventListener('popstate', () => this.route())
    }
}
