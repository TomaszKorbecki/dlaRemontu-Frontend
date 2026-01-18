// views/components/ProductConfigurator.js

export function ProductConfigurator({ state }) {
    state.selectedVariant ??= {
      color: 'cream',
      capacity: '2.5'
    };
  
    return `
      <section class="product-configurator">
        <h4 class="config-title">Konfiguracja:</h4>
  
        <div class="config-row-inline">
          ${renderDropdown({
            key: 'color',
            label: 'Kolor:',
            options: [
              { id: 'cream', label: 'Kremowa biel' },
              { id: 'white', label: 'Biały' }
            ],
            selected: state.selectedVariant.color
          })}
  
          ${renderDropdown({
            key: 'capacity',
            label: 'Pojemność:',
            options: [
              { id: '2.5', label: '2.5 l' },
              { id: '5', label: '5 l' }
            ],
            selected: state.selectedVariant.capacity
          })}
        </div>
      </section>
    `;
  }
  
  function renderDropdown({ key, label, options, selected }) {
    const selectedLabel =
      options.find(o => o.id === selected)?.label ?? '';
  
    return `
      <div class="config-dropdown custom" data-config="${key}">
        <span class="config-label">${label}</span>
        <span class="config-value">${selectedLabel}</span>
        <i class="fa-solid fa-chevron-down config-chevron"></i>
  
        <div class="config-menu">
          ${options.map(o => `
            <button
              type="button"
              class="config-option ${o.id === selected ? 'active' : ''}"
              data-value="${o.id}"
            >
              ${o.label}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
  