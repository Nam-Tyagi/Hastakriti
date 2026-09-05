import { useState, useRef, useEffect } from "react";
import {
  Home, PlusCircle, LayoutGrid, Store, Mic, Sparkles,
  ArrowLeft, ArrowRight, Check, Loader2, ShoppingBag,
  Flame, Shirt, ToyBrick, Share2, TrendingUp, Package,
  MessageCircle, Camera, Languages, IndianRupee, Type,
  Menu, X, ChevronRight, CheckCircle2,
} from "lucide-react";

const C = {
  ink: "#241E19",
  inkSoft: "#6B6153",
  paper: "#F1E9D8",
  paperDeep: "#E7DCC2",
  card: "#FFFFFF",
  dark: "#1B2129",
  marigold: "#D99B2B",
  marigoldDeep: "#B87F1E",
  indigo: "#33456A",
  rust: "#B5503A",
  sage: "#5B7A5D",
  line: "#E1D6BE",
};

const PRODUCT_TYPES = [
  { id: "bag", name: "Leather Bag", icon: ShoppingBag, category: "Leather Goods" },
  { id: "diya", name: "Clay Diya Set", icon: Flame, category: "Pottery" },
  { id: "dupatta", name: "Handloom Dupatta", icon: Shirt, category: "Textiles" },
  { id: "toy", name: "Wooden Toy", icon: ToyBrick, category: "Wooden Crafts" },
];

const TRANSCRIPTS = {
  bag: "\u201CYeh haathon se bana hua leather bag hai, asli chamde se, do din mein taiyar hota hai\u2026\u201D",
  diya: "\u201CYeh mitti ke diya hain, hath se banaye aur rangey gaye, tyohaar ke liye\u2026\u201D",
  dupatta: "\u201CYeh handloom dupatta hai, sooti dhaage se buna gaya, teen din lagte hain\u2026\u201D",
  toy: "\u201CYeh sheesham ki lakdi ka khilona hai, hath se tarasha gaya hai\u2026\u201D",
};

const GENERATED = {
  bag: {
    titleEn: "Handcrafted Genuine Leather Tote Bag",
    titleHi: "\u0939\u0938\u094D\u0924\u0928\u093F\u0930\u094D\u092E\u093F\u0924 \u0905\u0938\u0932\u0940 \u091A\u092E\u095C\u0947 \u0915\u093E \u092C\u0948\u0917",
    descEn: "A sturdy, hand-stitched tote made from genuine leather, finished over two days of careful work. Ages beautifully with use.",
    descHi: "\u0905\u0938\u0932\u0940 \u091A\u092E\u095C\u0947 \u0938\u0947 \u0939\u093E\u0925\u094B\u0902 \u0938\u0947 \u0938\u093F\u0932\u093E \u0917\u092F\u093E \u092E\u091C\u092C\u0942\u0924 \u092C\u0948\u0917, \u0926\u094B \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u092E\u0947\u0939\u0928\u0924 \u0938\u0947 \u092C\u0928\u093E\u0964",
    material: "Genuine leather, cotton lining",
    keywords: ["handmade", "leather", "tote", "artisan", "durable"],
  },
  diya: {
    titleEn: "Hand-Painted Clay Diya Set (Pack of 6)",
    titleHi: "\u0939\u093E\u0925 \u0938\u0947 \u0930\u0902\u0917\u0947 \u092E\u093F\u091F\u094D\u091F\u0940 \u0915\u0947 \u0926\u0940\u092F\u0947 (6 \u0915\u093E \u0938\u0947\u091F)",
    descEn: "Traditional clay diyas shaped and painted by hand, air-dried for a full day before finishing. Warm, festive light for any home.",
    descHi: "\u0939\u093E\u0925 \u0938\u0947 \u092C\u0928\u0947 \u0914\u0930 \u0930\u0902\u0917\u0947 \u092E\u093F\u091F\u094D\u091F\u0940 \u0915\u0947 \u0926\u0940\u092F\u0947, \u092A\u0942\u0930\u0947 \u0926\u093F\u0928 \u0938\u0941\u0916\u093E\u090F \u0917\u090F\u0964",
    material: "Natural terracotta clay",
    keywords: ["diya", "clay", "festival", "handmade", "home decor"],
  },
  dupatta: {
    titleEn: "Handloom Cotton Dupatta",
    titleHi: "\u0939\u0948\u0902\u0921\u0932\u0942\u092E \u0938\u0942\u0924\u0940 \u0926\u0941\u092A\u091F\u094D\u091F\u093E",
    descEn: "Woven on a traditional handloom over three days, carrying the soft texture that marks genuine handwoven cloth.",
    descHi: "\u092A\u093E\u0930\u0902\u092A\u0930\u093F\u0915 \u0939\u0925\u0915\u0930\u0918\u0947 \u092A\u0930 \u0924\u0940\u0928 \u0926\u093F\u0928\u094B\u0902 \u092E\u0947\u0902 \u092C\u0941\u0928\u093E \u0917\u092F\u093E \u0938\u0942\u0924\u0940 \u0926\u0941\u092A\u091F\u094D\u091F\u093E\u0964",
    material: "Handspun cotton",
    keywords: ["handloom", "cotton", "dupatta", "handwoven", "traditional"],
  },
  toy: {
    titleEn: "Hand-Carved Sheesham Wood Toy",
    titleHi: "\u0939\u093E\u0925 \u0938\u0947 \u0928\u0915\u094D\u0915\u093E\u0936\u0940\u0926\u093E\u0930 \u0936\u0940\u0936\u092E \u0915\u093E \u0916\u093F\u0932\u094C\u0928\u093E",
    descEn: "Carved from solid sheesham wood and smoothed by hand, finished with a natural, child-safe oil polish.",
    descHi: "\u0920\u094B\u0938 \u0936\u0940\u0936\u092E \u0915\u0940 \u0932\u0915\u0921\u093C\u0940 \u0938\u0947 \u0939\u093E\u0925 \u0938\u0947 \u0924\u0930\u093E\u0936\u093E \u0917\u092F\u093E, \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092A\u0949\u0932\u093F\u0936 \u0915\u0947 \u0938\u093E\u0925\u0964",
    material: "Sheesham wood, natural oil finish",
    keywords: ["wooden toy", "hand-carved", "sheesham", "child-safe"],
  },
};

const SEED_PRODUCTS = [
  { id: 1, title: "Hand-Embroidered Cushion Cover", category: "Textiles", price: "\u20B9380\u2013520", status: "Published", type: "dupatta" },
  { id: 2, title: "Brass Engraved Diya", category: "Metal Craft", price: "\u20B9210\u2013290", status: "Published", type: "diya" },
  { id: 3, title: "Carved Wooden Elephant", category: "Wooden Crafts", price: "\u20B9340\u2013460", status: "Draft", type: "toy" },
  { id: 4, title: "Leather Sling Bag", category: "Leather Goods", price: "\u20B9650\u2013890", status: "Published", type: "bag" },
];

const CHANNELS = [
  { id: 1, name: "TRIFED Govt. e-Marketplace", note: "Verified artisan produce channel" },
  { id: 2, name: "Urban Boutique Buyers Collective", note: "12 active B2B buyers" },
  { id: 3, name: "Regional Handicrafts Expo Board", note: "Seasonal fair linkage" },
];

const INQUIRIES = [
  { id: 1, buyer: "Meera Retail Co.", product: "Leather Sling Bag", note: "Asking about a 50-unit bulk order" },
  { id: 2, buyer: "Ananya Home Store", product: "Brass Engraved Diya", note: "Wants festive-season pricing" },
];

const STEP_LABELS = ["Capture", "Studio", "Speak", "Catalog", "Price", "Publish"];
const STAGE_ICONS = [Camera, Sparkles, Mic, Type, IndianRupee, CheckCircle2];

const PROBLEMS = [
  { title: "Photography", body: "Cluttered backgrounds and bad lighting make good products look unsellable online." },
  { title: "Cataloguing", body: "Writing a professional English listing is a real barrier for a first-language speaker." },
  { title: "Pricing", body: "No clear way to know a fair, competitive price for handmade work." },
  { title: "Market access", body: "Fairs and exhibitions bring buyers once in a while, not all year round." },
];

const FEATURES = [
  { title: "AI Photo Studio", body: "One tap turns a raw phone photo into a clean, e-commerce-ready product image.", Icon: Camera },
  { title: "Voice-to-Catalog", body: "Speak in Hindi or a regional language \u2014 get a structured bilingual listing back.", Icon: Languages },
  { title: "Pricing Assistant", body: "Cost inputs plus category signals produce a transparent, explained price range.", Icon: IndianRupee },
  { title: "Market Linkage", body: "One catalog, many doors \u2014 government channels, B2B buyers, expos.", Icon: Store },
];

function IconTile({ Icon, size = 22, color = C.ink }) {
  return <Icon size={size} color={color} strokeWidth={1.8} />;
}

function Badge({ children, tone = "sage" }) {
  const bg = tone === "sage" ? C.sage : tone === "rust" ? C.rust : C.indigo;
  return <span className="text-[10px] px-2 py-0.5 rounded-full text-white" style={{ background: bg }}>{children}</span>;
}

function ProductArt({ typeId, enhanced, tall }) {
  const type = PRODUCT_TYPES.find((t) => t.id === typeId) || PRODUCT_TYPES[0];
  const Icon = type.icon;
  return (
    <div
      className={`w-full h-full rounded-xl flex items-center justify-center relative overflow-hidden ${tall ? "aspect-[4/3]" : "aspect-square"}`}
      style={{
        background: enhanced ? "#FAF6EC" : "#CFC6B0",
        filter: enhanced ? "none" : "grayscale(0.35) contrast(0.85) brightness(0.85)",
      }}
    >
      {enhanced && <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 35%, rgba(217,155,43,0.18), transparent 65%)" }} />}
      <IconTile Icon={Icon} size={enhanced ? 84 : 64} color={enhanced ? C.indigo : "#6B6355"} />
    </div>
  );
}

// Typewriter: reveals text character by character. Keying it on the text
// value from the parent makes it replay whenever the source text changes.
function Typewriter({ text, speed = 16 }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  return <>{shown}</>;
}

// Draggable before/after comparison. Drag the handle (mouse or touch, via
// pointer events) to reveal more of the raw photo vs. the studio version.
function CompareSlider({ typeId }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(58);
  const [dragging, setDragging] = useState(false);

  const moveTo = (clientX) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };

  return (
    <div
      ref={ref}
      className="relative w-full aspect-square rounded-xl overflow-hidden select-none"
      style={{ cursor: "ew-resize", border: `1px solid ${C.line}` }}
      onPointerDown={(e) => { setDragging(true); moveTo(e.clientX); }}
      onPointerMove={(e) => dragging && moveTo(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      <div className="absolute inset-0"><ProductArt typeId={typeId} enhanced={true} /></div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ProductArt typeId={typeId} enhanced={false} />
      </div>
      <div className="absolute top-0 bottom-0" style={{ left: `${pos}%`, width: 2, background: "#fff", boxShadow: "0 0 6px rgba(0,0,0,0.3)" }} />
      <div
        className="absolute rounded-full flex items-center justify-center gap-0.5"
        style={{ left: `${pos}%`, top: "50%", transform: "translate(-50%,-50%)", width: 34, height: 34, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
      >
        <div style={{ width: 3, height: 10, background: C.ink, borderRadius: 2 }} />
        <div style={{ width: 3, height: 10, background: C.ink, borderRadius: 2 }} />
      </div>
      <div className="absolute bottom-2 left-2 text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-white">raw</div>
      <div className="absolute bottom-2 right-2 text-[9px] px-1.5 py-0.5 rounded text-white" style={{ background: C.sage }}>enhanced</div>
    </div>
  );
}

// Fades a section up into place the first time it scrolls into view.
function Reveal({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      {children}
    </div>
  );
}

// Tilts gently toward the cursor \u2014 the site's one signature hover moment.
function TiltCard({ children }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: "perspective(700px) rotateX(0) rotateY(0)" });
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ transform: `perspective(700px) rotateX(${py * -7}deg) rotateY(${px * 7}deg)` });
  };
  const reset = () => setStyle({ transform: "perspective(700px) rotateX(0) rotateY(0)" });
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={reset} style={{ transition: "transform 0.2s ease", ...style }}>
      {children}
    </div>
  );
}

function ProcessFlow() {
  return (
    <div className="relative flex items-center justify-between" style={{ height: 96 }}>
      <div className="absolute left-0 right-0 top-6 h-[3px] overflow-hidden rounded-full" style={{ background: C.line }}>
        <div
          className="h-full"
          style={{
            width: "200%",
            backgroundImage: `repeating-linear-gradient(90deg, ${C.marigold} 0 14px, transparent 14px 28px)`,
            animation: "hkflow 1.4s linear infinite",
          }}
        />
      </div>
      {STEP_LABELS.map((label, i) => {
        const Icon = STAGE_ICONS[i];
        return (
          <div key={label} className="relative z-10 flex flex-col items-center gap-2" style={{ width: `${100 / STEP_LABELS.length}%` }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: C.card, border: `2px solid ${C.marigold}` }}>
              <IconTile Icon={Icon} size={19} color={C.indigo} />
            </div>
            <span className="text-[11px] text-center" style={{ color: C.ink }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function Landing({ onLaunch }) {
  const [heroProduct, setHeroProduct] = useState("bag");
  return (
    <div className="w-full" style={{ background: C.paper, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .hk-body { font-family: 'IBM Plex Sans', sans-serif; }
        .hk-display { font-family: 'Fraunces', serif; }
        @keyframes hkflow { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <nav className="hk-body flex items-center justify-between px-8 md:px-16 py-5" style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="hk-display text-xl" style={{ fontWeight: 600 }}>Hastakirti</div>
        <button onClick={onLaunch} className="rounded-full px-5 py-2 text-sm" style={{ background: C.ink, color: "#fff" }}>
          Launch prototype
        </button>
      </nav>

      <header className="hk-body px-8 md:px-16 py-16 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        <div>
          <div className="text-xs mb-4 tracking-wide" style={{ color: C.marigoldDeep }}>SIH26090 \u00B7 Ministry of Social Justice &amp; Empowerment</div>
          <h1 className="hk-display text-4xl md:text-5xl leading-tight mb-5" style={{ fontWeight: 600 }}>
            A handmade product, ready for the market in minutes.
          </h1>
          <p className="text-base mb-8" style={{ color: C.inkSoft, maxWidth: 480 }}>
            Hastakirti turns a photo and a spoken description into a professional, priced, multilingual product listing \u2014 so an artisan never has to become an e-commerce expert first.
          </p>
          <div className="flex items-center gap-3">
            <button onClick={onLaunch} className="rounded-full px-6 py-3 text-sm flex items-center gap-2" style={{ background: C.marigold, color: C.ink }}>
              See it in action <ChevronRight size={16} />
            </button>
            <span className="text-xs" style={{ color: C.inkSoft }}>Drag the photo below \u2014 it's live</span>
          </div>
        </div>

        <div className="rounded-2xl p-5" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs" style={{ color: C.inkSoft }}>Drag to compare</span>
            <div className="flex gap-1.5">
              {PRODUCT_TYPES.map((p) => (
                <button key={p.id} onClick={() => setHeroProduct(p.id)}
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: heroProduct === p.id ? C.marigold : C.paperDeep }}>
                  <IconTile Icon={p.icon} size={13} color={heroProduct === p.id ? C.ink : C.inkSoft} />
                </button>
              ))}
            </div>
          </div>
          <CompareSlider typeId={heroProduct} />
          <div className="text-sm mt-3 min-h-[1.5em]" style={{ color: C.ink, fontWeight: 600 }}>
            <Typewriter key={heroProduct} text={GENERATED[heroProduct].titleEn} />
          </div>
          <div className="text-xs mt-1" style={{ color: C.sage }}>auto-generated listing title</div>
        </div>
      </header>

      <Reveal>
        <section className="hk-body px-8 md:px-16 py-14 max-w-6xl mx-auto">
          <h2 className="hk-display text-2xl mb-8" style={{ fontWeight: 600 }}>Where artisans lose the sale before it starts</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="rounded-xl p-4" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                <div className="text-sm mb-1.5" style={{ fontWeight: 600 }}>{p.title}</div>
                <div className="text-xs" style={{ color: C.inkSoft }}>{p.body}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="hk-body px-8 md:px-16 py-14" style={{ background: C.paperDeep }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="hk-display text-2xl mb-8" style={{ fontWeight: 600 }}>What Hastakirti does instead</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {FEATURES.map((f) => (
                <TiltCard key={f.title}>
                  <div className="rounded-xl p-5 h-full" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3" style={{ background: C.indigo }}>
                      <IconTile Icon={f.Icon} size={17} color="#fff" />
                    </div>
                    <div className="text-sm mb-1.5" style={{ fontWeight: 600 }}>{f.title}</div>
                    <div className="text-xs" style={{ color: C.inkSoft }}>{f.body}</div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="hk-body px-8 md:px-16 py-14 max-w-6xl mx-auto">
          <h2 className="hk-display text-2xl mb-10" style={{ fontWeight: 600 }}>From photo to published listing</h2>
          <ProcessFlow />
        </section>
      </Reveal>

      <Reveal>
        <section className="hk-body px-8 md:px-16 py-16" style={{ background: C.dark }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="hk-display text-2xl text-white mb-2" style={{ fontWeight: 600 }}>Your craft. Your story. Your market.</div>
              <div className="text-sm" style={{ color: "#B7AF9E" }}>Try the working prototype \u2014 add a product start to finish.</div>
            </div>
            <button onClick={onLaunch} className="rounded-full px-6 py-3 text-sm flex items-center gap-2 shrink-0" style={{ background: C.marigold, color: C.ink }}>
              Launch prototype <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

function Sidebar({ tab, goTab, collapsed, setCollapsed, onExit }) {
  const items = [
    ["home", Home, "Home"],
    ["add", PlusCircle, "Add product"],
    ["catalog", LayoutGrid, "Catalog"],
    ["market", Store, "Market linkage"],
  ];
  return (
    <div className={`hk-body flex flex-col shrink-0 transition-all ${collapsed ? "w-16" : "w-56"}`} style={{ background: C.dark }}>
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && <div className="hk-display text-white text-lg" style={{ fontWeight: 600 }}>Hastakirti</div>}
        <button onClick={() => setCollapsed((c) => !c)} className="text-white/60">
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-1 px-2">
        {items.map(([id, Icon, label]) => (
          <button key={id} onClick={() => goTab(id)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
            style={{ background: tab === id ? "rgba(217,155,43,0.15)" : "transparent", color: tab === id ? C.marigold : "#B7AF9E" }}>
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </div>
      <button onClick={onExit} className="m-3 text-xs text-left px-3 py-2 rounded-lg" style={{ color: "#8A8171" }}>
        {collapsed ? <ArrowLeft size={16} /> : "\u2190 Back to site"}
      </button>
    </div>
  );
}

function App({ onExit }) {
  const [tab, setTab] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [step, setStep] = useState(0);
  const [productType, setProductType] = useState(null);
  const [enhancing, setEnhancing] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [recording, setRecording] = useState(false);
  const [processingSpeech, setProcessingSpeech] = useState(false);
  const [transcribed, setTranscribed] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [catalogReady, setCatalogReady] = useState(false);
  const [lang, setLang] = useState("en");
  const [listing, setListing] = useState(null);
  const [materialCost, setMaterialCost] = useState(300);
  const [laborCost, setLaborCost] = useState(250);
  const [products, setProducts] = useState(SEED_PRODUCTS);
  const [publishing, setPublishing] = useState(false);
  const [sharedChannel, setSharedChannel] = useState(null);

  const resetAddFlow = () => {
    setStep(0); setProductType(null); setEnhancing(false); setEnhanced(false);
    setRecording(false); setProcessingSpeech(false); setTranscribed(false);
    setGenerating(false); setCatalogReady(false); setLang("en"); setListing(null);
    setMaterialCost(300); setLaborCost(250); setPublishing(false);
  };
  const goTab = (t) => { setTab(t); if (t === "add") resetAddFlow(); };

  const runEnhance = () => { setEnhancing(true); setTimeout(() => { setEnhancing(false); setEnhanced(true); }, 1100); };
  const runRecord = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false); setProcessingSpeech(true);
      setTimeout(() => { setProcessingSpeech(false); setTranscribed(true); }, 900);
    }, 1700);
  };

  // Generates the listing, then types it into place field by field rather
  // than popping it in \u2014 title first, then the description.
  const runGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      const full = GENERATED[productType.id];
      setListing({ ...full, titleEn: "", descEn: "" });
      setCatalogReady(true);
      let i = 0;
      const totalTitle = full.titleEn.length;
      const totalAll = totalTitle + full.descEn.length;
      const id = setInterval(() => {
        i += 2;
        setListing((l) => ({
          ...l,
          titleEn: full.titleEn.slice(0, Math.min(i, totalTitle)),
          descEn: full.descEn.slice(0, Math.max(0, Math.min(i - totalTitle, full.descEn.length))),
        }));
        if (i >= totalAll) clearInterval(id);
      }, 14);
    }, 1000);
  };

  const min = Math.round((materialCost + laborCost) * 1.05 / 10) * 10;
  const suggested = Math.round((materialCost + laborCost) * 1.35 / 10) * 10;
  const premium = Math.round((materialCost + laborCost) * 1.75 / 10) * 10;

  const publish = () => {
    setPublishing(true);
    setTimeout(() => {
      setProducts((prev) => [{ id: Date.now(), title: listing.titleEn, category: productType.category, price: `\u20B9${min}\u2013${premium}`, status: "Published", type: productType.id }, ...prev]);
      goTab("catalog");
    }, 1500);
  };

  const publishedCount = products.filter((p) => p.status === "Published").length;
  const draftCount = products.length - publishedCount;

  return (
    <div className="hk-body flex" style={{ height: "100%", background: C.paper }}>
      <Sidebar tab={tab} goTab={goTab} collapsed={collapsed} setCollapsed={setCollapsed} onExit={onExit} />

      <div className="flex-1 overflow-y-auto px-8 py-8">
        {tab === "home" && (
          <div className="max-w-5xl">
            <h1 className="hk-display text-2xl mb-6" style={{ fontWeight: 600, color: C.ink }}>Welcome back</h1>
            <div className="rounded-2xl p-6 mb-6 flex items-center justify-between" style={{ background: C.indigo }}>
              <div>
                <div className="text-white/70 text-xs mb-1">Catalog progress</div>
                <div className="text-white hk-display text-xl">{publishedCount} of {products.length} listings live</div>
              </div>
              <button onClick={() => goTab("add")} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm" style={{ background: C.marigold, color: C.ink }}>
                <PlusCircle size={16} /> Add a product
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[["Products", products.length, Package], ["Published", publishedCount, TrendingUp], ["Drafts", draftCount, Package], ["Inquiries", INQUIRIES.length, MessageCircle]].map(([label, val, Icon]) => (
                <div key={label} className="rounded-xl p-4" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: C.inkSoft }}>{label}</span>
                    <IconTile Icon={Icon} size={16} color={C.marigoldDeep} />
                  </div>
                  <span className="hk-display text-2xl" style={{ color: C.ink }}>{val}</span>
                </div>
              ))}
            </div>
            <div className="text-sm mb-3" style={{ color: C.ink, fontWeight: 600 }}>Recent buyer activity</div>
            <div className="grid md:grid-cols-2 gap-3">
              {INQUIRIES.map((i) => (
                <div key={i.id} className="rounded-xl p-4" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                  <div className="text-sm" style={{ color: C.ink, fontWeight: 600 }}>{i.buyer}</div>
                  <div className="text-xs" style={{ color: C.inkSoft }}>{i.product} \u2014 {i.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "add" && (
          <div className="max-w-5xl">
            <h1 className="hk-display text-2xl mb-6" style={{ fontWeight: 600, color: C.ink }}>Add a product</h1>
            <div className="flex items-center gap-2 mb-8">
              {STEP_LABELS.map((label, i) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                  <div className="h-1.5 w-full rounded-full" style={{ background: i <= step ? C.marigold : C.line }} />
                  <span className="text-[10px]" style={{ color: i === step ? C.ink : C.inkSoft }}>{label}</span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3 flex flex-col gap-4">
                {step === 0 && (
                  <>
                    <div className="text-sm" style={{ color: C.ink, fontWeight: 600 }}>What did you make today?</div>
                    <div className="grid grid-cols-2 gap-3">
                      {PRODUCT_TYPES.map((p) => (
                        <button key={p.id} onClick={() => setProductType(p)} className="rounded-xl p-4 flex flex-col items-center gap-2"
                          style={{ background: C.card, border: `2px solid ${productType?.id === p.id ? C.marigold : C.line}` }}>
                          <IconTile Icon={p.icon} size={28} color={C.indigo} />
                          <span className="text-xs text-center" style={{ color: C.ink }}>{p.name}</span>
                        </button>
                      ))}
                    </div>
                    <button disabled={!productType} onClick={() => setStep(1)} className="flex items-center justify-center gap-2 rounded-full py-3 text-sm disabled:opacity-40 w-fit px-6" style={{ background: C.ink, color: "#fff" }}>
                      Use this photo <ArrowRight size={15} />
                    </button>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="text-sm" style={{ color: C.ink, fontWeight: 600 }}>AI Photo Studio</div>
                    {!enhanced ? (
                      <button onClick={runEnhance} disabled={enhancing} className="flex items-center justify-center gap-2 rounded-full py-3 text-sm w-fit px-6" style={{ background: C.marigold, color: C.ink }}>
                        {enhancing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                        {enhancing ? "Cleaning up background & lighting\u2026" : "Enhance with AI Studio"}
                      </button>
                    ) : (
                      <div className="rounded-xl p-3 text-xs w-fit" style={{ background: "rgba(91,122,93,0.12)", color: C.sage }}>
                        Background removed, lighting corrected, cropped to a clean square.
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setStep(0)} className="flex items-center gap-2 rounded-full py-2.5 px-5 text-sm" style={{ border: `1px solid ${C.line}`, color: C.ink }}><ArrowLeft size={15} /> Back</button>
                      <button disabled={!enhanced} onClick={() => setStep(2)} className="flex items-center gap-2 rounded-full py-2.5 px-5 text-sm disabled:opacity-40" style={{ background: C.ink, color: "#fff" }}>Continue <ArrowRight size={15} /></button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="text-sm" style={{ color: C.ink, fontWeight: 600 }}>Describe it in your own words</div>
                    <div className="text-xs mb-1" style={{ color: C.inkSoft }}>Speak in Hindi or your regional language \u2014 no typing needed.</div>
                    <div className="rounded-xl p-6 flex flex-col items-center gap-3 w-fit" style={{ background: C.card, border: `1px solid ${C.line}`, minWidth: 320 }}>
                      {!recording && !processingSpeech && !transcribed && (
                        <button onClick={runRecord} className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: C.rust }}>
                          <Mic size={26} color="#fff" />
                        </button>
                      )}
                      {recording && <span className="text-xs" style={{ color: C.inkSoft }}>Listening\u2026</span>}
                      {processingSpeech && (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 size={22} className="animate-spin" color={C.indigo} />
                          <span className="text-xs" style={{ color: C.inkSoft }}>Transcribing speech\u2026</span>
                        </div>
                      )}
                      {transcribed && <div className="text-sm italic text-center" style={{ color: C.ink }}>{TRANSCRIPTS[productType.id]}</div>}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setStep(1)} className="flex items-center gap-2 rounded-full py-2.5 px-5 text-sm" style={{ border: `1px solid ${C.line}`, color: C.ink }}><ArrowLeft size={15} /> Back</button>
                      <button disabled={!transcribed} onClick={() => { setStep(3); runGenerate(); }} className="flex items-center gap-2 rounded-full py-2.5 px-5 text-sm disabled:opacity-40" style={{ background: C.ink, color: "#fff" }}>Continue <ArrowRight size={15} /></button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="text-sm" style={{ color: C.ink, fontWeight: 600 }}>Auto-generated catalog listing</div>
                    {generating && (
                      <div className="rounded-xl p-6 flex flex-col items-center gap-2 w-fit" style={{ background: C.card, border: `1px solid ${C.line}`, minWidth: 320 }}>
                        <Loader2 size={22} className="animate-spin" color={C.indigo} />
                        <span className="text-xs" style={{ color: C.inkSoft }}>Writing a listing in English & Hindi\u2026</span>
                      </div>
                    )}
                    {catalogReady && listing && (
                      <div className="flex flex-col gap-3 max-w-md">
                        <div className="flex rounded-full p-1 w-fit" style={{ background: C.line }}>
                          <button onClick={() => setLang("en")} className="rounded-full py-1 px-4 text-xs" style={{ background: lang === "en" ? C.card : "transparent", color: C.ink }}>English</button>
                          <button onClick={() => setLang("hi")} className="rounded-full py-1 px-4 text-xs" style={{ background: lang === "hi" ? C.card : "transparent", color: C.ink }}>\u0939\u093F\u0928\u094D\u0926\u0940</button>
                        </div>
                        <div className="rounded-xl p-4 flex flex-col gap-2" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                          <input value={lang === "en" ? listing.titleEn : listing.titleHi} onChange={(e) => setListing((l) => ({ ...l, [lang === "en" ? "titleEn" : "titleHi"]: e.target.value }))} className="text-sm bg-transparent outline-none" style={{ color: C.ink, fontWeight: 600 }} />
                          <textarea value={lang === "en" ? listing.descEn : listing.descHi} onChange={(e) => setListing((l) => ({ ...l, [lang === "en" ? "descEn" : "descHi"]: e.target.value }))} rows={3} className="text-xs bg-transparent outline-none resize-none" style={{ color: C.inkSoft }} />
                          <div className="text-xs" style={{ color: C.inkSoft }}>Material: {listing.material}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {listing.keywords.map((k) => <span key={k} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(51,69,106,0.1)", color: C.indigo }}>{k}</span>)}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setStep(2)} className="flex items-center gap-2 rounded-full py-2.5 px-5 text-sm" style={{ border: `1px solid ${C.line}`, color: C.ink }}><ArrowLeft size={15} /> Back</button>
                      <button disabled={!catalogReady} onClick={() => setStep(4)} className="flex items-center gap-2 rounded-full py-2.5 px-5 text-sm disabled:opacity-40" style={{ background: C.ink, color: "#fff" }}>Continue <ArrowRight size={15} /></button>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="text-sm" style={{ color: C.ink, fontWeight: 600 }}>Set a fair price</div>
                    <div className="rounded-xl p-4 flex flex-col gap-3 max-w-md" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                      <div>
                        <div className="flex justify-between text-xs mb-1" style={{ color: C.inkSoft }}><span>Material cost</span><span>\u20B9{materialCost}</span></div>
                        <input type="range" min={50} max={1000} value={materialCost} onChange={(e) => setMaterialCost(Number(e.target.value))} className="w-full" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1" style={{ color: C.inkSoft }}><span>Labour cost</span><span>\u20B9{laborCost}</span></div>
                        <input type="range" min={50} max={1000} value={laborCost} onChange={(e) => setLaborCost(Number(e.target.value))} className="w-full" />
                      </div>
                      <div className="text-xs" style={{ color: C.inkSoft }}>Category: {productType.category}</div>
                    </div>
                    <div className="rounded-xl p-4 max-w-md" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                      <div className="text-xs mb-2" style={{ color: C.inkSoft }}>Suggested selling range</div>
                      <div className="flex items-end gap-3 mb-2">
                        {[["Min viable", min, C.line], ["Suggested", suggested, C.marigold], ["Premium", premium, C.rust]].map(([lbl, val, col]) => (
                          <div key={lbl} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full rounded-t-md" style={{ height: 30 + (val / premium) * 50, background: col }} />
                            <span className="text-[10px] text-center" style={{ color: C.inkSoft }}>{lbl}</span>
                            <span className="text-xs hk-display" style={{ color: C.ink }}>\u20B9{val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-[10px]" style={{ color: C.inkSoft }}>Based on your costs plus a fair margin \u2014 not a guaranteed sale price.</div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setStep(3)} className="flex items-center gap-2 rounded-full py-2.5 px-5 text-sm" style={{ border: `1px solid ${C.line}`, color: C.ink }}><ArrowLeft size={15} /> Back</button>
                      <button onClick={() => setStep(5)} className="flex items-center gap-2 rounded-full py-2.5 px-5 text-sm" style={{ background: C.ink, color: "#fff" }}>Continue <ArrowRight size={15} /></button>
                    </div>
                  </>
                )}

                {step === 5 && (
                  <>
                    <div className="text-sm" style={{ color: C.ink, fontWeight: 600 }}>Review & publish</div>
                    {!publishing ? (
                      <>
                        <div className="rounded-xl p-4 flex gap-4 max-w-md" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                          <div className="w-28"><ProductArt typeId={productType.id} enhanced={true} /></div>
                          <div className="flex-1 flex flex-col gap-1">
                            <span className="text-sm" style={{ color: C.ink, fontWeight: 600 }}>{listing.titleEn}</span>
                            <span className="text-xs" style={{ color: C.inkSoft }}>{productType.category}</span>
                            <span className="text-sm hk-display" style={{ color: C.marigoldDeep }}>\u20B9{min}\u2013{premium}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => setStep(4)} className="flex items-center gap-2 rounded-full py-2.5 px-5 text-sm" style={{ border: `1px solid ${C.line}`, color: C.ink }}><ArrowLeft size={15} /> Back</button>
                          <button onClick={publish} className="flex items-center gap-2 rounded-full py-2.5 px-5 text-sm" style={{ background: C.sage, color: "#fff" }}><Check size={15} /> Publish listing</button>
                        </div>
                      </>
                    ) : (
                      <div className="rounded-xl p-8 flex flex-col items-center gap-2 w-fit" style={{ background: C.card, border: `1px solid ${C.line}`, minWidth: 320 }}>
                        <Loader2 size={22} className="animate-spin" color={C.sage} />
                        <span className="text-xs" style={{ color: C.inkSoft }}>Publishing to your catalog\u2026</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="md:col-span-2">
                <div className="sticky top-0 rounded-xl p-4" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                  <div className="text-xs mb-3" style={{ color: C.inkSoft }}>Live preview</div>
                  {productType ? (
                    <>
                      <ProductArt typeId={productType.id} enhanced={enhanced} tall />
                      <div className="mt-3 text-sm" style={{ color: C.ink, fontWeight: 600 }}>{listing ? listing.titleEn : productType.name}</div>
                      <div className="text-xs" style={{ color: C.inkSoft }}>{productType.category}</div>
                      {step >= 4 && <div className="text-sm hk-display mt-1" style={{ color: C.marigoldDeep }}>\u20B9{min}\u2013{premium}</div>}
                    </>
                  ) : (
                    <div className="text-xs" style={{ color: C.inkSoft }}>Pick a product to see it build up here.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "catalog" && (
          <div className="max-w-5xl">
            <h1 className="hk-display text-2xl mb-6" style={{ fontWeight: 600, color: C.ink }}>Your catalog</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="rounded-xl p-3 flex flex-col gap-2" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                  <ProductArt typeId={p.type} enhanced={true} />
                  <span className="text-sm leading-tight" style={{ color: C.ink, fontWeight: 600 }}>{p.title}</span>
                  <span className="text-xs" style={{ color: C.inkSoft }}>{p.category}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm hk-display" style={{ color: C.marigoldDeep }}>{p.price}</span>
                    <Badge tone={p.status === "Published" ? "sage" : "indigo"}>{p.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "market" && (
          <div className="max-w-5xl">
            <h1 className="hk-display text-2xl mb-6" style={{ fontWeight: 600, color: C.ink }}>Market linkage</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-sm mb-3" style={{ color: C.ink, fontWeight: 600 }}>Buyer channels</div>
                <div className="flex flex-col gap-3">
                  {CHANNELS.map((c) => (
                    <div key={c.id} className="rounded-xl p-4 flex items-center justify-between gap-2" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                      <div>
                        <div className="text-sm" style={{ color: C.ink, fontWeight: 600 }}>{c.name}</div>
                        <div className="text-xs" style={{ color: C.inkSoft }}>{c.note}</div>
                      </div>
                      <button onClick={() => setSharedChannel(c.id)} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs shrink-0" style={{ background: sharedChannel === c.id ? C.sage : C.marigold, color: sharedChannel === c.id ? "#fff" : C.ink }}>
                        {sharedChannel === c.id ? <><Check size={12} /> Shared</> : <><Share2 size={12} /> Share</>}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm mb-3" style={{ color: C.ink, fontWeight: 600 }}>Buyer inquiries</div>
                <div className="flex flex-col gap-3">
                  {INQUIRIES.map((i) => (
                    <div key={i.id} className="rounded-xl p-4" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                      <div className="text-sm" style={{ color: C.ink, fontWeight: 600 }}>{i.buyer}</div>
                      <div className="text-xs" style={{ color: C.inkSoft }}>{i.product}</div>
                      <div className="text-xs mt-1" style={{ color: C.ink }}>{i.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HastakirtiSite() {
  const [view, setView] = useState("landing");
  return (
    <div className="hk-body" style={{ height: "100vh", width: "100%" }}>
      {view === "landing" ? <Landing onLaunch={() => setView("app")} /> : <App onExit={() => setView("landing")} />}
    </div>
  );
}
