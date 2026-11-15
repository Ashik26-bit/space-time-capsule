// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

// Mission filters
const filters = document.querySelectorAll(".filter");
const missionCards = document.querySelectorAll(".mission-card");
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.filter;
    missionCards.forEach(card => {
      card.style.display = category === "all" || card.dataset.category === category ? "grid" : "none";
    });
  });
});

// Short educational quiz
const quiz = [
  {q:"Which mission first landed humans on the Moon?",a:["Apollo 11","Voyager 1","Perseverance"],correct:0,why:"Apollo 11 landed two astronauts on the Moon in July 1969."},
  {q:"Which NASA rover is exploring Jezero Crater on Mars?",a:["Curiosity","Perseverance","Spirit"],correct:1,why:"Perseverance landed in Jezero Crater in February 2021."},
  {q:"Which spacecraft entered interstellar space in 2012?",a:["Voyager 1","Ingenuity","Apollo 11"],correct:0,why:"Voyager 1 crossed into interstellar space in August 2012."}
];
let current = 0, points = 0, answered = false;
const questionEl=document.getElementById("question"), answersEl=document.getElementById("answers");
const feedbackEl=document.getElementById("feedback"), nextBtn=document.getElementById("nextQuestion");
const countEl=document.getElementById("questionCount"), scoreEl=document.getElementById("score");
function showQuestion(){
  answered=false; const item=quiz[current];
  countEl.textContent=`QUESTION ${current+1} / ${quiz.length}`;
  scoreEl.textContent=`SCORE ${points}`;
  questionEl.textContent=item.q; feedbackEl.textContent=""; answersEl.innerHTML="";
  nextBtn.disabled=true; nextBtn.textContent=current===quiz.length-1?"See my result →":"Next question →";
  item.a.forEach((answer,index)=>{
    const btn=document.createElement("button"); btn.className="answer"; btn.textContent=answer;
    btn.addEventListener("click",()=>chooseAnswer(index,btn)); answersEl.appendChild(btn);
  });
}
function chooseAnswer(index,button){
  if(answered)return; answered=true; const item=quiz[current];
  [...answersEl.children].forEach((btn,i)=>{btn.disabled=true;if(i===item.correct)btn.classList.add("correct")});
  if(index===item.correct){points++;feedbackEl.textContent="Correct! "+item.why;}
  else{button.classList.add("wrong");feedbackEl.textContent="Not quite. "+item.why;}
  scoreEl.textContent=`SCORE ${points}`;nextBtn.disabled=false;
}
nextBtn.addEventListener("click",()=>{
  if(!answered)return;
  if(current<quiz.length-1){current++;showQuestion();}
  else{questionEl.textContent=`You scored ${points} out of ${quiz.length}!`;answersEl.innerHTML="";feedbackEl.textContent=points===3?"Amazing work, space explorer!":"Great effort — explore the mission stories and try again.";nextBtn.textContent="Play again ↻";nextBtn.disabled=false;nextBtn.onclick=()=>{current=0;points=0;nextBtn.onclick=null;showQuestion();};}
});
showQuestion();
