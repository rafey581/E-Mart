const productsData = [
    {
        id: 1,
        name: "Smartphone X Pro",
        category: "Electronics",
        description: "Latest model with high-resolution camera and long battery life.",
        brand: "TechBrand",
        stock: 5,
        price: 89999,
        image: "./assets/images/smartXpro.jpg"
    },
    {
        id: 2,
        name: "Ultra Slim Laptop 15",
        category: "Electronics",
        description: "Lightweight and powerful laptop for work and play.",
        brand: "CompuTech",
        stock: 20,
        price: 99000,
        image: "./assets/images/laptop.jpg"
    },
    {
        id: 3,
        name: "Smart Watch Series 5",
        category: "Electronics",
        description: "Track your fitness and stay connected on the go.",
        brand: "WristTech",
        stock: 4,
        price: 2500,
        image: "./assets/images/smart-watch.jpg"
    },
    {
        id: 4,
        name: "4K Action Camera",
        category: "Electronics",
        description: "Capture your adventures in stunning 4K detail.",
        brand: "CaptureIt",
        stock: 15,
        price: 18000,
        image: "./assets/images/camera.jpg"
    },

    // Fashion
    {
        id: 5,
        name: "Men's Classic T-Shirt",
        category: "Fashion",
        description: "Soft cotton t-shirt comfortable for everyday wear.",
        brand: "UrbanStyle",
        stock: 100,
        price: 1500,
        image: "./assets/images/t-shirt.jpg"
    },
    {
        id: 6,
        name: "Soft Comfort Lace Bra",
        category: "Fashion",
        description: "Experience everyday comfort with our Soft Comfort Lace Bra.",
        brand: "DenimCo",
        stock: 6,
        price: 3500,
        image: "./assets/images/bra.jpg"
    },
    {
        id: 7,
        name: "Running Sneakers",
        category: "Fashion",
        description: "Lightweight sneakers designed for performance and comfort.",
        brand: "RunFast",
        stock: 40,
        price: 6000,
        image: "./assets/images/sneakers.jpg"
    },
    {
        id: 8,
        name: "Leather Jacket",
        category: "Fashion",
        description: "Classic leather jacket that adds edge to any outfit.",
        brand: "RebelWear",
        stock: 10,
        price: 12000,
        image: "./assets/images/lather-jacket.jpg"
    },
    {
        id: 9,
        name: "Aviator Sunglasses",
        category: "Fashion",
        description: "Protect your eyes with these stylish frames.",
        brand: "SunGuard",
        stock: 80,
        price: 2000,
        image: "./assets/images/sunglasses.jpg"
    },
    {
        id: 10,
        name: "Men's Graphic Tee",
        category: "Fashion",
        description: "Trendy graphic t-shirt for casual outings.",
        brand: "StreetVibe",
        stock: 8,
        price: 1200,
        image: "./assets/images/t-shirt2.jpg"
    },
    {
        id: 11,
        name: "Solid Polo Shirt",
        category: "Fashion",
        description: "Classic polo shirt, perfect for smart-casual look.",
        brand: "ClassicMan",
        stock: 60,
        price: 1800,
        image: "./assets/images/polo-shirt.jpg"
    },
    {
        id: 12,
        name: "Men's Winter Puffer Jacket",
        category: "Fashion",
        description: "Keep warm with this insulated puffer jacket.",
        brand: "WarmUp",
        stock: 30,
        price: 8500,
        image: "./assets/images/jacket.jpg"
    },
    {
        id: 13,
        name: "Baseball Cap",
        category: "Fashion",
        description: "Classic structured baseball cap.",
        brand: "HeadGear",
        stock: 2,
        price: 800,
        image: "./assets/images/cap2.jpg"
    },
    {
        id: 14,
        name: "Snapback Cap",
        category: "Fashion",
        description: "Urban style snapback with flat brim.",
        brand: "StreetStyle",
        stock: 80,
        price: 1000,
        image: "./assets/images/cap1.jpg"
    },
    {
        id: 15,
        name: "Casual Maxi Dress",
        category: "Fashion",
        description: "Comfortable long dress for everyday wear.",
        brand: "ComfyChic",
        stock: 50,
        price: 2800,
        image: "./assets/images/maxi.jpg"
    },
    {
        id: 16,
        name: "Gold Plated Necklace",
        category: "Fashion",
        description: "Delicate chain necklace with a gold finish.",
        brand: "ShineOn",
        stock: 40,
        price: 2500,
        image: "./assets/images/necklace.jpg"
    },
    {
        id: 17,
        name: "Charm Bracelet",
        category: "Fashion",
        description: "Customizable bracelet with various charms.",
        brand: "WristCandy",
        stock: 55,
        price: 1800,
        image: "./assets/images/bracelet.jpg"
    },
    {
        id: 18,
        name: "Men's Leather Shoes",
        category: "Fashion",
        description: "Polished leather shoes for business and formal events.",
        brand: "GentleStep",
        stock: 5,
        price: 9000,
        image: "./assets/images/leather-shoes.jpg"
    },
    {
        id: 19,
        name: "Women's High Heels",
        category: "Fashion",
        description: "Elegant stilettos to elevate your style.",
        brand: "StepUp",
        stock: 40,
        price: 7500,
        image: "./assets/images/heels.jpg"
    },

    // Home
    {
        id: 20,
        name: "Automatic Coffee Maker",
        category: "Home",
        description: "Brew delicious coffee with just a touch of a button.",
        brand: "BrewMaster",
        stock: 25,
        price: 8500,
        image: "./assets/images/coffee-maker.jpg"
    },
    {
        id: 21,
        name: "High-Speed Blender",
        category: "Home",
        description: "Perfect for smoothies, soups, and more.",
        brand: "KitchenPro",
        stock: 35,
        price: 7000,
        image: "./assets/images/blender.jpg"
    },
    {
        id: 22,
        name: "2-Slice Toaster",
        category: "Home",
        description: "Compact toaster with adjustable browning settings.",
        brand: "ToastIt",
        stock: 50,
        price: 3000,
        image: "./assets/images/toaster.jpg"
    },
    {
        id: 23,
        name: "Robotic Vacuum Cleaner",
        category: "Home",
        description: "Keep your floors clean automatically.",
        brand: "CleanBot",
        stock: 12,
        price: 35000,
        image: "./assets/images/vacuum-cleaner.jpg"
    },

    // Sports
    {
        id: 24,
        name: "Non-Slip Yoga Mat",
        category: "Sports",
        description: "Durable mat for yoga and pilates exercises.",
        brand: "FlexFit",
        stock: 70,
        price: 2500,
        image: "./assets/images/yoga-mat.jpg"
    },
    {
        id: 25,
        name: "Adjustable Dumbbells Set",
        category: "Sports",
        description: "Versatile weights for your home gym.",
        brand: "PowerLift",
        stock: 15,
        price: 10000,
        image: "./assets/images/dumbel.jpg"
    },
    {
        id: 26,
        name: "Windbreaker Sport Jacket",
        category: "Sports",
        description: "Lightweight windbreaker for outdoor activities.",
        brand: "ActiveGear",
        stock: 50,
        price: 3500,
        image: "./assets/images/jacket2.jpg"
    },
    {
        id: 27,
        name: "Men's Hiking Boots",
        category: "Sports",
        description: "Rugged boots designed for tough terrains.",
        brand: "TrailBlazer",
        stock: 25,
        price: 8000,
        image: "./assets/images/mens-shoes.jpg"
    }
];
