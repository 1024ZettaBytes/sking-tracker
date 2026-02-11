// seed.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { books } from './src/lib/server/schema';
import * as dotenv from 'dotenv';

// 1. Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

// 2. Connect to DB (We use 'max: 1' because this is a simple script)
const client = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(client);

// 3. The Stephen King Data
const kingBooks = [
  {
    title: 'Carrie',
    engTitle: 'Carrie',
    year: 1974,
    synopsis: 'La historia de una chica inadaptada del instituto que descubre que tiene poderes telequinéticos.',
    engSynopsis: 'The story of a misfit high-school girl who discovers she has telekinetic powers.',
    coverUrl: 'https://images.cdn1.buscalibre.com/fit-in/360x360/25/3b/253b35902bbebc059355fa26c19d9dc4.jpg',
    engCoverUrl: 'https://m.media-amazon.com/images/I/91ZeKb7YZ6L.jpg'
  },
  {
    title: "El Misterio de Salem's Lot",
    engTitle: "Salem's Lot",
    year: 1975,
    synopsis: 'Un escritor regresa a su ciudad natal solo para descubrir que los residentes están siendo convertidos en vampiros.',
    engSynopsis: 'A writer returns to his hometown only to discover that the residents are being turned into vampires.',
    coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYVB_rHuOuYlrq5N1a7ZIg_rTo4YafAR0Ukg&s'
  },
  {
    title: 'El Resplandor',
    engTitle: 'The Shining',
    year: 1977,
    synopsis: 'Jack Torrance acepta un puesto como cuidador fuera de temporada del histórico Hotel Overlook.',
    engSynopsis: 'Jack Torrance accepts a position as the off-season caretaker of the historic Overlook Hotel.',
    coverUrl: 'https://m.media-amazon.com/images/I/51Xsea28OoL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'Apocalipsis (La Danza de la Muerte)',
    engTitle: 'The Stand',
    year: 1978,
    synopsis: 'Una novela de fantasía oscura post-apocalíptica donde una cepa de influenza mata a casi toda la población mundial.',
    engSynopsis: 'A post-apocalyptic dark fantasy novel where a strain of influenza kills almost the entire world population.',
    coverUrl: 'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/9788466345026.jpg'
  },
  {
    title: 'Eso',
    engTitle: 'It',
    year: 1986,
    synopsis: 'La historia sigue las experiencias de siete niños mientras son aterrorizados por una entidad maligna.',
    engSynopsis: 'The story follows the experiences of seven children as they are terrorized by an evil entity.',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/It_%281986%29_front_cover%2C_first_edition.jpg'
  },
  {
    title: 'Misery',
    engTitle: 'Misery',
    year: 1987,
    synopsis: 'Paul Sheldon es un escritor famoso que es rescatado de un accidente automovilístico por su "fan número uno".',
    engSynopsis: 'Paul Sheldon is a famous writer who is rescued from a car crash by his "number one fan".',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Misery_%281987%29_front_cover%2C_first_edition.jpg'
  },
  {
    title: 'La Milla Verde',
    engTitle: 'The Green Mile',
    year: 1996,
    synopsis: 'La historia de un supervisor del corredor de la muerte y su encuentro con un recluso inusual.',
    engSynopsis: 'The story of a death row supervisor\'s encounter with an unusual inmate.',
    coverUrl: 'https://m.media-amazon.com/images/I/71leuaId3-L._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: '11/22/63',
    engTitle: '11/22/63',
    year: 2011,
    synopsis: 'Un viajero en el tiempo intenta evitar el asesinato del presidente de los Estados Unidos, John F. Kennedy.',
    engSynopsis: 'A time traveler attempts to prevent the assassination of United States President John F. Kennedy.',
    coverUrl: 'https://m.media-amazon.com/images/I/71Tunc9uXEL._AC_UF1000,1000_QL80_.jpg'
  }
  ,{
    title: 'Doctor Sueño',
    engTitle: 'Doctor Sleep',
    year: 2013,
    synopsis: 'Danny Torrance, ahora adulto, lucha contra sus propios demonios mientras protege a una niña con poderes similares a los suyos.',
    engSynopsis: 'Danny Torrance, now an adult, struggles with his own demons while protecting a young girl with similar powers.',
    coverUrl: 'https://m.media-amazon.com/images/I/71Ulrik4LeL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    engTitle: 'Skeleton Crew',
    title: 'N/A',
    year: 1985,
    type: 'short_story_collection',
    synopsis: 'Una colección de cuentos cortos que abarca varios géneros, desde el horror hasta la ciencia ficción.',
    engSynopsis: 'A collection of short stories that spans various genres, from horror to science fiction.',
    engCoverUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f3/SkeletonCrewHC.jpg',
    onlyEnglish: true
  }
];

async function main() {
  console.log('🌱 Starting seed...');

  try {
    // Optional: Clear the table first so we don't get duplicates if we run this twice
    console.log('🧹 Clearing existing books...');
    await db.delete(books); 

    // Insert the new data
    console.log('📖 Inserting Stephen King books...');
    await db.insert(books).values(kingBooks);
    
    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    // Close the connection when done
    await client.end();
  }
}

main();