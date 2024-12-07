
let currentIndex = 0;
const images = document.querySelectorAll('.gallery a');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const caption = document.getElementById('caption');
function openLightbox(index) {
    currentIndex = index;
    const img = images[index].getElementsByTagName('img')[0];
    lightbox.style.display = 'block';
    lightboxContent.src = images[index].href;
    caption.innerHTML = images[index].getAttribute('data-title');
}
   function closeLightbox() {
    lightbox.style.display = 'none';
}
function changeSlide(n) {
    currentIndex += n;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    openLightbox(currentIndex);
}
   document.querySelector('.close').addEventListener('click', closeLightbox);

images.forEach((image, index) => {
    image.addEventListener('click', (event) => {
        event.preventDefault();
        openLightbox(index);
      });
});
