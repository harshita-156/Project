const notesContainer = document.getElementById('notes-container');
const addNoteButton = document.getElementById('add-note');
const themeToggle = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme
document.body.dataset.theme = currentTheme;
themeToggle.textContent = currentTheme === 'dark' ? '☀' : '🌙';

// Switch themes
themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.dataset.theme = currentTheme;
  themeToggle.textContent = currentTheme === 'dark' ? '☀' : '🌙';
  localStorage.setItem('theme', currentTheme);
});

// Load notes from local storage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(note => createNoteElement(note.content, note.color));
}

// Save notes to local storage
function saveNotes() {
  const notes = Array.from(document.querySelectorAll('.note')).map(note => ({
    content: note.querySelector('textarea').value,
    color: note.style.backgroundColor,
  }));
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Create a new note
// function createNoteElement(content = '', color = '') {
//   const note = document.createElement('div');
//   note.className = 'note';
//   note.style.backgroundColor = color;

//   const textarea = document.createElement('textarea');
//   textarea.value = content;
//   textarea.addEventListener('input', saveNotes);

//   const deleteButton = document.createElement('div');
//   deleteButton.className = 'delete';
//   deleteButton.textContent = '✖';
//   deleteButton.addEventListener('dblclick', () => {
//     if (confirm('Are you sure you want to delete this note?')) {
//       note.remove();
//       saveNotes();
//     }
//   });

//   note.appendChild(textarea);
//   note.appendChild(deleteButton);
//   notesContainer.appendChild(note);
// }
function createNoteElement(content = '', color = '') {
  const note = document.createElement('div');
  note.className = 'note';
  note.style.backgroundColor = color;

  const textarea = document.createElement('textarea');
  textarea.value = content;
  textarea.disabled = true; // Initially disabled to make the note non-editable
  textarea.addEventListener('input', saveNotes);

  // Edit Button
  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    if (textarea.disabled) {
      textarea.disabled = false; // Enable editing
      editButton.textContent = 'Save'; // Change button to Save
    } else {
      textarea.disabled = true; // Disable editing
      editButton.textContent = 'Edit'; // Change button back to Edit
      saveNotes(); // Save changes
    }
  });

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this note?')) {
      note.remove();
      saveNotes();
    }
  });

  // Append elements to the note
  note.appendChild(textarea);
  note.appendChild(editButton);
  note.appendChild(deleteButton);
  notesContainer.appendChild(note);
}


// Add new note button functionality
addNoteButton.addEventListener('click', () => createNoteElement());

// Load saved notes on page load
loadNotes();
