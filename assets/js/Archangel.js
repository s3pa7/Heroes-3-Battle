const ARCHANGEL_HEIGHT = 115;
const ARCHANGEL_WIDTH = 127;
const POSITION_X = 30;
const POSITION_Y = 400;
const ARCHANGEL_SPRITE_X_START = 8;
const ARCHANGEL_SPRITE_Y_START = 19;
const ARCHANGEL_SPRITE_X = 2;
const ARCHANGEL_SPRITE_Y = 1140;
const ARCHANGEL_SPEED = 50;
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

const ARCHANGEL_DMG = 40;
const ARCHANGEL_HEATH = 200;

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
Archangel.prototype = Object.create(Unit.prototype);
Archangel.prototype.constructor = Archangel;
	
Archangel.prototype.draw = function (){
	var image = new Image();
	image.src = this.getSprite().src;
	this.getCtx().drawImage(image, ARCHANGEL_SPRITE_X_START, ARCHANGEL_SPRITE_Y_START, this.getWidth() ,this.getHeight(), this.getPositionX(), this.getPositionY(),this.getWidth(),this.getHeight());
	this.drawCount();
}
Archangel.prototype.move = function (toX, toY, atacking){
	var image = new Image();
	image.src = this.getSprite().src;
	var speed = this.getSpeed();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = this.getStep();
	var height = this.getHeight();
	var start = ARCHANGEL_SPRITE_X;
	var ctx = this.getCtx();
	var this1 = this;
	this.setTakingAction(true);
	

	if(toY < 100 || Math.abs(positionX  - toX) + Math.abs(positionY  - toY) > this.getMovementSpeed()){
		return;
	}	
		var moveTimer = window.setInterval(function() {

			ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT);
			if (positionX < toX + step && positionX > toX - step
					&& positionY < toY + step && positionY > toY - step) {

					ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT);
					ctx.drawImage(image, ARCHANGEL_SPRITE_X_START, ARCHANGEL_SPRITE_Y_START, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT, toX, toY, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT);

					this1.drawCount();
					clearInterval(moveTimer);
				if(atacking){
					this1.fight();
					atacking.takeDamage(this1.getCount() * this1.getDamage());
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
			ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT);
			ctx.drawImage(image, start, ARCHANGEL_SPRITE_Y, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT, positionX, positionY, ARCHANGEL_WIDTH, ARCHANGEL_HEIGHT);
			if (start >= 435) {
				start = ARCHANGEL_SPRITE_X;
			} else {
				start += step;
			}
		}, 5000/speed);

		this1.setPositionX(toX);
		this1.setPositionY(toY);
}
Archangel.prototype.die = function (totalDmg){
	var image = new Image();
	image.src = this.getSprite().src;
	var ctx = this.getCtx();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = ARCHANGEL_STEP_DIE;
	var start = ARCHANGEL_SPRITE_X_DIE;
	this.setTakingAction(true);
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_DIE, ARCHANGEL_HEIGHT_DIE);
			ctx.drawImage(image, start, ARCHANGEL_SPRITE_Y_DIE, ARCHANGEL_WIDTH_DIE, ARCHANGEL_HEIGHT_DIE, positionX, positionY, ARCHANGEL_WIDTH_DIE, ARCHANGEL_HEIGHT_DIE);
			if (start >= 650) {
				ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_DIE, ARCHANGEL_HEIGHT_DIE);
				clearInterval(myTimer);
		} else {
				start += step;
			}
		},  200);
		ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_DIE, ARCHANGEL_HEIGHT_DIE);
		clearInterval(myTimer);
}

Archangel.prototype.fight = function (){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = ARCHANGEL_STEP_FIGHT;
	var start = ARCHANGEL_SPRITE_X_FIGHT;
	var ctx = this.getCtx();
	var this1 = this;
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_FIGHT, ARCHANGEL_HEIGHT_FIGHT);
		
			ctx.drawImage(image, start, ARCHANGEL_SPRITE_Y_FIGHT, ARCHANGEL_WIDTH_FIGHT, ARCHANGEL_HEIGHT_FIGHT, positionX, positionY, ARCHANGEL_WIDTH_FIGHT, ARCHANGEL_HEIGHT_FIGHT);
			if (start >= 700) {
				ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_FIGHT, ARCHANGEL_HEIGHT_FIGHT);
				this1.draw();
				this1.drawCount();
				clearInterval(myTimer);
				return;
			} else {
				start += step;
			}
		}, 200);
		
}

Archangel.prototype.beaten = function (totalDmg){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = ARCHANGEL_STEP_BEATEN;
	var start = ARCHANGEL_SPRITE_X_BEATEN;
	var ctx = this.getCtx();

	var this1 = this;
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
			ctx.drawImage(image, start, ARCHANGEL_SPRITE_Y_BEATEN, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN, positionX, positionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
			this1.drawCount();
			if (start >= 470) {
				start = ARCHANGEL_SPRITE_X_BEATEN;
				ctx.clearRect(positionX, positionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
				ctx.drawImage(image, ARCHANGEL_SPRITE_X, ARCHANGEL_SPRITE_Y, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				this1.drawCount();
				clearInterval(myTimer);
			} else {
				start += step;
			}
		}, 200);
}
Archangel.prototype.takeDamage = function (totalDmg){
		debugger
		var totalHealth = this.getHealth()  + ARCHANGEL_HEATH * (this.getCount() -1);
		totalHealth -= totalDmg;
		var ctx = this.getCtx();
		this.drawCount();
		this.drawScore(totalDmg);
		if(totalHealth > 0 ){
			this.getCtx().clearRect(this.getPositionX, this.getPositionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
			this.setCount(parseInt(totalHealth / ARCHANGEL_HEATH));
			this.setHealth(parseInt(totalHealth % ARCHANGEL_HEATH));
			this.beaten(ctx, totalDmg);

		}else{
			this.getCtx().clearRect(this.getPositionX, this.getPositionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
			this.die(totalDmg);
			this.setIsDead(true);
		}
	
}
Archangel.prototype.drawCount = function (){
	this.getCtx().font="20px Georgia";
	this.getCtx().fillStyle="#ccc";
	this.getCtx().fillText(this.getCount() ,this.getPositionX() +80, this.getPositionY() + this.getHeight());
}
Archangel.prototype.drawScore = function (totalDmg){
	var ctx = this.getCtx();
	ctx.clearRect(20, 20, 255, 50);
	var myTimer = window.setInterval(function() {
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Archangel took : " +  totalDmg + "\n"+ " damage " + parseInt(totalDmg / ARCHANGEL_HEATH) + "  archangel died", 255, 50);
	clearInterval(myTimer);
	//alert("Archangel took " +  totalDmg + "\n" + parseInt(totalDmg / CHAMPION1_HEATH) + "  archangel died");
	//ctx.clearRect(20, 20, 255, 50);
	}, 200);	
}