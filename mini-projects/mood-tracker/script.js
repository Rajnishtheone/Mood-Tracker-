// Array to store mood history
let moodHistory = [];

// Function to log mood
function logMood() {
    const moodSelect = document.getElementById('mood-select');
    const noteInput = document.getElementById('note');
    const selectedMood = moodSelect.value;
    const moodEmoji = moodSelect.options[moodSelect.selectedIndex].text;
    const note = noteInput.value.trim();

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Check if maximum entries (4) for the day have been reached
    const todaysEntries = moodHistory.filter(entry => entry.date === date);
    if (todaysEntries.length >= 4) {
        showMessage('Maximum of 4 entries allowed per day.', 'error');
        return;
    }

    // Add mood to history
    moodHistory.push({ mood: selectedMood, emoji: moodEmoji, date: date, time: time, note: note });

    // Clear the note input
    noteInput.value = '';

    // Show success message
    showMessage('Mood logged successfully!', 'success');

    // Update mood history display
    updateMoodHistory();
}

// Function to show messages
function showMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = type; // Add class for styling

    // Clear message after 3 seconds
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.className = '';
    }, 3000);
}

// Function to update mood history display
function updateMoodHistory() {
    const tableBody = document.querySelector('#mood-table tbody');
    tableBody.innerHTML = ''; // Clear previous entries

    moodHistory.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.time}</td>
            <td>${entry.emoji}</td>
            <td>${entry.note || '-'}</td>
            <td class="actions">
                <button onclick="editMood(${index})">✏️</button>
                <button onclick="deleteMood(${index})">🗑️</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit a mood entry
function editMood(index) {
    const entry = moodHistory[index];
    const newNote = prompt('Edit your note:', entry.note);
    if (newNote !== null) {
        entry.note = newNote.trim();
        updateMoodHistory();
    }
}

// Function to delete a mood entry
function deleteMood(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        moodHistory.splice(index, 1);
        updateMoodHistory();
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const themeButton = document.getElementById('theme-button');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeButton.textContent = '☀️ Light Mode';
    } else {
        themeButton.textContent = '🌙 Dark Mode';
    }
}

// Function to toggle mood history visibility
function toggleHistory() {
    const historySection = document.getElementById('mood-history');
    if (historySection.style.display === 'none') {
        historySection.style.display = 'block';
        document.getElementById('toggle-history').textContent = 'Hide Mood History';
    } else {
        historySection.style.display = 'none';
        document.getElementById('toggle-history').textContent = 'Show Mood History';
    }
}

// Event listeners
document.getElementById('log-mood').addEventListener('click', logMood);
document.getElementById('theme-button').addEventListener('click', toggleDarkMode);
document.getElementById('toggle-history').addEventListener('click', toggleHistory);