/**
 * 
 */

function Champion (positionX,positionY,ctx) {
	Units.call(this, positionX,positionY ,ctx);
	
	Champion.prototype = Object.create(Units.prototype);
	Champion.prototype.constructor = Champion;
	
	var _health = 120;
	var _damage = 110;
	var _movement =  10;
	var _src = "champion.png";
	this.getHealth = function(){
		return  _health;
	}
	this.setHealth = function (newHealth) {
		_health  = newHealth;
	}
	this.getDamage = function(){
		return  _damage;
	}
	this.setDamage = function (newDamage) {
		_damage  = newDamage;
	}
	this.getMovement = function(){
		return  _movement;
	}
	this.setMovement = function (newMovement) {
		_movement  = newMovement;
	}
	this.getSrc = function(){
		return  this.getFolder() + _src;
	}
}

