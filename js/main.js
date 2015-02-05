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

var ball;
var tilesprite;
var cursors;

function preload() {

    game.load.image('starfield', 'assets/misc/starfield.jpg');
    game.load.image('ball', 'assets/sprites/pangball.png');

}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.gravity.y = 200;

    ball = game.add.sprite(400, 0, 'ball');
    tilesprite = game.add.tileSprite(300, 450, 200, 100, 'starfield');
	tilesprite = game.add.tileSprite(1, 1, 750, 600, 'starfield');
	tilesprite = game.add.tileSprite(600, 1, 200, 100, 'starfield');

    game.physics.enable([ ball, tilesprite ], Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    tilesprite.body.collideWorldBounds = true;
    tilesprite.body.immovable = true;
    tilesprite.body.allowGravity = false;

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    game.physics.arcade.collide(ball, tilesprite);

    if (cursors.left.isDown)
    {
        tilesprite.body.x -= 8;
        tilesprite.tilePosition.x -= 8;
    }
    else if (cursors.right.isDown)
    {
        tilesprite.body.x += 8;
        tilesprite.tilePosition.x += 8;
    }

    if (cursors.up.isDown)
    {
        tilesprite.tilePosition.y += 8;
    }
    else if (cursors.down.isDown)
    {
        tilesprite.tilePosition.y -= 8;
    }

}

function render() {

    // game.debug.body(tilesprite);

}
};
