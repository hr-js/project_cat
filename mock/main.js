$(function() {
  /** 送信ボタンにマウスオーバーした際のイベント */
  $('.nikubtn').mouseover(function() {
    console.log("mouseover");
    $('button').css("background-color", "#c0fff4");

    $('circle').css("fill", "#1e90ff").css("stroke", "#351fff");
    $('ellipse').css("fill", "#1e90ff").css("stroke", "#351fff");

  });
  /** 送信ボタンからマウスオーバーを外した際のイベント */
  $('.nikubtn').mouseleave(function() {
    console.log("mouseover");
    $('button').css("background-color", "#ffc0cb");

    $('circle').css("fill", "#ffa500").css("stroke", "#a52a2a");
    $('ellipse').css("fill", "#ffa500").css("stroke", "#a52a2a");
  });

  /** 肉球がクリックされた時のイベント */
  $('.nikubtn').on('click',click_nikuBtn);

});


/** 肉球ボタンが押された時の処理 */
function click_nikuBtn(e){
  console.log('肉球が押された！');
  // formのsubmit処理をストップ
  e.preventDefault();
  // ボタンが押されないように制御
  $(e.target).addClass('no_event');

  // TODO: 未実装
  // テキストの内容をGET!!!!




  // TODO:ajax通信の実装
  // ajax通信でサーバにヒューっとに送信




  // TODO: done内で以下の処理を実装
  // 成功した時のcallbackでおキャット様出現！
  const afterLeft = parseInt($('#neko').css('left'), 10) -35.5;
  $('#neko').animate(
    {
      width: '75px',
      height: '60px',
      top: '-30px',
      left: '-37.5px'
    },{
      duration : 500,
      easing: "linear",
      complete : goToCylinder // 出現後、シリンダーの中へ移動するアニメーション
    });



}

/** シリンダーの中にアニメーションする関数 */
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
    counter += 0.0075; 
    //現在の座標位置を取得
    const point = $targetPath.getPointAtLength(counter * leng);
    const properties = `height: ${neko_height}px; width: ${neko_width}px; `+
                       `top : -30px; left : -37.5px;`+
                       `transform : translate(${point.x}px, ${point.y}px);`
    //nekoのstyleを変更する
    $neko.setAttribute('style' , properties);
    //再びcallする
    window.requestAnimationFrame(moveNeko);
  }
}
