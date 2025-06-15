const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal');

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
}

function openModal(countryName, posts) {
  modalTitle.textContent = countryName;
  modalContent.innerHTML = '';
  posts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'cursor-pointer';
    const escapedCaption = escapeHtml(p.caption);
    div.innerHTML = `
      <img src="${p.thumbnailUrl}" alt="${escapedCaption}" class="w-full h-auto rounded" />
      <p class="mt-2 text-sm">${escapedCaption}</p>
    `;
    div.addEventListener('click', () => {
      window.open(p.igPostUrl, '_blank');
    });
    modalContent.appendChild(div);
  });
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

window.openModal = openModal;
