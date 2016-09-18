const DEATH_KNIGHT_HEIGHT = 110;
const DEATH_KNIGHT_WIDTH = 100;
const POSITION_DEATH_KNIGHT_X = 1000;
const POSITION_DEATH_KNIGHT_Y = 400;
const DEATH_KNIGHT_SPRITE_X = 1165;
const DEATH_KNIGHT_SPRITE_Y = 190;
const DEATH_KNIGHT_SPEED = 30;
const DEATH_KNIGHT_STEP = 100;

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
const DEATH_KNIGHT_HEIGHT_BEATEN = 120;
const DEATH_KNIGHT_STEP_BEATEN = 99;

function DeathKnight (ctx) {
	Unit.call(this, ctx);
	var _height = DEATH_KNIGHT_HEIGHT;
	var _width = DEATH_KNIGHT_WIDTH;
	var _positionX = POSITION_DEATH_KNIGHT_X;
	var _positionY = POSITION_DEATH_KNIGHT_Y;
	var _sprite = SpriteLoader.onLoaded()[2];
	var _step =  DEATH_KNIGHT_STEP;
	var _speed = DEATH_KNIGHT_SPEED;
	

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

	
}
DeathKnight.prototype = Object.create(Unit.prototype);
DeathKnight.prototype.constructor = DeathKnight;
	
DeathKnight.prototype.draw = function (){
	debugger;
	var image = new Image();
	image.src = this.getSprite().src;
		debugger;
		this.getCtx().drawImage(image, DEATH_KNIGHT_SPRITE_X, DEATH_KNIGHT_SPRITE_Y, this.getWidth() ,this.getHeight(), this.getPositionX(), this.getPositionY(),this.getWidth(),this.getHeight());

}
DeathKnight.prototype.move = function (toX, toY, ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var count = 0;
	var speed = this.getSpeed();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = this.getStep();
	var height = this.getHeight();
	var start = DEATH_KNIGHT_SPRITE_X;
	if(toY < 100){
		return;
	}	
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT);
			if (positionX > toX - step && positionX < toX + step
					&& positionY > toY - step && positionY < toY + step) {
				ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT);
				ctx.drawImage(image, DEATH_KNIGHT_SPRITE_X, DEATH_KNIGHT_SPRITE_Y, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT, toX, toY, DEATH_KNIGHT_WIDTH, DEATH_KNIGHT_HEIGHT);
				clearInterval(myTimer);

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
DeathKnight.prototype.die = function (ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = DEATH_KNIGHT_STEP_DIE;
	var start = DEATH_KNIGHT_SPRITE_X_DIE;
	
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH_DIE, DEATH_KNIGHT_HEIGHT_DIE);
			ctx.drawImage(image, start, DEATH_KNIGHT_SPRITE_Y_DIE, DEATH_KNIGHT_WIDTH_DIE, DEATH_KNIGHT_HEIGHT_DIE, positionX, positionY, DEATH_KNIGHT_WIDTH_DIE, DEATH_KNIGHT_HEIGHT_DIE);
			if (start <= 110) {
				
				return;
		} else {
				start -= step;
			}
		},  500);
}
DeathKnight.prototype.fight = function (ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = DEATH_KNIGHT_STEP_FIGHT;
	var start = DEATH_KNIGHT_SPRITE_X_FIGHT;
	
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH_FIGHT, DEATH_KNIGHT_HEIGHT_FIGHT);
			ctx.drawImage(image, start, DEATH_KNIGHT_SPRITE_Y_FIGHT, DEATH_KNIGHT_WIDTH_FIGHT, DEATH_KNIGHT_HEIGHT_FIGHT, positionX, positionY, DEATH_KNIGHT_WIDTH_FIGHT, DEATH_KNIGHT_HEIGHT_FIGHT);
			if (start <= 797) {
				start = DEATH_KNIGHT_SPRITE_X_FIGHT;
			} else {
				start -= step;
			}
		},  5000/50);
}

DeathKnight.prototype.beaten = function (ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = DEATH_KNIGHT_STEP_BEATEN;
	var start = DEATH_KNIGHT_SPRITE_X_BEATEN;
	
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, DEATH_KNIGHT_WIDTH_BEATEN, DEATH_KNIGHT_HEIGHT_BEATEN);

		
			ctx.drawImage(image, start, DEATH_KNIGHT_SPRITE_Y_BEATEN, DEATH_KNIGHT_WIDTH_BEATEN, DEATH_KNIGHT_HEIGHT_BEATEN, positionX, positionY, DEATH_KNIGHT_WIDTH_BEATEN, DEATH_KNIGHT_HEIGHT_BEATEN);
			if (start <= 350) {
				start = DEATH_KNIGHT_SPRITE_X_BEATEN;
			} else {
				start -= step;
			}
		}, 500);
}