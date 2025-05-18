document.addEventListener('DOMContentLoaded', () => {
  fetch('data/artworks.json')
    .then(resp => resp.json())
    .then(artworks => {
      const gallery = document.getElementById('gallery');
      artworks.forEach((art, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'thumbnail';
        wrapper.dataset.index = index;

        const img = document.createElement('img');
        img.src = art.image;
        img.alt = art.title;

        wrapper.appendChild(img);
        gallery.appendChild(wrapper);
      });

      gallery.addEventListener('click', (e) => {
        const thumb = e.target.closest('.thumbnail');
        if (thumb) {
          const art = artworks[thumb.dataset.index];
          showOverlay(art);
        }
      });
    });

  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('close');
  closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.add('hidden');
  });
});

function showOverlay(art) {
  document.getElementById('overlay-image').src = art.image;
  document.getElementById('overlay-title').textContent = art.title;
  document.getElementById('overlay-description').textContent = art.description;
  document.getElementById('overlay-date').textContent = art.generated_at;
  document.getElementById('overlay-prompt').textContent = art.prompt;
  document.getElementById('overlay-weather').textContent = art.weather;
  document.getElementById('overlay-weather-prompt').textContent = art.weather_prompt;
  document.getElementById('overlay').classList.remove('hidden');
}
