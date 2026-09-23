import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, shippingFor, type Product } from "./data/catalog";

export type CartLine = { id: string; size: string; qty: number };

export type Route =
  | { page: "home" }
  | { page: "shop"; cat?: string; q?: string }
  | { page: "product"; slug: string }
  | { page: "cart" }
  | { page: "checkout" }
  | { page: "success"; id: string }
  | { page: "story" }
  | { page: "lookbook" }
  | { page: "contact" }
  | { page: "care" }
  | { page: "wishlist" };

export type Order = {
  id: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
  payment: "cod" | "instapay";
  lines: { id: string; size: string; qty: number; name: string; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
};

type StoreValue = {
  route: Route;
  cart: CartLine[];
  wish: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  sizeOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
  setSizeOpen: (open: boolean) => void;
  add: (id: string, size: string, qty?: number) => void;
  setQty: (id: string, size: string, qty: number) => void;
  remove: (id: string, size: string) => void;
  toggleWish: (id: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  lines: (CartLine & { product: Product })[];
};

const StoreContext = createContext<StoreValue | null>(null);

const TITLES: Record<Route["page"], string> = {
  home: "ستر | للزي الإسلامي",
  shop: "المجموعة | ستر",
  product: "القطعة | ستر",
  cart: "الحقيبة | ستر",
  checkout: "إتمام الطلب | ستر",
  success: "تم استلام الطلب | ستر",
  story: "قصة الدار | ستر",
  lookbook: "دفتر الأناقة | ستر",
  contact: "تواصلي | ستر",
  care: "العناية والشحن | ستر",
  wishlist: "المفضلة | ستر",
};

export function parseHash(hash: string): Route {
  const raw = (hash || "#/").replace(/^#/, "");
  const [path, query = ""] = raw.split("?");
  const params = new URLSearchParams(query);
  const parts = path.split("/").filter(Boolean);
  const q = params.get("q") || undefined;
  if (parts.length === 0) return { page: "home" };
  switch (parts[0]) {
    case "shop":
      return { page: "shop", cat: parts[1], q };
    case "product":
      return parts[1]
        ? { page: "product", slug: decodeURIComponent(parts[1]) }
        : { page: "shop" };
    case "success":
      return { page: "success", id: decodeURIComponent(parts[1] || "") };
    case "cart":
    case "checkout":
    case "story":
    case "lookbook":
    case "contact":
    case "care":
    case "wishlist":
      return { page: parts[0] };
    default:
      return { page: "home" };
  }
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? { page: "home" } : parseHash(window.location.hash),
  );
  const [cart, setCart] = useState<CartLine[]>(() => load("sitr-cart", []));
  const [wish, setWish] = useState<string[]>(() => load("sitr-wish", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash(window.location.hash));
      setMenuOpen(false);
      setSearchOpen(false);
      setCartOpen(false);
      setSizeOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.title = TITLES[route.page];
  }, [route]);

  useEffect(() => {
    localStorage.setItem("sitr-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("sitr-wish", JSON.stringify(wish));
  }, [wish]);

  useEffect(() => {
    const locked = cartOpen || searchOpen || menuOpen || sizeOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen, menuOpen, sizeOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setCartOpen(false);
      setSearchOpen(false);
      setMenuOpen(false);
      setSizeOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const add = (id: string, size: string, qty = 1) => {
    setCart((prev) => {
      const index = prev.findIndex((line) => line.id === id && line.size === size);
      const product = PRODUCTS.find((item) => item.id === id);
      const max = product?.limited ?? 5;
      if (index === -1) return [...prev, { id, size, qty: Math.min(max, qty) }];
      const next = [...prev];
      next[index] = {
        ...next[index],
        qty: Math.min(max, next[index].qty + qty),
      };
      return next;
    });
    setCartOpen(true);
  };

  const setQty = (id: string, size: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((line) => (line.id === id && line.size === size ? { ...line, qty } : line))
        .filter((line) => line.qty > 0),
    );
  };

  const remove = (id: string, size: string) => {
    setCart((prev) => prev.filter((line) => !(line.id === id && line.size === size)));
  };

  const toggleWish = (id: string) => {
    setWish((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const clearCart = () => setCart([]);

  const lines = useMemo(
    () =>
      cart
        .map((line) => {
          const product = PRODUCTS.find((item) => item.id === line.id);
          return product ? { ...line, product } : null;
        })
        .filter((line): line is CartLine & { product: Product } => line !== null),
    [cart],
  );

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;
  const count = lines.reduce((sum, line) => sum + line.qty, 0);

  const value: StoreValue = {
    route,
    cart,
    wish,
    cartOpen,
    searchOpen,
    menuOpen,
    sizeOpen,
    setCartOpen,
    setSearchOpen,
    setMenuOpen,
    setSizeOpen,
    add,
    setQty,
    remove,
    toggleWish,
    clearCart,
    count,
    subtotal,
    shipping,
    total,
    lines,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used within StoreProvider");
  return value;
}
