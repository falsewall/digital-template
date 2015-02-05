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
var layer;
var p;
var cursors;

function preload() {
	game.load.tilemap('map', 'assets/tilesheets/industrial.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/tilesheets/Industrial-TileSheet.png');
	game.load.image('player', 'assets/sprites/phaser-dude.png');


}

function create() {

	map = game.add.tilemap('map');
	map.addTilesetImage('tileset');
	layer = map.createLayer('Tile Layer 1');
	layer.resizeWorld();
	layer.debug = true;
	p= game.add.sprite(32, 32, 'player');
	map.setCollisionBetween(0, 59);
	
	game.physics.enable(p);

    game.physics.arcade.gravity.y = 250;

    p.body.bounce.y = 0.2;
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;

    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();



}

function update() {

    game.physics.arcade.collide(p, layer);

    p.body.velocity.x = 0;

    if (cursors.up.isDown)
    {
        if (p.body.onFloor())
        {
            p.body.velocity.y = -200;
        }
    }

    if (cursors.left.isDown)
    {
        p.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        p.body.velocity.x = 150;
    }

}

function render() {

    // game.debug.body(p);
    game.debug.bodyInfo(p, 32, 320);

}


};