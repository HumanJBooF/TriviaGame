$(function () {
    const game = [
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

    let timer = 10;
    let timerID;
    let timerGo = false;
    let unanswered = 0;
    let right = 0;
    let wrong = 0;
    let currentQuestion = 0;
    let userGuess = "";
    let end = game.length;

    $('.reset').hide();

    const startTimer = () => {
        if (!timerGo) {
            timerID = setInterval(countDown, 1000);
            timerGo = true;
        }
    }

    const countDown = () => {
        $('.timer').html(`<h2>Hurry up please... <br>${timer}</h2>`)
        console.log(timer)

        if (timer < 0) {
            unanswered++;
            stopTimer();
            $('.answers').empty();
            $('.questions').empty();
            $('.timer').html('You Took to long! The Correct answer was ' + game[currentQuestion].answers[game[currentQuestion].correct]);
            currentQuestion++;
            setTimeout(displayQuestion, 3000);
        }
    }

    const stopTimer = () => {
        timerGo = false;
        timer = 10;
        clearInterval(timerID);
    }

    const displayQuestion = () => {
        if (!resetGame()) {
            let q = game[currentQuestion].question;
            $('.timer').empty();
            $('.questions').html(q);
            startTimer();
            let answer = game[currentQuestion].answers;
            for (i = 0; i < answer.length; i++) {
                btn = $('<div>');
                btn.text(answer[i]).addClass('button animated fadeInUp').attr('data-value', i)
                $('.answers').append(btn);
            }
        }
    }

    const showGif = () => {
        let gif = game[currentQuestion].gif;
        $('.timer').empty();
        $('.image').append(`<img id="image" src='${gif}'></img>`)
    }


    const checkCorrect = () => {
        if (userGuess === game[currentQuestion].correct) {
            stopTimer();
            right++;
            showGif();
            $('.answers').empty();
            $('.questions').empty();
            currentQuestion++;
            setTimeout(() => {
                $('#image').remove();
                displayQuestion();
            }, 3000);
        } else {
            wrong++;
            userGuess = "";
            stopTimer();
            $('.answers').empty();
            $('.question').empty();
            $('.timer').empty();
            $('.showcur').text('Wrong! The correct answer is: ' + game[currentQuestion].answers[game[currentQuestion].correct])
            currentQuestion++;
            setTimeout(() => {
                $('.showcur').empty();
                displayQuestion();
            }, 3000);
        }
    }


    const resetGame = () => {
        if (currentQuestion === end) {
            $('.questions').empty();
            $('.timer').empty();
            $('.right').html(`You got ${right} Correct!`)
            $('.wrong').html(`You got ${wrong} Wrong!`)
            $('.unanswered').html(`You forgot to answer ${unanswered} questions`)
            $('.reset').show();
            return true;
        }
    }

    const newGame = () => {
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
        $('.wrapper').css({ 'border': '', 'background': '', 'box-shadow': '' })
    }


    $('.start').on('click', function () {
        $(this).hide();
        $('.wrapper').css({ 'border': '1pt solid black', 'background': '#E3DAC9', 'box-shadow': '0 0 75px black' });
        $('.start-pic').hide();
        $('.rules').hide();
        currentQuestion = 0;
        wrong = 0;
        right = 0;
        unanswered = 0;
        startTimer();
        displayQuestion();
    })

    $('.answers').on('click', '.button', function () {
        userGuess = parseInt($(this).attr('data-value'))
        checkCorrect();
    })

    $('.reset').on('click', function () {
        newGame()
    })
});