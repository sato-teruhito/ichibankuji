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

    //商品名のテーブル作成
    let td_p = document.createElement("td");
    let inp_p = document.createElement("input");
    inp_p.type = "text";
    td_p.appendChild(inp_p);
    tr.appendChild(td_p);

    //個数のテーブル作成（型を数値指定）
    let td_n = document.createElement("td");
    let inp_n = document.createElement("input");
    inp_n.type = "number";
    td_n.appendChild(inp_n);
    tr.appendChild(td_n);

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
    /* tbl_tr.forEach(function(tr) {
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
    }); */
    
    tbl_tr.forEach(function(tr, rowIndex) {
        const cells = tr.querySelectorAll('td');
        if (cells.length === 2) {  // 2列あることを確認
            const d = [];
            cells.forEach(function(td, cellIndex){
                let cellValue;
                const input = td.querySelector('input');
                
                if (input) {
                    cellValue = input.value.trim();
                } else {
                    cellValue = td.textContent.trim();
                }

                if (cellIndex === 0) {
                    // 1列目: 文字列として格納
                    d.push(cellValue);
                } else if (cellIndex === 1) {
                    // 2列目: 数値として格納
                    const numberValue = Number(cellValue);
                    if (isNaN(numberValue)) {
                        throw new Error(`Invalid number in row ${rowIndex + 1}, column 2: "${cellValue}"`);
                    }
                    d.push(numberValue);
                }
            });
            data.push(d);
        }
    });

    console.log(data);
    createSelectBox_prize2(); //データセット後に個数セレクトボックス2生成
    createSelectBox_num2(); //データセット後に景品セレクトボックス2生成
    createSelectBox_prize3(); //データセット後に個数セレクトボックス3生成
    createSelectBox_num3(); //データセット後に景品セレクトボックス3生成
    return data;
}

function showData() {
    console.log(data);
}

//セレクトボックス生成2(○○賞名)
function createSelectBox_prize2() {
    let container = document.getElementById('selectBoxContainer_prize2');
    container.innerHTML = ''; // 既存のコンテンツをクリア

    // セレクトボックスを作成
    let select = document.createElement('select');
    select.id = 'prizeSelect_prize2';

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
        select.addEventListener('change', createSelectBox_num2);
    } else {
        container.textContent = "データがセットされていません。";
    }
}

//セレクトボックス生成(個数)
function createSelectBox_num2() {
    let container = document.getElementById('selectBoxContainer_num2');
    container.innerHTML = ''; // 既存のコンテンツをクリア

    let select0 = document.getElementById('prizeSelect_prize2');
    let selectedIndex = select0.value;

    // セレクトボックスを作成
    let select = document.createElement('select');
    select.id = 'prizeSelect_num2';

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

//セレクトボックス生成3(○○賞名)
function createSelectBox_prize3() {
    let container = document.getElementById('selectBoxContainer_prize3');
    container.innerHTML = ''; // 既存のコンテンツをクリア

    // セレクトボックスを作成
    let select = document.createElement('select');
    select.id = 'prizeSelect_prize3';

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
        select.addEventListener('change', createSelectBox_num3);
    } else {
        container.textContent = "データがセットされていません。";
    }
}

//セレクトボックス生成(個数)
function createSelectBox_num3() {
    let container = document.getElementById('selectBoxContainer_num3');
    container.innerHTML = ''; // 既存のコンテンツをクリア

    let select0 = document.getElementById('prizeSelect_prize3');
    let selectedIndex = select0.value;

    // セレクトボックスを作成
    let select = document.createElement('select');
    select.id = 'prizeSelect_num3';

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