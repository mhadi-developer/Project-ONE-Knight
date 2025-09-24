// Initialize Isotope
const grid = document.querySelector('.grid');
const iso = new Isotope(grid, {
  itemSelector: '.grid-item',
  layoutMode: 'masonry',
  percentPosition: true
});

// Relayout after images load
imagesLoaded(grid, () => {
  iso.layout();
});

// Filter buttons
document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter');
    iso.arrange({ filter: filterValue });
  });
});

// Initialize LightGallery (only target zoom icons)
lightGallery(document.getElementById('lightgallery'), {
  selector: '.icons .icon[href*="picsum"]',
  plugins: [lgZoom, lgThumbnail],
  speed: 400
});
