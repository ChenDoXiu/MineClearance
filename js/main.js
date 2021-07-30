/*
*游戏入口函数
*版本1.0
*作者:陈独秀
*/
var map = document.getElementById("map");
var score = document.getElementById("score");
var state = document.getElementById("state");
var time = document.getElementById("time");
var sign = document.getElementById("sign");
var exploit = document.getElementById("exploit");
var lookup = document.getElementById("lookup");
var footer = document.getElementById("footer");
var opt = document.getElementById("opt");
var box2 = document.getElementById("box2");
var easy = document.getElementById("easy");
var medium = document.getElementById("medium");
var hard = document.getElementById("hard");
var title = document.getElementById("title");


var game = new Game({
	map:map,
	score:score,
	state:state,
	time:time,
	//width : 地图宽度，height高度，mine雷数
	width:10,
	height:10,
	mine:10
	
});
start();
state.addEventListener("click",start,false);
function start(){
game.initialize();
game.start();
}


footer.addEventListener("click",foot,false);
function foot(e){
	div = e.target;
	sign.className = "btn";
	exploit.className = "btn";
	lookup.className = "btn";
	div.className = "btn active";
	switch(div.id){
		case "sign":
		game.aetPointer(1);
		break;
		case "lookup":
		game.aetPointer(3);
		break;
		case "exploit":
		game.aetPointer(2);
		break;
		
	}
}


opt.onclick = function(){
	if(!opt.active){
		opt.active = 0;
	};
	if(opt.active === 0){
		box2.style.display = "block";
		opt.active = 1;
	}else{
		box2.style.display = "none";
		opt.active = 0;
	}
};

easy.onclick = function (){
	game.width = 10;
	game.height = 10;
	game.mine = 10;
	title.innerText="Mine Clearance-Easy";
	state.click();
	box2.style.display ="none";
};

medium.onclick = function(){
	game.width = 16;
	game.height = 16;
	game.mine = 70;
	title.innerText="Mine Clearance-Medium";
	state.click();
	box2.style.display ="none";
};
hard.onclick = function(){
	game.width = 16;
	game.height = 20;
	game.mine = 70;
	title.innerText="Mine Clearance-Hard";
	state.click();
	box2.style.display ="none";
};
