#!/usr/bin/env node

/**
 * Script to populate Strapi backend with sample data
 * Run: node populate-backend.js
 */

const API_URL = 'http://localhost:1337/api';

// Sample Tours Data
const tours = [
  {
    title: 'Giza Pyramids & Sphinx Tour',
    slug: 'giza-pyramids-sphinx',
    description: 'Experience the majesty of the last remaining Wonder of the Ancient World on this comprehensive tour of the Giza Pyramids and Sphinx. Walk in the footsteps of pharaohs as you explore the Great Pyramid of Khufu, the Pyramid of Khafre, and the Pyramid of Menkaure.',
    excerpt: 'Visit the iconic Giza Pyramids and Sphinx with an expert Egyptologist guide',
    price: 89,
    priceDisplay: '$89',
    duration: '8 hours',
    location: 'Cairo',
    category: 'Historical',
    rating: 4.9,
    reviews: 1250,
    groupSize: 'Up to 15 people',
    featured: true,
    highlights: [
      'Visit the Great Pyramid of Khufu',
      'See the Sphinx up close',
      'Explore the Valley Temple',
      'Professional Egyptologist guide',
      'Hotel pickup and drop-off included'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Professional Egyptologist guide',
      'All entrance fees',
      'Bottled water',
      'Air-conditioned transportation'
    ],
    excluded: [
      'Lunch and meals',
      'Gratuities and tips',
      'Personal expenses',
      'Interior pyramid entrance (extra fee)',
      'Camel rides'
    ],
    faqs: [
      {
        question: 'What should I wear?',
        answer: 'Comfortable walking shoes and light clothing are recommended. Bring sun protection including hat and sunscreen.'
      },
      {
        question: 'Can I go inside the pyramids?',
        answer: 'Yes, interior access to the Great Pyramid is available for an additional fee purchased on-site.'
      }
    ]
  },
  {
    title: 'Luxor Valley of the Kings Day Tour',
    slug: 'luxor-valley-kings',
    description: 'Discover the magnificent tombs and temples of ancient Thebes on this full-day tour of Luxor. Visit the Valley of the Kings, where pharaohs were laid to rest in elaborately decorated tombs.',
    excerpt: 'Explore ancient tombs and magnificent temples in Luxor',
    price: 125,
    priceDisplay: '$125',
    duration: 'Full day (10 hours)',
    location: 'Luxor',
    category: 'Historical',
    rating: 4.8,
    reviews: 890,
    groupSize: 'Up to 12 people',
    featured: true,
    highlights: [
      'Valley of the Kings with 3 tomb entries',
      'Temple of Hatshepsut',
      'Colossi of Memnon',
      'Karnak Temple Complex'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Professional Egyptologist guide',
      'All entrance fees',
      'Lunch at local restaurant'
    ],
    excluded: [
      'Gratuities and tips',
      'Tomb of Tutankhamun (extra fee)'
    ]
  },
  {
    title: '3-Day Nile River Cruise Luxor to Aswan',
    slug: 'nile-cruise-luxor-aswan',
    description: 'Embark on a magical journey along the Nile River, cruising from Luxor to Aswan aboard a deluxe 5-star cruise ship.',
    excerpt: 'Luxury 3-day cruise from Luxor to Aswan with all meals included',
    price: 450,
    priceDisplay: '$450',
    duration: '3 days / 2 nights',
    location: 'Luxor to Aswan',
    category: 'Cruise',
    rating: 4.9,
    reviews: 650,
    groupSize: 'Up to 100 passengers',
    featured: true,
    highlights: [
      '5-star Nile cruise ship',
      'All meals included',
      'Temple of Edfu',
      'Temple of Kom Ombo'
    ],
    included: [
      '2 nights accommodation',
      'All meals',
      'Expert Egyptologist guide'
    ],
    excluded: [
      'Gratuities and tips',
      'Drinks and beverages'
    ]
  },
  {
    title: 'White Desert & Black Desert Safari',
    slug: 'white-desert-safari',
    description: 'Experience the otherworldly landscapes of Egypt\'s Western Desert on this thrilling 2-day camping adventure.',
    excerpt: '2-day camping adventure in Egypt\'s stunning White Desert',
    price: 180,
    priceDisplay: '$180',
    duration: '2 days / 1 night',
    location: 'Bahariya Oasis',
    category: 'Desert',
    rating: 4.7,
    reviews: 420,
    groupSize: 'Up to 8 people',
    featured: true,
    highlights: [
      'White Desert chalk formations',
      'Black Desert volcanic mountains',
      'Desert camping under stars'
    ],
    included: [
      '4x4 jeep transportation',
      'Camping equipment',
      'All meals'
    ],
    excluded: [
      'Hotel accommodation',
      'Travel insurance'
    ]
  },
  {
    title: 'Cairo City Highlights & Egyptian Museum',
    slug: 'cairo-city-tour',
    description: 'Immerse yourself in the vibrant culture and rich history of Cairo on this comprehensive city tour.',
    excerpt: 'Discover Cairo\'s treasures including the Egyptian Museum',
    price: 75,
    priceDisplay: '$75',
    duration: '7 hours',
    location: 'Cairo',
    category: 'Cultural',
    rating: 4.6,
    reviews: 980,
    groupSize: 'Up to 15 people',
    featured: true,
    highlights: [
      'Egyptian Museum visit',
      'Tutankhamun treasures',
      'Khan El Khalili bazaar'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Professional guide',
      'Lunch at local restaurant'
    ],
    excluded: [
      'Mummy Room entrance (extra fee)',
      'Shopping expenses'
    ]
  }
];

// Sample Reviews Data
const reviews = [
  {
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    review: 'Absolutely incredible experience! Our guide Mohamed was extremely knowledgeable and passionate about Egyptian history. The pyramids were even more impressive in person than I imagined.',
    date: '2024-12-15',
    platform: 'tripadvisor',
    tourName: 'Giza Pyramids Tour',
    verified: true,
    featured: true
  },
  {
    name: 'James Williams',
    location: 'London, UK',
    rating: 5,
    review: 'Best tour we\'ve ever taken! The Valley of the Kings was breathtaking, and our guide\'s explanations brought the ancient history to life.',
    date: '2024-12-10',
    platform: 'tripadvisor',
    tourName: 'Luxor Valley of the Kings',
    verified: true,
    featured: true
  },
  {
    name: 'Emma Martinez',
    location: 'Barcelona, Spain',
    rating: 5,
    review: 'The Nile cruise exceeded all expectations! The ship was luxurious, the food was amazing, and visiting the temples along the way was a dream come true.',
    date: '2024-12-08',
    platform: 'tripadvisor',
    tourName: 'Nile River Cruise',
    verified: true,
    featured: true
  },
  {
    name: 'Michael Chen',
    location: 'San Francisco, USA',
    rating: 5,
    review: 'The White Desert was like being on another planet! The rock formations were stunning, especially at sunset. Sleeping under the stars was magical.',
    date: '2024-12-12',
    platform: 'viator',
    tourName: 'White Desert Safari',
    verified: true,
    featured: true
  },
  {
    name: 'Lisa Anderson',
    location: 'Toronto, Canada',
    rating: 4,
    review: 'Great tour of Cairo! The Egyptian Museum was fascinating with so much to see. Khan El Khalili bazaar was a sensory overload in the best way.',
    date: '2024-12-05',
    platform: 'viator',
    tourName: 'Cairo City Tour',
    verified: true,
    featured: true
  },
  {
    name: 'David Brown',
    location: 'Sydney, Australia',
    rating: 5,
    review: 'Amazing snorkeling experience! The coral reefs were vibrant and full of life. Perfect day trip!',
    date: '2024-12-01',
    platform: 'viator',
    tourName: 'Red Sea Snorkeling',
    verified: true,
    featured: true
  },
  {
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    rating: 5,
    review: 'Alexandria was beautiful! The Bibliotheca was modern and impressive, and the Citadel offered amazing sea views.',
    date: '2024-12-14',
    platform: 'klook',
    tourName: 'Alexandria Day Trip',
    verified: true,
    featured: true
  },
  {
    name: 'Sophie Dubois',
    location: 'Paris, France',
    rating: 5,
    review: 'The pyramids tour was spectacular! Our guide was friendly and took great photos for us. A must-do when in Cairo!',
    date: '2024-12-11',
    platform: 'klook',
    tourName: 'Giza Pyramids Tour',
    verified: true,
    featured: true
  },
  {
    name: 'Marco Rossi',
    location: 'Rome, Italy',
    rating: 5,
    review: 'Luxor was absolutely stunning! The temples are massive and incredibly well-preserved. This tour is worth every dollar!',
    date: '2024-12-09',
    platform: 'klook',
    tourName: 'Luxor Valley of the Kings',
    verified: true,
    featured: true
  }
];

// Helper function to make API requests
async function apiRequest(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`API Error: ${JSON.stringify(result)}`);
  }

  return result;
}

// Create tours
async function createTours() {
  console.log('\n📍 Creating tours...');
  let created = 0;

  for (const tour of tours) {
    try {
      await apiRequest('/tours', 'POST', { data: tour });
      console.log(`✅ Created: ${tour.title}`);
      created++;
    } catch (error) {
      console.log(`❌ Failed to create ${tour.title}:`, error.message);
    }
  }

  console.log(`\n✅ Created ${created}/${tours.length} tours`);
}

// Create reviews
async function createReviews() {
  console.log('\n⭐ Creating reviews...');
  let created = 0;

  for (const review of reviews) {
    try {
      await apiRequest('/reviews', 'POST', { data: review });
      console.log(`✅ Created review by: ${review.name} (${review.platform})`);
      created++;
    } catch (error) {
      console.log(`❌ Failed to create review by ${review.name}:`, error.message);
    }
  }

  console.log(`\n✅ Created ${created}/${reviews.length} reviews`);
}

// Main function
async function main() {
  console.log('🚀 Populating Strapi backend with sample data...');
  console.log(`📡 API URL: ${API_URL}\n`);

  try {
    // Check if API is accessible
    console.log('🔍 Checking API connection...');
    await apiRequest('/tours');
    console.log('✅ API is accessible\n');

    // Create tours
    await createTours();

    // Create reviews
    await createReviews();

    console.log('\n🎉 Done! Your backend is now populated with sample data.');
    console.log('\n📊 Summary:');
    console.log(`   - ${tours.length} tours added`);
    console.log(`   - ${reviews.length} reviews added`);
    console.log('\n🌐 Visit your frontend: http://localhost:3000');
    console.log('🔧 Strapi admin: http://localhost:1337/admin');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. Strapi backend is running (http://localhost:1337)');
    console.log('   2. Public permissions are enabled for Tours and Reviews');
    console.log('   3. You\'ve created an admin account');
  }
}

// Run the script
main();
