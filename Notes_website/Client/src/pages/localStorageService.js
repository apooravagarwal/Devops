const STORAGE_KEY = 'contentList';
const MAX_SIZE_MB = 2; // 2MB limit for safety

// Get all content
function getContentList() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Add new content (object: { id, name, ... })
function addContent(item) {
  const list = getContentList();
  list.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Delete content by id
function deleteContent(id) {
  let list = getContentList();
  list = list.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Clear all content (for testing)
function clearContent() {
  localStorage.removeItem(STORAGE_KEY);
}

// Export functions (for use in script tags)
window.localStorageService = {
  getContentList,
  addContent,
  deleteContent,
  clearContent
};

document.getElementById('uploadForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('contentFile');
  const uploadMsg = document.getElementById('uploadMsg');
  if (!fileInput.files.length) return;
  const file = fileInput.files[0];
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    uploadMsg.textContent = "File too large. Please upload files smaller than 2MB.";
    return;
  }
  const reader = new FileReader();
  reader.onload = function(ev) {
    const item = {
      id: Date.now().toString(),
      name: file.name,
      content: ev.target.result // Base64 string
    };
    localStorageService.addContent(item);
    uploadMsg.textContent = "Upload successful!";
    loadContent();
  };
  reader.readAsDataURL(file);
});