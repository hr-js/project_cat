const http = require('http'); // httpオブジェクトのロード

/** httpのcreateServerメソッドを呼び出してhttp.Serverオブジェクトを作成する */
const server = http.createServer(function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({
    platform: process.platform,
    nodeVersion: process.version,
    uptime: Math.round(process.uptime()),
  }));
});

const port = 3030; // ポート番号
/** サーバー待ち受け状態 */
server.listen(port, function(){
  console.log(`Ajax server started on port ${port}`)
});
