const button = document.getElementById('ttsButton');
const back = document.getElementById('read');
let isSpeaking = false;
let utterance = new SpeechSynthesisUtterance();

button.addEventListener('click', () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      button.textContent = "Start reading";
    } else {
      window.speechSynthesis.speak(utterance);
      isSpeaking = true;
      button.textContent = "Stop reading";
    }
  });

  function change_speak(boolo){
      isSpeaking = boolo;
  }

  back.addEventListener('click', change_speak(false))

  window.speechSynthesis.onvoiceschanged = () => {
    utterance.voice = window.speechSynthesis.getVoices()[0]; 
  };