/**
 * Base de Datos de Vehículos para España/Europa
 * Actualizada 2024 - Marcas y modelos más populares
 */

const vehicleDatabase = {
    // Marcas alemanas
    'Audi': [
        'A1', 'A3', 'A4', 'A4 Allroad', 'A5', 'A6', 'A6 Allroad', 'A7', 'A8',
        'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8',
        'e-tron', 'e-tron GT', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'RS Q3', 'RS Q8',
        'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ2', 'SQ5', 'SQ7', 'SQ8',
        'TT', 'TT RS', 'TTS'
    ],
    'BMW': [
        'Serie 1', 'Serie 2', 'Serie 2 Active Tourer', 'Serie 2 Gran Coupé', 'Serie 3', 'Serie 4', 'Serie 5', 'Serie 6', 'Serie 7', 'Serie 8',
        'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7',
        'Z4', 'i3', 'i4', 'i7', 'iX', 'iX1', 'iX3',
        'M2', 'M3', 'M4', 'M5', 'M8', 'X3 M', 'X4 M', 'X5 M', 'X6 M'
    ],
    'Mercedes-Benz': [
        'Clase A', 'Clase B', 'Clase C', 'Clase E', 'Clase S',
        'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'Clase G',
        'AMG GT', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'EQV',
        'Sprinter', 'Vito', 'Citan'
    ],
    'Volkswagen': [
        'Polo', 'Golf', 'Passat', 'Arteon', 'Jetta',
        'T-Cross', 'T-Roc', 'Tiguan', 'Touareg',
        'up!', 'ID.3', 'ID.4', 'ID.5', 'ID.7', 'ID. Buzz',
        'Caddy', 'Transporter', 'Crafter',
        'Golf GTI', 'Golf R', 'Polo GTI'
    ],
    'Porsche': [
        '911', '718 Boxster', '718 Cayman', 'Panamera', 'Cayenne', 'Macan',
        'Taycan', 'Taycan Cross Turismo'
    ],

    // Marcas francesas
    'Peugeot': [
        '108', '208', '2008', '308', '3008', '408', '508', '5008',
        'Partner', 'Rifter', 'Traveller', 'Boxer',
        'e-208', 'e-2008', 'e-308', 'e-3008', 'e-Partner', 'e-Rifter'
    ],
    'Citroën': [
        'C1', 'C3', 'C3 Aircross', 'C4', 'C4 X', 'C5 X', 'C5 Aircross',
        'Berlingo', 'SpaceTourer', 'Jumpy', 'Jumper',
        'ë-C4', 'ë-C4 X', 'ë-Berlingo', 'ë-SpaceTourer'
    ],
    'Renault': [
        'Twingo', 'Clio', 'Captur', 'Arkana', 'Mégane', 'Scénic', 'Talisman',
        'Kadjar', 'Koleos', 'Espace',
        'Kangoo', 'Trafic', 'Master',
        'ZOE', 'Mégane E-Tech', 'Kangoo E-Tech'
    ],
    'DS': [
        'DS 3 Crossback', 'DS 4', 'DS 7 Crossback', 'DS 9'
    ],

    // Marcas japonesas
    'Toyota': [
        'Aygo X', 'Yaris', 'Yaris Cross', 'Corolla', 'Camry', 'Prius',
        'C-HR', 'RAV4', 'Highlander', 'Land Cruiser',
        'Hilux', 'Proace City', 'Proace', 'Proace Max',
        'bZ4X', 'Mirai'
    ],
    'Honda': [
        'Jazz', 'Civic', 'Accord', 'HR-V', 'CR-V',
        'e:Ny1', 'CR-V Hybrid'
    ],
    'Nissan': [
        'Micra', 'Juke', 'Qashqai', 'X-Trail', 'Ariya',
        'Leaf', 'e-NV200', 'Townstar'
    ],
    'Mazda': [
        'Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-30', 'CX-60', 'MX-5', 'MX-30'
    ],
    'Lexus': [
        'CT', 'IS', 'ES', 'LS', 'UX', 'NX', 'RX', 'LX', 'LC', 'LFA'
    ],
    'Infiniti': [
        'Q30', 'Q50', 'Q60', 'Q70', 'QX30', 'QX50', 'QX70'
    ],

    // Marcas coreanas
    'Hyundai': [
        'i10', 'i20', 'i30', 'IONIQ 5', 'IONIQ 6',
        'Bayon', 'Kona', 'Tucson', 'Santa Fe', 'NEXO',
        'H1', 'H350'
    ],
    'Kia': [
        'Picanto', 'Rio', 'Ceed', 'XCeed', 'Proceed', 'Stonic', 'Niro', 'Sportage', 'Sorento',
        'EV6', 'e-Niro', 'e-Soul'
    ],
    'Genesis': [
        'G70', 'G80', 'G90', 'GV70', 'GV80'
    ],

    // Marcas americanas
    'Ford': [
        'Fiesta', 'Focus', 'Mondeo', 'Mustang', 'Mustang Mach-E',
        'EcoSport', 'Puma', 'Kuga', 'Edge', 'Explorer',
        'Transit Custom', 'Transit', 'Ranger', 'F-150'
    ],
    'Chevrolet': [
        'Spark', 'Aveo', 'Cruze', 'Malibu', 'Camaro', 'Corvette',
        'Trax', 'Equinox', 'Tahoe', 'Suburban'
    ],
    'Tesla': [
        'Model 3', 'Model S', 'Model X', 'Model Y'
    ],
    'Cadillac': [
        'CT4', 'CT5', 'Escalade', 'XT4', 'XT5', 'XT6', 'Lyriq'
    ],

    // Marcas italianas
    'Fiat': [
        '500', '500X', '500L', 'Panda', 'Tipo', '500e',
        'Doblo', 'Talento', 'Ducato'
    ],
    'Alfa Romeo': [
        'MiTo', 'Giulietta', 'Giulia', 'Stelvio', 'Tonale'
    ],
    'Lancia': [
        'Ypsilon'
    ],
    'Ferrari': [
        '296 GTB', '296 GTS', 'F8 Tributo', 'F8 Spider', 'SF90 Stradale', 'SF90 Spider',
        'Roma', 'Portofino M', '812 Superfast', '812 GTS', 'Purosangue'
    ],
    'Lamborghini': [
        'Huracán', 'Aventador', 'Urus'
    ],
    'Maserati': [
        'Ghibli', 'Quattroporte', 'Levante', 'MC20', 'Grecale'
    ],

    // Marcas británicas
    'MINI': [
        'Cooper', 'Cooper S', 'Cooper SE', 'Countryman', 'Clubman', 'Convertible'
    ],
    'Jaguar': [
        'XE', 'XF', 'XJ', 'F-Type', 'E-Pace', 'F-Pace', 'I-Pace'
    ],
    'Land Rover': [
        'Defender', 'Discovery', 'Discovery Sport', 'Range Rover Evoque', 'Range Rover Velar', 'Range Rover Sport', 'Range Rover'
    ],
    'Bentley': [
        'Continental GT', 'Continental GTC', 'Flying Spur', 'Bentayga'
    ],
    'Aston Martin': [
        'Vantage', 'DB11', 'DBS', 'DBX'
    ],
    'Rolls-Royce': [
        'Ghost', 'Phantom', 'Cullinan', 'Dawn', 'Wraith'
    ],

    // Marcas suecas
    'Volvo': [
        'V40', 'V60', 'V90', 'S60', 'S90',
        'XC40', 'XC60', 'XC90',
        'C40 Recharge', 'XC40 Recharge'
    ],

    // Marcas españolas
    'SEAT': [
        'Ibiza', 'Arona', 'León', 'Ateca', 'Tarraco',
        'Mii electric', 'Alhambra'
    ],
    'Cupra': [
        'Born', 'Formentor', 'León', 'Ateca', 'Tavascan'
    ],

    // Marcas checas
    'Škoda': [
        'Citigo', 'Fabia', 'Scala', 'Octavia', 'Superb',
        'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq iV'
    ],

    // Marcas rumanas
    'Dacia': [
        'Sandero', 'Logan', 'Duster', 'Lodgy', 'Dokker', 'Spring'
    ],

    // Marcas chinas
    'BYD': [
        'Atto 3', 'Han', 'Tang', 'Dolphin', 'Seal'
    ],
    'MG': [
        'ZS', 'HS', 'Marvel R', 'EHS', 'EZS', 'MG5'
    ],
    'Lynk & Co': [
        '01', '02', '03'
    ],
    'Polestar': [
        '2', '3', '4', '5'
    ],

    // Marcas comerciales/furgonetas
    'Iveco': [
        'Daily', 'Eurocargo', 'Stralis', 'S-Way'
    ],
    'Mercedes-Benz Vans': [
        'Citan', 'Vito', 'Sprinter'
    ]
};

/**
 * Utilidades para búsqueda y autocompletado
 */
class VehicleAutocomplete {
    constructor() {
        this.brands = Object.keys(vehicleDatabase).sort();
        this.models = vehicleDatabase;
    }

    /**
     * Buscar marcas que coincidan con el texto
     */
    searchBrands(query) {
        if (!query || query.length < 1) return [];
        
        const normalizedQuery = this.normalize(query);
        return this.brands.filter(brand => 
            this.normalize(brand).includes(normalizedQuery)
        ).slice(0, 10); // Limitar a 10 resultados
    }

    /**
     * Obtener modelos de una marca
     */
    getModelsByBrand(brand) {
        return this.models[brand] || [];
    }

    /**
     * Buscar modelos de una marca específica
     */
    searchModels(brand, query) {
        const models = this.getModelsByBrand(brand);
        if (!query || query.length < 1) return models.slice(0, 10);
        
        const normalizedQuery = this.normalize(query);
        return models.filter(model => 
            this.normalize(model).includes(normalizedQuery)
        ).slice(0, 10);
    }

    /**
     * Buscar en todas las marcas y modelos
     */
    searchAll(query) {
        if (!query || query.length < 1) return { brands: [], models: [] };
        
        const normalizedQuery = this.normalize(query);
        const results = { brands: [], models: [] };
        
        // Buscar marcas
        results.brands = this.searchBrands(query);
        
        // Buscar modelos en todas las marcas
        for (const brand of this.brands) {
            const matchingModels = this.models[brand].filter(model =>
                this.normalize(model).includes(normalizedQuery)
            ).map(model => ({ brand, model }));
            
            results.models.push(...matchingModels);
        }
        
        results.models = results.models.slice(0, 10);
        return results;
    }

    /**
     * Normalizar texto para búsqueda (sin acentos, lowercase)
     */
    normalize(text) {
        return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    /**
     * Verificar si una marca existe
     */
    brandExists(brand) {
        return this.brands.includes(brand);
    }

    /**
     * Verificar si un modelo existe para una marca
     */
    modelExists(brand, model) {
        const models = this.getModelsByBrand(brand);
        return models.includes(model);
    }
}

// Exportar para uso
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { vehicleDatabase, VehicleAutocomplete };
} else {
    window.vehicleDatabase = vehicleDatabase;
    window.VehicleAutocomplete = VehicleAutocomplete;
}
