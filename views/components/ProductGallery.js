export function ProductGallery({ images = [] }) {
    if (!images.length) return '';
  
    return `
      <div class="p-4">
        <h3 class="font-semibold mb-3">Poglądowe zdjęcia</h3>
  
        <div class="flex gap-4">
          ${images.map(src => `
            <img
              src="${src}"
              class="w-24 h-24 object-contain border rounded-lg bg-white"
              loading="lazy"
            />
          `).join('')}
        </div>
      </div>
    `;
  }