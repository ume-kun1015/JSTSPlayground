phina.globalize();

var SCREEN_WIDTH    = 640;
var SCREEN_HEIGHT   = 960;
var PIECE_SIZE      = 80;
var PIECE_SIZE_HALF = PIECE_SIZE / 2;

phina.define("MainScene", {
	superClass: 'DisplayScene',

	init: function(){
		this.superInit({
			width:  SCREEN_WIDTH,
			height: SCREEN_HEIGHT
		});

		this.fromJSON({
			children: {
				wordGroup: {
					className: 'DisplayElement'
				},
				scoreLabel: {
					className: 'Label',
					x: this.gridX.span(15),
					y: this.gridX.span(1),
					align: 'right'
				}
			}
		});

		this.score = 0;
		this.scoreLabel.text = this.score + '';
	},

	update: function(app){
		if(app.frame % 16 === 0){
			this.createWord();
		}
	},

	createWord: function(){
		var ascii = [
			48, 49,
		 	50, 51, 52, 53, 54, 55, 56, 57,
			65, 66, 67, 68, 69, 
			70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 
			80, 81, 82, 83, 84, 85, 86, 87, 88, 89
		];

		var character = String.fromCharCode(ascii.pickup());
		var word = Word(character).addChildTo(this.wordGroup);
		word.x = Math.randint(PIECE_SIZE_HALF, this.gridX.width - PIECE_SIZE_HALF);
		word.y = -100;

		return word;
	}
});

phina.define('Word', {
	superClass: 'Button',

	init: function(word){
		this.superInit({
			width:  PIECE_SIZE,
			height: PIECE_SIZE,
			text:   word
		});

		this.enable = true;
	},

	update: function(){
		this.y += 8;
	}
});

phina.main(function() {
	var app = GameApp({
		title: 'Typing Game',
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		startLabel: location.search.substr(1).toObject().scene || 'title',
	});

	app.run();
});