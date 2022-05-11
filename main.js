'use strict';

const table = document.querySelector('table');
const todo = document.getElementById('todo');
const priority = document.querySelector('select') ;
const deadline = document.querySelector('input[type="date"]');
const submit = document.getElementById('submit');

let list = []; // TODOリストのデータ
const strage = localStorage;

document.addEventListener('DOMContentLoaded', () => {

  // 1. ストレージデータ（JSON）の読み込み
  const json = strage.todoList;
  if (json == undefined) {
    return;
  }

  // 2. JSONをオブジェクトの配列に変換して配列listに代入
  list = JSON.parse(json);

  // 3. 配列listのデータを元にテーブルに要素を追加
  for (const item of list) {
    addItem(item);
  }
});

const addItem = (item) => {
  const tr =document.createElement('tr');// tr要素を生成
  for (const prop in item){
    const td = document.createElement('td');
    if (prop == 'done') { //完了欄の場合
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked =item[prop];
      td.appendChild(checkbox);
      //完了チェックボックスを追加
    } else {
      td.textContent = item[prop]; // その他の欄
    }
    tr.appendChild(td);

  //   if (prop == 'done'){
  //     const checkbox = document.createElement('input');
  //     td.appendChild(checkbox);
  //     checkbox.addEventListener('change', checkBoxListener);
  //   }
    }
  table.append(tr); //trエレメントをtable要素に追加
  };

const checkBoxListener = (ev) => {
  const currentTr = ev.currentTarget.parentElement.parentElement ;
  const trList = Array.from(document.getElementsByTagName('tr'));
  const idx = trList.indexOf(currentTr) - 1;
  list[idx].done =ev.currentTarget.checked;
  strage.todoList =JSON.stringify(list);
};



//TODO登録ボタン
submit.addEventListener('click', () => {
  const item ={}; // 入力値を一旦格納するオブジェクト

  if (todo.value!= '') {
    item.todo = todo.value;
  } else {
    item.todo = 'ダミーTODO';
  }

  item.priority =priority.value;

  if (deadline.value != ''){
    item.deadline = deadline.value;
  } else {
    item.deadline = new Date().toLocaleDateString().replace(/\//g, '-');
    // window.alert('期日を入力してください');
    // return;
  }

  item.done = false;

  // フォームをリセット
  todo.value = '';
  priority.value = '普';
  deadline.value = '';

  addItem(item);

  list.push(item) ;
  strage.todoList = JSON.stringify(list);

});







