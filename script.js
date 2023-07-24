const counters = new Array(50).fill(0);
const sheetId = '1LCIAHfP6AkAFqfVhUKCN5NTR--bYrbGhrD3GK7t6qjE'; // Replace with your Google Sheets ID

// Load saved counter data from localStorage if available
for (let i = 0; i < counters.length; i++) {
  const savedCount = localStorage.getItem(`counter_${i + 1}`);
  if (savedCount !== null) {
    counters[i] = parseInt(savedCount);
    updateCount(i + 1);
  }
}

function increment(counterIndex) {
  counters[counterIndex - 1]++;
  updateCount(counterIndex);
  saveCounterData();
  sendDataToGoogleSheets(counterIndex, counters[counterIndex - 1]);
}

function decrement(counterIndex) {
  if (counters[counterIndex - 1] > 0) {
    counters[counterIndex - 1]--;
    updateCount(counterIndex);
    saveCounterData();
    sendDataToGoogleSheets(counterIndex, counters[counterIndex - 1]);
  }
}

function reset(counterIndex) {
  counters[counterIndex - 1] = 0;
  updateCount(counterIndex);
  saveCounterData();
  sendDataToGoogleSheets(counterIndex, 0);
}

function updateCount(counterIndex) {
  const countElement = document.getElementById('count' + counterIndex);
  countElement.textContent = counters[counterIndex - 1];
}

function saveCounterData() {
  for (let i = 0; i < counters.length; i++) {
    localStorage.setItem(`counter_${i + 1}`, counters[i]);
  }
}

function sendDataToGoogleScript(counterIndex, countValue) {
  const data = {
    counterIndex: counterIndex,
    countValue: countValue
  };
}
function resetAllCounters() {
  for (let i = 0; i < counters.length; i++) {
    counters[i] = 0;
    updateCount(i + 1);
  }
  saveCounterData();
  sendAllDataToGoogleSheets();
}


// Your existing code...

function sendDataToGoogleScript(counterIndex, countValue) {
  const data = {
    counterIndex: counterIndex,
    countValue: countValue
  };

  const url = 'https://script.google.com/macros/s/AKfycbxaQj9aA-9bISMZ3DCXFValohUlMLzHmEkrj6gPtrJKikTu-5ZdA9rAMAPXws-Gv970/exec';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .catch(error => console.error('Error sending data to Google Sheets:', error));
}



// Function to handle the submit button click
function submit() {
  sendDataToGoogleSheets();
  alert('Data submitted to Google Sheets successfully!');
}


