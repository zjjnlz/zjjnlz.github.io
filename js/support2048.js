documentWidth = window.screen.availWidth;//获取当前设备可以使用的宽度
gridContainerWidth = 0.975 * documentWidth;//大棋盘的宽度
cellSlideLength = 0.18 * documentWidth;//小格子的变长
cellSpace = 0.0125 * documentWidth;//每一种小格子之间的间距


function getPosTop(i, j){
	return cellSpace + i*(cellSlideLength + cellSpace);
}
function getPosLeft(i, j){
	return cellSpace + j*(cellSlideLength + cellSpace);
}
function getNumberBackgroundImage(number){
	switch(number){
		case 2:return "url(img/dex003.png)";break;
		case 4:return "url(img/dex009.png)";break;
		case 8:return "url(img/dex006.png)";break;
		case 16:return "url(img/003_f2.png)";break;
		case 32:return "url(img/009_f2.png)";break;
		case 64:return "url(img/006_f2.png)";break;
		case 128:return "url(img/150.png)";break;
		case 256:return "url(img/150_f2.png)";break;
		case 512:return "url(img/151.png)";break;
		case 1024:return "url(img/382_f2.png";break;
		case 2048:return "url(img/383_f2.png)";break;
		case 4096:return "url(img/384_f2.png)";break;
		case 8192:return "url(img/493.png)";break;
	}
	return "black";
}
function getNumberColor(number){
	if(number<=4)
		return "lightgrey";
	else if(number<=16)
		return "lightyellow";
	else if(number<=64)
		return "lightblue";
	else if(number<=256)
		return "lightpink";
	else if(number<=1024)
		return "mediumpurple";
	else
		return "gold";
}

function nospace(board){
	for (var i=0;i<5;i++)
		for(var j=0;j<5;j++){
			if(board[i][j]==0)//为0表示棋盘格里还有空间
				return false;
		}
		
	return true;
}
//判断是否可以左移
function canMoveLeft( board ){
	for (var i = 0;i < 5; i++) {
		for (var j = 1;j < 5;j++) {
			if(board[i][j] !=0 ){
				//左侧等于0或者左侧与之相等可以合并
				 if(board[i][j-1]==0||board[i][j-1]==board[i][j])return true;
			}
		}
	}
	return false;
}
//判断是否可以右移
function canMoveRight( board ){
	for (var i = 0;i < 5; i++) {
		for (var j = 3;j >=0;j--) {
			if(board[i][j] !=0 ){
				//右等于0或者右侧与之相等可以合并
				 if(board[i][j+1]==0||board[i][j+1]==board[i][j])return true;
			}
		}
	}
	return false;
}
//判断是否可以上移
function canMoveUp( board ){
	for (var i = 1;i < 5; i++) {
		for (var j = 0;j < 5;j++) {
			if(board[i][j] !=0 ){
				//上侧等于0或者上侧与之相等可以合并
				 if(board[i-1][j]==0||board[i-1][j]==board[i][j])return true;
			}
		}
	}
	return false;
}
//判断是否可以下移
function canMoveDown( board ){
	for (var i = 3;i >= 0; i--) {
		for (var j = 0;j < 5;j++) {
			if(board[i][j] != 0 ){
				//下侧等于0或者下侧与之相等可以合并
				 if(board[i+1][j]==0||board[i+1][j]==board[i][j])return true;
			}
		}
	}
	return false;
}
//判断是否有障碍物
function noBlockHorizontal ( row , col1 , col2 , board ){
	for ( var i = col1 + 1 ; i < col2 ; i++ )
		if( board[row][i]!=0)
			return false;
			
	return true;
}
function noBlockVertical ( col , row1 , row2 , board ){
	for (var i = row1 + 1 ; i < row2 ; i++) {
		if(board[i][col]!=0)
			return false;
	}
	return true;
}
function nomove( board ){
	if( canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) )
		return false;
	return true;
}
