document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Typewriter Effect ---
    const titleElement = document.getElementById('dynamic-title');
    const titles = ["Unity Developer", "Game Programmer"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentTitle = titles[titleIndex];
        let speed = 150; // Typing speed

        if (isDeleting) {
            // Handle deleting
            speed = 75; // Deleting speed
            titleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Handle typing
            titleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        // Check if word is complete
        if (!isDeleting && charIndex === currentTitle.length) {
            speed = 2000; // Pause after typing
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, speed);
    }
    // Start the effect
    typeEffect();


    // --- Image Gallery and Modal Logic (existing code) ---
    const modal = document.getElementById('image-viewer-modal');
    const modalImage = document.getElementById('modal-image');
    const imageCounter = document.getElementById('image-counter');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentImages = [];
    let currentIndex = 0;

    // Function to open the modal
    function openModal(images, index) {
        currentImages = images;
        currentIndex = index;
        updateModalImage();
        modal.style.display = 'flex';
        document.addEventListener('keydown', handleKeyboardNav);
    }

    function updateModalImage() {
        modalImage.src = currentImages[currentIndex];
        imageCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
        document.removeEventListener('keydown', handleKeyboardNav);
    }

    // Function to show the next image
    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateModalImage();
    }

    // Function to show the previous image
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateModalImage();
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

    // Keyboard navigation
    function handleKeyboardNav(e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowRight') showNextImage();
            else if (e.key === 'ArrowLeft') showPrevImage();
            else if (e.key === 'Escape') closeModal();
        }
    }

    // Build the image galleries for each project
    // Build the project cards (set background image)
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const images = JSON.parse(project.dataset.images);

        if (images.length > 0) {
            // Start with loading state
            project.classList.add('loading');

            // Create a temporary image to load
            const img = new Image();
            img.onload = () => {
                project.style.backgroundImage = `url('${images[0]}')`;
                project.classList.remove('loading');
            };
            img.onerror = () => {
                project.classList.remove('loading');
                project.style.backgroundImage = 'none'; // Clear if fails
                // Optional: set a fallback icon or color here if needed
            };
            img.src = images[0];
        }

        // Preload images on hover
        project.addEventListener('mouseenter', () => {
            images.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }, { once: true }); // Only run once per project

        project.addEventListener('click', () => {
            const title = project.querySelector('h3').innerText;
            const description = project.querySelector('p').innerText;
            const link = project.dataset.link;

            openProjectDetails(title, description, link, images);
        });
    });

    // --- Project Detail Modal Logic ---
    const projectModal = document.getElementById('project-detail-modal');
    const projectModalTitle = document.getElementById('project-modal-title');
    const projectModalDesc = document.getElementById('project-modal-description');
    const projectModalLink = document.getElementById('project-modal-link');
    const projectModalGallery = document.getElementById('project-modal-gallery');

    // Close modal logic (x button handled inline in HTML, need background click)
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    function openProjectDetails(title, desc, link, images) {
        projectModalTitle.textContent = title;
        projectModalDesc.textContent = desc;
        projectModalLink.href = link;

        // Clear previous gallery content
        projectModalGallery.innerHTML = '';

        if (images.length === 0) {
            projectModal.style.display = 'flex'; // Just show info if no images
            return;
        }

        // --- Build Steam-Style Gallery ---
        const steamGallery = document.createElement('div');
        steamGallery.className = 'steam-gallery';

        let localCurrentIndex = 0;

        // 1. Featured Image Container
        const featuredWrapper = document.createElement('div');
        featuredWrapper.className = 'steam-featured loading';

        // Background Blurred Image (for fill effect)
        const featuredBg = document.createElement('img');
        featuredBg.className = 'steam-featured-bg';
        featuredBg.src = images[0];

        // Main Foreground Image
        const featuredImg = document.createElement('img');
        featuredImg.className = 'steam-featured-fg';
        featuredImg.src = images[0];

        featuredImg.onload = () => featuredWrapper.classList.remove('loading');

        // Click to zoom (opens the full screen viewer)
        featuredWrapper.onclick = () => {
            openModal(images, localCurrentIndex);
        };

        featuredWrapper.appendChild(featuredBg);
        featuredWrapper.appendChild(featuredImg);
        steamGallery.appendChild(featuredWrapper);

        // 2. Thumbnails Strip (if more than 1 image)
        if (images.length > 1) {
            const thumbsContainer = document.createElement('div');
            thumbsContainer.className = 'steam-thumbs-scroll';

            images.forEach((imgSrc, index) => {
                const thumb = document.createElement('div');
                thumb.className = 'steam-thumb';
                if (index === 0) thumb.classList.add('active'); // First one active by default

                const thumbImg = document.createElement('img');
                thumbImg.src = imgSrc; // Keep thumbnails low-res for performance

                // Thumbnail Click Interaction
                thumb.onclick = (e) => {
                    e.stopPropagation(); // Prevent modal close or other bubbles

                    // Update Featured Image with fade effect
                    if (localCurrentIndex !== index) {
                        featuredImg.style.opacity = '0.5';
                        featuredBg.style.opacity = '0.5';
                        setTimeout(() => {
                            featuredImg.src = imgSrc;
                            featuredBg.src = imgSrc;
                            featuredImg.style.opacity = '1';
                            featuredBg.style.opacity = '1';
                        }, 150);
                    }

                    // Update Active State
                    // (Using scope to find siblings easily)
                    const allThumbs = thumbsContainer.querySelectorAll('.steam-thumb');
                    allThumbs.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');

                    localCurrentIndex = index;
                };

                thumb.appendChild(thumbImg);
                thumbsContainer.appendChild(thumb);
            });
            steamGallery.appendChild(thumbsContainer);
        }

        projectModalGallery.appendChild(steamGallery);
        projectModal.style.display = 'flex';
    }
});

// --- Tab Functionality ---
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tab-content" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tab-btn" and remove the class "active"
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
