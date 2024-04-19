// URL設定
var strDir = "/"
var strRoot = "http://" + location.host + strDir;
var strPath = "path=" + strDir + ";";

// 各ページURL
var strPageURL = location.href;
strPageURL = strPageURL.replace("#.", "");



strPageURL = strPageURL.split("#")[0];
strPageURL = strPageURL.split("?")[0];



//履歴の最大保持数
var g_Max;
g_Max = 5;

//要素数
var g_ElementNum;
g_ElementNum = 6;

//配列の初期化
Mylink = new Array(g_Max * g_ElementNum);

//キーワード変数初期化
var Keyword = new Array(g_Max * g_ElementNum);
