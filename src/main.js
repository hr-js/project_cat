'use strict';

// ノードが読み込まれたときに処理を実行する
document.addEventListener('DOMContentLoaded', function (e) {
  const btn = document.getElementById('send_message_btn');

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const form = document.getElementsByTagName('form').form;
    const message = form.getElementsByTagName('textarea').input_message.value;
    const data = {
      message: message,
      date: new Date()
    };

    postComment(data);
  });

  // textareaにフォーカスインする
  document.getElementById('input_message').focus();
});

function postComment(data) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200 || xhr.status == 304) {
        success();
      } else {
        console.log('m9(^Д^)ﾌﾟｷﾞｬｰ：' + xhr.statusText);
      }
      xhr.abort();
    }
  };
  xhr.open('POST', 'http://localhost:3000/comment', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}

// 通信成功時のコールバック
function success() {
  const idNames = [
    'contents', 'textarea_wrap', 'mail_top',
    'send_message_btn', 'cat_icon', 'form',
    'result', 'mail_back', 'mail_front'
  ]

  const nodes = idNames.map(function(id) {
    return [id, document.getElementById(id)]
  })

  const target = new Map(nodes)

  // アニメーションの開始
  target.forEach(function(node) {
    node.classList.add('animation');
  });

  result.addEventListener('animationend', resultCallbackCreate(target));
}

function animationInitialize(target) {
  // formを隠す
  target.get('form').style.visibility = 'hidden';

  target.forEach(function (node) {
    node.classList.remove('animation');
  });

  // 入力したメッセージ(あれな内容)を抹消
  document.getElementById('input_message').value = '';
}

function showMailForm (target) {
  target.get('mail_back').style.visibility = 'hidden';
  target.get('mail_front').style.visibility = 'hidden';
  target.get('mail_top').style.visibility = 'hidden';
  target.get('form').style.visibility = '';
}

function resultCallbackCreate(target) {
  return function resultCallback(e) {
    animationInitialize(target);
    showMailForm(target);

    const textarea = target.get('textarea_wrap');
    textarea.addEventListener('animationend',textareaCallbackCreate(target));

    // textarea出現アニメーション開始
    textarea.classList.add('show_textarea_animation');

    target.get('result').removeEventListener('animationend', resultCallback);
  }
}

function textareaCallbackCreate(target) {
  // 初期化アニメーション後の処理
  return function textareaCallback(e) {
    const textarea = target.get('textarea_wrap');
    //初期化
    textarea.classList.remove('show_textarea_animation');
    target.get('mail_back').style.visibility = '';
    target.get('mail_front').style.visibility = '';
    target.get('mail_top').style.visibility = '';

    // focusイン
    textarea.focus();

    // イベントを解除
    textarea.removeEventListener('animationend', textareaCallback);
  }
}
