$(function(){
    // 肉球がクリックされた時のイベント
    $('#nikuBtn').on('click',click_nikuBtn);

});

// 肉球ボタンが押された時の処理
function click_nikuBtn(e){
    console.log('肉球が押された！');
    // formのsubmit処理をストップ
    e.preventDefault();
    // ボタンが押されないように制御
    $(e.target).addClass('no_event');
    // テキストの内容をGET!!!!
    // ajax通信でサーバにヒューっとに送信
    // 成功した時のcallbackでおキャット様出現！
    const afterLeft = parseInt($('#neko').css('left'), 10) -35.5;
    $('#neko').animate(
        {
            width: "75px",
            height: "60px",
            left: "-35.5px"
        },{
            duration : 500,
            easing: "linear",
            progress: function(animation, progress, remainingMs){
                const y = 400 - (progress * 60);
                $('#neko').css({
                    transform: `translateX(325px) translateY(${y}px)`
                });
            },
            complete : goToCylinder
        });
}

// シリンダーにアニメーションする関数
function goToCylinder(){
    console.log('シリンダーに移動する');
    //pathを取得
    const $targetPath = document.getElementById('target_path');

    // 動かしたいneko
    const $neko = document.getElementById('neko');

    const neko_height = $neko.clientHeight;
    const neko_width = $neko.clientWidth;
    
    //動かす値を取得
    let counter = 0;
    //pathの長さを取得
    let leng = $targetPath.getTotalLength();


    // 0.5秒後から動き始める
    setTimeout(function($neko){
        moveNeko();
    }, 400);

    // 移動関数
    function moveNeko(){
        //終点にきたらストップさせる
        if( parseInt(counter,10) === 1 ){
            return false;
        }

        //変化値 
        // TODO:だんだん遅くしたい
        counter += 0.01; 
        //現在の座標位置を取得
        const point = $targetPath.getPointAtLength(counter * leng);
        const properties = `height: ${neko_height}px; width: ${neko_width}px; `+
                           `top : 0; left : 0;`+
                           `transform : translate(${point.x}px, ${point.y}px);`
　       //nekoのstyleを変更する
        $neko.setAttribute('style' , properties);
        //再びcallする
        window.requestAnimationFrame(moveNeko);
    }
}

