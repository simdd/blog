const net = require('net')
const crypto = require('crypto')

const server = net.createServer(s => {
  s.handshaking = false
  s.on('data', d => {
    if (!s.handshaking) {
      let req = d.toString()
      let secWebsocketKey = /Sec-WebSocket-Key:\s(.*)/.exec(req)[1]
      let key = secWebsocketKey + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
      let secWebSocketAccept = crypto
        .createHash('sha1')
        .update(key)
        .digest('base64')
      let res =
        'HTTP/1.1 101 Switching Protocols\nConnection: Upgrade\nUpgrade: websocket\nSec-WebSocket-Accept: ' +
        secWebSocketAccept +
        '\n\n'
      console.log(res)
      s.write(res)
      s.handshaking = true
    } else {
      let payload_len_client = d[1] & parseInt(1111111, 2)
      let masking_key = d.slice(2, 6)
      let payload_data = new Buffer(payload_len_client)
      for (let i = 0; i < payload_len_client; i++) {
        let j = i % 4
        payload_data[i] = d[6 + i] ^ masking_key[j]
      }
      console.log(payload_data.toString())

      // 服务端主动发消息 Hi, Client! l'm Server.
      let dataBuffer = new Buffer(`Hi, Client! l'm Server.`)
      let payload_len_server = dataBuffer.length
      let assistData = []
      assistData.push(129)
      assistData.push(payload_len_server)
      let assistBuffer = new Buffer(assistData)
      let message = Buffer.concat([assistBuffer, dataBuffer])
      console.log(message)
      s.write(message)
    }
  })
})

server.listen(4321, () => {
  console.log('listening on 4321...')
})
