/* ------------------------------------------------------------------
   EDIT THIS FILE to change store settings and products.
   Prices below are placeholders. Replace with Carl's real prices.
------------------------------------------------------------------- */
window.SITE = {
  STORE_NAME: "Carl's site",
  CURRENCY: "$",
  // Where order requests are sent. Used by the "Send order request" button.
  ORDER_EMAIL: "carl@example.com",
  // Optional: paste a form-service URL (e.g. a Formspree endpoint) to send
  // orders straight to Carl's inbox without opening the customer's email app.
  // Leave empty ("") to use the email fallback.
  FORM_ENDPOINT: ""
};

window.CATEGORIES = [
  { id: "cues",   label: "Cues" },
  { id: "chalk",  label: "Chalk & tips" },
  { id: "balls",  label: "Balls" },
  { id: "racks",  label: "Racks & scoring" },
  { id: "cases",  label: "Cases & covers" },
  { id: "gloves", label: "Gloves & care" }
];

// icon: cue | chalk | ball | rack | case | glove
window.PRODUCTS = [
  { id: "cue-beginner", name: "Beginner Maple Cue, 58 in", category: "cues", icon: "cue", price: 49.99, featured: true,
    desc: "Two-piece maple cue with a 13 mm tip. A solid first cue for learning 8 ball." },
  { id: "cue-break", name: "Pro Break Cue", category: "cues", icon: "cue", price: 89.99, featured: true,
    desc: "Hard phenolic tip and a stiff shaft for a powerful, controlled break." },
  { id: "cue-carbon", name: "Carbon Fibre Cue", category: "cues", icon: "cue", price: 129.00,
    desc: "Low-deflection shaft that stays straight in any weather." },
  { id: "chalk-blue", name: "Blue Cue Chalk, 12 pack", category: "chalk", icon: "chalk", price: 9.99, featured: true,
    desc: "Premium chalk for better grip and fewer miscues." },
  { id: "tips-replace", name: "Replacement Cue Tips, 10 pack", category: "chalk", icon: "chalk", price: 11.99,
    desc: "Medium-hardness leather tips, 13 mm, glue-on." },
  { id: "tip-tool", name: "Tip Shaper & Scuffer Tool", category: "chalk", icon: "chalk", price: 8.99,
    desc: "Keep your tip round and textured so it holds chalk." },
  { id: "balls-set", name: "8 Ball Pool Ball Set, 16 pcs", category: "balls", icon: "ball", price: 59.99, featured: true,
    desc: "Full set of 2 1/4 in balls: cue ball, solids, stripes and the 8 ball." },
  { id: "cue-ball", name: "Spare Cue Ball", category: "balls", icon: "ball", price: 7.99,
    desc: "Regulation-size white cue ball, a handy spare." },
  { id: "rack-triangle", name: "Triangle Rack", category: "racks", icon: "rack", price: 14.99,
    desc: "Durable plastic rack for a tight, even 8 ball setup." },
  { id: "scoreboard", name: "Pool Scoreboard Set", category: "racks", icon: "rack", price: 13.99,
    desc: "Wall or table scorekeeper with sliding markers." },
  { id: "case-hard", name: "Hard Cue Case, 2x4", category: "cases", icon: "case", price: 39.99,
    desc: "Holds two butts and four shafts, with a padded interior." },
  { id: "table-cover", name: "Table Cover, 7 ft", category: "cases", icon: "case", price: 34.99,
    desc: "Fitted, water-resistant cover to keep your cloth clean." },
  { id: "glove", name: "Billiard Glove", category: "gloves", icon: "glove", price: 12.99,
    desc: "Three-finger glove for smooth strokes. Fits left or right hand." },
  { id: "cloth-kit", name: "Table Brush & Cleaning Kit", category: "gloves", icon: "glove", price: 19.99,
    desc: "Brush and microfibre cloth to keep the felt in top shape." }
];
