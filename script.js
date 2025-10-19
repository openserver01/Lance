const todoList = document.getElementById('todoList');
const addBtn = document.getElementById('addBtn');
const deleteBtn = document.getElementById('deleteBtn');
const addSection = document.getElementById('addSection');
const confirmAdd = document.getElementById('confirmAdd');
const taskName = document.getElementById('taskName');
const taskDate = document.getElementById('taskDate');
const deleteAllContainer = document.getElementById('deleteAllContainer');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const themeToggle = document.getElementById('themeToggle');
const colorCircles = document.querySelectorAll('.color-circle');
const archiveSection = document.getElementById('archiveSection');
const archiveList = document.getElementById('archiveList');
const showArchive = document.getElementById('showArchive');
const closeArchive = document.getElementById('closeArchive');
const colorTitle = document.getElementById('accentBtn');
const colorOptions = document.querySelector('.color-options');

colorOptions.style.display = "none";
let deleteMode = false;

// --- Add button toggle ---
addBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  addSection.classList.toggle('hidden');
  sideMenu.classList.remove('show');
  deleteAllContainer.classList.add('hidden');
});

// Prevent closing when clicking inside add section
addSection.addEventListener('click', (e) => e.stopPropagation());

// --- Add new task ---
confirmAdd.addEventListener('click', () => {
  const name = taskName.value.trim();
  const date = taskDate.value;
  if (!name || !date) return alert("Please enter task name and date!");

  const li = document.createElement('li');
  li.innerHTML = `
    <label><input type="checkbox" class="checkTask"> ${name} <small>(${date})</small></label>
    <button class="delete-item">Delete</button>
  `;

  const checkbox = li.querySelector('.checkTask');
  checkbox.addEventListener('change', (e) => {
    li.classList.toggle('done', e.target.checked);
    if (e.target.checked) {
      const archived = li.cloneNode(true);
      archived.querySelector('.delete-item').remove();
      archiveList.appendChild(archived);
    }
  });

  li.querySelector('.delete-item').addEventListener('click', () => li.remove());
  todoList.appendChild(li);

  taskName.value = "";
  taskDate.value = "";
  addSection.classList.add('hidden');
});

// --- Delete mode ---
deleteBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  deleteMode = !deleteMode;
  toggleDeleteMode(deleteMode);
});

function toggleDeleteMode(active) {
  const items = todoList.querySelectorAll('li');
  items.forEach(li => li.classList.toggle('delete-mode', active));
  deleteAllContainer.classList.toggle('hidden', !active);
  addSection.classList.add('hidden');
}

// --- Delete All ---
deleteAllBtn.addEventListener('click', () => {
  if (confirm("Delete all tasks?")) {
    todoList.innerHTML = "";
    toggleDeleteMode(false);
    deleteMode = false;
  }
});

// --- Menu toggle ---
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  sideMenu.classList.toggle('show');
  addSection.classList.add('hidden');
  deleteAllContainer.classList.add('hidden');
});

// Prevent closing when clicking inside menu
sideMenu.addEventListener('click', (e) => e.stopPropagation());

// --- Hide things when clicking outside ---
document.addEventListener('click', (e) => {
  sideMenu.classList.remove('show');
  addSection.classList.add('hidden');
  toggleDeleteMode(false);
  deleteMode = false;
  colorOptions.style.display = "none";
});

// --- Theme toggle ---
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeToggle.checked);
  localStorage.setItem('darkMode', themeToggle.checked);
});
if (localStorage.getItem('darkMode') === 'true') {
  themeToggle.checked = true;
  document.body.classList.add('dark');
}

// --- Accent color selection ---
colorCircles.forEach(c => {
  c.addEventListener('click', () => {
    const color = c.dataset.color;
    const gradient = c.dataset.gradient;

    if (gradient) {
      document.documentElement.style.setProperty('--accent', gradient);
      document.body.style.background = gradient;
      localStorage.setItem('accent', gradient);
    } else {
      document.documentElement.style.setProperty('--accent', color);
      document.body.style.background = 'var(--bg)';
      localStorage.setItem('accent', color);
    }
  });
});

const savedColor = localStorage.getItem('accent');
if (savedColor) {
  document.documentElement.style.setProperty('--accent', savedColor);
  if (savedColor.includes('gradient')) document.body.style.background = savedColor;
}

// --- Show/hide color options ---
colorTitle.addEventListener('click', (e) => {
  e.stopPropagation();
  colorOptions.style.display = (colorOptions.style.display === "flex") ? "none" : "flex";
});

// --- Archive ---
showArchive.addEventListener('click', () => {
  archiveSection.classList.remove('hidden');
  sideMenu.classList.remove('show');
});
closeArchive.addEventListener('click', () => {
  archiveSection.classList.add('hidden');
});￼Enter
