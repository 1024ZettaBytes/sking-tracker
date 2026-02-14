// seed.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { books, userBooks } from "./src/lib/server/schema";
import * as dotenv from "dotenv";

// 1. Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// 2. Connect to DB (We use 'max: 1' because this is a simple script)
const client = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(client);

// 3. The Stephen King Data
const kingBooks = [
  {
    title: "Carrie",
    engTitle: "Carrie",
    year: 1974,
    synopsis:
      "La historia de una chica inadaptada del instituto que descubre que tiene poderes telequinéticos.",
    engSynopsis:
      "The story of a misfit high-school girl who discovers she has telekinetic powers.",
    coverUrl:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/25/3b/253b35902bbebc059355fa26c19d9dc4.jpg",
    engCoverUrl: "https://m.media-amazon.com/images/I/91ZeKb7YZ6L.jpg",
  },
  {
    title: "El Misterio de Salem's Lot",
    engTitle: "Salem's Lot",
    year: 1975,
    synopsis:
      "Un escritor regresa a su ciudad natal solo para descubrir que los residentes están siendo convertidos en vampiros.",
    engSynopsis:
      "A writer returns to his hometown only to discover that the residents are being turned into vampires.",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYVB_rHuOuYlrq5N1a7ZIg_rTo4YafAR0Ukg&s",
  },
  {
    title: "El Resplandor",
    engTitle: "The Shining",
    year: 1977,
    synopsis:
      "Jack Torrance acepta un puesto como cuidador fuera de temporada del histórico Hotel Overlook.",
    engSynopsis:
      "Jack Torrance accepts a position as the off-season caretaker of the historic Overlook Hotel.",
    coverUrl:
      "https://m.media-amazon.com/images/I/51Xsea28OoL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "Rabia",
    engTitle: "Rage",
    year: 1977,
    synopsis:
      "Un estudiante de secundaria toma a su clase como rehenes después de un altercado con su maestro.",
    engSynopsis:
      "A high school student takes his class hostage after an altercation with his teacher.",
    coverUrl:
      "https://www.pagina12.com.ar/fotos/radar/20130210/notas_r/sl04fo04.jpg",
    engCoverUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Rage_%281977%29_front_cover%2C_first_edition.jpg",
  },
  {
    title: "El Umbral de la Noche",
    engTitle: "Night Shift",
    year: 1978,
    synopsis:
      "Una colección de cuentos cortos que abarca varios géneros, desde el horror hasta la ciencia ficción.",
    engSynopsis:
      "A collection of short stories that spans various genres, from horror to science fiction.",
    coverUrl:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/0b/96/0b96397fac0a8cc7fdabd37380a3a1ad.jpg",
    engCoverUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/16/Night_Shift_%281978%29_front_cover%2C_first_edition.jpg",
    type: "short_story_collection",
  },
  {
    title: "Apocalipsis (La Danza de la Muerte)",
    engTitle: "The Stand",
    year: 1978,
    synopsis:
      "Una novela de fantasía oscura post-apocalíptica donde una cepa de influenza mata a casi toda la población mundial.",
    engSynopsis:
      "A post-apocalyptic dark fantasy novel where a strain of influenza kills almost the entire world population.",
    coverUrl:
      "https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/9788466345026.jpg",
    engCoverUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/52/The_Stand_%281978%29_front_cover%2C_first_edition.png",
  },
  {
    title: "La Larga Marcha",
    engTitle: "The Long Walk",
    year: 1979,
    synopsis:
      "En un futuro distópico, cada año se seleccionan 100 adolescentes para participar en una competencia de caminata hasta la muerte.",
    engSynopsis:
      "In a dystopian future, every year 100 teenagers are selected to participate in a deadly walking competition.",
    coverUrl:
      "https://image.cdn0.buscalibre.com/60e395a98463b5f3158bde35.RS500x500.jpg",
    engCoverUrl:
      "https://www.stephenking.com.ar/wp-content/uploads/2017/02/The-Long-Walk-NAL.jpg",
  },
  {
    title: "La Zona Muerta",
    engTitle: "The Dead Zone",
    year: 1979,
    synopsis:
      "Después de despertar de un coma, Johnny Smith descubre que tiene habilidades psíquicas que le permiten ver el futuro.",
    engSynopsis:
      "After waking from a coma, Johnny Smith discovers he has psychic abilities that allow him to see the future.",
    coverUrl:
      "https://http2.mlstatic.com/D_NQ_NP_992524-MLU69682899267_052023-O.webp",
    engCoverUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/The_Dead_Zone_%281979%29_front_cover%2C_first_edition.jpg",
  },
  {
    title: "Ojos de Fuego",
    engTitle: "Firestarter",
    year: 1980,
    synopsis:
      "Charlie McGee es una niña con habilidades piroquinéticas que es perseguida por una agencia gubernamental secreta.",
    engSynopsis:
      "Charlie McGee is girl with pyrokinesis abilities who is pursued by a secret government agency.",
    coverUrl:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/18/11/181105ad1981a65dec8b8fca1a01d517.jpg",
    engCoverUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Firestarter_%281980%29_front_cover%2C_first_edition.jpg",
  },
  {
    title: "Carretera Maldita",
    engTitle: "Roadwork",
    year: 1981,
    synopsis:
      "Un hombre lucha contra la demolición de su hogar debido a un proyecto de autopista.",
    engSynopsis:
      "A man fights against the demolition of his home due to a highway project.",
    coverUrl:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/40/d1/40d119758413817faeedeb9e4f6e627f.jpg",
    engCoverUrl:
      "https://images.cdn2.buscalibre.com/fit-in/360x360/c0/e4/c0e43c27fe32c60e8ccb0acd0abb00c5.jpg",
  },
  {
    title: "Danza Macabra",
    engTitle: "Danse Macabre",
    year: 1981,
    synopsis:
      "Un análisis de la cultura del horror en la literatura, el cine y la televisión.",
    engSynopsis:
      "An analysis of the horror culture in literature, film, and television.",
    coverUrl:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/21/05/21054a72aca39c7607722f027b65e782.jpg",
    engCoverUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/Danse_Macabre_%281981%29_front_cover%2C_first_edition.jpg",
    type: "non_fiction",
  },
  {
    title: "Cujo",
    engTitle: "Cujo",
    year: 1981,
    synopsis:
      "Un perro San Bernardo se infecta con rabia y aterroriza a una madre y su hijo.",
    engSynopsis:
      "A Saint Bernard dog becomes rabid and terrorizes a mother and her son.",
    coverUrl:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/cd/3e/cd3e373399ae88d5d7daba92518c3b2d.jpg",
    engCoverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv60qPvSfcMltDiQG1AqI1dqggTF-sTaXAvQ&s",
  },
  {
    title: "El Fugitivo",
    engTitle: "The Running Man",
    year: 1982,
    synopsis:
      "En un futuro distópico, un hombre participa en un juego de televisión mortal para ganar su libertad.",
    engSynopsis:
      "In a dystopian future, a man participates in a deadly television game show to win his freedom.",
    coverUrl:
      "https://images.cdn2.buscalibre.com/fit-in/360x360/0f/f2/0ff23adc0a12886bfa1790817971977c.jpg",
    engCoverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoX-PHSWtsXQM-bDXOzcvmzzPDoAMn6g3GeA&s",
  },
  {
    title: "La Torre Oscura I: El Pistolero",
    engTitle: "The Dark Tower: The Gunslinger",
    year: 1982,
    synopsis:
      "El primer libro de la serie La Torre Oscura, que sigue al pistolero Roland en su búsqueda de la mítica Torre Oscura.",
    engSynopsis:
      "The first book in the Dark Tower series, which follows the gunslinger Roland on his quest for the mythical Dark Tower.",
    coverUrl:
      "https://images.cdn2.buscalibre.com/fit-in/360x360/07/10/07104d4763f72e1fdb44ce32b25a8453.jpg",
    engCoverUrl: "https://m.media-amazon.com/images/I/718U1yEhYtL.jpg",
  },
  {
    title: "Las Cuatro Estaciones",
    engTitle: "Different Seasons",
    year: 1982,
    synopsis:
      "Una colección de cuatro novelas cortas que abarca varios géneros, desde el horror hasta el drama.",
    engSynopsis:
      "A collection of four novellas that spans various genres, from horror to drama.",
    coverUrl:
      "https://diiletantes.wordpress.com/wp-content/uploads/2018/08/king.jpg",
    engCoverUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ed/Different_Seasons_%281982%29_front_cover%2C_first_edition.jpg",
    type: "short_novella_collection",
  },
  {
    title: "Christine",
    engTitle: "Christine",
    year: 1983,
    synopsis:
      "Un automóvil poseído por un espíritu maligno aterroriza a su dueño y a su comunidad.",
    engSynopsis:
      "A car possessed by an evil spirit terrorizes its owner and community.",
    coverUrl:
      "https://www.stephenking.com.ar/wp-content/uploads/2017/02/Christine-Viking.jpg",
    engCoverUrl:
      "https://www.stephenking.com.ar/wp-content/uploads/2017/02/Christine-Viking.jpg",
  },
  {
    title: "Cementerio de Animales",
    engTitle: "Pet Sematary",
    year: 1983,
    synopsis:
      "Una familia se muda a una casa cerca de un cementerio de mascotas que tiene un oscuro secreto.",
    engSynopsis:
      "A family moves to a house near a pet cemetery that has a dark secret.",
    coverUrl:
      "https://img.yumpu.com/62684896/1/500x640/cementerio-de-animales-stephen-king.jpg",
    engCoverUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Pet_Sematary_%281983%29_front_cover%2C_first_edition.jpg",
  },
  {
    title: "El Ciclo del Hombre Lobo",
    engTitle: "Cycle of the Werewolf",
    year: 1983,
    synopsis:
      "Una novela corta que sigue a un pueblo pequeño mientras es aterrorizado por un hombre lobo.",
    engSynopsis:
      "A novella that follows a small town as it is terrorized by a werewolf.",
    coverUrl:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/5d/b3/5db3bf18b790b909f986dde77558be7d.jpg",
    engCoverUrl:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1565642120i/550844.jpg",
  },
  {
    title: "El Talismán",
    engTitle: "The Talisman",
    year: 1984,
    synopsis:
      "Un joven llamado Jack Sawyer emprende una aventura a través de un mundo paralelo para salvar a su madre moribunda.",
    engSynopsis:
      "A young boy named Jack Sawyer embarks on an adventure through a parallel world to save his dying mother.",
    coverUrl:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/12/c4/12c4e737350c6e681a5ed7e570d0c0cf.jpg",
    engCoverUrl:
      "https://www.stephenking.com.ar/wp-content/uploads/2017/02/The-Talisman-Viking.jpg",
  },
  {
    title: "Maleficio",
    engTitle: "Thinner",
    year: 1984,
    synopsis:
      "Un hombre es maldecido por un gitano y comienza a perder peso de manera incontrolable.",
    engSynopsis:
      "A man is cursed by a gypsy and begins to lose weight uncontrollably.",
    coverUrl: "https://pictures.abebooks.com/inventory/5000125378.jpg",
    engCoverUrl:
      "https://preview.redd.it/just-reread-thinner-again-after-like-15-years-nothing-will-v0-fh2juu8bg5vd1.jpeg",
  },
  {
    engTitle: "Skeleton Crew",
    title: "N/A",
    year: 1985,
    type: "short_story_collection",
    synopsis:
      "Una colección de cuentos cortos que abarca varios géneros, desde el horror hasta la ciencia ficción.",
    engSynopsis:
      "A collection of short stories that spans various genres, from horror to science fiction.",
    engCoverUrl:
      "https://upload.wikimedia.org/wikipedia/en/f/f3/SkeletonCrewHC.jpg",
    onlyEnglish: true,
  },
{
  title: 'La Niebla',
  engTitle: 'N/A',
  year: 1985,
  synopsis: 'Una densa niebla cubre un pueblo, ocultando criaturas aterradoras que atacan a los residentes.',
  engSynopsis: 'N/A',
  coverUrl: 'https://m.media-amazon.com/images/I/81vWEXwrFyL.jpg',
  onlySpanish: true,
  type: 'short_story_collection',
},
{
  title: 'La Expedición',
  engTitle: 'N/A',
  year: 1985,
  synopsis: 'La expedición, que da título a este volumen de escalofriantes cuentos, advierte angustiosamente contra los riesgos de la curiosidad; la anciana de la Abuela quizá no sea la compañía adecuada para un niño cuando este queda aislado en una casa distante; el protagonista de Superviviente no tiene nada que comer, excepto... La locura está agazapada en la máquina de escribir del redactor de La balada del proyectil flexible...',
  engSynopsis: 'N/A',
  coverUrl: 'https://images.cdn2.buscalibre.com/fit-in/360x360/b5/5f/b55f4c061848280af889d9263fd4ae6f.jpg',
  onlySpanish: true,
  type: 'short_story_collection',
},
{
  title: 'Historias Fantásticas',
  engTitle: 'N/A',
  year: 1985,
  synopsis: 'Stephen King ha fundido aquí imágenes de terrores ancestrales con la iconografía de la actual sociedad norteamericana. Los relatos incluidos en este libro, originales y trepidantes, han cautivado a millones de lectores en todo el mundo.',
  coverUrl: 'https://images.cdn2.buscalibre.com/fit-in/360x360/6c/f1/6cf1e177d3ae8aaabeea191beaae0681.jpg',
  onlySpanish: true,
  type: 'short_story_collection',
},
{
  title: 'Dos Historias Para No Dormir',
  engTitle: 'N/A',
  synopsis: 'Un grupo de chicos y chicas sale a navegar en una balsa sobre un pacífico lago, donde una oscura mancha viscosa los acosa; en la cárcel, un interno tiene extrañas pesadillas en las que aparece una mujer que le atrae y repele a la vez, porque se convierte en una inmensa rata.',
  year: 1985,
  coverUrl: 'https://m.media-amazon.com/images/I/71Kqsbv0h4L._AC_UF1000,1000_QL80_.jpg',
  onlySpanish: true,
  type: 'short_story_collection',
},
  {
    title: "Eso",
    engTitle: "It",
    year: 1986,
    synopsis:
      "La historia sigue las experiencias de siete niños mientras son aterrorizados por una entidad maligna.",
    engSynopsis:
      "The story follows the experiences of seven children as they are terrorized by an evil entity.",
    coverUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1a/It_%281986%29_front_cover%2C_first_edition.jpg",
  },
  {
    title: "Misery",
    engTitle: "Misery",
    year: 1987,
    synopsis:
      'Paul Sheldon es un escritor famoso que es rescatado de un accidente automovilístico por su "fan número uno".',
    engSynopsis:
      'Paul Sheldon is a famous writer who is rescued from a car crash by his "number one fan".',
    coverUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/14/Misery_%281987%29_front_cover%2C_first_edition.jpg",
  },
  {
    title: "La Milla Verde",
    engTitle: "The Green Mile",
    year: 1996,
    synopsis:
      "La historia de un supervisor del corredor de la muerte y su encuentro con un recluso inusual.",
    engSynopsis:
      "The story of a death row supervisor's encounter with an unusual inmate.",
    coverUrl:
      "https://m.media-amazon.com/images/I/71leuaId3-L._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "11/22/63",
    engTitle: "11/22/63",
    year: 2011,
    synopsis:
      "Un viajero en el tiempo intenta evitar el asesinato del presidente de los Estados Unidos, John F. Kennedy.",
    engSynopsis:
      "A time traveler attempts to prevent the assassination of United States President John F. Kennedy.",
    coverUrl:
      "https://m.media-amazon.com/images/I/71Tunc9uXEL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "Doctor Sueño",
    engTitle: "Doctor Sleep",
    year: 2013,
    synopsis:
      "Danny Torrance, ahora adulto, lucha contra sus propios demonios mientras protege a una niña con poderes similares a los suyos.",
    engSynopsis:
      "Danny Torrance, now an adult, struggles with his own demons while protecting a young girl with similar powers.",
    coverUrl:
      "https://m.media-amazon.com/images/I/71Ulrik4LeL._AC_UF1000,1000_QL80_.jpg",
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  try {
    // Clear the table and reset the ID sequence
    console.log("🧹 Clearing existing books and resetting ID sequence...");
    await db.delete(userBooks); // Clear the join table first to avoid foreign key issues
    await db.delete(books);
    await client`ALTER SEQUENCE books_id_seq RESTART WITH 1`;

    // Insert the new data
    console.log("📖 Inserting Stephen King books...");
    await db.insert(books).values(kingBooks);

    console.log("✅ Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    // Close the connection when done
    await client.end();
  }
}

main();
