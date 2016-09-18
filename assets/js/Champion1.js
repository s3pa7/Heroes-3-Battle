const CHAMPION1_HEIGHT = 110;
const CHAMPION1_WIDTH = 110;
const POSITION_CHAMPION1_X = 90;
const POSITION_CHAMPION1_Y = 200;
const CHAMPION1_SPRITE_X = 169;
const CHAMPION1_SPRITE_Y = 1260;
const CHAMPION1_SPEED = 30;
const CHAMPION1_STEP = 165;

const CHAMPION1_SPRITE_X_DIE = 150;
const CHAMPION1_SPRITE_Y_DIE = 628;
const CHAMPION1_WIDTH_DIE = 150;
const CHAMPION1_HEIGHT_DIE = 144;
const CHAMPION1_STEP_DIE = 150;

const CHAMPION1_SPRITE_X_FIGHT = 786;
const CHAMPION1_SPRITE_Y_FIGHT = 167;
const CHAMPION1_WIDTH_FIGHT = 190;
const CHAMPION1_HEIGHT_FIGHT = 130;
const CHAMPION1_STEP_FIGHT = 195;

const CHAMPION1_SPRITE_X_BEATEN = 150;
const CHAMPION1_SPRITE_Y_BEATEN = 628;
const CHAMPION1_WIDTH_BEATEN = 150;
const CHAMPION1_HEIGHT_BEATEN = 144;
const CHAMPION1_STEP_BEATEN = 150;

const CHAMPION1_DMG = 60;
const CHAMPION1_HEATH = 100;

function Champion1 (ctx , count) {
	Unit.call(this, ctx);
	var _height = CHAMPION1_HEIGHT;
	var _width = CHAMPION1_WIDTH;
	var _positionX = POSITION_CHAMPION1_X;
	var _positionY = POSITION_CHAMPION1_Y;
	var _sprite = SpriteLoader.onLoaded()[0];
	var _speed = CHAMPION1_SPEED;
	var _step = CHAMPION1_STEP;
	var _count = count;
	var _damage = CHAMPION1_DMG;
	var _health = CHAMPION1_HEATH;

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
	
}
Champion1.prototype = Object.create(Unit.prototype);
Champion1.prototype.constructor = Champion1;
	
Champion1.prototype.draw = function (){
	var image = new Image();
	image.src = this.getSprite().src;
		debugger;
		this.getCtx().drawImage(image, CHAMPION1_SPRITE_X, CHAMPION1_SPRITE_Y, this.getWidth() ,this.getHeight(), this.getPositionX(), this.getPositionY(),this.getWidth(),this.getHeight());

}
Champion1.prototype.move = function (toX, toY, ctx , atacking){
	var image =  this.getSprite();
	image.src = this.getSprite().src;
	var count = 0;
	var speed = this.getSpeed();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = this.getStep();
	var height = this.getHeight();
	var start = CHAMPION1_SPRITE_X;
	var this1 = this;
	if(toY < 100){
		return;
	}	
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH, CHAMPION1_HEIGHT);
			if (positionX < toX + speed && positionX > toX - speed
					&& positionY < toY + speed && positionY > toY - speed) {
				ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH, CHAMPION1_HEIGHT);
				ctx.drawImage(image, CHAMPION1_SPRITE_X, CHAMPION1_SPRITE_Y, CHAMPION1_WIDTH, CHAMPION1_HEIGHT, toX, toY, CHAMPION1_WIDTH, CHAMPION1_HEIGHT);
				clearInterval(myTimer);
				if(atacking){
					this1.fight(ctx);
					atacking.takeDamage(ctx, this1.getCount() * this1.getDamage());
				}
			return;
			}
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH, CHAMPION1_HEIGHT);

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
			
			
			ctx.drawImage(image, start, CHAMPION1_SPRITE_Y, CHAMPION1_WIDTH, CHAMPION1_HEIGHT, positionX, positionY, CHAMPION1_WIDTH, CHAMPION1_HEIGHT);
			if (start >= 900) {
				start = CHAMPION1_SPRITE_X;
			} else {
				start += step;
			}
		}, 5000/speed);
		this.setPositionX(toX);
		this.setPositionY(toY);
}

Champion1.prototype.die = function (ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = CHAMPION1_STEP_DIE;
	var start = CHAMPION1_SPRITE_X_DIE;
	
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_DIE, CHAMPION1_HEIGHT_DIE);
			ctx.drawImage(image, start, CHAMPION1_SPRITE_Y_DIE, CHAMPION1_WIDTH_DIE, CHAMPION1_HEIGHT_DIE, positionX, positionY, CHAMPION1_WIDTH_DIE, CHAMPION1_HEIGHT_DIE);
			if (start >= 750) {
				
				return;
		} else {
				start += step;
			}
		},  500);
}

Champion1.prototype.fight = function (ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = CHAMPION1_STEP_FIGHT;
	var start = CHAMPION1_SPRITE_X_FIGHT;
	var this1 = this;
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_FIGHT, CHAMPION1_HEIGHT_FIGHT);
		
			ctx.drawImage(image, start, CHAMPION1_SPRITE_Y_FIGHT, CHAMPION1_WIDTH_FIGHT, CHAMPION1_HEIGHT_FIGHT, positionX, positionY, CHAMPION1_WIDTH_FIGHT, CHAMPION1_HEIGHT_FIGHT);
			if (start >= 1370) {
				start = CHAMPION1_SPRITE_X_FIGHT;
				ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_FIGHT, CHAMPION1_HEIGHT_FIGHT);
				ctx.drawImage(image, CHAMPION1_SPRITE_X, CHAMPION1_SPRITE_Y, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				clearInterval(myTimer);
			} else {
				start += step;
			}
		}, 500);
}

Champion1.prototype.beaten = function (ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = CHAMPION1_STEP_BEATEN;
	var start = CHAMPION1_SPRITE_X_BEATEN;
	var this1 = this;
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_BEATEN, CHAMPION1_HEIGHT_BEATEN);

		
			ctx.drawImage(image, start, CHAMPION1_SPRITE_Y_BEATEN, CHAMPION1_WIDTH_BEATEN, CHAMPION1_HEIGHT_BEATEN, positionX, positionY, CHAMPION1_WIDTH_BEATEN, CHAMPION1_HEIGHT_BEATEN);
			if (start >= 445) {
				start = CHAMPION1_SPRITE_X_BEATEN;
				ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_BEATEN, CHAMPION1_HEIGHT_BEATEN);
				ctx.drawImage(image, CHAMPION1_SPRITE_X, CHAMPION1_SPRITE_Y, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				
				clearInterval(myTimer);
			} else {
				start += step;
			}
		}, 500);
}

Champion1.prototype.takeDamage = function (ctx ,totalDmg){
	var totalHealth = this.getHealth()  + CHAMPION1_HEATH * (this.getCount() -1);
	totalHealth -= totalDmg;
	if(totalHealth > 0 ){
		this.setCount(parseInt(totalHealth / CHAMPION1_HEATH));
		this.setHealth(parseInt(totalHealth % CHAMPION1_HEATH));
		this.beaten(ctx);
		console.log(totalHealth);
	}else{
		this.die(ctx);
	}
}