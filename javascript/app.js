$(function() {
    //game array filled with objects
    var game = [
        {
            question: 'According to Ron Swanson cats are... ',
            answers: ['amazing', 'better then dogs', 'pointless', 'stupid'],
            correct: 2,
            gif: './images/ron.gif'
        },
        {
            question: "What was Larry/Terry/Garry/Barry's real name?",
            answers: ['Larry Gengurch', 'Garry Gergich', 'Terry Gingrich', 'Barry Girgich'],
            correct: 1,
            gif: './images/Garry.gif'
        },
        {
            question: 'What is Leslie Knopes favorite food?',
            answers: ['Waffles', 'Pancakes', 'Eggs', 'Bacon'],
            correct: 0,
            gif: './images/leslie.gif'
        },
        {
            question: 'Andys alter egos name is...',
            answers: ['Tommy Tickler, FBI', 'Bert Macklin, FBI', 'Batman, FBI', 'Benjamin Turner, FBI'],
            correct: 1,
            gif: './images/macklin.gif'
        },
        {
            question: 'What game did Ben Wyatt create?',
            answers: ['Dunshire Chronicles', 'The Tower at Dunshire', 'Dunshire Time Travelers', 'The Cones of Dunshire'],
            correct: 3,
            gif: './images/cones.gif'
        },
        {
            question: 'Who is Ron Swansons saxophone-playing alter ego?',
            answers: ['Slick Jones', 'Duke Silver', 'Duke Brown', 'Jones Silver'],
            correct: 1,
            gif: './images/duke.gif'
        },
        {
            question: 'What is the name of the beloved mini-horse?',
            answers: ["lil' Sebastion", "lil' Stevey", "lil' Horsey", "lil' Seemus"],
            correct: 0,
            gif: './images/lil.gif'
        },
        {
            question: 'What does Tom Haverford call deserts?',
            answers: ['Zerts', 'De de zert zerts', 'After dinna thrilla', 'Sweetie sweetz'],
            correct: 0,
            gif: './images/tom.gif'
        }];
    //declaring variables for the rest of the game
    var timer = 10;
    var timerID;
    var timerGo = false;
    var unanswered = 0;
    var right = 0;
    var wrong = 0;
    var currentQuestion = 0;
    var userGuess = "";
    var end = game.length;
    //hiding the reset button
    $('.reset').hide();


    console.log(game[currentQuestion].question);
    //Setting up the timer for each question!
    function startTimer() {
        if (!timerGo) {
            timerID = setInterval(countDown, 1000);
            timerGo = true;
        }
    }
    //If the time hits 0 you can no longer answer and get a +1 to unanswered questions
    function countDown() {
        $('.timer').html('<h2>Hurry up please... ' + timer + '</h2>')
        timer--;
        console.log(timer)

        if (timer === 0) {
            unanswered++;
            console.log(unanswered)
            stopTimer();
            $('.timer').html('<h2>You Took to long!');
        }
    }
    //stops timer
    function stopTimer() {
        timerGo = false;
        timer = 10;
        clearInterval(timerID);
    }
    //display question with answers add 4 buttons for answers and gives them a value 0-3
    function displayQuestion() {
     //check if add end of game if not then go to next question      
        if(resetGame()){}else{
        var q = game[currentQuestion].question;
        $('.questions').html(q);
        var answer = game[currentQuestion].answers;
        
        for (i = 0; i < answer.length; i++) {
            console.log(answer[i])
            btn = $('<div>');
            btn.text(answer[i]);
            btn.addClass('button');
            btn.attr('data-value', i);
            $('.answers').append(btn);
            startTimer();

        }
    }
    }
    //adds a gif to image div
      function showGif() {
          var gif = game[currentQuestion].gif;
          console.log('about to')
         $('.timer').empty();
         $('.image').append('<img id="image" src=' + gif + '></img>')
      }

    function checkCorrect() {
       //if userGuess is the correct answer
        if (userGuess === game[currentQuestion].correct) {
            stopTimer(); //stop timer
            right++;    //plus 1 to correct answers
            showGif();  //show Gif
           
            $('.answers').empty();  
            $('.questions').empty();
            currentQuestion++;      //Plus one to game index
            setTimeout(function(){      
                 $('#image').remove();     //removes gif
                 displayQuestion();        //Displays next question
            }, 3000);

        } else {
            wrong++;    //wrong answers plus 1
            userGuess = ""; //clear userGuess
            stopTimer();    //stops timer
            $('.answers').empty();
            $('.question').empty();
            //emptys divs and shows correct answer
            $('.answers').html('Wrong! The correct answer is: ' + game[currentQuestion].answers[game[currentQuestion].correct])
           currentQuestion++;       //plus one to game index
            setTimeout(function(){
                $('.answers').empty();  //removes text
                displayQuestion();      //next question!
           }, 3000);
        }
        console.log(right)
        console.log(wrong)
    }
    

    function resetGame() {
        if(currentQuestion === end){
            $('.answers').empty();
            $('.question').empty();
            $('.timer').empty();
            $('.reset').show();
            $('.questions').html('You got ' +right+ 'Correct')

            return true;
        }
    }


    //Click function hides start button and starting picture, starts timer and shows question.
    $('.start').on('click', function () {
        $(this).hide();
        $('.start-pic').replaceWith($('.questions'));
        startTimer();
        $('.answers').fadeIn(1000);
        displayQuestion();
    })
    //click function for the answers takes the value in the userGuess variable and goes to checkCorrect function
    $('.answers').on('click', '.button', function () {
        userGuess = parseInt($(this).attr('data-value'))
        checkCorrect();
    })

    $('.reset').on('click', function() {

        $('.start-pic').show();
        $('.start').show();
        console.log('yea')
    })
   
});