export interface Product {
  id: string;
  name: string;
  designer: string;
  price: number;
  image: string;
  hoverImage: string;
  category: string;
  department: 'Men' | 'Women' | 'Kids';
  trending?: boolean;
  offer?: string;
  description: string;
  images: string[];
  stockLeft?: number;
  rating?: number;
  reviewCount?: number;
}

const manualProducts: Product[] = [
  // Women
  {
    id: "w1",
    name: "Silk Satin Midi Dress",
    designer: "VÈLURE",
    price: 890,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&q=80&w=800",
    category: "Dresses",
    department: 'Women',
    trending: true,
    description: "A liquid-like silk satin midi dress that drapes flawlessly. Features a cowl neckline, delicate spaghetti straps, and a sultry side slit.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&q=80&w=800"
    ],
    stockLeft: 3,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: "w2",
    name: "Architectural Heel Sandals",
    designer: "VÈLURE",
    price: 720,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800",
    category: "Shoes",
    department: 'Women',
    description: "A statement shoe featuring a sculptural gold-plated heel and minimalist leather straps. Balances artful design with wearable comfort.",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800"
    ],
    stockLeft: 12,
    rating: 4.8,
    reviewCount: 18
  },
  {
    id: "w3",
    name: "Structured Leather Tote",
    designer: "LUCIEN",
    price: 1850,
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    department: 'Women',
    offer: "Complimentary Monogramming",
    description: "Handcrafted in Italy from full-grain calf leather. This structured tote features gold-tone hardware, a spacious suede-lined interior, and top handles.",
    images: [
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800"
    ],
    stockLeft: 5,
    rating: 5.0,
    reviewCount: 89
  },
  {
    id: "w4",
    name: "Cashmere Wrap Cardigan",
    designer: "AURELIA",
    price: 590,
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1617265977931-bd0a39a9c2ca?auto=format&fit=crop&q=80&w=800",
    category: "Knitwear",
    department: 'Women',
    description: "An incredibly soft cashmere wrap cardigan that can be styled in multiple ways.",
    images: [
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1617265977931-bd0a39a9c2ca?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    reviewCount: 38
  },
  
  // Men
  {
    id: "m1",
    name: "Oversized Cashmere Coat",
    designer: "AURELIA",
    price: 1250,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
    category: "Outerwear",
    department: 'Men',
    trending: true,
    description: "An elegant oversized coat crafted from the finest double-faced cashmere. Features a relaxed silhouette, drop shoulders, and a self-tie belt. The perfect outer layer for modern transitioning aesthetics.",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
    ],
    stockLeft: 2,
    rating: 4.9,
    reviewCount: 112
  },
  {
    id: "m2",
    name: "Merino Ribbed Turtleneck",
    designer: "NOIR",
    price: 450,
    image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    category: "Knitwear",
    department: 'Men',
    offer: "15% off",
    description: "A luxurious and foundational wardrobe piece. This fine-ribbed merino wool turtleneck offers a second-skin fit.",
    images: [
      "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.7,
    reviewCount: 56
  },
  {
    id: "m3",
    name: "Classic Leather Loafers",
    designer: "ATELIER",
    price: 680,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b814?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=800",
    category: "Shoes",
    department: 'Men',
    description: "Timeless penny loafers in rich espresso leather, featuring a Goodyear welted sole for enduring luxury.",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b814?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=800"
    ],
    stockLeft: 8,
    rating: 4.8,
    reviewCount: 34
  },
  {
    id: "m4",
    name: "Structured Wool Blazer",
    designer: "LUCIEN",
    price: 950,
    image: "https://images.unsplash.com/photo-1592878940526-0214b0f374f6?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    category: "Outerwear",
    department: 'Men',
    description: "A sharply tailored wool blazer that adds instant elevation to any outfit.",
    images: [
      "https://images.unsplash.com/photo-1592878940526-0214b0f374f6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    reviewCount: 45
  },
  
  // Kids
  {
    id: "k1",
    name: "Miniature Cashmere Cardigan",
    designer: "PETIT NOIR",
    price: 240,
    image: "https://images.unsplash.com/photo-1519238263530-99eaa141f8ae?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1522771930-78848d92fa24?auto=format&fit=crop&q=80&w=800",
    category: "Knitwear",
    department: 'Kids',
    description: "An incredibly soft cashmere cardigan for the little ones, featuring delicate mother-of-pearl buttons.",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99eaa141f8ae?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522771930-78848d92fa24?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    reviewCount: 22
  },
  {
    id: "k2",
    name: "Denim Overalls",
    designer: "LUMI",
    price: 180,
    image: "https://images.unsplash.com/photo-1604467715878-83e57e841243?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800",
    category: "Bottoms",
    department: 'Kids',
    trending: true,
    description: "Durable and stylish selvedge denim overalls customized with adjustable straps and reinforced knees.",
    images: [
      "https://images.unsplash.com/photo-1604467715878-83e57e841243?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800"
    ],
    stockLeft: 4,
    rating: 4.7,
    reviewCount: 61
  },
  {
    id: "k3",
    name: "Classic Cotton Trench",
    designer: "PETIT NOIR",
    price: 320,
    image: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=800",
    category: "Outerwear",
    department: 'Kids',
    description: "A miniature version of our signature adult trench coat, tailored in premium cotton gabardine.",
    images: [
      "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 5.0,
    reviewCount: 14
  },
  {
    id: "k4",
    name: "Linen Summer Dress",
    designer: "LUMI",
    price: 150,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1604467715878-83e57e841243?auto=format&fit=crop&q=80&w=800",
    category: "Dresses",
    department: 'Kids',
    description: "Breathable pure linen dress perfect for warm summer days, featuring delicate embroidery.",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    reviewCount: 27
  }
];

const generateBulkProducts = (department: 'Men' | 'Women' | 'Kids', count: number): Product[] => {
  const images = {
    Men: [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=400", 
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=400", 
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=400"
    ],
    Women: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=400", 
      "https://images.unsplash.com/photo-1515347619152-16aeeeb342bc?auto=format&fit=crop&q=80&w=400", 
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&q=80&w=400"
    ],
    Kids: [
      "https://images.unsplash.com/photo-1662973415137-ed8a9ea3eec7?auto=format&fit=crop&q=80&w=400", 
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=400", 
      "https://images.unsplash.com/photo-1604467715878-83e57e841243?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=80&w=400"
    ]
  };
  const categories = {
    Men: ["Shirts", "Jeans", "Jackets", "T-Shirts", "Ethnic Wear", "Trousers", "Blazers"],
    Women: ["Dresses", "Kurtis", "Tops", "Sarees", "Jeans", "Skirts", "Outerwear"],
    Kids: ["Casual Wear", "School Wear", "Festive Wear", "Sleepwear", "Outerwear"]
  };
  const designers = ["VÈLURE", "LUCIEN", "AURELIA", "NOIR", "ATELIER", "LUMI", "PETIT NOIR"];
  
  return Array.from({ length: count }).map((_, i) => {
    const cat = categories[department][i % categories[department].length];
    const designer = designers[i % designers.length];
    const image = images[department][i % images[department].length];
    const hoverImage = images[department][(i + 1) % images[department].length];
    const price = Math.floor(Math.random() * 800) + 150;
    
    return {
      id: `${department.toLowerCase()[0]}_bulk_${i}`,
      name: `${designer} ${cat}`,
      designer,
      price,
      offer: Math.random() > 0.8 ? '15% Off' : undefined,
      image,
      hoverImage,
      category: cat,
      department,
      description: `Premium quality ${cat.toLowerCase()} from ${designer}. Designed for everyday elegance and crafted carefully from the highest quality resources.`,
      images: [image, hoverImage],
      rating: +(Math.random() + 4).toFixed(1),
      reviewCount: Math.floor(Math.random() * 500) + 10,
      trending: Math.random() > 0.8
    };
  });
};

export const products = [ 
  ...manualProducts, 
  ...generateBulkProducts('Men', 100), 
  ...generateBulkProducts('Women', 100), 
  ...generateBulkProducts('Kids', 100) 
];
