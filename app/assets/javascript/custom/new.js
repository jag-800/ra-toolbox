let counter = 0; // テキストボックスの数をカウントする変数

/* テキストボックスを作成 */
function addInput() {
  const cftdiv = document.getElementById("show");
  const ipt = document.createElement("input");
  ipt.setAttribute("type", "text");
  ipt.setAttribute("maxlength", "30");
  ipt.setAttribute("size", "30");
  ipt.setAttribute("placeholder", "ユーザー名を入力してください");
  ipt.setAttribute("name", "username");

  counter++; // カウンタをインクリメント
  ipt.setAttribute("id", "textbox" + counter); // テキストボックスに一意のIDを付与

  cftdiv.appendChild(ipt);
}

/* テキストボックスを削除 */
function delInput() {
  const cftdiv = document.getElementById("show");
  if (counter > 0) {
    const lastTextboxId = "textbox" + counter;
    const lastTextbox = document.getElementById(lastTextboxId);
    cftdiv.removeChild(lastTextbox);
    counter--; // カウンタをデクリメント
  }
}