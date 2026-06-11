export const CATEGORY_SCHEMAS = {
  'handphone': [
    { key: 'brand', label: 'Brand', type: 'text', required: true, placeholder: 'e.g. Apple, Samsung' },
    { key: 'model', label: 'Model', type: 'text', required: true, placeholder: 'e.g. iPhone 15 Pro Max' },
    { key: 'ram', label: 'RAM', type: 'text', required: true, placeholder: 'e.g. 8GB' },
    { key: 'storage', label: 'Storage', type: 'text', required: true, placeholder: 'e.g. 256GB' },
    { key: 'price', label: 'Price (IDR)', type: 'number', required: true, placeholder: 'e.g. 24999000' },
    { key: 'condition', label: 'Condition', type: 'text', required: true, placeholder: 'e.g. Baru, Bekas' }
  ],
  'kendaraan': [
    { key: 'brand', label: 'Brand', type: 'text', required: true, placeholder: 'e.g. Toyota, Honda' },
    { key: 'model', label: 'Model', type: 'text', required: true, placeholder: 'e.g. Avanza 1.5 G' },
    { key: 'year', label: 'Year', type: 'number', required: true, placeholder: 'e.g. 2023' },
    { key: 'transmission', label: 'Transmission', type: 'text', required: true, placeholder: 'e.g. Manual, Otomatis' },
    { key: 'fuel', label: 'Fuel Type', type: 'text', required: true, placeholder: 'e.g. Bensin, Diesel' },
    { key: 'price', label: 'Price (IDR)', type: 'number', required: true, placeholder: 'e.g. 245000000' }
  ],
  'laptop': [
    { key: 'brand', label: 'Brand', type: 'text', required: true, placeholder: 'e.g. Apple, ASUS, Lenovo' },
    { key: 'model', label: 'Model', type: 'text', required: true, placeholder: 'e.g. MacBook Air M2' },
    { key: 'ram', label: 'RAM', type: 'text', required: true, placeholder: 'e.g. 8GB, 16GB' },
    { key: 'storage', label: 'Storage', type: 'text', required: true, placeholder: 'e.g. 256GB SSD, 512GB SSD' },
    { key: 'processor', label: 'Processor', type: 'text', required: true, placeholder: 'e.g. M2, Core i7' },
    { key: 'price', label: 'Price (IDR)', type: 'number', required: true, placeholder: 'e.g. 16499000' }
  ],
  'buku': [
    { key: 'author', label: 'Author', type: 'text', required: true, placeholder: 'e.g. James Clear' },
    { key: 'genre', label: 'Genre', type: 'text', required: true, placeholder: 'e.g. Self-Improvement, Novel' },
    { key: 'pages', label: 'Pages', type: 'number', required: true, placeholder: 'e.g. 352' },
    { key: 'language', label: 'Language', type: 'text', required: true, placeholder: 'e.g. Indonesia, English' },
    { key: 'price', label: 'Price (IDR)', type: 'number', required: true, placeholder: 'e.g. 89000' }
  ],
  'film': [
    { key: 'genre', label: 'Genre', type: 'text', required: true, placeholder: 'e.g. Horror, Action/Sci-Fi' },
    { key: 'duration', label: 'Duration', type: 'text', required: true, placeholder: 'e.g. 132 menit' },
    { key: 'rating', label: 'Rating', type: 'text', required: true, placeholder: 'e.g. D17+, PG-13' },
    { key: 'format', label: 'Format', type: 'text', required: true, placeholder: 'e.g. Cinema Ticket, Streaming, DVD' },
    { key: 'price', label: 'Price (IDR)', type: 'number', required: true, placeholder: 'e.g. 75000' }
  ],
  'makanan': [
    { key: 'cuisine', label: 'Cuisine', type: 'text', required: true, placeholder: 'e.g. Padang, Sunda, Jawa' },
    { key: 'portion', label: 'Portion size', type: 'text', required: true, placeholder: 'e.g. Jumbo, Regular' },
    { key: 'spicyLevel', label: 'Spicy Level', type: 'text', required: true, placeholder: 'e.g. Sedang, Pedas' },
    { key: 'delivery', label: 'Delivery Available?', type: 'boolean', required: false, placeholder: '' },
    { key: 'price', label: 'Price (IDR)', type: 'number', required: true, placeholder: 'e.g. 35000' }
  ],
  'wisata': [
    { key: 'destination', label: 'Destination', type: 'text', required: true, placeholder: 'e.g. Bali, Labuan Bajo' },
    { key: 'duration', label: 'Duration', type: 'text', required: true, placeholder: 'e.g. 4D3N, 3D2N' },
    { key: 'includes', label: 'Included facilities', type: 'text', required: true, placeholder: 'e.g. Hotel, Transport, Guide' },
    { key: 'price', label: 'Price (IDR)', type: 'number', required: true, placeholder: 'e.g. 3500000' }
  ],
  'sewa': [
    { key: 'type', label: 'Property Type', type: 'text', required: true, placeholder: 'e.g. Kost, Villa, Kontrakan' },
    { key: 'location', label: 'Property Location', type: 'text', required: true, placeholder: 'e.g. Depok, Puncak' },
    { key: 'facilities', label: 'Facilities / Rooms info', type: 'text', required: true, placeholder: 'e.g. AC, WiFi, 3KT, 2KM' },
    { key: 'price', label: 'Price (IDR)', type: 'number', required: true, placeholder: 'e.g. 2500000' }
  ],
  'lowongan-kerja': [
    { key: 'company', label: 'Company', type: 'text', required: true, placeholder: 'e.g. PT Tokopedia' },
    { key: 'position', label: 'Position name', type: 'text', required: true, placeholder: 'e.g. Frontend Developer' },
    { key: 'type', label: 'Job type', type: 'text', required: true, placeholder: 'e.g. Full-time, Part-time' },
    { key: 'workMode', label: 'Work Mode', type: 'text', required: true, placeholder: 'e.g. Remote, On-site, Hybrid' },
    { key: 'salary', label: 'Salary text', type: 'text', required: true, placeholder: 'e.g. Rp 12.000.000 - 18.000.000' }
  ],
  'acara': [
    { key: 'date', label: 'Event Date', type: 'text', required: true, placeholder: 'e.g. 2026-09-15' },
    { key: 'location', label: 'Venue', type: 'text', required: true, placeholder: 'e.g. JCC Senayan, Jakarta' },
    { key: 'type', label: 'Event Type', type: 'text', required: true, placeholder: 'e.g. Konferensi, Workshop, Festival' },
    { key: 'price', label: 'Ticket Price (IDR)', type: 'number', required: true, placeholder: 'e.g. 350000' }
  ]
};
