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
var hud;
var text;
var counter=100;
var button_a;
var button_b;
var enemy;
var player;
var attackContext;
var music;

function preload() {
game.load.spritesheet("Buttons", "assets/sprites/128X64Buttons.png", 128, 64);
game.load.audio('music', 'assets/sounds/pokemusic.ogg');

	


}


function updateHud()
{
	enemy.hp--;
		hud.text= 'Interviewer HP: '+enemy.hp;
		text.text='Player hp: '+player.hp;
}
function opAttack(op)
{
	att= Math.floor((Math.random() * 100)+ 1);
	player.hp-=att;
	switch(att){
		case 1:
			attackContext= 'The cloud fires a precision hail strike on your head'
			
			break;
		case 2:
			attackContext= 'The cloud undulates menacingly with spikes of cloud. A carp walks on land and attacks you from behind. '
			break;
		case 3:
			attackContext= 'The cloud drops a raindrop in your eye.'
			break;
		case 4:
			attackContext= 'The cloud uses tackle'
			break;

		default:
			attackContext= 'The cloud says some pun about "The calm before the storm". It hurts to listen to.'
			break;
		
	}
	
}
function listener(){
	text.text='dmu';
	//player.attack();
	text.text='ferp';
	updateHud();
	text.text='berp';
}
function listener2(){
	player.heal();
	updateHud();
}
function create() {

	game.stage.backgroundColor = '#FFCCFF';
	
	player = new humanoid("player", "You", 100, 5, 3);
	enemy = new humanoid("evil", "interviewer", 200, 8, 1 );
	text =game.add.text(0, 200, "player hp: "+player.hp);
	hud = game.add.text(0,20,'IntervieweR HP: '+100);
//spawngui
			music = game.add.audio('music', 1 , true);
		music.play('', 0, 1, true);
		button_a= game.add.sprite(40, 500, 'Buttons');
		button_a.frame=2;
		button_a.inputEnabled = true;
		button_b= game.add.sprite(200, 500, 'Buttons');
		button_b.frame=5;
		button_b.inputEnabled = true;
		button_a.events.onInputDown.add(listener, this);
		button_b.events.onInputDown.add(listener2, this);

		//button_b.event.onInputDown.add(listener2, this);
	




}
function update(){

}
function humanoid(type, name, health, attack, heals)
{
	this.type=type;
	this.name=name;
	this.hp=health;
	this.attack=attack;
	this.heals= heals;
	
	humanoid.prototype.attack = function() {
    this.health-=2;
};
	humanoid.prototype.heal = function() {
	if(heals>0)
	{
    this.hp = 100;
	this.heals-=1;
	}
};
}






function render() {

    //game.debug.body(p);
    //game.debug.bodyInfo(p, 32, 320);

}


};