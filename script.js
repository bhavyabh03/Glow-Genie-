/* ============================================
   GlowGenie 🔮 — Quiz Logic
   Pure vanilla JS — no frameworks
   ============================================ */

// ---------- DATA: QUESTIONS ----------
// Each option maps to one or more "problem" tags that we tally up.
const QUIZZES = {
  hair: [
    {
      q: "What is your hair type?",
      options: [
        { label: "Straight", tags: [] },
        { label: "Wavy", tags: ["frizz"] },
        { label: "Curly", tags: ["frizz", "dry_hair"] },
        { label: "Coily", tags: ["dry_hair", "frizz"] },
      ],
    },
    {
      q: "What is your biggest hair concern?",
      options: [
        { label: "Hair fall", tags: ["hair_fall", "weak_roots"] },
        { label: "Dandruff", tags: ["dandruff"] },
        { label: "Frizz", tags: ["frizz"] },
        { label: "Dryness", tags: ["dry_hair"] },
      ],
    },
    {
      q: "How often do you oil your hair?",
      options: [
        { label: "Daily", tags: [] },
        { label: "Weekly", tags: [] },
        { label: "Rarely", tags: ["dry_hair"] },
        { label: "Never", tags: ["dry_hair", "weak_roots"] },
      ],
    },
    {
      q: "Your scalp type?",
      options: [
        { label: "Oily", tags: ["dandruff"] },
        { label: "Dry", tags: ["dry_scalp", "dandruff"] },
        { label: "Normal", tags: [] },
        { label: "Sensitive", tags: ["dry_scalp"] },
      ],
    },
    {
      q: "Hair thickness?",
      options: [
        { label: "Thin", tags: ["weak_roots", "hair_fall"] },
        { label: "Medium", tags: [] },
        { label: "Thick", tags: [] },
        { label: "Very thick", tags: ["frizz"] },
      ],
    },
    {
      q: "Heat styling frequency?",
      options: [
        { label: "Daily", tags: ["dry_hair", "frizz"] },
        { label: "Weekly", tags: ["dry_hair"] },
        { label: "Occasionally", tags: [] },
        { label: "Never", tags: [] },
      ],
    },
    {
      q: "Hair damage level?",
      options: [
        { label: "Low", tags: [] },
        { label: "Medium", tags: ["dry_hair"] },
        { label: "High", tags: ["dry_hair", "frizz"] },
        { label: "Severe", tags: ["dry_hair", "frizz", "weak_roots"] },
      ],
    },
    {
      q: "Hair growth speed?",
      options: [
        { label: "Fast", tags: [] },
        { label: "Normal", tags: [] },
        { label: "Slow", tags: ["weak_roots"] },
        { label: "Very slow", tags: ["weak_roots", "hair_fall"] },
      ],
    },
    {
      q: "Dandruff presence?",
      options: [
        { label: "None", tags: [] },
        { label: "Mild", tags: ["dandruff"] },
        { label: "Moderate", tags: ["dandruff", "dry_scalp"] },
        { label: "Severe", tags: ["dandruff", "dry_scalp"] },
      ],
    },
    {
      q: "Desired hair goal?",
      options: [
        { label: "Growth", tags: ["weak_roots"] },
        { label: "Shine", tags: ["dry_hair"] },
        { label: "Smoothness", tags: ["frizz"] },
        { label: "Volume", tags: ["weak_roots"] },
      ],
    },
  ],

  skin: [
    {
      q: "Skin type?",
      options: [
        { label: "Oily", tags: ["acne"] },
        { label: "Dry", tags: ["dry_skin"] },
        { label: "Combination", tags: ["acne", "dry_skin"] },
        { label: "Sensitive", tags: ["sensitivity"] },
      ],
    },
    {
      q: "Main skin concern?",
      options: [
        { label: "Acne", tags: ["acne"] },
        { label: "Pigmentation", tags: ["pigmentation"] },
        { label: "Dryness", tags: ["dry_skin"] },
        { label: "Dullness", tags: ["dull_skin"] },
      ],
    },
    {
      q: "Acne frequency?",
      options: [
        { label: "Never", tags: [] },
        { label: "Sometimes", tags: ["acne"] },
        { label: "Often", tags: ["acne"] },
        { label: "Severe", tags: ["acne", "sensitivity"] },
      ],
    },
    {
      q: "Sun exposure?",
      options: [
        { label: "Low", tags: [] },
        { label: "Medium", tags: ["dull_skin"] },
        { label: "High", tags: ["pigmentation", "dull_skin"] },
        { label: "Very high", tags: ["pigmentation", "dull_skin"] },
      ],
    },
    {
      q: "Skin sensitivity?",
      options: [
        { label: "Low", tags: [] },
        { label: "Medium", tags: ["sensitivity"] },
        { label: "High", tags: ["sensitivity"] },
        { label: "Very high", tags: ["sensitivity", "dry_skin"] },
      ],
    },
    {
      q: "Hydration level?",
      options: [
        { label: "Good", tags: [] },
        { label: "Moderate", tags: ["dry_skin"] },
        { label: "Low", tags: ["dry_skin", "dull_skin"] },
        { label: "Very low", tags: ["dry_skin", "dull_skin"] },
      ],
    },
    {
      q: "Dark spots?",
      options: [
        { label: "None", tags: [] },
        { label: "Mild", tags: ["pigmentation"] },
        { label: "Moderate", tags: ["pigmentation"] },
        { label: "Severe", tags: ["pigmentation", "dull_skin"] },
      ],
    },
    {
      q: "Skin texture?",
      options: [
        { label: "Smooth", tags: [] },
        { label: "Rough", tags: ["dry_skin", "dull_skin"] },
        { label: "Uneven", tags: ["pigmentation"] },
        { label: "Bumpy", tags: ["acne"] },
      ],
    },
    {
      q: "Breakout triggers?",
      options: [
        { label: "Stress", tags: ["acne"] },
        { label: "Diet", tags: ["acne", "dull_skin"] },
        { label: "Hormones", tags: ["acne"] },
        { label: "Unknown", tags: ["acne"] },
      ],
    },
    {
      q: "Skin goal?",
      options: [
        { label: "Glow", tags: ["dull_skin"] },
        { label: "Clear skin", tags: ["acne"] },
        { label: "Hydration", tags: ["dry_skin"] },
        { label: "Brightening", tags: ["pigmentation", "dull_skin"] },
      ],
    },
  ],
};

// ---------- PROBLEM → INGREDIENTS / BENEFITS ----------
const PROBLEM_INFO = {
  // Hair
  hair_fall: {
    name: "Hair Fall",
    ingredients: ["Onion Extract 🧅", "Biotin 💊", "Rosemary Oil 🌿"],
    benefits: ["Strengthens roots", "Promotes growth", "Reduces hair fall"],
  },
  dandruff: {
    name: "Dandruff",
    ingredients: ["Tea Tree Oil 🌱", "Neem 🍃", "Salicylic Acid 🧪"],
    benefits: ["Fights dandruff", "Cleans scalp", "Reduces flakes"],
  },
  dry_hair: {
    name: "Dry Hair",
    ingredients: ["Argan Oil 🧴", "Coconut Oil 🥥", "Shea Butter 🧈"],
    benefits: ["Deep hydration", "Smooth hair", "Adds shine"],
  },
  dry_scalp: {
    name: "Dry Scalp",
    ingredients: ["Jojoba Oil 💧", "Aloe Vera 🌵", "Honey 🍯"],
    benefits: ["Soothes scalp", "Restores moisture", "Calms irritation"],
  },
  frizz: {
    name: "Frizz",
    ingredients: ["Argan Oil 🧴", "Keratin 🔮", "Avocado Oil 🥑"],
    benefits: ["Smooths strands", "Tames frizz", "Adds softness"],
  },
  weak_roots: {
    name: "Weak Roots",
    ingredients: ["Biotin 💊", "Caffeine ☕", "Castor Oil 🧴"],
    benefits: ["Strengthens follicles", "Boosts thickness", "Encourages growth"],
  },
  // Skin
  acne: {
    name: "Acne",
    ingredients: ["Salicylic Acid 🧪", "Niacinamide 🔮", "Tea Tree 🌱"],
    benefits: ["Reduces acne", "Controls oil", "Soothes skin"],
  },
  pigmentation: {
    name: "Pigmentation",
    ingredients: ["Vitamin C 🍊", "Alpha Arbutin 🌸", "Kojic Acid 🌼"],
    benefits: ["Brightens skin", "Reduces dark spots", "Evens skin tone"],
  },
  dry_skin: {
    name: "Dry Skin",
    ingredients: ["Hyaluronic Acid 💧", "Glycerin 🔮", "Ceramides 🧴"],
    benefits: ["Locks moisture", "Repairs barrier", "Plumps skin"],
  },
  sensitivity: {
    name: "Sensitivity",
    ingredients: ["Centella Asiatica 🌿", "Oat Extract 🌾", "Allantoin 🤍"],
    benefits: ["Calms redness", "Soothes irritation", "Strengthens barrier"],
  },
  dull_skin: {
    name: "Dull Skin",
    ingredients: ["Vitamin C 🍊", "Lactic Acid 🥛", "Licorice Root 🌼"],
    benefits: ["Boosts radiance", "Reveals glow", "Smooths texture"],
  },
};

// ---------- STATE ----------
let lastProblems = [];
let state = {
  category: null,    // 'hair' | 'skin'
  index: 0,
  answers: [],       // array of selected option indexes (or null)
};

// ---------- ELEMENTS ----------
const screens = {
  home: document.getElementById("home"),
  quiz: document.getElementById("quiz"),
  results: document.getElementById("results"),
};
const quizBadge = document.getElementById("quizBadge");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// ---------- NAVIGATION ----------
function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- HOMEPAGE BUTTONS ----------
document.querySelectorAll(".choice-btn").forEach((btn) => {
  btn.addEventListener("click", () => startQuiz(btn.dataset.category));
});
document.getElementById("backHomeBtn").addEventListener("click", () => showScreen("home"));
document.getElementById("homeBtn").addEventListener("click", () => showScreen("home"));
document.getElementById("restartBtn").addEventListener("click", () => startQuiz(state.category));

// ---------- QUIZ FLOW ----------
function startQuiz(category) {
  state = {
    category,
    index: 0,
    answers: new Array(QUIZZES[category].length).fill(null),
  };
  quizBadge.textContent = category === "hair" ? "💇‍♀️ Hair Ritual" : "🧴 Skin Ritual";
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const quiz = QUIZZES[state.category];
  const q = quiz[state.index];
  const total = quiz.length;

  // Progress
  progressFill.style.width = `${((state.index + 1) / total) * 100}%`;
  progressText.textContent = `Question ${state.index + 1} of ${total}`;

  // Question text
  questionText.textContent = q.q;

  // Options
  optionsList.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option" + (state.answers[state.index] === i ? " selected" : "");
    btn.innerHTML = `<span class="dot"></span><span>${opt.label}</span>`;
    btn.addEventListener("click", () => {
      state.answers[state.index] = i;
      renderQuestion();
    });
    optionsList.appendChild(btn);
  });

  // Nav buttons
  prevBtn.disabled = state.index === 0;
  nextBtn.disabled = state.answers[state.index] === null;
  nextBtn.textContent = state.index === total - 1 ? "See Results 🔮" : "Next →";
}

prevBtn.addEventListener("click", () => {
  if (state.index > 0) { state.index--; renderQuestion(); }
});
nextBtn.addEventListener("click", () => {
  const total = QUIZZES[state.category].length;
  if (state.index < total - 1) { state.index++; renderQuestion(); }
  else { computeResults(); }
});

// ---------- SCORING ----------
function computeResults() {
  const quiz = QUIZZES[state.category];
  const tally = {};

  state.answers.forEach((answerIdx, qIdx) => {
    if (answerIdx === null) return;
    const tags = quiz[qIdx].options[answerIdx].tags || [];
    tags.forEach((t) => { tally[t] = (tally[t] || 0) + 1; });
  });

  // Sort problems by score descending; pick top 3 (or 1 fallback)
  let topProblems = Object.entries(tally)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k)
    .slice(0, 3);

  // Fallback if user picked all-clear answers
  if (topProblems.length === 0) {
    topProblems = state.category === "hair" ? ["dry_hair"] : ["dull_skin"];
  }
lastProblems = topProblems;
  renderResults(topProblems);
}
// Product recommendations database

const PRODUCT_INFO = {

  acne: [
    { name: "Minimalist Salicylic Acid Cleanser", link: "https://beminimalist.co/products/salicylic-acid-cleanser" },
    { name: "The Ordinary Niacinamide Serum", link: "https://theordinary.com/en-in/niacinamide-10-zinc-1-serum" },
    { name: "Cetaphil Gentle Cleanser", link: "https://www.cetaphil.co.in/gentle-skin-cleanser" },
    { name: "Dot & Key Cica Gel", link: "https://www.dotandkey.com/products/cica-calming-skin-renewal-gel" },
    { name: "Neutrogena Oil-Free Moisturizer", link: "https://www.neutrogena.in/products/oil-free-moisture" },
    { name: "Plum Green Tea Toner", link: "https://plumgoodness.com/products/green-tea-alcohol-free-toner" }
  ],

  pigmentation: [
    { name: "Minimalist Vitamin C Serum", link: "https://beminimalist.co/products/vitamin-c-serum" },
    { name: "Dot & Key Vitamin C Cream", link: "https://www.dotandkey.com/products/vitamin-c-moisturizer" },
    { name: "Plum Vitamin C Serum", link: "https://plumgoodness.com/products/vitamin-c-face-serum" },
    { name: "The Ordinary Alpha Arbutin", link: "https://theordinary.com/en-in/alpha-arbutin-2-ha-serum" },
    { name: "Mamaearth Vitamin C Face Wash", link: "https://mamaearth.in/product/vitamin-c-face-wash" },
    { name: "Neutrogena Bright Boost Cream", link: "https://www.neutrogena.in/products/bright-boost-gel-cream" }
  ],

  dry_skin: [
    { name: "Neutrogena Hydro Boost", link: "https://www.neutrogena.in/products/hydro-boost-water-gel" },
    { name: "Cetaphil Moisturizing Cream", link: "https://www.cetaphil.co.in/moisturizing-cream" },
    { name: "Minimalist Hyaluronic Acid Serum", link: "https://beminimalist.co/products/hyaluronic-acid-serum" },
    { name: "Dot & Key Barrier Cream", link: "https://www.dotandkey.com/products/ceramide-barrier-repair-cream" },
    { name: "Plum E-Luminence Cream", link: "https://plumgoodness.com/products/e-luminence-moisturizing-cream" },
    { name: "The Ordinary Moisturizing Factors", link: "https://theordinary.com/en-in/natural-moisturizing-factors-ha" }
  ],

  hair_fall: [
    { name: "Mamaearth Onion Oil", link: "https://mamaearth.in/product/onion-hair-oil" },
    { name: "WOW Onion Shampoo", link: "https://www.buywow.in/products/onion-black-seed-oil-shampoo" },
    { name: "Indulekha Bringha Oil", link: "https://www.indulekha.com/products/bringha-oil" },
    { name: "Khadi Amla Shampoo", link: "https://khadinatural.com/products/amla-hair-cleanser" },
    { name: "Biotique Bhringraj Oil", link: "https://www.biotique.com/products/bhringraj-hair-oil" },
    { name: "Minimalist Hair Growth Serum", link: "https://beminimalist.co/products/hair-growth-actives-18" }
  ],

  dandruff: [
    { name: "Head & Shoulders Anti-Dandruff", link: "https://www.headandshoulders.co.in/en-in/shop-products" },
    { name: "Mamaearth Tea Tree Shampoo", link: "https://mamaearth.in/product/tea-tree-anti-dandruff-shampoo" },
    { name: "WOW Neem Shampoo", link: "https://www.buywow.in/products/neem-tea-tree-shampoo" },
    { name: "Biotique Neem Shampoo", link: "https://www.biotique.com/products/margosa-anti-dandruff-shampoo" },
    { name: "Khadi Neem Oil", link: "https://khadinatural.com/products/neem-oil" },
    { name: "Scalpe Pro Shampoo", link: "https://www.scalpepro.in/" }
  ],

  frizz: [
    { name: "Livon Hair Serum", link: "https://www.livonhair.com/products/livon-serum" },
    { name: "Streax Professional Serum", link: "https://streaxprofessional.com/products/hair-serum" },
    { name: "L'Oreal Smooth Intense Shampoo", link: "https://www.lorealparis.co.in/smooth-intense-shampoo" },
    { name: "Tresemme Keratin Smooth Conditioner", link: "https://www.tresemme.in/products/keratin-smooth-conditioner" },
    { name: "Matrix Smoothproof Serum", link: "https://www.matrixprofessional.in/products/smoothproof-serum" }
  ],

  dry_hair: [
    { name: "Mamaearth Argan Shampoo", link: "https://mamaearth.in/product/argan-shampoo" },
    { name: "WOW Coconut Milk Shampoo", link: "https://www.buywow.in/products/coconut-milk-shampoo" },
    { name: "L'Oreal Total Repair Mask", link: "https://www.lorealparis.co.in/total-repair-5-mask" },
    { name: "Tresemme Moisture Conditioner", link: "https://www.tresemme.in/products/moisture-conditioner" },
    { name: "Khadi Herbal Conditioner", link: "https://khadinatural.com/products/herbal-hair-conditioner" }
  ],

  weak_roots: [
    { name: "Mamaearth Onion Oil", link: "https://mamaearth.in/product/onion-hair-oil" },
    { name: "WOW Castor Oil", link: "https://www.buywow.in/products/castor-oil" },
    { name: "Indulekha Bringha Oil", link: "https://www.indulekha.com/products/bringha-oil" },
    { name: "Khadi Amla Oil", link: "https://khadinatural.com/products/amla-oil" },
    { name: "Minimalist Hair Growth Serum", link: "https://beminimalist.co/products/hair-growth-actives-18" }
  ],

  dry_scalp: [
    { name: "WOW Aloe Vera Shampoo", link: "https://www.buywow.in/products/aloe-vera-shampoo" },
    { name: "Khadi Neem Shampoo", link: "https://khadinatural.com/products/neem-hair-cleanser" },
    { name: "Biotique Bio Neem Shampoo", link: "https://www.biotique.com/products/bio-neem-shampoo" },
    { name: "Mamaearth Aloe Conditioner", link: "https://mamaearth.in/product/aloe-vera-conditioner" }
  ]

};
function renderResults(problemKeys) {
  const problemsList = document.getElementById("problemsList");
  const ingredientsList = document.getElementById("ingredientsList");
  const benefitsList = document.getElementById("benefitsList");
  const resultsSub = document.getElementById("resultsSub");
const productsList = document.getElementById("productsList");
  resultsSub.textContent =
    state.category === "hair"
      ? "Your personalized hair ritual "
      : "Your personalized skin ritual ";

  problemsList.innerHTML = "";
  ingredientsList.innerHTML = "";
  benefitsList.innerHTML = "";
  productsList.innerHTML = "";
  const seenIngredients = new Set();
  const seenBenefits = new Set();

  problemKeys.forEach((key, idx) => {
    const info = PROBLEM_INFO[key];
    if (!info) return;
    // Problem chip
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.style.animationDelay = `${idx * 0.08}s`;
    chip.textContent = info.name;
    problemsList.appendChild(chip);

    // Ingredients
    info.ingredients.forEach((ing, i) => {
      if (seenIngredients.has(ing)) return;
      seenIngredients.add(ing);
      const card = document.createElement("div");
      card.className = "ingredient-card";
      card.style.animationDelay = `${(idx * 3 + i) * 0.06}s`;
      const [name, icon] = splitIcon(ing);
      card.innerHTML = `
  <div class="ingredient-icon">${icon || "🌿"}</div>
  <div>
    <div class="ingredient-name">${name}</div>
    <div class="ingredient-for">For ${info.name}</div>
  </div>
`;
      ingredientsList.appendChild(card);
    });

    // Benefits
    info.benefits.forEach((b, i) => {
      if (seenBenefits.has(b)) return;
      seenBenefits.add(b);
      const li = document.createElement("li");
      li.textContent = b;
      li.style.animationDelay = `${(idx * 3 + i) * 0.05}s`;
      benefitsList.appendChild(li);
    });
    // -------- PRODUCTS (OUTSIDE LOOP) --------


  });
  const shownProducts = new Set();

problemKeys.forEach((key) => {

  const products = PRODUCT_INFO[key];

  if (!products) return;

  products.forEach((product) => {

    if (shownProducts.has(product.name)) return;
shownProducts.add(product.name);

    const li = document.createElement("li");

    li.className = "product-card";

    const link = document.createElement("a");
link.href = "https://www.google.com/search?q=" + encodeURIComponent(product.name);
link.textContent = product.name;
link.target = "_blank";

link.style.textDecoration = "none";
link.style.color = "inherit";

li.appendChild(link);

    productsList.appendChild(li);

  });

});
  displayRoutine(problemKeys);
  showScreen("results");
  setTimeout(startButtonSequence, 800);
  setTimeout(randomFillTitle, 500);
}
// Split "Onion Extract 🧅" into ["Onion Extract", "🧅"]
function splitIcon(str) {
  const parts = str.trim().split(" ");
  const last = parts[parts.length - 1];
  // crude emoji check
  if (/\p{Extended_Pictographic}/u.test(last)) {
    return [parts.slice(0, -1).join(" "), last];
  }
  return [str, ""];
}
function generateRoutine(problemKeys) {
  let morning = [];
  let night = [];

  problemKeys.forEach((key) => {
    const products = PRODUCT_INFO[key];
    if (!products || products.length === 0) return;

    const p1 = products[0];
    const p2 = products[1] || p1;
    const p3 = products[2] || p2;
    const p4 = products[3] || p3;

    // 🌞 MORNING
    morning.push({
      name: p1.name,
      link: p1.link,
      how: "Start your routine with this."
    });

    morning.push({
      name: p2.name,
      link: p2.link,
      how: "Apply after cleansing."
    });

    // 🌙 NIGHT
    night.push({
      name: p3.name,
      link: p3.link,
      how: "Apply during night care."
    });

    night.push({
      name: p4.name,
      link: p4.link,
      how: "Use before sleeping."
    });
  });

  // fallback
  if (morning.length === 0) {
    morning.push({
      name: "Gentle Cleanser",
      link: "#",
      how: "Start your morning routine."
    });
  }

  if (night.length === 0) {
    night.push({
      name: "Moisturizer",
      link: "#",
      how: "Apply before sleeping."
    });
  }

  return { morning, night };
}
// RANDOM FLOATING BUBBLES

function createRandomBubbles() {

  const container =
    document.getElementById("bubbleContainer");

  const bubbleCount = 14; // how many at once

  for (let i = 0; i < bubbleCount; i++) {

    const bubble =
      document.createElement("div");

    bubble.classList.add("bubble");

    // RANDOM SIZE (big bubbles)
    const size =
      Math.random() * 70 + 40;

    bubble.style.width =
      size + "px";

    bubble.style.height =
      size + "px";

    // RANDOM POSITION
    bubble.style.left =
      Math.random() * 95 + "%";

    // RANDOM SPEED
    bubble.style.animationDuration =
      Math.random() * 10 + 12 + "s";

    // RANDOM DELAY
    bubble.style.animationDelay =
      Math.random() * 10 + "s";

      bubble.style.opacity =
  Math.random() * 0.4 + 0.6;

    container.appendChild(bubble);

  }

}
window.addEventListener("load",
createRandomBubbles);
// ROTATING SUBTITLE TEXT

const messages = [

  "Take a short quiz and unlock personalized ingredients ✨",

  "Discover what your skin truly needs 💜",

  "Build your perfect hair & skin routine 🌸",

  "Your glow journey starts here ✨"

];

let index = 0;

const textElement =
  document.getElementById("changingText");

setInterval(() => {

  textElement.style.opacity = 0;

  setTimeout(() => {

    index =
      (index + 1) % messages.length;

    textElement.textContent =
      messages[index];

    textElement.style.opacity = 1;

  }, 300);

}, 3000);


function displayRoutine(problemKeys) {

  const routine = generateRoutine(problemKeys);

  const morningList =
    document.getElementById("morningRoutine");

  const nightList =
    document.getElementById("nightRoutine");

  morningList.innerHTML = "";
  nightList.innerHTML = "";

  // MORNING

  routine.morning.forEach(step => {

    const li = document.createElement("li");

    li.innerHTML = `
  <b>${typeof step.name === "object" ? step.name.name : step.name}</b><br>
  <small>${step.how}</small>`;

    morningList.appendChild(li);

  });

  // NIGHT

  routine.night.forEach(step => {

    const li = document.createElement("li");

    li.innerHTML =
      `<b>${step.name}</b><br>
       <small>${step.how}</small>`;

    nightList.appendChild(li);

  });

}
// Show Benefits
document
.getElementById("showBenefitsBtn")
.addEventListener("click", () => {

document
.getElementById("benefitsSection")
.style.display = "block";

});

// Show Products
document
.getElementById("showProductsBtn")
.addEventListener("click", () => {

document
.getElementById("productsSection")
.style.display = "block";

});

// Show Morning Routine
document
.getElementById("showMorningBtn")
.addEventListener("click", () => {

document
.getElementById("morningSection")
.style.display = "block";

displayRoutine(lastProblems);

});

// Show Night Routine
document
.getElementById("showNightBtn")
.addEventListener("click", () => {

document
.getElementById("nightSection")
.style.display = "block";

displayRoutine(lastProblems);

});
/* ✨ Bigger Multi Sparkle Trail */

document.addEventListener("mousemove", (e) => {

  for (let i = 0; i < 2; i++) {

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left =
      e.clientX + (Math.random() * 10 - 5) + "px";

    sparkle.style.top =
      e.clientY + (Math.random() * 10 - 5) + "px";

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1000);

  }

});
/* ✨ Correct Letters Appear at Random Positions */

function randomFillTitle() {

  const element =
    document.getElementById("glowTitle");

  if (!element) return;

  const finalText =
    "Your Glow Report";

  function runAnimation() {

    // Start fully blank
    let current =
      Array(finalText.length).fill(" ");

    // Store all positions
    let remainingIndexes =
      finalText
        .split("")
        .map((_, i) => i);

    function revealNext() {

      if (remainingIndexes.length === 0) {

        element.textContent =
          finalText;

        // Wait then restart
        setTimeout(() => {

          runAnimation();

        }, 3000);

        return;
      }

      // Pick random index
      const randomIndex =
        Math.floor(
          Math.random() *
          remainingIndexes.length
        );

      const position =
        remainingIndexes[randomIndex];

      // Put correct letter
      current[position] =
        finalText[position];

      // Remove used index
      remainingIndexes.splice(
        randomIndex,
        1
      );

      element.textContent =
        current.join("");

      // Random timing
      const delay =
        Math.random() * 200 + 120;

      setTimeout(
        revealNext,
        delay
      );

    }

    revealNext();

  }

  runAnimation();

}
/* ✨ Sequential Button Animation */

function startButtonSequence() {

  const buttons = [

    document.getElementById("showBenefitsBtn"),
    document.getElementById("showProductsBtn"),
    document.getElementById("showMorningBtn"),
    document.getElementById("showNightBtn")

  ];

  let index = 0;

  function animateNext() {

    const btn = buttons[index];

    if (!btn) return;

    btn.classList.add("button-active");

    setTimeout(() => {

      btn.classList.remove("button-active");

      index++;

      if (index >= buttons.length) {
        index = 0;
      }

      animateNext();

    }, 1800);

  }

  animateNext();

}

const text = "Curious? Tap a product to learn more ⋆.˚"; 

let i = 0;
let forward = true;

function typeLoop() {
  const el = document.getElementById("typingNote");
  if (!el) return;

  if (forward) {
    i++;
    el.textContent = text.slice(0, i);

    if (i === text.length) {
      forward = false;
      setTimeout(typeLoop, 2000); // ⏸ pause at full text
      return;
    }
  } else {
    i--;
    el.textContent = text.slice(0, i);

    if (i === 0){
      forward = true;
      setTimeout(typeLoop, 500); // small pause before typing again
      return;
    }
  }

  setTimeout(typeLoop, forward ? 60 : 40);
}

window.onload = typeLoop;