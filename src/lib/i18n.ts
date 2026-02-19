export const translations = {
  ENG: {
    // Navigation & Common
    home: "Home",
    catalog: "Catalog",
    myCollection: "My Collection",
    signIn: "Sign in",
    signOut: "Sign out",
    searchPlaceholder: "Search books...",
    
    // Main Page - Hero
    heroTitle: "Stephen King",
    heroSubtitle: "Book Tracker for the Constant Readers",
    heroTagline1: "Every Story.",
    heroTagline2: "Every Nightmare.",
    heroDescription: "Track your journey through Stephen King's universe.",
    heroButton: "Begin",
    scroll: "Scroll",
    
    // Main Page - Featured
    featuredBooks: "Featured Books",
    viewAllBooks: "View All Books",
    theLibrary: "The Library",
    viewAll: "View All",
    
    // Main Page - How it works
    howItWorks: "How it works",
    step1Title: "Discover the complete bibliography",
    step1Desc: "Every novel, novella, short story collection, and non-fiction work. From Carrie to Holly, nothing is left behind.",
    step2Title: "Mark what you've conquered",
    step2Desc: "Track read books, current reads, and your personal wishlist. Rate them, add notes, remember every journey through Castle Rock and Derry.",
    step3Title: "See the gaps in your shelf",
    step3Desc: "Instantly know what you're missing. Find connections between books. Plan your next descent into the King universe.",
    
    // Main Page - CTA
    ctaTitle1: "Ready to start",
    ctaTitle2: "your collection?",
    ctaButton: "Enter the Library",
    
    // Main Page - Footer
    footerText: "A project for Constant Readers. Not affiliated with Stephen King.",
    
    // Catalog Page
    bookCatalog: "Book Catalog",
    totalBooks: "Total: ",
    books: " books",
    booksCatalogued: " books catalogued",
    
    // Collection Page
    totalBooksLabel: "TOTAL BOOKS",
    ownedLabel: "OWNED",
    readLabel: "READ",
    
    // Book Card Actions
    markOwned: "OWNED",
    markRead: "READ",
    rate: "RATE",
    
    // Quotes
    quote1Text: "Books are a uniquely portable magic.",
    quote1Book: "On Writing",
    quote2Text: "Monsters are real, and ghosts are real too. They live inside us, and sometimes, they win.",
    quote2Book: "The Shining",
    quote3Text: "We make up horrors to help us cope with the real ones.",
    quote3Book: "Danse Macabre",
    quote4Text: "The trust of the innocent is the liar's most useful tool.",
    quote4Book: "Needful Things",
  },
  ES: {
    // Navigation & Common
    home: "Inicio",
    catalog: "Catálogo",
    myCollection: "Mi Colección",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    searchPlaceholder: "Buscar libros...",
    
    // Main Page - Hero
    heroTitle: "Stephen King",
    heroSubtitle: "Rastreador de Libros para Lectores Constantes",
    heroTagline1: "Cada Historia.",
    heroTagline2: "Cada Pesadilla.",
    heroDescription: "Sigue tu viaje a través del universo de Stephen King.",
    heroButton: "Comenzar",
    scroll: "Sigue bajando",
    
    // Main Page - Featured
    featuredBooks: "Libros Destacados",
    viewAllBooks: "Ver Catálogo Completo",
    theLibrary: "Biblioteca",
    viewAll: "Ver Todos",
    
    // Main Page - How it works
    howItWorks: "Cómo funciona",
    step1Title: "Descubre la bibliografía completa",
    step1Desc: "Cada novela, novela corta, colección de cuentos y obra de no ficción. Desde Carrie hasta Holly, nada queda atrás.",
    step2Title: "Marca lo que has conquistado",
    step2Desc: "Rastrea libros leídos, lecturas actuales y tu lista de deseos. Califícalos, añade notas, recuerda cada viaje por Castle Rock y Derry.",
    step3Title: "Ve los huecos en tu estantería",
    step3Desc: "Conoce al instante lo que te falta. Encuentra conexiones entre libros. Planea tu próximo descenso al universo King.",
    
    // Main Page - CTA
    ctaTitle1: "¿Listo para empezar",
    ctaTitle2: "tu colección?",
    ctaButton: "Entrar a la Biblioteca",
    
    // Main Page - Footer
    footerText: "Un proyecto para Lectores Constantes. No afiliado con Stephen King.",
    
    // Catalog Page
    bookCatalog: "Catálogo de Libros",
    totalBooks: "Total: ",
    books: " libros",
    booksCatalogued: " libros catalogados",
    
    // Collection Page
    totalBooksLabel: "TOTAL LIBROS",
    ownedLabel: "YA LO TENGO!",
    readLabel: "LEÍDO",
    
    // Book Card Actions
    markOwned: "YA LO TENGO!",
    markRead: "LEÍDO",
    rate: "CALIFICAR",
    
    // Quotes
    quote1Text: "Los libros son una magia singularmente portátil.",
    quote1Book: "Mientras Escribo",
    quote2Text: "Los monstruos son reales, y los fantasmas también. Viven dentro de nosotros y, a veces, ganan.",
    quote2Book: "El Resplandor",
    quote3Text: "Inventamos horrores para ayudarnos a lidiar con los reales.",
    quote3Book: "Danza Macabra",
    quote4Text: "La confianza del inocente es la herramienta más útil del mentiroso.",
    quote4Book: "La Tienda",
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations['ENG'];
