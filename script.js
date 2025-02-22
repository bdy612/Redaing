const button = document.getElementById('ttsButton');
const readButton = document.getElementById('read'); // Corrected ID
let isSpeaking = false;
let currentParagraph = null; 
let utterance = new SpeechSynthesisUtterance();

const paragraphs = document.querySelectorAll('p');

paragraphs.forEach(paragraph => {
  paragraph.addEventListener('click', () => {
    if (isSpeaking && currentParagraph === paragraph) { 
      window.speechSynthesis.cancel();
      isSpeaking = false;
      button.textContent = "Start reading";
      currentParagraph = null; 
      return; 
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel(); 
    }

    currentParagraph = paragraph; 
    utterance = new SpeechSynthesisUtterance(paragraph.textContent);
    window.speechSynthesis.speak(utterance);
    isSpeaking = true;
    button.textContent = "Stop reading"; 
  });
});

button.addEventListener('click', () => {
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    button.textContent = "Start reading"; 
  } else {
    utterance = new SpeechSynthesisUtterance(
      Array.from(paragraphs, p => p.textContent).join(' ')
    );
    window.speechSynthesis.speak(utterance);
    isSpeaking = true;
    button.textContent = "Stop reading"; 
  }
});

readButton.addEventListener('click', () => { 
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    button.textContent = "Start reading"; 
  }
});

window.speechSynthesis.onvoiceschanged = () => {
  utterance.voice = window.speechSynthesis.getVoices()[0];
};