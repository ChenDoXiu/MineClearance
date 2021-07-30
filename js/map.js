/*
*地图的构造对象
*版本1.0
*@制作:陈独秀
*/
function Map(opt){
	var o = opt || {};
	//记录相对宽高
	this.width = o.width || 10;
	this.height = o.height || 10;
	//记录地雷数量
	this.mine = o.mine || 15;
	//记录当前地图还有多少没有打开的方块
	this.nub = 0;
	//记录地图方块
	this.block = [];
	//定义数字颜色
	this.color = {
		"1" : "blue",
		"2" : "green",
		"3" : "red",
		"4" : "darkBlue",
		"5" : "FireBrick",
		"6" : "Purple",
		"7" : "yellow",
		"8" : "964B00"
		
		
	};
};

//初始化
Map.prototype.initialize = function(){

	//初始化一些循环变量
	var i,j;

	//创建一个二维数组表示地图
	for(i = 0;i < this.height;i++){
		var n = [];
		for(j = 0 ;j < this.width;j++){
			n[j] = {
				mine:false,
				number:0,
			};
		}
		this.block[i] = n;
	}
	console.dir(this);
	//随机产生地雷
	for(i = 0;i < this.mine;){
		var x = random(0,this.width-1);
		var y = random(0,this.height-1);
		if(!this.block[y][x].mine){
			this.block[y][x].mine = true;
			i++;
		}
	}
	//根据规律产生数字

	for(i = 0;i < this.height;i++){
		for(j = 0;j < this.width;j++){
			if(!this.block[i][j].mine){
				var num = 0;
				for(var z = i-1;z <= i+1;z++){
					for(var x = j-1;x<= j+1;x++){
						if(z>=0&&x>=0 && z<this.height&&x<this.width){
							if(this.block[z][x].mine){
								num++;

							}
						}
					}
				}
				this.block[i][j].number=num;
			 }
		}
	};
};
//渲染地图
Map.prototype.radom = function(map){
	var w = map.offsetWidth/this.width-0.3;
	var h = map.offsetHeight/this.height-0.3;
	var fs = h*0.6;
	//遍历生成div块
	for(var i = 0;i<this.height;i++){
		for(var j = 0;j<this.width;j++){
		var div = document.createElement("div");
		div.className = "black";
		div.style.width = w - 4+"px";
		div.style.height= h - 4+"px";
		div.style.top=i*h+"px";
		div.style.left=j*w+"px";
	    div.style.fontSize = fs + 'px';
	    div.style.lineHeight = h + 'px';
		div.y = i;
		div.x = j;
		div.sign = false;
		this.block[i][j].div = div;
		map.appendChild(div);
		}
	}
};
//点击x，y处的块;
Map.prototype.click = function(x,y,act){
	var block = this.block[y][x];
	//点击当前的块;

	var div = block.div;
	var x = div.x;
	var y = div.y;
	if(!div.sign){
		div.className="black-on";
		div.active = true;
		div.style.color = this.color[block.number];
		if(block.number!==0&&!block.mine){
			div.innerText = block.number;
		}
	}
	//递归算法展开所有的白色方块
	if(act&&block.number===0&&!block.mine){
		for(var y1 = y-1;y1 <= y+1;y1++){
			for(var x1 = x-1;x1 <= x+1;x1++){
				if(!(x1<0||y1<0||x1>=this.width||y1>=this.height)){
				var div1 = this.block[y1][x1];
				if(!div1.div.active&&div1.number===0){
					this.click(x1,y1,true);
					
				}
				if(!div1.div.active&&div1.number!==0&&!div1.mine){
					this.click(x1,y1,false);
				}};
			};
		};
	}
	/*
	//旧的递归算法，有严重缺陷，弃用
	if(act&&block.number===0&&!block.mine){
		var up = y-1;
		var down = y+1;
		var left = x-1;
		var right = x+1;
		if( up>= 0 ){
			if(this.block[up][x].number === 0&&!this.block[up][x].div.active){
				this.click(x,up,true);
			}
			if(this.block[up][x].number !== 0&& !this.block[up][x].mine&&!this.block[up][x].div.active){
				this.click(x,up,false);
			}
		}
		if(down<this.height){
			if(this.block[down][x].number === 0&&!this.block[down][x].div.active){
				this.click(x,down,true);
			}
			if(this.block[down][x].number !==0 && !this.block[down][x].mine&&!this.block[down][x].div.active){
				this.click(x,down,false);
			}
		}
		if(left>=0){
			if(this.block[y][left].number === 0&&!this.block[y][left].div.active){
				this.click(left,y,true);
			}
			if(this.block[y][left].number !==0 && !this.block[y][left].mine&&!this.block[y][left].div.active){
				this.click(left,y,false);
			}
		}
		if(right<this.width){
			if(this.block[y][right].number === 0&&!this.block[y][right].div.active){
				this.click(right,y,true);
			}
			if(this.block[y][right].number !==0 && !this.block[y][right].mine&&!this.block[y][right].div.active){
				this.click(right,y,false);
			}
		}
	}*/
	return this.block[y][x];

};
//显示所有地雷
Map.prototype.display = function (){
	for(var i = 0,len = this.block.length;i<len;i++){
		for(var j = 0 ,len2 = this.block[i].length;j<len2;j++){
			
			if(this.block[i][j].mine&&!this.block[i][j].div.sign){
				this.block[i][j].div.innerText="💣";
			}
			//找到所有错误标记
			if(this.block[i][j].div.sign&&!this.block[i][j].mine){
				this.block[i][j].div.innerText="🚫";
			}
		}
	}
};
//统计一共有多少个方块没有被点开
Map.prototype.num = function(){
	var e = 0;
	for(var i = 0,len = this.block.length;i<len;i++){
		for(var j = 0 ,len2 = this.block[i].length;j<len2;j++){
			if(!this.block[i][j].div.active){
			e++;
			}
		}
	}
	this.nub = e;
	return e;
};

//在块上插上小红旗
Map.prototype.sign = function(x,y,bol){
	if(bol){
		return this.block[y][x];
	}
	var block = this.block[y][x];
	if(!block.div.active){
		if(!block.div.sign){
			block.div.innerText = "🚩";
			block.div.sign = true;
		}else{
			block.div.innerText = "";
			block.div.sign = false;
		}
	}
	return block;
};





//测试
/*var map = document.getElementById("map");
var tes = new Map();
tes.initialize();
console.dir(tes);
for(var i = 0;i<10;i++){
	for(var j= 0; j< 10 ;j++){
		if(!tes.block[i][j].mine){
		map.innerHTML+= "|"+tes.block[i][j].number;}else{
			map.innerHTML+= "|9"
		}
	}
	map.innerHTML+= "<br/>"
}*/
/*
var map = document.getElementById("map");
var o = new Map();
o.initialize();
o.radom(map);
o.click(2,3,true);*/
