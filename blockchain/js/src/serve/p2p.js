class P2PServer {
    net
    sockets = []
    constructor({ net }) {
        this.net = net
    }

    start(port) {
        const server = this.net.createServer((socket) => {
            socket.setEncoding("utf8")
            socket.on("data", (chunk) => {
                console.log(chunk)
            })

            socket.on("close", () => {
                console.log(`client disconnected.`)
            })
        })

        server.listen(port, () => {
            console.log(`server listening port ${port}`)
        })
    }

    connect(peer) {
        const socket = new this.net(peer)
        socket.on("connect", () => {
            console.log("net connect")
        })
    }

    connectSocket(socket) {
        this.sockets.push(socket)
    }

    close() {}
}

module.exports = P2PServer
