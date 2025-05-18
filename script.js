document.addEventListener('DOMContentLoaded', () => {
  fetch('data/artworks.json')
    .then(resp => resp.json())
    .then(artworks => {
      const gallery = document.getElementById('gallery');
      artworks.forEach((art, index) => {
        const container = document.createElement('div');
        container.className = 'thumb';
        const img = document.createElement('img');
        img.src = art.image;
        img.alt = art.title;
        img.dataset.index = index;
        container.appendChild(img);
        gallery.appendChild(container);
      });

      gallery.addEventListener('click', (e) => {
        const img = e.target.closest('.thumb img');
        if (img) {
          const art = artworks[img.dataset.index];
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
  const imgEl = document.getElementById('overlay-image');
  imgEl.src = art.image;
  imgEl.alt = art.title;
  document.getElementById('overlay-title').textContent = art.title;
  document.getElementById('overlay-description').textContent = art.description;
  document.getElementById('overlay-date').textContent = art.generated_at;
  document.getElementById('overlay-prompt').textContent = art.prompt;
  document.getElementById('overlay-weather').textContent = art.weather;
  document.getElementById('overlay-weather-prompt').textContent = art.weather_prompt;
  document.getElementById('overlay').classList.remove('hidden');
}
