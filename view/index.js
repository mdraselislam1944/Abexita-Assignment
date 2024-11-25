/* eslint-disable prettier/prettier */
const recognition =
  'SpeechRecognition' in window
    ? new SpeechRecognition()
    : 'webkitSpeechRecognition' in window
      ? new webkitSpeechRecognition()
      : null;

if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  const voiceButton = document.getElementById('voice-button');
  const searchInput = document.getElementById('voice-search');
  const searchForm = document.getElementById('searchInformation');


  voiceButton.addEventListener('click', () => {
    recognition.start();
  });


  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  recognition.onend = () => {
    console.log('Speech recognition ended.');
  };


  searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const searchValue = searchInput.value;
    console.log('Search Value:', searchValue);

  });
} else {
  alert('Your browser does not support speech recognition.');
}
