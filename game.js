var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
var difficulty = "mid"; // default difficulty
var delayTime = 300; // default delay time for 'mid'
var highestLevelEasy=0;
var highestLevelMid=0;
var highestLevelHard=0;


function updateHighestScoreDisplay() {
    if(difficulty==="easy"){
        $("#highest-score").text("Highest Score: "+ highestLevelEasy);
    }else if(difficulty === "mid"){
        $("#highest-score").text("Highest Score: "+ highestLevelMid);
    }else {
        $("#highest-score").text("Highest Score: "+ highestLevelHard);
    }
}



$(".difficulty-btn").click(function() {
    difficulty = $(this).attr("id");
    console.log(difficulty);
    if(difficulty==="easy")
        delayTime=600;
    else if(difficulty==="mid")
        delayTime=300;
    else if(difficulty==="hard")
        delayTime=180;

    $("#welcome-screen").addClass("hidden");
    $("#game-screen").removeClass("hidden");
    $("#back-home-container").removeClass("hidden");
    updateHighestScoreDisplay();

});

$("#back-home-button").click(function() {
    $("#game-screen").addClass("hidden");
    $("#welcome-screen").removeClass("hidden");
    $("#back-home-container").addClass("hidden");
    $("#level-title").text("Press Any Key to Start");
    startOver();
});

//Generates the next sequence
function nextSequence(){
    //Reset the player clicks
    userClickedPattern = [];
    $("#level-title").text("Level "+ level);
    //Update level
    level++;
    //Calculate the next color
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    //Showing it to the player
    if (started) {
        showSequence(0);
    } else {
        //Showing it to the player
        $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
       
    }
    return randomChosenColour;
}


function showSequence(index) {
    if (index < gamePattern.length) {
        setTimeout(() => {
            var randomChosenColour = gamePattern[index];
            //Showing it to the player
            $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
            playSound(randomChosenColour);
            showSequence(index + 1);
        }, delayTime);
    }
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

$(".btn").click(function() {  
    if(started){
    // When user clicks, add it to the user click's array
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // Showing it on screen
    $("#"+userChosenColour).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //Check if the player pressed the right button
    checkAnswer(userClickedPattern.length-1);
    }
});

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//For starting the Game
$(document).keydown(function () {
    if(!started){
        $("#level-title").text("Press Any Key to Start");
        nextSequence();
        $("#level-title").text("Level "+ level);
        started=true;
        
    } 
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel ]=== gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            
            if(difficulty==="easy"){
                highestLevelEasy = Math.max(highestLevelEasy, level);
                $("#highest-score").text("Highest Score: "+ highestLevelEasy);
            }else if(difficulty === "mid"){
                highestLevelMid = Math.max(highestLevelMid, level);
                $("#highest-score").text("Highest Score: "+ highestLevelMid);
            }else {
                highestLevelHard = Math.max(highestLevelHard, level);
                $("#highest-score").text("Highest Score: "+ highestLevelHard);
            }
            updateHighestScoreDisplay();

            setTimeout(() => {
                nextSequence();  
              }, 1000);

        }
    }else{
        var audio = new Audio('wrong.mp3');
        audio.play();
        $('body').addClass("game-over");
        setTimeout(() => {
            $('body').removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
        
    }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    // $("#level-title").text("Press Any Key to Start");
    updateHighestScoreDisplay();
}