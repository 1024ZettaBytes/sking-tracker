export const translations = {
  ENG: {
    // Navigation & Common
    home: "Home",
    catalog: "Catalog",
    myCollection: "My Collection",
    signIn: "Sign in",
    signOut: "Sign out",
    searchPlaceholder: "Search books...",
    
    // Main Page
    heroTitle: "Stephen King",
    heroSubtitle: "Book Tracker for the Constant Readers",
    featuredBooks: "Featured Books",
    viewAllBooks: "View All Books",
    
    // Catalog Page
    bookCatalog: "Book Catalog",
    totalBooks: "Total: ",
    books: " books",
    
    // Collection Page
    totalBooksLabel: "TOTAL BOOKS",
    ownedLabel: "OWNED",
    readLabel: "READ",
    
    // Book Card Actions
    markOwned: "OWNED",
    markRead: "READ",
    rate: "RATE",
  },
  ES: {
    // Navigation & Common
    home: "Inicio",
    catalog: "Catálogo",
    myCollection: "Mi Colección",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    searchPlaceholder: "Buscar libros...",
    
    // Main Page
    heroTitle: "Stephen King",
    heroSubtitle: "Rastreador de Libros para Lectores Constantes",
    featuredBooks: "Libros Destacados",
    viewAllBooks: "Ver Todos los Libros",
    
    // Catalog Page
    bookCatalog: "Catálogo de Libros",
    totalBooks: "Total: ",
    books: " libros",
    
    // Collection Page
    totalBooksLabel: "TOTAL LIBROS",
    ownedLabel: "YA LO TENGO!",
    readLabel: "LEÍDO",
    
    // Book Card Actions
    markOwned: "YA LO TENGO!",
    markRead: "LEÍDO",
    rate: "CALIFICAR",
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations['ENG'];
