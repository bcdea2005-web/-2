import { Heart } from "lucide-react";
import { money, type Product } from "../data/catalog";
import { useStore } from "../store";

const FOCUS: Record<string, string> = {
  "jilbab-sukoon": "center 30%",
  "khimar-sitr": "center 18%",
  "abaya-hood": "center 40%",
};

export function ProductCard({ product, large = false }: { product: Product; large?: boolean }) {
  const { wish, toggleWish } = useStore();
  const wished = wish.includes(product.id);
  return (
    <article className={`pcard ${large ? "pcard-large" : ""}`}>
      <a className="pcard-media" href={`#/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          style={{ objectPosition: FOCUS[product.id] || "center" }}
        />
        {product.badge ? <span className="badge">{product.badge}</span> : null}
      </a>
      <button
        type="button"
        className={`wish ${wished ? "wish-on" : ""}`}
        aria-label={wished ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        aria-pressed={wished}
        onClick={() => toggleWish(product.id)}
      >
        <Heart size={16} strokeWidth={1.6} fill={wished ? "currentColor" : "none"} />
      </button>
      <div className="pcard-body">
        <a href={`#/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </a>
        <p>
          <span>{product.fabric}</span>
          <span className="dot" />
          <span>{product.color.name}</span>
        </p>
        <strong>{money(product.price)}</strong>
      </div>
    </article>
  );
}
