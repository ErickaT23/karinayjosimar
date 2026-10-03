// ===================== SCRIPT.JS (MODELO EDITORIAL) =====================
// ⚠️ IMPORTANTE: NO usar "$" porque rsvp.js ya lo usa.
// Usamos "$$" para evitar conflicto.
const $$ = (s) => document.querySelector(s);

function getInvitationConfig() {
  return window.config || {};
}

function setText(selector, value) {
  const el = typeof selector === "string" ? $$(selector) : selector;
  if (!el || value == null) return;
  el.textContent = String(value);
}

function setHtml(selector, value) {
  const el = typeof selector === "string" ? $$(selector) : selector;
  if (!el || value == null) return;
  el.innerHTML = String(value);
}

function setLink(selector, href) {
  const el = typeof selector === "string" ? $$(selector) : selector;
  if (!el || !href) return;
  el.href = String(href);
}

function setImage(selector, src, alt) {
  const el = typeof selector === "string" ? $$(selector) : selector;
  if (!el || !src) return;
  el.src = String(src);
  if (alt) el.alt = String(alt);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getEventDateParts() {
  const dateISO = getInvitationConfig()?.event?.dateISO;
  const date = dateISO ? new Date(dateISO) : null;

  if (date && !Number.isNaN(date.getTime())) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      date,
    };
  }

  return {
    year: 2026,
    month: 11,
    day: 14,
    hours: 16,
    minutes: 0,
    seconds: 0,
    date: new Date(2026, 10, 14, 16, 0, 0),
  };
}

function buildCalendarUrl() {
  const cfg = getInvitationConfig();
  const eventCfg = cfg.evento || {};
  const parts = getEventDateParts();
  const startDate = parts.date;
  const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000);
  const formatGoogleDate = (date) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
  };

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: cfg.pareja?.nombres || "Nuestra celebración",
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
    details: eventCfg.calendario?.detalle || "Nos encantará compartir este día contigo.",
    location: eventCfg.calendario?.ubicacion || eventCfg.ceremonia?.direccion || "",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function renderTimeline() {
  const track = $$("#timelineTrack");
  const items = getInvitationConfig()?.itinerario?.items;
  if (!track || !Array.isArray(items) || !items.length) return;

  track.innerHTML = items.map((item) => `
    <div class="timeline-item">
      <img src="${escapeHtml(item.icono || "")}" alt="${escapeHtml(item.alt || item.texto || "Itinerario")}" class="timeline-icon">
      <div class="timeline-node" aria-hidden="true">
        <span class="timeline-dot"></span>
      </div>
      <div class="timeline-content">
        <p class="timeline-time">${escapeHtml(item.hora || "")}</p>
        <p class="timeline-text">${escapeHtml(item.texto || "")}</p>
      </div>
    </div>
  `).join("");
}

function renderDressCodeSwatches() {
  const wrap = $$("#dressCodeSwatches");
  const colors = getInvitationConfig()?.dressCode?.coloresReservados;
  if (!wrap || !Array.isArray(colors) || !colors.length) return;

  wrap.innerHTML = colors.map((item) => `
    <span class="dress-swatch" style="background:${escapeHtml(item.color || "#FFFFFF")}" aria-label="${escapeHtml(item.nombre || "Color reservado")}" title="${escapeHtml(item.nombre || "Color reservado")}"></span>
  `).join("");
}

function renderInvitationContent() {
  const cfg = getInvitationConfig();
  const seo = cfg.seo || {};
  const pareja = cfg.pareja || {};
  const ceremonia = cfg.ceremonia || {};
  const evento = cfg.evento || {};
  const galeria = cfg.galeria || {};
  const regalo = cfg.regalo || {};
  const transferencia = regalo.transferencia || {};
  const adultos = cfg.adultos || {};

  document.title = seo.titulo || document.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", seo.descripcion || "");
  $$("#metaOgTitle")?.setAttribute("content", seo.titulo || document.title);
  $$("#metaOgDescription")?.setAttribute("content", seo.descripcion || "");
  $$("#metaOgImage")?.setAttribute("content", seo.ogImage || galeria.portadaPrincipal || "");
  $$("#metaKeywords")?.setAttribute("content", seo.keywords || "");
  $$("#metaAuthor")?.setAttribute("content", seo.autor || "");
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", seo.titulo || document.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", seo.descripcion || "");
  document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", seo.ogImage || galeria.portadaPrincipal || "");

  setHtml("#coverCouple", escapeHtml(pareja.nombres || "Nuestra celebración").replace("&amp;", '<span class="amp">&</span>'));
  setText("#heroBrideName", pareja.novia || "Novia");
  setText("#heroGroomName", pareja.novio || "Novio");
  setText("#marriageNoteText", ceremonia.mensaje);
  setText("#brideParentsTitle", ceremonia.padresNoviaTitulo);
  setText("#brideParentsNames", ceremonia.padresNovia);
  setText("#groomParentsTitle", ceremonia.padresNovioTitulo);
  setText("#groomParentsNames", ceremonia.padresNovio);
  setText("#dateHighlightLabel", cfg.textos?.fechaLabel || "Nuestro gran día");
  setText("#dateHighlightValue", pareja.fechaDestacada || pareja.fechaVisible || "00 . 00 . 0000");
  setLink("#calendarBtn", buildCalendarUrl());
  setText("#ceremonyTitle", evento.ceremonia?.titulo);
  setText("#ceremonyPlace", evento.ceremonia?.lugar);
  setText("#ceremonyTime", evento.ceremonia?.hora);
  setText("#ceremonyLocation", evento.ceremonia?.direccion);
  setLink("#ceremonyMapLink", evento.ceremonia?.ubicacionUrl);
  setText("#receptionTitle", evento.recepcion?.titulo);
  setText("#receptionPlace", evento.recepcion?.lugar);
  setText("#receptionTime", evento.recepcion?.hora);
  setText("#receptionLocation", evento.recepcion?.direccion);
  setLink("#receptionMapLink", evento.recepcion?.ubicacionUrl);
  setText("#itineraryTitle", cfg.itinerario?.titulo || "Itinerario");
  setText("#dressCodeTitle", cfg.dressCode?.titulo || "Dress Code");
  setText("#dressCodeSubtitle", cfg.dressCode?.subtitulo || "");
  setText("#dressCodeText", cfg.dressCode?.descripcion || "");
  setText("#giftTitle", regalo.titulo || "Regalo");
  setText("#giftText", regalo.descripcion || "");
  setText("#giftLink", regalo.boton || "Ver mesa de regalos");
  setLink("#giftLink", regalo.url);
  setText("#transferNames", transferencia.titular || pareja.novia || pareja.nombres);
  setText("#bankName", transferencia.medio || "");
  setText("#accountNumber", transferencia.cuenta || "");
  setText("#accountType", transferencia.tipo || "");
  setText("#accountOwner", transferencia.titular || pareja.novia || pareja.nombres);
  setText("#wishesTitle", cfg.deseos?.titulo || "Buenos deseos");
  setText("#wishesIntro", cfg.deseos?.intro || "");
  setText("#adultsOnlyTitle", cfg.adultos?.titulo || "Solo adultos");
  setText("#adultsOnlyText", cfg.adultos?.descripcion || "");
  setText("#rsvpTitle", cfg.rsvp?.titulo || "Confirmar Asistencia");
  setText("#rsvpCopy", cfg.rsvp?.mensaje || "");
  setText("#closingSubtitle", pareja.cierreSubtitulo || "con amor");
  setText("#closingCouple", pareja.nombres || "Nuestra celebración");
  setLink("#footerFacebook", cfg.footer?.facebookUrl);
  setLink("#footerInstagram", cfg.footer?.instagramUrl);
  setImage("#heroMainImage", galeria.portadaPrincipal || "Images/E2.png", pareja.nombres || "Invitación");
  setImage("#storySepImg", galeria.historia?.[0] || "Images/S1.png", "Galería de la pareja");
  setImage("#celebrationSepImg", galeria.celebracion?.[0] || "Images/C1.png", "Galería de celebración");
  setImage("#rotatingSepImg", galeria.pareja?.[0] || "Images/F1.png", "Foto pareja");

  const adultsSection = $$("#adultsOnlySection");
  if (adultsSection && adultos.mostrar === false) {
    adultsSection.style.display = "none";
  }

  const transferBackdrop = $$("#transferBackdrop");
  const hasTransferData = [transferencia.medio, transferencia.cuenta, transferencia.tipo, transferencia.titular].some((value) => String(value || "").trim());
  if (transferBackdrop && !hasTransferData) {
    transferBackdrop.remove();
  }

  const source = $$("#bgMusicSource");
  const audio = $$("#bgMusic");
  if (source && cfg.musica?.archivo) {
    source.src = cfg.musica.archivo;
    audio?.load();
  }

  renderTimeline();
  renderDressCodeSwatches();
}

document.addEventListener("DOMContentLoaded", () => {
  renderInvitationContent();

  // 1) Pintar invitado en portada (desde loads.js)
  paintGuestCard();

  // 2) Botón abrir invitación
  const btnOpenInvite = $$("#btnOpenInvite");
  const btnOpenEnvelope = $$("#btnOpenEnvelope");
  if (btnOpenInvite) {
    btnOpenInvite.addEventListener("click", openInvitation);
  }
  if (btnOpenEnvelope) {
    btnOpenEnvelope.addEventListener("click", openInvitation);
    btnOpenEnvelope.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openInvitation();
      }
    });
  }

  // 3) Animaciones al hacer scroll
  initScrollReveal();

  initGoldReveal();

  // 4) Música
  initMusic();

  // 5) Contador
  const countdownDate = getEventDateParts();
  initCountdown(countdownDate.year, countdownDate.month, countdownDate.day, countdownDate.hours, countdownDate.minutes, countdownDate.seconds);

  // 6) Separadores rotativos
  initRotatingSep("rotatingSepImg", getInvitationConfig()?.galeria?.pareja || ["Images/F1.png", "Images/F2.png"]);
  initRotatingSep("celebrationSepImg", getInvitationConfig()?.galeria?.celebracion || ["Images/C1.png", "Images/C2.png"]);
  initRotatingSep("storySepImg", getInvitationConfig()?.galeria?.historia || ["Images/S1.png", "Images/S2.png"]);
});

/* ===================== INVITADO EN PORTADA ===================== */
function paintGuestCard() {
  const nameEl = $$("#guestCardName");
  const seatsEl = $$("#guestCardSeats");
  const seatsTxtEl = $$("#guestCardSeatsTxt");

  // Si no existen (por si aún no pegaste el HTML), no rompe
  if (!nameEl || !seatsEl) return;

  const g = window.currentGuest;

  if (g && g.name) {
    nameEl.textContent = g.name;
    const p = Number(g.passes || 1);
    seatsEl.textContent = String(p);
    if (seatsTxtEl) seatsTxtEl.textContent = p === 1 ? "lugar" : "lugares";
  } else {
    // Si entraste sin ?id=
    nameEl.textContent = "Nombre del invitado";
    seatsEl.textContent = "x";
    if (seatsTxtEl) seatsTxtEl.textContent = "lugares";
  }
}

/* ===================== ABRIR INVITACIÓN ===================== */
function openInvitation() {
  const cover = $$("#cover");
  const main = $$("#invitation");

  if (!cover || !main) return;

  // Ocultar portada con animación
  cover.classList.add("is-hidden");

  setTimeout(async () => {
    cover.style.display = "none";

    // Mostrar invitación
    main.classList.add("is-open");
    main.setAttribute("aria-hidden", "false");
    document.body.classList.add("invitation-open");
    const countdownDate = getEventDateParts();
    initCountdown(countdownDate.year, countdownDate.month, countdownDate.day, countdownDate.hours, countdownDate.minutes, countdownDate.seconds);

    // ✅ Reproducir música automáticamente (por el click del usuario)
    await autoplayMusic();

    // Scroll suave al hero
    setTimeout(() => {
      $$("#hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

  }, 600);
}

/* ===================== REVEAL AL SCROLL ===================== */
function initScrollReveal() {
  const els = document.querySelectorAll(".fade-in-element");
  if (!els || els.length === 0) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => obs.observe(el));
}

/* ================= Animar True Love ================= */
function initGoldReveal() {
  const el = document.querySelector(".reveal-gold");
  if (!el) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.5 }
  );

  obs.observe(el);
}

/* ===================== MÚSICA ===================== */
/* ===================== MÚSICA ===================== */
function initMusic() {
  const btn = $$("#btnMusic");
  const audio = $$("#bgMusic");
  if (!btn || !audio) return;

  audio.loop = true;
  updateMusicButton(btn, false);

  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        updateMusicButton(btn, true);
      } else {
        audio.pause();
        updateMusicButton(btn, false);
      }
    } catch (e) {
      console.warn("No se pudo reproducir audio:", e);
    }
  });

  audio.addEventListener("play", () => updateMusicButton(btn, true));
  audio.addEventListener("pause", () => updateMusicButton(btn, false));
}

/* ===================== AUTO-PLAY AL ABRIR ===================== */
async function autoplayMusic() {
  const btn = $$("#btnMusic");
  const audio = $$("#bgMusic");
  if (!btn || !audio) return;

  try {
    audio.loop = true;
    await audio.play();
    updateMusicButton(btn, true);
  } catch (e) {
    console.warn("Auto-play bloqueado:", e);
    updateMusicButton(btn, false);
  }
}

function updateMusicButton(btn, isPlaying) {
  if (!btn) return;

  btn.innerHTML = isPlaying
    ? '<i class="fa-solid fa-pause" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-play" aria-hidden="true"></i>';
  btn.setAttribute("aria-label", isPlaying ? "Pausar música" : "Reproducir música");
}

/* ===================== CONTADOR ===================== */
function initCountdown(year, month, day, hours = 0, minutes = 0, seconds = 0) {
  const dEl = $$("#cdDays");
  const hEl = $$("#cdHours");
  const mEl = $$("#cdMins");
  const sEl = $$("#cdSecs");
  if (!dEl || !hEl || !mEl) return;

  const target = new Date(year, month - 1, day, hours, minutes, seconds).getTime();
  if (Number.isNaN(target)) return;

  const pad2 = (n) => String(n).padStart(2, "0");

  if (window.__countdownTimer) {
    clearInterval(window.__countdownTimer);
  }

  const tick = () => {
    const now = Date.now();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    dEl.textContent = pad2(days);
    hEl.textContent = pad2(hours);
    mEl.textContent = pad2(mins);
    if (sEl) sEl.textContent = pad2(secs);
  };

  tick();
  window.__countdownTimer = setInterval(tick, 1000);
}

/* ===================== SEPARADOR ROTATIVO ===================== */
function initRotatingSep(imageId, images){
  const imgEl = document.getElementById(imageId);
  if(!imgEl || !images || images.length === 0) return;

  let currentIndex = 0;

  function changeImage(){

    imgEl.style.opacity = 0;

    setTimeout(() => {

      currentIndex = (currentIndex + 1) % images.length;
      imgEl.onload = () => {
        imgEl.style.opacity = 1;
      };

      imgEl.src = images[currentIndex];

      // Si la imagen ya estaba en caché, garantizamos recuperar la opacidad.
      setTimeout(() => {
        imgEl.style.opacity = 1;
      }, 120);

    }, 400);

  }

  setInterval(changeImage, 5000);
}

//contador
function initFlipCountdown(targetISO){
  const target = new Date(targetISO).getTime();
  const pad2 = (n) => String(n).padStart(2, "0");

  const setFlip = (flipEl, newValue) => {
    if (!flipEl) return;

    const top = flipEl.querySelector(".top .digit");
    const bottom = flipEl.querySelector(".bottom .digit");
    const topFlip = flipEl.querySelector(".top-flip .digit");
    const bottomFlip = flipEl.querySelector(".bottom-flip .digit");

    const current = top?.textContent ?? "00";
    if (current === newValue) return;

    topFlip.textContent = current;
    bottomFlip.textContent = newValue;

    bottom.textContent = newValue;

    flipEl.classList.add("is-flipping");

    setTimeout(() => { top.textContent = newValue; }, 650);
    setTimeout(() => { flipEl.classList.remove("is-flipping"); }, 1300);
  };

  const flipDays = document.getElementById("flipDays");
  const flipHours = document.getElementById("flipHours");
  const flipMins = document.getElementById("flipMins");
  const flipSecs = document.getElementById("flipSecs");

  if (!flipDays && !flipHours && !flipMins && !flipSecs) return;

  const initVal = (el, v) => {
    if (!el) return;
    el.querySelector(".top .digit").textContent = v;
    el.querySelector(".bottom .digit").textContent = v;
    el.querySelector(".top-flip .digit").textContent = v;
    el.querySelector(".bottom-flip .digit").textContent = v;
  };

  initVal(flipDays, "00");
  initVal(flipHours, "00");
  initVal(flipMins, "00");
  initVal(flipSecs, "00");

  const tick = () => {
    const now = Date.now();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    setFlip(flipDays, pad2(days));
    setFlip(flipHours, pad2(hours));
    setFlip(flipMins, pad2(mins));
    setFlip(flipSecs, pad2(secs));
  };

  tick();
  setInterval(tick, 1000);
}

//animaciones
// ================= ANIMACIONES POR SECCIÓN (AUTO) =================
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  // fallback por si el navegador no soporta IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    sections.forEach(s => s.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target); // solo una vez
      }
    });
  }, { threshold: 0.18 });

  sections.forEach(s => io.observe(s));
});

// ================= TRANSFERENCIA MODAL =================
document.addEventListener("DOMContentLoaded", () => {
  const btnClose = document.getElementById("btnCloseTransfer");
  const backdrop = document.getElementById("transferBackdrop");

  const btnCopy = document.getElementById("btnCopyAccount");
  const toast = document.getElementById("copyToast");

  function closeModal(){
    if(!backdrop) return;
    backdrop.style.display = "none";
    backdrop.setAttribute("aria-hidden", "true");
  }

  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.style.display = "block";
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.style.display = "none";
    }, 1400);
  }

  if (btnClose) btnClose.addEventListener("click", closeModal);

  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener("click", async () => {
  
      const bank = document.getElementById("bankName")?.textContent.trim();
      const account = document.getElementById("accountNumber")?.textContent.trim();
      const type = document.getElementById("accountType")?.textContent.trim();
      const owner = document.getElementById("accountOwner")?.textContent.trim();
  
      const fullText = 
  `Datos de Transferencia:
  Medio: ${bank}
  Cuenta monetaria: ${account}
  Tipo: ${type}
  Nombre: ${owner}`;
  
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(fullText);
        } else {
          const ta = document.createElement("textarea");
          ta.value = fullText;
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
  
        showToast("✅ Datos bancarios copiados");
  
      } catch (err) {
        showToast("⚠️ No se pudo copiar");
      }
  
    });
  }
});
