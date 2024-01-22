const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const getDB = jsonServer.router(path.join(__dirname + '/db', 'get.json'))
const postDB = require(path.join(__dirname + '/db', 'post.json'))
const deleteDB = require(path.join(__dirname + '/db', 'delete.json'))
const middlewares = jsonServer.defaults()
const getRoutes = require(path.join(__dirname, 'routes.json'))
const domain = 'http://localhost:3000'

// 取得WeChat綁定資訊
server.post('/crm/v1/wechat-binds/search/criteria', function (req, res) {
    res.header('Access-Control-Allow-Origin', domain)
    res.header('Access-Control-Allow-Credentials', 'true')
    res.status(200).jsonp({})
})

server.use(middlewares)
server.use(jsonServer.rewriter(getRoutes))
server.use(getDB)
server.listen(3001, () => {
    console.log(`JSON Server is running on http://localhost:3001`)
})
