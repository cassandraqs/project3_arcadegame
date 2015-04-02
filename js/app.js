// Enemies our player must avoid
var xdir = 0;
    ydir = 0;
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.initial_x = x;
    this.initial_y = y;
    this.speed = speed;

}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    

    this.x += this.speed*dt;
    var overlap = !(((this.x + 81) <= player.x)||(this.x>= (player.x + 83)||((this.y+83) <= player.y)||(this.y >= player.y + 81)));
    
    if(overlap === true)  {
        //collision 
        console.log("Hit!");
        if(player.life > 1) {//player has 3 lives
            player.life -= 1;
            player.x = player.initial_x;//return player to her initial location
            player.y = player.initial_y;
        } else {
            console.log("GAME OVER!");//when player is hit 3 times, game over and return to player selection page
            reset();
        }
        
        
        
    } 
    if(this.x >= ctx.canvas.width) {//if bugs run out of canvas, they are set back to initial locations
        this.x = this.initial_x;
    }

    

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed) {
    this.sprite = "images/char-boy.png";//the default value of player.sprite is char-boy.png
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.initial_x = x;
    this.initial_y = y;
    this.life = 3;//player has three chances to be hit;
}

Player.prototype.ChangeSprite = function(new_sprite) {//player selection
    this.sprite = new_sprite;
}

Player.prototype.update = function() {
    //determine if there is overlap between player and bug
    if(((this.x+xdir*this.speed + 80) >= ctx.canvas.width)||((this.y + ydir*this.speed + 163)>=ctx.canvas.height)||((this.x + xdir*this.speed) <= 0)) {
        xdir = 0;
        ydir = 0;
        console.log("off canvas!");
    } else if((this.y )<= 75) {//when player reaches water, player wins
        xdir = 0;
        ydir = 0;
        console.log("you win!");
        
        
        this.x = this.initial_x;//set player to initial location
        this.y = this.initial_y;
    } else {

        this.x += xdir * this.speed; //now player speed equals 10
        this.y += ydir * this.speed;
        xdir = 0;//if there is no new key event, make sure the player doesnot move
        ydir = 0;
    }
        
    
    
    //determine if the player is off screen(if he is, reset the xdir or ydir) or if the player reaches water(then reset player location)


}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(keyEvent) {
    var direction = keyEvent;

    if (direction === 'left') { 
        xdir = -1;
    } else if (direction === 'right') { 
        xdir = 1;
    } else if (direction === 'up') {
        ydir = -1;
    } else if (direction === 'down') {
        ydir = 1;
    } 
    

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, ctx.canvas.height -200,10);
var allEnemies = [];
allEnemies.push(new Enemy(0,61,10));
allEnemies.push(new Enemy(0,151,25));
allEnemies.push(new Enemy(0,231,15));





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
