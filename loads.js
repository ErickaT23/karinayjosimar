// La lista se administra directamente desde admin.html y Firebase.
const guests = [
  { id: "1", name: "Azucena de León Y Familia", passes: 1, omitPasses: true },
  { id: "2", name: "Roberto Ramos", passes: 1 },
  { id: "3", name: "Flavio Ramos y Esposa", passes: 2 },
  { id: "4", name: "Deane Morrinson y Familia", passes: 3 },
  { id: "5", name: "Sofia Ramos", passes: 1 },
  { id: "6", name: "Bryan Sacor y esposa", passes: 2 },
  { id: "7", name: "Graciela Tucux", passes: 1 },
  { id: "8", name: "Paola Ramos", passes: 2 },
  { id: "9", name: "Wendy Ramos", passes: 1 },
  { id: "10", name: "Daniel Mora y Esposa", passes: 2 },
  { id: "11", name: "Reyna Alvarado y Familia", passes: 2 },
  { id: "12", name: "Carlos Ramos", passes: 1 },
  { id: "13", name: "Daniel y Esposa", passes: 2 },
  { id: "14", name: "Giovanna Rodas", passes: 1 },
  { id: "15", name: "Ashly Dominguez", passes: 1 },
  { id: "16", name: "Nancy Perez", passes: 1 },
  { id: "17", name: "Maria Sandoval", passes: 1 },
  { id: "18", name: "Adolfo Vicente y Familia", passes: 5 },
  { id: "19", name: "Edgar Reyes y Esposa", passes: 2 },
  { id: "20", name: "Rolando Arango", passes: 1 },
  { id: "21", name: "Judith Velazquez", passes: 1 },
  { id: "22", name: "Daniel Raymundo y esposa", passes: 2 },
  { id: "23", name: "Eder Arango y Esposa", passes: 4 },
  { id: "24", name: "Edgar Arango", passes: 1 },
  { id: "25", name: "Edgar Recinos y Familia", passes: 2 },
  { id: "26", name: "Lidia Martinez", passes: 1 },
  { id: "27", name: "Diego Chiroy y Esposa", passes: 2 },
  { id: "28", name: "Kevin Gunera", passes: 1 },
  { id: "29", name: "Alí de León y Esposa", passes: 2 },
  { id: "30", name: "Luis Díaz y Esposa", passes: 2 },
  { id: "31", name: "Omar Martinez y Esposa", passes: 2 },
  { id: "32", name: "Victoria Martínez", passes: 1 },
  { id: "33", name: "Isaac Barajas y Esposa", passes: 3 },
  { id: "34", name: "Noe Velasco", passes: 1 },
  { id: "35", name: "Julio Herrera y Esposa", passes: 2 },
  { id: "36", name: "Alejandro Queme y Angie Mutz", passes: 2 },
  { id: "37", name: "Gabriela Quemé", passes: 1 },
  { id: "38", name: "Edgar Recinos y Familia", passes: 2 },
  { id: "39", name: "Reyna Arango y Familia", passes: 2 },
];

window.LocalGuestSeeds = {
  ...(window.LocalGuestSeeds || {}),
  karinajosimar2026: guests.reduce((acc, guest) => {
    acc[String(guest.id)] = {
      id: String(guest.id),
      nombre: guest.name,
      pases: Number(guest.passes || 1),
      omitPasses: guest.omitPasses === true,
      activo: true,
    };
    return acc;
  }, {}),
};

window.seedEventGuestsToFirebase = async function seedEventGuestsToFirebase(explicitEventId) {
  const eventId = explicitEventId || window.config?.event?.defaultEventId || "karinajosimar2026";
  const rsvpDB = window.RSVPDatabase;

  if (!rsvpDB?.migrateLocalGuestsToFirebase) {
    console.warn("RSVPDatabase no está disponible. Revisa que database.js esté cargado.");
    return { ok: false, guests: 0 };
  }

  await rsvpDB.seedEventConfigToFirebase?.(eventId, { force: true });
  await rsvpDB.clearConfirmations?.(eventId);
  const result = await rsvpDB.migrateLocalGuestsToFirebase(eventId, { force: true });
  console.log(`Invitados creados en Firebase: ${result.total || guests.length}`);
  return { ok: true, guests: result.total || guests.length };
};

// Helper: leer parámetros ?id=1
function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

document.addEventListener("DOMContentLoaded", () => {
  const guestId = getQueryParam("id");

  // Si no hay id, no marcamos error: solo no hay invitado
  if (!guestId) {
    window.currentGuest = null;
    return;
  }

  const guest = guests.find((g) => String(g.id) === String(guestId));

  if (guest) {
    window.currentGuest = guest;

    // Si tienes estos elementos en alguna parte, los llena (opcional)
    const guestNameEl = document.getElementById("guest-name");
    const passesEl = document.getElementById("passes");

    if (guestNameEl) guestNameEl.textContent = guest.name;
    if (passesEl) {
      const p = Number(guest.passes || 1);
      passesEl.textContent = `${p} ${p === 1 ? "pase" : "pases"}`;
    }
  } else {
    window.currentGuest = null;

    const guestNameEl = document.getElementById("guest-name");
    if (guestNameEl) guestNameEl.textContent = "Invitado no encontrado";
  }
});
