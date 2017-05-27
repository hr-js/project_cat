//pathを取得
const $targetPath = document.getElementById('target_path');
// 動かしたいneko
const $neko = document.getElementById('neko');
 
//動かす値を取得
let counter = 0;
//pathの長さを取得
let leng = $targetPath.getTotalLength();
 
//
function moveNeko(){

  //終点にきたらストップさせる
  if( parseInt(counter,10) === 1 ){
    return false;
  }

  //変化値 
  counter += 0.005;
    
  //現在の座標位置を取得
  const point = $targetPath.getPointAtLength(counter * leng);

　//nekoのstyleを変更する
  $neko.setAttribute('style' , `transform : translate(${point.x}px, ${point.y}px);`);

  //再びcallする
  window.requestAnimationFrame(moveNeko);
}

moveNeko();