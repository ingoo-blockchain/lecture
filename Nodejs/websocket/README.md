# WebSocket

Handshak

**Client -> Server**

```
GET /chat HTTP/1.1

HOST : server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-Websocket-Key : XXXX...
origin : http://example.com
Sec-WebScoket-protocol: chat, superchat
Sec-Websocket-Version:3
```

**Server --> Client**

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebScoket-Accept: XXXX...
```

# server

```
npm install ws
```
