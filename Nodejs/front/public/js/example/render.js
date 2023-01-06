const app = document.querySelector('#app')

let state = {
    list: [{ content: 'asdf' }, { content: 'cvbsd' }, { content: 'rhgrhr' }],
}

const setState = (newState) => {
    state = { ...state, ...newState }
    render()
}

const render = () => {
    const { list } = state
    console.log(list)
    app.innerHTML = `
        <ul>
            ${list.map((comment) => `<li>${comment.content}</li>`).join('')}
        </ul>
        <button id='add'>추가</button>
    `

    document.querySelector('#add').addEventListener('click', () => {
        setState({ list: [...list, { content: `Content${list.length}` }] })
    })
}

render()
