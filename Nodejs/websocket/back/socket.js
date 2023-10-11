const webSocket = require('ws')

module.exports = (http) => {
    // const ws = new webSocket.Server({ server: http })
    const sockets = new Set()
    const server = new webSocket.Server({
        server: http, // WebSocket서버에 연결할 HTTP서버를 지정한다. (express 서버 포트와 같이 사용할경우.)
        // port: 7545, // WebSocket연결에 사용할 port를 지정한다(생략시, http서버와 동일한 port 공유 사용)
    })

    server.on('connection', (socket, request) => {
        console.log(request.url)
        sockets.add(socket)
        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
        console.log(`새로운 클라이언트[${ip}] 접속`)

        if (server.readyState === server.OPEN) {
            socket.send(`클라이언트[${ip}] 접속을 환영합니다 from 서버`) // 데이터 전송
        }

        socket.on('message', (msg) => {
            console.log(`클라이언트[${ip}]에게 수신한 메시지 : ${msg}`)
            // boradcast
            for (const client of sockets) {
                client.send('메시지 잘 받았습니다! from 서버')
            }
        })

        socket.on('error', (error) => {
            console.log(`클라이언트[${ip}] 연결 에러발생 : ${error}`)
        })

        socket.on('close', (socket) => {
            sockets.remove(socket)
            console.log(`클라이언트[${ip}] 웹소켓 연결 종료`)
        })
    })
}
