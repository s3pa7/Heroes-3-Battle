/**
 * 
 */

var SpriteLoader = {
		map: {},
		notLoadedImages: 0,
		loadFunction: function() {
			
		},
		addSprite: function(name, src) {
			var img = new Image();
			img.src = src;
			this.map[name] = img;
			this.notLoadedImages++;
			var _this = this;
			img.onload = function() {
				_this.notLoadedImages--;
				if (!_this.notLoadedImages) {
					_this.loadFunction();					
				}
			}
		},
		getSprite: function(name) {
			return this.map[name];
		},
		onLoaded: function(fn) {
			this.loadFunction = fn;
		}
}

SpriteLoader.addSprite('champion', 'assets/images/champion.png');
//SpriteLoader.addSprite('deathknight', 'assets/images/death_knight.png');

SpriteLoader.onLoaded(function() {
	console.log('Al images loaded');
	var champion = SpriteLoader.getSprite('champion');
	var deathknight = SpriteLoader.getSprite('deathknight');
	
	console.log(champion);
})

