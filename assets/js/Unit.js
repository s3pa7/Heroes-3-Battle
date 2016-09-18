/**
 * 
 */

function Unit (ctx) {
	if (this.constructor === Unit) {
		throw new Error('This class is abstract');
	}
	
	var _ctx = ctx;	
	
	this.getCtx = function() {
		return _ctx;
	}
	this.setCtx = function(ctx) {
		_ctx = ctx;
	}
	
}

Unit.prototype.draw = function (){
	
}

