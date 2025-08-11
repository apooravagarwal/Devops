// Load and display content
function loadContent() {
  const content = localStorageService.getContentList();
  const list = document.getElementById('contentList');
  list.innerHTML = '';
  content.forEach(item => {
    const li = document.createElement('li');
    li.className = "flex justify-between items-center py-2";
    li.innerHTML = `
      <span>${item.name}</span>
      <button data-id="${item.id}" class="deleteBtn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Handle file upload (simulate)
document.getElementById('uploadForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('contentFile');
  const uploadMsg = document.getElementById('uploadMsg');
  if (!fileInput.files.length) return;
  const file = fileInput.files[0];
  const item = {
    id: Date.now().toString(),
    name: file.name
  };
  localStorageService.addContent(item);
  uploadMsg.textContent = "Upload successful!";
  loadContent();
});

// Handle delete
document.getElementById('contentList').addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteBtn')) {
    const id = e.target.getAttribute('data-id');
    localStorageService.deleteContent(id);
    loadContent();
  }
});

// Initial load
loadContent();