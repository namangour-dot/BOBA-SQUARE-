/* ==========================================================
   BOBA SQUARE — site interactions
   ========================================================== */

/* ----------------------------------------------------------
   OUTLET DETAILS — edit these to match the real outlet.
   Anything left as null is simply hidden on the page.
   ---------------------------------------------------------- */
const OUTLET = {
  name: "BOBA SQUARE",
  address: "Bhopal, Madhya Pradesh",          // e.g. "Shop 4, 10 No. Market, Arera Colony, Bhopal 462016"
  mapsQuery: "BOBA SQUARE Bhopal",             // what Google Maps should search for (or "lat,lng")
  phone: null,                                 // e.g. "+919876543210"
  instagram: null,                             // e.g. "https://instagram.com/bobasquare.bhopal"
  // Opening hours per weekday, 24h "HH:MM". Sunday = 0. Set to null to hide.
  // e.g. { 0: ["12:00","23:00"], 1: ["12:00","23:00"], ... }
  hours: null,
};

/* ----------------------------------------------------------
   MENU DATA
   ---------------------------------------------------------- */
const POP = {
  Chocolate:  { c: "#5a2d17", hi: "#a3623b" },
  Coffee:     { c: "#8b5a2b", hi: "#c79a6b" },
  Mango:      { c: "#ffb627", hi: "#ffe08a" },
  Strawberry: { c: "#ff3d6e", hi: "#ff9ab4" },
  Blueberry:  { c: "#4a5cff", hi: "#9aa6ff" },
  Lemon:      { c: "#f5e42c", hi: "#fff9a8" },
};

const CATS = {
  milk: {
    label: "Boba Shake",
    blurb: "Thick, creamy, blended-to-order milkshakes. Pick chewy brown-sugar pearls or popping boba.",
    boba: ["chewing", "popping"], sweet: true,
  },
  soda: {
    label: "Soda Boba",
    blurb: "Extra-fizzy, ice-cold and loaded with popping boba. Poured slow so every sip sparkles.",
    boba: ["popping", "chewing"], sweet: false,
  },
  special: {
    label: "Signature Special",
    blurb: "Our showstoppers. Blended with real biscuits & chocolate, loaded with chocolate popping boba and crowned with a topper.",
    boba: ["popping"], sweet: true,
  },
  premix: {
    label: "Premix Pick",
    blurb: "Café-style flavours like matcha and taro, made into a creamy boba shake. Ask what's on today!",
    boba: ["chewing", "popping"], sweet: true,
  },
};

const DRINKS = [
  // Milk-based
  { cat: "milk", name: "Rose", color: "#ffb3c9", desc: "Floral, pink & dreamy — a desi favourite turned boba.", pair: ["Strawberry"] },
  { cat: "milk", name: "Coffee", color: "#c79a6b", desc: "Cold-coffee energy with a chewy twist.", pair: ["Chocolate", "Coffee", "Blueberry"] },
  { cat: "milk", name: "Butterscotch", color: "#f3c06b", desc: "Golden, buttery, caramel-y comfort in a cup.", pair: ["Chocolate"] },
  { cat: "milk", name: "Mango", color: "#ffc93c", desc: "Sunny Alphonso vibes, blended thick.", pair: ["Mango"], tag: "Fan fave" },
  { cat: "milk", name: "Strawberry", color: "#ff9ab4", desc: "Sweet berry milkshake, pretty in pink.", pair: ["Strawberry"] },
  { cat: "milk", name: "Chocolate", color: "#8a5232", desc: "Rich, dark and seriously chocolatey.", pair: ["Chocolate", "Strawberry"] },
  { cat: "milk", name: "Blackcurrant", color: "#a05bb5", desc: "Tangy-sweet purple goodness.", pair: ["Blueberry"] },
  { cat: "milk", name: "Ras Malai", color: "#fff0c9", desc: "Saffron-cardamom mithai magic, now with boba.", pair: ["Mango"], tag: "Desi twist" },
  // Soda-based
  { cat: "soda", name: "Lemon Ice Tea", color: "#f3b44a", desc: "Classic lemony iced tea with a fizzy kick.", pair: ["Lemon"] },
  { cat: "soda", name: "Mojito", color: "#c9f2c7", desc: "Mint, lime and bubbles. Instant refresh.", pair: ["Lemon"] },
  { cat: "soda", name: "Green Lime Mojito", color: "#9be564", desc: "Extra zesty, extra green, extra cool.", pair: ["Lemon"] },
  { cat: "soda", name: "Green Mint", color: "#7fe0b4", desc: "Ice-cold mint soda for Bhopal summers.", pair: ["Lemon"] },
  { cat: "soda", name: "Watermelon Splash", color: "#ff6f8a", desc: "Juicy watermelon fizz. Tastes like holidays.", pair: ["Strawberry"], tag: "Summer hit" },
  { cat: "soda", name: "Blue Lagoon", color: "#4fc3f7", desc: "Electric blue, citrusy & totally Insta-ready.", pair: ["Blueberry"], tag: "Most clicked" },
  { cat: "soda", name: "Red Velvet", color: "#d62f4c", desc: "Velvety red soda with a berry-sweet finish.", pair: ["Strawberry"] },
  // Specials
  { cat: "special", name: "Oreo Boba", color: "#c9c3c7", topper: "#2b2023", desc: "Real Oreos blended into a chocolate shake, Oreo on top.", pair: ["Chocolate"], tag: "Bestseller" },
  { cat: "special", name: "KitKat Boba", color: "#b78360", topper: "#c8102e", desc: "A whole KitKat blended in, with a KitKat finger crown.", pair: ["Chocolate"] },
  { cat: "special", name: "Biscoff Boba", color: "#d9a066", topper: "#a0612a", desc: "Caramelised Lotus Biscoff goodness. Topped with a Biscoff.", pair: ["Chocolate"] },
  // Premix
  { cat: "premix", name: "Matcha", color: "#9cc96b", desc: "Earthy, creamy green-tea goodness.", pair: [] },
  { cat: "premix", name: "Taro", color: "#b79ad9", desc: "Nutty, vanilla-ish & famously purple.", pair: [] },
  { cat: "premix", name: "Green Melon", color: "#b5ec8a", desc: "Fresh honeydew melon vibes, creamy-cool.", pair: [] },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
};

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("is-on");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("is-on"), 2600);
}

/* ---------- Bubbles ---------- */
(function bubbles() {
  if (reduceMotion) return;
  const field = $(".bubble-field");
  const n = window.innerWidth < 700 ? 12 : 24;
  for (let i = 0; i < n; i++) {
    const b = document.createElement("i");
    const s = 8 + Math.random() * 34;
    Object.assign(b.style, {
      width: s + "px", height: s + "px", left: Math.random() * 100 + "%",
      animationDuration: 10 + Math.random() * 16 + "s",
      animationDelay: -Math.random() * 20 + "s",
    });
    b.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
    field.appendChild(b);
  }
})();

/* ---------- Nav ---------- */
(function nav() {
  const navEl = $(".nav"), btn = $(".nav__toggle");
  btn.addEventListener("click", () => {
    const open = navEl.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open);
  });
  $$(".nav__links a").forEach(a => a.addEventListener("click", () => {
    navEl.classList.remove("is-open");
    btn.setAttribute("aria-expanded", false);
  }));
  const fab = $(".fab"), visit = $("#visit"), hero = $(".hero");
  const onScroll = () => {
    const pastHero = hero.getBoundingClientRect().bottom < 0;
    const atVisit = visit.getBoundingClientRect().top < window.innerHeight * 0.6;
    fab.classList.toggle("is-visible", pastHero && !atVisit);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ---------- Counters ---------- */
(function counters() {
  const total = $('[data-count="18"]');
  if (total) total.dataset.count = DRINKS.length; // keep the count honest with the data
  $$("[data-count]").forEach(el => {
    const end = +el.dataset.count;
    if (reduceMotion) { el.textContent = end; return; }
    let cur = 0;
    const tick = () => { cur++; el.textContent = cur; if (cur < end) setTimeout(tick, 900 / end); };
    setTimeout(tick, 500);
  });
})();

/* ---------- Small cup SVG for cards ---------- */
function miniCupSVG(d) {
  const pearls = [[22, 70], [32, 72], [42, 70], [27, 63], [37, 64]]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2" fill="${d.cat === "milk" || d.cat === "premix" ? "#3b1d12" : (POP[d.pair[0]] || POP.Chocolate).c}"/>`).join("");
  const topper = d.topper ? `<rect x="24" y="16" width="16" height="6" rx="1.5" fill="${d.topper}"/>` : "";
  const fizz = d.cat === "soda" ? `<circle cx="20" cy="40" r="2" fill="#fff" opacity=".8"/><circle cx="40" cy="30" r="1.6" fill="#fff" opacity=".8"/><circle cx="33" cy="50" r="1.4" fill="#fff" opacity=".8"/>` : "";
  return `<svg viewBox="0 0 64 84" aria-hidden="true">
    <rect x="34" y="-6" width="5" height="60" rx="2.5" fill="#ff4f8b" transform="rotate(14 36 24)"/>
    <path d="M8 12 H56 L50 78 Q50 82 46 82 H18 Q14 82 14 78 Z" fill="${d.color}"/>
    ${fizz}${pearls}${topper}
    <rect x="5" y="8" width="54" height="6" rx="3" fill="#ffd84d" stroke="#5b0f86" stroke-width="1.6"/>
    <path d="M8 12 H56 L50 78 Q50 82 46 82 H18 Q14 82 14 78 Z" fill="none" stroke="#5b0f86" stroke-width="2.4"/>
  </svg>`;
}

/* ---------- Menu ---------- */
(function menu() {
  const grid = $("#menu-grid"), blurb = $("#cat-blurb");
  function render(cat) {
    blurb.textContent = CATS[cat].blurb;
    grid.innerHTML = "";
    DRINKS.filter(d => d.cat === cat).forEach((d, i) => {
      const card = document.createElement("button");
      card.className = "drink";
      card.type = "button";
      card.style.setProperty("--c", d.color);
      card.style.animationDelay = i * 60 + "ms";
      const pairTxt = d.cat === "special"
        ? "Comes with <b>chocolate popping boba</b>."
        : d.pair.length ? `Pairs best with <b>${d.pair.join(", ").toLowerCase()}</b> popping boba.` : "Great with chewy pearls or any popping boba.";
      card.innerHTML = `
        ${d.tag ? `<span class="drink__badge">${d.tag}</span>` : ""}
        <div class="drink-cup">${miniCupSVG(d)}</div>
        <div><h3>${d.name}</h3><p>${d.desc}</p></div>
        <div class="drink__more">${pairTxt}<br><span class="btn btn--pink btn--sm" data-build="${d.name}">Build this →</span></div>`;
      card.setAttribute("aria-expanded", "false");
      card.addEventListener("click", e => {
        if (e.target.dataset.build) {
          Builder.load(d.cat, d.name);
          $("#build").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
          return;
        }
        const open = card.classList.toggle("is-open");
        card.setAttribute("aria-expanded", open);
      });
      grid.appendChild(card);
    });
  }
  $$(".tab").forEach(t => t.addEventListener("click", () => {
    $$(".tab").forEach(x => { x.classList.remove("is-active"); x.setAttribute("aria-selected", "false"); });
    t.classList.add("is-active");
    t.setAttribute("aria-selected", "true");
    render(t.dataset.cat);
  }));
  render("milk");
})();

/* ---------- Cup builder ---------- */
const Builder = (function () {
  const state = { cat: "milk", flavour: "Mango", boba: "chewing", pop: "Mango", sweet: "Regular" };
  const cup = $("#cup");
  const NS = "http://www.w3.org/2000/svg";

  function chip(label, value, active, extra = {}) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (active ? " is-active" : "") + (extra.reco ? " is-reco" : "");
    b.dataset.v = value;
    if (extra.color) { b.style.setProperty("--c", extra.color); b.innerHTML = `<i></i>${label}`; }
    else b.textContent = label;
    if (extra.reco) b.title = "Recommended pairing";
    return b;
  }

  function drink() { return DRINKS.find(d => d.name === state.flavour); }

  function renderControls() {
    const catBox = $("#b-cat"); catBox.innerHTML = "";
    Object.entries(CATS).forEach(([k, v]) => catBox.appendChild(chip(v.label, k, k === state.cat)));

    const flBox = $("#b-flavour"); flBox.innerHTML = "";
    DRINKS.filter(d => d.cat === state.cat).forEach(d => flBox.appendChild(chip(d.name, d.name, d.name === state.flavour, { color: d.color })));

    const cat = CATS[state.cat], d = drink();
    const bobaBox = $("#b-boba"); bobaBox.innerHTML = "";
    cat.boba.forEach(b => bobaBox.appendChild(chip(b === "chewing" ? "Chewing pearls" : "Popping boba", b, b === state.boba)));

    const popBox = $("#b-pop"); popBox.innerHTML = "";
    if (state.boba === "popping") {
      const opts = state.cat === "special" ? ["Chocolate"] : Object.keys(POP);
      opts.forEach(p => popBox.appendChild(chip(p, p, p === state.pop, { color: POP[p].c, reco: d.pair.includes(p) })));
    }

    let hint = "";
    if (state.cat === "special") hint = "Signature specials always come with chocolate popping boba.";
    else if (state.cat === "soda" && state.boba === "chewing") hint = "Heads up: soda boba is usually best with popping boba — but it's your cup!";
    else if (state.boba === "popping" && state.pop === "Lemon" && state.cat !== "soda") hint = "Lemon popping boba is usually saved for sodas — but go wild if you like.";
    else if (state.boba === "popping" && d.pair.length) hint = `★ = our recommended pairing for ${d.name}.`;
    $("#b-hint").textContent = hint;
    $("#b-sweet-wrap").hidden = !cat.sweet;
    $$("#b-sweet .chip").forEach(c => c.classList.toggle("is-active", c.dataset.v === state.sweet));
  }

  function renderCup(animate = true) {
    const d = drink();
    $("#liquid").setAttribute("fill", d.color);
    // fizz bubbles for soda
    const fizz = $("#fizz"); fizz.innerHTML = "";
    if (state.cat === "soda" && !reduceMotion) {
      for (let i = 0; i < 14; i++) {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", 60 + Math.random() * 120);
        c.setAttribute("cy", 300);
        c.setAttribute("r", 1.5 + Math.random() * 3);
        c.setAttribute("fill", "#fff");
        c.setAttribute("class", "fizz-b");
        c.style.animationDelay = -Math.random() * 2.4 + "s";
        c.style.animationDuration = 1.6 + Math.random() * 1.6 + "s";
        fizz.appendChild(c);
      }
    }
    // pearls
    const g = $("#pearls"); g.innerHTML = "";
    const chew = state.boba === "chewing";
    const col = chew ? { c: "#3b1d12", hi: "#9a6440" } : POP[state.pop];
    const r = chew ? 11 : 9;
    const rows = [[300, 7], [281, 7], [263, 6], [246, 5]];
    let k = 0;
    rows.forEach(([y, n], ri) => {
      const width = 104 - ri * 4;
      for (let i = 0; i < n; i++) {
        const cx = 120 - width / 2 + (width / (n - 1)) * i + (ri % 2 ? 6 : 0) + (Math.random() * 4 - 2);
        const cy = y + (Math.random() * 4 - 2);
        const grp = document.createElementNS(NS, "g");
        if (animate && !reduceMotion) { grp.setAttribute("class", "pearl-in"); grp.style.animationDelay = k * 25 + "ms"; }
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", r);
        c.setAttribute("fill", col.c); c.setAttribute("class", "pearl");
        const h = document.createElementNS(NS, "circle");
        h.setAttribute("cx", cx - r * .35); h.setAttribute("cy", cy - r * .35); h.setAttribute("r", r * .3);
        h.setAttribute("fill", col.hi); h.setAttribute("opacity", chew ? ".55" : ".85");
        grp.append(c, h); g.appendChild(grp); k++;
      }
    });
    // topper for specials
    $("#topping").setAttribute("fill", d.topper || "transparent");
    if (animate && !reduceMotion) { cup.classList.remove("wobble"); void cup.getBBox(); cup.classList.add("wobble"); }
    renderTicket();
  }

  function summary() {
    const d = drink(), cat = CATS[state.cat];
    const boba = state.boba === "chewing" ? "Chewing pearls" : `${state.pop} popping boba`;
    const lines = [["Style", cat.label], ["Flavour", d.name], ["Boba", boba]];
    if (cat.sweet) lines.push(["Sweetness", state.sweet]);
    return { name: `${d.name}${state.cat === "special" ? "" : " " + cat.label}`, lines };
  }

  function renderTicket() {
    const s = summary();
    $("#t-name").textContent = s.name;
    $("#t-lines").innerHTML = s.lines.map(([a, b]) => `<li><span>${a}</span><span>${b}</span></li>`).join("");
  }

  function setCat(cat, flavour) {
    state.cat = cat;
    const list = DRINKS.filter(d => d.cat === cat);
    state.flavour = flavour && list.some(d => d.name === flavour) ? flavour : list[0].name;
    const cfg = CATS[cat];
    if (!cfg.boba.includes(state.boba)) state.boba = cfg.boba[0];
    if (cat === "soda") state.boba = "popping";
    if (cat === "special") { state.boba = "popping"; state.pop = "Chocolate"; }
    autoPop();
  }
  function autoPop() {
    const d = drink();
    if (state.cat === "special") state.pop = "Chocolate";
    else if (d.pair.length) state.pop = d.pair[0];
  }

  $("#b-cat").addEventListener("click", e => {
    const v = e.target.closest(".chip")?.dataset.v; if (!v || v === state.cat) return;
    setCat(v); renderControls(); renderCup();
  });
  $("#b-flavour").addEventListener("click", e => {
    const v = e.target.closest(".chip")?.dataset.v; if (!v) return;
    state.flavour = v; autoPop(); renderControls(); renderCup();
  });
  $("#b-boba").addEventListener("click", e => {
    const v = e.target.closest(".chip")?.dataset.v; if (!v) return;
    state.boba = v; renderControls(); renderCup();
  });
  $("#b-pop").addEventListener("click", e => {
    const v = e.target.closest(".chip")?.dataset.v; if (!v) return;
    state.pop = v; renderControls(); renderCup();
  });
  $("#b-sweet").addEventListener("click", e => {
    const v = e.target.closest(".chip")?.dataset.v; if (!v) return;
    state.sweet = v; renderControls(); renderTicket();
  });
  $("#shuffle").addEventListener("click", () => {
    const d = DRINKS[Math.floor(Math.random() * DRINKS.length)];
    setCat(d.cat, d.name);
    const opts = CATS[d.cat].boba;
    state.boba = d.cat === "soda" ? "popping" : opts[Math.floor(Math.random() * opts.length)];
    state.sweet = Math.random() < .3 ? "Extra sweet" : "Regular";
    renderControls(); renderCup();
    toast(`🎲 How about a ${d.name}?`);
  });
  $("#save-order").addEventListener("click", () => {
    const s = summary();
    store.set("bs-order", s);
    $("#saved-note").textContent = "Saved! It'll be waiting in the Visit section — just show it at the counter.";
    showSaved();
    toast("💜 Order saved — see you at BOBA SQUARE!");
  });
  $("#share-order").addEventListener("click", async () => {
    const s = summary();
    const text = `My BOBA SQUARE order: ${s.lines.map(l => l[1]).join(" · ")} 🧋 'Cause one is not enough!`;
    const url = location.href.split("#")[0];
    if (navigator.share) {
      try { await navigator.share({ title: "BOBA SQUARE", text, url }); } catch { /* cancelled */ }
    } else {
      try { await navigator.clipboard.writeText(`${text} ${url}`); toast("Copied to clipboard!"); }
      catch { toast(text); }
    }
  });

  renderControls(); renderCup(false);
  return {
    load(cat, flavour, boba) {
      setCat(cat, flavour);
      if (boba && CATS[cat].boba.includes(boba) && cat !== "soda") state.boba = boba;
      renderControls(); renderCup();
    },
  };
})();

function showSaved() {
  const s = store.get("bs-order");
  if (!s) return;
  $("#visit-saved").hidden = false;
  $("#visit-saved-name").textContent = s.lines.map(l => l[1]).join(" · ");
}
showSaved();

/* ---------- Quiz ---------- */
(function quiz() {
  const Q = [
    { q: "Pick your vibe today:", opts: [
      { e: "🍦", t: "Creamy & comforting", tag: "milk" },
      { e: "🫧", t: "Fizzy & refreshing", tag: "soda" },
      { e: "🤤", t: "Go big or go home", tag: "special" },
    ] },
    { q: "Which taste is calling you?", opts: [
      { e: "🍓", t: "Fruity", tag: "fruity" },
      { e: "🍫", t: "Chocolatey", tag: "choc" },
      { e: "🌿", t: "Minty & citrusy", tag: "fresh" },
      { e: "🪔", t: "Desi & nostalgic", tag: "desi" },
    ] },
    { q: "In your cup, you want things to…", opts: [
      { e: "😋", t: "Chew", tag: "chewing" },
      { e: "💥", t: "Pop", tag: "popping" },
    ] },
  ];
  const MATCH = {
    milk:    { fruity: "Strawberry", choc: "Chocolate", fresh: "Blackcurrant", desi: "Ras Malai" },
    soda:    { fruity: "Watermelon Splash", choc: "Red Velvet", fresh: "Green Lime Mojito", desi: "Lemon Ice Tea" },
    special: { fruity: "Biscoff Boba", choc: "Oreo Boba", fresh: "KitKat Boba", desi: "Biscoff Boba" },
  };
  const LINES = {
    "Strawberry": "Sweet, sunny and impossible not to love. Just like you.",
    "Chocolate": "Classic, rich and dependable — the friend everyone calls first.",
    "Blackcurrant": "A little tangy, a lot fun. You keep things interesting.",
    "Ras Malai": "Old soul, new tricks. Mithai meets boba — iconic.",
    "Watermelon Splash": "Pure holiday energy. You're the main character of summer.",
    "Red Velvet": "Smooth, bold and a bit dramatic. We love it.",
    "Green Lime Mojito": "Cool as mint, sharp as lime. Chill personified.",
    "Lemon Ice Tea": "Timeless and refreshing — the original chai-break upgrade.",
    "Biscoff Boba": "Golden, caramel-y and a little extra. Treat yourself.",
    "Oreo Boba": "Cookies-and-cream royalty. Our bestseller, obviously.",
    "KitKat Boba": "You deserve a break. Make it a KitKat Boba.",
  };
  let step = 0, ans = [];
  const body = $("#quiz-body"), bar = $("#quiz-bar");

  function render() {
    bar.style.width = (step / Q.length) * 100 + "%";
    if (step >= Q.length) return result();
    const s = Q[step];
    body.innerHTML = `<div class="quiz__step"><small>Question ${step + 1} of ${Q.length}</small><h3>${s.q}</h3>
      <div class="quiz__opts">${s.opts.map((o, i) => `<button class="quiz__opt" data-i="${i}"><span>${o.e}</span>${o.t}</button>`).join("")}</div></div>`;
    $$(".quiz__opt", body).forEach(b => b.addEventListener("click", () => { ans.push(s.opts[b.dataset.i].tag); step++; render(); }));
  }

  function result() {
    const [cat, taste, boba] = ans;
    const name = MATCH[cat][taste];
    const d = DRINKS.find(x => x.name === name);
    const bobaTxt = cat === "special" ? "chocolate popping boba"
      : (cat === "soda" || boba === "popping") ? `${(d.pair[0] || "mango").toLowerCase()} popping boba` : "chewy brown-sugar pearls";
    body.innerHTML = `<div class="quiz__step quiz__result">
      <div class="drink-cup" style="margin:0 auto;width:90px;height:118px">${miniCupSVG(d)}</div>
      <small>Your boba match is</small>
      <p class="big">${name}${cat === "special" ? "" : " " + CATS[cat].label}</p>
      <p>${LINES[name]}<br>Best with <strong>${bobaTxt}</strong>.</p>
      <div class="btns">
        <button class="btn btn--pink" id="q-build">Build it →</button>
        <a href="#visit" class="btn btn--yellow">📍 Go get it</a>
        <button class="btn btn--ghost-dark" id="q-again">Retake</button>
      </div></div>`;
    confetti();
    $("#q-again").addEventListener("click", () => { step = 0; ans = []; render(); });
    $("#q-build").addEventListener("click", () => {
      Builder.load(cat, name, boba);
      $("#build").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  function confetti() {
    if (reduceMotion) return;
    const cols = ["#ff4f8b", "#ffd84d", "#7b1fa2", "#4fc3f7", "#fff"];
    for (let i = 0; i < 40; i++) {
      const c = document.createElement("i");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = cols[i % cols.length];
      c.style.setProperty("--x", (Math.random() * 200 - 100) + "px");
      c.style.animationDelay = Math.random() * .4 + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 2400);
    }
  }
  render();
})();

/* ---------- Flip cards ---------- */
$$(".flip").forEach(f => f.addEventListener("click", () => f.classList.toggle("is-flipped")));

/* ---------- Visit section ---------- */
(function visit() {
  const q = encodeURIComponent(OUTLET.mapsQuery);
  $("#v-address").textContent = OUTLET.address;
  $("#v-directions").href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  $("#v-map").src = `https://maps.google.com/maps?q=${q}&z=15&output=embed`;

  const call = $("#v-call");
  if (OUTLET.phone) call.href = `tel:${OUTLET.phone}`; else call.remove();
  const insta = $("#v-insta");
  if (OUTLET.instagram) insta.href = OUTLET.instagram; else insta.remove();

  const shareText = `Found the best boba in Bhopal 🧋 BOBA SQUARE — 'Cause one is not enough! Let's go: ${location.href.split("#")[0]}`;
  $("#v-whatsapp").href = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const badge = $("#open-badge"), hoursEl = $("#v-hours");
  if (!OUTLET.hours) {
    badge.remove();
    hoursEl.innerHTML = `<dt>Hours</dt><dd>Open daily — drop by for your boba fix!</dd>`;
    return;
  }
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date(), today = now.getDay();
  const fmt = t => { const [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "pm" : "am"; return `${((h + 11) % 12) + 1}${m ? ":" + String(m).padStart(2, "0") : ""}${ap}`; };
  hoursEl.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(i => {
    const h = OUTLET.hours[i];
    const cls = i === today ? ' class="today"' : "";
    return `<dt${cls}>${days[i]}</dt><dd${cls}>${h ? `${fmt(h[0])} – ${fmt(h[1])}` : "Closed"}</dd>`;
  }).join("");
  const h = OUTLET.hours[today];
  const mins = now.getHours() * 60 + now.getMinutes();
  const toM = t => { const [a, b] = t.split(":").map(Number); return a * 60 + b; };
  const open = h && mins >= toM(h[0]) && mins < toM(h[1]);
  badge.classList.add(open ? "is-open" : "is-closed");
  $("span", badge).textContent = open ? `Open now · until ${fmt(h[1])}` : (h && mins < toM(h[0]) ? `Opens today at ${fmt(h[0])}` : "Closed now");
})();

/* ---------- Reveal on scroll ---------- */
(function reveal() {
  const els = $$(".section__head, .promise__grid > div, .flip, .quiz, .visit__card, .visit__map");
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  els.forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { threshold: .15 });
  els.forEach(el => io.observe(el));
})();

$("#year").textContent = new Date().getFullYear();
