/**
 * 
 */
var inControllLeft;
var inControllRight;
$(function(){
	var ctx = document.querySelector('canvas').getContext('2d');
	var heroesLeft = {
		unit1: new Champion1(ctx, 10),
		unit2: new Archangel(ctx ,10)
	};
	var heroesRight = {
		unit3: new DeathKnight(ctx , 10),
		unit4: new Vampire(ctx , 10)
	}
	heroesLeft.unit1.draw();
	heroesLeft.unit2.draw();
	heroesRight.unit3.draw();
	heroesRight.unit4.draw();
	$("canvas").on("click", function(e){
		var offsetX = e.offsetX;
		var offsetY = e.offsetY;
		if(inControllLeft){
			var unit = inControllLeft;
			var offsetX2 = offsetX - unit.getStep() / 2;
			var offsetY2 = offsetY - unit.getHeight() / 2;
			
			var checkFunc = checkPlaceTaken(offsetX , offsetY ,heroesLeft , heroesRight);
			if( checkFunc == false){
				unit.move(offsetX2,offsetY2,ctx , false);
			}else if(checkFunc[0] == "right"){
				var toX = offsetX2 /1.5 ;
				if(inControllLeft.getPositionRight() < checkFunc[3]){
					toX = offsetX2 - checkFunc[1] /1.5;
				}else if(inControllLeft.getPositionX() > checkFunc[3] + checkFunc[1]){
					
					toX = offsetX2 + checkFunc[1];
				}
				var toY = offsetY2;
				if(inControllLeft.getPositionY() < checkFunc[4]){
					toY = offsetY2 - checkFunc[2] / 1.5;
				}else if(inControllLeft.getPositionY() > checkFunc[4] + checkFunc[2]){
					toY = offsetY2 + checkFunc[2] / 1.5;
				}
				unit.move(toX, toY , ctx , checkFunc[5] );
	
			}
			inControllRight = false;
			inControllLeft = false;
			return;	
		}else {
			whichHero(offsetX,offsetY,heroesLeft);		
		}
		
		if(inControllRight){
			var unit1 = inControllRight;
			var offsetX2 = offsetX - unit1.getWidth() / 2;
			var offsetY2 = offsetY - unit1.getHeight() / 2;
			debugger;
			var checkFunc = checkPlaceTaken(offsetX , offsetY ,heroesLeft , heroesRight);
			console.log(checkFunc);
			if( checkFunc == false){
				unit1.move(offsetX2,offsetY2,ctx, false);
			}else if(checkFunc[0] == "left"){
				var toX = offsetX2 /1.5 ;
				if(inControllRight.getPositionRight() < checkFunc[3]){
					toX = offsetX2 - checkFunc[1] /3;
				}else if(inControllRight.getPositionX() > checkFunc[3] + checkFunc[1]){
					
					toX = offsetX2 + checkFunc[1];
				}
				var toY = offsetY2;
				if(inControllRight.getPositionY() < checkFunc[4]){
					toY = offsetY2 - checkFunc[2] /3;
				}else if(inControllRight.getPositionY() > checkFunc[4] + checkFunc[2]){
					toY = offsetY2 + checkFunc[2] /3 ;
				}
				unit1.move(toX, toY , ctx , checkFunc[5]);
			}
			inControllRight = false;
			inControllLeft = false;
			return;
		}else{
			whichHeroRight(offsetX,offsetY, heroesRight);
	}
	})
	
	
})

function whichHero (x,y,heroesLeft){
	for (var i in heroesLeft){
		console.log(y , heroesLeft[i].getPositionX())
		if(x > heroesLeft[i].getPositionX() && x < heroesLeft[i].getPositionRight() &&
				y > heroesLeft[i].getPositionY() && y < heroesLeft[i].getPositionBottom()){
			inControllLeft = heroesLeft[i];	
		}
	}
}
function whichHeroRight (x,y,heroesRight){
	debugger;
	for (var i in heroesRight){
		console.log(y , heroesRight[i].getPositionX())
		if(x > heroesRight[i].getPositionX() && x < heroesRight[i].getPositionRight() &&
				y > heroesRight[i].getPositionY() && y < heroesRight[i].getPositionBottom()){
			inControllRight = heroesRight[i];	
		}
	}
}
function checkPlaceTaken (x,y ,heroesLeft , heroesRight){
	for (var i in heroesLeft){
		
		if(x > heroesLeft[i].getPositionX() && x < heroesLeft[i].getPositionRight() &&
				y > heroesLeft[i].getPositionY() && y < heroesLeft[i].getPositionBottom()){
			return ["left" , heroesLeft[i].getWidth() , heroesLeft[i].getHeight(), heroesLeft[i].getPositionX(),heroesLeft[i].getPositionY(),heroesLeft[i]];
		}
	}
	for(var i in heroesRight){
		if(x > heroesRight[i].getPositionX() && x < heroesRight[i].getPositionRight() &&
				y > heroesRight[i].getPositionY() && y < heroesRight[i].getPositionBottom()){
			return ["right" , heroesRight[i].getWidth() , heroesRight[i].getHeight(), heroesRight[i].getPositionX(),heroesRight[i].getPositionY(), heroesRight[i]];
		}
	}
	return false;
}
