/**
 * 
 */

const VAMPIRE_HEIGHT = 130;
const VAMPIRE_WIDTH = 100;	
const POSITION_VAMPIRE_X = 1000;
const POSITION_VAMPIRE_Y = 200;
const VAMPIRE_SPRITE_X = 800;
const VAMPIRE_SPRITE_Y = 130;
const VAMPIRE_SPEED = 15;
const VAMPIRE_STEP = 100;

const VAMPIRE_SPRITE_X_DIE = 999;
const VAMPIRE_SPRITE_Y_DIE = 948;
const VAMPIRE_WIDTH_DIE = 90;
const VAMPIRE_HEIGHT_DIE = 120;
const VAMPIRE_STEP_DIE = 95;

const VAMPIRE_SPRITE_X_FIGHT = 605;
const VAMPIRE_SPRITE_Y_FIGHT = 400;
const VAMPIRE_WIDTH_FIGHT = 95;
const VAMPIRE_HEIGHT_FIGHT = 111;
const VAMPIRE_STEP_FIGHT = 90;


const VAMPIRE_SPRITE_X_BEATEN = 796;
const VAMPIRE_SPRITE_Y_BEATEN = 793;
const VAMPIRE_WIDTH_BEATEN = 90;
const VAMPIRE_HEIGHT_BEATEN = 135;
const VAMPIRE_STEP_BEATEN = 90;


const VAMPIRE_DMG = 60;
const VAMPIRE_HEATH = 100;

function Vampire (ctx , count) {
	Unit.call(this, ctx);
	var _height = VAMPIRE_HEIGHT;
	var _width = VAMPIRE_WIDTH;
	var _positionX = POSITION_VAMPIRE_X;
	var _positionY = POSITION_VAMPIRE_Y;
	var _sprite = SpriteLoader.onLoaded()[3];
	var _step =  VAMPIRE_STEP;
	var _speed = VAMPIRE_SPEED;
	var _count = count;
	var _damage = VAMPIRE_DMG;
	var _health = VAMPIRE_HEATH;
	
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
Vampire.prototype = Object.create(Unit.prototype);
Vampire.prototype.constructor = Vampire;
	
Vampire.prototype.draw = function (){
	debugger;
	var image = new Image();
	image.src = this.getSprite().src;
		debugger;
		this.getCtx().drawImage(image, VAMPIRE_SPRITE_X, VAMPIRE_SPRITE_Y, this.getWidth() ,this.getHeight(), this.getPositionX(), this.getPositionY(),this.getWidth(),this.getHeight());

}

Vampire.prototype.move = function (toX, toY, ctx ,atacking){
	var image = new Image();
	image.src = this.getSprite().src;
	var speed = this.getSpeed();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = this.getStep();
	var height = this.getHeight();
	var start = VAMPIRE_SPRITE_X;
	var this1 = this;
	if(toY < 100){
		return;
	}
	var interval = window.setInterval(function() {

			ctx.clearRect(positionX, positionY, step, height);
			if (positionX > toX - speed && positionX < toX + speed
					&& positionY > toY - speed && positionY < toY + speed) {
				ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH, VAMPIRE_HEIGHT);
				ctx.drawImage(image, VAMPIRE_SPRITE_X, VAMPIRE_SPRITE_Y, step, height, positionX,positionY, step, height);
				 clearInterval(interval);
				 if(atacking){
						this1.fight(ctx);
						atacking.takeDamage(ctx, this1.getCount() * this1.getDamage());
					}
				return;
			}
			debugger;
			//ctx.clearRect(positionX, positionY, step, height);

			if (positionX > toX) {
				positionX -= speed;
			} else if (positionX < toX) {
				positionX += speed;
			}
			if (positionY > toY) {
				positionY -= speed;
			} else if (positionY < toY) {
				positionY += speed;
			}
			//this.getCtx().drawImage(image, start, VAMPIRE_SPRITE_Y, this.getStep() ,this.getHeight(), positionX, positionY,this.getWidth(),this.getHeight());

			ctx.drawImage(image, start, VAMPIRE_SPRITE_Y, step, height, positionX,
					positionY, step, height);
			start -= step;
			debugger;
			if (start < toX - step) {
				start = VAMPIRE_SPRITE_X;
			}
		}, 500 / 20);
		this.setPositionX(toX);
		this.setPositionY(toY);
}
Vampire.prototype.die = function (ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = VAMPIRE_STEP_DIE;
	var start = VAMPIRE_SPRITE_X_DIE;
	
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH_DIE, VAMPIRE_HEIGHT_DIE);
			ctx.drawImage(image, start, VAMPIRE_SPRITE_Y_DIE, VAMPIRE_WIDTH_DIE, VAMPIRE_HEIGHT_DIE, positionX, positionY, VAMPIRE_WIDTH_DIE, VAMPIRE_HEIGHT_DIE);
			if (start <= 450) {
				
				return;
		} else {
				start -= step;
			}
		},  500);
}
Vampire.prototype.fight = function (ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = VAMPIRE_STEP_FIGHT;
	var start = VAMPIRE_SPRITE_X_FIGHT;
	var this1 = this;
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH_FIGHT, VAMPIRE_HEIGHT_FIGHT);
		
			ctx.drawImage(image, start, VAMPIRE_SPRITE_Y_FIGHT, VAMPIRE_WIDTH_FIGHT, VAMPIRE_HEIGHT_FIGHT, positionX, positionY, VAMPIRE_WIDTH_FIGHT, VAMPIRE_HEIGHT_FIGHT);
			if (start <= 430) {
				start = VAMPIRE_SPRITE_X_FIGHT;
				ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH_FIGHT, VAMPIRE_HEIGHT_FIGHT);
				ctx.drawImage(image, VAMPIRE_SPRITE_X, VAMPIRE_SPRITE_Y, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				clearInterval(myTimer);
			} else {
				start -= step;
			}
		}, 500);
		
}
Vampire.prototype.beaten = function (ctx){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = VAMPIRE_STEP_BEATEN;
	var start = VAMPIRE_SPRITE_X_BEATEN;
	var this1 = this;
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH_BEATEN, VAMPIRE_HEIGHT_BEATEN);

			ctx.drawImage(image, start, VAMPIRE_SPRITE_Y_BEATEN, VAMPIRE_WIDTH_BEATEN, VAMPIRE_HEIGHT_BEATEN, positionX, positionY, VAMPIRE_WIDTH_BEATEN, VAMPIRE_HEIGHT_BEATEN);
			if (start <= 540) {
				start = VAMPIRE_SPRITE_X_BEATEN;
				ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH_BEATEN, VAMPIRE_HEIGHT_BEATEN);
				ctx.drawImage(image, VAMPIRE_SPRITE_X, VAMPIRE_SPRITE_Y, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				
				clearInterval(myTimer);
			} else {
				start -= step;
			}
		}, 500);
}

Vampire.prototype.takeDamage = function (ctx ,totalDmg){
	var totalHealth = this.getHealth()  + VAMPIRE_HEATH * (this.getCount() -1);
	totalHealth -= totalDmg;
	if(totalHealth > 0 ){
		this.setCount(parseInt(totalHealth / VAMPIRE_HEATH));
		this.setHealth(parseInt(totalHealth % VAMPIRE_HEATH));
		this.beaten(ctx);
		console.log(totalHealth);
	}else{
		this.die(ctx);
	}
}