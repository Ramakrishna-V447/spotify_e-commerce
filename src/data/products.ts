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

export const products: Product[] = [
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
