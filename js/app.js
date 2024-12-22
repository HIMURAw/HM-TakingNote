// Elementleri seçelim
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notesContainer.innerHTML = ''; // Önce temizle
  notes.forEach((note, index) => {
    createNoteElement(note, index); // Her bir notu ve butonlarını ekle
  });
}
// Yeni not ekle
function addNote() {
  const noteText = noteInput.value.trim();
  if (noteText === '') {
    alert('Lütfen bir not yazın!');
    return;
  }

  const date = new Date();
  const formatDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push({text: noteText, date: formatDate});
  localStorage.setItem('notes', JSON.stringify(notes));

  createNoteElement(noteText, notes.length - 1);
  noteInput.value = ''; // Girişi temizle
}

function createNoteElement(note, index) {
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note';
  noteDiv.innerHTML = `
    ${note.text} <br>
    <small>${note.date}</small>
    <button onclick="deleteNote(${index})" class="note-btn delete-btn">X</button>
    <button onclick="editNote(${index})" style="display: flex; margin-right: 50px; background-color: green;" class="note-btn edit-btn">Edit</button>
  `;
  notesContainer.appendChild(noteDiv);
}

function editNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const newNoteText = prompt('Düzenlemek istediğiniz notu girin:', notes[index].text);
  if (newNoteText !== null && newNoteText.trim() !== '') {
    notes[index].text = newNoteText; // Notu güncelle
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes(); // Güncellenmiş notları yükle
  }
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1); // Notu listeden çıkar
  localStorage.setItem('notes', JSON.stringify(notes));
  loadNotes(); // Güncellenmiş notları yükle
}

// Event Listener
addNoteBtn.addEventListener('click', addNote);

// Sayfa yüklendiğinde notları yükle
window.onload = loadNotes;

