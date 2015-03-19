var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlas('breakout', 'assets/sprites/breakout.png', 'assets/sprites/breakout.json');
    game.load.image('cats', 'assets/cats.png');
	game.load.spritesheet('phone', 'assets/sprites/phone_244x134.png', 122, 134, 2);
	 game.load.audio('sfx', 'assets/sounds/effects/ringme.ogg');

}
var fx;
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
var phonesLeft=0;
var phoneList=[];
var ringing=false;
var timer;
var delay = 2000;
var won=0;

var s;

function create() {



	

	fx = game.add.audio('sfx');
	
	timer = game.time.now + delay;
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

        sprite.inputEnabled = true;

        sprite.input.useHandCursor = true;
		sprite.ringOn=false;
		sprite.online=true;
		phonesLeft+=1;

		sprite.animations.add('ring');///////////////
		phoneList[i]= sprite;





        sprite.events.onInputDown.add(destroySprite, this);
    }
//tryToRing();
}
	function destroySprite (sprite) {
	if(sprite.ringOn===true)
	{
		phonesLeft--;
		sprite.destroy();
		ringing=false;
	}
}
function tryToRing()//
{
	if(ringing===false)
	{
		ringing=true;
		fx.play();
		phoneList[phonesLeft-1].ringOn=true;
		phoneList[phonesLeft-1].animations.play('ring', 6, true);
		timer= game.time.now + delay;

	}
}
function update () {
	
if(won===0){
	if(timer<game.time.now)
	{
		if(ringing===true )
		{destroySprite(phoneList[phonesLeft-1]); ringing=false;    
			lives--;
			livesText.text = 'lives: ' + lives;
		}

		if (lives === 0)
		{
			gameOver();
		}
	
		tryToRing();
		
	}
	
	if (phonesLeft===0)
	{
		ringing=true;
		gameWon();
	}
}
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
	won=1;
	ball.body.velocity.setTo(0,0);
	introText.text = 'You found your phone!';
	introText.visible = true;
	
}

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

}