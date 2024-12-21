// Elementleri seçelim
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// LocalStorage'dan notları yükle
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notesContainer.innerHTML = ''; // Önce temizle
  notes.forEach((note, index) => {
    createNoteElement(note, index);
  });
}

// Yeni not ekle
function addNote() {
  const noteText = noteInput.value.trim();
  if (noteText === '') {
    alert('Lütfen bir not yazın!');
    return;
  }

  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(noteText);
  localStorage.setItem('notes', JSON.stringify(notes));

  createNoteElement(noteText, notes.length - 1);
  noteInput.value = ''; // Girişi temizle
}

// Notu HTML olarak ekle
function createNoteElement(noteText, index) {
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note';
  noteDiv.innerHTML = `
    ${noteText}
    <button onclick="deleteNote(${index})">X</button>
  `;
  notesContainer.appendChild(noteDiv);
}

// Notu sil
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
