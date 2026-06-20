export const categories = [
  { id: 'all', name: 'All Scoops' },
  { id: 'specials', name: 'Signature Specials' },
  { id: 'premium', name: 'Premium Range' },
  { id: 'slabs', name: 'Ice Cream Slabs' },
  { id: 'milkshakes', name: 'Thick Milkshakes' }
];

export const menuItems = [
  // --- SIGNATURE SPECIALS ---
  {
    id: 'gadbad',
    name: 'Classic Gadbad',
    category: 'specials',
    price: 150,
    description: 'The legendary Mangalorean sundae layered with dry fruits, jelly, fresh fruits, and three rich flavors of ice cream.',
    image: '/images/gadbad.png',
    badge: 'Signature'
  },
  {
    id: 'biscoff-sundae',
    name: 'Biscoff Sundae',
    category: 'specials',
    price: 180,
    description: 'Rich vanilla and caramel scoops topped with Lotus Biscoff spread, crushed biscuit crumbles, and caramel drizzle.',
    image: '/images/biscoff_sundae.png',
    badge: 'Must Try'
  },
  {
    id: 'tiramisu-special',
    name: 'Tiramisu Sundae',
    category: 'specials',
    price: 170,
    description: 'Coffee-soaked sponge cake layers, creamy vanilla mascarpone ice cream, dusted with premium cocoa powder.',
    image: '/images/tiramisu.png',
    badge: 'Chef\'s Special'
  },
  {
    id: 'american-choconut',
    name: 'American Choconut',
    category: 'specials',
    price: 110,
    description: 'Creamy chocolate scoops loaded with premium roasted almonds, crunchy cashews, and hot chocolate fudge.',
    image: '/images/american_choconut.png',
    badge: 'Best Seller'
  },
  {
    id: 'rubys-special',
    name: "Ruby's Special Sundae",
    category: 'specials',
    price: 220,
    description: 'Our ultimate house specialty! A glorious blend of choice ice cream scoops, cocktail fruits, premium nuts, and secret syrup.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop',
    badge: 'Royal Favorite'
  },
  {
    id: 'chocolate-dad',
    name: 'Chocolate Dad',
    category: 'specials',
    price: 140,
    description: 'Double scoop of dark chocolate ice cream served with warm chocolate cake crumbles, rich hot fudge, and toasted nuts.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop',
    badge: 'Best Seller'
  },
  {
    id: 'sandy-nutts',
    name: 'Sandy Nutts',
    category: 'specials',
    price: 120,
    description: 'Soft vanilla ice cream loaded with mixed roasted nuts, pure honey, and a generous caramel sauce drizzle.',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=600&auto=format&fit=crop',
    badge: 'Customer Favorite'
  },
  {
    id: 'senorita',
    name: 'Senorita',
    category: 'specials',
    price: 120,
    description: 'Vanilla and strawberry scoops paired with sweet pineapple tidbits, strawberry sauce, and nuts.',
    image: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?q=80&w=600&auto=format&fit=crop',
    badge: 'Chef\'s Special'
  },
  {
    id: 'dilkush',
    name: 'Dilkush Sundae',
    category: 'specials',
    price: 160,
    description: 'A nostalgic combination of strawberry, vanilla, and pineapple ice creams, fresh fruit slices, and strawberry crush.',
    image: 'https://images.unsplash.com/photo-1505394033641-42c6c2950793?q=80&w=600&auto=format&fit=crop',
    badge: 'Classic'
  },
  {
    id: 'royal-falooda',
    name: 'Royal Falooda',
    category: 'specials',
    price: 100,
    description: 'Authentic falooda mix with vermicelli, sweet basil seeds, rose syrup, cold milk, topped with a scoop of vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600&auto=format&fit=crop',
    badge: 'Cooler'
  },
  {
    id: 'parfait-classic',
    name: 'Classic Parfait',
    category: 'specials',
    price: 160,
    description: 'Tall glass layered with fresh fruit salad, strawberry syrup, vanilla, and mango ice cream, topped with rich cashew halves.',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=600&auto=format&fit=crop',
    badge: 'Classic'
  },
  {
    id: 'banana-special',
    name: 'Banana Special Split',
    category: 'specials',
    price: 150,
    description: 'Fresh banana split served with strawberry, chocolate, and vanilla scoops, chocolate fudge, and whipped cream.',
    image: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?q=80&w=600&auto=format&fit=crop',
    badge: 'Traditional'
  },

  // --- PREMIUM RANGE ---
  {
    id: 'roasted-almond',
    name: 'Roasted Almond',
    category: 'premium',
    price: 75,
    description: 'Rich and buttery vanilla ice cream loaded with premium golden-roasted almond chunks.',
    image: 'https://images.unsplash.com/photo-1501443715855-6cf45ba6ac52?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'angeer-delight',
    name: 'Anjeer Delight',
    category: 'premium',
    price: 75,
    description: 'Luxurious cream base blended with sweet, chewy dried fig bits for an exotic, sophisticated flavor.',
    image: 'https://images.unsplash.com/photo-1534706936960-8e9014c0b897?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'arabian-delight',
    name: 'Arabian Delight',
    category: 'premium',
    price: 75,
    description: 'A rich mixture of dates, nuts, and exotic spices swirled in fresh dairy cream.',
    image: 'https://images.unsplash.com/photo-1505394033641-42c6c2950793?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'kaju-malai',
    name: 'Kaju Malai',
    category: 'premium',
    price: 75,
    description: 'Creamy malai ice cream filled with rich, ghee-roasted cashew nuts.',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'butter-scotch-grand',
    name: 'Butter Scotch Grand',
    category: 'premium',
    price: 75,
    description: 'Caramelized brown butter ice cream packed with crunchy homemade butterscotch praline.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop'
  },

  // --- SLABS (REGULAR) ---
  {
    id: 'slab-kesar',
    name: 'Kesar Slab',
    category: 'slabs',
    price: 50,
    description: 'Classic rich saffron-flavored ice cream, a traditional Indian favorite.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'slab-chocolate',
    name: 'Chocolate Slab',
    category: 'slabs',
    price: 60,
    description: 'Decadent smooth milk chocolate ice cream slab, perfect for chocolate purists.',
    image: 'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'slab-irish-coffee',
    name: 'Irish Coffee Slab',
    category: 'slabs',
    price: 60,
    description: 'A bold, sophisticated blend of fresh coffee and Irish cream flavor.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'slab-jackfruit-payasam',
    name: 'Jackfruit Payasam Slab',
    category: 'slabs',
    price: 65,
    description: 'A unique seasonal creation mimicking traditional coastal jackfruit payasam dessert.',
    image: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'slab-ideal-fruity',
    name: 'Ideal Fruity Slab',
    category: 'slabs',
    price: 65,
    description: 'Fruit cocktail flavor embedded with candied fruits (tutti-frutti) and soft nuts.',
    image: 'https://images.unsplash.com/photo-1505394033641-42c6c2950793?q=80&w=600&auto=format&fit=crop'
  },

  // --- MILKSHAKES ---
  {
    id: 'shake-biscoff',
    name: 'Lotus Biscoff Shake',
    category: 'milkshakes',
    price: 100,
    description: 'A heavenly blend of vanilla ice cream, milk, and Lotus Biscoff cookie spread, topped with biscuit crumbs.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop',
    badge: 'Best Seller'
  },
  {
    id: 'shake-oreo',
    name: 'Decadent Oreo Shake',
    category: 'milkshakes',
    price: 70,
    description: 'Chilled creamy vanilla ice cream blended with crushed Oreo cookies and chocolate syrup.',
    image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'shake-chocolate',
    name: 'Classic Chocolate Shake',
    category: 'milkshakes',
    price: 70,
    description: 'Thick, velvety milkshake made with premium Dutch cocoa and chocolate ice cream.',
    image: 'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'shake-anjeera',
    name: 'Rich Anjeer Shake',
    category: 'milkshakes',
    price: 80,
    description: 'Rich, energy-packed milkshake blended with premium sweet dried figs and milk.',
    image: 'https://images.unsplash.com/photo-1534706936960-8e9014c0b897?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'shake-mango',
    name: 'Alphonso Mango Shake',
    category: 'milkshakes',
    price: 70,
    description: 'A refreshing, thick seasonal milkshake made with real Alphonso mango pulp and vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1536746803623-cef87080bfc8?q=80&w=600&auto=format&fit=crop'
  }
];

export const reviews = [
  {
    id: 1,
    name: 'Priya Kamath',
    role: 'Local Guide',
    rating: 5,
    text: "Ruby's Gadbad is absolutely legendary! The layers of jelly, dry fruits, and fresh fruits with three scoops of ice cream is a pure delight. Reminds me of my childhood sundae memories.",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Rohan Shetty',
    role: 'Food Blogger',
    rating: 5,
    text: 'Hands down the best Biscoff Sundae in town. The balance of caramel drizzle and biscuit crunch is perfect. Excellent premium café vibes, and very quick ordering over WhatsApp!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Sneha Hegde',
    role: 'Dessert Enthusiast',
    rating: 5,
    text: "Tried the American Choconut and Tiramisu special. The chocolate fudge is so rich, and the almonds are roasted to perfection. Super easy to order online. Highly recommended!",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  }
];

export const stats = [
  { label: 'Happy Customers', value: 12000, suffix: '+' },
  { label: 'Delicious Flavors', value: 45, suffix: '+' },
  { label: 'Signature Specials', value: 15, suffix: '+' },
  { label: 'Years of Smiles', value: 18, suffix: '+' }
];
