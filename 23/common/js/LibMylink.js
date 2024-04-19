function getBrowserVersion()
{
	str = navigator.appName.toUpperCase();
	version = 0;
	appVer = navigator.appVersion;
	if (str.indexOf("NETSCAPE") >= 0)
	{
		s = appVer.indexOf(" ",0);
		version = eval(appVer.substring(0,s));
		if (version >= 5) version++;
	}
	if (str.indexOf("MICROSOFT") >= 0)
	{
		appVer  = navigator.userAgent;
		s = appVer.indexOf("MSIE ",0) + 5;
		e = appVer.indexOf(";",s);
		version = eval(appVer.substring(s,e));
	}
	return version;
}
function IEcheck()
{

	var IEver = getBrowserVersion();
	if(eval(IEver) > 5.4){ 
		return true;
	} else {
		return false;
	}
}

//クッキー登録のクラス化//////////////////////////////////////////////////////
function MylinkCookie()
{
	
	IEver = IEcheck();
	if (IEver == true)
	{
	
		MylinkCookie.put = function(name ,data ,limit) 
		{
			//有効期限のセット
			var date = '';

			//２年間
			var limit = 730;
			
			if (limit) 
			{
				today = new Date();
				today.setTime(today.getTime()+1000*60*60*24*limit);
				date = 'expires='+today.toGMTString() + ';';
			}
			//名前とパスと日付をそろえてcookieに書き出し
			document.cookie = name + '=' + escape(data) + ';' + strPath + date;
			//alert(data);
		}

	}

}

new MylinkCookie();

//クッキー登録のクラス化ここまで////////////////////////////////////////////////



//クッキー参照のクラス化//////////////////////////////////////////////////////
function readCookie()
{
	
	IEver = IEcheck();
	if (IEver == true)
	{
	
		readCookie.data = new Array();
		readCookie.string = (document.cookie) ? document.cookie.split(';') : new Array();
	
		for(var i = 0; i != readCookie.string.length; i++) {
			readCookie.data[readCookie.string[i].split('=')[0].match(/[^ ].*/)] =  unescape(readCookie.string[i].split('=')[1]); //(4)
			Mylink[readCookie.string[i].split('=')[0].match(/[^ ].*/)] = unescape(readCookie.data[readCookie.string[i].split('=')[0].match(/[^ ].*/)] );
			
	//		alert(readCookie.string[i].split('=')[0].match(/[^ ].*/) + " : " + Mylink[readCookie.string[i].split('=')[0].match(/[^ ].*/)] );
		}

	}

}

new readCookie();

//クッキー参照のクラス化ここまで////////////////////////////////////////////////

//クッキー全て削除
function delAllCookie()
{
	var tmpCookie = document.cookie.split(";");
	today = new Date();
	today.setYear(today.getYear() -1);
	deldate = 'expires='+today.toGMTString() + ';';
		
	for(var i = 0; i < tmpCookie.length; i++) {
		var cName = tmpCookie[i].split('=')[0];
		document.cookie = cName + '=;' + strPath + deldate;
	}
}

//クッキー登録関数
function setMylink()
{
	IEver = IEcheck();
	//対応しているブラウザのみ履歴をクッキーに登録
	if (IEver == true)
	{
		var emptyflg = 0;
		var exist = 0;
		var n = 0;
		

		//クッキーに入れる
		
		var ResetMylink;
		ResetMylink = new Array(g_ElementNum * g_Max);
		for(var i=0; i<g_ElementNum * g_Max; i++)
		{
			ResetMylink[i] = undefined;
		}
		var i_b = 0;
		for(var i = 0; i < g_Max ; i++)
		{
			if(Mylink["t_" +  (i *g_ElementNum) ] == strPageURL )
			{
				//同一だった場合スキップする。
				continue;
			}
			
			for(l = 0 ; l < g_ElementNum ; l ++)
			{
				var now;
				now = "t_" + ((i *g_ElementNum) + l) ;
				var nex;
				 nex = (i_b *g_ElementNum) + l ;
				
				ResetMylink[ nex +g_ElementNum ] = Mylink[ now   ];
			}
			i_b ++;
		}

			//登録処理
			ResetMylink[0] = Keyword[0]
			for(var l = 1 ; l < g_ElementNum ; l ++)
			{
				var SetKey = eval(l);
				ResetMylink[SetKey] = escape(Keyword[l]);
			}

			delAllCookie();
			for(var i = 0; i < g_Max ; i++)
			{
				for(l = 0 ; l < g_ElementNum ; l ++)
				{
					var now;
					now = i *g_ElementNum + l ;
				var key ;
				key = "t_" + now;
					MylinkCookie.put(key,ResetMylink[now],'');
				}
			}			//クッキーを削除
		   
		readCookie();
//		writeMylink();
	}

}

//MyLinkの表示
function writeMylink()
{
	
	IEver = IEcheck();
	if (IEver == true){
	
		document.write("<table>");
		var odd_check;
		odd_check = " class=\"odd\" ";
		for(var i = 0; i < g_Max; i ++){
			var StrTitle = "";
			var str = "";
			
			//全データチェックする。一つでもundefinedがあれば表示しない。
			var checker = 0;
			for(var m = 0 ; m < g_ElementNum ; m ++)
			{
				if(Mylink["t_" + (i * g_ElementNum + m)] != undefined && Mylink[ "t_" + (i * g_ElementNum + m)] != "undefined")
				{
					//ＯＫ
				}else
				{
//					alert("t_" + (i * g_ElementNum + m) + "\n" + Mylink["t_" + (i * g_ElementNum + m)]);
					checker = 1;
					break;
				}
			}
			
			if(checker == 0)
			{
			
				if(odd_check == "" )
				{
					odd_check = " class=\"odd\" ";
					str += "<tr" + odd_check + ">";
					
				}else
				{
					odd_check = "";
					str += "<tr" + odd_check + ">";
				}
				
				
				/*
				for(var l = 0 ; l < g_ElementNum ; l ++) 
				{

					//右カラム
					var now;
					now = g_ElementNum * i + l;
					//とりあえずは単純に要素表示のみ
					str += "<td>" + Mylink[now] + " (" + now + ")</td>\n";
				}
				   */
				var target = "";
				
				str += "<td class=\"center\">" + Mylink["t_" + (g_ElementNum * i +1)] + "</td>\n";
				str += "<td>" + Mylink["t_" + (g_ElementNum * i +2)] + "</td>\n";
				str += "<td>" + Mylink["t_" + (g_ElementNum * i +3)] + "</td>\n";
				str += "<td>" + Mylink["t_" + (g_ElementNum * i +4)] + "</td>\n";
				
				
				if(Mylink["t_" + (g_ElementNum * i + 5)] == 1)
				{
					target = " target=\"_blank\" ";
					str += "<td class=\"center\"><a href=\"javascript:void(0);\" onclick=\"window.open('" + Mylink["t_" + (g_ElementNum * i + 0)] + "', '', 'location=no,width=680,height=500,status=yes,resizable=yes,scrollbars=yes,toolbar=no')\">項目表示<img src=\"common/images/newwindow_icon.gif\" alt=\"新しいウィンドウで開く\" title=\"新しいウィンドウで開く\" /></a></td>\n";
				}else
				{
					str += "<td class=\"center\"><a href=\"" + Mylink["t_" + (g_ElementNum * i + 0)] + "\">項目表示</a></td>\n";
				}
				

				str += "</tr>";
				document.write(str);
			}
			
		}
		document.write("</table>");
		
//		document.write("<br>");
//		document.write('<a onclick="javascript:delAllCookie()" >test</a>');
//		document.write(document.cookie);

	}
}

