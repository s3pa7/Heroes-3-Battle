const DEATH_KNIGHT_HEIGHT = 110;
const DEATH_KNIGHT_WIDTH = 100;
const POSITION_DEATH_KNIGHT_X = 815;
const POSITION_DEATH_KNIGHT_Y = 400;
const DEATH_KNIGHT_SPRITE_X = 1165;
const DEATH_KNIGHT_SPRITE_Y = 190;
const DEATH_KNIGHT_SPEED = 30;
const DEATH_KNIGHT_STEP = 100;

const DEATH_KNIGHT_MOVEMENT_SPEED = 400;

const DEATH_KNIGHT_SPRITE_X_DIE = 391;
const DEATH_KNIGHT_SPRITE_Y_DIE = 811;
const DEATH_KNIGHT_WIDTH_DIE = 99;
const DEATH_KNIGHT_HEIGHT_DIE = 120;
const DEATH_KNIGHT_STEP_DIE = 99;

const DEATH_KNIGHT_SPRITE_X_FIGHT = 1265;
const DEATH_KNIGHT_SPRITE_Y_FIGHT = 505;
const DEATH_KNIGHT_WIDTH_FIGHT = 120;
const DEATH_KNIGHT_HEIGHT_FIGHT = 130;
const DEATH_KNIGHT_STEP_FIGHT = 116;

const DEATH_KNIGHT_SPRITE_X_BEATEN = 391;
const DEATH_KNIGHT_SPRITE_Y_BEATEN = 811;
const DEATH_KNIGHT_WIDTH_BEATEN = 99;
const DEATH_KNIGHT_HEIGHT_BEATEN = 110;
const DEATH_KNIGHT_STEP_BEATEN = 99;

const DEATH_KNIGHT_DMG = 40;
const DEATH_KNIGHT_HEATH = 100;

function DeathKnight (ctx , count) {
	Unit.call(this, ctx);
	var _height = DEATH_KNIGHT_HEIGHT;
	var _width = DEATH_KNIGHT_WIDTH;
	var _positionX = POSITION_DEATH_KNIGHT_X;
	var _positionY = POSITION_DEATH_KNIGHT_Y;
	var _sprite = SpriteLoader.onLoaded()[2];
	var _step =  DEATH_KNIGHT_STEP;
	var _speed = DEATH_KNIGHT_SPEED;
	var _count = count;
	var _damage = DEATH_KNIGHT_DMG;
	var _health = DEATH_KNIGHT_HEATH;
	var _movementSpeed = DEATH_KNIGHT_MOVEMENT_SPEED;
	var _taking_action = false;
	var _isDead = false

	this.getPositionX = function() {	
		return _positionX;
	}
	this.setPositionX = function(newPositionX) {
		_positionX = newPositionX;
	}
	this.getPositionY = function() {
		return _positionY;
	}
	this.getPositionBottom = function() {
		return _positionY + _height;
	}
	this.getPositionRight = function() {
		return _positionX + _width;
	}
	this.setPositionY = function(newPositionY) {
		_positionY = newPositionY;
	}

	this.getFolder = function() {
		return _folder;
	}
	this.getWidth = function() {
		return _width;
	}
	this.getHeight = function() {
		return _height;
	}
	this.getSpeed = function() {
		return _speed;
	}
	this.getSprite = function() {
		return _sprite;
	}
	this.setSprite = function(sprite) {
		_sprite = sprite;
	}
	this.getStep = function() {
		return _step;
	}
	this.setStep = function(step) {
		_step = step;
	}
	this.getSpeed = function() {
		return _speed;
	}
	this.setSpeed = function(speed) {
		_speed = speed;
	}
	this.getCount = function() {
		return _count;
	}
	this.setCount = function(count) {
		_count = count;
	}
	this.getDamage = function() {
		return _damage;
	}
	this.getHealth = function() {
		return _health;
	}
	this.setHealth = function(health) {
		_health = health;
	}
	this.getTakingAction = function() {
		return _taking_action;
	}
	this.setTakingAction = function(takingAction) {
		_taking_action = takingAction;
	}
	this.getMovementSpeed = function() {
		return _movementSpeed;
	}
	this.setIsDead = function(isDead) {
		_isDead = isDead;
	}
	this.getIsDead = function() {
		return _isDead;
	}
}
DeathKnight.prototype = Object.create(Unit.prototype);
DeathKnight.prototype.constructor = DeathKnight;
	
DeathKnight.prototype.draw = function (){

	var image = new Image();
	image.src = this.getSprite().src;
	this.getCtx().drawImage(image, DEATH_KNIGHT_SPRITE_X, DEATH_KNIGHT_SPRITE_Y, this.getWidth() ,this.getHeight(), this.getPositionX(), this.getPositionY(),this.getWidth(),this.getHeight());
	this.drawCount();
}
DeathKnight.prototype.move = function (toX, toY, atacking){
	debugger;
	var image = new Image();
	image.src = this.getSprite().src;
	var count = 0;
	var speed = this.getSpeed();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var ctx = this.getCtx();
	var step = this.getStep();
	var height = this.getHeight();
	var start = DEATH_KNIGHT_SPRITE_X;
	var this1 = this;
	this.setTakingAction(true);
	if(toY < 100 || Math.abs(positionX  - toX) + Math.abs(positionY  - toY) > this.getMovementSpeed()){
		return;
	}	
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT);
			if (positionX > toX - step && positionX < toX + step
					&& positionY > toY - step && positionY < toY + step) {
				ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT);
				ctx.drawImage(image, DEATH_KNIGHT_SPRITE_X, DEATH_KNIGHT_SPRITE_Y, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT, toX, toY, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT);
				this1.drawCount();
				clearInterval(myTimer);
				if(atacking){
					this1.fight();
					atacking.takeDamage(this1.getCount() * this1.getDamage());
				}
			return;
			}
			ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT);

			if (positionX > toX) {
				positionX -= speed;
			}
			if (positionX < toX) {
				positionX += speed;
			}
			if (positionY > toY) {
				positionY -= speed;
			} 
			if (positionY < toY) {
				positionY += speed;
			}
			
			ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT);
			ctx.drawImage(image, start, DEATH_KNIGHT_SPRITE_Y, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT, positionX, positionY, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT);
			if (start <= 80) {
				start = DEATH_KNIGHT_SPRITE_X;
			} else {
				start -= step;
			}
		}, 5000/speed);

		this.setPositionX(toX);
		this.setPositionY(toY);
}
DeathKnight.prototype.die = function (totalDmg){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var ctx = this.getCtx();
	var step = DEATH_KNIGHT_STEP_DIE;
	var start = DEATH_KNIGHT_SPRITE_X_DIE;
	this.setTakingAction(true);
	//alert(" Dark Champion took " +  totalDmg + " All champions we now die \n Say goodbye");
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH_DIE, DEATH_KNIGHT_HEIGHT_DIE);
			ctx.drawImage(image, start, DEATH_KNIGHT_SPRITE_Y_DIE, DEATH_KNIGHT_WIDTH_DIE, DEATH_KNIGHT_HEIGHT_DIE, positionX, positionY, DEATH_KNIGHT_WIDTH_DIE, DEATH_KNIGHT_HEIGHT_DIE);
			if (start <= 110) {
				ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH_DIE, DEATH_KNIGHT_HEIGHT_DIE);
				ctx.remove();
				return;
		} else {
				start -= step;
			}
		},  300);
}
DeathKnight.prototype.fight = function (){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var ctx = this.getCtx();
	var step = DEATH_KNIGHT_STEP_FIGHT;
	var start = DEATH_KNIGHT_SPRITE_X_FIGHT;
	var this1 = this;
	
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH_FIGHT, DEATH_KNIGHT_HEIGHT_FIGHT);
			ctx.drawImage(image, start, DEATH_KNIGHT_SPRITE_Y_FIGHT, DEATH_KNIGHT_WIDTH_FIGHT, DEATH_KNIGHT_HEIGHT_FIGHT, positionX, positionY, DEATH_KNIGHT_WIDTH_FIGHT, DEATH_KNIGHT_HEIGHT_FIGHT);
			if (start <= 797) {
				start = DEATH_KNIGHT_SPRITE_X_FIGHT;
				ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH_FIGHT, DEATH_KNIGHT_HEIGHT_FIGHT);
				ctx.drawImage(image, DEATH_KNIGHT_SPRITE_X, DEATH_KNIGHT_SPRITE_Y, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				//ctx.fillText(this1.getCount() ,this1.getPositionRight() - 50 ,this1.getPositionY() + this1.getHeight() /2);
				clearInterval(myTimer);
			} else {
				start -= step;
			}
		},  5000/50);
}

DeathKnight.prototype.beaten = function (totalDmg){
	debugger;
	var image = new Image();
	image.src = this.getSprite().src;
	var ctx = this.getCtx();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = DEATH_KNIGHT_STEP_BEATEN;
	var start = DEATH_KNIGHT_SPRITE_X_BEATEN;
	var this1 = this;
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH_BEATEN, DEATH_KNIGHT_HEIGHT_BEATEN);
			ctx.drawImage(image, start, DEATH_KNIGHT_SPRITE_Y_BEATEN , DEATH_KNIGHT_WIDTH_BEATEN, DEATH_KNIGHT_HEIGHT_BEATEN, positionX, positionY, DEATH_KNIGHT_WIDTH_BEATEN, DEATH_KNIGHT_HEIGHT_BEATEN);
			if (start <= 350) {
				start = DEATH_KNIGHT_SPRITE_X_BEATEN;
				ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH_BEATEN, DEATH_KNIGHT_HEIGHT_BEATEN);
				ctx.drawImage(image, DEATH_KNIGHT_SPRITE_X, DEATH_KNIGHT_SPRITE_Y, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				clearInterval(myTimer);
			} else {
				start -= step;
			}
			this1.drawCount();
		}, 200);
		
}

DeathKnight.prototype.takeDamage = function (totalDmg){
	var totalHealth = this.getHealth()  + DEATH_KNIGHT_HEATH * (this.getCount() -1);
	totalHealth -= totalDmg;	
	this.drawCount();
	this.drawScore(totalDmg);
	if(totalHealth > 0 ){
		this.getCtx().clearRect(this.getPositionX, this.getPositionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
		this.setCount(parseInt(totalHealth / DEATH_KNIGHT_HEATH));
		this.setHealth(parseInt(totalHealth % DEATH_KNIGHT_HEATH));
		this.beaten(totalDmg);
	}else{
		this.getCtx().clearRect(this.getPositionX, this.getPositionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
		this.die(totalDmg);
		this.setIsDead(true);
	}
	
}
DeathKnight.prototype.drawCount = function (){
	this.getCtx().font="20px Georgia";
	this.getCtx().fillStyle="#ccc";
	this.getCtx().fillText(this.getCount() ,this.getPositionRight() - 95,this.getPositionY() + this.getHeight() - 20);

}
DeathKnight.prototype.drawScore = function (totalDmg){
	var ctx = this.getCtx();
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("DeathKnight took : " +  totalDmg + "\n"+ " damage " + parseInt(totalDmg / DEATH_KNIGHT_HEATH) + "  DeathKnight died", 270, 50);
		var myTimer = window.setInterval(function() {
			clearInterval(myTimer);
			ctx.clearRect(0, 40, 800, 80);
		
	}, 2000);

}