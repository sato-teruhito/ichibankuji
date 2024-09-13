'use strict'; /* 厳格にエラーをチェック */


{ /* ローカルスコープ */

    //DOM取得
    const tabMenus = document.querySelectorAll('.tab-menu-item');
    //イベント付加
    tabMenus.forEach((tabMenu) => {
        tabMenu.addEventListener('click', tabSwitch);
    })

    //タブ切り替えのイベント処理
    function tabSwitch(e) {
        //クリックされた要素のデータ属性を取得
        const tabTargetData = e.currentTarget.dataset.tab;
        
        //クリックされた要素の親要素と，その子要素を取得
        const tabList = e.currentTarget.closest('.tab-menu');
        const tabItems = tabList.querySelectorAll('.tab-menu-item');

        //クリックされた要素の親要素の兄弟要素の子要素を取得
        const tabPanelItems = tabList.
        nextElementSibling.querySelectorAll('.tab-panel-box');
        
        //クリックされたtabの同階層のmenuとpanelのクラスを削除
        tabItems.forEach((tabItem) => {
            tabItem.classList.remove('is-active');
        })
        tabPanelItems.forEach((tabPanelItem) => {
            tabPanelItem.classList.remove('is-show');
        })

        //クリックされたmenu要素にis-activeクラスを付加
        e.currentTarget.classList.add('is-active');

        //クリックしたmenuのデータ属性と等しい値を持つパネルにis-showクラスを付加
        tabPanelItems.forEach((tabPanelItem) => {
            if (tabPanelItem.dataset.panel ===  tabTargetData) {
            tabPanelItem.classList.add('is-show');
            }
        })
    }
}

let data = []

//行追加
function add() {
    let tbl = document.getElementById("tbl");
    let tr = document.createElement("tr");

    for(let i=0; i<2; i++) {
        let td = document.createElement("td");
        let inp = document.createElement("input");
        td.appendChild(inp);
        tr.appendChild(td);
    }

    tbl.appendChild(tr);
}

//末尾行削除
function del() {
    let tbl = document.getElementById("tbl");
    let rw = tbl.rows.length;
    if (tbl && rw > 1) {  //ヘッダー行は削除しない
        tbl.deleteRow(rw - 1);
    } else {
        alert("削除する行がありません");
    }
}

//データセット取得
function getTableData() {
    data = [];
    //idでhtmlからtblの要素を取得し，trタグのNodeListを取得
    let tbl = document.getElementById("tbl");
    let tbl_tr = tbl.querySelectorAll("tr");
    //テーブルの1行(trタグ)毎に処理
    tbl_tr.forEach(function(tr) {
        //tdタグのNodeListを取得
        let cells = tr.querySelectorAll('td');
        //テーブルのヘッダー部分は飛ばす
        if (cells.length != 0) {
            //テーブルの1行(trタグ)のデータを格納する配列
            let d = [];
            //セル(tdタグ)毎に処理
            cells.forEach(function(td){
                //セルがinputタグだった場合
                if(td.innerHTML.indexOf('input') != -1) {
                    d.push(td.firstElementChild.value);
                }
                //セルがtextだった場合
                else if(td.textContent!=""){
                    d.push(td.textContent);
                }
                //セルが空白だった場合
                else{
                    d.push("");
                }
            });
            data.push(d);
        }
    });
    console.log(data);
    createSelectBox_prize(); //データセット後に個数セレクトボックス生成
    createSelectBox_num(); //データセット後に景品セレクトボックス生成
    return data;
}

function showData() {
    console.log(data);
}

//セレクトボックス生成(○○賞名)
function createSelectBox_prize() {
    let container = document.getElementById('selectBoxContainer_prize');
    container.innerHTML = ''; // 既存のコンテンツをクリア

    // セレクトボックスを作成
    let select = document.createElement('select');
    select.id = 'prizeSelect_prize';

    // データが存在することを確認
    if (data && data.length > 0) {
        // デフォルトのオプションを追加
        let defaultOption = document.createElement('option');
        defaultOption.text = '景品を選択してください';
        defaultOption.value = '';
        select.appendChild(defaultOption);

        // データの各要素に対してオプションを作成
        data.forEach((item, index) => {
            if (item && item.length > 0) {
                let option = document.createElement('option');
                option.value = index;
                option.text = item[0];
                select.appendChild(option);
            }
        });

        // セレクトボックスをコンテナに追加
        container.appendChild(select);
        select.addEventListener('change', createSelectBox_num);
    } else {
        container.textContent = "データがセットされていません。";
    }
}

//セレクトボックス生成(個数)
function createSelectBox_num() {
    let container = document.getElementById('selectBoxContainer_num');
    container.innerHTML = ''; // 既存のコンテンツをクリア

    let select0 = document.getElementById('prizeSelect_prize');
    let selectedIndex = select0.value;

    // セレクトボックスを作成
    let select = document.createElement('select');
    select.id = 'prizeSelect_num';

    // デフォルトのオプションを追加
    let defaultOption = document.createElement('option');
    defaultOption.text = '個数を選択してください';
    defaultOption.value = '';
    select.appendChild(defaultOption);
        
    //商品の選択をしていた場合，対応する個数の選択肢を出す．
    if (selectedIndex !== '' && data[selectedIndex] && data[selectedIndex].length > 1) {
        let maxNumber = parseInt(data[selectedIndex][1]);
        // 0からmaxNumberまでのオプションを作成
        for (let i = 0; i <= maxNumber; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.text = i.toString();
            select.appendChild(option);
        }
    }
    // セレクトボックスをコンテナに追加
    container.appendChild(select);
} 

//シミュレーター
function simu() {

}

//回数から期待値計算
function exp() {

}

//期待値から回数計算
function num() {

}

//初期化関数
function init() {
    //タブの切り替え処理などを行う場合はここに記述
}

//ページ読み込み時に初期化関数を呼び出す
window.onload = init;