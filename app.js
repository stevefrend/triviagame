
let score;

const button = document.querySelector('#new-question');
const summaryDiv = document.getElementById('summary-div');
const container = document.getElementById('container');

button.addEventListener('click', function () {
  summaryDiv.innerHTML = '';
  score = {correct: 0, incorrect: 0}; 
  getQuestion(); 
  $('#question-body').modal('show');
  setTimeout(function() { 
    gameOver();
  }, 20000);
});


function getQuestion() {
  fetch('https://opentdb.com/api.php?amount=1&difficulty=easy')
    .then(response => response.json())
    .then(data => {
      let header = document.querySelector('#question');
      let modalForm = document.querySelector('#edit-entry-body');
      modalForm.innerHTML = '';
      header.innerHTML = data.results[0].question;
      
      allAnswers = [data.results[0].correct_answer, ...data.results[0].incorrect_answers];
      allAnswers.sort(() => Math.random() - 0.5);

      allAnswers.forEach(function (answer) {
        let button = document.createElement('button');
        button.innerHTML = answer;
        button.classList = 'btn btn-warning btn-block';
        button.style = 'padding: 0.5em 1.5em; margin: 5px;';
        
        modalForm.appendChild(button);

        button.addEventListener('click', function(e) {
          e.preventDefault();
          if (button.textContent === data.results[0].correct_answer) {
            // container.classList.add('correct')
            score.correct += 1;
            modalForm.innerHTML = '';
            getQuestion();
            console.log(score)

          } else {
            score.incorrect += 1;
            modalForm.innerHTML = '';
            getQuestion();
            console.log(score)
          }
        })
      })
    }); 
}

function gameOver () {
  $('#question-body').modal('hide');
  summaryDiv.innerHTML = `
    <h3 class="p-3">RESULT</h3>
    <hr>
    <p>CORRECT: ${score.correct}</p>
    <p>INCORRECT: ${score.incorrect}</p>
    
  `;
}

/*

4. create timer ui
5. create success/false ui blink

*/ 


