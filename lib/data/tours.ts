export interface Tour {
  id: number
  title: string
  slug: string
  image: string
  images?: string[]
  duration: string
  location: string
  price: string
  rating: number
  reviews: number
  description: string
  category: string
  groupSize: string
  highlights?: string[]
  itinerary?: {
    day: number
    title: string
    description: string
    meals: string[]
    accommodation?: string
  }[]
  included?: string[]
  excluded?: string[]
  faqs?: {
    question: string
    answer: string
  }[]
  relatedTourSlugs?: string[]
}

export const tours: Tour[] = [
  {
    id: 1,
    title: "Giza Pyramids & Sphinx",
    slug: "giza-pyramids-sphinx",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "8 hours",
    location: "Cairo",
    price: "$89",
    rating: 4.9,
    reviews: 245,
    description:
      "Explore the iconic Pyramids of Giza and the Great Sphinx with an expert Egyptologist guide. Learn about the history and mysteries of these ancient wonders, marvel at the engineering feats of the ancient Egyptians, and discover the fascinating stories behind these monumental structures that have stood for over 4,500 years.",
    category: "Historical",
    groupSize: "Up to 15 people",
    highlights: [
      "Visit the Great Pyramid of Khufu, the oldest and largest of the three pyramids",
      "See the enigmatic Great Sphinx, with the body of a lion and the head of a pharaoh",
      "Explore the Valley Temple where mummification took place",
      "Enjoy panoramic views of the pyramids from the perfect photo spot",
      "Learn about ancient Egyptian history from your certified Egyptologist guide",
    ],
    itinerary: [
      {
        day: 1,
        title: "Pyramids of Giza & Sphinx Tour",
        description:
          "Your expert guide will pick you up from your hotel in Cairo or Giza at 8:00 AM. Begin your tour at the Great Pyramid of Khufu, the oldest and largest of the three pyramids in the Giza complex. You'll have the option to enter the pyramid (additional ticket required). Next, visit the middle pyramid of Khafre and the smallest pyramid of Menkaure. Continue to the Great Sphinx, the legendary guardian with the head of a pharaoh and body of a lion. Explore the Valley Temple where mummification of King Khafre took place. Enjoy a panoramic view of the pyramids from the perfect photo spot. Your tour ends around 4:00 PM with drop-off at your hotel.",
        meals: ["Lunch"],
      },
    ],
    included: [
      "Hotel pickup and drop-off",
      "Transportation in air-conditioned vehicle",
      "Professional Egyptologist guide",
      "Entrance fees to the Giza Plateau",
      "Bottled water",
      "Lunch at a local restaurant",
    ],
    excluded: [
      "Entrance to the inside of the pyramids (available for purchase)",
      "Camel or horse rides (available for purchase)",
      "Gratuities",
      "Personal expenses",
    ],
    faqs: [
      {
        question: "Is this tour suitable for children?",
        answer:
          "Yes, this tour is suitable for travelers of all ages. Children will be fascinated by the pyramids and sphinx, and our guides are experienced in making history engaging for young visitors.",
      },
      {
        question: "Can I enter the pyramids?",
        answer:
          "Yes, you can enter the Great Pyramid or one of the smaller pyramids for an additional fee (approximately $20-30 USD). This is not included in the tour price and is optional.",
      },
      {
        question: "What should I wear?",
        answer:
          "Wear comfortable walking shoes and light, breathable clothing. Bring a hat, sunglasses, and sunscreen. In winter months (November-February), bring a light jacket.",
      },
      {
        question: "Is lunch included?",
        answer:
          "Yes, lunch at a local restaurant is included in the tour price. We can accommodate vegetarian and special dietary requirements with advance notice.",
      },
    ],
    relatedTourSlugs: ["luxor-valley-of-kings", "cairo-food-tour", "pyramids-sound-light-show"],
  },
  {
    id: 2,
    title: "Luxor Valley of Kings",
    slug: "luxor-valley-of-kings",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "10 hours",
    location: "Luxor",
    price: "$120",
    rating: 4.8,
    reviews: 189,
    description:
      "Discover the Valley of the Kings, the final resting place of many pharaohs including Tutankhamun. Visit the Temple of Hatshepsut and the Colossi of Memnon on this comprehensive full-day tour of Luxor's West Bank.",
    category: "Historical",
    groupSize: "Up to 12 people",
    highlights: [
      "Explore 3 magnificent tombs in the Valley of the Kings",
      "Visit the stunning Temple of Queen Hatshepsut carved into the mountainside",
      "See the iconic Colossi of Memnon, two massive stone statues",
      "Learn about the Valley of the Queens and royal mummification",
      "Enjoy exclusive access with small group sizes for a personalized experience",
    ],
    itinerary: [
      {
        day: 1,
        title: "Luxor West Bank Highlights",
        description:
          "Your Egyptologist guide will meet you at your Luxor hotel at 7:00 AM to begin your journey through ancient Thebes. Cross the Nile to the West Bank, the realm of the dead. First, visit the Valley of the Kings, where you'll explore three elaborately decorated tombs of pharaohs from the New Kingdom. Marvel at the well-preserved hieroglyphics and colorful paintings. Next, visit the magnificent Temple of Hatshepsut at Deir el-Bahari, one of Egypt's most impressive architectural achievements. Continue to the Colossi of Memnon, two massive statues that once guarded Amenhotep III's memorial temple. Your tour concludes around 5:00 PM with return to your hotel.",
        meals: ["Lunch"],
      },
    ],
    included: [
      "Hotel pickup and drop-off in Luxor",
      "Transportation in air-conditioned vehicle",
      "Professional Egyptologist guide",
      "Entrance fees to all mentioned sites",
      "Bottled water during the tour",
      "Lunch at a local restaurant",
    ],
    excluded: [
      "Entrance to Tutankhamun's tomb (additional $15 USD)",
      "Entrance to Seti I's tomb (additional $20 USD)",
      "Gratuities",
      "Personal expenses",
    ],
    faqs: [
      {
        question: "Can I visit Tutankhamun's tomb?",
        answer:
          "Yes, you can visit King Tut's tomb for an additional fee. While it's smaller than other tombs, it's the most famous due to the discovery of his intact treasure. Your guide can arrange this on-site.",
      },
      {
        question: "How much walking is involved?",
        answer:
          "This tour involves moderate walking, including some uphill paths in the Valley of the Kings. Wear comfortable walking shoes and bring water. The Temple of Hatshepsut has ramps for easier access.",
      },
      {
        question: "Is photography allowed?",
        answer:
          "Photography is allowed in most areas but prohibited inside the tombs to preserve the ancient paintings. You can take photos at the temple exteriors and the Colossi of Memnon.",
      },
      {
        question: "What time should I book this tour?",
        answer:
          "We recommend early morning starts to avoid the midday heat and crowds. The Valley of the Kings is particularly busy after 10:00 AM, so our early departure gives you a more peaceful experience.",
      },
    ],
    relatedTourSlugs: ["abu-simbel-temples", "luxor-hot-air-balloon", "giza-pyramids-sphinx"],
  },
  {
    id: 3,
    title: "Nile Dinner Cruise",
    slug: "nile-dinner-cruise",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "3 hours",
    location: "Cairo",
    price: "$65",
    rating: 4.7,
    reviews: 312,
    description:
      "Enjoy a magical evening on the Nile with a gourmet dinner and traditional entertainment including belly dancing and a Tanoura show. Experience the romance of cruising down the world's most famous river while savoring delicious Egyptian cuisine.",
    category: "Cultural",
    groupSize: "Up to 50 people",
    highlights: [
      "Sail along the Nile River on a luxury dinner cruise",
      "Enjoy a delicious open buffet dinner with international and Egyptian dishes",
      "Watch a mesmerizing belly dancing performance",
      "Be amazed by the traditional Tanoura (whirling dervish) show",
      "Take in panoramic views of Cairo's illuminated skyline",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nile Dinner Cruise Experience",
        description:
          "Your driver will pick you up from your Cairo hotel at 6:00 PM and transfer you to the Nile cruise boat. Board the beautifully decorated vessel and find your table. As the boat begins its journey along the Nile, enjoy welcome drinks and the scenic views of Cairo at sunset. The open buffet dinner features a variety of Egyptian and international cuisine. While you dine, be entertained by a professional belly dancer showcasing this ancient Egyptian art form. After dinner, watch the spectacular Tanoura show, where performers in colorful spinning skirts create a hypnotic display. Cruise past illuminated landmarks including the Cairo Tower and bridges. The cruise returns to dock around 9:00 PM, followed by drop-off at your hotel.",
        meals: ["Dinner"],
      },
    ],
    included: [
      "Hotel pickup and drop-off in Cairo",
      "2-hour Nile River cruise",
      "Open buffet dinner with Egyptian and international cuisine",
      "Belly dancing show",
      "Tanoura (whirling dervish) show",
      "Welcome drink",
    ],
    excluded: [
      "Alcoholic beverages (available for purchase on board)",
      "Gratuities",
      "Personal expenses",
    ],
    faqs: [
      {
        question: "What type of food is served?",
        answer:
          "The open buffet includes a wide variety of options: Egyptian classics like kofta and rice, international dishes, fresh salads, bread, and desserts. Vegetarian options are available. Special dietary requirements can be accommodated with advance notice.",
      },
      {
        question: "Is alcohol available on the cruise?",
        answer:
          "Alcoholic beverages are available for purchase on board at an additional cost. The welcome drink included is non-alcoholic, typically juice or a soft drink.",
      },
      {
        question: "What should I wear?",
        answer:
          "Smart casual attire is recommended. Many guests dress up for this evening experience. In winter months, bring a light jacket as it can be breezy on the river.",
      },
      {
        question: "Is this suitable for families?",
        answer:
          "Yes, this is a family-friendly experience. Children typically enjoy the boat ride, the food, and especially the Tanoura show with its colorful costumes and spinning.",
      },
    ],
    relatedTourSlugs: ["cairo-food-tour", "pyramids-sound-light-show", "giza-pyramids-sphinx"],
  },
  {
    id: 4,
    title: "Alexandria Day Trip",
    slug: "alexandria-day-trip",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "12 hours",
    location: "Alexandria",
    price: "$95",
    rating: 4.6,
    reviews: 178,
    description:
      "Visit the Mediterranean jewel of Egypt. Explore the Catacombs of Kom El Shoqafa, Pompey's Pillar, the Citadel of Qaitbay, and the modern Library of Alexandria. Experience the unique blend of ancient history and modern culture in Egypt's second-largest city.",
    category: "Historical",
    groupSize: "Up to 15 people",
    highlights: [
      "Explore the ancient Catacombs of Kom El Shoqafa, one of the Seven Wonders of the Middle Ages",
      "Visit the imposing Citadel of Qaitbay, built on the site of the ancient Lighthouse",
      "See Pompey's Pillar, a 25-meter granite column dating from 297 AD",
      "Discover the modern Library of Alexandria, a tribute to the ancient library",
      "Stroll along the Mediterranean Corniche with time for fresh seafood lunch",
    ],
    itinerary: [
      {
        day: 1,
        title: "Alexandria Full Day Tour",
        description:
          "Depart Cairo at 7:00 AM for the scenic 3-hour drive to Alexandria along the desert highway. Your first stop is the Catacombs of Kom El Shoqafa, a fascinating underground necropolis blending Egyptian, Greek, and Roman art. Next, visit Pompey's Pillar, the largest ancient monument in Alexandria. Continue to the Citadel of Qaitbay, a 15th-century fortress built on the exact location of the ancient Lighthouse of Alexandria. Enjoy lunch at a local seafood restaurant overlooking the Mediterranean. After lunch, visit the modern Library of Alexandria with its striking disc-shaped design. If time permits, take a brief walk along the Corniche. Return to Cairo around 7:00 PM.",
        meals: ["Lunch"],
      },
    ],
    included: [
      "Hotel pickup and drop-off in Cairo",
      "Transportation in air-conditioned vehicle",
      "Professional Egyptologist guide",
      "Entrance fees to all mentioned sites",
      "Lunch at a seafood restaurant",
      "Bottled water during the tour",
    ],
    excluded: [
      "Gratuities",
      "Personal expenses",
      "Drinks at lunch",
    ],
    faqs: [
      {
        question: "Is the drive to Alexandria comfortable?",
        answer:
          "Yes, the 3-hour drive is on a modern highway with comfortable air-conditioned vehicles. We provide bottled water and make rest stops if needed.",
      },
      {
        question: "Can we swim in the Mediterranean?",
        answer:
          "This tour focuses on historical and cultural sites rather than beach activities. However, there's a brief stop at the Corniche where you can enjoy the sea views.",
      },
      {
        question: "What about the ancient Library of Alexandria?",
        answer:
          "The original ancient library no longer exists. The modern Bibliotheca Alexandrina was built as a commemoration and is an impressive cultural center with millions of books and exhibition spaces.",
      },
      {
        question: "Is lunch included?",
        answer:
          "Yes, lunch at a local seafood restaurant is included. Alexandria is famous for its fresh seafood. Vegetarian options are also available.",
      },
    ],
    relatedTourSlugs: ["giza-pyramids-sphinx", "cairo-food-tour", "nile-dinner-cruise"],
  },
  {
    id: 5,
    title: "Abu Simbel Temples",
    slug: "abu-simbel-temples",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "12 hours",
    location: "Aswan",
    price: "$140",
    rating: 4.9,
    reviews: 156,
    description:
      "Marvel at the colossal temples of Abu Simbel, built by Ramses II. Learn about the UNESCO project that saved these monuments from the rising waters of Lake Nasser. Witness one of Egypt's most impressive archaeological sites.",
    category: "Historical",
    groupSize: "Up to 15 people",
    highlights: [
      "See the four colossal 20-meter statues of Ramses II at the Great Temple",
      "Visit the Temple of Hathor dedicated to Queen Nefertari",
      "Learn about the incredible UNESCO relocation project in the 1960s",
      "Explore intricate hieroglyphics and wall carvings inside the temples",
      "Experience the grandeur of ancient Egyptian architecture in a stunning desert setting",
    ],
    itinerary: [
      {
        day: 1,
        title: "Abu Simbel Temple Complex Visit",
        description:
          "Your guide will pick you up from your Aswan hotel at 4:00 AM for the early morning drive to Abu Simbel (280 km south). Arrive around 7:30 AM to explore the temples before the heat of the day. First, visit the Great Temple of Ramses II, carved directly into the mountainside with its four massive seated statues. Enter the temple to see the hypostyle hall with eight Osiris pillars and the sanctuary with the gods of Memphis and Thebes. Next, explore the smaller but equally beautiful Temple of Hathor, dedicated to Ramses' beloved wife Nefertari. Your guide will explain the remarkable UNESCO project that relocated these temples to higher ground when the Aswan High Dam was built. Depart Abu Simbel around 11:00 AM, arriving back in Aswan by 2:30 PM.",
        meals: ["Breakfast box"],
      },
    ],
    included: [
      "Hotel pickup and drop-off in Aswan",
      "Transportation in air-conditioned vehicle",
      "Professional Egyptologist guide",
      "Entrance fees to Abu Simbel temples",
      "Breakfast box",
      "Bottled water during the tour",
    ],
    excluded: [
      "Gratuities",
      "Lunch",
      "Personal expenses",
    ],
    faqs: [
      {
        question: "Why such an early start?",
        answer:
          "The early departure allows us to avoid the desert heat and crowds. You'll experience the temples in the peaceful morning light, which is ideal for photography. The drive back is completed before the hottest part of the day.",
      },
      {
        question: "Can I fly to Abu Simbel instead?",
        answer:
          "Yes, there are flight options available from Aswan to Abu Simbel. Please inquire about our air tour option, which is more expensive but saves considerable travel time.",
      },
      {
        question: "Is it worth the long drive?",
        answer:
          "Absolutely! Abu Simbel is considered one of Egypt's most spectacular sites. The scale and artistry of these temples are breathtaking, and the UNESCO relocation story adds to their significance.",
      },
      {
        question: "Is photography allowed?",
        answer:
          "Yes, photography is permitted outside and inside the temples, but flash photography is not allowed to preserve the ancient paintings and carvings.",
      },
    ],
    relatedTourSlugs: ["luxor-valley-of-kings", "giza-pyramids-sphinx", "luxor-hot-air-balloon"],
  },
  {
    id: 6,
    title: "Luxor Hot Air Balloon",
    slug: "luxor-hot-air-balloon",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "3 hours",
    location: "Luxor",
    price: "$120",
    rating: 4.9,
    reviews: 203,
    description:
      "Experience the magic of Luxor from above with a sunrise hot air balloon ride. See the Valley of the Kings, the Nile, and the temples from a unique perspective. Enjoy breathtaking aerial views of the world's greatest open-air museum.",
    category: "Adventure",
    groupSize: "Up to 20 people",
    highlights: [
      "Float peacefully above Luxor's ancient monuments at sunrise",
      "Get bird's-eye views of the Valley of the Kings and Queens",
      "See the Temple of Hatshepsut and Colossi of Memnon from above",
      "Watch the sunrise paint the desert and Nile in golden light",
      "Receive a flight certificate and commemorative photos",
    ],
    itinerary: [
      {
        day: 1,
        title: "Sunrise Hot Air Balloon Flight",
        description:
          "Your adventure begins with pickup from your Luxor hotel around 4:30 AM. Transfer to the West Bank launch site where you'll watch the balloon being inflated as the sky lightens. After a safety briefing, board the balloon basket for your approximately 45-minute flight. As you gently rise into the air, watch the sunrise illuminate the Valley of the Kings, the Temple of Hatshepsut, the Ramesseum, and the vast expanse of agricultural land along the Nile. Your experienced pilot will point out landmarks and provide interesting commentary. After landing, celebrate with a traditional post-flight refreshment and receive your flight certificate. Return to your hotel around 7:30 AM in time for breakfast.",
        meals: [],
      },
    ],
    included: [
      "Hotel pickup and drop-off in Luxor",
      "Approximately 45-minute hot air balloon flight",
      "Experienced pilot and ground crew",
      "All safety equipment",
      "Post-flight refreshments",
      "Flight certificate",
      "Transport to and from launch site",
    ],
    excluded: [
      "Gratuities",
      "Personal expenses",
      "Hotel breakfast (you'll return in time)",
    ],
    faqs: [
      {
        question: "Is it safe?",
        answer:
          "Yes, hot air ballooning in Luxor is very safe. Our balloons are regularly inspected, and our pilots are highly experienced with thousands of flight hours. We follow strict safety protocols and only fly in suitable weather conditions.",
      },
      {
        question: "What if I'm afraid of heights?",
        answer:
          "The balloon ride is surprisingly gentle and peaceful. Many people who fear heights find ballooning comfortable because there's no sensation of falling and the basket provides a secure feeling. However, if you have serious height phobia, this may not be the tour for you.",
      },
      {
        question: "What should I wear?",
        answer:
          "Wear comfortable layers as it can be cool in the early morning but warms up after sunrise. Closed-toe shoes are required. Bring a camera, but secure it with a strap. Hats should be secured as well.",
      },
      {
        question: "Can the flight be cancelled?",
        answer:
          "Flights are weather-dependent and may be cancelled due to high winds or poor visibility. If cancelled, we'll offer a full refund or reschedule for the next available day. Cancellations are rare but safety is our priority.",
      },
    ],
    relatedTourSlugs: ["luxor-valley-of-kings", "abu-simbel-temples", "hurghada-snorkeling-trip"],
  },
  {
    id: 7,
    title: "Hurghada Snorkeling Trip",
    slug: "hurghada-snorkeling-trip",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "7 hours",
    location: "Hurghada",
    price: "$75",
    rating: 4.7,
    reviews: 289,
    description:
      "Discover the underwater wonders of the Red Sea. Snorkel among colorful coral reefs and exotic fish with professional guides. Experience some of the world's best snorkeling at multiple pristine locations.",
    category: "Adventure",
    groupSize: "Up to 20 people",
    highlights: [
      "Snorkel at 2-3 premium Red Sea reef locations",
      "See vibrant coral reefs and hundreds of colorful fish species",
      "Spot dolphins, sea turtles, and rays in their natural habitat",
      "Enjoy a freshly prepared lunch on board the boat",
      "Relax and sunbathe on the boat between snorkeling sessions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Red Sea Snorkeling Adventure",
        description:
          "Pickup from your Hurghada hotel around 8:00 AM and transfer to the marina. Board your snorkeling boat and receive a safety briefing and snorkeling equipment. Set sail to the first snorkeling location, typically a pristine coral reef teeming with marine life. Spend 45 minutes snorkeling, guided by an experienced snorkel guide who'll point out interesting creatures. Return to the boat for refreshments before sailing to the second location, often known for dolphin sightings. Enjoy lunch on board while cruising. Make a third snorkeling stop at another beautiful reef location. Between sessions, relax on the sun deck or shade area. Return to marina around 3:00 PM with transfer back to your hotel by 4:00 PM.",
        meals: ["Lunch"],
      },
    ],
    included: [
      "Hotel pickup and drop-off in Hurghada",
      "Full-day boat trip on the Red Sea",
      "Professional snorkel guide",
      "All snorkeling equipment (mask, fins, snorkel, life jacket)",
      "Fresh lunch on board",
      "Soft drinks and water throughout the day",
      "Two to three snorkeling stops",
    ],
    excluded: [
      "Wetsuit rental (available for $5 in winter months)",
      "Underwater camera rental (available for $15)",
      "Gratuities",
      "National park fees ($5 per person, paid directly)",
    ],
    faqs: [
      {
        question: "Do I need to know how to swim?",
        answer:
          "No, you don't need to be a strong swimmer. Life jackets are provided for all guests, and shallow areas are available. Our guides stay close to help anyone who needs assistance.",
      },
      {
        question: "What will I see underwater?",
        answer:
          "The Red Sea is famous for its biodiversity. Expect to see colorful parrotfish, clownfish, angelfish, butterflyfish, and many others. Coral formations are spectacular with vibrant colors. You might also spot dolphins, sea turtles, or rays!",
      },
      {
        question: "Is the water cold?",
        answer:
          "Water temperatures range from 22°C (72°F) in winter to 28°C (82°F) in summer. Most people find it comfortable year-round, but wetsuits are available for rent in winter months if you feel cold.",
      },
      {
        question: "Can I bring my own snorkel gear?",
        answer:
          "Yes, you're welcome to bring your own equipment if you prefer. However, we provide quality gear that's cleaned and maintained regularly.",
      },
    ],
    relatedTourSlugs: ["luxor-hot-air-balloon", "alexandria-day-trip", "giza-pyramids-sphinx"],
  },
  {
    id: 8,
    title: "Cairo Food Tour",
    slug: "cairo-food-tour",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "4 hours",
    location: "Cairo",
    price: "$55",
    rating: 4.8,
    reviews: 167,
    description:
      "Taste your way through Cairo's vibrant food scene. Sample traditional Egyptian dishes, street food, and local delicacies with a knowledgeable food guide. Experience authentic flavors at beloved local spots that tourists rarely find.",
    category: "Cultural",
    groupSize: "Up to 10 people",
    highlights: [
      "Sample 10-15 different Egyptian dishes and street foods",
      "Visit local markets, street food stalls, and family-run restaurants",
      "Try koshari, ful medames, ta'ameya (Egyptian falafel), and more",
      "Enjoy traditional desserts like basbousa and kunafa",
      "Learn about Egyptian food culture and cooking techniques from your expert guide",
    ],
    itinerary: [
      {
        day: 1,
        title: "Cairo Culinary Journey",
        description:
          "Meet your food-loving guide at 4:00 PM in Downtown Cairo. Begin at a historic cafe for traditional Egyptian tea and conversation about food culture. Walk to a local market to see fresh produce, spices, and ingredients while sampling dried fruits and nuts. Stop at a famous koshari restaurant to try Egypt's national dish - a delicious mix of rice, lentils, pasta, and crispy onions. Continue to a street food vendor for ta'ameya (Egyptian falafel) and fresh baladi bread. Visit a family-run restaurant for mahshi (stuffed vegetables) and molokhia (green soup). Sample grilled meats at a local kebab shop. End your tour at a traditional sweet shop for basbousa, kunafa, and other Egyptian desserts with Egyptian coffee or tea. Tour concludes around 8:00 PM.",
        meals: ["Multiple tastings"],
      },
    ],
    included: [
      "Expert food guide (small groups for personalized experience)",
      "All food and drink tastings (equivalent to a full meal)",
      "Bottled water",
      "Walking tour of local neighborhoods",
    ],
    excluded: [
      "Hotel pickup/drop-off (meeting point in central Cairo)",
      "Gratuities",
      "Additional food or drinks beyond included tastings",
    ],
    faqs: [
      {
        question: "How much food is included?",
        answer:
          "You'll sample 10-15 different items across multiple stops. The portions add up to a full meal (actually quite filling!). Come hungry and prepare to leave satisfied.",
      },
      {
        question: "Are vegetarian options available?",
        answer:
          "Yes! Egyptian cuisine has many delicious vegetarian options including koshari, ta'ameya, ful medames, salads, and various vegetable dishes. Please inform us of dietary requirements when booking.",
      },
      {
        question: "Is the food safe to eat?",
        answer:
          "We only visit trusted establishments with high food safety standards. Our guides eat at these places regularly. However, if you have a very sensitive stomach, consult with your guide about options.",
      },
      {
        question: "What if I don't like something?",
        answer:
          "No problem! This is about exploration and cultural experience. Try what interests you, but you're never obligated to eat anything you're uncomfortable with.",
      },
    ],
    relatedTourSlugs: ["nile-dinner-cruise", "giza-pyramids-sphinx", "alexandria-day-trip"],
  },
  {
    id: 9,
    title: "Pyramids Sound & Light Show",
    slug: "pyramids-sound-light-show",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "2 hours",
    location: "Cairo",
    price: "$45",
    rating: 4.5,
    reviews: 231,
    description:
      "Experience the Pyramids and Sphinx illuminated at night with a spectacular sound and light show that tells the story of ancient Egypt. Watch as the monuments come alive with colorful projections and narration that brings 5,000 years of history to life.",
    category: "Cultural",
    groupSize: "Up to 100 people",
    highlights: [
      "Watch the Pyramids and Sphinx illuminated with colorful lights",
      "Hear the fascinating story of ancient Egypt narrated by the Sphinx",
      "Learn about the pharaohs who built these monuments",
      "See dramatic laser and light projections on the ancient stones",
      "Experience the pyramids in a magical evening atmosphere",
    ],
    itinerary: [
      {
        day: 1,
        title: "Sound and Light Show Experience",
        description:
          "Your driver will pick you up from your Cairo or Giza hotel around 6:00 PM (winter) or 7:00 PM (summer), depending on the season and show schedule. Arrive at the Giza Plateau and take your seat at the outdoor theater facing the pyramids and Sphinx. As darkness falls, the show begins with the Sphinx as the narrator, telling the story of the pyramids' construction and the pharaohs who built them. Watch as colored lights illuminate different pyramids while dramatic music and narration bring ancient Egypt to life. Laser projections create stunning visual effects on the ancient stones. The show covers 5,000 years of history in about 45 minutes. After the show, return to your vehicle for drop-off at your hotel around 8:30-9:30 PM.",
        meals: [],
      },
    ],
    included: [
      "Hotel pickup and drop-off in Cairo or Giza",
      "Transportation in air-conditioned vehicle",
      "Entry ticket to the Sound and Light Show",
      "Reserved seating",
    ],
    excluded: [
      "Gratuities",
      "Food and beverages",
      "Personal expenses",
    ],
    faqs: [
      {
        question: "What languages is the show available in?",
        answer:
          "The show is available in multiple languages including English, French, German, Spanish, Italian, Russian, and Arabic. Different languages are shown on different days. Please confirm the schedule for your preferred language when booking.",
      },
      {
        question: "Is the show affected by weather?",
        answer:
          "The show is outdoors and may be cancelled in case of heavy rain (rare in Egypt). However, it operates year-round. Bring a light jacket in winter months as it can be cool in the evening.",
      },
      {
        question: "Can we take photos during the show?",
        answer:
          "Yes, photography is allowed during the show. The illuminated pyramids make for spectacular photos. We recommend bringing a camera capable of night photography for best results.",
      },
      {
        question: "Is this suitable for children?",
        answer:
          "Yes, children generally enjoy the colorful lights and dramatic presentation. The show lasts about 45 minutes. Very young children might get restless, but most kids find it entertaining and educational.",
      },
    ],
    relatedTourSlugs: ["giza-pyramids-sphinx", "nile-dinner-cruise", "cairo-food-tour"],
  },
]

export function getTours(): Tour[] {
  return tours
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug)
}

export function getTourById(id: number): Tour | undefined {
  return tours.find((tour) => tour.id === id)
}

export function getFeaturedTours(limit: number = 7): Tour[] {
  return tours.slice(0, limit)
}

export function getRelatedTours(slug: string, limit: number = 3): Tour[] {
  const tour = getTourBySlug(slug)
  if (!tour || !tour.relatedTourSlugs) {
    // Return random tours if no related tours specified
    return tours.filter((t) => t.slug !== slug).slice(0, limit)
  }

  const relatedTours = tour.relatedTourSlugs
    .map((relatedSlug) => getTourBySlug(relatedSlug))
    .filter((t): t is Tour => t !== undefined)
    .slice(0, limit)

  // If we don't have enough related tours, fill with random ones
  if (relatedTours.length < limit) {
    const additionalTours = tours
      .filter(
        (t) =>
          t.slug !== slug &&
          !relatedTours.some((rt) => rt.slug === t.slug)
      )
      .slice(0, limit - relatedTours.length)
    return [...relatedTours, ...additionalTours]
  }

  return relatedTours
}

export function getAllTourSlugs(): string[] {
  return tours.map((tour) => tour.slug)
}
