'use strict';

// ノードが読み込まれたときに処理を実行する

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('send_message_btn');

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    var form = document.getElementsByTagName('form').form;
    var message = form.getElementsByTagName('textarea').input_message.value;
    let word = message.trim();
    if(!word){
      inputError();
    }else {
      removeError();

    var data = {
      message: message,
      date: new Date()
    };
      wordCount();
      postComment(data);
 }});

  // textareaにフォーカスインする
  document.getElementById('input_message').focus();
});

function xhrErrorHandler(res) {
  if (res.ok) return res;
  throw Error(res.statusText);
}

function postComment(data) {

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch('http://localhost:3000/comment', {
    method: 'POST',
    headers:myHeaders,
    body: JSON.stringify(data),
    mode: 'cors'
  }).then(xhrErrorHandler).then(success).catch(function (err) {
    return window.console.error(err);
  });
}

// 通信成功時のコールバック
function success() {
  var idNames = ['contents', 'textarea_wrap', 'mail_top', 'send_message_btn', 'cat_icon', 'form', 'result', 'mail_back', 'mail_front'];

  var nodes = idNames.map(function (id) {
    return [id, document.getElementById(id)];
  });
  var target = new Map(nodes);

  // アニメーションの開始
  target.forEach(function (node) {
    return node.classList.add('animation');
  });

  target.get('result').addEventListener('animationend', resultCallbackCreate(target));
}

function animationInitialize(target) {
  // formを隠す
  target.get('form').style.visibility = 'hidden';

  target.forEach(function (node) {
    return node.classList.remove('animation');
  });

  // 入力したメッセージ(あれな内容)を抹消
  document.getElementById('input_message').value = '';
}

function showMailForm(target) {
  target.get('mail_back').style.visibility = 'hidden';
  target.get('mail_front').style.visibility = 'hidden';
  target.get('mail_top').style.visibility = 'hidden';
  target.get('form').style.visibility = '';
}

function resultCallbackCreate(target) {
  return function resultCallback() {
    animationInitialize(target);
    showMailForm(target);

    var textarea = target.get('textarea_wrap');
    textarea.addEventListener('animationend', textareaCallbackCreate(target));

    // textarea出現アニメーション開始
    textarea.classList.add('show_textarea_animation');

    target.get('result').removeEventListener('animationend', resultCallback);
  };
}

function textareaCallbackCreate(target) {
  // 初期化アニメーション後の処理
  return function textareaCallback() {
    var textarea = target.get('textarea_wrap');
    //初期化
    textarea.classList.remove('show_textarea_animation');
    target.get('mail_back').style.visibility = '';
    target.get('mail_front').style.visibility = '';
    target.get('mail_top').style.visibility = '';

    textarea.focus();
    textarea.removeEventListener('animationend', textareaCallback);
  };
}

function inputError(){
  var error = document.getElementById('error_text');
  var redError = error.setAttribute('class', 'error');
  var textError = document.createTextNode('文字を入力してください');
  error.appendChild(textError);

}

function removeError(){
     document.getElementById('error_text').innerHTML="";
}
function wordCount(){
  console.log("wordword")


}

(function() {

  /** 引数の日付の投稿件数を取得する | default: new Date */
  function getTodaysPostCount(date = (new Date())) {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {

        if (xhr.status == 200 || xhr.status == 304) {
          // 成功時
          document.getElementById('today_post').textContent = `本日の投稿件数：${JSON.parse(xhr.responseText).count}件`;
        } else {
          // 失敗時
          console.log(`m9(^Д^)ﾌﾟｷﾞｬｰ： ${xhr.statusText}`);
        }
        // 接続を切る
        xhr.abort();
      }
    };
    // 接続
    xhr.open('GET', `http://localhost:3000/comment/count?date=${date.toJSON()}`, true);
    xhr.send();
  }
  getTodaysPostCount();
})();
