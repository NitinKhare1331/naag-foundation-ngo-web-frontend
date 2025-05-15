const galleryModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const galleryContainer = document.getElementById('gallery-container');

function openModal(src) {
    modalImg.src = src;
    galleryModal.classList.remove('opacity-0', 'pointer-events-none');
    galleryModal.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    galleryModal.classList.add('opacity-0');
    galleryModal.classList.remove('opacity-100');
    setTimeout(() => {
        galleryModal.classList.add('pointer-events-none');
        modalImg.src = '';
        document.body.style.overflow = '';
    }, 300);
}

galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) closeModal();
});