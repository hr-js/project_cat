$(function(){
  const $btn = $("#btn"),
        $cat = $("#cat");

  $btn.on("click", function(e){
    $cat.addClass('show_cat_animation');
  });
  $cat.on("webkitAnimationStart animationstart", function(e){
    console.log("アニメーションスタート");
  });
  $cat.on("webkitAnimationEnd animationend", function(e){
    console.log("アニメーションエンド");

    $cat.css({
      width: "150px",
      height: "120px",
      transform: "translateX(-75px) translateY(0px)"
    });

    $cat.removeClass("show_cat_animation");

    $({x : 0}).animate(
      { x : -100 },
      {
        duration: 1000,
        easing: "swing",
        progress: function(animation, progress, remainingMs){
          $cat.css({
            transform: `translateX(-75px) translateY(${animation.elem.x}px)`
          });
        }
      }
    );

  });
});
