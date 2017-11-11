(function() {
  'use strict';

  getTodaysPostCount();

  document.addEventListener('DOMContentLoaded', function() {

    const btn = document.getElementById('send_message_btn');
    const textArea = document.getElementById('input_message');

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      postMsg();
    });

    document.getElementById('form').addEventListener('keypress', onKeyPress);

    // e.keyCode=13(Enterキー)のキーが単独で押された場合のみ処理を行う
    function onKeyPress(e) {
      if (e.keyCode !== 13 || (e.keyCode === 13 && (e.shiftKey === true || e.ctrlKey === true || e.altKey === true))) {
        return false;
      }

      e.preventDefault();
      postMsg();
    }

    textArea.addEventListener('input', function() {
      const messages = this.value;
      // 入力文字数をテキストエリア右下に表示させる.
      document.getElementById('text_length').innerHTML = `${messages.trim().length}`;
      //エラーメッセージの初期化
      document.getElementById('error_text').innerHTML = '';
    });

    // textareaにフォーカスインする
    document.getElementById('input_message').focus();
  });

  /**
     * 引数の日付の投稿件数を取得する | default: new Date
     * （非同期通信）
     */
  function getTodaysPostCount(date = (new Date())) {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status == 304) {
          document.getElementById('today_post').textContent = `${JSON.parse(xhr.responseText).count}`;
        } else {
          console.log(`m9(^Д^)ﾌﾟｷﾞｬｰ： ${xhr.statusText}`);
        }
        xhr.abort();
      }
    };

    xhr.open('GET', `/comment/count?date=${date.toJSON()}`, true);
    xhr.send();
  }

  /*
   * エラーメッセージを初期化して送信する
   */
  function postMsg() {
    const form = document.getElementsByTagName('form').form;
    const message = form.getElementsByTagName('textarea').input_message.value;

    removeErrorMSG();

    if (message.trim()) {
      const data = {
        message: message,
        date: new Date()
      };

      postComment(data);
    } else {
      inputError();
    }
  }

  /*
   * メッセージを送信する
   */
  function postComment(data) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch('/comment', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      mode: 'cors'
    }).then(xhrErrorHandler).then(success).then(getTodaysPostCount).catch(sendError);
  }

  /*
   * サーバ通信の成功・失敗を判断する
   */
  function xhrErrorHandler(res) {
    if (res.ok) return res;
    throw Error('メッセージの送信に失敗しました。');
  }

  /*
   * メッセージ通信に成功した時のコールバック
   */
  function success() {
    const idNames = ['contents', 'textarea_wrap', 'mail_top', 'send_message_btn', 'cat_icon', 'form', 'result', 'mail_back', 'mail_front'];

    // idの配列から、ノードを取得
    const nodes = idNames.map(function(id) {
      return [id, document.getElementById(id)];
    });

    const target = new Map(nodes);

    document.activeElement.blur();

    target.forEach(function(node) {
      return node.classList.add('animation');
    });

    target.get('result').addEventListener('animationend', resultCallbackCreate(target));
  }

  /*
   * 通信に失敗した時のコールバック
   */
  function sendError(error = new Error('m9(^Д^)ﾌﾟｷﾞｬｰ')){
    const infoBar = document.getElementById('info_bar');
    infoBar.innerHTML = error.message;
    infoBar.addEventListener('animationend', createFnInitInfoBar(infoBar));
    infoBar.classList.add('animation');
  }

  /*
   * 通信に失敗した時のアニメーション初期化関数
   */
  function createFnInitInfoBar(target){
    return function initInfoCallback(){
      target.classList.remove('animation');
      target.innerHTML = '';
      target.removeEventListener('animationend', initInfoCallback);
    };
  }

  /*
   * 送信アニメーション終了時のコールバック
   */
  function resultCallbackCreate(target) {

    return function resultCallback() {
      animationInitialize(target);
      showMailForm(target);

      const textarea = target.get('textarea_wrap');

      textarea.addEventListener('animationend', textareaCallbackCreate(target));
      textarea.classList.add('show_textarea_animation');

      target.get('result').removeEventListener('animationend', resultCallback);
    };

  }

  /*
   * アニメーション初期化
   */
  function animationInitialize(target) {
    target.get('form').style.visibility = 'hidden';

    target.forEach(function(node) {
      return node.classList.remove('animation');
    });

    document.getElementById('input_message').value = '';
    document.getElementById('text_length').innerHTML = '0';
  }

  /*
   * 封筒を非表示にして、formを表示する
   */
  function showMailForm(target) {
    target.get('mail_back').style.visibility = 'hidden';
    target.get('mail_front').style.visibility = 'hidden';
    target.get('mail_top').style.visibility = 'hidden';
    target.get('form').style.visibility = '';
  }

  /*
   * textareaの初期化
   */
  function textareaCallbackCreate(target) {
    return function textareaCallback() {
      var textarea = target.get('textarea_wrap');

      textarea.classList.remove('show_textarea_animation');
      target.get('mail_back').style.visibility = '';
      target.get('mail_front').style.visibility = '';
      target.get('mail_top').style.visibility = '';

      textarea.focus();
      textarea.removeEventListener('animationend', textareaCallback);
    };
  }

  /*
   * 空文字の時のエラーメッセージの表示
   */
  function inputError() {
    const error = document.getElementById('error_text');
    error.setAttribute('class', 'error');
    const textError = document.createTextNode('文字を入力してください');
    error.appendChild(textError);
  }

  /*
   * エラーメッセージの初期化
   */
  function removeErrorMSG() {
    document.getElementById('error_text').innerHTML = '';
  }

})();
