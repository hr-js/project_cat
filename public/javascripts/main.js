'use strict';

// ノードが読み込まれたときに処理を実行する
document.addEventListener('DOMContentLoaded', function(e){

    const btn = document.getElementById('send_message_btn');
    btn.addEventListener('click', function(e){

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

         const xhr = new XMLHttpRequest();

         xhr.onreadystagechange = function(){
           if (xhr.readyState === 4) {
            if(xhr.status == 200 || xhr.status == 304){
              const data = xhr.responseText;
              console.log('成功！！：' + data);
            } else{
              console.log('m9(^Д^)ﾌﾟｷﾞｬｰ：'+xhr.statusText);
            }
           }
         };
         xhr.open('POST', 'http://localhost:3000/comment/',true);
         xhr.setRequestHeader('Content-Type','application/json');
         xhr.send(data);
         xhr.abort();
    });

});

// 通信成功時のコールバック
function success(){
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
}