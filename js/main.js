var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('phaser1', 'assets/sprites/fighter3_64X128.png', 64, 128, 4);
	game.load.spritesheet('phaser2', 'assets/sprites/fighter2_64X128.png', 64, 128, 4);
	game.load.audio('miss', 'assets/sounds/effects/PunchQuick.ogg');
	game.load.audio('hit', 'assets/sounds/effects/Punch.ogg');
	game.load.image('background', 'assets/sprites/Backdrop.png');


}
var back;
var winnerText;
var player1;
var player2;
var cursors;
var leftKey1;
var rightKey1;
var leftKey2;
var rightKey2;
var qKey;
var ctrlKey;
var ATTACK_RANGE = 50;
var COOLDOWN=1000;
var WALKCYCLE=300;
var CLOSELIMIT=40;

var p1Cool = 0;
var p2Cool = 0;

var punchHit;
var punchMiss;
var won=0;


function create() {

back=game.add.tileSprite(0, 0, 800, 600, 'background');
    game.stage.backgroundColor = '#2d2d2d';
	player1= new Person(200, '1');
	player2= new Person(500, '2');
	leftKey1 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightKey1 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	leftKey2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	rightKey2 = game.input.keyboard.addKey(Phaser.Keyboard.D);
	qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	ctrlKey = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
	punchHit=game.add.audio('hit');
	punchMiss=game.add.audio('miss');
	winnerText= game.add.text(300, 300, '');
	
	


}
var Person = function (x, name) {
  this.HP=100;
  this.NAME=name;
  this.sprite= game.add.sprite(x, 450, ('phaser'+this.NAME));
  this.sprite.frame=0;
  this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.state=0;
  this.nameText= game.add.text(x-150, 20, 'Player '+this.NAME)
  this.healthText= game.add.text(x, 20, this.HP+'%')
  this.walkCool=0;
  this.punchAnimationCool=0;
};

function update() {
	if (won===0)
	{

		if(player1.HP<=0)
		{
			winnerText.text='Player 2 Wins!';
			player1.sprite.body.velocity.y=500;
			won=1;
		}
		if(player2.HP<=0)
		{
			winnerText.text='Player 1 Wins!';
			player2.sprite.body.velocity.y=500;
			won=1;
		}
		player1.sprite.body.velocity.x = 0;
		player2.sprite.body.velocity.x = 0;


		if (leftKey1.isDown)
		{
		   player1.sprite.body.velocity.x = -150;
		   walkCycle(player1);
		}
		if(noFarther())
		{
			if (rightKey1.isDown)
			{
			   player1.sprite.body.velocity.x= 150;
			   walkCycle(player1);
			}
			if (leftKey2.isDown)
			{
			   player2.sprite.body.velocity.x = -150;
			   walkCycle(player2);
			}
		}
		if (rightKey2.isDown)
		{
		   player2.sprite.body.velocity.x= 150;
		   walkCycle(player2);
		}
		if (qKey.isDown)
		{
			punch2();
		}
		if (ctrlKey.isDown)
		{
			punch1();
		}
		if((player2.sprite.body.velocity.x===0)&&(game.time.now>p2Cool-500))
			player2.sprite.frame=0;
		if((player1.sprite.body.velocity.x===0)&&(game.time.now>p1Cool-500))
			player1.sprite.frame=0;
	}
}
function walkCycle(guy)
{
	if (game.time.now > guy.walkCool)
	{
		if((guy.sprite.frame!==2))
			guy.sprite.frame=2;
		else
			guy.sprite.frame=1;
		guy.walkCool=game.time.now+WALKCYCLE;
	}
}
function punch1 () {

    if (game.time.now > p1Cool)
    {
		player1.sprite.frame=3;
		p1Cool=game.time.now+COOLDOWN;
        if(rangeCheck())
		{
			punchHit.play();
			player2.HP-=10;
			player2.healthText.text=player2.HP+'%'
		}
		else{punchMiss.play();}

    }
}

function punch2 () {

    if (game.time.now > p2Cool)
    {
		player2.sprite.frame=3;
		p2Cool=game.time.now+COOLDOWN;
        if(rangeCheck())
		{	
			player1.HP-=10;
			punchHit.play();
			player1.healthText.text=player1.HP+'%'
		}
		else{punchMiss.play();}
    }
	
}

function rangeCheck () {
	if((Math.abs(player1.sprite.body.x - player2.sprite.body.x)<ATTACK_RANGE)||(Math.abs(player2.sprite.body.x - player1.sprite.body.x)<ATTACK_RANGE))
		{return true;}
	return false;
}
function noFarther()
{//return false if players are too close.
	if((Math.abs(player1.sprite.body.x - player2.sprite.body.x)<CLOSELIMIT))
		return false;
	return true;
}

