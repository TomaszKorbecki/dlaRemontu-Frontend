export function ProductDescription({ description }) {
    if (!description) return '';
  
    return `
      <div class="p-6 text-sm text-stone-600 leading-relaxed text-justify hyphens-auto">
        <h3 class="font-semibold mb-3">Opis produktu</h3>
        <p>
          ${description}
        </p>
      </div>
    `;
  }