window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });




function preload() {

	game.load.image('einstein', 'assets/phaser.png');
	


}

function create() {



	

	game.stage.backgroundColor = '#154632';
	
	game.add.sprite(0,0, einstein);
	







	
	hud = game.add.text(0, 0, 'Hearts remaining: ');

	




}
function humanoid(type, name, health, attack, heals)
{
	this.type=type;
	this.name=name;
	this.hp=health;
	this.attack=attack;
	this.heals= heals;
	
	humanoid.prototype.attack = function(humanoid) {
    return this.color + ' ' + this.type + ' apple';
};
};






function render() {

    //game.debug.body(p);
    //game.debug.bodyInfo(p, 32, 320);

}


};