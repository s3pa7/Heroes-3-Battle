/**
 * 
 * 
 */
var inControllLeft;
var inControllRight;
$(function(){	

	var ctx1 = document.getElementById('1').getContext('2d');
	var ctx2 = document.getElementById('2').getContext('2d');
	var ctx3 = document.getElementById('3').getContext('2d');
	var ctx4 = document.getElementById('4').getContext('2d');
	grid('left','hex', 200, 300, 450, 410);
    grid('right','hex', 200, 300, 450, 410);
	var heroesLeft = {
		unit1: new Champion1(ctx1, 10),
		unit2: new Archangel(ctx2 ,10)
	};
	var heroesRight = {
		unit3: new DeathKnight(ctx3 , 10),
		unit4: new Vampire(ctx4 , 10)
	}
	heroesLeft.unit1.draw();
	heroesLeft.unit2.draw();
	heroesRight.unit3.draw();
	heroesRight.unit4.draw();

	$("canvas").on("mousemove" , function(e){
		if(inControllLeft || inControllRight){
			var inControll = inControllRight ? inControllRight : inControllLeft;
			if(Math.abs(inControll.getPositionX()  -  e.offsetX) + Math.abs(inControll.getPositionY()  - e.offsetY) < inControll.getMovementSpeed()){
				$("canvas").css({
				 "cursor": "pointer",	
				})
			}else{
				$("canvas").css({
					 "cursor": "not-allowed",
				})
			}
		}else {
			$("canvas").css({
				 "cursor": "default",
			})
		}
	});
	$("canvas").on("click", function(e){
		var offsetX = e.offsetX;
		var offsetY = e.offsetY;
		if(inControllLeft){
			var unit = inControllLeft;
			var offsetX2 = offsetX - unit.getStep() /2;
			var offsetY2 = offsetY - unit.getHeight() /2;
			
			var checkFunc = checkPlaceTaken(offsetX , offsetY ,heroesLeft , heroesRight);
			if( checkFunc == false){
				unit.move(offsetX2,offsetY2 , false);
			}else if(checkFunc[0] == "right"){
				var toX = offsetX2 /1.5 ;
				if(inControllLeft.getPositionRight() < checkFunc[3]){
					debugger;
					toX = offsetX2 - checkFunc[1];
				}else if(inControllLeft.getPositionX() > checkFunc[3] + checkFunc[1]){
					debugger;
					toX = offsetX2 + checkFunc[1] /8;
				}
				var toY = offsetY2;
				if(inControllLeft.getPositionY() < checkFunc[4]){
					debugger;
					toY = offsetY2 - checkFunc[2] /8;
				}else if(inControllLeft.getPositionY() > checkFunc[4] + checkFunc[2]){
					debugger;
					toY = offsetY2 + checkFunc[2] /8;
				}
				debugger;
				if(inControllLeft instanceof Archangel){
					if(offsetX > checkFunc[3]){
						toX = offsetX - checkFunc[2] - 60;
					}
				}else if(inControllLeft instanceof Champion1 ){
					if(offsetX > checkFunc[3]){
						toX = offsetX - checkFunc[2] - 90;
					}
				}
				unit.move(toX, toY  , checkFunc[5] );
	
			}
			inControllRight = false;
			inControllLeft = false;
			return;	
		}else {
			whichHero(offsetX,offsetY,heroesLeft);		
		}
		
		if(inControllRight){
			debugger;
			var unit1 = inControllRight;
			var offsetX2 = offsetX - unit1.getWidth() / 2;
			var offsetY2 = offsetY - unit1.getHeight() / 2;
			var checkFunc = checkPlaceTaken(offsetX , offsetY ,heroesLeft , heroesRight);

			if( checkFunc == false){
				unit1.move(offsetX2,offsetY2, false);
			}else if(checkFunc[0] == "left"){
				var toX = offsetX2;
				if(inControllRight.getPositionRight() < checkFunc[3]){
					debugger;
					toX = offsetX2 - checkFunc[1];
				}else if(inControllRight.getPositionX() > checkFunc[3] + checkFunc[1]){
					debugger;
					toX = offsetX2 + checkFunc[1];
				}
				var toY = offsetY2;
				if(inControllRight.getPositionY() < checkFunc[4]){
					debugger;
					toY = offsetY2 - checkFunc[2];
				}else if(inControllRight.getPositionY() > checkFunc[4] + checkFunc[2]){
					debugger;
					toY = offsetY2 + checkFunc[2];
				}
				if(inControllLeft instanceof Vampire){
					if(offsetX > checkFunc[3]){
						toX = offsetX - checkFunc[2] - 60;
					}
				}else if(inControllLeft instanceof DeathKnight ){
					if(offsetX > checkFunc[3]){
						toX = offsetX - checkFunc[2] - 80;
					}
				}
				unit1.move(toX, toY , checkFunc[5]);
			}
			inControllRight = false;
			inControllLeft = false;
			return;
		}else{
			whichHeroRight(offsetX,offsetY, heroesRight);
	}
	})
		var myTimer = window.setInterval(function() {
			if(heroesLeft.unit2.getIsDead() == true && heroesLeft.unit1.getIsDead() == true){
				var  cont = confirm("Congratulations! You win\nWould you like to play again?");
				if(cont){
					location.reload();
				}
				clearInterval(myTimer);
			}
			if(heroesRight.unit3.getIsDead() == true && heroesRight.unit4.getIsDead() == true){
				var  cont = confirm("Congratulations! You win\nWould you like to play again?");
				if(cont){
					location.reload();
				}
				clearInterval(myTimer);
			}
			
		},1000);
	
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

