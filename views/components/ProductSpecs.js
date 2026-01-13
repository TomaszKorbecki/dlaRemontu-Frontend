export function ProductSpecs({ specs = {} }) {
    const {
      area = 'Wewnątrz',
      coats = 2,
      dryingTime = '2 h',
      temperature = '10–28°C'
    } = specs;
  
    return `
      <div class="rounded-xl bg-[#f7f7f7] p-6">
        <h3 class="font-semibold mb-4">Warto wiedzieć</h3>
        <div class="grid grid-cols-2 gap-3 text-sm text-stone-600">
          <div><b>Obszar:</b> ${area}</div>
          <div><b>Liczba warstw:</b> ${coats}</div>
          <div><b>Czas schnięcia:</b> ${dryingTime}</div>
          <div><b>Temperatura:</b> ${temperature}</div>
        </div>
      </div>
    `;
  }
  