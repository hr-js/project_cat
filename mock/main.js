'use strict';

// ノードが読み込まれたときに処理を実行する
document.addEventListener('DOMContentLoaded', function(e){





    const btn = document.getElementById('send_message_btn');
    btn.addEventListener('click', function(){
        // メール送信アニメーション開始

        // 1. contentが下に動く
        const contents = document.getElementById('contents');
        contents.classList.add('contents_animation');

        // 2. textareaが上に動いて、メールの中へ入る
        const textarea = document.getElementById('textarea_wrap');
        textarea.classList.add('textarea_animation');
        


        //     transform: scale(0.8) translateY(-200px);
        // それに伴い中身は上に動く

        // 元の位置にもどって、in

    });


});