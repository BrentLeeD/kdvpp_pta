﻿// Constants
const apiEndpoint = 'https://api.ai21.com/studio/v1/j2-ultra/complete';
const apiKey = 'YOUR_API_KEY'; // Fill in your API key here
const nudgeList = [
  "🌞 RISE to a new day",
  "🆕 New day, new you",
  "⏰ Time to get focused", 
"📈  Make today count",
"🐱 🏍Are you ready to take a step out of your comfort zone today?",
"🌻  Ready to start your day off right?",
"🍏 Let's crush your goals together today!",
"☀️  The day is what you make it. Make it great!",
"🔥 Seize this moment",
"🚦 Your morning routine is ready, are you?",
"🔔 Its time to make a winning choice"
];

// Event listeners
document.addEventListener('DOMContentLoaded', displayStoredNudges);

// Functions
function displayStoredNudges() {
  const storedNudges = JSON.parse(localStorage.getItem('nudges') || '[]');
  const nudgesContainer = document.getElementById('nudgesContainer');
  nudgesContainer.innerHTML = '';

  storedNudges.forEach((nudge) => {
    const nudgeElement = document.createElement('div');
    nudgeElement.classList.add('nudge');
    nudgeElement.textContent = nudge.text;
    nudgesContainer.appendChild(nudgeElement);
  });
}

function saveNudgeToLocalStorage(nudge) {
  const storedNudges = JSON.parse(localStorage.getItem('nudges') || '[]');
  storedNudges.push(nudge);
  localStorage.setItem('nudges', JSON.stringify(storedNudges));
  displayStoredNudges();
}

async function generateNewNudge() {
  const promptText = prompt('Enter a theme or emoji for the new nudge:');
  if (!promptText) return;

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${{ai21s}}',
      },
      body: JSON.stringify({
        prompt: `Please write an HTML application called "Nudge me out of bed" for a performance coach that uses whatsapp to communicate with his clients. It generates a very brief statement each day that the coach will send to their coachees that encourage them to get out of bed and start their morning routine. 🌞 RISE to a new day \n🆕 New day, new you  \n⏰  Time to get focused  \n📈  Make today count  \n🐱 🏍Are you ready to take a step out of your comfort zone today?\n🌻  Ready to start your day off right?\n🍏 Let's crush your goals together today!\n☀️  The day is what you make it. Make it great!\n🔥 Seize this moment\n🚦 Your morning routine is ready, are you?\n🔔 Its time to make a winning choice\n🚀 BOOST your day with a big dose of inspiration\n⚡Time to get your power on\n🧘‍Meditate your way to a great day\n🆕 A new day brings new opportunities\n📍 Checkin and see how far you've come!\n📆 Its time to get accountable\n⏳ Don't let this day pass you by\n✨A new day means new possibilities\n🥊 Fall down 7 times, rise up 8\n🎬 It's time to take action\n⏰ Wake your mind, body and soul up\n😊 Start your day with a winning mindset\n\nIn this application, the coach has 3 options to select a nudge:\n1. Search through all the preset nudges  (the ones above) using any search term.\n2. Generate a new nudge based on a theme or emoji provided by the user. \n3. Randomly generate a new nudge.\n\nOnce the coach has found the nudge they want  to use, they click on it at which point the system prompts the coach for the date on which the nudge is being used and locally stores the nudge selection along with the date. This means that the coach will be able to see which nudges they used and when so as to avoid repetition.\n\nFor example, if the coach says that he wants to generate a new nudge and provides the following input as a seed for the generation \"🎬\", you would generate something new and original like this:\n🎬 Lights, camera Action. It's time to take the first step towards your goals!\nOr if he entered ${promptText}, you would generate text or and a new emoji that relate to that particular prompt like:\n`,
        numResults: 1,
        epoch: undefined,
        maxTokens: 90,
        temperature: 0.80,
        topKReturn: 0,
        topP: 1,
        countPenalty: { scale: 0, applyToNumbers: false, applyToPunctuations: false, applyToStopwords: false, applyToWhitespaces: false, applyToEmojis: false },
        frequencyPenalty: { scale: 50, applyToNumbers: false, applyToPunctuations: false, applyToStopwords: false, applyToWhitespaces: false, applyToEmojis: false },
        presencePenalty: { scale: 0, applyToNumbers: false, applyToPunctuations: false, applyToStopwords: false, applyToWhitespaces: false, applyToEmojis: false },
        stopSequences: ["↵"]
      }),
    });
    const data = await response.json();
    const newNudge = data.completions[0].data.text;
    saveNudgeToLocalStorage({ date: new Date().toISOString().split('T')[0], text: newNudge });
  } catch (error) {
    console.error('Error generating new nudge:', error);
    alert('Error generating new nudge. Please try again later.');
  }
}

function generateRandomNudge() {
  const randomIndex = Math.floor(Math.random() * nudgeList.length);
  const randomNudge = nudgeList[randomIndex];
  saveNudgeToLocalStorage({ date: new Date().toISOString().split('T')[0], text: randomNudge });
}

function searchNudges() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredNudges = nudgeList.filter(nudge => nudge.toLowerCase().includes(searchInput));
  const nudgesContainer = document.getElementById('nudgesContainer');
  nudgesContainer.innerHTML = '';

  filteredNudges.forEach((nudge) => {
    const nudgeElement = document.createElement('div');
    nudgeElement.classList.add('nudge');
    nudgeElement.textContent = nudge;
    nudgesContainer.appendChild(nudgeElement);
  });
}
// Event listeners
document.addEventListener('DOMContentLoaded', displayStoredNudges);

// Functions
function displayStoredNudges() {
  const storedNudges = JSON.parse(localStorage.getItem('nudges') || '[]');
  const nudgesContainer = document.getElementById('nudgesContainer');
  nudgesContainer.innerHTML = '';

  storedNudges.forEach((nudge) => {
    const nudgeElement = document.createElement('div');
    nudgeElement.classList.add('nudge');
    nudgeElement.innerHTML = `<span>${nudge.text}</span><span class="nudge-date">${nudge.date}</span>`;
    nudgeElement.addEventListener('click', () => copyNudgeToClipboard(nudge.text));
    nudgesContainer.appendChild(nudgeElement);
  });
}

function copyNudgeToClipboard(nudgeText) {
  const dummyTextArea = document.createElement('textarea');
  dummyTextArea.value = nudgeText;
  document.body.appendChild(dummyTextArea);
  dummyTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(dummyTextArea);
  alert('Nudge copied to clipboard!');
}
