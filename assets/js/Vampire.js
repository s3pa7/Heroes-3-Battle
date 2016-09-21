/**
 * 
 */

const VAMPIRE_HEIGHT = 130;
const VAMPIRE_WIDTH = 100;	
const POSITION_VAMPIRE_X = 850;
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

const VAMPIRE_MOVEMENT_SPEED = 200;

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


const VAMPIRE_DMG = 20;
const VAMPIRE_HEATH = 200;

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
	var _movementSpeed = VAMPIRE_MOVEMENT_SPEED;
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
Vampire.prototype = Object.create(Unit.prototype);
Vampire.prototype.constructor = Vampire;
	
Vampire.prototype.draw = function (){
	var image = new Image();
	image.src = this.getSprite().src;
	this.getCtx().drawImage(image, VAMPIRE_SPRITE_X, VAMPIRE_SPRITE_Y, this.getWidth() ,this.getHeight(), this.getPositionX(), this.getPositionY(),this.getWidth(),this.getHeight());
	this.drawCount();

}

Vampire.prototype.move = function (toX, toY, atacking){
	var image = new Image();
	image.src = this.getSprite().src;
	var ctx = this.getCtx();
	var speed = this.getSpeed();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = this.getStep();
	var height = this.getHeight();
	var start = VAMPIRE_SPRITE_X;
	var this1 = this;
	if(toY < 100 || Math.abs(positionX  - toX) + Math.abs(positionY  - toY) > this.getMovementSpeed()){
		return;
	}
	var moveTimer = window.setInterval(function() {

			ctx.clearRect(positionX, positionY, step, height);
			if (positionX > toX - speed && positionX < toX + speed
					&& positionY > toY - speed && positionY < toY + speed) {
				ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH, VAMPIRE_HEIGHT);
				ctx.drawImage(image, VAMPIRE_SPRITE_X, VAMPIRE_SPRITE_Y, step, height, positionX,positionY, step, height);
				this1.drawCount();
				clearInterval(moveTimer);
				if(atacking){
					this1.fight();
					atacking.takeDamage(this1.getCount() * this1.getDamage());
				}
				return;
			}
			ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH, VAMPIRE_HEIGHT);

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
			ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH, VAMPIRE_HEIGHT);
			ctx.drawImage(image, start, VAMPIRE_SPRITE_Y, step, height, positionX,
					positionY, step, height);
			start -= step;
			if (start < toX - step) {
				start = VAMPIRE_SPRITE_X;
			}
		}, 500 / 20);
		this1.setPositionX(toX);
		this1.setPositionY(toY);
}
Vampire.prototype.die = function (totalDmg){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var ctx = this.getCtx();
	var step = VAMPIRE_STEP_DIE;
	var start = VAMPIRE_SPRITE_X_DIE;
	this.setTakingAction(true);
	//alert(" Vampire took " +  totalDmg + " All vampire we now die \n Say goodbye");
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH_DIE, VAMPIRE_HEIGHT_DIE);
			ctx.drawImage(image, start, VAMPIRE_SPRITE_Y_DIE, VAMPIRE_WIDTH_DIE, VAMPIRE_HEIGHT_DIE, positionX, positionY, VAMPIRE_WIDTH_DIE, VAMPIRE_HEIGHT_DIE);
			if (start <= 450) {
				ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH_DIE, VAMPIRE_HEIGHT_DIE);
				return;
		} else {
				start -= step;
			}
		},  200);
}
Vampire.prototype.fight = function (){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var ctx = this.getCtx();
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
		}, 200);
		
}
Vampire.prototype.beaten = function (totalDmg){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = VAMPIRE_STEP_BEATEN;
	var start = VAMPIRE_SPRITE_X_BEATEN;
	var ctx = this.getCtx();
	var this1 = this;
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, VAMPIRE_WIDTH_BEATEN, VAMPIRE_HEIGHT_BEATEN);
			ctx.drawImage(image, start, VAMPIRE_SPRITE_Y_BEATEN, VAMPIRE_WIDTH_BEATEN, VAMPIRE_HEIGHT_BEATEN, positionX, positionY, VAMPIRE_WIDTH_BEATEN, VAMPIRE_HEIGHT_BEATEN);
			this1.drawCount();

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

Vampire.prototype.takeDamage = function (totalDmg){
	var totalHealth = this.getHealth()  + VAMPIRE_HEATH * (this.getCount() -1);
	totalHealth -= totalDmg;
	var ctx = this.getCtx();
	this.drawCount();
	this.drawScore(totalDmg);
	if(totalHealth > 0 ){
		this.getCtx().clearRect(this.getPositionX, this.getPositionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
		this.setCount(parseInt(totalHealth / VAMPIRE_HEATH));
		this.setHealth(parseInt(totalHealth % VAMPIRE_HEATH));
		this.beaten(totalDmg);
	}else{
		this.getCtx().clearRect(this.getPositionX, this.getPositionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
		this.die(totalDmg);
		this.setIsDead(true);
	}
}
Vampire.prototype.drawCount = function (){
	this.getCtx().font="20px Georgia";
	this.getCtx().fillStyle="#ccc";
	this.getCtx().fillText(this.getCount() ,this.getPositionRight() - 95,this.getPositionY() + this.getHeight() - 20);
}
Vampire.prototype.drawScore = function (totalDmg){
	var ctx = this.getCtx();
	ctx.clearRect(200, 40, 800, 80);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Vampire took : " +  totalDmg + "\n"+ " damage " + parseInt(totalDmg / ARCHANGEL_HEATH) + " Vampire died", 255, 50);
	var myTimer = window.setInterval(function() {
		clearInterval(myTimer);
		ctx.clearRect(0, 40, 800, 80);
	
	}, 2000);
}