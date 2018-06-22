var board = new Array();//游戏数据
var score = 0;//分数
var hasConflicted = new Array();//记录每一个小格子是否已经发生过一次碰撞
//触控的开始坐标
var startx = 0 ;
var starty = 0 ;
//触控的结束坐标
var endx = 0 ;
var endy = 0 ;


$(document).ready(function(){
	prepareForMobile()//移动端
	newgame();
});
function prepareForMobile(){//移动设备的css样式
	if( documentWidth > 500 ){
		gridContainerWidth = 620;
		cellSpace = 20;
		cellSlideLength = 100;
	}
	
	$('#gridContainer').css('width',gridContainerWidth - 2*cellSpace);
	$('#gridContainer').css('height',gridContainerWidth - 2*cellSpace);
	$('#gridContainer').css('padding',cellSpace);
	$("#gridContainer").css('border-radius',0.02*gridContainerWidth);//圆角
	
	$('.grid-cell').css('width',cellSlideLength);
	$('.grid-cell').css('height',cellSlideLength);
	$('.grid-cell').css('border-radius',0.1*cellSlideLength);
	
}
function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}
/**
 *初始化操作的系列函数 
 */
function init(){
	for(var i=0;i<5;i++)
		for(var j=0;j<5;j++){
			
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i,j));
			gridCell.css("left",getPosLeft(i,j));
		}
	
	for (var i=0;i<5;i++){
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j=0;j<5;j++){
			board[i][j] = 0;//刚开始每个格子初始化为0
			hasConflicted[i][j] = false;//每个格子初始化为false，代表都没有发生碰撞
		}
			
	}
	score = 0;
	//根据board值对前端numbercell操作
	updateBoardView();
	updateScore(score);
	
}

function updateBoardView(){
	
	$(".number-cell").remove();//先删除
	
	for(var i=0;i<5;i++)
		for(var j=0;j<5;j++){
			$("#gridContainer").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			if (board[i][j] == 0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				//计算得到左上角的坐标加上50就是中间点了
				theNumberCell.css('top',getPosTop(i,j)+cellSlideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSlideLength/2);
			}
			else{//不等于0时的NumberCell的样式
				theNumberCell.css('width',cellSlideLength);
				theNumberCell.css('height',cellSlideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-image',getNumberBackgroundImage(board[i][j]));//不同数字，不同的背景图片
				theNumberCell.css('color',getNumberColor(board[i][j]));//前景颜色
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
		$('.number-cell').css('line-height',cellSlideLength + 'px');//因为要写文本所以行高要进行设定
		$('.number-cell').css('font-size',0.4*cellSlideLength + 'px');//设置字体大小
}
/**
 * 随机生产数字2，4
 */
function generateOneNumber(){
	if (nospace(board)) {//棋盘格还有空间就能生成函数
		return false;
	} 
	//随机一个位置
	var randx = parseInt( Math.floor(Math.random()*5) );//0,1,2,3,4 floor方法下取整
	var randy = parseInt( Math.floor(Math.random()*5) );//0,1,2,3,4 floor方法下取整
	
	//随机啊算法
//	while( true ){
//		if(board[randx][randy]==0)
//			break;
//		//如果不是0，要重复生成随机位置
//		var randx = parseInt(Math.floor(Math.random()*5));//0,1,2,3,4
//		var randy = parseInt(Math.floor(Math.random()*5));//0,1,2,3,4
//	}
	//优化随机算法
	var times = 0;
	while( times<50 ){//只给机器循环50次随机位子
		if(board[randx][randy]==0)
			break;
			
		//如果不是0，要重复生成随机位置
		var randx = parseInt(Math.floor(Math.random()*5));//0,1,2,3,4
		var randy = parseInt(Math.floor(Math.random()*5));//0,1,2,3,4
		
		times ++;
	}
	if( times == 50 ){//如果50次都没找到，则人工找到一个可以生成的位置
		for ( var i = 0 ; i < 5 ; i ++ ) {
			for ( var j = 0 ; j < 5 ; j ++ ) {
				if( board[i][j] == 0 ){
					randx = i;
					randy = j;
				}
			}
		}
	}

	//随机一个数字2,4
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	
	//随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	
	
	return true;
	
}
//键盘事件
$(document).keydown(function (event){
//	event.preventDefault();//阻挡默认的效果，比如滚动条，解决屏幕不一致，产生滚动条的时候
	
	switch(event.keyCode){
		case 37://left
			event.preventDefault();
			if( moveLeft() ){
				setTimeout("generateOneNumber()",210);//每次移动新增一次数字
				setTimeout("isgameover()",300);//判断游戏是否结束了
			}
			break;
		case 38://up
			event.preventDefault();
			if( moveUp() ){
				setTimeout("generateOneNumber()",210);//每次移动新增一次数字
				setTimeout("isgameover()",300);//判断游戏是否结束了
			}
			break;
		case 39://right
			event.preventDefault();
			if( moveRight() ){
				setTimeout("generateOneNumber()",210);//每次移动新增一次数字
				setTimeout("isgameover()",300);//判断游戏是否结束了
			}
			break;
		case 40://down
			event.preventDefault();
			if( moveDown() ){
				setTimeout("generateOneNumber()",210);//每次移动新增一次数字
				setTimeout("isgameover()",300);//判断游戏是否结束了
			}
			break;
		default ://default
			break;
	}	
});


//手指滑动事件,添加监听器
document.addEventListener( 'touchstart',function( event ){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});
//避免安卓手指响应的bug，添加事件响应
document.addEventListener('touchmove',function(evnet){
	event.preventDefault();
});
document.addEventListener( 'touchend',function( event ){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	
	var deltax = endx - startx ;
	var deltay = endy - starty ;
	
	//用户点击的时候并不是滑动，得设定一个阈值来进行判断用户的意图
	if( Math.abs(deltax) < 0.1*documentWidth && Math.abs(deltay) < 0.1*documentWidth ) return ;
	//x轴
	if( Math.abs(deltax) >= Math.abs(deltay) ){
		if( deltax > 0 ){
			//向右
			if( moveRight() ){
				setTimeout("generateOneNumber()",210);//每次移动新增一次数字
				setTimeout("isgameover()",300);//判断游戏是否结束了
			}
		}
		else{
			//向左
			if( moveLeft() ){
				setTimeout("generateOneNumber()",210);//每次移动新增一次数字
				setTimeout("isgameover()",300);//判断游戏是否结束了
			}
		}
	}
	//y轴
	else{
		if ( deltay > 0) {
			//向下
			if( moveDown() ){
				setTimeout("generateOneNumber()",210);//每次移动新增一次数字
				setTimeout("isgameover()",300);//判断游戏是否结束了
			}
		} else{
			//向上
			if( moveUp() ){
				setTimeout("generateOneNumber()",210);//每次移动新增一次数字
				setTimeout("isgameover()",300);//判断游戏是否结束了
			}
		}
	}
});
//实现逻辑控制


//判断游戏是否结束了
function isgameover(){
	if (nospace( board ) && nomove( board ) ){
		gameover();
	}
}
function gameover(){
	alert("gameover!");
}

function moveLeft(){
	if( !canMoveLeft(board) ){
		return false;
	}
	//moveLeft
	for (var i = 0;i < 5; i++) 
		for (var j = 1;j < 5; j++) //对第一列不需要考虑
			if(board[i][j]!=0){
				for(var k = 0; k < j; k++){//遍历了（i,j）所有的左侧元素(i,k)
					
					if( board[i][k]==0&&noBlockHorizontal( i , k , j , board ) ){
						//move
						showMoveAnimation( i , j , i , k );
						board[i][k] = board[i][j];//(i,j)移动到(i,k)
						board[i][j] = 0;//(i,j)变为0就代表移动完成
						continue;
					}
					else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) && !hasConflicted[i][k] ){
						//move
						showMoveAnimation( i , j , i , k );
						//add
						board[i][k] += board[i][j];//(i,j)和(i,k)相加移动到(i,k)
						board[i][j] = 0;//(i,j)变为0就代表移动完成
						//add score
						score += board[i][k];//两个数字相加的结果就是所加的分数
						//更新前台函数
						updateScore( score );
						
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
	setTimeout("updateBoardView()",200);//刷新
	return true;
}
function moveRight(){
	if( !canMoveRight(board) ){
		return false;
	}
	//moveRight
	for (var i = 0;i < 5; i++) 
		for (var j = 3;j >= 0; j--) //对第5列不需要考虑
			if(board[i][j] != 0){
				for(var k = 4; k > j; k--){//遍历了（i,j）所有的右侧元素(i,k)
					if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
						//move
						showMoveAnimation( i , j , i , k );
						board[i][k] = board[i][j];//(i,j)移动到(i,k)
						board[i][j] = 0;//(i,j)变为0就代表移动完成
						continue;
					}
					else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k, board ) && !hasConflicted[i][k] ){
						//move
						showMoveAnimation( i , j , i , k );
						//add
						board[i][k] *=2;//(i,j)和(i,k)相加移动到(i,k)
						board[i][j] = 0;//(i,j)变为0就代表移动完成
						//add score
						score += board[i][k];//两个数字相加的结果就是所加的分数
						//更新前台函数
						updateScore( score );
						
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
			
	setTimeout("updateBoardView()",200);//刷新
	return true;
}
function moveUp(){
	if( !canMoveUp(board) ){
		return false;
	}
	//moveUp
	for (var j = 0; j < 5;j++) 
		for (var i = 1; i < 5; i++)//对第1行不需要考虑
			if(board[i][j]!=0){
				for(var k = 0; k < i; k++){//遍历了（i,j）所有的上侧元素(k,j)
					if( board[k][j]==0&&noBlockVertical( j , k , i , board ) ){
						//move
						showMoveAnimation( i , j , k , j );
						board[k][j] = board[i][j];//(i,j)移动到(k,j)
						board[i][j] = 0;//(i,j)变为0就代表移动完成
						continue;
					}
					else if( board[k][j] == board[i][j]&&noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
						//move
						showMoveAnimation( i , j , k , j );
						//add
						board[k][j] *=2;//(i,j)和(i,k)相加移动到(k,j)
						board[i][j] = 0;//(i,j)变为0就代表移动完成
						//add score
						score += board[k][j];//两个数字相加的结果就是所加的分数
						//更新前台函数
						updateScore( score );
						
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
			
	setTimeout("updateBoardView()",200);//刷新
	return true;
}
function moveDown(){
	if( !canMoveDown(board) ){
		return false;
	}
	//moveDown
	for (var j = 0 ; j < 5 ; j++) 
		for (var i = 3 ;i  >= 0 ; i--) //对第5行不需要考虑
			if(board[i][j] != 0){
				for(var k = 4; k > i; k--){//遍历了（i,j）所有的下侧元素(k,j)
					if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
						//move
						showMoveAnimation( i , j , k , j );
						board[k][j] = board[i][j];//(i,j)移动到(k,j)
						board[i][j] = 0;//(i,j)变为0就代表移动完成
						continue;
					}
					else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k, board ) && !hasConflicted[k][j] ){
						//move
						showMoveAnimation( i , j , k , j );
						//add
						board[k][j] *= 2;//(i,j)和(i,k)相加移动到(k,j)
						board[i][j] = 0;//(i,j)变为0就代表移动完成
						//add score
						score += board[k][j];//两个数字相加的结果就是所加的分数
						//更新前台函数
						updateScore( score );
						
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
			
	setTimeout("updateBoardView()",200);//刷新
	return true;
}