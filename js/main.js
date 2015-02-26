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
var enemy;
var player;
var attackContext;
var music;

function preload() {
game.load.spritesheet("Buttons", "assets/sprites/128X64Buttons.png", 128, 64);
game.load.audio('music', 'assets/sounds/pokemusic.ogg');

	


}
function spawnGui()
{
		music = game.add.audio('music', 1 , true);
		music.play('', 0, 1, true);
		button_a= game.add.sprite(40, 500, 'Buttons');
		button_a.frame=2;

		button_a.inputEnabled = true;
		button_b= game.add.sprite(200, 500, 'Buttons');
		button_b.frame=5;
		button_b.inputEnabled = true;

		
		button_a.events.onInputDown.add(listener, this);
		button_b.event.onInputDown.add(listener2, this);
}
function spawnPlayers(){

}
function updateHud()
{
	enemy.health--;
		hud.text= 'Interviewer HP: '+enemy.health;
		text.text='Player hp: '+player.hp;
}
function opAttack(op)
{
	att= Math.floor((Math.random() * 100)+ 1);
	switch(att){
		case 1:
			attackContext= 'Employer asks about your prior job experience.'
			
			break;
		case 2:
			attackContext= 'Employer uses awkward silence.'
			break;
		case 3:
			attackContext= 'Employer asks what you expect to paid.'
			break;
		case 4:
			attackContext= 'Employer tells you there are no casual fridays.'
			break;
		case 5:
			attackContext= 'Employer gives you a hypothetical question with no right answer.'
			break;
		case 6:
			attackContext='Employer cuts you off mid sentence.'
			break;
		default:
			attackContext= 'Employer uses awkward silence.'
			break;
		
	}
	
}
function listener(){
	player.attack(enemy);
	updateHud();
}
function listener2(){
	player.heal();
	updateHud();
}
function create() {

	game.stage.backgroundColor = '#FFCCFF';
	//spawnGui();
	//	player = new humanoid("player", "You", 100, 5, 3);
	//enemy = new humanoid("evil", "interviewer", 200, 8, 1 );
	//spawnPlayers();
	text =game.add.text(0, 200, "player hp: ");
	hud = game.add.text(0,20,'IntervieweR HP: '+100);

	




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
	
	humanoid.prototype.attack = function(humanoid) {
    humanoid.health-=this.attack;
};
	humanoid.prototype.heal = function() {
	if(heals>0)
	{
    this.health = 100;
	this.heals-=1;
	}
};
}






function render() {

    //game.debug.body(p);
    //game.debug.bodyInfo(p, 32, 320);

}


};