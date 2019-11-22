const http = require('http')
const fs = require('fs')


function runServer(integrate, { hostname = '127.0.0.1', port = 3000 }) {

    const server = http.createServer((req, res) => {
        let post = []

        req.on('data', (chunk) => {
            post.push(chunk)
        })

        req.on('end', () => {
            if (Buffer.concat(post).toString()) {
                post = JSON.parse(Buffer.concat(post).toString())
                console.log(`接收到数据：${JSON.stringify(post)}`)
                let { output, data } = post
                if (output && data) {
                    console.log('写入文件中...')
                    fs.writeFile(`${integrate.config.baseUrl}/${output}`, JSON.stringify(data), () => {
                        console.log(`文件已写入 ${output} ^-^`)
                        res.statusCode = 200
                        res.setHeader('Content-Type', 'text/plain')
                        res.end('接收完成！')
                    })
                }
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/plain')
                res.end('未收到数据-_-')
            }
        })

    })

    server.listen(port, hostname, () => {
        console.log(`Server runing at http://${hostname}:${port}/`)
    })
}

module.exports = runServer