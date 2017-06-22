function serverInfo(){
  const req = new XMLHttpRequest(); //XMLHttpRequestオブジェクトの生成.
  req.addEventListener('load', function(){
    console.log(this.responseText);
  });
  req.open('GET', 'http://localhost:3030', true);
  req.send();
}
serverInfo();
