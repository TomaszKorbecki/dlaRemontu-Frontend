export function ProductInfoBox({ product }) {
    return `
      <div class="rounded-xl p-6">
        <h3 class="font-semibold mb-3">O produkcie</h3>
  
        <ul class="text-sm text-stone-600 space-y-2 list-disc list-inside">
          <li>Producent: ${product.attributes?.brand || '—'}</li>
          <li>Pojemność: ${product.attributes?.capacity || '—'}</li>
          <li>Kolor: ${product.attributes?.color || '—'}</li>
        </ul>
      </div>
    `;
  }  