'use strict';

// ノードが読み込まれたときに処理を実行する
document.addEventListener('DOMContentLoaded', function (e) {

  const btn = document.getElementById('send_message_btn');
  btn.addEventListener('click', function (e) {

    // 1. eventを止める
    e.preventDefault();

    // 2. formを取得
    const form = document.getElementsByTagName('form').form;

    // 3. メッセージを取得
    const message = form.getElementsByTagName('textarea').input_message.value;

    // 4. ajax通信
        const data = {
          message: message,
          date: new Date()
        };


    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {

      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status == 304) {
          const data = xhr.responseText;
          console.log('成功！！：' + data);
          xhr.abort();
          success();
        } else {
          console.log('m9(^Д^)ﾌﾟｷﾞｬｰ：' + xhr.statusText);
          // success();
        }
      }
    };

    xhr.open('POST', 'http://localhost:3000/comment', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

  });

  // textareaにフォーカスインする
  document.getElementById('input_message').focus();

});

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

  // 8. アニメーションのコールバックを登録
  result.addEventListener('animationend', resultCallback);

  // 関数
  function resultCallback(e){
    console.log(`アニメーションの初期化`);
    // formを隠す
    mail_form.style.visibility = 'hidden';
    // アニメーションで使用したクラスを初期化
    contents.classList.remove('contents_animation');
    textarea.classList.remove('textarea_animation');
    mail_top.classList.remove('mail_top_animation');
    send_btn.style.visibility = '';
    cat_icon.classList.remove('cat_icon_animation');
    mail_form.classList.remove('send_mail_animation');
    result.classList.remove('show_result_animation');
    // formを出す
    const mail_back = document.getElementById('mail_back');
    mail_back.style.visibility = 'hidden';
    const mail_front = document.getElementById('mail_front');
    mail_front.style.visibility = 'hidden';
    mail_top.style.visibility = 'hidden';
    mail_form.style.visibility = '';

    // callbackを登録
    textarea.addEventListener('animationend',textareaCallback);
    // textarea出現アニメーション開始
    textarea.classList.add('show_textarea_animation');

    // イベントを解除
    result.removeEventListener('animationend', resultCallback);
  }

  function textareaCallback(e){
          //初期化
      textarea.classList.remove('show_textarea_animation');
      mail_back.style.visibility = '';
      mail_front.style.visibility = '';
      mail_top.style.visibility = '';
      // focusイン
      textarea.focus();

      // イベントを解除
      textarea.removeEventListener('animationend', textareaCallback);

  }

}
