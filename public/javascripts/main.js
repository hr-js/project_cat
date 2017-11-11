'use strict';

(function () {
  'use strict';

  showTodaysPostCount();

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('send_message_btn').addEventListener('click', postMsg);
    document.getElementById('input_message').addEventListener('input', onInput);
    document.getElementById('form').addEventListener('keypress', onKeyPress);
    document.getElementById('input_message').focus();
  });

  function onInput() {
    var messages = this.value;
    // 入力文字数をテキストエリア右下に表示させる.
    document.getElementById('text_length').innerHTML = '' + messages.trim().length;
    // エラーメッセージの初期化
    document.getElementById('error_text').innerHTML = '';
  }

  function onKeyPress(e) {
    var enterKey = 13;
    var otherKeys = ['shiftKey', 'ctrlKey', 'altKey'];
    if (e.keyCode !== enterKey || otherKeys.some(function (key) {
      return e[key];
    })) {
      return false;
    }
    postMsg(e);
  }

  /*
   * 引数の日付の投稿件数を表示する | default: new Date
   */
  function showTodaysPostCount() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();


    // const xhr = new XMLHttpRequest();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var errMessage = '投稿件数の取得に失敗しました';

    fetch('/comment/count?date=' + date.toJSON(), {
      method: 'GET',
      headers: headers,
      mode: 'cors'
    }).then(function (res) {
      return xhrErrorHandler(res, errMessage);
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      document.getElementById('today_post').textContent = json.count;
    }).catch(console.error);
  }

  /*
   * エラーメッセージを初期化して送信する
   */
  function postMsg(e) {
    e.preventDefault();
    var form = document.getElementsByTagName('form').form;
    var message = form.getElementsByTagName('textarea').input_message.value;

    document.getElementById('error_text').innerHTML = '';

    if (message.trim()) {
      postComment({ message: message, date: new Date() });
    } else {
      inputError();
    }
  }

  /*
   * メッセージを送信する
   */
  function postComment(data) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch('/comment', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
      mode: 'cors'
    }).then(function (res) {
      return xhrErrorHandler(res, 'メッセージの送信に失敗しました。');
    }).then(success).then(showTodaysPostCount).catch(sendError);
  }

  /*
   * サーバ通信の成功・失敗を判断する
   */
  function xhrErrorHandler(res, message) {
    if (res.ok) return res;
    throw Error(message);
  }

  /*
   * メッセージ通信に成功した時のコールバック
   */
  function success() {
    var idNames = ['contents', 'textarea_wrap', 'mail_top', 'send_message_btn', 'cat_icon', 'form', 'result', 'mail_back', 'mail_front'];

    var nodes = idNames.map(function (id) {
      return [id, document.getElementById(id)];
    });
    var target = new Map(nodes);

    document.activeElement.blur();

    target.forEach(function (node) {
      return node.classList.add('animation');
    });
    target.get('result').addEventListener('animationend', resultCallbackCreate(target));
  }

  /*
   * 通信に失敗した時のコールバック
   */
  function sendError() {
    var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Error('m9(^Д^)ﾌﾟｷﾞｬｰ');

    var infoBar = document.getElementById('info_bar');
    infoBar.innerHTML = error.message;
    infoBar.addEventListener('animationend', createFnInitInfoBar(infoBar));
    infoBar.classList.add('animation');
  }

  /*
   * 通信に失敗した時のアニメーション初期化関数
   */
  function createFnInitInfoBar(target) {
    return function initInfoCallback() {
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

      var textarea = target.get('textarea_wrap');

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
    target.forEach(function (node) {
      return node.classList.remove('animation');
    });

    document.getElementById('input_message').value = '';
    document.getElementById('text_length').innerHTML = '0';
  }

  /*
   * 封筒を非表示にして、formを表示する
   */
  function showMailForm(target) {
    changeEnvelopeVisibility(target, 'hidden');
    target.get('form').style.visibility = '';
  }

  /*
   * textarea初期化コールバックを作成する
   */
  function textareaCallbackCreate(target) {
    return function textareaCallback() {
      var textarea = target.get('textarea_wrap');

      textarea.classList.remove('show_textarea_animation');
      changeEnvelopeVisibility(target, '');

      textarea.focus();
      textarea.removeEventListener('animationend', textareaCallback);
    };
  }

  /*
   * 封筒の表示状態を変更する
   */
  function changeEnvelopeVisibility(target, visibility) {
    ['mail_back', 'mail_front', 'mail_top'].forEach(function (elementId) {
      target.get(elementId).style.visibility = visibility;
    });
  }

  /*
   * 空文字の時のエラーメッセージの表示
   */
  function inputError() {
    var error = document.getElementById('error_text');
    error.setAttribute('class', 'error');
    var textError = document.createTextNode('文字を入力してください');
    error.appendChild(textError);
  }
})();
