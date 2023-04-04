//global var
var interval = 0;
var score = 0;
var RECT_W = 45; // Width
var RECT_H = 30; // Height
var snake_color = "#0520A5"//color
function play_game(){
    const resumebtn = document.getElementById('resumebtn');
    resumebtn.disabled = true;

    var level = 160; // Game level, by decreasing will speed up
    //var rect_w = 45; // Width
    //var rect_h = 30; // Height
    var inc_score = 50; // Score
    //var snake_color = "#0520A5"; // Snake Color
    var ctx; // Canvas attributes
    var tn = []; // temp directions storage
    var x_dir = [-1, 0, 1, 0]; // position adjusments
    var y_dir = [0, -1, 0, 1]; // position adjusments
    var queue = [];
    var frog = 1; // default food
    var map = [];
    var MR = Math.random;
    var X = 5 + (MR() * (RECT_W - 10))|0; // Calculate positions
    var Y = 5 + (MR() * (RECT_H - 10))|0; // Calculate positions
    var direction = MR() * 3 | 0;
    //var interval = 0;
    //var score = 0;
    var sum = 0, easy = 0;
    var i, dir;

// getting play area 
var c = document.getElementById('playArea');
ctx = c.getContext('2d');

// Map positions
for (i = 0; i < RECT_W; i++)
{
map[i] = [];
}

// random placement of snake food
function random_snake()
{
var x, y;
do
{
x = MR() * RECT_W|0;
y = MR() * RECT_H|0;
}
while (map[x][y]);
map[x][y] = 1;
ctx.fillStyle = snake_color;
ctx.strokeRect(x * 10+1, y * 10+1, 8, 8);
}

// Default somewhere placement
random_snake();
function set_game_speed()
{
if (easy)
{
X = (X+RECT_W)%RECT_W;
Y = (Y+RECT_H)%RECT_H;
}
--inc_score;
if (tn.length)
{
dir = tn.pop();
if ((dir % 2) !== (direction % 2))
{
direction = dir;
}
}
if ((easy || (0 <= X && 0 <= Y && X < RECT_W && Y < RECT_H)) && 2 !== map[X][Y])
{
if (1 === map[X][Y])
{
score+= Math.max(5, inc_score);
inc_score = 50;
random_snake();
frog++;
}

//ctx.fillStyle("#ffffff");
ctx.fillRect(X * 10, Y * 10, 9, 9);
map[X][Y] = 2;
queue.unshift([X, Y]);
X+= x_dir[direction];
Y+= y_dir[direction];
if (frog < queue.length)
{
dir = queue.pop()
map[dir[0]][dir[1]] = 0;
ctx.clearRect(dir[0] * 10, dir[1] * 10, 10, 10);
}
}
else if (!tn.length){
    var show_score = document.getElementById("show");
    show_score.innerHTML = "You lost!<br /> <u>Your Score:</u> <b>"+score+"</b><br><br> Want to try again?<br><br><input type='button' value='Play Again' onclick='window.location.reload();' />";
    document.getElementById("playArea").style.display = 'none';
    window.clearInterval(interval);
    // Run the checkHighScore function with the score variable.
    checkHighScore(score);
}
}
interval = window.setInterval(set_game_speed, level);
document.onkeydown = function(e) {
var code = e.keyCode - 37;
if (0 <= code && code < 4 && code !== tn[0])
{
tn.unshift(code);
}
else if (-5 == code)
{
if (interval)
{
window.clearInterval(interval);
interval = 0;
}
else
{
interval = window.setInterval(set_game_speed, 60);
}
}
else
{
dir = sum + code;
if (dir == 44||dir==94||dir==126||dir==171) {
sum+= code
} else if (dir === 218) easy = 1;
}
}
    //Create the maximum number of high scores.
    const maxHighScores = 4;
    
    //Call the showHighScores function
    showHighScores();

    //Shows the High scores within the HTML file
    function showHighScores() {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const highScoreList = document.getElementById('highScores');
  
        //Write the names and scores of players within the HTML file in a list format
        highScoreList.innerHTML = highScores
            .map((score) => `<li>${score.score} - ${score.name}`)
            .join('');
    }

    //Checks the high scoreboard 
    function checkHighScore(score) {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const lowestScore = highScores[maxHighScores - 1]?.score ?? 0;
        
        //if the score is greater than one on the scoreboard then ask for name 
        if (score > lowestScore) {
            const name = prompt('You got a highscore! Enter name:');
            const newRecord = { score, name };
            //call the saveHighScore function with the highscores and newRecord constants.
            saveHighScore(newRecord, highScores);
            //Call the showHighScores function
            showHighScores();
        }
    }

    function saveHighScore(score, highScores) {
        highScores.push(score);
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(maxHighScores);
  
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }

}
function gamePause() {
    //alert('Hey');
    const resumebtn = document.getElementById('resumebtn');
    resumebtn.disabled = false;

    const pausebtn = document.getElementById('pausebtn');
    pausebtn.disabled = true;
    
    localStorage.setItem("myScore", "myValue")
    window.clearInterval(interval);




}

function resumeGame(){
    const resumebtn = document.getElementById('resumebtn');
    resumebtn.disabled = true;

    const pausebtn = document.getElementById('pausebtn');
    pausebtn.disabled = false;
    play_game();

}


