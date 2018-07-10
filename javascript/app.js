$(function() {
    
   var game =  [
       {    
           question:  'According to Ron Swanson cats are... ',
           answers: ['amazing','better then dogs','pointless','stupid'],
           correct: 'pointless',
           gif: './images/ron.gif'
        },
        {
            question: "What was Larry/Terry/Garry/Barry's real name?",
            answers: ['Larry Gengurch','Garry Gergich','Terry Gingrich','Barry Girgich'],
            correct: 'Garry Gergich',
            gif: './images/Garry.gif'
        },
        {
            question: 'What is Leslie Knopes favorite food?',
            answers: ['Waffles','Pancakes','Eggs','Bacon'],
            correct: 'Waffles',
            gif: './images/leslie.gif'
        },
        {
            question: 'Andys alter egos name is...',
            answers: ['Tommy Tickler, FBI','Bert Macklin, FBI','Batman, FBI','Benjamin Turner, FBI'],
            correct: 'Bert Macklin, FBI',
            gif: './images/macklin.gif'
        },
        {
            question: 'What game did Ben Wyatt create?',
            answers: ['Dunshire Chronicles','The Tower at Dunshire','Dunshire Time Travelers','The Cones of Dunshire'],
            correct: 'The Cones of Dunshire',
            gif: './images/cones.gif'
        },
        {
            question: 'Who is Ron Swansons saxophone-playing alter ego?',
            answers: ['Slick Jones','Duke Silver','Duke Brown','Jones Silver'],
            correct: 'Duke Silver',
            gif: './images/duke.gif'
        },
        {
            question: 'What is the name of the beloved mini-horse?',
            answers: ["lil' Sebastion","lil' Stevey","lil' Horsey","lil' Seemus"],
            correct: "lil' Sebastion",
            gif: './images/lil.gif'
        },
        {
            question: 'What does Tom Haverford call deserts?',
            answers: ['Zerts','De de zert zerts','After dinna thrilla','Sweetie sweetz'],
            correct: 'Zerts',
            gif: './images/tom.gif'
        }];
       
        var timer = 20;
        var timerID;
        var timerGo = false;
        var unanswered = 0;
        var right = 0;
        var wrong = 0;
        
        $('.reset').hide();
        
        $('.start').on('click', function() {
            $('.start').hide();
            $('.start-pic').hide();
            startTimer();
        })
      
      function startTimer() {
          if(!timerGo) {
            timerID = setInterval(countDown, 1000);
            timerGo = true;
          }
      }
      
      function countDown() {
          $('.timer').html('<h2>Hurry up please... ' + timer + '</h2>')
          timer--;
          console.log(timer)
          if(timer === -1) {
              stopTimer();
          }
      }

      function stopTimer() {
          timerGo = false;
          clearInterval(timerID);
          $('.timer').html('<h2>You Took to long!');
      }
});