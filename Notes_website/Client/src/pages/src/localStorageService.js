const STORAGE_KEY = 'contentList';

function getContentList() {
  const data = localStorage.getItem('contentList');
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // If corrupted, clear it and return empty
    localStorage.removeItem('contentList');
    return [];
  }
}

function addContent(item) {
  const list = getContentList();
  list.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

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
  const reader = new FileReader();
  reader.onload = function(ev) {
    const item = {
      id: Date.now().toString(),
      name: file.name,
      content: ev.target.result // Base64 string
    };
    try {
      // Check for duplicate file names
      const existingContent = localStorageService.getContentList();
      if (existingContent.some(item => item.name === file.name)) {
        throw new Error("A file with this name already exists!");
      }
      localStorageService.addContent(item);
      uploadMsg.textContent = "Upload successful!";
      loadContent();
    } catch (error) {
      uploadMsg.textContent = error.message;
    }
  };
  reader.readAsDataURL(file);
});