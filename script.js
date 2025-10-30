document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-viewer-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentImages = [];
    let currentIndex = 0;

    // Function to open the modal
    function openModal(images, index) {
        currentImages = images;
        currentIndex = index;
        modalImage.src = currentImages[currentIndex];
        modal.style.display = 'flex';
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Function to show the next image
    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        modalImage.src = currentImages[currentIndex];
    }

    // Function to show the previous image
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        modalImage.src = currentImages[currentIndex];
    }

    // Event listeners for modal controls
    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    
    // Close modal if clicking on the background
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Build the image galleries for each project
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const galleryContainer = project.querySelector('.image-gallery');
        const images = JSON.parse(project.dataset.images);

        if (images.length === 0) return;

        // Display up to 3 images
        const displayImages = images.slice(0, 3);
        displayImages.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.classList.add('gallery-item');
            img.addEventListener('click', () => openModal(images, index));
            galleryContainer.appendChild(img);
        });

        // Add a "Show More" button if there are more than 3 images
        if (images.length > 3) {
            const remainingCount = images.length - 3;
            const showMoreBtn = document.createElement('div');
            showMoreBtn.classList.add('show-more-btn');
            showMoreBtn.textContent = `+${remainingCount}`;
            showMoreBtn.addEventListener('click', () => openModal(images, 3)); // Open modal starting from the 4th image
            galleryContainer.appendChild(showMoreBtn);
        }
    });
});
