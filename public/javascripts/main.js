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
  // 1. contentが下に動く
  const contents = document.getElementById('contents');
  contents.classList.add('contents_animation');

  // 2. textareaが上に動いて、メールの中へ入る
  const textarea = document.getElementById('textarea_wrap');
  textarea.classList.add('textarea_animation');

  // 3. mail_topが閉じるアニメーション
  const mail_top = document.getElementById('mail_top');
  mail_top.classList.add('mail_top_animation');

  // 4. 投稿ボタンを消す
  const send_btn = document.getElementById('send_message_btn');
  send_btn.style.visibility = 'hidden';

  // 5. おキャット様アイコンで手紙に封をする
  const cat_icon = document.getElementById('cat_icon');
  cat_icon.classList.add('cat_icon_animation');

  // 6. 手紙を送る
  const mail_form = document.getElementById('form');
  mail_form.classList.add('send_mail_animation');

  // 7. 送信結果表示
  const result = document.getElementById('result');
  result.classList.add('show_result_animation');

  const mail_back = document.getElementById('mail_back');
  const mail_front = document.getElementById('mail_front');

  const target = {
    contents: contents,
    textarea: textarea,
    mail_top: mail_top,
    send_btn: send_btn,
    cat_icon: cat_icon,
    mail_form: mail_form,
    result: result,
    mail_back: mail_back,
    mail_front: mail_front
  };

  result.addEventListener('animationend', resultCallbackCreate(target));
}

function animationInitialize(target) {
  // formを隠す
  target.mail_form.style.visibility = 'hidden';

  // アニメーションで使用したクラスを初期化
  target.contents.classList.remove('contents_animation');
  target.textarea.classList.remove('textarea_animation');
  target.mail_top.classList.remove('mail_top_animation');
  target.cat_icon.classList.remove('cat_icon_animation');
  target.mail_form.classList.remove('send_mail_animation');
  target.result.classList.remove('show_result_animation');

  // 送信ボタンを表示
  target.send_btn.style.visibility = '';

  // 入力したメッセージ(あれな内容)を抹消
  document.getElementById('input_message').value = '';
}

function showMailForm (target) {
  target.mail_back.style.visibility = 'hidden';
  target.mail_front.style.visibility = 'hidden';
  target.mail_top.style.visibility = 'hidden';
  target.mail_form.style.visibility = '';
}

function resultCallbackCreate(target) {
  return function resultCallback(e) {
    animationInitialize(target);
    showMailForm(target);

    target.textarea.addEventListener('animationend',textareaCallbackCreate(target));

    // textarea出現アニメーション開始
    target.textarea.classList.add('show_textarea_animation');

    target.result.removeEventListener('animationend', resultCallback);
  }
}

function textareaCallbackCreate(target) {
  // 初期化アニメーション後の処理
  return function textareaCallback(e) {
    //初期化
    target.textarea.classList.remove('show_textarea_animation');
    target.mail_back.style.visibility = '';
    target.mail_front.style.visibility = '';
    target.mail_top.style.visibility = '';

    // focusイン
    target.textarea.focus();

    // イベントを解除
    target.textarea.removeEventListener('animationend', textareaCallback);
  }
}
