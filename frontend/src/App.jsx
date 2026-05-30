import { useState, useEffect } from "react";
import "./style.css";
import { supabase } from "./supabase";

/* -------------------- QUESTIONS -------------------- */
const hairQuestions = [
  {
    question: "What is your hair type?",
    options: ["Straight", "Wavy", "Curly", "Coily"],
  },
  {
    question: "What is your main hair concern?",
    options: ["Hair fall", "Dryness", "Frizz", "Dandruff"],
  },
  {
    question: "How would you describe your scalp?",
    options: ["Oily", "Dry", "Normal", "Sensitive"],
  },
  {
    question: "How often do you wash your hair?",
    options: ["Daily", "2–3 times a week", "Once a week", "Rarely"],
  },
  {
    question: "How thick is your hair?",
    options: ["Very thin", "Thin", "Medium", "Thick"],
  },
  {
    question: "Do you use heat styling tools?",
    options: ["Very often", "Sometimes", "Rarely", "Never"],
  },
  {
    question: "Have you chemically treated your hair?",
    options: ["Yes, frequently", "Occasionally", "Once or twice", "Never"],
  },
  {
    question: "How does your hair feel after washing?",
    options: ["Very dry", "Slightly dry", "Soft", "Oily quickly"],
  },
  {
    question: "Do you experience split ends?",
    options: ["Very often", "Sometimes", "Rarely", "Never"],
  },
  {
    question: "How would you describe your hair shine?",
    options: ["Very dull", "Slightly dull", "Shiny", "Very glossy"],
  },
];
const skinQuestions = [
  {
    question: "What is your skin type?",
    options: ["Dry", "Oily", "Combination", "Sensitive"],
  },
  {
    question: "What is your primary skin concern?",
    options: ["Acne", "Pigmentation", "Dullness", "Dryness"],
  },
  {
    question: "How often do you get breakouts?",
    options: ["Very often", "Sometimes", "Rarely", "Never"],
  },
  {
    question: "How does your skin feel after cleansing?",
    options: ["Tight & dry", "Balanced", "Oily", "Irritated"],
  },
  {
    question: "How visible are your pores?",
    options: ["Very large", "Moderate", "Small", "Barely visible"],
  },
  {
    question: "How often are you exposed to the sun?",
    options: ["Daily for long hours", "Moderately", "Occasionally", "Rarely"],
  },
  {
    question: "Do you experience uneven skin tone?",
    options: ["Severe", "Moderate", "Mild", "Not at all"],
  },
  {
    question: "How hydrated does your skin feel?",
    options: ["Very dry", "Slightly dry", "Well hydrated", "Oily but dehydrated"],
  },
  {
    question: "How sensitive is your skin?",
    options: ["Very sensitive", "Somewhat sensitive", "Normal", "Not sensitive"],
  },
  {
    question: "How would you describe your skin glow?",
    options: ["Dull", "Average", "Healthy glow", "Radiant"],
  },
];


const ingredientInfo = {

  "Tea Tree Oil 🌱":
    "Purifies the scalp, fights dandruff, and calms irritation for a fresher and healthier scalp experience.",

  "Salicylic Acid 💧":
    "Deeply exfoliates pores, controls excess oil, and helps prevent acne and breakouts.",

  "Keratin 💪":
    "Rebuilds weak hair strands, smooths frizz, and restores strength and shine to damaged hair.",

  "Biotin 🌸":
    "Supports stronger, thicker-looking hair and encourages healthier hair growth over time.",

  "Argan Oil 🧴":
    "Infuses dry hair with softness, shine, and silky smooth hydration without feeling greasy.",

  "Shea Butter 🧈":
    "Deeply nourishes and moisturizes dry hair and skin while helping reduce roughness and damage.",

  "Coconut Oil 🥥":
    "Penetrates deeply to reduce breakage, strengthen strands, and lock in lasting moisture.",

  "Castor Oil 🛢️":
    "Boosts the appearance of fuller, healthier hair while helping nourish roots and scalp.",

  "Vitamin C 🍊":
    "Brightens dull skin, fades pigmentation, and enhances your natural glow and radiance.",

  "Niacinamide 🧪":
    "Balances oil production, smooths uneven texture, and helps refine pores for clearer skin.",

  "Ceramides 🧴":
    "Strengthens the skin barrier and seals in hydration to keep skin soft, calm, and protected.",

  "Hyaluronic Acid 💦":
    "Delivers intense hydration that leaves the skin plump, dewy, and refreshed.",

  "Peptides 🔬":
    "Supports skin repair and improves firmness for a healthier and more youthful appearance.",

  "Zinc ⚡":
    "Zinc keeps your skin calm, clear, and protected by controlling oil, fighting acne-causing bacteria.",

  "Silk Protein 🧵":
    "Silk protein wraps your hair in a smooth protective layer, making it softer, shinier, and less prone to breakage.",

  "Onion Extract 🧅":
    "Onion extract strengthens hair roots, reduces hair fall, and helps boost thicker, healthier hair growth.",

  "Alpha Arbutin 🌟":
    "Alpha Arbutin helps fade dark spots and uneven skin tone, revealing a brighter and more radiant complexion.",

  "Vitamin E 💊":
     "Vitamin E nourishes the scalp, strengthens hair strands, and adds a healthy natural shine."
};


/* -------------------- APP -------------------- */
function App() {
  const [user, setUser] = useState(null);
  const [savedResults, setSavedResults] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [displayText, setDisplayText] = useState("");

  const [screen, setScreen] = useState("home"); // home | quiz | result
  const [mode, setMode] = useState("hair"); // hair | skin
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
const [showProducts, setShowProducts] = useState(false);
const [showBenefits, setShowBenefits] = useState(false);
const [showMorning, setShowMorning] = useState(false);
const [showNight, setShowNight] = useState(false);
const [selectedIngredient, setSelectedIngredient] = useState(null);

const taglines = [
  "Discover personalized routines crafted just for you",
  "Glow smarter with ingredient-based beauty insights",
  "Luxury self-care tailored to your unique needs",
  "Your personalized glow journey starts with here"
];

const [currentTagline, setCurrentTagline] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTagline((prev) => (prev + 1) % taglines.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);
  /* -------- Sparkle Cursor -------- */
  useEffect(() => {
    const sparkle = (e) => {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    };
    window.addEventListener("mousemove", sparkle);
    return () => window.removeEventListener("mousemove", sparkle);
  }, []);

  const fetchSavedResults = async (userId) => {
    const { data, error } = await supabase
      .from("saved_results")
      .select("*")
      .eq("user_id", userId)

      console.log("SAVED DATA:", data);
console.log("SAVED ERROR:", error);

    if (data) setSavedResults(data);
  };

  const fetchFavoriteProducts = async (userId) => {

  const { data, error } = await supabase
    .from("favorite_products")
    .select("*")
    .eq("user_id", userId);

    console.log("FAVORITE DATA:", data);
console.log("FAVORITE ERROR:", error);

  if (data) setFavoriteProducts(data);
};

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("SESSION:", session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) fetchSavedResults(currentUser.id);
      if (currentUser) fetchFavoriteProducts(currentUser.id);
      });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) fetchSavedResults(currentUser.id);
      if (currentUser) fetchFavoriteProducts(currentUser.id);
      else setSavedResults([]);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        prompt: "select_account",
      },
    },
  });
};

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
  };

  /* -------- Questions (dynamic) -------- */
  const questions = mode === "hair" ? hairQuestions : skinQuestions;

  /* -------- Answer handler -------- */
  const handleAnswer = (option) => {
    const updated = [...answers, option];
    setAnswers(updated);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setScreen("result");
    }
  };

  /* -------------------- LOGIC (SAFE PLACE) -------------------- */
  const text = answers.join(" ").toLowerCase();
// BUILD CONCERNS (bulletproof)
let finalConcerns = [];

// Map answers → concerns
answers.forEach((ans) => {
  const a = ans.toLowerCase();

  if (mode === "hair") {
    if (a.includes("dry")) finalConcerns.push("Dry Hair");
    if (a.includes("fall")) finalConcerns.push("Hair Fall");
    if (a.includes("frizz")) finalConcerns.push("Frizz");
    if (a.includes("dandruff")) finalConcerns.push("Dandruff");
    if (a.includes("thin")) finalConcerns.push("Low Volume");
    if (a.includes("dull")) finalConcerns.push("Lack of Shine");
  }

  if (mode === "skin") {
    if (a.includes("acne")) finalConcerns.push("Acne");
    if (a.includes("pigment")) finalConcerns.push("Pigmentation");
    if (a.includes("dull")) finalConcerns.push("Dull Skin");
    if (a.includes("dry")) finalConcerns.push("Dry Skin");
    if (a.includes("oily")) finalConcerns.push("Excess Oil");
    if (a.includes("sensitive")) finalConcerns.push("Sensitivity");
  }
});

// remove duplicates
finalConcerns = [...new Set(finalConcerns)];

// HARD fallback (guaranteed 4+)
const fallbackHair = [
  "Scalp Health",
  "Hair Strength",
  "Hydration",
  "Shine",
  "Volume",
];

const fallbackSkin = [
  "Skin Barrier",
  "Hydration",
  "Glow",
  "Even Tone",
  "Smooth Texture",
];

const fallback = mode === "hair" ? fallbackHair : fallbackSkin;

// ALWAYS push until >= 4
let i = 0;
while (finalConcerns.length < 4) {
  finalConcerns.push(fallback[i]);
  i++;
}
  // Hair flags
  const hasDry = text.includes("dry");
  const hasFall = text.includes("fall");
  const hasFrizz = text.includes("frizz");

  // Skin flags
  const hasAcne = text.includes("acne");
  const hasPigment = text.includes("pigment");
  const hasDull = text.includes("dull");
  const isOily = text.includes("oily");

  /* -------- Ingredients -------- */
  const hairIngredients = [
    hasDry && "Argan Oil 🧴",
    hasFall && "Onion Extract 🧅",
    hasFrizz && "Keratin 💪",
    "Aloe Vera 💧",
    "Biotin 🌸",
  ].filter(Boolean);

  const skinIngredients = [
    hasAcne && "Niacinamide 🧪",
    hasPigment && "Vitamin C 🍊",
    hasDull && "Hyaluronic Acid 💧",
    isOily && "Salicylic Acid 🌿",
    "Aloe Vera 🌱",
  ].filter(Boolean);

  const benefitDB = {
  "L'Oréal Hyaluron Shampoo": ["Deep hydration", "Smooth & soft hair"],
  "Dove Intense Repair Shampoo": ["Damage repair", "Stronger hair"],
  "WOW Argan Oil": ["Shine boost", "Frizz control"],
  "Moroccanoil Treatment": ["Silky texture", "Adds shine"],
  "Livon Serum": ["Frizz control", "Smooth finish"],

  "Mamaearth Onion Oil": ["Reduces hair fall", "Boosts growth"],
  "WOW Onion Shampoo": ["Strengthens roots", "Reduces breakage"],
  "Khadi Amla Shampoo": ["Natural shine", "Scalp nourishment"],
  "Indulekha Hair Oil": ["Hair fall control", "Scalp health"],

  "Streax Hair Serum": ["Smooth hair", "Frizz reduction"],
  "Livon Anti-Frizz Serum": ["Humidity protection", "Sleek finish"],
  "Tresemme Keratin Smooth": ["Keratin smoothness", "Frizz control"],

  "Head & Shoulders Anti-Dandruff": ["Removes dandruff", "Soothes scalp"],
  "Scalpe Pro Shampoo": ["Anti-fungal", "Itch relief"],

  // SKIN
  "Minimalist Salicylic Cleanser": ["Acne control", "Deep pore cleanse"],
  "CeraVe Foaming Cleanser": ["Oil balance", "Gentle cleansing"],
  "Niacinamide Serum (Minimalist)": ["Reduces acne marks", "Controls oil"],
  "The Ordinary Niacinamide": ["Minimizes pores", "Even skin tone"],

  "Vitamin C Serum (Minimalist)": ["Brightening", "Reduces pigmentation"],
  "Alpha Arbutin (The Ordinary)": ["Fades dark spots", "Even tone"],
  "Dot & Key Vitamin C Cream": ["Glow boost", "Hydration"],

  "Cetaphil Moisturizing Cream": ["Deep hydration", "Skin barrier repair"],
  "Neutrogena Hydro Boost": ["Water-based hydration", "Plump skin"],

  "Sebamed Clear Face Gel": ["Oil-free hydration", "Acne safe"],
  "Plum Green Tea Cleanser": ["Controls oil", "Prevents acne"]
};

  /* -------- Products (categorized + links) -------- */
  const hairProducts = [
    {
      category: "Shampoo",
      items: [
        {
          name: "L'Oréal Hyaluron Shampoo",
          link: "https://www.amazon.in/dp/B08J7L8YF3",
        },
        {
          name: "WOW Onion Shampoo",
          link: "https://www.amazon.in/dp/B07V1K6T9Y",
        },
      ],
    },
    {
      category: "Oils / Treatments",
      items: [
        {
          name: "Mamaearth Onion Oil",
          link: "https://www.amazon.in/dp/B07X9ZK1M3",
        },
        {
          name: "WOW Argan Oil",
          link: "https://www.amazon.in/dp/B07V1K6T9Y",
        },
      ],
    },
    {
      category: "Serums",
      items: [
        {
          name: "Streax Hair Serum",
          link: "https://www.amazon.in/dp/B00KX1Z9J0",
        },
      ],
    },
  ];

  const skinProducts = [
    {
      category: "Cleanser",
      items: [
        {
          name: "Cetaphil Gentle Cleanser",
          link: "https://www.amazon.in/dp/B01CCGW4OE",
        },
      ],
    },
    {
      category: "Serums",
      items: [
        {
          name: "Minimalist Niacinamide",
          link: "https://www.amazon.in/dp/B08LZJZ8ZK",
        },
        {
          name: "Minimalist Vitamin C",
          link: "https://www.amazon.in/dp/B08QJ5ZV5N",
        },
      ],
    },
    {
      category: "Moisturizer & SPF",
      items: [
        {
          name: "Neutrogena Hydro Boost",
          link: "https://www.amazon.in/dp/B00NR1YQHM",
        },
        {
          name: "Neutrogena SPF 50",
          link: "https://www.amazon.in/dp/B00Q2MYJ36",
        },
      ],
    },
  ];

 // 🔽 ADD THIS BLOCK HERE

let concerns = [];
let ingredients = [];

if (screen === "result") {
  const text = (answers || []).join(" ").toLowerCase();

  // -------- HAIR --------
  if (mode === "hair") {
    if (text.includes("dry")) ingredients.push("Argan Oil 🧴", "Shea Butter 🧈");
    if (text.includes("frizz")) ingredients.push("Keratin 💪", "Silk Protein 🧵");
    if (text.includes("fall")) ingredients.push("Biotin 🌸", "Onion Extract 🧅");
    if (text.includes("dandruff")) ingredients.push("Tea Tree Oil 🌱", "Salicylic Acid 💧");
  }

  // -------- SKIN --------
  if (mode === "skin") {
    if (text.includes("acne")) ingredients.push("Salicylic Acid 💧", "Niacinamide 🧪");
    if (text.includes("dry")) ingredients.push("Hyaluronic Acid 💦", "Ceramides 🧴");
    if (text.includes("pigment")) ingredients.push("Vitamin C 🍊", "Alpha Arbutin 🌟");
    if (text.includes("oily")) ingredients.push("Niacinamide 🧪", "Zinc ⚡");
  }

  // ✅ REMOVE DUPLICATES
  ingredients = [...new Set(ingredients)];

  // ✅ ENSURE MIN 7
  const defaults =
    mode === "hair"
      ? ["Aloe Vera 🌿", "Biotin 🌸", "Keratin 💪", "Castor Oil 🛢️", "Vitamin E 💊", "Coconut Oil 🥥", "Peptides 🔬"]
      : ["Aloe Vera 🌿", "Niacinamide 🧪", "Hyaluronic Acid 💦", "Vitamin C 🍊", "Ceramides 🧴", "Peptides 🔬", "Green Tea 🍃"];

  while (ingredients.length < 7) {
    const next = defaults[ingredients.length];
    if (!ingredients.includes(next)) {
      ingredients.push(next);
    }
  }
}

if (screen === "result") {
  const text = (answers || []).join(" ").toLowerCase();

  if (text.includes("dry")) concerns.push("Dry Hair");
  if (text.includes("frizz")) concerns.push("Frizzy Hair");
  if (text.includes("fall")) concerns.push("Hair Fall");
  if (text.includes("dandruff")) concerns.push("Dandruff");

  const defaults = ["Hair Health", "Shine", "Strength", "Scalp Care"];

  while (concerns.length < 4) {
    concerns.push(defaults[concerns.length]);
  }
}

// 🔽 THIS LINE ALREADY EXISTS
const products = mode === "hair" ? hairProducts : skinProducts;   

useEffect(() => {
  if (screen !== "result") return;

  const finalText = "Your Glow Report";
  const length = finalText.length;

  let visible = new Array(length).fill(false);
  let phase = "reveal";

  const getOrder = () => {
    return [...Array(length).keys()]
      .filter(i => finalText[i] !== " ")
      .sort(() => Math.random() - 0.5);
  };

  let order = getOrder();
  let index = 0;

  let lastTime = 0;
  let delay = 180; // 🐢 slower & smoother

  const animate = (time) => {
    if (time - lastTime > delay) {
      lastTime = time;

      // 🌸 REVEAL
      if (phase === "reveal") {
        visible[order[index]] = true;
        index++;

        setDisplayText(
          finalText
            .split("")
            .map((c, i) => (visible[i] ? c : "\u00A0"))
            .join("")
        );

        if (index >= order.length) {
          phase = "hold";
          setTimeout(() => {
            phase = "hide";
            order = getOrder();
            index = 0;
          }, 2500); // longer hold 
        }
      }

      // 🌙 HIDE
      else if (phase === "hide") {
        visible[order[index]] = false;
        index++;

        setDisplayText(
          finalText
            .split("")
            .map((c, i) => (c === " " ? " " : visible[i] ? c : " "))
            .join("")
        );

        if (index >= order.length) {
          phase = "reveal";
          order = getOrder();
          index = 0;
        }
      }
    }

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

}, [screen]);
  /* -------------------- UI -------------------- */
  const productDB = {
  hair: {
    "Dry Hair": [
      { name: "L'Oréal Hyaluron Shampoo", category: "Shampoo" },
      { name: "Dove Intense Repair Shampoo", category: "Shampoo" },
      { name: "WOW Argan Oil", category: "Oils" },
      { name: "Moroccanoil Treatment", category: "Oils" },
      { name: "Livon Serum", category: "Serums" }
    ],

    "Hair Fall": [
      { name: "Mamaearth Onion Oil", category: "Oils" },
      { name: "WOW Onion Shampoo", category: "Shampoo" },
      { name: "Khadi Amla Shampoo", category: "Shampoo" },
      { name: "Indulekha Hair Oil", category: "Oils" }
    ],

    "Frizz": [
      { name: "Streax Hair Serum", category: "Serums" },
      { name: "Livon Anti-Frizz Serum", category: "Serums" },
      { name: "Tresemme Keratin Smooth", category: "Shampoo" }
    ],

    "Dandruff": [
      { name: "Head & Shoulders Anti-Dandruff", category: "Shampoo" },
      { name: "Scalpe Pro Shampoo", category: "Shampoo" }
    ]
  },

  skin: {
    "Acne": [
      { name: "Minimalist Salicylic Cleanser", category: "Cleanser" },
      { name: "CeraVe Foaming Cleanser", category: "Cleanser" },
      { name: "Niacinamide Serum (Minimalist)", category: "Serums" },
      { name: "The Ordinary Niacinamide", category: "Serums" }
    ],

    "Pigmentation": [
      { name: "Vitamin C Serum (Minimalist)", category: "Serums" },
      { name: "Alpha Arbutin (The Ordinary)", category: "Serums" },
      { name: "Dot & Key Vitamin C Cream", category: "Moisturizer" }
    ],

    "Dry Skin": [
      { name: "Cetaphil Moisturizing Cream", category: "Moisturizer" },
      { name: "Neutrogena Hydro Boost", category: "Moisturizer" }
    ],

    "Excess Oil": [
      { name: "Sebamed Clear Face Gel", category: "Moisturizer" },
      { name: "Plum Green Tea Cleanser", category: "Cleanser" }
    ]
  }
};
// ===== BUILD GROUPED PRODUCTS (FINAL CLEAN VERSION) =====
const groupedProducts = {};

finalConcerns.forEach((concern) => {
  const items = productDB[mode]?.[concern] || [];

  items.forEach((p) => {
    if (!groupedProducts[p.category]) {
      groupedProducts[p.category] = [];
    }

    if (!groupedProducts[p.category].some(x => x.name === p.name)) {
      groupedProducts[p.category].push(p);
    }
  });
});

// ===== BUILD PRODUCTS =====

const getAmazonLink = (name) => {
  return `https://www.amazon.in/s?k=${encodeURIComponent(name)}`;
};
const benefits = [];

if (mode === "skin") {
  if (finalConcerns.includes("Acne")) {
    benefits.push("Reduced acne & breakouts 🌿");
  }
  if (finalConcerns.includes("Pigmentation")) {
    benefits.push("Brighter, even skin tone 🌷");
  }
  if (finalConcerns.includes("Dry Skin")) {
    benefits.push("Deep hydration & soft skin 💧");
  }
  if (finalConcerns.includes("Excess Oil")) {
    benefits.push("Oil control & minimized pores 🫧");
  }

  benefits.push("Healthier skin barrier 🌸");
}

if (mode === "hair") {
  if (finalConcerns.includes("Dry Hair")) {
    benefits.push("Deep hydration & smooth hair 💧");
  }
  if (finalConcerns.includes("Hair Fall")) {
    benefits.push("Reduced hair fall & stronger roots 🌿");
  }
  if (finalConcerns.includes("Frizz")) {
    benefits.push("Frizz control & silky texture 🌷");
  }
  if (finalConcerns.includes("Dandruff")) {
    benefits.push("Cleaner scalp & reduced flakes ❄️");
  }

  benefits.push("Shinier, healthier hair 🌟");
}
console.log("GROUPED:", groupedProducts);
console.log("BENEFITS:", benefits);

const morningRoutine = [];

Object.values(groupedProducts).forEach((items) => {
  items.forEach((p) => {

    // SPECIFIC PRODUCT ROUTINES

    if (p.name.includes("Niacinamide")) {
      morningRoutine.push(
        `Apply ${p.name} after cleansing to reduce oiliness and refine pores 🌷`
      );
    }

    if (p.name.includes("Vitamin C")) {
      morningRoutine.push(
        `Use ${p.name} in the morning for glow and brightening ☀️`
      );
    }

    if (p.name.includes("Alpha Arbutin")) {
      morningRoutine.push(
        `Apply ${p.name} gently on dark spots and pigmentation 🌸`
      );
    }

    if (p.name.includes("Hydro Boost")) {
      morningRoutine.push(
        `Lock hydration using ${p.name} on damp skin 💧`
      );
    }

    if (p.name.includes("Cleanser")) {
      morningRoutine.push(
        `Cleanse your face using ${p.name} for 60 seconds 🫧`
      );
    }

    // HAIR PRODUCTS

    if (p.name.includes("Shampoo")) {
      morningRoutine.push(
        `Massage ${p.name} into your scalp and rinse thoroughly 🌷`
      );
    }

    if (p.name.includes("Oil")) {
      morningRoutine.push(
        `Apply ${p.name} lightly on hair lengths for nourishment 🌿`
      );
    }

    if (p.name.includes("Serum")) {
      morningRoutine.push(
        `Use ${p.name} on damp hair for smoothness and frizz control 💫`
      );
    }

  });
});

// EXTRA PERSONALIZED STEP

if (finalConcerns.includes("Acne")) {
  morningRoutine.push(
    "Avoid touching your face frequently to prevent breakouts 🌸"
  );
}

if (finalConcerns.includes("Dry Skin")) {
  morningRoutine.push(
    "Use lukewarm water and avoid over-cleansing 💧"
  );
}

if (finalConcerns.includes("Hair Fall")) {
  morningRoutine.push(
    "Avoid tight hairstyles to reduce hair breakage 🌿"
  );
}


const nightRoutine = [];

Object.values(groupedProducts).forEach((items) => {
  items.forEach((p) => {

    // SKIN PRODUCTS

    if (p.name.includes("Niacinamide")) {
      nightRoutine.push(
        `Apply ${p.name} before moisturizer to calm skin and reduce pores 🌙`
      );
    }

    if (p.name.includes("Vitamin C")) {
      nightRoutine.push(
        `Use ${p.name} lightly at night for repair and glow 🌷`
      );
    }

    if (p.name.includes("Alpha Arbutin")) {
      nightRoutine.push(
        `Apply ${p.name} on pigmentation and acne marks before bed 🌸`
      );
    }

    if (p.name.includes("Hydro Boost")) {
      nightRoutine.push(
        `Seal overnight hydration using ${p.name} 💧`
      );
    }

    if (p.name.includes("Moisturizing Cream")) {
      nightRoutine.push(
        `Apply ${p.name} generously for overnight skin recovery 💤`
      );
    }

    if (p.name.includes("Cleanser")) {
      nightRoutine.push(
        `Wash away dirt and oil using ${p.name} before sleeping 🫧`
      );
    }

    // HAIR PRODUCTS

    if (p.name.includes("Shampoo")) {
      nightRoutine.push(
        `Use ${p.name} for a gentle nighttime scalp cleanse 🌿`
      );
    }

    if (p.name.includes("Oil")) {
      nightRoutine.push(
        `Massage ${p.name} into the scalp overnight for nourishment 🌷`
      );
    }

    if (p.name.includes("Serum")) {
      nightRoutine.push(
        `Apply ${p.name} to hair lengths before bed for smoothness 💫`
      );
    }

  });
});

// EXTRA PERSONALIZED STEPS

if (finalConcerns.includes("Acne")) {
  nightRoutine.push(
    "Change your pillowcase regularly to avoid acne-causing bacteria 🌙"
  );
}

if (finalConcerns.includes("Dry Skin")) {
  nightRoutine.push(
    "Apply a thicker moisturizer layer before sleeping 💧"
  );
}

if (finalConcerns.includes("Hair Fall")) {
  nightRoutine.push(
    "Sleep on a satin pillowcase to reduce hair friction 🌿"
  );
}

if (finalConcerns.includes("Frizzy Hair")) {
  nightRoutine.push(
    "Tie hair loosely before bed to reduce frizz overnight 🌷"
  );
}

const deleteRoutine = async (id) => {

  const confirmDelete = window.confirm(
  "Do you really want to delete this saved routine?"
);

if (!confirmDelete) {
  return;
}

  const { error } = await supabase
    .from("saved_results")
    .delete()
    .eq("id", id);

  if (error) {
  alert(error.message);
} else {

  setSavedResults((prev) =>
    prev.filter((item) => item.id !== id)
  );

  }
};

  const saveResult = async () => {
    if (!user) {
      alert("Please log in with Google to save your results."); 
      return;
    }
console.log("MORNING:", morningRoutine);
console.log("NIGHT:", nightRoutine);

const deleteSingleStep = async (id, field, stepToDelete) => {
  
  const routine = savedResults.find((r) => r.id === id);
  
  const updatedSteps = routine[field]
    .split(" | ")
    .filter((step) => step !== stepToDelete);

  const { error } = await supabase
    .from("saved_results")
    .update({
      [field]: updatedSteps.join(" | "),
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
  } else {
    fetchSavedResults(user.id);
  }
};

const { data: existing } = await supabase
  .from("saved_results")
  .select("*")
  .eq("user_id", user.id)
  .eq("mode", mode)
  .eq("concerns", finalConcerns.join(", "));

if (existing && existing.length > 0) {
  alert("Routine already saved ✨"); 
  return;
}

   const { data, error } = await supabase
  .from("saved_results")
  .insert([
    {
      user_id: user.id,
      mode,
      concerns: finalConcerns.join(", "),
      morning_routine: morningRoutine.join(" | "),
      night_routine: nightRoutine.join(" | "),
    }
  ]);

console.log("SAVE INSERT DATA:", data);
console.log("SAVE INSERT ERROR:", error)

.select()
console.log("DATA:", data);
console.log("ERROR:", error);
    if (error) {
      alert(error.message);
    } else {
      alert("Saved successfully!");
      fetchSavedResults(user.id);
    }
  };

const toggleFavorite = async (product, category) => {

  if (!user) {
    alert("Please log in first.");
    return;
  }

  const exists = favoriteProducts.find(
    (p) => p.product_name === product.name
  );

  if (exists) {

    const { error } = await supabase
      .from("favorite_products")
      .delete()
      .eq("id", exists.id)
      .select();

    if (error) {
      alert(error.message);
    } else {
      fetchFavoriteProducts(user.id);
    }

  } else {

    const { data, error } = await supabase
      .from("favorite_products")
      .insert([
 {
   user_id: user.id,
   product_name: product.name || product.product_name || product,
   category: category,
   mode,
 }
])
.select()

    console.log("FAV INSERT DATA:", data);
    console.log("FAV INSERT ERROR:", error);

    if (error) {
  alert(error.message);
} else {

  fetchFavoriteProducts(user.id);

}
  }
};

const removeFavorite = async (productName) => {

  const { error } = await supabase
    .from("favorite_products")
    .delete()
    .eq("product_name", productName);

  if (error) {
    alert(error.message);
  } else {
    fetchFavoriteProducts(user.id);
  }

};

  return (
    <div className="app">
<div className="auth-box">
  {user ? (
    
    <div className="auth-box">

  {user ? (
    <>
      
      {/* LEFT */}
      <button
        className="google-btn"
        onClick={signOut}
      >
        Log out
      </button>

      {/* RIGHT */}
      <div className="right-buttons">

        <button
          className="google-btn"
          onClick={() => {
            fetchSavedResults(user.id);
            setScreen("saved");
          }}
        >
          Saved Results
        </button>

        <button
          className="google-btn"
          onClick={() => {
            setScreen("favorites");
          }}
        >
          Favorite Products 
        </button>

      </div>

    </>
  ) : (

    <button
      className="google-btn"
      onClick={signInWithGoogle}
    >
      Login with Google
    </button>

  )}

</div>
  ) : (
    <button
      className="google-btn"
      onClick={signInWithGoogle}
    >
      Login with Google
    </button>
  )}
</div>
      <video autoPlay loop muted playsInline className="fog-video">
  <source src="/fog.mp4" type="video/mp4" />
</video>
      {/* BUBBLES */}
      <div className="bubble-container">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
  key={i}
  className="bubble"
  onClick={(e) => {
    e.target.classList.add("pop");

    setTimeout(() => {
      e.target.classList.remove("pop");
    }, 400);
  }}
></div>
        ))}
      </div>

      
      {/* HOME */}
      {screen === "home" && (
        <div className="hero">
          <h1 className="title"> Glow Genie </h1>
          <p className="tagline">Your Ritual, Your Glow</p>
          <p className="subtitle">
            {taglines[currentTagline]}
          </p>

<div className="feature-box">
  <h3>Glow Genie - Self Care Decode🔮</h3>

  <ul>
    <li>✦ Personalized skin & hair analysis</li>
    <li>✦ Curated morning & night routines</li>
    <li>✦ Ingredient-based recommendations</li>
    <li>✦ Smart product suggestions</li>
    <li>✦ Luxury beauty-tech experience</li>
  </ul>
</div>

          <div className="choices">
            <button
              className="choice-btn"
              onClick={() => {
                setMode("hair");
                setScreen("quiz");
                setCurrentQ(0);
                setAnswers([]);
              }}
            >
            <span className="choice-emoji">˖𓍢ִ໋🍃༄˖･</span>
Hair Rituals
            </button>

            <button
              className="choice-btn"
              onClick={() => {
                setMode("skin");
                setScreen("quiz");
                setCurrentQ(0);
                setAnswers([]);
              }}
            >
            <span className="choice-emoji"> ˚˖𓍢ִ໋🌷͙֒✧</span>
Skin Rituals
            </button>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {screen === "quiz" && (
        <div className="card glass">
          <div className="quiz-header">
            <button
              className="ghost-btn"
              onClick={() => setScreen("home")}
            >
              ← Back
            </button>
            <div className="quiz-badge">
              {mode === "hair" ? "Hair Quiz" : "Skin Quiz"}
            </div>
          </div>

          {/* Progress */}
          <div className="progress-wrap">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    ((currentQ + 1) / questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
            <span className="progress-text">
              Question {currentQ + 1} of {questions.length}
            </span>
          </div>

          <h2 key={currentQ} className="question">
            {questions[currentQ].question}
          </h2>

          <div className="options">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                className="option"
                onClick={() => handleAnswer(opt)}
              >
                <span className="dot"></span>
                {opt}
              </button>
            ))}
          </div>
          <div className="quiz-nav">

  {currentQ > 0 && (
    <button
      className="nav-btn"
      onClick={() => {
        setCurrentQ(currentQ - 1);
        setAnswers((prev) => prev.slice(0, -1));
      }}
    >
      ← Previous
    </button>
  )}

</div>
        </div>
      )}

      {/* RESULT */}
      {screen === "result" && (
        <div className="results-card">
          <div className="title-wrapper">
  <h2 className="results-title">{displayText}</h2>
  <p className="subtitle">Your Personalized Radiance Guide</p>
</div>
<div className="section">
  <h3 className="section-title">Detected Concerns 🔍</h3>

  {concerns.length > 0 ? (
    <div className="concerns-container">
  {(finalConcerns || []).map((c, i) => (
    <div className="concern-pill" key={i}>
     {c}
    </div>
  ))}
</div>
  ) : (
    <p>No major concerns detected 🌷</p>
  )}
</div>
          {/* INGREDIENTS */}
          <div className="section">
            <h3 className="section-title">Key Ingredients</h3>
            <p className="ingredient-note typing-note">
  Tap an ingredient to unlock its beauty benefits.
</p>
            <div className="ingredients">
              {(ingredients || []).map((item, i) => (
                <div
  key={i}
  className="ingredient-card"
  onClick={() => setSelectedIngredient(item)}
>

  <div className="ingredient-icon">
    {item.split(" ").pop()}
  </div>

  <div className="ingredient-name">
    {item.replace(/[\u{1F300}-\u{1FAFF}]/gu, "")}
  </div>

</div>
              ))}
            </div>
          </div>

<div className="tabs action-buttons">

  <button
    className="tab-button"
onClick={() => setShowProducts(!showProducts)}
    >
    Recommend &nbsp; Products
  </button>

  <button
    className="tab-button"
onClick={() => setShowBenefits(!showBenefits)}
  >
   Benefits
  </button>

  <button
    className="tab-button"
onClick={() => setShowMorning(!showMorning)}
>
    Generate &nbsp; Morning &nbsp; Routine
  </button>

  <button
    className="tab-button"
onClick={() => setShowNight(!showNight)}
  >
    Generate &nbsp; Night &nbsp; Routine
  </button>

</div>

          {showProducts && (
<div className="section">
  <h3 className="section-title">Recommended Products ༘˚⋆🛍️</h3>
<p className="products-note typing-note">
Curious? Tap the products to explore your glow matches.
</p>
{Object.keys(groupedProducts).map((category, i) => (
  <div key={i} className="product-category">
    <h4>{category}</h4>
    <ul>
      {groupedProducts[category].map((item, j) => (
        <li key={j} className="product-item">
  <div className="product-row">

  <a
    href={`https://www.amazon.in/s?k=${encodeURIComponent(item.name)}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {item.name}
  </a>

  <button
    className="heart-btn"
    onClick={() => toggleFavorite(item, category)}
  >
    {favoriteProducts.some((p) => p.product_name === item.name)
      ? "❤️"
      : "🤍"}
  </button>

</div>
</li>
      ))}
    </ul>
  </div>
))}
</div>
          )}

          {/* BENEFITS */}
          {showBenefits && (
          <div className="section">
            <h3 className="section-title">Benefits ⚘.˚࿔🌸</h3>
            <ul className="benefits">
              {benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
)}

          {/* MORNING */}
          {showMorning && (
          <div className="section">
            <h3 className="section-title">
              Morning Routine ⋆｡˚🌤️
            </h3>
            <ul className="routine-list">
              {morningRoutine.map((step, i) => (
                <li key={i}>
                  <b>Step {i + 1}:</b> {step}
                </li>
              ))}
            </ul>
          </div>
          )}

        
          {/* NIGHT */}
          {showNight && (
          <div className="section">
            <h3 className="section-title">
              Night Routine ⋆⭒˚🪐
            </h3>
            <ul className="routine-list">
              {nightRoutine.map((step, i) => (
                <li key={i}>
                  <b>Step {i + 1}:</b> {step}
                </li>
              ))}
            </ul>
          </div>
          )}
          

          <div className="results-controls">
            <button onClick={saveResult}>
  Save Result
</button>
            <button onClick={() => setScreen("home")}>
              Restart
            </button>

          </div>
        </div>
      )}

{screen === "saved" && (
  <div className="results-card">

    <h2 className="results-title">Saved Rituals ༘˚⋆</h2>

    <button
      className="ghost-btn"
      onClick={() => setScreen("home")}
    >
      ← Back
    </button>

    {/* HAIR */}
    <div className="section">
      <h3 className="section-title">Hair Rituals 🍃</h3>

      {savedResults
        .filter((r) => r.mode === "hair")
        .map((r, i) => (
          <div key={i} className="saved-card">

            <div className="concern-row">

  <p>
    <b>Concerns:</b> {r.concerns}
  </p>

  <button
    className="delete-btn"
    onClick={() => {
  console.log("DELETE ID:", r.id);
  deleteRoutine(r.id);
}}
  >
    🗑️
  </button>

</div>

            <div className="routine-block">
              <h4>Morning Routine ☀️</h4>

              <ul>
                {r.morning_routine?.split(" | ")
                 .map((step, j) => (
                  <li key={j} className="routine-item">
  {step}

</li>
                ))}
              </ul>
            </div>

            <div className="routine-block">
              <h4>Night Routine 🌙</h4>

              <ul>
                {r.night_routine?.split(" | ")
                 .map((step, j) => (
                  <li key={j} className="routine-item">
  {step}
  
</li>
                 ))}
               </ul>
            </div>

          </div>
      ))}
    </div>

    {/* SKIN */}
    <div className="section">
      <h3 className="section-title">Skin Rituals 🌷</h3>

      {savedResults
  .filter((r) => r.mode === "skin")
  .map((r, i) => (
    <div key={i} className="saved-card">

      <div className="concern-row">

  <p>
    <b>Concerns:</b> {r.concerns}
  </p>

  <button
    className="delete-btn"
    onClick={() => deleteRoutine(r.id)}
  >
    🗑️
  </button>

</div>

      <div className="routine-block">
        <h4>Morning Routine ☀️</h4>

        <ul>
          {r.morning_routine
            ?.split(" | ")
            .map((step, j) => (
              <li key={j}>{step}</li>
            ))}
        </ul>
      </div>

      <div className="routine-block">
        <h4>Night Routine 🌙</h4>

        <ul>
          {r.night_routine
            ?.split(" | ")
            .map((step, j) => (
              <li key={j}>{step}</li>
            ))}
        </ul>
      </div>

    </div>
))}
    </div>

  </div>
)}

{screen === "favorites" && (

  <div className="results-card">

    <h2 className="results-title">
      Favorite Products ♡‧₊˚
    </h2>

    <button
      className="ghost-btn"
      onClick={() => setScreen("home")}
    >
      ← Back
    </button>

    {favoriteProducts.length === 0 ? (

      <p>No favorite products yet 💔</p>

    ) : (

      favoriteProducts.map((product, i) => (

        <div key={i} className="saved-card">

          <div className="favorite-row">

            <div className="favorite-info">
  <h4>{product.product_name}</h4>
  <p>{product.category}</p>
</div>

            <button
              className="delete-btn"
              onClick={() => {
  const confirmDelete = window.confirm(
    "Do you really want to delete this favorite product?"
  );

  if (confirmDelete) {
    removeFavorite(product.product_name);
  }
}}
            >
              🗑️
            </button>

          </div>

        </div>

      ))

    )}

  </div>

)}

      {selectedIngredient && (
  <div
    className="ingredient-popup-overlay"
    onClick={() => setSelectedIngredient(null)}
  >
    <div
      className="ingredient-popup"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>{selectedIngredient}</h2>

      <p>
        {ingredientInfo[selectedIngredient] ||
          "A beneficial ingredient for your routine."}
      </p>

      <button onClick={() => setSelectedIngredient(null)}>
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default App;