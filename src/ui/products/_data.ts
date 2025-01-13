import { useProductGenerator } from "@/hooks/useProductGenerator";

const rawProducts = [
  {
    name: "Garden Cucumbers",
    description:
      "Crisp, refreshing, and hydrating, cucumbers are a versatile and nutritious vegetable perfect for snacking, salads, and a variety of culinary dishes. With a mild, slightly sweet flavor, cucumbers offer a satisfying crunch and are known for their high water content, making them a great choice for staying hydrated. Rich in essential vitamins, minerals, and antioxidants, cucumbers can also promote skin health, aid digestion, and support overall wellness",
    price: 50000,
    image: "/images/cucumber.svg",
    category: "groceries",
    size: "small",
    quantity: 25,
    limitedOffer: false,
    expressDelivery: false,
    status: "Out of Stock",
    rating: 4.5,
    reviews: [
      {
        user: "David Carl",
        comment:
          "The cucumbers I bought were fresh and crunchy! Perfect for my salads and snacks. They had a great flavor and lasted a good week in my fridge without going bad. Definitely will be purchasing again.",
        rating: 4,
      },
      {
        user: "Sonia",
        comment:
          "The cucumbers were decent, but a few were a little softer than I expected. Most were fresh, though, and worked well in my salad. Not the best batch I've gotten, but still usable.",
        rating: 3,
      },
    ],
    totalReviews: 32,
  },
  {
    name: "Cherry Tomatoes",
    image: "/images/tomatoes.svg",
    description:
      "Bursting with flavor, cherry tomatoes are small, round, and incredibly sweet. These bite-sized delights are perfect for snacking, salads, or adding a pop of color and taste to various dishes. Packed with vitamins, antioxidants, and lycopene, cherry tomatoes not only taste great but also offer numerous health benefits, supporting heart health and potentially reducing the risk of certain cancers.",
    price: 10000,
    category: "groceries",
    quantity: 25,
    size: "small",
    limitedOffer: true,
    expressDelivery: true,
    status: "In Stock",
    rating: 2.5,
    reviews: [
      {
        user: "Alice",
        comment:
          "The cherry tomatoes were sweet and juicy. Perfect for my pasta dishes.",
        rating: 3,
      },
      {
        user: "Bob",
        comment: "Some tomatoes were a bit overripe, but overall good quality.",
        rating: 2,
      },
    ],
    totalReviews: 20,
  },
  {
    name: "Fresh Cilantro",
    description:
      "Fresh cilantro, also known as coriander leaves, is a vibrant herb with a distinctive, citrusy flavor that adds a bright, fresh taste to a wide variety of cuisines. This aromatic herb is rich in antioxidants and vitamins, potentially offering benefits such as improved digestion, reduced inflammation, and support for heart health. Its versatile nature makes it a staple in many kitchens, perfect for garnishing, flavoring sauces, or adding zest to salads and salsas.",
    price: 20000,
    image: "/images/cilantro.svg",
    category: "groceries",
    quantity: 15,
    size: "medium",
    limitedOffer: false,
    expressDelivery: true,
    status: "Out of Stock",
    rating: 3.0,
    reviews: [
      {
        user: "Charlie",
        comment: "The cilantro was fresh and aromatic. Great for my recipes.",
        rating: 3.5,
      },
      {
        user: "Diana",
        comment: "Good quality, but a bit too much stem.",
        rating: 2.5,
      },
    ],
    totalReviews: 15,
  },
  {
    name: "Garden Cucumbers",
    description:
      "These large garden cucumbers are perfect for those who love generous portions or for preparing big batches of refreshing salads and pickles. With their crisp texture and mild, cool flavor, these cucumbers are versatile enough for a wide range of culinary applications. They're an excellent source of hydration and packed with nutrients, making them a healthy addition to any meal or snack.",
    price: 40000,
    image: "/images/cucumber.svg",
    category: "groceries",
    quantity: 20,
    size: "large",
    limitedOffer: false,
    expressDelivery: true,
    status: "In Stock",
    rating: 4.3,
    reviews: [
      {
        user: "Eve",
        comment: "Large cucumbers, perfect for pickling.",
        rating: 4.5,
      },
      {
        user: "Frank",
        comment: "A bit too large for my taste, but still fresh.",
        rating: 4,
      },
    ],
    totalReviews: 25,
  },
  {
    name: "Garden Cucumbers",
    description:
      "Our medium-sized garden cucumbers offer the perfect balance between convenience and versatility. Ideal for slicing into salads, sandwiches, or using as a base for refreshing summer drinks, these cucumbers provide a satisfying crunch and subtle flavor. Rich in vitamins and minerals, they contribute to hydration and overall health, making them a smart choice for health-conscious consumers.",
    price: 50000,
    image: "/images/cucumber.svg",
    category: "groceries",
    quantity: 20,
    size: "medium",
    limitedOffer: true,
    expressDelivery: false,
    status: "Out of Stock",
    rating: 4.1,
    reviews: [
      {
        user: "Grace",
        comment: "Medium-sized cucumbers, very fresh.",
        rating: 4,
      },
      {
        user: "Hank",
        comment: "Good quality, but a bit pricey.",
        rating: 3.9,
      },
    ],
    totalReviews: 18,
  },
  {
    name: "Fresh Cilantro",
    description:
      "Our small bunches of fresh cilantro are perfect for those who enjoy adding a burst of flavor to their dishes without waste. These aromatic herbs are carefully cultivated to ensure maximum freshness and flavor. Cilantro is not only delicious but also packed with antioxidants and vitamins, potentially offering benefits such as improved digestion and detoxification support. Ideal for garnishing tacos, adding to salsas, or infusing Asian-inspired dishes with authentic flavor.",
    price: 50000,
    image: "/images/cilantro.svg",
    category: "groceries",
    quantity: 20,
    size: "small",
    limitedOffer: false,
    expressDelivery: true,
    status: "In Stock",
    rating: 3.5,
    reviews: [
      {
        user: "Ivy",
        comment: "Small cilantro bunches, very fresh.",
        rating: 3.5,
      },
      {
        user: "Jack",
        comment: "Good quality, but a bit too small.",
        rating: 3.5,
      },
    ],
    totalReviews: 22,
  },
  {
    name: "Garden Cucumbers",
    description:
      "Our large garden cucumbers are the epitome of freshness and crunch. Perfect for those who love to experiment in the kitchen, these cucumbers are ideal for creating refreshing salads, pickling, or even as a base for cool summer soups. Their size makes them perfect for slicing into uniform rounds for sandwiches or crudité platters. Packed with hydrating properties and essential nutrients, these cucumbers are not just delicious but also contribute to your daily health goals.",
    price: 50000,
    image: "/images/cucumber.svg",
    category: "groceries",
    quantity: 22,
    size: "large",
    limitedOffer: true,
    expressDelivery: true,
    status: "In Stock",
    rating: 4.6,
    reviews: [
      {
        user: "Karen",
        comment: "Large cucumbers, very fresh and crunchy.",
        rating: 4.7,
      },
      {
        user: "Leo",
        comment: "Good quality, but a bit too large.",
        rating: 4.5,
      },
    ],
    totalReviews: 30,
  },
  {
    name: "Cherry Tomatoes",
    description:
      "Our medium-sized cherry tomatoes offer the perfect balance of sweetness and acidity. These vibrant, juicy tomatoes are ideal for salads, roasting, or eating as a healthy snack. Packed with lycopene, vitamins, and antioxidants, they not only taste great but also offer numerous health benefits, including supporting heart health and potentially reducing the risk of certain cancers. Their convenient size makes them perfect for meal prep or adding a burst of flavor to any dish.",
    price: 70000,
    image: "/images/tomatoes.svg",
    category: "groceries",
    quantity: 30,
    size: "medium",
    limitedOffer: false,
    expressDelivery: true,
    status: "In Stock",
    rating: 4.3,
    reviews: [
      {
        user: "Mona",
        comment: "Medium-sized cherry tomatoes, very sweet.",
        rating: 4.5,
      },
      {
        user: "Nate",
        comment: "Good quality, but a bit too expensive.",
        rating: 4.1,
      },
    ],
    totalReviews: 28,
  },
  {
    name: "Garden Cucumbers",
    description:
      "Our medium-sized garden cucumbers are the perfect all-rounder for your kitchen needs. With their crisp texture and refreshing taste, these cucumbers are versatile enough for a wide range of culinary applications. Whether you're slicing them for sandwiches, dicing them for salads, or using them as a base for tzatziki, these cucumbers deliver consistent quality and flavor. Rich in vitamins and minerals, they're a healthy addition to any meal, supporting hydration and overall wellness.",
    price: 60000,
    image: "/images/cucumber.svg",
    category: "groceries",
    quantity: 40,
    size: "medium",
    limitedOffer: true,
    expressDelivery: false,
    status: "In Stock",
    rating: 2.8,
    reviews: [
      {
        user: "Olivia",
        comment: "Medium-sized cucumbers, very fresh.",
        rating: 3,
      },
      {
        user: "Paul",
        comment: "Good quality, but a bit too pricey.",
        rating: 2.5,
      },
    ],
    totalReviews: 24,
  },
  {
    name: "Cherry Tomatoes",
    description:
      "Our small cherry tomatoes are bursting with flavor and nutrition. These tiny, sweet morsels are perfect for snacking, adding to salads, or roasting for a delicious side dish. Despite their small size, they pack a powerful nutritional punch, rich in vitamins C and K, potassium, and antioxidants like lycopene. Their convenient size and irresistible taste make them a favorite among kids and adults alike, encouraging healthy eating habits in the most delicious way possible.",
    price: 70000,
    image: "/images/tomatoes.svg",
    category: "groceries",
    quantity: 50,
    size: "small",
    limitedOffer: false,
    expressDelivery: true,
    status: "Out of Stock",
    rating: 4.5,
    reviews: [
      {
        user: "Quinn",
        comment: "Small cherry tomatoes, very sweet.",
        rating: 4.6,
      },
      {
        user: "Rachel",
        comment: "Good quality, but a bit too small.",
        rating: 4.4,
      },
    ],
    totalReviews: 26,
  },
  {
    name: "Fresh Cilantro",
    description:
      "Our large bunches of fresh cilantro are perfect for cilantro enthusiasts and those who love to cook in bulk. This aromatic herb adds a distinctive, citrusy flavor to a wide variety of cuisines, from Mexican to Indian to Thai. Rich in antioxidants and vitamins, cilantro offers potential health benefits including improved digestion and detoxification support. The generous size of these bunches ensures you'll have plenty for garnishing, making sauces, or adding to your favorite recipes throughout the week.",
    price: 30000,
    image: "/images/cilantro.svg",
    category: "groceries",
    quantity: 20,
    size: "large",
    limitedOffer: true,
    expressDelivery: true,
    status: "Out of Stock",
    rating: 3.2,
    reviews: [
      {
        user: "Sam",
        comment: "Large cilantro bunches, very fresh.",
        rating: 3.5,
      },
      {
        user: "Tina",
        comment: "Good quality, but a bit too large.",
        rating: 3,
      },
    ],
    totalReviews: 20,
  },
  {
    name: "Garden Cucumbers",
    description:
      "Our medium-sized garden cucumbers offer the perfect balance of crispness and juiciness. Ideal for a variety of culinary uses, from refreshing salads to cool summer gazpachos. These cucumbers are not only delicious but also packed with nutrients, providing hydration, vitamins, and minerals essential for overall health. Their versatile size makes them perfect for slicing, dicing, or enjoying as a healthy snack, catering to all your cucumber needs.",
    price: 10000,
    image: "/images/cucumber.svg",
    category: "groceries",
    quantity: 35,
    size: "medium",
    limitedOffer: true,
    expressDelivery: true,
    status: "In Stock",
    rating: 4.0,
    reviews: [
      {
        user: "Uma",
        comment: "Medium-sized cucumbers, very fresh.",
        rating: 4.1,
      },
      {
        user: "Victor",
        comment: "Good quality, but a bit too pricey.",
        rating: 3.9,
      },
    ],
    totalReviews: 18,
  },
  {
    name: "Garden Cucumbers",
    description:
      "Our small garden cucumbers are perfect for those who prefer a more delicate size or for creating beautiful garnishes and hors d'oeuvres. Despite their smaller stature, these cucumbers pack all the crisp texture and refreshing flavor you expect. They're ideal for pickling, adding to salads, or enjoying as a low-calorie snack. Rich in vitamins and minerals, these cucumbers contribute to your daily nutrient intake while keeping you hydrated and satisfied.",
    price: 20000,
    image: "/images/cucumber.svg",
    category: "groceries",
    quantity: 12,
    size: "small",
    limitedOffer: false,
    expressDelivery: true,
    status: "In Stock",
    rating: 4.3,
    reviews: [
      {
        user: "Wendy",
        comment: "Small cucumbers, very fresh.",
        rating: 4.4,
      },
      {
        user: "Xander",
        comment: "Good quality, but a bit too small.",
        rating: 4.2,
      },
    ],
    totalReviews: 22,
  },
  {
    name: "Fresh Cilantro",
    description:
      "Our small bunches of fresh cilantro are perfect for those who enjoy adding a burst of flavor to their dishes without waste. These carefully cultivated herbs offer a vibrant, citrusy taste that can elevate a wide range of dishes, from Mexican salsas to Indian chutneys. Rich in antioxidants and vitamins, cilantro not only enhances flavor but also offers potential health benefits, including improved digestion and detoxification support. Ideal for garnishing or adding fresh, aromatic notes to your culinary creations.",
    price: 50000,
    image: "/images/cilantro.svg",
    category: "groceries",
    quantity: 20,
    size: "small",
    limitedOffer: true,
    expressDelivery: false,
    status: "Out of Stock",
    rating: 4.5,
    reviews: [
      {
        user: "Yara",
        comment: "Small cilantro bunches, very fresh.",
        rating: 4.6,
      },
      {
        user: "Zane",
        comment: "Good quality, but a bit too small.",
        rating: 4.4,
      },
    ],
    totalReviews: 24,
  },
  {
    name: "Garden Cucumbers",
    description:
      "Our premium medium-sized garden cucumbers are the epitome of freshness and quality. These cucumbers offer the perfect balance of crispness and juiciness, making them versatile for a wide range of culinary applications. Whether you're creating refreshing salads, pickling for later use, or adding a cool crunch to your sandwiches, these cucumbers deliver consistent flavor and texture. Packed with essential nutrients and high water content, they're not just delicious but also contribute to your daily hydration and overall health goals.",
    price: 90000,
    image: "/images/cucumber.svg",
    category: "groceries",
    quantity: 16,
    size: "medium",
    limitedOffer: true,
    expressDelivery: true,
    status: "In Stock",
    rating: 4.7,
    reviews: [
      {
        user: "Aaron",
        comment: "Medium-sized cucumbers, very fresh.",
        rating: 4.8,
      },
      {
        user: "Bella",
        comment: "Good quality, but a bit too pricey.",
        rating: 4.6,
      },
    ],
    totalReviews: 30,
  },
  {
    name: "Cherry Tomatoes",
    description:
      "Our small cherry tomatoes are little bursts of sunshine in every bite. These sweet, juicy tomatoes are perfect for snacking, adding to salads, or roasting for a delicious side dish. Despite their small size, they're packed with flavor and nutrients, including lycopene, vitamins C and K, and potassium. Their convenient size makes them a hit with kids and adults alike, encouraging healthy eating in the most delicious way possible. Whether used in cooking or enjoyed fresh, these cherry tomatoes are sure to brighten up any meal.",
    price: 80000,
    image: "/images/tomatoes.svg",
    category: "groceries",
    quantity: 32,
    size: "small",
    limitedOffer: false,
    expressDelivery: true,
    status: "In Stock",
    rating: 3.8,
    reviews: [
      {
        user: "Cody",
        comment: "Small cherry tomatoes, very sweet.",
        rating: 4,
      },
      {
        user: "Daisy",
        comment: "Good quality, but a bit too small.",
        rating: 3.5,
      },
    ],
    totalReviews: 28,
  },

  {
    image: "/images/cake.svg",
    name: "Chocolate Cake",
    description:
      "Rich, moist, and decadently chocolaty, our Chocolate Cake is a pastry lover's dream. Perfect for birthdays, celebrations, or as a luxurious dessert, this cake is sure to delight your taste buds with every bite.",
    category: "pastries",
    quantity: 12,
    price: 25000,
    status: "In Stock",
    limitedOffer: true,
    expressDelivery: false,
    rating: 4.5,
    reviews: [
      {
        user: "Sophia",
        comment: "Absolutely delicious, perfect for celebrations!",
        rating: 4.8,
      },
      {
        user: "James",
        comment: "Tasted amazing but a bit expensive.",
        rating: 4.2,
      },
    ],
    totalReviews: 18,
  },
  {
    image: "/images/tomatoes.svg",
    name: "Tomatoes",
    description:
      "Fresh, juicy, and vibrant red, our tomatoes are ideal for elevating your cooking. Whether you're making sauces, salads, or stews, these tomatoes add a burst of flavor and nutrition to every dish.",
    category: "groceries",
    quantity: 12,
    price: 25000,
    status: "Out of Stock",
    limitedOffer: false,
    expressDelivery: true,
    rating: 3.8,
    reviews: [
      {
        user: "Cody",
        comment: "Small cherry tomatoes, very sweet.",
        rating: 4,
      },
      {
        user: "Daisy",
        comment: "Good quality, but a bit too small.",
        rating: 3.5,
      },
    ],
    totalReviews: 28,
  },
  {
    image: "/images/meatpie.svg",
    name: "Meatpie",
    description:
      "Golden and flaky on the outside, hearty and savory on the inside, our Meatpie is packed with deliciously seasoned meat filling. A perfect snack or light meal, it's a classic favorite for all occasions.",
    category: "pastries",
    quantity: 12,
    price: 25000,
    status: "In Stock",
    limitedOffer: false,
    expressDelivery: false,
    rating: 4.1,
    reviews: [
      {
        user: "Liam",
        comment: "Very filling and delicious!",
        rating: 4.4,
      },
      {
        user: "Emma",
        comment: "Great flavor but a bit dry.",
        rating: 3.8,
      },
    ],
    totalReviews: 15,
  },
  {
    image: "/images/cherry-danish-pastry.svg",
    name: "Cherry Danish Pastry",
    description:
      "Our Cherry Danish Pastry combines layers of buttery, flaky dough with a luscious cherry topping for a perfect balance of tart and sweet. This large-sized pastry is an indulgent treat, ideal for special occasions or simply enjoying with your morning coffee.",
    category: "pastries",
    size: "large",
    quantity: 6,
    price: 90000,
    status: "In Stock",
    limitedOffer: true,
    expressDelivery: true,
    rating: 4.3,
    reviews: [
      {
        user: "Olivia",
        comment: "Perfect balance of tart and sweet!",
        rating: 4.5,
      },
      {
        user: "Ethan",
        comment: "Very flaky and tasty.",
        rating: 4.2,
      },
    ],
    totalReviews: 22,
  },
  {
    image: "/images/croissant.svg",
    name: "Croissant",
    description:
      "Buttery, flaky, and delightfully airy, our Croissant is a small-sized classic pastry that pairs perfectly with jam, coffee, or simply on its own. Whether for breakfast or a quick snack, it delivers timeless French elegance in every bite.",
    category: "pastries",
    size: "small",
    quantity: 12,
    price: 10000,
    status: "In Stock",
    limitedOffer: false,
    expressDelivery: true,
    rating: 4.7,
    reviews: [
      {
        user: "Noah",
        comment: "The perfect croissant, so buttery and fresh!",
        rating: 4.9,
      },
      {
        user: "Isabella",
        comment: "Great texture but could be a bit crispier.",
        rating: 4.5,
      },
    ],
    totalReviews: 30,
  },
  {
    image: "/images/danish-pastry.svg",
    name: "Danish Pastry",
    description:
      "Indulge in the buttery and flaky delight of our Danish Pastry, crafted to perfection with layers of golden dough and a hint of sweetness. Ideal for breakfast or as a mid-day treat, this medium-sized pastry pairs beautifully with a hot cup of coffee or tea. Perfect for those who appreciate the art of classic baking.",
    category: "pastries",
    size: "medium",
    quantity: 40,
    price: 15000,
    status: "In Stock",
    limitedOffer: true,
    expressDelivery: true,
    rating: 4.6,
    reviews: [
      {
        user: "Oliver",
        comment: "Absolutely delicious and flaky.",
        rating: 4.8,
      },
      {
        user: "Charlotte",
        comment: "Pairs perfectly with coffee!",
        rating: 4.5,
      },
    ],
    totalReviews: 25,
  },
  {
    image: "/images/glazed-doughnut.svg",
    name: "Glazed Doughnut",
    description:
      "Treat yourself to the melt-in-your-mouth experience of our Glazed Doughnut. With its perfectly smooth and shiny sugar glaze, this small pastry is the ultimate indulgence for sweet tooths everywhere. Enjoy it as a snack or a dessert that brings joy with every bite.",
    category: "pastries",
    size: "small",
    quantity: 10,
    price: 10000,
    status: "In Stock",
    limitedOffer: false,
    expressDelivery: true,
    rating: 4.4,
    reviews: [
      {
        user: "Ethan",
        comment: "Perfectly sweet and soft.",
        rating: 4.5,
      },
      {
        user: "Sophia",
        comment: "Could use a bit more glaze.",
        rating: 4.2,
      },
    ],
    totalReviews: 20,
  },
  {
    image: "/images/jam-filled-doughtnut.svg",
    name: "Jam Filled Doughnut",
    description:
      "Bursting with rich and fruity jam, our Jam Filled Doughnut is a large-sized pastry that redefines indulgence. Every bite reveals a generous helping of sweet filling encased in a soft, golden exterior. Perfect for celebrations or as a special treat to brighten your day.",
    category: "pastries",
    size: "large",
    quantity: 10,
    price: 15000,
    status: "Out of Stock",
    limitedOffer: true,
    expressDelivery: false,
    rating: 4.3,
    reviews: [
      {
        user: "Liam",
        comment: "The jam filling is so flavorful!",
        rating: 4.6,
      },
      {
        user: "Amelia",
        comment: "A bit too sweet but overall great.",
        rating: 4.0,
      },
    ],
    totalReviews: 18,
  },
  {
    image: "/images/plain-cookie.svg",
    name: "Cookie",
    description:
      "Crunchy, sweet, and irresistibly satisfying, our classic Cookie is a small-sized pastry that’s perfect for snacking on the go or enjoying at home. With a rich buttery flavor and a delightful texture, it’s a timeless favorite for cookie lovers of all ages.",
    category: "pastries",
    size: "small",
    quantity: 50,
    price: 45000,
    status: "Out of Stock",
    limitedOffer: false,
    expressDelivery: true,
    rating: 4.0,
    reviews: [
      {
        user: "Lucas",
        comment: "Great crunch and flavor.",
        rating: 4.3,
      },
      {
        user: "Mia",
        comment: "A bit too hard for my liking.",
        rating: 3.7,
      },
    ],
    totalReviews: 12,
  },

];
const { generateProductData } = useProductGenerator();
export const products = generateProductData(rawProducts);

console.log(products);
