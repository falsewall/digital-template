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


var grabbed = 0;
var map;
var tileset;
var layer;
var p;
var cursors;
var touched=0;
var jump;
var jump2;
var jump3;
var coinNoise;
var music;
var heart;
var bmd;
var group;
var hud;
var emitter;

function preload() {
	game.load.tilemap('map', 'assets/tilesheets/industrial.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/tilesheets/Industrial-TileSheet.png');
	game.load.image('player', 'assets/sprites/phaser-dude.png');
	game.load.audio('dog1', 'assets/sounds/effects/jump_01.ogg');
	game.load.audio('dog2', 'assets/sounds/effects/jump_02.ogg');
	game.load.audio('dog3', 'assets/sounds/effects/jump_03.ogg');
	game.load.audio('coin', 'assets/sounds/effects/coin.ogg');
	game.load.audio('type1', 'assets/sounds/effects/type1.ogg');
	game.load.spritesheet('heart_beat', 'assets/sprites/heart_beat_32x32.png', 32, 32);
	game.load.spritesheet('panda', 'assets/sprites/Panda.png', 32, 32);
	game.load.image('pandicle', 'assets/sprites/pandaParticle.png');
}
	


}

function create() {

	jump = game.add.audio('dog1');
	jump2 = game.add.audio('dog2');
	jump3 = game.add.audio('dog3');
	coinNoise = game.add.audio('coin');
	music = game.add.audio('type1', 1 , true);
	music.play('', 0, 1, true);
	

	



	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = '#787878';
	
	map = game.add.tilemap('map');
	map.addTilesetImage('Industrial-TileSheet', 'tileset');
	map.setCollisionBetween(0, 2);// 104 66 99 24 10 0 1
	map.setCollisionBetween(104, 105);
	map.setCollisionBetween(66, 67);
	map.setCollisionBetween(99, 100);
	map.setCollisionBetween(24, 25);
	map.setCollisionBetween(10, 11);
	
	
	layer = map.createLayer('Tile Layer 1');
	layer.resizeWorld();
	//layer.debug = true;

	p= game.add.sprite(500, 500, 'panda');
	p.animations.add('stand', [0, 1], 10, true);
	p.animations.add('jump', [5, 6, 7], 10, true);
	p.animations.add('left', [25, 26, 27, 31, 32], 10, true);
    p.animations.add('right', [15, 16, 17, 20, 21], 10, true);

	
	game.physics.enable(p);

    game.physics.arcade.gravity.y = 500;

    p.body.bounce.y = 0.1;
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;

    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();
//////////////////////////////////////
	heartsetup();

	
	hud = game.add.text(0, 0, 'Hearts: '+grabbed);
    hud.fixedToCamera= true;
	
	//emitter = game.add.emitter(0, 0, 1000);
	//emitter.makeParticles('pandicle');
	//p.addChild(emitter);
	
	// emitter.lifespan = 500;
	//emitter.maxParticleSpeed = new Phaser.Point(-100,50);
	//emitter.minParticleSpeed = new Phaser.Point(-200,-50);



}

function heartsetup(){
	
	heart = game.add.sprite(90, 2500, 'heart_beat');
	heart.animations.add('beat');
	heart.play('beat', 5, true);
	
	    group = game.add.group();
		group.enableBody = true;
		group.physicsBodyType = Phaser.Physics.ARCADE;

    //  Add a bunch of sprites in random positions to the group
    for (var i = 0; i < 40; i++)
    {
        var c = group.create(game.world.randomX, game.world.randomY, 'heart_beat');
		c.name = 'heart' + i;
		c.body.immovable = true;
		//c.animations.add('beat');
		//c.play('beat', 5, true));
    }
	group.callAll('animations.add', 'animations', 'beatit',[0,1,2,3] , 5, true);
	group.callAll('play', null, 'beatit');
    

}
function collisionHandler (player, pickup) {
    //  If the player collides with the chillis then they get eaten :)
    //  The chilli frame ID is 17
	grabbed++;
	hud.setText( 'Hearts: '+grabbed);
	coinNoise.play();
    pickup.kill();
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

    //game.physics.arcade.collide(p, layer);
	game.physics.arcade.collide(p, group, collisionHandler, null, this);
    game.physics.arcade.collide(group, layer);
	doublecheck();//should deal with walljumping
	if (p.body.blocked.down)
	{
	    if(p.body.velocity.x < 0)
		{
			p.body.velocity.x+=50;
		}
		if(p.body.velocity.x > 0)
		{
			p.body.velocity.x-=50;
		}

	
	}
	else 
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
	if(p.body.velocity.x == 0)
	{
			p.animations.play('standing', 5, true);
	}

    if (cursors.up.isDown)
    {
        if (p.body.onFloor())
        {
			p.animations.play('jump', 10, true);
			jump.play();
            p.body.velocity.y = -500;
        }
    }

    if (cursors.left.isDown)
    {
        p.body.velocity.x = -500;
		p.animations.play('left', 10, true);
    }
    else if (cursors.right.isDown)
    {
		p.animations.play('right', 10, true);
        p.body.velocity.x = 500;
		//emitter.emitParticle();
    }
	

}

function render() {

    game.debug.body(p);
    game.debug.bodyInfo(p, 32, 320);

}


};