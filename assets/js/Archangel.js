const ARCHANGEL_HEIGHT = 115;
const ARCHANGEL_WIDTH = 127;
const POSITION_X = 80;
const POSITION_Y = 400;
const ARCHANGEL_SPRITE_X_START = 8;
const ARCHANGEL_SPRITE_Y_START = 19;
const ARCHANGEL_SPRITE_X = 2;
const ARCHANGEL_SPRITE_Y = 1140;
const ARCHANGEL_SPEED = 30;
const ARCHANGEL_STEP = 135;

const ARCHANGEL_MOVEMENT_SPEED = 500;

const ARCHANGEL_SPRITE_X_DIE = 50;
const ARCHANGEL_SPRITE_Y_DIE = 794;
const ARCHANGEL_WIDTH_DIE = 140;
const ARCHANGEL_HEIGHT_DIE = 144;
const ARCHANGEL_STEP_DIE = 143;

const ARCHANGEL_SPRITE_X_FIGHT = 444;
const ARCHANGEL_SPRITE_Y_FIGHT = 316;
const ARCHANGEL_WIDTH_FIGHT = 130;
const ARCHANGEL_HEIGHT_FIGHT = 130;
const ARCHANGEL_STEP_FIGHT = 135;

const ARCHANGEL_SPRITE_X_BEATEN = 50;
const ARCHANGEL_SPRITE_Y_BEATEN = 625;
const ARCHANGEL_WIDTH_BEATEN = 144;
const ARCHANGEL_HEIGHT_BEATEN = 180;
const ARCHANGEL_STEP_BEATEN = 145;

const ARCHANGEL_DMG = 60;
const ARCHANGEL_HEATH = 100;

function Archangel (ctx ,count) {
	Unit.call(this, ctx);
	var _height = ARCHANGEL_HEIGHT;
	var _width = ARCHANGEL_WIDTH;
	var _positionX = POSITION_X;
	var _positionY = POSITION_Y;
	var _sprite = SpriteLoader.onLoaded()[1];
	var _speed = ARCHANGEL_SPEED;
	var _step = ARCHANGEL_STEP;
	var _count = count;
	var _damage = ARCHANGEL_DMG;
	var _health = ARCHANGEL_HEATH;
	var _movementSpeed = ARCHANGEL_MOVEMENT_SPEED;
	var _taking_action = false;
	
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
}
Archangel.prototype = Object.create(Unit.prototype);
Archangel.prototype.constructor = Archangel;
	
Archangel.prototype.draw = function (){
	var image = new Image();
	image.src = this.getSprite().src;

		this.getCtx().drawImage(image, ARCHANGEL_SPRITE_X_START, ARCHANGEL_SPRITE_Y_START, this.getWidth() ,this.getHeight(), this.getPositionX(), this.getPositionY(),this.getWidth(),this.getHeight());
		this.getCtx().font="20px Georgia";
		this.getCtx().fillText(this.getCount() ,this.getPositionRight() - 50 ,this.getPositionY() + this.getHeight() /2);
}
Archangel.prototype.move = function (toX, toY, ctx , atacking){
	var image = new Image();
	image.src = this.getSprite().src;
	var count = 0;
	var speed = this.getSpeed();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = this.getStep();
	var height = this.getHeight();
	var start = ARCHANGEL_SPRITE_X;
	var this1 = this;
	this.setTakingAction(true);
	
	if(toY < 100 || Math.abs(positionX  - toX) + Math.abs(positionY  - toY) > this.getMovementSpeed()){
		return;
	}	
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT);
			if (positionX < toX + step && positionX > toX - step
					&& positionY < toY + step && positionY > toY - step) {
				this1.setTakingAction(false);
				var afterTimer = window.setInterval(function(){
					ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT);
					ctx.drawImage(image, ARCHANGEL_SPRITE_X_START, ARCHANGEL_SPRITE_Y_START, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT, toX, toY, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT);
					if(this1.getTakingAction()){
						clearInterval(afterTimer);
					}
				},  100);
				clearInterval(myTimer);
				if(atacking){
					this1.fight(ctx);
					atacking.takeDamage(ctx, this1.getCount() * this1.getDamage());
				}
			return;
			}
			ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT);

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
			
			
			ctx.drawImage(image, start, ARCHANGEL_SPRITE_Y, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT, positionX, positionY, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT);
			if (start >= 435) {
				start = ARCHANGEL_SPRITE_X;
			} else {
				start += step;
			}
		}, 5000/speed);
		this.setPositionX(toX);
		this.setPositionY(toY);
}
Archangel.prototype.die = function (ctx,totalDmg){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = ARCHANGEL_STEP_DIE;
	var start = ARCHANGEL_SPRITE_X_DIE;
	this.setTakingAction(true);
	alert(" Archangel took " +  totalDmg + " All archangel we now die \n Say goodbye");
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_DIE, ARCHANGEL_HEIGHT_DIE);
			ctx.drawImage(image, start, ARCHANGEL_SPRITE_Y_DIE, ARCHANGEL_WIDTH_DIE, ARCHANGEL_HEIGHT_DIE, positionX, positionY, ARCHANGEL_WIDTH_DIE, ARCHANGEL_HEIGHT_DIE);
			if (start >= 650) {
				
				return;
		} else {
				start += step;
			}
		},  500);
}

Archangel.prototype.fight = function (ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = ARCHANGEL_STEP_FIGHT;
	var start = ARCHANGEL_SPRITE_X_FIGHT;
	var this1 = this;
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_FIGHT, ARCHANGEL_HEIGHT_FIGHT);
		
			ctx.drawImage(image, start, ARCHANGEL_SPRITE_Y_FIGHT, ARCHANGEL_WIDTH_FIGHT, ARCHANGEL_HEIGHT_FIGHT, positionX, positionY, ARCHANGEL_WIDTH_FIGHT, ARCHANGEL_HEIGHT_FIGHT);
			if (start >= 700) {
				start = ARCHANGEL_SPRITE_X_FIGHT;
				ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_FIGHT, ARCHANGEL_HEIGHT_FIGHT);
				ctx.drawImage(image, ARCHANGEL_SPRITE_X_START, ARCHANGEL_SPRITE_Y_START, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				clearInterval(myTimer);
			} else {
				start += step;
			}
		}, 500);
		
}

Archangel.prototype.beaten = function (ctx,totalDmg){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = ARCHANGEL_STEP_BEATEN;
	var start = ARCHANGEL_SPRITE_X_BEATEN;
	var this1 = this;
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);

		
			ctx.drawImage(image, start, ARCHANGEL_SPRITE_Y_BEATEN, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN, positionX, positionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
			
			if (start >= 470) {
				start = ARCHANGEL_SPRITE_X_BEATEN;
				ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
				ctx.drawImage(image, ARCHANGEL_SPRITE_X, ARCHANGEL_SPRITE_Y, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				alert("Archangel took " +  totalDmg + "\n" + parseInt(totalDmg / CHAMPION1_HEATH) + "  archangel died");
				clearInterval(myTimer);
			} else {
				start += step;
			}
		}, 500);
}
Archangel.prototype.takeDamage = function (ctx ,totalDmg){
		var totalHealth = this.getHealth()  + ARCHANGEL_HEATH * (this.getCount() -1);
		totalHealth -= totalDmg;
		if(totalHealth > 0 ){
			this.setCount(parseInt(totalHealth / ARCHANGEL_HEATH));
			this.setHealth(parseInt(totalHealth % ARCHANGEL_HEATH));
			this.beaten(ctx , totalDmg);
			console.log(totalHealth);
		}else{
			this.die(ctx , totalDmg);
		}
	
}