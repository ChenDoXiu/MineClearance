/*
*@游戏对象构造函数
*@版本1.0
*@作者:陈独秀
*/
var _time,_timeobj;
function Game(opt){
	var o = opt||{};
	//地图
	this.map = o.map || {};
	//用于保持map对象
	this.game = null;
	//计时器id
	this.time = undefined;
	//地图宽高
	this.width = o.width || 15;
	this.height = o.height ||15;
	//地雷数量
	this.mine = o.mine || 15;
	//分数，时间，重置按钮
	this.scores =  o.score || {};
	this.state = o.state ||{};
	this.times = o.time || {};
	//游戏状态 1标记模式，2暂停，3正常
	this.pointer = 3;
	//记录当前的红旗和地雷的配对数量
	this.sign = 0;
	//记录游戏状态，0为未开始，1为开始
	this.active = 0;
	//记录计时器是否开始工作
	this.inter = false;

};
//初始化
Game.prototype.initialize = function (){


	this.time = 0;
	this.active = 0;
	_time = null;
	_timeobj = this.times;
	this.state.innerText = "😊";
	this.scores.innerText = this.mine;
	this.map.innerHTML = "";
	clearInterval(this.timeId);
	this.sign = 0;
	this.inter = false;
	this.times.innerText = 0;


	this.game = new Map({
		width:this.width,
		height:this.height,
		mine:this.mine,
	});

	//设置地图宽高
	var w = this.map.offsetWidth;
	var h = w/this.width*this.height;
	this.map.style.height = h +"px";
	//初始化地图并渲染地图
	this.game.initialize();
	this.game.radom(this.map);

};

//游戏开始
Game.prototype.start = function(){
	//定义that供事件处理函数使用
	var that = this;
	//自动计时
	this.active = 1;
	
	//给map添加事件处理函数
	this.map.onclick = click;

    //map的事件处理函数
	function click(e){

		if(that.active === 1){
			//判断当前的状态是否为游戏进行中
			if(e.target.x === undefined){return;};
			if(!that.inter){
				that.inter = true;
				that.addtTime();
				that.timeId = setInterval(that.addtTime,1000);
			}
			var x1 = e.target.x;
			var y1 = e.target.y;
	


			if(!that.game.block[y1][x1].div.active){
				//正常模式的处理
				if(that.pointer === 3){
					if(!that.game.block[y1][x1].div.sign){
						var block = that.game.click(x1,y1,true);
					}
					if(block.mine&&that.active===1){
						that.over();
					}
					if(that.game.num() === that.mine&&that.active === 1){
						that.win();
					}
				}
				//标记模式的处理
				if(that.pointer === 1){
					var block = that.game.sign(x1,y1,true);
					if(!block.div.sign&&that.scores.innerText>0){
						var bl = that.game.sign(x1,y1,false);
						if(bl.mine){
							that.sign += 1;
						}
						that.scores.innerText -= 1;
					}else{
						if(block.div.sign){
						var bl = that.game.sign(x1,y1,false);
						if(bl.mine){
							that.sign -= 1;
						}
						that.scores.innerText -= -1;
						}
					}

					if(that.sign == that.game.mine){
						that.win();
					}
				}

			}
		}
	}
};

//计时器,自动计时
Game.prototype.addtTime = function (){
	if(!_time){
		time = new Date();
		_time = time.getTime();
	}
	var a = new Date();
	a = Math.floor((a.getTime() - _time)/1000);
	_timeobj.innerText=a;;

};

//修改当前游戏状态
Game.prototype.aetPointer = function(value){
	this.pointer = value;
};

//游戏结束
Game.prototype.over = function(){
	clearInterval(this.timeId);
	this.game.display();
	this.active = 0;
	this.state.innerText = "😲";
};
//游戏胜利
Game.prototype.win = function (){
	clearInterval(this.timeId);
	this.game.display();
	this.active = 0;
	alert("恭喜通关");
	this.state.innerText="😎";
};



