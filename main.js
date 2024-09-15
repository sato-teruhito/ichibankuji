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
let simuData = []
let sum = 0;

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
    inp_n.min = 1;
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
    sum = 0;
    //idでhtmlからtblの要素を取得し，trタグのNodeListを取得
    let tbl = document.getElementById("tbl");
    let tbl_tr = tbl.querySelectorAll("tr");
    
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
                    sum += numberValue;
                    d.push(numberValue);
                }
            });
            data.push(d);
        }
    });
    console.log(data);
    console.log(sum);
    //tabShow();////データセット後にタブ表示
    makeSimuTable();//データセット後にシミュレーター用の表作成
    setSimuData();//データセット後にシミュレーター用の配列作成
    makeCalcTable2()//データセット後に計算用の表作成
    resultText2_hidden()
    resultText3_hidden()
    makeCalcTable3()//データセット後に計算用の表作成
    createSelectBox_prize2(); //データセット後に個数セレクトボックス2生成
    createSelectBox_num2(); //データセット後に景品セレクトボックス2生成
    createSelectBox_prize3(); //データセット後に個数セレクトボックス3生成
    createSelectBox_num3(); //データセット後に景品セレクトボックス3生成
    return data;
}

/* function tabShow(){
    const show = document.getElementsByClassName('tab');
    show.style.visibility = 'visible';
} */

function showData() {
    console.log(data);
    console.log(sum);
}

//シミュレーター用のデータの表作成
function makeSimuTable() {

    // テーブルのtbodyを取得
    let table_1 = document.getElementById('tbl_simu');
    //テーブル初期化
    table_1.innerHTML = ''; 

    const headerRow_1 = document.createElement('tr');
    const header1_1 = document.createElement('th');
    header1_1.textContent = '○○賞';  // ヘッダー1
    const header2_1 = document.createElement('th');
    header2_1.textContent = '残り個数';  // ヘッダー2
    const header3_1 = document.createElement('th');
    header3_1.textContent = '当たり個数'; //ヘッダー3
    headerRow_1.appendChild(header1_1);
    headerRow_1.appendChild(header2_1);
    headerRow_1.appendChild(header3_1);
    table_1.appendChild(headerRow_1);  // テーブルにヘッダー行を追加

    // 配列データをテーブルに追加
    data.forEach(([name, quantity]) => {
        const row_1 = document.createElement('tr'); // 行を作成
    
        // 商品名のセル
        const nameCell_1 = document.createElement('td');
        nameCell_1.textContent = name;
        row_1.appendChild(nameCell_1);
    
        // 残り個数のセル
        const quantityCell_1 = document.createElement('td');
        quantityCell_1.textContent = quantity;
        quantityCell_1.type = Number(quantity);
        quantityCell_1.setAttribute('data-name', name);  // 商品名をクラス名として追加
        row_1.appendChild(quantityCell_1);

        // 当たり個数のセル
        const getCell = document.createElement('td');
        getCell.textContent = 0;
        getCell.type = Number(quantity);
        getCell.setAttribute('data-name', name+1);  // 商品名をクラス名として追加
        row_1.appendChild(getCell);
    
        // 行をテーブルに追加
        table_1.appendChild(row_1);
    });
  
}

//シミュレーター用のデータの配列（データセット後と，シミュリセット時に実行）
function setSimuData() {
    simuData = [];
    //console.log(data);
    //console.log(simuData);
    
    data.forEach(([item, count]) => {
        for (let i = 0; i < count; i++) {
            simuData.push(item);
        }
    });
    console.log(simuData);
    return simuData;
}

function simu_buttonShow() {
    // ボタンを取得
    let button_simu = document.getElementById('simu');
    // ボタンを表示にする
    button_simu.style.visibility = 'visible';
}

function resultText1_hidden() {
    let resultText1 = document.getElementById("resultText1");
    resultText1.style.visibility = 'hidden';
}

//シミュレーター実行
function simu() {    
    if (simuData.length !== 0) {
        let randomIndex = Math.floor(Math.random() * simuData.length);
        let randomValue = simuData[randomIndex];

        // 結果を表示
        let resultText1 = document.getElementById("resultText1");
        resultText1.style.visibility = 'visible';
        let simu_result = document.getElementById("simuResult");
        simu_result.textContent = randomValue;

        // 選択された値を配列から削除
        simuData.splice(randomIndex, 1);

        console.log("Remaining Simulation Data:", simuData);

        //テーブルから，出た商品名の残り数を-1
        delSimuTable(randomValue);
        //テーブルから，出た商品名の当たり数を+1
        addSimuTable(randomValue);

        // すべてのデータが使用された場合の処理
        if (simuData.length === 0) {
            console.log("すべてのデータが使用されました。");
            // ボタンを取得
            let button_simu = document.getElementById('simu');
            // ボタンを非表示にする
            button_simu.style.visibility = 'hidden';
        }
    } else {
        alert("データをセットしてください。");
    }
}

//シミュレーター用のテーブルの残り個数を減らす関数
function delSimuTable(tagName) {
    // data-name 属性が tagName に該当する <td> 要素を取得
    const targetTd = document.querySelector(`td[data-name='${tagName}']`);
    
    // 該当する <td> 要素が存在する場合
    if (targetTd) {
        // 現在の値を数値に変換して取得
        let currentValue = Number(targetTd.textContent);
        
        // 値を -1 する
        currentValue -= 1;

        // 更新された値を <td> のテキストコンテンツに設定
        targetTd.textContent = currentValue;
    } else {
        console.error(`タグ名 "${tagName}" に該当する要素が見つかりません。`);
    }
}

//シミュレーター用のテーブルの当たった個数を増やす関数

function addSimuTable(tagName) {
    // data-name 属性が tagName に該当する <td> 要素を取得
    const targetTd = document.querySelector(`td[data-name='${tagName+1}']`);
    
    // 該当する <td> 要素が存在する場合
    if (targetTd) {
        // 現在の値を数値に変換して取得
        let currentValue = Number(targetTd.textContent);
        
        // 値を -1 する
        currentValue += 1;

        // 更新された値を <td> のテキストコンテンツに設定
        targetTd.textContent = currentValue;
    } else {
        console.error(`タグ名 "${tagName}" に該当する要素が見つかりません。`);
    }
}

//計算用の表作成
function makeCalcTable2() {

    // テーブルのtbodyを取得
    let table_2 = document.getElementById('tbl_calc2');
    //テーブル初期化
    table_2.innerHTML = ''; 

    const headerRow_2 = document.createElement('tr');
    const header1_2 = document.createElement('th');
    header1_2.textContent = '○○賞';  // ヘッダー1
    const header2_2 = document.createElement('th');
    header2_2.textContent = '残り個数';  // ヘッダー2
    headerRow_2.appendChild(header1_2);
    headerRow_2.appendChild(header2_2);
    table_2.appendChild(headerRow_2);  // テーブルにヘッダー行を追加

    // 配列データをテーブルに追加
    data.forEach(([name, quantity]) => {
        const row_2 = document.createElement('tr'); // 行を作成
    
        // 商品名のセル
        const nameCell_2 = document.createElement('td');
        nameCell_2.textContent = name;
        row_2.appendChild(nameCell_2);
    
        // 残り個数のセル
        const quantityCell_2 = document.createElement('td');
        quantityCell_2.textContent = quantity;
        quantityCell_2.type = Number(quantity);
        quantityCell_2.setAttribute('data-name', name+2);  // 商品名をクラス名として追加
        row_2.appendChild(quantityCell_2);

        // 行をテーブルに追加
        table_2.appendChild(row_2);
    });
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

//セレクトボックス生成2(回数)
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
    defaultOption.text = '回数を選択してください';
    defaultOption.value = '';
    select.appendChild(defaultOption);
        
    //商品の選択をしていた場合，対応する回数の選択肢を出す．
    if (selectedIndex !== '' && data[selectedIndex] && data[selectedIndex].length > 1) {
        let maxNumber = sum;
        // 0からmaxNumberまでのオプションを作成
        for (let i = 1; i <= maxNumber; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.text = i.toString();
            select.appendChild(option);
        }
    }
    // セレクトボックスをコンテナに追加
    container.appendChild(select);
}

//回数から期待値計算
function exp() {
    if (data.length !== 0) {
        //引く回数取得
        let times2 = document.getElementById('prizeSelect_num2').selectedIndex;
        console.log(times2);
        
        //選択した商品名取得
        let prize2 = document.getElementById('prizeSelect_prize2').selectedIndex;
        let prizeName2 = document.getElementById('prizeSelect_prize2').options[prize2].textContent;
        console.log(prizeName2);
        
        //選択した商品の個数を取得
        let prizeTd2 = document.querySelector(`td[data-name='${prizeName2+2}']`);
        let numPrize2 = Number(prizeTd2.textContent);
        console.log(numPrize2);

        //計算
        let x = 1;
        for (let i = 0; i < times2; i++) {
            x *= (sum - numPrize2 - i) / (sum - i)
        }
        console.log(x);
        
        //結果表示
        let resultText2 = document.getElementById("resultText2");
        resultText2.style.visibility = 'visible';
        let exp_result = document.getElementById("expResult");
        exp_result.textContent = (1 - x) * 100;
    } else {
        alert("データをセットしてください。");
    }
}

function resultText2_hidden() {
    let resultText2 = document.getElementById("resultText2");
    resultText2.style.visibility = 'hidden';
}

//計算用の表作成
function makeCalcTable3() {

    // テーブルのtbodyを取得
    let table_3 = document.getElementById('tbl_calc3');
    //テーブル初期化
    table_3.innerHTML = ''; 

    const headerRow_3 = document.createElement('tr');
    const header1_3 = document.createElement('th');
    header1_3.textContent = '○○賞';  // ヘッダー1
    const header2_3 = document.createElement('th');
    header2_3.textContent = '残り個数';  // ヘッダー2
    headerRow_3.appendChild(header1_3);
    headerRow_3.appendChild(header2_3);
    table_3.appendChild(headerRow_3);  // テーブルにヘッダー行を追加

    // 配列データをテーブルに追加
    data.forEach(([name, quantity]) => {
        const row_3 = document.createElement('tr'); // 行を作成
    
        // 商品名のセル
        const nameCell_3 = document.createElement('td');
        nameCell_3.textContent = name;
        row_3.appendChild(nameCell_3);
    
        // 残り個数のセル
        const quantityCell_3 = document.createElement('td');
        quantityCell_3.textContent = quantity;
        quantityCell_3.type = Number(quantity);
        quantityCell_3.setAttribute('data-name', name+3);  // 商品名をクラス名として追加
        row_3.appendChild(quantityCell_3);

        // 行をテーブルに追加
        table_3.appendChild(row_3);
    });
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

//セレクトボックス生成3(回数)
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
    defaultOption.text = '希望する期待値を選択してください';
    defaultOption.value = '';
    select.appendChild(defaultOption);
        
    //商品の選択をしていた場合，希望する期待値の選択肢を出す．
    if (selectedIndex !== '' && data[selectedIndex] && data[selectedIndex].length > 1) {
        let maxNumber = 100;
        // 0からmaxNumberまでのオプションを作成
        for (let i = 1; i <= maxNumber; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.text = i.toString();
            select.appendChild(option);
        }
    }
    // セレクトボックスをコンテナに追加
    container.appendChild(select);
}

//期待値から回数計算
function numTimes() {
    if (data.length !== 0) {
        //希望する期待値取得
        let expVal3 = document.getElementById('prizeSelect_num3').selectedIndex;
        console.log(expVal3);
        
        //選択した商品名取得
        let prize3 = document.getElementById('prizeSelect_prize3').selectedIndex;
        let prizeName3 = document.getElementById('prizeSelect_prize3').options[prize3].textContent;
        console.log(prizeName3);
        
        //選択した商品の個数を取得
        let prizeTd3 = document.querySelector(`td[data-name='${prizeName3+3}']`);
        let numPrize3 = Number(prizeTd3.textContent);
        console.log(numPrize3);

        //計算
        let x = 1;
        let count = 0;
        let rate;
        do {
            x = 1;
            count++;
            for (let i = 0; i < count; i++) {
                x *= (sum - numPrize3 - i) / (sum - i)
            }
            rate = (1 - x) * 100;
            console.log(rate);
        } while (rate < expVal3);
        
        //結果表示
        let resultText3 = document.getElementById("resultText3");
        resultText3.style.visibility = 'visible';
        let numTimes_result = document.getElementById("numTimesResult");
        numTimes_result.textContent = count;
        let expValShow = document.getElementById("expVal");
        expValShow.textContent = expVal3;
    } else {
        alert("データをセットしてください。");
    }
}

function resultText3_hidden() {
    let resultText3 = document.getElementById("resultText3");
    resultText3.style.visibility = 'hidden';
}

//初期化関数
function init() {
    //タブの切り替え処理などを行う場合はここに記述
}

//ページ読み込み時に初期化関数を呼び出す
window.onload = init;