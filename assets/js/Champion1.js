const CHAMPION1_HEIGHT = 110;
const CHAMPION1_WIDTH = 110;
const POSITION_CHAMPION1_X = 30;
const POSITION_CHAMPION1_Y = 200;
const CHAMPION1_SPRITE_X = 169;
const CHAMPION1_SPRITE_Y = 1260;
const CHAMPION1_SPEED = 30;
const CHAMPION1_STEP = 165;

const CHAMPION1_MOVEMENT_SPEED = 400;

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

const CHAMPION1_DMG = 35;
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
	var _movementSpeed = CHAMPION1_MOVEMENT_SPEED;
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
Champion1.prototype = Object.create(Unit.prototype);
Champion1.prototype.constructor = Champion1;
	
Champion1.prototype.draw = function (){
	var image = new Image();
	image.src = this.getSprite().src;
	this.getCtx().drawImage(image, CHAMPION1_SPRITE_X, CHAMPION1_SPRITE_Y, this.getWidth() ,this.getHeight(), this.getPositionX(), this.getPositionY(),this.getWidth(),this.getHeight());
	this.drawCount();
}
Champion1.prototype.move = function (toX, toY, atacking){
	var image =  this.getSprite();
	image.src = this.getSprite().src;
	var count = 0;
	var speed = this.getSpeed();
	var ctx = this.getCtx();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = this.getStep();
	var height = this.getHeight();
	var start = CHAMPION1_SPRITE_X;
	var this1 = this;
	this.setTakingAction(true);
	if(toY < 100 || Math.abs(positionX  - toX) + Math.abs(positionY  - toY) > this.getMovementSpeed()){
		return;
	}	
		var moveTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH, CHAMPION1_HEIGHT);
			if (positionX < toX + speed && positionX > toX - speed
					&& positionY < toY + speed && positionY > toY - speed) {
					this1.setTakingAction(false);
					ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH, CHAMPION1_HEIGHT);
					ctx.drawImage(image, CHAMPION1_SPRITE_X, CHAMPION1_SPRITE_Y, CHAMPION1_WIDTH, CHAMPION1_HEIGHT, toX, toY, CHAMPION1_WIDTH, CHAMPION1_HEIGHT);
					this1.drawCount();
					clearInterval(moveTimer);
				if(atacking){
					this1.fight();
					atacking.takeDamage(this1.getCount() * this1.getDamage());
				}
			return;
			}
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH + 20, CHAMPION1_HEIGHT);

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
			
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH, CHAMPION1_HEIGHT);
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

Champion1.prototype.die = function (totalDmg){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var ctx = this.getCtx();
	var positionY = this.getPositionY();
	var step = CHAMPION1_STEP_DIE;
	var start = CHAMPION1_SPRITE_X_DIE;
	this.setTakingAction(true);
	//alert("Champion took " +  totalDmg + " All champions wi now die \n Say goodbye");
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_DIE, CHAMPION1_HEIGHT_DIE);
			ctx.drawImage(image, start, CHAMPION1_SPRITE_Y_DIE, CHAMPION1_WIDTH_DIE, CHAMPION1_HEIGHT_DIE, positionX, positionY, CHAMPION1_WIDTH_DIE, CHAMPION1_HEIGHT_DIE);
			if (start >= 750) {
				ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_DIE, CHAMPION1_HEIGHT_DIE);
				return;
		} else {
				start += step;
			}
		},  200);
}

Champion1.prototype.fight = function (){
	var image = new Image();
	image.src = this.getSprite().src;
	var ctx = this.getCtx();
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var step = CHAMPION1_STEP_FIGHT;
	var start = CHAMPION1_SPRITE_X_FIGHT;
	var this1 = this;
		var myTimer = window.setInterval(function() {
			
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_FIGHT, CHAMPION1_HEIGHT_FIGHT);
			ctx.drawImage(image, start, CHAMPION1_SPRITE_Y_FIGHT, CHAMPION1_WIDTH_FIGHT, CHAMPION1_HEIGHT_FIGHT, positionX, positionY, CHAMPION1_WIDTH_FIGHT, CHAMPION1_HEIGHT_FIGHT);
			this1.drawCount();

			if (start >= 1370) {
				start = CHAMPION1_SPRITE_X_FIGHT;
				ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_FIGHT, CHAMPION1_HEIGHT_FIGHT);
				ctx.drawImage(image, CHAMPION1_SPRITE_X, CHAMPION1_SPRITE_Y, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				this1.drawCount();
				clearInterval(myTimer);
			} else {
				start += step;
			}
		}, 200);
}

Champion1.prototype.beaten = function (totalDmg){
	var image = new Image();
	image.src = this.getSprite().src;
	var positionX = this.getPositionX();
	var positionY = this.getPositionY();
	var ctx = this.getCtx();
	var step = CHAMPION1_STEP_BEATEN;
	var start = CHAMPION1_SPRITE_X_BEATEN;
	var this1 = this;
		var myTimer = window.setInterval(function() {
			ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_BEATEN, CHAMPION1_HEIGHT_BEATEN);
			ctx.drawImage(image, start, CHAMPION1_SPRITE_Y_BEATEN, CHAMPION1_WIDTH_BEATEN, CHAMPION1_HEIGHT_BEATEN, positionX, positionY, CHAMPION1_WIDTH_BEATEN, CHAMPION1_HEIGHT_BEATEN);
			this1.drawCount();
			if (start >= 445) {
				start = CHAMPION1_SPRITE_X_BEATEN;
				ctx.clearRect(positionX, positionY, CHAMPION1_WIDTH_BEATEN, CHAMPION1_HEIGHT_BEATEN);
				ctx.drawImage(image, CHAMPION1_SPRITE_X, CHAMPION1_SPRITE_Y, this1.getWidth() ,this1.getHeight(), this1.getPositionX(), this1.getPositionY(),this1.getWidth(),this1.getHeight());
				this1.drawCount();
				//alert("Champion took " +  totalDmg + "\n" + parseInt(totalDmg / CHAMPION1_HEATH) + " champions died");
				clearInterval(myTimer);
			} else {
				start += step;
			}
		}, 200);
}
Champion1.prototype.takeDamage = function (totalDmg){
	var totalHealth = this.getHealth()  + CHAMPION1_HEATH * (this.getCount() -1);
	totalHealth -= totalDmg;
	var ctx = this.getCtx();
	this.drawCount();
	if(totalHealth > 0 ){
		this.getCtx().clearRect(this.getPositionX, this.getPositionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
		this.setCount(parseInt(totalHealth / CHAMPION1_HEATH));
		this.setHealth(parseInt(totalHealth % CHAMPION1_HEATH));
		this.beaten(totalDmg);
		console.log(totalHealth);
	}else{
		this.getCtx().clearRect(this.getPositionX, this.getPositionY, ARCHANGEL_WIDTH_BEATEN, ARCHANGEL_HEIGHT_BEATEN);
		this.die(totalDmg);
		this.setIsDead(true);
	}
}
Champion1.prototype.drawCount = function (){
	this.getCtx().font="20px Georgia";
	this.getCtx().fillStyle="#ccc";
	this.getCtx().fillText(this.getCount() ,this.getPositionRight() ,this.getPositionY() + this.getHeight());

}