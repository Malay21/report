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
  updateTable(); // Update the table to reflect the changes
}

function decrement(counterIndex) {
  if (counters[counterIndex - 1] > 0) {
    counters[counterIndex - 1]--;
    updateCount(counterIndex);
    saveCounterData();
    sendDataToGoogleSheets(counterIndex, counters[counterIndex - 1]);
    updateTable(); // Update the table to reflect the changes
  }
}

function reset(counterIndex) {
  counters[counterIndex - 1] = 0;
  updateCount(counterIndex);
  saveCounterData();
  sendDataToGoogleSheets(counterIndex, 0);
  updateTable(); // Update the table to reflect the changes
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

function sendDataToGoogleSheets(counterIndex, countValue) {
  const range = `Sheet1!A${counterIndex}`; // Replace 'Sheet1' with the name of your sheet if different
  const params = {
    values: [[countValue]]
  };
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?valueInputOption=RAW`;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer AIzaSyBpVhEbX91kpAtAQlFYdMWb1EStM8rSw6s', // Replace with your Google Sheets API key
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  .catch(error => console.error('Error sending data to Google Sheets:', error));
}

function updateTable() {
  const tableBody = document.getElementById('counterTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear existing table rows
  
  for (let i = 0; i < counters.length; i++) {
    const counterName = document.getElementById(`counter${i + 1}`).value || `Counter ${i + 1}`;
    const countValue = counters[i];

    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${counterName}</td>
      <td>${countValue}</td>
    `;
  }
}
