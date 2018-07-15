$(function () {
    //game array filled with objects
    var game = [
        {
            question: 'According to Ron Swanson cats are... ',
            answers: ['Amazing', 'Better then dogs', 'Pointless', 'Stupid'],
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
            answers: ["Lil' Sebastion", "Lil' Stevey", "Lil' Horsey", "Lil' Seemus"],
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
    //Countdown to get the timer to go down by 1
    function countDown() {
        $('.timer').html('<h2>Hurry up please... <br>' + timer + '</h2>') //Dipsplaying the timer on the page
        timer--;
        console.log(timer)

        if (timer < 0) {   //if it hits 0
            unanswered++;   //unanswered goes up 1
            console.log(unanswered)
            stopTimer();
            $('.answers').empty();
            $('.questions').empty();
            $('.timer').html('You Took to long! The Correct answer was ' + game[currentQuestion].answers[game[currentQuestion].correct]);
            currentQuestion++;  //go to next index in game array
            setTimeout(displayQuestion, 3000);
        }
    }

    function stopTimer() {
        timerGo = false;
        timer = 10;  //resets the timer to 10
        clearInterval(timerID);
    }
    //display question with answers add 4 buttons for answers and gives them a value 0-3
    function displayQuestion() {
        //check if at end of game if not then go to next question      
        if (resetGame()) {

        } else {
            var q = game[currentQuestion].question;
            $('.timer').empty();
            $('.questions').html(q);
            startTimer();
            var answer = game[currentQuestion].answers;
            for (i = 0; i < answer.length; i++) {
                console.log(answer[i])
                btn = $('<div>');
                btn.text(answer[i]);
                btn.addClass('button animated fadeInUp');
                btn.attr('data-value', i);
                $('.answers').append(btn);
            }
        }
    }

    //adds a gif to image div
    function showGif() {
        var gif = game[currentQuestion].gif;
        console.log('gif test')
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
            setTimeout(function () {
                $('#image').remove();     //removes gif
                displayQuestion();      //Displays next question

            }, 3000);

        } else {
            wrong++;    //wrong answers plus 1
            userGuess = ""; //clear userGuess
            stopTimer();    //stops timer
            $('.answers').empty();
            $('.question').empty();
            $('.timer').empty();
            //emptys divs and shows correct answer
            $('.showcur').text('Wrong! The correct answer is: ' + game[currentQuestion].answers[game[currentQuestion].correct])
            currentQuestion++;       //plus one to game index
            setTimeout(function () {
                $('.showcur').empty();  //removes text
                displayQuestion();      //next question!
            }, 3000);
        }
        console.log(right)
        console.log(wrong)
    }


    function resetGame() {
        if (currentQuestion === end) {
            $('.questions').empty();
            $('.timer').empty();
            $('.right').html('You got ' + right + ' Correct!')
            $('.wrong').html('You got ' + wrong + ' Wrong!')
            $('.unanswered').html('You forgot to answer ' + unanswered + ' questions')
            $('.reset').show();
            return true;
        }
    }
    //new game function that emptys all divs and resets starting screen
    function newGame() {
        $('.reset').hide();
        $('.answers').empty();
        $('.questions').empty();
        $('.timer').empty();
        $('.right').empty();
        $('.wrong').empty();
        $('.unanswered').empty();
        $('.start-pic').show();
        $('.start').show();
        $('.rules').show();
        $('.wrapper').css({'border': '', 'background':'','box-shadow': ''})
    }


    //Click function hides start button and starting picture, starts timer and shows question.
    $('.start').on('click', function () {
        $(this).hide();
        $('.wrapper').css({'border':'1pt solid black', 'background': '#E3DAC9', 'box-shadow': '0 0 75px black'});
        $('.start-pic').hide();
        $('.rules').hide();
        currentQuestion = 0;
        wrong = 0;
        right = 0;
        unanswered = 0;
        startTimer();
        displayQuestion();
    })
    //click function for the answers takes the value in the userGuess variable and goes to checkCorrect function
    $('.answers').on('click', '.button', function () {
        userGuess = parseInt($(this).attr('data-value'))
        checkCorrect();
    })
    //reset button click event to start new game
    $('.reset').on('click', function () {
        newGame()
    })


});