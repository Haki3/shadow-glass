/**
 * Integración con APIs Externas de Vehículos
 * Implementaciones para diferentes fuentes de datos
 */

class VehicleAPIIntegration {
    constructor() {
        this.cache = new Map();
        this.cacheExpiry = 30 * 60 * 1000; // 30 minutos
    }

    /**
     * API de NHTSA (Nacional Highway Traffic Safety Administration)
     * Gratuita, completa, datos oficiales de EE.UU.
     */
    async getNHTSABrands() {
        const cacheKey = 'nhtsa_brands';
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
            const data = await response.json();
            
            const brands = data.Results.map(item => ({
                id: item.Make_ID,
                name: item.Make_Name,
                display: item.Make_Name
            })).sort((a, b) => a.name.localeCompare(b.name));

            this.setCache(cacheKey, brands);
            return brands;
        } catch (error) {
            console.error('Error fetching NHTSA brands:', error);
            throw error;
        }
    }

    async getNHTSAModels(makeId, makeName) {
        const cacheKey = `nhtsa_models_${makeId}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${makeName}?format=json`);
            const data = await response.json();
            
            const models = data.Results.map(item => ({
                id: item.Model_ID,
                name: item.Model_Name,
                display: item.Model_Name,
                make: makeName
            })).sort((a, b) => a.name.localeCompare(b.name));

            this.setCache(cacheKey, models);
            return models;
        } catch (error) {
            console.error('Error fetching NHTSA models:', error);
            throw error;
        }
    }

    /**
     * CarQuery API - Base de datos extensa
     * Incluye años, características, etc.
     */
    async getCarQueryBrands() {
        const cacheKey = 'carquery_brands';
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch('https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            // CarQuery uses JSONP, so we need to handle it differently
            const text = await response.text();
            const jsonData = text.replace(/^\?\(/, '').replace(/\)$/, '');
            const data = JSON.parse(jsonData);
            
            const brands = data.Makes.map(item => ({
                id: item.make_id,
                name: item.make_display,
                display: item.make_display,
                country: item.make_country
            })).sort((a, b) => a.name.localeCompare(b.name));

            this.setCache(cacheKey, brands);
            return brands;
        } catch (error) {
            console.error('Error fetching CarQuery brands:', error);
            throw error;
        }
    }

    async getCarQueryModels(makeId) {
        const cacheKey = `carquery_models_${makeId}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=${makeId}`);
            const text = await response.text();
            const jsonData = text.replace(/^\?\(/, '').replace(/\)$/, '');
            const data = JSON.parse(jsonData);
            
            const models = data.Models.map(item => ({
                id: item.model_name,
                name: item.model_name,
                display: item.model_name,
                years: `${item.model_year_min}-${item.model_year_max}`
            })).sort((a, b) => a.name.localeCompare(b.name));

            this.setCache(cacheKey, models);
            return models;
        } catch (error) {
            console.error('Error fetching CarQuery models:', error);
            throw error;
        }
    }

    /**
     * API personalizada con datos españoles/europeos
     * Combina varias fuentes para tener datos más relevantes
     */
    async getEuropeanBrands() {
        // Esta sería tu API personalizada
        const europeanBrands = [
            'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Porsche',
            'Peugeot', 'Citroën', 'Renault', 'DS',
            'Toyota', 'Honda', 'Nissan', 'Mazda', 'Lexus',
            'Hyundai', 'Kia', 'Genesis',
            'Ford', 'Chevrolet', 'Tesla',
            'Fiat', 'Alfa Romeo', 'Ferrari', 'Lamborghini', 'Maserati',
            'MINI', 'Jaguar', 'Land Rover', 'Bentley', 'Aston Martin', 'Rolls-Royce',
            'Volvo', 'SEAT', 'Cupra', 'Škoda', 'Dacia'
        ];

        return europeanBrands.map(brand => ({
            id: brand.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: brand,
            display: brand,
            region: 'Europe'
        }));
    }

    /**
     * Integración híbrida: Local + API
     * Usa datos locales como fallback y API para datos actualizados
     */
    async getHybridBrands() {
        try {
            // Intentar obtener datos de API primero
            const apiBrands = await this.getNHTSABrands();
            return apiBrands;
        } catch (error) {
            // Fallback a datos locales
            console.warn('API unavailable, using local data:', error);
            if (typeof VehicleAutocomplete !== 'undefined') {
                const localAutocomplete = new VehicleAutocomplete();
                return localAutocomplete.brands.map(brand => ({
                    id: brand.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    name: brand,
                    display: brand,
                    source: 'local'
                }));
            }
            return [];
        }
    }

    async getHybridModels(brandName) {
        try {
            // Intentar API primero
            const apiModels = await this.getNHTSAModels(null, brandName);
            return apiModels;
        } catch (error) {
            // Fallback a datos locales
            console.warn('API unavailable, using local data:', error);
            if (typeof VehicleAutocomplete !== 'undefined') {
                const localAutocomplete = new VehicleAutocomplete();
                const models = localAutocomplete.getModelsByBrand(brandName);
                return models.map(model => ({
                    id: model.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    name: model,
                    display: model,
                    make: brandName,
                    source: 'local'
                }));
            }
            return [];
        }
    }

    // Cache methods
    getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
            return cached.data;
        }
        return null;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    clearCache() {
        this.cache.clear();
    }
}

/**
 * Autocompletado mejorado con API
 */
class APIVehicleAutocompleteManager extends VehicleAutocompleteManager {
    constructor() {
        super();
        this.api = new VehicleAPIIntegration();
        this.useAPI = true; // Flag para alternar entre API y datos locales
    }

    async searchBrands(query) {
        try {
            if (this.useAPI) {
                // Usar API híbrida (con fallback local)
                const brands = await this.api.getHybridBrands();
                const filtered = brands.filter(brand => 
                    brand.name.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 8);

                return filtered.map(brand => ({
                    value: brand.name,
                    display: brand.name,
                    subtitle: brand.source === 'local' ? 'Base de datos local' : 'Datos oficiales'
                }));
            } else {
                // Usar método local original
                return super.searchBrands(query);
            }
        } catch (error) {
            console.error('Error searching brands:', error);
            // Fallback to local search
            return super.searchBrands(query);
        }
    }

    async searchModels(query) {
        const selectedBrand = this.brandInput.dataset.selectedValue || this.brandInput.value.trim();
        
        if (!selectedBrand) {
            return [];
        }

        try {
            if (this.useAPI) {
                const models = await this.api.getHybridModels(selectedBrand);
                const filtered = models.filter(model => 
                    model.name.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 8);

                return filtered.map(model => ({
                    value: model.name,
                    display: model.name,
                    subtitle: `${selectedBrand} ${model.years ? `(${model.years})` : ''}`
                }));
            } else {
                return super.searchModels(query);
            }
        } catch (error) {
            console.error('Error searching models:', error);
            return super.searchModels(query);
        }
    }

    // Método para alternar entre API y datos locales
    toggleDataSource() {
        this.useAPI = !this.useAPI;
        console.log(`Data source switched to: ${this.useAPI ? 'API' : 'Local'}`);
        
        // Limpiar caché y reiniciar inputs
        this.api.clearCache();
        if (this.brandAutocomplete) this.brandAutocomplete.clear();
        if (this.modelAutocomplete) this.modelAutocomplete.clear();
    }
}

/**
 * Ejemplo de uso con diferentes APIs
 */
class VehicleAPIDemo {
    constructor() {
        this.api = new VehicleAPIIntegration();
    }

    async demonstrateAPIs() {
        console.log('=== Demo de APIs de Vehículos ===');

        try {
            // NHTSA API
            console.log('\n1. NHTSA API (Datos oficiales EE.UU.):');
            const nhtsaBrands = await this.api.getNHTSABrands();
            console.log(`Encontradas ${nhtsaBrands.length} marcas`);
            console.log('Primeras 5:', nhtsaBrands.slice(0, 5));

            // Modelos de BMW
            const bmwModels = await this.api.getNHTSAModels(null, 'BMW');
            console.log(`\nModelos BMW: ${bmwModels.length}`);
            console.log('Primeros 5:', bmwModels.slice(0, 5));

        } catch (error) {
            console.error('Error en demo de API:', error);
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        VehicleAPIIntegration, 
        APIVehicleAutocompleteManager, 
        VehicleAPIDemo 
    };
} else {
    window.VehicleAPIIntegration = VehicleAPIIntegration;
    window.APIVehicleAutocompleteManager = APIVehicleAutocompleteManager;
    window.VehicleAPIDemo = VehicleAPIDemo;
    
    // Demo automático en desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // const demo = new VehicleAPIDemo();
        // demo.demonstrateAPIs();
    }
}
