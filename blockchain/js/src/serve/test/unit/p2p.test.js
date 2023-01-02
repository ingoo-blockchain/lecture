const P2P = require("../../p2p")
const net = require("net")

describe("P2PServer", () => {
    let server, client
    beforeEach(() => {
        server = new P2P({ net })
    })

    it("listens on the specified port", async () => {
        server.start(3000)
        client = new net.Socket()
        await new Promise((resolve) =>
            client.connect(3000, "localhost", () => {
                expect(client.writable).toBe(true)
                client.end()
                server.close()
                resolve()
            })
        )
    })

    // it("connects to a peer", async () => {
    //     server.connect({ host: "localhost", port: 3001 })
    //     client = new net.Server((socket) => {
    //         socket.end()
    //         server.close()
    //     })

    //     client.listen(3001)
    //     await new Promise((resolve) => setTimeout(resolve, 1000))
    // })

    // it("connects a socket", () => {
    //     const socket = new net.Socket()
    //     server.connectSocket(socket)
    //     expect(server.sockets.length).toBe(1)
    // })
})
