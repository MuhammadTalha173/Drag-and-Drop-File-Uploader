window.addEventListener('DOMContentLoaded', () => {
  const dropArea = document.getElementById('dropArea');
  const fileInput = document.getElementById('fileInput');
  const preview = document.getElementById('preview');
  const progress = document.getElementById('progress');
  const error = document.getElementById('error');

  const savedImage = localStorage.getItem('uploadedImage');
  if (savedImage) {
    preview.innerHTML = `<img src="${savedImage}" alt="Preview" class="img-fluid">`;
  }

  dropArea.addEventListener('click', () => fileInput.click());

  dropArea.addEventListener('dragover', e => {
    e.preventDefault();
    dropArea.classList.add('dragover');
  });

  dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
  });

  dropArea.addEventListener('drop', e => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      handleFile(fileInput.files[0]);
    }
  });

  function handleFile(file) {
    error.textContent = '';
    if (!file || !file.type.startsWith('image/')) {
      error.textContent = 'Invalid file type. Please upload an image.';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      preview.innerHTML = `<img src="${reader.result}" alt="Preview" class="img-fluid">`;
      localStorage.setItem('uploadedImage', reader.result);
      simulateUpload();
    };
    reader.readAsDataURL(file);
  }

  function simulateUpload() {
    progress.style.width = '0%';
    let width = 0;
    const interval = setInterval(() => {
      width += 10;
      progress.style.width = width + '%';
      if (width >= 100) clearInterval(interval);
    }, 100);
  }
});
