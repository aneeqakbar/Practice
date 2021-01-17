//--------------------------------------------------------//
//CANVAS BODY//
//--------------------------------------------------------//
const canvas = document.getElementById('snakegame');
const canvas_2d = canvas.getContext("2d");
const pausescreen = document.getElementById('pause');
const endscreen = document.getElementById('End');

//----------------------------------------------------------------------//
//STATISTICS// snakelenght, points, speed , bonus collected & ability bar
//---------------------------------------------------------------------//
let snakelenght = document.getElementById('snakelenght');
let scoretext = document.getElementById('score');
let speed = document.getElementById('speed');
let bonuscollectedtext = document.getElementById('bonuscollected');
let abilitybar = document.getElementById('bar');

let hstext = document.getElementById('hs');
let currentscore = document.getElementById('cs');
let Grade = document.getElementById('grade');

//--------------------------------------------------------//
//COLORS// CANVAS, SNAKE & APPLE
//--------------------------------------------------------//
const canvas_back = "#d2bd98";
let apple_back = "Red";

const snake_back = "#9ba4b4";
const snake_back1 = "#394867";
const snake_back2 = "#223b6e";
const snake_back3 = "#0f1f41";
const snake_back4 = "#cc0000";

let highestscore = [0];
let highestcached = [];

//--------------------------------------------------------//
//Shapes & Bodies// APPLE, SNAKE & BONUS
//--------------------------------------------------------//
let apple = [{ x: 0, y: 0 }];

let bonusapple = [{ x: 0, y: 0 }];

let snake = [
    { x: 300, y: 300 },
    { x: 280, y: 300 },
    { x: 260, y: 300 },
    { x: 240, y: 300 },
    { x: 220, y: 300 }
]

//--------------------------------------------------------//
//DIFFICULTIES// conditions & speed
//--------------------------------------------------------//
let dif1;
let dif2;
let dif3;
let dif4;

let s4 = 100;
let s3 = 125;
let s2 = 150;
let s1 = 175;

//--------------------------------------------------------//
//VARIABLES//
//--------------------------------------------------------//
let endgame = false;
let movex = 20;
let movey = 0;
let points = 0;
let ability = 1;
let bonuscollected = 0;
let delaymovement = false;
let time = 200;
let snakecolsnake = false;
let gamepause = false;
let bon = false;// CREATE AND VANISH BONUS SWITCH
let aw = false; // ABILITY TRIGGER switch, Turns true and false acc to situation
let colafter = false;

let timescolided = 1;

let snakecol = 0;

// LOCAL STORAGE //
let localhighest = localStorage.getItem('highest');


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
//CODE STARTS HERE!//
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

rungame();

function rungame() {
    loop(); // REFRESHES THE CANVAS AFTER EVERY 100MS
    spawnapple();
    bonuscal();

    // KEYPRESS EVENT
    document.addEventListener('keyup', abilitykey);
    document.addEventListener('keyup', gamepauser);
}

//--------------------------------------------------------//
//PAUSE AND UNPAUSE THE GAME//
//--------------------------------------------------------//
function gamepauser(key) {
    const keypressed = key.keyCode;

    const ESC_KEY = 27;
    if (end()) return;
    esc();
    function esc() {

        if (keypressed === ESC_KEY) {
            if (!gamepause === true) {
                gamepause = true;
                pausescreen.style.display = "flex";
            }
            else {
                gamepause = false;
                pausescreen.style.display = "none";
                pause();
            }
        }
    }

    function pause() {
        if (gamepause === true) {
            return;
        }
        else if (gamepause === false) {
            loop();
            return;
        }
    }
}

//--------------------------------------------------------//
//Main!// Runs every function specificly
//--------------------------------------------------------//
function loop() {
    if (end()) return;
    setTimeout(() => {
        if (gamepause === true) return;
        scores();
        createstuff();
        movesnake();
        loop();
    }, `${time}`);
}

//--------------------------------------------------------//
//CREATE THINGS//
//--------------------------------------------------------//
function createstuff() {

    fillcanvas();
    createsnake();
    createapple();

    if (bon === true) {
        createbonus();
    }

    // CREATE + PAINT CANVAS
    function fillcanvas() {
        canvas_2d.fillStyle = canvas_back;
        canvas_2d.fillRect(0, 0, canvas.width, canvas.height);
        canvas_2d.strokeStyle = "black";
        canvas_2d.strokeRect(0, 0, canvas.width, canvas.height);
    }

    // CREATE + PAINT SNAKE
    function createsnake() {
        for (i = 1; i < snake.length; i++) {
            drawblock(snake[i]);
        }
        function drawblock(num) {
            if (snakecolsnake === true) {
                canvas_2d.fillStyle = "orange";
                setTimeout(() => {
                    snakecolsnake = false;
                }, 100);
            }
            else if (dif1) {
                canvas_2d.fillStyle = snake_back1;
            }
            else if (dif2) {
                canvas_2d.fillStyle = snake_back2;
            }
            else if (dif3) {
                canvas_2d.fillStyle = snake_back3;
            }
            else if (dif4) {
                canvas_2d.fillStyle = snake_back4;
            }
            else {
                canvas_2d.fillStyle = snake_back;
            }
            canvas_2d.fillRect(num.x, num.y, 20, 20);
            canvas_2d.strokeRect(num.x, num.y, 20, 20);

            canvas_2d.beginPath();
            canvas_2d.arc(snake[0].x + 10, snake[0].y + 10, 10, -1 * Math.PI, 1 * Math.PI);
            canvas_2d.fill();
            canvas_2d.stroke();
        }
    }

    // CREATE + PAINT APPLE
    function createapple() {
        if (dif1) {
            apple_back = "#8f0c0c";
        }
        else {
            apple_back = "#d72323";
        }
        if (dif2) {
            apple_back = "#892cdc";
        }
        if (dif3) {
            apple_back = "#52057b";
        }
        if (dif4) {
            apple_back = "rgb(211, 226, 0)";
        }

        canvas_2d.fillStyle = apple_back;

        canvas_2d.beginPath(apple[0].x, apple[0].y);
        canvas_2d.arc(apple[0].x + 10, apple[0].y + 10, 8, 0, 2 * Math.PI);
        canvas_2d.fill();
        canvas_2d.stroke();

    }
    //  CREATE BONUS
    function createbonus() {
        canvas_2d.fillStyle = "yellow";
        canvas_2d.beginPath(bonusapple[0].x, bonusapple[0].y);
        canvas_2d.arc(bonusapple[0].x + 10, bonusapple[0].y + 10, 15, 0, 2 * Math.PI);
        canvas_2d.fill();

        canvas_2d.strokeStyle = "red";
        canvas_2d.stroke();
    }
}

//--------------------------------------------------------//
//MOVEMENT//
//--------------------------------------------------------//
function movesnake() {

    delaymovement = false;

    document.addEventListener('keydown', keybind);

    movement();
    difficultify();
    // SIMPLE FORWARD MOVEMENT, BECOMES INFINITE AFTER RUNNING INSIDE rungame();
    function movement() {
        let snakehead = { x: snake[0].x + movex, y: snake[0].y + movey };
        snake.unshift(snakehead);

        let snakeeaten = snake[0].x == apple[0].x && snake[0].y == apple[0].y;

        let snakebonus = snake[0].x == bonusapple[0].x && snake[0].y == bonusapple[0].y;

        if (snakeeaten) {
            spawnapple();
            points += 5;
            colafter = true;
            highestscore.push(snake.length);
        }
        else if (snakebonus) {
            snake.unshift(snakehead);
            colafter = true;
            points += 10;
            ability += .2;
            bonuscollected++;
            highestscore.push(snake.length);
        }
        else {
            snake.pop();
        }

    }

    function difficultify() {

        if (snake.length >= 10 && snake.length < 15) {
            dif1 = true;
            dif2 = false;
            dif3 = false;
            dif4 = false;
        }
        else if (snake.length < 10) {
            dif1 = false;
            dif2 = false;
            dif3 = false;
            dif4 = false;
            time = 200;
        }
        if (snake.length >= 15 && snake.length < 20) {
            dif1 = false;
            dif2 = true;
            dif3 = false;
            dif4 = false;
        }
        if (snake.length >= 20 && snake.length < 25) {
            dif1 = false;
            dif2 = false;
            dif3 = true;
            dif4 = false;
        }
        if (snake.length >= 25) {
            dif1 = false;
            dif2 = false;
            dif3 = false;
            dif4 = true;
        }

        if (dif4) {
            time = s4;
        }
        else if (dif3) {
            time = s3;
        }
        else if (dif2) {
            time = s2;
        }
        else if (dif1) {
            time = s1;
        }
    }

    // KEYBINDING, TRIGGERS WHENEVER THE KEYDOWN EVENT OCCURS ABOVE 
    function keybind(key) {
        const keypressed = key.keyCode;

        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        const moveleft = movex === -20;
        const moveright = movex === 20;
        const moveup = movey === -20;
        const movedown = movey === 20;

        if (delaymovement) return; //don't allow two inputs under a specific time period
        delaymovement = true;

        if (keypressed === LEFT_KEY && !moveright) {
            movex = -20;
            movey = 0;
        }
        if (keypressed === RIGHT_KEY && !moveleft) {
            movex = 20;
            movey = 0;
        }
        if (keypressed === UP_KEY && !movedown) {
            movey = -20;
            movex = 0;
        }
        if (keypressed === DOWN_KEY && !moveup) {
            movey = 20;
            movex = 0;
        }
    }
}

//--------------------------------------------------------//
//SCORES//
//--------------------------------------------------------//
function scores() {
    // UPDATES SCORE, COMBINED WITH MOVEMENT
    scoretext.innerHTML = "Score: " + points;

    snakelenght.innerHTML = "Snake Lenght: " + snake.length;

    bonuscollectedtext.innerHTML = "Bonus Collected: " + bonuscollected;

    speed.innerHTML = "Speed: " + time;

    abilitynum();

    function abilitynum() {
        abilitybar.style.transform = `scalex(${ability})`;

        if (ability < 0) {
            ability = 0;
        }
        else if (ability > 1) {
            ability = 1;
        }
    }
}

//--------------------------------------------------------//
// GENERATES RANDOM NUMBER WITH A GAP OF 20//
//--------------------------------------------------------//
function randnum(num) {
    return Math.floor((Math.random() * num - 20) / 20) * 20;
}

//--------------------------------------------------------//
//Apple Spawner // ASSIGNS RANDOM NUM TO APPLE X and Y //
//--------------------------------------------------------//
function spawnapple() {
    apple[0].x = randnum(canvas.width);
    apple[0].y = randnum(canvas.height);
    if (apple[0].x === undefined || apple[0].x > 580 || apple[0].x < 10) {
        spawnapple();
    }
    if (apple[0].y === undefined || apple[0].y > 580 || apple[0].y < 10) {
        spawnapple();
    }

}

//--------------------------------------------------------//
//Bonus Spawner // ASSIGNS RANDOM NUM TO Bonus X and Y //
//--------------------------------------------------------//
function spawnbonus() {
    bonusapple[0].x = randnum(canvas.width - 10);
    bonusapple[0].y = randnum(canvas.height - 10);
    if (bonusapple[0].x === undefined || bonusapple[0].x > 570 || bonusapple[0].x < 30) {
        spawnbonus();
    }
    if (bonusapple[0].y === undefined || bonusapple[0].y > 570 || bonusapple[0].y < 30) {
        spawnbonus();
    }

}

//--------------------------------------------------------//
//BONUS CALCULATIONS//
//--------------------------------------------------------//
function bonuscal() {

    let t1 = setInterval(() => {
        bon = true; // Creates bonus in canvas js-125
        spawnbonus();
    }, 80 * time);

    let t2 = setTimeout(bonfalse, 145 * time)

    let t3 = setInterval(bonusupdate, 100);

    function bonusupdate() {
        let snakebonus = snake[0].x == bonusapple[0].x && snake[0].y == bonusapple[0].y;

        if (snakebonus) {
            bon = false;
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            bonuscal();
        }
    }
    function bonfalse() {
        bon = false;
        clearInterval(t1);
        clearTimeout(t3);
        bonuscal();
    }
}

//--------------------------------------------------------//
//ABILITY TRIGGER//
//--------------------------------------------------------//
function abilitykey(key) {

    let keyp = key.keyCode;
    if (keyp === 32) {
        abilitycal();
    }
    else {
        return;
    }

    function abilitycal() {

        if (aw === true) {
            aw = false;
        }
        else if (aw === false) {
            run();
            aw = true;
        }

        function run() {

            setTimeout(() => {
                abilitybar.style.background = 'rgb(255, 0, 191)';
                if (gamepause === true) {
                    s4 = 100;
                    s3 = 125;
                    s2 = 150;
                    aw = false;
                    return;
                }

                if (ability === 0) {
                    abilitybar.style.background = 'rgb(255, 0, 191)';
                    s4 = 100;
                    s3 = 125;
                    s2 = 150;
                    aw = true;
                    return;
                }
                else if (dif4) {
                    if (aw === true) {
                        s4 = 135;
                        ability -= .02;
                        abilitybar.style.background = 'red';
                    }
                    else if (aw === false) {
                        s4 = 100;
                        aw = false;
                        return;
                    }
                }
                else if (dif3) {
                    if (aw === true) {
                        s3 = 160;
                        ability -= .02;
                        abilitybar.style.background = 'red';
                    }
                    else if (aw === false) {
                        s3 = 125;
                        aw = false;
                        return;
                    }
                }
                else if (dif2) {
                    if (aw === true) {
                        s2 = 185;
                        console.log("11");
                        ability -= .02;
                        abilitybar.style.background = 'red';
                    }
                    else if (aw === false) {
                        s2 = 150;
                        aw = false;
                        return;
                    }
                }
                else {
                    aw = false;
                    s4 = 100;
                    s3 = 125;
                    s2 = 150;
                    return;
                }
                run();
            }, 100);

        }
    }
}

//--------------------------------------------------------//
//Game End//
//--------------------------------------------------------//
function end() {

    if (endgame === true) {
        return true;
    }

    if (colafter === true) {
        if (snake.length <= 5) {
            endgame = true;
            if (endgame === true) {
                localcache();
                endscreen.style.display = "flex";
                return true;
            }
        }
    }

    for (i = 3; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            snakecolsnake = true;
            timescolided+=1;
            if (dif4) {
                snake.pop();
                snake.pop();
                snake.pop();
                snake.pop();
                snake.pop();
            }
            else {
                snake.pop();
                snake.pop();
                snake.pop();
            }
        }
    }

    if (snake[0].x === canvas.width || snake[0].y === canvas.height || snake[0].x < 0 || snake[0].y < 0) {
        endgame = true;
        if (endgame === true) {
            localcache();
            endscreen.style.display = "flex";
            return true;
        }
    }
}

//--------------------------------------------------------//
//Reloads the Game//
//--------------------------------------------------------//
function restart() {
    location.reload();
}

//------------------------------------------------------------------//
//Stores Highest score in cache & display Current score & cal Grade//
//----------------------------------------------------------------//
function localcache() {
    let hs = (Math.max(...highestscore));

    if (JSON.parse(localStorage.getItem('highest')) != undefined || null) {
        highestcached = JSON.parse(localStorage.getItem('highest'));
    }
    highestcached.push(hs);
    localStorage.setItem('highest', JSON.stringify(highestcached));

    let highesttext = JSON.parse(localStorage.getItem('highest'));
    let ht = (Math.max(...highesttext));

    hstext.innerHTML = "Highest Score: " + ht;
    currentscore.innerHTML = "Current Score: " + hs;

    grade();
    function grade() {
        let g = points / timescolided;
        console.log(g);
        if (snake.length >= 10) {
            if (g = 1 && snake.length > 25) {
                Grade.innerHTML = "Grade: XsX++";
            }
            else if (g <= 40 && snake.length > 20) {
                Grade.innerHTML = "Grade: SsS+";
            }
            else if (g <= 80 && !g <= 3 && snake.length > 15) {
                Grade.innerHTML = "Grade: SsS";
            }

            if (g <= 12 && !g <= 7) {
                Grade.innerHTML = "Grade: S+";
            }
            else if (g <= 18 && !g <= 12) {
                Grade.innerHTML = "Grade: S";
            }
            else if (g <= 22 && !g <= 18) {
                Grade.innerHTML = "Grade: A";
            }
            else if (g <= 25 && !g <= 22) {
                Grade.innerHTML = "Grade: B";
            }
            else if (g >= 26 && !g <= 25) {
                Grade.innerHTML = "Grade: C";
            }
            else {
                Grade.innerHTML = "Grade: NaN";
            }
        }
        else {
            Grade.innerHTML = "Grade: TooEarly";
        }
    }
}

