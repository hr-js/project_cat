$(function() {
  /** 送信ボタンにマウスオーバーした際のイベント */
  $('.nikubtn').mouseover(function() {
    console.log("mouseover")
    $('button').css("background-color", "#c0fff4");

    $('circle').css("fill", "#1e90ff").css("stroke", "#351fff");
    $('ellipse').css("fill", "#1e90ff").css("stroke", "#351fff");

  });
  $('.nikubtn').mouseleave(function() {
    /** 送信ボタンからマウスオーバーを外した際のイベント */
    $('button').css("background-color", "#ffc0cb");

    $('circle').css("fill", "#ffa500").css("stroke", "#a52a2a");
    $('ellipse').css("fill", "#ffa500").css("stroke", "#a52a2a");
  });


});
