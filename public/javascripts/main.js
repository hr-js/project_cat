'use strict';

// ノードが読み込まれたときに処理を実行する

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('send_message_btn');

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    var form = document.getElementsByTagName('form').form;
    var message = form.getElementsByTagName('textarea').input_message.value;
    var sliceMsg = message.slice();
    countMsg(); //文字数制御
    // 文字数が129以上の場合、エラーメッセージの初期化は行わない.
    if (sliceMsg.length > 128) {} else {
      removeErrorMSG(); //エラーメッセージの初期化
    }

    var word = message.trim(); //メッセージの両端の空白を削除
    if (!word) {

      inputError();
    } else {
      //  countMsg();

      var data = {
        message: message,
        date: new Date()
      };

      postComment(data);
    }
  });

  // textareaにフォーカスインする
  document.getElementById('input_message').focus();
});

// テキストエリアに入力された文字の文字数制御
document.addEventListener('input', function () {
  var messages = form.getElementsByTagName('textarea').input_message.value;
  var sliceMsg = messages.slice();
  var msgLength = sliceMsg.length;
  document.getElementById('error_text').innerHTML = ""; //エラーメッセージの初期化

  // 入力した文字数が128文字より多い場合エラーを表示させる.
  if (msgLength > 128) {
    var lengthError = document.getElementById('error_text');
    var redError = lengthError.setAttribute('class', 'error');
    var textError = document.createTextNode('128文字以内で入力してください');
    lengthError.appendChild(textError);
    return;
  } else {}
});

function xhrErrorHandler(res) {
  if (res.ok) return res;
  throw Error(res.statusText);
}

function postComment(data) {

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch('http://localhost:3000/comment', {
    method: 'POST',
    headers: myHeaders,
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
// 空文字の時のエラーメッセージの表示
function inputError() {
  var error = document.getElementById('error_text');
  var redError = error.setAttribute('class', 'error');
  var textError = document.createTextNode('文字を入力してください');
  error.appendChild(textError);
}
// エラーメッセージの初期化
function removeErrorMSG() {
  document.getElementById('error_text').innerHTML = "";
}
//文字数制御
function countMsg() {
  var messages = form.getElementsByTagName('textarea').input_message.value;
  var sliceMsg = messages.slice();
  var msgLength = sliceMsg.length;
  if (msgLength > 128) {
    return;
  } else {}
}

(function () {

  /** 引数の日付の投稿件数を取得する | default: new Date */
  function getTodaysPostCount() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();


    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {

        if (xhr.status == 200 || xhr.status == 304) {
          // 成功時
          document.getElementById('today_post').textContent = '\u672C\u65E5\u306E\u6295\u7A3F\u4EF6\u6570\uFF1A' + JSON.parse(xhr.responseText).count + '\u4EF6';
        } else {
          // 失敗時
          console.log('m9(^\u0414^)\uFF8C\uFF9F\uFF77\uFF9E\uFF6C\uFF70\uFF1A ' + xhr.statusText);
        }
        // 接続を切る
        xhr.abort();
      }
    };
    // 接続
    xhr.open('GET', 'http://localhost:3000/comment/count?date=' + date.toJSON(), true);
    xhr.send();
  }
  getTodaysPostCount();
})();
