/**
 * 
 */

function Units(positionX, positionY, ctx) {
	if (this.constructor === Units) {
		throw new Error('This class is abstract');
	}
	var ctx = ctx;
	var _speed = 15;
	var _smallHeight = 130;
	var _smallStep = 159;
	var _bigStep = 211;
	var _positionX = positionX;
	var _positionY = positionY;
	var _folder = 'assets/images/';

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
		return _positionY + _smallHeight;
	}
	this.getPositionRight = function() {
		return _positionX + _smallStep;
	}
	this.setPositionY = function(newPositionY) {
		_positionY = newPositionY;
	}

	this.getFolder = function() {
		return _folder;
	}
	this.getSmallStep = function() {
		return _smallStep;
	}
	this.getSmallHeight = function() {
		return _smallHeight;
	}
	this.getSpeed = function() {
		return _speed;
	}
	this.getBigStep = function() {
		return _bigStep;
	}

	this.move = function(toX, toY, ctx) {
		debugger;
		// var this = new Champion(40,440);
		var sprite = new Image();
		sprite.src = this.getSrc();
		var speed = this.getSpeed();
		var positionX = this.getPositionX();
		var positionY = this.getPositionY();
		var step = this.getSmallStep();
		var height = this.getSmallHeight();
		var start = 0;

		
		sprite.onload = function() {

			window.setInterval(function() {

				if (positionX > toX - speed && positionX < toX + speed
						&& positionY > toY - speed && positionY < toY + speed) {
					return;
				}
				debugger;
				ctx.clearRect(positionX, positionY, step, height);

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

				ctx.drawImage(sprite, start, 0, step, height, positionX,
						positionY, step, height);
				start += step;
				if (start > 948 - step) {
					start = 0;
				}
			}, 1000 / 20);

		}
		this.setPositionX(toX);
		this.setPositionY(toY);
	}

	this.stayOnPlace = function(ctx) {
		var sprite = new Image();
		sprite.src = this.getSrc();
		var step = this.getBigStep();
		var positionX = this.getPositionX();
		var positionY = this.getPositionY();
		var unit = this;
		var height = this.getSmallHeight();
		var image = new Image();
		var startStart = 932;
		var start = startStart;
		sprite.onload = function() {
			var positionX = unit.getPositionX();
			var positionY = unit.getPositionY();
			debugger;
			ctx.drawImage(sprite, start, 0, step, height, positionX, positionY,
					step, height);
			start += step;
			if (start > startStart + step) {
				start = startStart;
			}

		}

	}
}