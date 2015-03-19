<<<<<<< HEAD
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
=======
<<<<<<< HEAD
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
=======
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
var attackText;
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

	
>>>>>>> origin/gh-pages
>>>>>>> origin/gh-pages

    game.load.atlas('breakout', 'assets/sprites/breakout.png', 'assets/sprites/breakout.json');
    game.load.image('cats', 'assets/cats.png');
	game.load.spritesheet('phone', 'assets/sprites/phone_244x134.png', 122, 134, 2);

<<<<<<< HEAD
}

var ball;
var paddle;
var bricks;

var ballOnPaddle = true;

var lives = 3;
var score = 0;

var scoreText;
var livesText;
var introText;
var phone;
var phonesLeft;
var phoneList;
var timer;

var s;

function create() {



	

	
	timer = game.time.now + 100;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false;

    s = game.add.tileSprite(0, 0, 800, 600, 'cats');

    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;

    var brick;

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 15; x++)
        {
            brick = bricks.create(120 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y+1) + '_1.png');
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        }
    }

    paddle = game.add.sprite(game.world.centerX, 500, 'breakout', 'paddle_big.png');
    paddle.anchor.setTo(0.5, 0.5);

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

    ball = game.add.sprite(game.world.centerX, paddle.y - 16, 'breakout', 'ball_1.png');
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

    ball.events.onOutOfBounds.add(ballLost, this);

    scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    game.input.onDown.add(releaseBall, this);

	   var mx = game.width - 122;
    var my = game.height - 133;

    for (var i = 0; i < 5; i++)
    {
        var sprite = game.add.sprite(game.rnd.integerInRange(0, mx), game.rnd.integerInRange(0, my), 'phone');
<<<<<<< HEAD

        sprite.inputEnabled = true;

        sprite.input.useHandCursor = true;
		sprite.ringing=false;
		sprite.online=true;
		phonesLeft++;
		sprite.animations.add('ring');///////////////
		sprite.animations.play('ring', 6, true);
		if(i===3){		sprite.animations.stop(null,true);}




=======

        sprite.inputEnabled = true;

        sprite.input.useHandCursor = true;
		sprite.ringing=false;
		sprite.online=true;
		phonesLeft++;
		sprite.animations.add('ring');///////////////
		sprite.animations.play('ring', 6, true);
		if(i===3){		sprite.animations.stop(null,true);}




>>>>>>> origin/gh-pages
        sprite.events.onInputDown.add(destroySprite, this);
    }
}
	function destroySprite (sprite) {
	if(sprite.ringing===true)
<<<<<<< HEAD
	{
		phonesLeft--;
		sprite.destroy();
	}
}
function tryToRing()
{
	
}
function update () {

    //  Fun, but a little sea-sick inducing :) Uncomment if you like!
    // s.tilePosition.x += (game.input.speed.x / 2);

    paddle.x = game.input.x;

    if (paddle.x < 24)
    {
        paddle.x = 24;
    }
    else if (paddle.x > game.width - 24)
    {
        paddle.x = game.width - 24;
    }

    if (ballOnPaddle)
    {
        ball.body.x = paddle.x;
    }
    else
    {
        game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
        game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
    }

}

function releaseBall () {

    if (ballOnPaddle)
    {
        ballOnPaddle = false;
        ball.body.velocity.y = -300;
        ball.body.velocity.x = -75;
        ball.animations.play('spin');
        introText.visible = false;
    }

}

function ballLost () {

    lives--;
    livesText.text = 'lives: ' + lives;

    if (lives === 0)
    {
        gameOver();
    }
    else
    {
        ballOnPaddle = true;

        ball.reset(paddle.body.x + 16, paddle.y - 16);
        
        ball.animations.stop();
    }

}

function gameOver () {

    ball.body.velocity.setTo(0, 0);
    
    introText.text = 'Game Over!';
    introText.visible = true;

}
function gameWon (){
	ball.body.velocity.setTo(0,0);
	introText.text = 'You found your phone!';
	introText.visable = true;
	
}

=======
	{
		phonesLeft--;
		sprite.destroy();
	}
}
function tryToRing()
{
	
}
function update () {
=======
};


function updateHud()
{
	opAttack(enemy);
	opAttack(player);
		hud.text= 'cloud HP: '+enemy.hp;
		text.text='Player HP: '+player.hp;
		if(enemy.hp<0)
		{hud.text = 'Cloud HP: 0';}
		if(player.hp<0)
		{text.text = 'Player HP: 0';}
};
function opAttack(op)
{
	var att= Math.floor((Math.random() * 10)+ 1);
	op.hp=op.hp-att;
	if(op.type==='evil')
	{
	switch(att){
		case 1:
			attackContext= 'The cloud fires a precision hail strike on your head'
			break;
		case 2:
			attackContext= 'The cloud undulates menacingly with spikes of cloud. A carp walks out of the lake and punches you bruising the skin under through your polo shirt. '
			break;
		case 3:
			attackContext= 'The cloud drops a raindrop in your eye.'
			break;
		case 4:
			attackContext= 'The cloud uses tackle'
			break;

		default:
			attackContext= 'The cloud says some pun about "The calm before the storm". It hurts to listen to.'		
	}
	}
};
function listener(){
	//player.attack();
	updateHud();

};
function listener2(){
	player.heal();
	updateHud();
};
function create() {

	game.stage.backgroundColor = '#E31C2F';
	
	player = new humanoid("player", "You", 100, 5, 3);
	enemy = new humanoid("evil", "cloud", 200, 8, 1 );
	text =game.add.text(0, 200, "Player HP: "+player.hp);
	hud = game.add.text(0,20,'Cloud HP: '+enemy.hp);
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
	




};
function update(){

};
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
};
>>>>>>> origin/gh-pages

    //  Fun, but a little sea-sick inducing :) Uncomment if you like!
    // s.tilePosition.x += (game.input.speed.x / 2);

<<<<<<< HEAD
    paddle.x = game.input.x;

    if (paddle.x < 24)
    {
        paddle.x = 24;
    }
    else if (paddle.x > game.width - 24)
    {
        paddle.x = game.width - 24;
    }

    if (ballOnPaddle)
    {
        ball.body.x = paddle.x;
    }
    else
    {
        game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
        game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
    }

}
=======
>>>>>>> origin/gh-pages

function releaseBall () {

<<<<<<< HEAD
    if (ballOnPaddle)
    {
        ballOnPaddle = false;
        ball.body.velocity.y = -300;
        ball.body.velocity.x = -75;
        ball.animations.play('spin');
        introText.visible = false;
    }

}

function ballLost () {

    lives--;
    livesText.text = 'lives: ' + lives;

    if (lives === 0)
    {
        gameOver();
    }
    else
    {
        ballOnPaddle = true;

        ball.reset(paddle.body.x + 16, paddle.y - 16);
        
        ball.animations.stop();
    }

}
=======

>>>>>>> origin/gh-pages

function gameOver () {

    ball.body.velocity.setTo(0, 0);
    
    introText.text = 'Game Over!';
    introText.visible = true;

}
function gameWon (){
	ball.body.velocity.setTo(0,0);
	introText.text = 'You found your phone!';
	introText.visable = true;
	
}

>>>>>>> origin/gh-pages
function ballHitBrick (_ball, _brick) {

    _brick.kill();

    score += 10;

    scoreText.text = 'score: ' + score;

    //  Are they any bricks left?
    if (bricks.countLiving() == 0)
    {
        //  New level starts
        score += 1000;
        scoreText.text = 'score: ' + score;
        introText.text = '- Next Level -';

        //  Let's move the ball back to the paddle
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;
        ball.animations.stop();

        //  And bring the bricks back from the dead :)
        bricks.callAll('revive');
    }

}

function ballHitPaddle (_ball, _paddle) {

    var diff = 0;

    if (_ball.x < _paddle.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = _paddle.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    else if (_ball.x > _paddle.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = _ball.x -_paddle.x;
        _ball.body.velocity.x = (10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }

<<<<<<< HEAD
}
=======
}
>>>>>>> origin/gh-pages
