import { FormEvent, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Heart, Menu, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import {
  CATEGORIES,
  PRODUCTS,
  SIZE_GUIDE,
  STORE,
  money,
  whatsappLink,
} from "../data/catalog";
import { useStore } from "../store";
import { Gem, Logo } from "./Logo";

const LINKS = [
  { href: "#/shop", label: "المجموعة" },
  { href: "#/shop/abayas", label: "المغلقة" },
  { href: "#/story", label: "القصة" },
  { href: "#/lookbook", label: "الدفتر" },
];

export function Layout({ children }: { children: ReactNode }) {
  const store = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (store.searchOpen) inputRef.current?.focus();
  }, [store.searchOpen]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return PRODUCTS.slice(0, 5);
    return PRODUCTS.filter((item) =>
      `${item.name} ${item.nameEn} ${item.fabric} ${item.color.name} ${item.description}`.includes(q),
    ).slice(0, 6);
  }, [query]);

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    window.location.hash = q ? `#/shop?q=${encodeURIComponent(q)}` : "#/shop";
  };

  return (
    <>
      <div className="announce">
        <p className="announce-long">شحن مجاني داخل مصر للطلبات فوق ٢٬٥٠٠ جنيه · الطول يُفصَّل عند الطلب · إرجاع ١٤ يومًا</p>
        <p className="announce-short">شحن مجاني فوق ٢٬٥٠٠ جنيه</p>
      </div>
      <header className="nav">
        <div className="nav-inner">
          <nav className="nav-links" aria-label="التنقل">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <button type="button" className="menu-btn" aria-label="القائمة" onClick={() => store.setMenuOpen(true)}>
            <Menu size={22} strokeWidth={1.5} />
          </button>
          <a href="#/" aria-label="ستر للزي الإسلامي">
            <Logo />
          </a>
          <div className="nav-tools">
            <button type="button" className="icon-btn" aria-label="بحث" onClick={() => store.setSearchOpen(true)}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <a className="icon-btn" href="#/wishlist" aria-label="المفضلة">
              <Heart size={20} strokeWidth={1.5} fill={store.wish.length ? "currentColor" : "none"} />
              {store.wish.length > 0 ? <span className="count">{store.wish.length}</span> : null}
            </a>
            <button type="button" className="icon-btn" aria-label="الحقيبة" onClick={() => store.setCartOpen(true)}>
              <ShoppingBag size={20} strokeWidth={1.5} />
              {store.count > 0 ? <span className="count">{store.count}</span> : null}
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Logo variant="stack" />
            <p style={{ marginTop: 16 }}>دار أزياء إسلامية في القاهرة. قصّات واسعة، وأزرق الياقوت الذي لا يتبدّل.</p>
          </div>
          <div>
            <h3>التسوّق</h3>
            {CATEGORIES.map((cat) => (
              <a key={cat.id} href={`#/shop/${cat.id}`}>
                {cat.name}
              </a>
            ))}
          </div>
          <div>
            <h3>الدار</h3>
            <a href="#/story">القصة</a>
            <a href="#/lookbook">دفتر الأناقة</a>
            <a href="#/care">الشحن والمقاسات</a>
            <a href="#/contact">تواصلي</a>
          </div>
          <div>
            <h3>الخدمة</h3>
            <p>{STORE.city}</p>
            <p>{STORE.hours}</p>
            <p style={{ marginTop: 8 }}>@{STORE.instagram}</p>
            <a href={whatsappLink("السلام عليكم، أودّ الاستفسار عن مجموعة ستر")}>واتساب الدار</a>
          </div>
        </div>
        <div className="container footer-base">
          <span>© {new Date().getFullYear()} ستر للزي الإسلامي</span>
          <span>صُنع بهدوء في القاهرة</span>
        </div>
      </footer>

      {store.cartOpen ? (
        <button type="button" className="backdrop" aria-label="إغلاق الحقيبة" onClick={() => store.setCartOpen(false)} />
      ) : null}
      <aside className={`drawer ${store.cartOpen ? "open" : ""}`} aria-hidden={!store.cartOpen} inert={!store.cartOpen}>
        <div className="drawer-head">
          <h2>الحقيبة</h2>
          <button type="button" className="icon-btn" aria-label="إغلاق" onClick={() => store.setCartOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          {store.lines.length === 0 ? (
            <div className="empty">
              <Gem />
              <h2>فارغة بهدوء</h2>
              <p className="muted">اختاري قطعة من المجموعة.</p>
              <a className="btn btn-primary" href="#/shop" style={{ marginTop: 16 }}>
                إلى المجموعة
              </a>
            </div>
          ) : (
            store.lines.map((line) => (
              <div className="mini-line" key={`${line.id}-${line.size}`}>
                <img src={line.product.image} alt="" />
                <div>
                  <h3>{line.product.name}</h3>
                  <p className="muted">
                    {line.size} · {money(line.product.price)}
                  </p>
                  <div className="row-between">
                    <div className="qty">
                      <button type="button" aria-label="إنقاص" onClick={() => store.setQty(line.id, line.size, line.qty - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{line.qty}</span>
                      <button type="button" aria-label="زيادة" onClick={() => store.setQty(line.id, line.size, line.qty + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button type="button" className="text-btn" onClick={() => store.remove(line.id, line.size)}>
                      إزالة
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {store.lines.length > 0 ? (
          <div className="drawer-foot">
            <div className="row-between">
              <span>المجموع</span>
              <strong>{money(store.subtotal)}</strong>
            </div>
            <p className="note">
              {store.shipping === 0 ? "الشحن مجاني لهذه الحقيبة." : `يتبقى ${money(STORE.freeShipping - store.subtotal)} للشحن المجاني.`}
            </p>
            <a className="btn btn-primary btn-wide" href="#/checkout">
              إتمام الطلب
            </a>
            <a className="btn btn-line btn-wide" href="#/cart">
              مراجعة الحقيبة
            </a>
          </div>
        ) : null}
      </aside>

      <div className={`menu-panel ${store.menuOpen ? "open" : ""}`}>
        <div className="panel-head">
          <Logo />
          <button type="button" className="icon-btn" aria-label="إغلاق" onClick={() => store.setMenuOpen(false)}>
            <X size={22} />
          </button>
        </div>
        <nav className="menu-links">
          {[...LINKS, { href: "#/contact", label: "تواصلي" }, { href: "#/care", label: "العناية" }].map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={`search-panel ${store.searchOpen ? "open" : ""}`}>
        <div className="panel-head">
          <h2>ابحثي في الدار</h2>
          <button type="button" className="icon-btn" aria-label="إغلاق" onClick={() => store.setSearchOpen(false)}>
            <X size={22} />
          </button>
        </div>
        <form className="search-form" onSubmit={onSearch}>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="عباية، طرح، صلاة…"
            aria-label="بحث"
          />
        </form>
        <div className="search-results">
          {results.length === 0 ? <p className="muted">لا قطع بهذا الاسم.</p> : null}
          {results.map((item) => (
            <a className="search-hit" key={item.id} href={`#/product/${item.slug}`}>
              <img src={item.image} alt="" />
              <span>
                <strong>{item.name}</strong>
                <br />
                <span className="muted">{item.fabric}</span>
              </span>
              <span>{money(item.price)}</span>
            </a>
          ))}
        </div>
      </div>

      <div
        className={`modal ${store.sizeOpen ? "open" : ""}`}
        role="dialog"
        aria-modal={store.sizeOpen}
        aria-hidden={!store.sizeOpen}
        aria-labelledby="size-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) store.setSizeOpen(false);
        }}
      >
        <div className="modal-card">
          <div className="row-between">
            <h2 id="size-title">دليل المقاس</h2>
            <button type="button" className="icon-btn" aria-label="إغلاق" onClick={() => store.setSizeOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <p className="muted">قياسات تقريبية بالسنتيمتر لقصّة واسعة. الطول يُزاد مجانًا حتى ١٦٥ سم في ملاحظات الطلب.</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>المقاس</th>
                  <th>الصدر</th>
                  <th>الكم</th>
                  <th>الطول</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.size}>
                    <td>{row.size}</td>
                    <td>{row.bust}</td>
                    <td>{row.sleeve}</td>
                    <td>{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
