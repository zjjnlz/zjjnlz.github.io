function showNumberWithAnimation(i,j,randNumber){
	
	var numberCell = $("#number-cell-"+i+'-'+j);
	
	numberCell.css("background-image",getNumberBackgroundImage(randNumber));
	numberCell.css("color",getNumberColor(randNumber));
	numberCell.text(randNumber);
	
	numberCell.animate({
		width:cellSlideLength,
		height:cellSlideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j),
	},50);//原本（0，0）时是在每个格子的中间，现在变成（100，100）了，就要计算位子，和每个格子一样，动画时间设置为50ms
	
}
//移动的动画
function showMoveAnimation ( fromx , fromy , tox , toy ){
	var numberCell = $('#number-cell-' + fromx + '-' + fromy);
	numberCell.animate({
		top:getPosTop( tox , toy ),
		left:getPosLeft( tox , toy )
	},200)
}
//分数更新的动画
function updateScore( score ){
	$('#score').text( score );
}
