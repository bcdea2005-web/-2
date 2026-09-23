import { FormEvent, useState } from "react";
import { CATEGORIES, PRODUCTS, TESTIMONIALS, money } from "../data/catalog";
import { Gem, Logo } from "../components/Logo";
import { ProductCard } from "../components/ProductCard";

const TICKER = ["كريب لا يشفّ", "حرير مغسول", "قصّات للصلاة", "خياطة في القاهرة", "لون الياقوت", "إصدارات هادئة"];

export function Home() {
  const featured = PRODUCTS.filter((item) => item.featured).slice(0, 5);
  const [joined, setJoined] = useState(false);

  const onJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJoined(true);
  };

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="en">SITR · Cairo</p>
          <h1>سترٌ يليق بكِ</h1>
          <p className="lede">
            عباءات إسلامية سوداء تُفصَّل بهدوء: قصّة واسعة، قماش لا يشفّ، ولمسة ياقوت صغيرة من الشعار.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#/shop">
              تسوّقي المجموعة
            </a>
            <a className="btn btn-ghost" href="#/story">
              قصّة الشعار
            </a>
          </div>
          <ul className="hero-facts">
            <li>
              <strong>{PRODUCTS.length.toLocaleString("ar-EG")}</strong>
              <span>قطع في الإصدار</span>
            </li>
            <li>
              <strong>١٤</strong>
              <span>يومًا للإرجاع</span>
            </li>
            <li>
              <strong>مجاني</strong>
              <span>شحن فوق ٢٬٥٠٠ جنيه</span>
            </li>
          </ul>
        </div>
        <div className="hero-media">
          <img src="/images/hero.jpg" alt="جلباب الياقوت في رواق من الرخام" />
          <span className="hero-frame" />
          <a className="hero-caption" href="#/product/jilbab-sukoon">
            <span>جلباب السكون</span>
            <strong>{money(5450)}</strong>
          </a>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...TICKER, ...TICKER].map((item, index) => (
            <span key={`${item}-${index}`}>
              <Gem />
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="en">Collections</p>
              <h2>أربعة قصّات سوداء</h2>
            </div>
          </div>
          <div className="cats">
            {CATEGORIES.map((cat) => (
              <a className="cat-card" href={`#/shop/${cat.id}`} key={cat.id}>
                <img src={cat.image} alt="" />
                <div>
                  <p className="en">{cat.en}</p>
                  <h3>{cat.name}</h3>
                  <p>{cat.blurb}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="en">The House Edit</p>
              <h2>مختارات الدار</h2>
            </div>
            <a href="#/shop">كل القطع</a>
          </div>
          <div className="edit-grid">
            {featured.map((product, index) => (
              <ProductCard key={product.id} product={product} large={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="container manifesto-inner">
          <div className="seal">
            <a href="#/" aria-label="ستر للزي الإسلامي">
              <Logo variant="stack" />
            </a>
          </div>
          <div>
            <p className="en">The mark</p>
            <h2>الستر وقاية وجمال معًا، لا إخفاء.</h2>
            <p>
              سُمّيت الدار بهذا الاسم لأن الستر في لسان العرب حفظٌ ووقار. الشعار خمارٌ ينساب فوق ياقوتة: حركة القماش، ثم ثبات اللون. من هذا الأزرق نخيط، وإليه نعود في كل مجموعة.
            </p>
            <a className="btn btn-ghost" href="#/story">
              اقرئي الحكاية
            </a>
          </div>
        </div>
      </section>

      <section className="band">
        <img src="/images/black-open.jpg" alt="" />
        <div className="band-copy">
          <p className="en">Limited</p>
          <h2>عباية القمر</h2>
          <p>عباءة سوداء مفتوحة فوق فستان أسود، وحافة رفيعة من أزرق الشعار.</p>
          <a className="btn btn-navy" href="#/product/abaya-qamar">
            اطلبيها
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="en">The hand</p>
              <h2>ثلاثة وعود</h2>
            </div>
          </div>
          <div className="craft-grid">
            <article className="craft-item">
              <em>01</em>
              <h3>القماش</h3>
              <p>كريب لا يشفّ في شمس القاهرة، وحرير مغسول لا يلمع لمعان السوق، ولنن خفيف للصلاة والسفر.</p>
            </article>
            <article className="craft-item">
              <em>02</em>
              <h3>القصّة</h3>
              <p>واسعة عند الكتف والخطوة. لا تضيق في السجود، ولا تحتاجين أن تشدّيها وأنتِ تمشين.</p>
            </article>
            <article className="craft-item">
              <em>03</em>
              <h3>اللمسة</h3>
              <p>خيط ياقوتي واحد حيث يلزم. لا تطريز يرفع صوته على القماش، ولا شعار مخيط على الصدر.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="en">From the houses</p>
              <h2>مما كُتب إلينا</h2>
            </div>
          </div>
          <div className="quotes">
            {TESTIMONIALS.map((item) => (
              <figure className="quote" key={item.name}>
                <Gem />
                <p>«{item.quote}»</p>
                <span>
                  {item.name} · {item.city}
                </span>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="newsletter">
            <div>
              <p className="en">The letter</p>
              <h2>رسالة الدار</h2>
              <p className="muted">إصدارات قليلة، لا رسائل كل يوم. نكتب حين تخرج مجموعة جديدة.</p>
            </div>
            {joined ? (
              <p className="ok-note">وصلتْ رسالتكِ. سنكتب حين يحين الإصدار التالي.</p>
            ) : (
              <form onSubmit={onJoin}>
                <input required type="email" placeholder="بريدكِ" aria-label="البريد" />
                <button className="btn btn-primary" type="submit">
                  أبلغيني
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
