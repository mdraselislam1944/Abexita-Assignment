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

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchValue = searchInput.value;
    if (searchValue.trim()) {
      try {
        const response = await fetch(
          `http://localhost:5000/doctor?keywords=${encodeURIComponent(searchValue)}`,
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Search Results:', result);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      console.log('Search input is empty');
    }
  });
} else {
  alert('Your browser does not support speech recognition.');
}
