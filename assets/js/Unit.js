/**
 * 
 */

function Unit () {
	if (this.constructor === Unit) {
		throw new Error('This class is abstract');
	}
	var ctx = document.querySelector('canvas').getContext('2d');
	var _smallHeight = 130;
	var _smallStep = 159;
	var _bigStep = 211;
	var _positionX = 0 ;
	var _positionY = 0;
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
}