/**
 * Componente de Autocompletado Avanzado para Vehículos
 * Integrable con cualquier input del formulario
 */

class AutocompleteInput {
    constructor(inputElement, options = {}) {
        this.input = inputElement;
        this.options = {
            minLength: 1,
            maxResults: 8,
            placeholder: 'Empieza a escribir...',
            noResultsText: 'No se encontraron resultados',
            loadingText: 'Buscando...',
            searchDelay: 150,
            ...options
        };
        
        this.isOpen = false;
        this.selectedIndex = -1;
        this.results = [];
        this.searchTimeout = null;
        
        this.init();
    }

    init() {
        this.createDropdown();
        this.bindEvents();
        this.input.setAttribute('autocomplete', 'off');
        this.input.setAttribute('spellcheck', 'false');
    }

    createDropdown() {
        // Crear contenedor del dropdown
        this.container = document.createElement('div');
        this.container.className = 'autocomplete-container';
        this.container.style.position = 'relative';
        this.container.style.display = 'inline-block';
        this.container.style.width = '100%';

        // Crear dropdown
        this.dropdown = document.createElement('div');
        this.dropdown.className = 'autocomplete-dropdown';
        this.dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--secondary-color, #1a1a1a);
            border: 1px solid var(--border-color, #333);
            border-radius: var(--border-radius, 0.5rem);
            box-shadow: var(--shadow-lg, 0 20px 40px rgba(0, 0, 0, 0.2));
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            margin-top: 4px;
        `;

        // Insertar en el DOM
        this.input.parentNode.insertBefore(this.container, this.input);
        this.container.appendChild(this.input);
        this.container.appendChild(this.dropdown);
    }

    bindEvents() {
        // Input events
        this.input.addEventListener('input', (e) => this.handleInput(e));
        this.input.addEventListener('focus', (e) => this.handleFocus(e));
        this.input.addEventListener('blur', (e) => this.handleBlur(e));
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Dropdown events
        this.dropdown.addEventListener('mousedown', (e) => e.preventDefault());
        this.dropdown.addEventListener('click', (e) => this.handleClick(e));

        // Document click to close
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.close();
            }
        });
    }

    handleInput(e) {
        const query = e.target.value.trim();
        
        // Clear previous timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        // Debounce search
        this.searchTimeout = setTimeout(() => {
            this.search(query);
        }, this.options.searchDelay);
    }

    handleFocus(e) {
        const query = e.target.value.trim();
        if (query.length >= this.options.minLength) {
            this.search(query);
        }
    }

    handleBlur(e) {
        // Delay close to allow click on dropdown
        setTimeout(() => {
            if (!this.dropdown.matches(':hover')) {
                this.close();
            }
        }, 150);
    }

    handleKeydown(e) {
        if (!this.isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectNext();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.selectPrevious();
                break;
            case 'Enter':
                e.preventDefault();
                this.selectCurrent();
                break;
            case 'Escape':
                e.preventDefault();
                this.close();
                break;
        }
    }

    handleClick(e) {
        const item = e.target.closest('.autocomplete-item');
        if (item) {
            const value = item.dataset.value;
            const display = item.dataset.display || value;
            this.selectValue(value, display);
        }
    }

    async search(query) {
        if (query.length < this.options.minLength) {
            this.close();
            return;
        }

        this.showLoading();

        try {
            const results = await this.options.searchFunction(query);
            this.showResults(results);
        } catch (error) {
            console.error('Search error:', error);
            this.showError();
        }
    }

    showLoading() {
        this.dropdown.innerHTML = `
            <div class="autocomplete-item autocomplete-loading">
                <div class="loading-spinner"></div>
                ${this.options.loadingText}
            </div>
        `;
        this.open();
    }

    showResults(results) {
        this.results = results;
        this.selectedIndex = -1;

        if (results.length === 0) {
            this.dropdown.innerHTML = `
                <div class="autocomplete-item autocomplete-no-results">
                    ${this.options.noResultsText}
                </div>
            `;
        } else {
            this.dropdown.innerHTML = results.map((result, index) => 
                this.renderItem(result, index)
            ).join('');
        }

        this.open();
    }

    renderItem(result, index) {
        const value = typeof result === 'string' ? result : result.value;
        const display = typeof result === 'string' ? result : result.display || result.value;
        const subtitle = typeof result === 'object' ? result.subtitle : '';

        return `
            <div class="autocomplete-item" data-value="${this.escapeHtml(value)}" data-display="${this.escapeHtml(display)}" data-index="${index}">
                <div class="item-content">
                    <div class="item-title">${this.highlightMatch(display, this.input.value)}</div>
                    ${subtitle ? `<div class="item-subtitle">${subtitle}</div>` : ''}
                </div>
            </div>
        `;
    }

    highlightMatch(text, query) {
        if (!query) return this.escapeHtml(text);
        
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return this.escapeHtml(text).replace(regex, '<mark>$1</mark>');
    }

    showError() {
        this.dropdown.innerHTML = `
            <div class="autocomplete-item autocomplete-error">
                Error en la búsqueda. Inténtalo de nuevo.
            </div>
        `;
        this.open();
    }

    selectNext() {
        if (this.results.length === 0) return;
        
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
        this.updateSelection();
    }

    selectPrevious() {
        if (this.results.length === 0) return;
        
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        this.updateSelection();
    }

    selectCurrent() {
        if (this.selectedIndex >= 0 && this.results[this.selectedIndex]) {
            const result = this.results[this.selectedIndex];
            const value = typeof result === 'string' ? result : result.value;
            const display = typeof result === 'string' ? result : result.display || result.value;
            this.selectValue(value, display);
        }
    }

    updateSelection() {
        const items = this.dropdown.querySelectorAll('.autocomplete-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });

        // Scroll into view
        if (this.selectedIndex >= 0) {
            const selectedItem = items[this.selectedIndex];
            if (selectedItem) {
                selectedItem.scrollIntoView({ block: 'nearest' });
            }
        }
    }

    selectValue(value, display) {
        this.input.value = display || value;
        this.input.dataset.selectedValue = value;
        
        // Trigger change event
        this.input.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Custom select event
        this.input.dispatchEvent(new CustomEvent('autocomplete:select', {
            detail: { value, display },
            bubbles: true
        }));

        this.close();
    }

    open() {
        this.isOpen = true;
        this.dropdown.style.display = 'block';
        this.container.classList.add('autocomplete-open');
    }

    close() {
        this.isOpen = false;
        this.dropdown.style.display = 'none';
        this.container.classList.remove('autocomplete-open');
        this.selectedIndex = -1;
    }

    clear() {
        this.input.value = '';
        this.input.dataset.selectedValue = '';
        this.close();
    }

    destroy() {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.container.parentNode.insertBefore(this.input, this.container);
        this.container.remove();
    }

    // Utility methods
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    escapeRegex(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

/**
 * Integración específica para vehículos
 */
class VehicleAutocompleteManager {
    constructor() {
        this.autocomplete = new VehicleAutocomplete();
        this.brandInput = null;
        this.modelInput = null;
        this.brandAutocomplete = null;
        this.modelAutocomplete = null;
    }

    init(brandInputId, modelInputId) {
        this.brandInput = document.getElementById(brandInputId);
        this.modelInput = document.getElementById(modelInputId);

        if (!this.brandInput || !this.modelInput) {
            console.error('Brand or model input not found');
            return;
        }

        this.setupBrandAutocomplete();
        this.setupModelAutocomplete();
        this.bindEvents();
    }

    setupBrandAutocomplete() {
        this.brandAutocomplete = new AutocompleteInput(this.brandInput, {
            searchFunction: (query) => this.searchBrands(query),
            placeholder: 'Ej: BMW, Audi, Mercedes...',
            noResultsText: 'No se encontraron marcas'
        });
    }

    setupModelAutocomplete() {
        this.modelAutocomplete = new AutocompleteInput(this.modelInput, {
            searchFunction: (query) => this.searchModels(query),
            placeholder: 'Selecciona primero una marca',
            noResultsText: 'No se encontraron modelos'
        });

        // Disable model input initially
        this.modelInput.disabled = true;
    }

    bindEvents() {
        // When brand is selected, enable model input and clear it
        this.brandInput.addEventListener('autocomplete:select', (e) => {
            this.modelInput.disabled = false;
            this.modelInput.placeholder = 'Ej: Serie 3, A4, Clase C...';
            this.modelAutocomplete.clear();
        });

        // When brand input is cleared manually
        this.brandInput.addEventListener('input', (e) => {
            if (!e.target.value.trim()) {
                this.modelInput.disabled = true;
                this.modelInput.placeholder = 'Selecciona primero una marca';
                this.modelAutocomplete.clear();
            }
        });
    }

    async searchBrands(query) {
        // Simulate API delay for realism
        await new Promise(resolve => setTimeout(resolve, 50));
        
        const brands = this.autocomplete.searchBrands(query);
        return brands.map(brand => ({
            value: brand,
            display: brand,
            subtitle: `${this.autocomplete.getModelsByBrand(brand).length} modelos`
        }));
    }

    async searchModels(query) {
        const selectedBrand = this.brandInput.dataset.selectedValue || this.brandInput.value.trim();
        
        if (!selectedBrand) {
            return [];
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 50));

        const models = this.autocomplete.searchModels(selectedBrand, query);
        return models.map(model => ({
            value: model,
            display: model,
            subtitle: selectedBrand
        }));
    }
}

// CSS Styles for autocomplete
const autocompleteCSS = `
.autocomplete-container {
    position: relative;
}

.autocomplete-dropdown {
    font-family: var(--font-primary, 'Inter', sans-serif);
    font-size: 0.9rem;
}

.autocomplete-item {
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid var(--border-color, #333);
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 12px;
}

.autocomplete-item:last-child {
    border-bottom: none;
}

.autocomplete-item:hover,
.autocomplete-item.selected {
    background-color: var(--accent-color, #ffffff);
    color: var(--primary-color, #0a0a0a);
}

.autocomplete-item.autocomplete-loading,
.autocomplete-item.autocomplete-no-results,
.autocomplete-item.autocomplete-error {
    color: var(--text-muted, #999);
    cursor: default;
    pointer-events: none;
}

.item-content {
    flex: 1;
}

.item-title {
    font-weight: 500;
    color: inherit;
}

.item-subtitle {
    font-size: 0.8rem;
    color: var(--text-muted, #999);
    margin-top: 2px;
}

.autocomplete-item:hover .item-subtitle,
.autocomplete-item.selected .item-subtitle {
    color: var(--primary-color, #0a0a0a);
    opacity: 0.7;
}

.item-title mark {
    background-color: var(--accent-color, #ffffff);
    color: var(--primary-color, #0a0a0a);
    padding: 1px 3px;
    border-radius: 2px;
    font-weight: 600;
}

.autocomplete-item:hover .item-title mark,
.autocomplete-item.selected .item-title mark {
    background-color: var(--primary-color, #0a0a0a);
    color: var(--accent-color, #ffffff);
}

.loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--border-color, #333);
    border-top: 2px solid var(--text-muted, #999);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.autocomplete-container.autocomplete-open input {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

/* Responsive */
@media (max-width: 768px) {
    .autocomplete-dropdown {
        font-size: 16px; /* Prevent zoom on iOS */
    }
    
    .autocomplete-item {
        padding: 16px;
    }
}
`;

// Inject CSS
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = autocompleteCSS;
    document.head.appendChild(style);
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AutocompleteInput, VehicleAutocompleteManager };
} else {
    window.AutocompleteInput = AutocompleteInput;
    window.VehicleAutocompleteManager = VehicleAutocompleteManager;
}
