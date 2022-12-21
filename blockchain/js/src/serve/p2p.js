const WebSocket = require('ws')

class P2PServer {
    constructor({ blockchain }) {
        this._sockets = []
    }

    get sockets() {
        return this._sockets
    }

    listen() {
        const Server = new WebSocket.Server({ port: 7545 })
        Server.on('connection', (socket) => {
            console.log(`websocket connection...`)
            this.connectionSocket()
        })
    }

    connect(newPeer) {
        const socket = new WebSocket(newPeer)
        socket.on()
    }
}
