const firebaseConfig = {
  apiKey: "AIzaSyAqOZQ5YFOdhL6dblHI5wIx10m6n4xt2Fg",
  authDomain: "buenosdeseos-twodesign.firebaseapp.com",
  databaseURL: "https://buenosdeseos-twodesign-default-rtdb.firebaseio.com",
  projectId: "buenosdeseos-twodesign",
  storageBucket: "buenosdeseos-twodesign.firebasestorage.app",
  messagingSenderId: "577908051871",
  appId: "1:577908051871:web:27fbd4e06b3d18da14b7aa"
};

const config = {
  event: {
    defaultEventId: "karinajosimar2026",
    databaseURL: firebaseConfig.databaseURL,
    eventIdParam: "eventId",
    dateISO: "2026-11-29T10:00:00-06:00",
    legacyFallback: {
      read: false,
      write: false,
      subscribe: false
    }
  },
  admin: {
    adminKey: "twodesign123",
    keyParam: "key",
    legacyKeyParam: "admin"
  },
  seo: {
    titulo: "Karina & Josimar | 29.11.2026",
    descripcion: "Con la bendición de Dios y el cariño de nuestras familias, te invitamos a celebrar la boda de Karina Ramos y Josimar Arango.",
    autor: "Two Design",
    keywords: "invitacion de boda, Karina, Josimar, boda, La Esperanza, Quetzaltenango",
    ogImage: "https://i.ibb.co/FFLwB4G/MTERRACOTA.png"
  },
  pareja: {
    nombres: "Karina & Josimar",
    portadaEtiqueta: "Nos casamos",
    novia: "Karina",
    novio: "Josimar",
    fecha: "29-11-2026",
    fechaVisible: "29.11.2026",
    fechaDestacada: "29 . 11 . 2026",
    cierreSubtitulo: "con amor"
  },
  ceremonia: {
    mensaje: "Con la bendición de Dios y el cariño de nuestras familias, esperamos celebrar junto a ustedes el inicio de nuestra vida juntos.",
    padresNoviaTitulo: "Padres de la Novia",
    padresNovia: "Roberto Ramos & Azucena de León",
    padresNovioTitulo: "Padres del Novio",
    padresNovio: "Rolando Arango & Lorena Martinez"
  },
  musica: {
    titulo: "Nuestra Canción",
    archivo: "music.mp3"
  },
  evento: {
    ceremonia: {
      titulo: "Ceremonia",
      lugar: "La Quebrada",
      hora: "10:00 AM",
      direccion: "Diagonal Santa Rita Final, Zona 2 La Esperanza, Quetzaltenango",
      ubicacionUrl: "https://maps.app.goo.gl/K5vjHnkmAUKRwrmW6"
    },
    recepcion: {
      titulo: "Recepción",
      lugar: "La Quebrada",
      hora: "11:00 AM",
      direccion: "Diagonal Santa Rita Final, Zona 2 La Esperanza, Quetzaltenango",
      ubicacionUrl: "https://maps.app.goo.gl/K5vjHnkmAUKRwrmW6"
    },
    calendario: {
      detalle: "Nos encantará compartir este día contigo.",
      ubicacion: "La Quebrada, La Esperanza, Quetzaltenango"
    }
  },
  itinerario: {
    titulo: "Itinerario",
    items: [
      { icono: "Images/ICONO-1.png", alt: "Ceremonia", hora: "10:00 AM", texto: "Ceremonia" },
      { icono: "Images/ICONO-3.png", alt: "Recepción", hora: "11:00 AM", texto: "Recepción" }
    ]
  },
  dressCode: {
    titulo: "Dress Code",
    subtitulo: "Formal para actividad de día",
    descripcion: "Evitar llevar los colores blanco y terracota para no opacar a los novios.",
    coloresReservados: [
      { nombre: "Blanco", color: "#FFFFFF" },
      { nombre: "Terracota", color: "#C56B4A" }
    ]
  },
  regalo: {
    titulo: "Mesa de Regalos",
    descripcion: "Te recomendamos puedas elegir tu regalo en el link adjunto.",
    boton: "Bodas Cemaco",
    url: "https://www.cemaco.com/list/BODAARANGORAMOS29112026",
    transferencia: {
      titular: "",
      medio: "",
      cuenta: "",
      tipo: ""
    }
  },
  textos: {
    mensajeInvitado: "Ayúdanos a que nuestro momento sea único y especial como tú lo eres para nosotros, por lo que te recomendamos lo siguiente: Agradecemos no llevar personas adicionales a lo que te indica el pase.",
    mensajePases: "Hemos reservado {pases} lugares en su honor",
    fechaLabel: "Nuestro gran día"
  },
  deseos: {
    titulo: "Buenos deseos",
    intro: "Déjanos un mensaje especial para este día tan importante."
  },
  adultos: {
    titulo: "Solo adultos",
    descripcion: "Aunque adoramos a los pequeños, hemos reservado esta celebración para adultos. Gracias por comprender y acompañarnos en este momento tan importante.",
    mostrar: true
  },
  rsvp: {
    titulo: "Confirmar asistencia",
    mensaje: "Ayúdanos a que nuestro momento sea único y especial como tú lo eres para nosotros, por lo que te recomendamos lo siguiente: Agradecemos no llevar personas adicionales a lo que te indica el pase."
  },
  galeria: {
    portadaPrincipal: "Images/E2.png",
    historia: ["Images/S1.png", "Images/S2.png"],
    celebracion: ["Images/C1.png", "Images/C2.png"],
    pareja: ["Images/F1.png", "Images/F2.png"]
  },
  footer: {
    hashtag: "#KarinaYJosimar",
    instagramUrl: "https://www.instagram.com/thetwodesign",
    facebookUrl: "https://www.facebook.com/thetwodesign",
    marcaTexto: "Diseño",
    marcaNombre: "Two Design",
    marcaUrl: "https://twodesign.com"
  }
};

window.config = config;
window.firebaseConfig = firebaseConfig;
