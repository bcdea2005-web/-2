import { useState } from "react";
import { Heart } from "lucide-react";
import { PRODUCTS, categoryById, money, productBySlug, whatsappLink } from "../data/catalog";
import { ProductCard } from "../components/ProductCard";
import { useStore } from "../store";

const FOCUS: Record<string, string> = {
  "jilbab-sukoon": "center 30%",
  "prayer-black": "center",
  "khimar-sitr": "center 20%",
};

export function ProductPage({ slug }: { slug: string }) {
  const product = productBySlug(slug);
  const store = useStore();
  const [size, setSize] = useState(product && product.sizes.length === 1 ? product.sizes[0] : "");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="page container empty">
        <h2>هذه القطعة غير موجودة</h2>
        <a className="btn btn-primary" href="#/shop">
          عودي إلى المجموعة
        </a>
      </div>
    );
  }

  const wished = store.wish.includes(product.id);
  const related = PRODUCTS.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const ready = Boolean(size);

  return (
    <div className="page container">
      <p className="note" style={{ paddingTop: 22 }}>
        <a href="#/shop">المجموعة</a>
        {" / "}
        <a href={`#/shop/${product.category}`}>{categoryById(product.category)?.name}</a>
      </p>
      <article className="pdp">
        <div className="pdp-gallery">
          <img
            src={product.image}
            alt={product.name}
            style={{ objectPosition: FOCUS[product.id] || "center" }}
          />
        </div>
        <div className="pdp-info">
          <p className="en">{product.nameEn}</p>
          <h1>{product.name}</h1>
          <strong className="price">{money(product.price)}</strong>
          <p>{product.description}</p>
          <div className="swatch">
            <i style={{ background: product.color.hex }} />
            {product.color.name}
          </div>
          <div className="row-between">
            <span>المقاس</span>
            <button type="button" className="text-btn" onClick={() => store.setSizeOpen(true)}>
              دليل المقاس
            </button>
          </div>
          <div className="size-row">
            {product.sizes.map((item) => (
              <button
                type="button"
                key={item}
                className={`size-btn ${size === item ? "size-on" : ""}`}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
          {product.limited ? <p className="limited">تبقّى {product.limited.toLocaleString("ar-EG")} قطع من هذا الإصدار.</p> : null}
          <div className="pdp-actions">
            <button
              type="button"
              className="btn btn-primary btn-wide"
              disabled={!ready}
              onClick={() => store.add(product.id, size, qty)}
            >
              {ready ? "أضيفي إلى الحقيبة" : "اختاري المقاس"}
            </button>
            <a
              className="btn btn-line btn-wide"
              href={whatsappLink(`السلام عليكم، أودّ طلب ${product.name} مقاس ${size || "—"} من ستر.`)}
            >
              اطلبي عبر واتساب
            </a>
            <button type="button" className="btn btn-ghost btn-wide" onClick={() => store.toggleWish(product.id)}>
              <Heart size={16} fill={wished ? "currentColor" : "none"} />
              {wished ? "في المفضلة" : "احفظيها للمفضلة"}
            </button>
          </div>
          <label className="note">
            الكمية
            <select value={qty} onChange={(event) => setQty(Number(event.target.value))} aria-label="الكمية" style={{ marginInlineStart: 8 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <div style={{ marginTop: 18 }}>
            <details className="acc" open>
              <summary>التفاصيل</summary>
              <ul>
                {product.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
            <details className="acc">
              <summary>القماش: {product.fabric}</summary>
              <ul>
                {product.care.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
            <details className="acc">
              <summary>الشحن والإرجاع</summary>
              <p>شحن داخل مصر خلال ٢ إلى ٥ أيام. مجاني فوق ٢٬٥٠٠ جنيه، وغير ذلك ٧٠ جنيهًا. الإرجاع خلال ١٤ يومًا للقطع غير المعدّلة، بحالتها وبطاقتها.</p>
            </details>
          </div>
        </div>
      </article>
      {related.length > 0 ? (
        <section style={{ paddingBottom: 72 }}>
          <div className="section-head">
            <div>
              <p className="en">With it</p>
              <h2>يكمل الإطلالة</h2>
            </div>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
