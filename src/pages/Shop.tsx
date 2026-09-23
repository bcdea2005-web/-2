import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, categoryById } from "../data/catalog";
import { ProductCard } from "../components/ProductCard";

export function Shop({ cat, q }: { cat?: string; q?: string }) {
  const [sort, setSort] = useState("featured");
  const category = cat ? categoryById(cat) : undefined;

  const items = useMemo(() => {
    let list = PRODUCTS.filter((item) => {
      const inCat = !cat || item.category === cat;
      const query = (q || "").trim();
      const inQuery =
        !query ||
        `${item.name} ${item.fabric} ${item.color.name} ${item.description}`.includes(query);
      return inCat && inQuery;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "new") list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return list;
  }, [cat, q, sort]);

  return (
    <div className="page container">
      <header className="page-intro">
        <p className="en">{category?.en || "The Collection"}</p>
        <h1>{q ? `نتائج «${q}»` : category?.name || "المجموعة"}</h1>
        <p>{category?.blurb || "إصدار الدار الحالي: قطع قليلة، كل واحدة بمكانها."}</p>
      </header>
      <div className="toolbar">
        <div className="chips" role="tablist" aria-label="التصنيف">
          <a className={`chip ${!cat ? "chip-on" : ""}`} href="#/shop">
            الكل
          </a>
          {CATEGORIES.map((item) => (
            <a key={item.id} className={`chip ${cat === item.id ? "chip-on" : ""}`} href={`#/shop/${item.id}`}>
              {item.name}
            </a>
          ))}
        </div>
        <label>
          <span className="note">الترتيب</span>
          <select className="sort" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="ترتيب القطع">
            <option value="featured">مختارات الدار</option>
            <option value="new">الجديد</option>
            <option value="price-asc">السعر: الأقل</option>
            <option value="price-desc">السعر: الأعلى</option>
          </select>
        </label>
      </div>
      <p className="note" style={{ marginBottom: 18 }}>
        {items.length.toLocaleString("ar-EG")} قطع
      </p>
      {items.length === 0 ? (
        <div className="empty">
          <h2>لا قطع هنا</h2>
          <p className="muted">جرّبي كلمة أخرى، أو عودي إلى المجموعة كاملة.</p>
          <a className="btn btn-primary" href="#/shop" style={{ marginTop: 16 }}>
            المجموعة
          </a>
        </div>
      ) : (
        <div className="product-grid" style={{ paddingBottom: 72 }}>
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
