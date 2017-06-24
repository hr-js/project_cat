// var req = require('express');

function pushBtn(){
  document.getElementById('messForm').addEventListener('submit', function(){
    req
    .post('/')
    .send({id: 'default', message: 'message', icon: '0',date: 'newData()'})
    .end(function(err, res){
      console.log("www")
    });
  });
};
pushBtn();
