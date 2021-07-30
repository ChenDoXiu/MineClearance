window.onerror=function(msg,url,l){alert("错误类型"+msg +"\n 错误地址"+url+"\n行数"+l);};
var aaa = document.getSelectionAll(".interactive.fzdysk");
//动态创建style标签
function addCssByStyle(cssString){ 
    var doc=document; 
    var style=doc.createElement("style"); 
    style.setAttribute("type", "text/css"); 
   
    if(style.styleSheet){// IE 
        style.styleSheet.cssText = cssString; 
    } else {// w3c 
        var cssText = doc.createTextNode(cssString); 
        style.appendChild(cssText); 
    } 
   
    var heads = doc.getElementsByTagName("head"); 
    if(heads.length) 
        heads[0].appendChild(style); 
    else 
        doc.documentElement.appendChild(style); 
} 








function Debug(opt){
	var o = opt || {};
	//悬浮窗状态
	this.btnActive = false;
	
	//悬浮窗默认样式
	this.style = ".debug_button{\
  border: 2px outset #ccc;\
  background-color:#aaa;\
  text-align:center;\
}\
.debug_button:active{\
  border: 2px inset #aaa;\
  background-color:#ccc;\
}\
.debug_windows{\
  border: 2px outset #ccc;\
  background-color:#aaa;\
  text-align:center;\
}\
";
}
Debug.prototype.initialize = function(){
	addCssByStyle(this.style);
	var that = this;
	//创建悬浮窗按钮
	var btn = document.createElement("div");
	btn.innerText = "🔍";
	btn.style.position = "fixed";
	btn.style.width = "30px";
	btn.style.height = "30px";
	btn.style.top = "3px";
	btn.style.right = "3px";
	btn.style.fontSize = "20px";
	btn.style.lineHeight = "30px";
	btn.className = "debug_button";
	
	document.body.appendChild(btn);
	this.window();
	btn.onclick = function(){
		 if(!that.btnActive){
			 that.windowTrue();
		 }else{
			 that.windowFalse();
			
		 }
	};
};
Debug.prototype.window = function(){
	//创建悬浮窗
	var win = document.createElement("div");
		win.style.width = "200px";
		win.style.height = "300px";
		win.style.position = "fixed";
		win.style.top = "15px";
		win.style.left = "5px";
		win.className = "debug_windows";
		
		this.win = win;
		
		var body = document.createElement("div");
		body.style.width ="100%";
		body.style.height = "25px";
		body.style.lineHeight = "25px";
		body.className = "debug_windows";
		win.appendChild(body);
		win.style.display = "none";
		
		this.leftMove = document.createElement("div");
		this.leftMove.style.width= "21px";
		this.leftMove.style.height= "21px";
		this.leftMove.style.position = "absolute";
		this.leftMove.style.right = "0px";
		this.leftMove.innerText = "◆";
		this.leftMove.className = "debug_button";
		this.leftMove.onclick = function(){
			
		};
		body.appendChild(this.leftMove);
		
		
		
		document.body.appendChild(win);
};
Debug.prototype.windowTrue = function (){
		this.win.style.display = "block";
		this.btnActive = true;
};

Debug.prototype.windowFalse = function(){
	this.win.style.display = "none";
	this.btnActive = false;
};










var debug = new Debug();
debug.initialize();
