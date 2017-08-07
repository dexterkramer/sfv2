var preload = function(game){}

preload.prototype = {
	preload: function(){ 
                this.game.load.json('casemap', 'assets/cases.json');
                this.game.load.image('squad', 'assets/squad.png');
                this.game.load.spritesheet('button', 'assets/nextButton.PNG', 125, 55);
                this.game.load.image('space', 'assets/deep-space.jpg');
                this.game.load.image('red-arrow', 'assets/red-arrow.png');
                this.game.load.image('card', 'assets/card.jpg');  
                this.game.load.image('captain', 'assets/captain.png');  
	},
        create: function(){
                this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
	},
        update : function()
        {

        }
}
