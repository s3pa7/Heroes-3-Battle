/**
 * 
 */
var inControll;
$(function(){
	console.log(2);
	var ctx = document.querySelector('canvas').getContext('2d');
	var heroesLeft = {
		unit1: new Champion(40,100,ctx)
	}
	var heroesRight = {
			
	}
	
	heroesLeft.unit1.stayOnPlace(ctx);
	$("canvas").on("click", function(e){
		var offsetX = e.offsetX;
		var offsetY = e.offsetY;
		if(inControll){
			var unit = heroesLeft[inControll];
			var offsetX = offsetX - unit.getSmallStep() /2;
			var offsetY = offsetY - unit.getSmallHeight()/2;
			unit.move(offsetX,offsetY,ctx);
			debugger;
			inControll = false;
		}else {
			whichHero(offsetX,offsetY,heroesLeft);
		}
	})
})

function whichHero (x,y,heroesLeft){
	console.log(1);
	debugger;
	for (var i in heroesLeft){
		console.log(y , heroesLeft[i].getPositionX())
	if(x > heroesLeft[i].getPositionX() && x < heroesLeft[i].getPositionRight() &&
			y > heroesLeft[i].getPositionY() && y < heroesLeft[i].getPositionBottom()){
		inControll = i;	
	}
	console.log(inControll);
	}
}