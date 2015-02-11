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



var map;
var tileset;
var layer;
var p;
var cursors;
var touched=0;
var jump;
var jump2;
var jump3;


function preload() {
	game.load.tilemap('map', 'assets/tilesheets/industrial.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/tilesheets/Industrial-TileSheet.png');
	game.load.image('player', 'assets/sprites/phaser-dude.png');
	game.load.audio('dog1', 'assets/sounds/effects/jump_01.ogg');
	game.load.audio('dog2', 'assets/sounds/effects/jump_02.ogg');
	game.load.audio('dog3', 'assets/sounds/effects/jump_03.ogg');
	game.load.spritesheet('dog', 'assets/sprites/dog.png', 80, 50);



}

function create() {

	jump = game.add.audio('dog1');
	jump2 = game.add.audio('dog2');
	jump3 = game.add.audio('dog3');

	
	
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = '#787878';
	
	map = game.add.tilemap('map');
	map.addTilesetImage('Industrial-TileSheet', 'tileset');
	map.setCollisionBetween(90, 119);
	
	layer = map.createLayer('Tile Layer 1');
	layer.resizeWorld();
	//layer.debug = true;
	p= game.add.sprite(90, 2500, 'dog');
	//p.animations.add('walk');p.animations.play('walk', 20, true);
	
	game.physics.enable(p);

    game.physics.arcade.gravity.y = 500;

    p.body.bounce.y = 0.1;
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;

    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();



}
function doublecheck(){//run every time player hits a wall. sets touched and leaves it till another wall is hit or ground is landed
game.physics.arcade.collide(p, layer);
   if (cursors.up.isDown && !p.body.blocked.down ) {
	   
		if (cursors.left.isDown && p.body.blocked.left && touched > -1 ) {
			jump2.play();
			p.body.velocity.x = 500;
			p.body.velocity.y = -500;
		}
		if (cursors.right.isDown && p.body.blocked.right && touched < 1) {
			jump3.play();
			p.body.velocity.x = -500;
			p.body.velocity.y = -500;
		}
	   
	   	if (touched > -1) //right touched or nothing touched
		{
			if(p.body.blocked.left)
			{
				touched=-1;//just hit left wall
			}
		}
		if(touched < 1)//left touched
		{
			if(p.body.blocked.right)
			{
				touched=1;//just hit right wall
			}
		}
	
    }
	if(p.body.blocked.down)
	{
		touched=0;//reset touched on landing
	}


}

function update() {

    game.physics.arcade.collide(p, layer);
	doublecheck();//should deal with walljumping
	if (p.body.blocked.down)
	{
	    if(p.body.velocity.x < 0)
		{
			p.body.velocity.x+=10;
		}
		if(p.body.velocity.x > 0)
		{
			p.body.velocity.x-=10;
		}

	
	}


    if (cursors.up.isDown)
    {
        if (p.body.onFloor())
        {
			jump.play();
            p.body.velocity.y = -500;
        }
    }

    if (cursors.left.isDown)
    {
        p.body.velocity.x = -500;
    }
    else if (cursors.right.isDown)
    {
        p.body.velocity.x = 500;
    }

}

function render() {

    //game.debug.body(p);
    //game.debug.bodyInfo(p, 32, 320);

}


};