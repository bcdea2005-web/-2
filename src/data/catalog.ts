export type CategoryId = "abayas" | "open" | "hood" | "prayer";

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  price: number;
  category: CategoryId;
  color: { name: string; hex: string };
  sizes: string[];
  fabric: string;
  image: string;
  description: string;
  details: string[];
  care: string[];
  badge?: string;
  featured?: boolean;
  isNew?: boolean;
  limited?: number;
};

export const STORE = {
  name: "ستر",
  nameEn: "SITR",
  tagline: "للزي الإسلامي",
  city: "القاهرة",
  hours: "السبت — الخميس · ١١ صباحًا حتى ٩ مساءً",
  whatsapp: "201000000000",
  email: "hello@sitr.store",
  instagram: "sitr.wear",
  freeShipping: 2500,
  shippingFee: 70,
};

export const CITIES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "المنصورة",
  "طنطا",
  "الزقازيق",
  "أسيوط",
  "الأقصر",
  "أسوان",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "شرم الشيخ",
  "الغردقة",
  "دمياط",
  "المنيا",
  "سوهاج",
  "قنا",
  "الفيوم",
  "بني سويف",
  "أخرى",
];

export const CATEGORIES: {
  id: CategoryId;
  name: string;
  en: string;
  blurb: string;
  image: string;
}[] = [
  {
    id: "abayas",
    name: "مغلقة",
    en: "Closed",
    blurb: "عبايات سوداء بقصة واسعة مغلقة",
    image: "/images/black-closed.jpg",
  },
  {
    id: "open",
    name: "مفتوحة",
    en: "Open",
    blurb: "فوق فستان أسود، بحافة ياقوت رفيعة",
    image: "/images/black-open.jpg",
  },
  {
    id: "hood",
    name: "بغطاء",
    en: "Hooded",
    blurb: "جلابيب وخُمُر سوداء تستر الرأس",
    image: "/images/black-hood.jpg",
  },
  {
    id: "prayer",
    name: "صلاة",
    en: "Prayer",
    blurb: "إسدال أسود خفيف للصلاة",
    image: "/images/black-prayer.jpg",
  },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const black = { name: "أسود", hex: "#111111" };

export const PRODUCTS: Product[] = [
  {
    id: "jilbab-sukoon",
    slug: "jilbab-sukoon",
    name: "جلباب السكون",
    nameEn: "Sukoon Jilbab",
    price: 5450,
    category: "hood",
    color: black,
    sizes,
    fabric: "كريب أسود مطفي",
    image: "/images/hero.jpg",
    badge: "توقيع الدار",
    featured: true,
    isNew: true,
    description:
      "جلباب إسلامي أسود بغطاء ينسدل على الكتفين. قصّة واسعة تستر الخطوة وتُريح السجود، والقماش أسود مطفي لا يلمع في الشمس.",
    details: [
      "غطاء رأس متصل",
      "طول قياسي ١٥٢ سم، ويُطوَّل مجانًا حتى ١٦٥ سم",
      "كم واسع",
      "بطانة خفيفة عند الصدر",
    ],
    care: ["غسيل بارد مقلوب", "لا مجفف", "كيّ على الوجه الداخلي"],
  },
  {
    id: "abaya-closed",
    slug: "abaya-closed",
    name: "عباية الإغلاق",
    nameEn: "Closed Abaya",
    price: 4890,
    category: "abayas",
    color: black,
    sizes,
    fabric: "كريب ياباني أسود",
    image: "/images/black-closed.jpg",
    badge: "الأكثر طلبًا",
    featured: true,
    description:
      "عباية سوداء مغلقة بياقة واقفة وفتحة أمامية مخفية. تنسدل من الكتف بلا ضيق، وتكفي للصلاة والمشي في حرّ القاهرة.",
    details: ["ياقة واقفة", "أزرار مخفية", "جيبان داخليان", "طول ١٥٠ سم قابل للتعديل"],
    care: ["غسيل بارد", "تعليقها مبللة", "كيّ بخار خفيف"],
  },
  {
    id: "abaya-qamar",
    slug: "abaya-qamar",
    name: "عباية القمر",
    nameEn: "Qamar Open Abaya",
    price: 5890,
    category: "open",
    color: { name: "أسود بحافة ياقوت", hex: "#111111" },
    sizes,
    fabric: "كريب أسود",
    image: "/images/black-open.jpg",
    badge: "محدود",
    featured: true,
    limited: 4,
    description:
      "عباية سوداء مفتوحة فوق فستان أسود محتشم. على الحافة فقط خيط من أزرق الشعار، رفيع كختم لا كزينة.",
    details: ["قطعتان: عباية مفتوحة وفستان داخلي أسود", "حافة ياقوتية رفيعة", "كم واسع", "إصدار محدود"],
    care: ["غسيل بارد مقلوب", "لا مبيّض", "كيّ بخار"],
  },
  {
    id: "abaya-hood",
    slug: "abaya-hood",
    name: "عباية الغطاء",
    nameEn: "Hood Abaya",
    price: 5150,
    category: "hood",
    color: black,
    sizes,
    fabric: "كتان مخلوط أسود",
    image: "/images/black-hood.jpg",
    description:
      "عباية سوداء بغطاء يُلبس على الرأس أو يُسدل على الظهر. قصّة طويلة واسعة، وقماش يتنفّس في الصيف.",
    details: ["غطاء واسع", "تُلبس من الأمام أو يظهر سقوطها من الخلف", "طول إلى الأرض", "مناسبة للسفر"],
    care: ["غسيل بارد", "لا مجفف", "كيّ متوسط"],
  },
  {
    id: "abaya-buttons",
    slug: "abaya-buttons",
    name: "عباية الأزرار",
    nameEn: "Button Abaya",
    price: 4690,
    category: "abayas",
    color: black,
    sizes,
    fabric: "كريب أسود",
    image: "/images/black-buttons.jpg",
    isNew: true,
    description:
      "عباية سوداء بأزرار مغطاة بالقماش نفسه على طول الفتحة. مغلقة حتى الأسفل، واسعة عند الخطوة، بلا لون آخر.",
    details: ["أزرار مغطاة سوداء", "رقبة دائرية مغلقة", "فتحة أمامية محتشمة", "طول ١٥٢ سم"],
    care: ["غسيل مقلوب", "لا مبيّض", "كيّ على البطانة"],
  },
  {
    id: "abaya-wide",
    slug: "abaya-wide",
    name: "عباية الكم",
    nameEn: "Wide Sleeve Abaya",
    price: 5350,
    category: "abayas",
    color: black,
    sizes,
    fabric: "كريب سائل أسود",
    image: "/images/black-wide.jpg",
    badge: "جديد",
    featured: true,
    isNew: true,
    description:
      "عباية سوداء بكم خفاش واسع وياقة واقفة. القماش ينسدل كستارة، والقصّة لا ترسم الجسم.",
    details: ["كم واسع جدًا", "ياقة واقفة", "سقوط ثقيل أنيق", "طول ١٥٤ سم"],
    care: ["غسيل ناعم", "لا عصر", "تعليق على شماعة عريضة"],
  },
  {
    id: "abaya-cuff",
    slug: "abaya-cuff",
    name: "عباية الختم",
    nameEn: "Seal Abaya",
    price: 4550,
    category: "abayas",
    color: { name: "أسود بحافة ياقوت", hex: "#111111" },
    sizes,
    fabric: "كريب أسود",
    image: "/images/black-cuff.jpg",
    featured: true,
    description:
      "السواد هو القطعة كلها. على حافة الكم فقط خيط ياقوتي، ختم الدار لمن تعرف ستر من غير أن يُرفع الصوت.",
    details: ["حافة كم زرقاء رفيعة", "رقبة مغلقة", "قصّة يومية واسعة", "لا تطريز على الصدر"],
    care: ["غسيل مقلوب", "لا مبيّض", "كيّ متوسط"],
  },
  {
    id: "abaya-pleat",
    slug: "abaya-pleat",
    name: "عباية الكسرة",
    nameEn: "Pleat Abaya",
    price: 4990,
    category: "abayas",
    color: black,
    sizes,
    fabric: "كريب مكسر أسود",
    image: "/images/black-pleat.jpg",
    description:
      "عباية سوداء بكسرات ناعمة من الكتف. الحركة في القماش، لا في اللون. مغلقة، طويلة، وواسعة.",
    details: ["كسرات من الصدر", "كم طويل بكفّة", "قماش أسود لا يشفّ", "طول ١٥٢ سم"],
    care: ["غسيل بارد", "لا عصر قوي", "كيّ بخار من الداخل"],
  },
  {
    id: "khimar-sitr",
    slug: "khimar-sitr",
    name: "خمار ستر",
    nameEn: "Sitr Khimar",
    price: 980,
    category: "hood",
    color: black,
    sizes: ["موحّد"],
    fabric: "كريب أسود",
    image: "/images/black-khimar.jpg",
    badge: "خمار",
    description:
      "خمار أسود يغطّي الرأس والصدر والظهر، يُلبس فوق عباية سوداء. سقوطه طويل وواسع، بلا طبقات كثيرة.",
    details: ["يغطي الرأس والكتفين والصدر", "حافة مخيطة مخفية", "مقاس موحّد واسع", "يُنسّق مع أي عباية من الدار"],
    care: ["غسيل يد أو بارد", "لا عصر", "تجفيف مستوٍ"],
  },
  {
    id: "prayer-black",
    slug: "prayer-black",
    name: "إسدال السكينة",
    nameEn: "Black Prayer Isdal",
    price: 1280,
    category: "prayer",
    color: black,
    sizes: ["موحّد"],
    fabric: "لنن أسود",
    image: "/images/black-prayer.jpg",
    badge: "للصلاة",
    description:
      "إسدال صلاة أسود بغطاء، وتطريز هادئ بنفس لون القماش. خفيف على السفر، وواسع فوق الملابس، ومطويّه صغير في الحقيبة.",
    details: ["غطاء متصل", "تطريز أسود على الحافة", "قماش يتنفّس", "مقاس موحّد واسع"],
    care: ["غسيل بارد", "لا مبيّض", "كيّ من الخلف"],
  },
];

export const TESTIMONIALS = [
  {
    quote: "العباية لا تلتصق، ولا أحتاج أشدّها وأنا أمشي. هذا ما كنت أبحث عنه من غير أن أشرح.",
    name: "هدى ع.",
    city: "القاهرة",
  },
  {
    quote: "اللون الأزرق في الحافة صغير، لكنه يجعل القطعة تُعرف. كأنها ختم، لا زينة.",
    name: "مريم س.",
    city: "الإسكندرية",
  },
  {
    quote: "الإسدال الأسود خفيف ومطويّه صغير. أخذته في السفر ولم يثقل الحقيبة.",
    name: "سلمى ن.",
    city: "الجيزة",
  },
];

export const SIZE_GUIDE = [
  { size: "S", bust: "٩٦", sleeve: "٥٨", length: "١٤٨" },
  { size: "M", bust: "١٠٤", sleeve: "٥٩", length: "١٥٠" },
  { size: "L", bust: "١١٢", sleeve: "٦٠", length: "١٥٢" },
  { size: "XL", bust: "١٢٢", sleeve: "٦١", length: "١٥٤" },
  { size: "XXL", bust: "١٣٢", sleeve: "٦٢", length: "١٥٦" },
];

export function money(value: number) {
  return `${new Intl.NumberFormat("ar-EG").format(value)} ج.م`;
}

export function productBySlug(slug: string) {
  return PRODUCTS.find((item) => item.slug === slug);
}

export function categoryById(id: string) {
  return CATEGORIES.find((item) => item.id === id);
}

export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= STORE.freeShipping ? 0 : STORE.shippingFee;
}

export function whatsappLink(text: string) {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
}
