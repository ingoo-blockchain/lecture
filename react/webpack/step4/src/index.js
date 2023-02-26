const React = require('react')
const ReactDOM = require('react-dom')
const App = require('./app')

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(React.createElement(App))
// root.render(<App />)
