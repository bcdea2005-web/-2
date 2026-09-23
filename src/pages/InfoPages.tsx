import { FormEvent, useState } from "react";
import { PRODUCTS, SIZE_GUIDE, STORE, money, whatsappLink } from "../data/catalog";
import { ProductCard } from "../components/ProductCard";
import { useStore } from "../store";

export function StoryPage() {
  return (
    <div className="page">
      <img className="story-hero" src="/images/hero.jpg" alt="جلباب أسود من الخلف في رواق هادئ" />
      <div className="container" style={{ padding: "48px 0 72px" }}>
        <article className="prose">
          <p className="en">The house</p>
          <h1>خمارٌ ينساب فوق ياقوتة</h1>
          <p>
            سُمّيت الدار «سِتر» لأن الستر في لسان العرب وقاية وجمال معًا، لا إخفاءً يخجل من نفسه. أردنا اسمًا يُقال بسهولة، ويبقى معناه أكبر من اللافتة.
          </p>
          <p>
            الشعار الذي ترينه فوق الاسم ليس زخرفة. أعلاه خمار في حركة: قماش يرتفع ولا يتكسّر. وأسفله ياقوتة، حجر ثابت بلون واحد. هذا هو وعد الدار: انسياب في اللبس، وثبات في الهوية.
          </p>
          <h2>من مشغل في القاهرة</h2>
          <p>
            نفصّل في مشغل صغير، لا في خطٍّ لا نعرف أوله. العباية تُقاس على خطوة حقيقية: أن تصلي فيها، وأن تركبي، وأن تمشي في حرّ المدينة من غير أن تشدّي القماش كل دقيقتين.
          </p>
          <p>
            الدار تقصّ عباءات سوداء. الأزرق ليس لون الثوب، هو لون الشعار فقط: خيط رفيع على حافة الكم حين يلزم، لا أكثر. السواد هنا سكون، لا حداد.
          </p>
          <img className="prose-img" src="/images/black-pleat.jpg" alt="عباية سوداء بكسرات في المشغل" />
          <h2>ما لا نفعله</h2>
          <p>
            لا شعار مخيط على الصدر. لا أقمشة تشفّ في الشمس. لا قصّات تضيق ثم تُسمّى محتشمة. وإن احتجتِ طولًا غير الموجود في الجدول، نطوّله في المشغل ونكتب ذلك في الطلب.
          </p>
          <a className="btn btn-primary" href="#/shop">
            شاهدي الإصدار
          </a>
        </article>
      </div>
    </div>
  );
}

const LOOKS = [
  { src: "/images/hero.jpg", title: "جلباب السكون", href: "#/product/jilbab-sukoon", pos: "center 30%" },
  { src: "/images/black-closed.jpg", title: "عباية الإغلاق", href: "#/product/abaya-closed", pos: "center" },
  { src: "/images/black-khimar.jpg", title: "خمار ستر", href: "#/product/khimar-sitr", pos: "center 20%" },
  { src: "/images/black-open.jpg", title: "عباية القمر", href: "#/product/abaya-qamar", pos: "center" },
  { src: "/images/black-prayer.jpg", title: "إسدال السكينة", href: "#/product/prayer-black", pos: "center" },
  { src: "/images/black-wide.jpg", title: "عباية الكم", href: "#/product/abaya-wide", pos: "center" },
];

export function LookbookPage() {
  return (
    <div className="page container" style={{ paddingBottom: 72 }}>
      <header className="page-intro">
        <p className="en">The book</p>
        <h1>دفتر الأناقة</h1>
        <p>صور من الإصدار نفسه. لا عارضات كثيرات، ولا إضاءة ترفع الصوت. القماش هو الذي يتكلم.</p>
      </header>
      <div className="look-grid" style={{ marginTop: 28 }}>
        {LOOKS.map((look) => (
          <a key={look.href} href={look.href}>
            <img src={look.src} alt={look.title} style={{ objectPosition: look.pos }} />
            <span>{look.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function CarePage() {
  return (
    <div className="page container" style={{ paddingBottom: 72 }}>
      <header className="page-intro">
        <p className="en">Care</p>
        <h1>الشحن، الإرجاع، المقاس</h1>
      </header>
      <div className="split" style={{ marginTop: 28 }}>
        <div className="prose" style={{ width: "100%" }}>
          <h2>الشحن</h2>
          <p>نجهّز من القاهرة خلال يوم إلى يومين، ويصل الطلب داخل مصر خلال ٢ إلى ٥ أيام عمل. الشحن مجاني فوق {money(STORE.freeShipping)}، وغير ذلك {money(STORE.shippingFee)}.</p>
          <h2>الإرجاع</h2>
          <p>خلال ١٤ يومًا من الاستلام، للقطع غير المعدّلة وغير المُفصَّلة بطول خاص، بحالتها وبطاقتها. الطول المفصّل حسب طلبكِ لا يُرجَع إلا لعيب صناعة.</p>
          <h2>المقاس</h2>
          <p>القصّة واسعة. إن كنتِ بين مقاسين، خذي الأكبر. الطول القياسي بين ١٤٨ و١٥٦ سم حسب المقاس، ويُزاد مجانًا حتى ١٦٥ سم إذا كتبتِ ذلك في الملاحظات.</p>
        </div>
        <div className="panel">
          <h2>جدول سريع</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>المقاس</th>
                  <th>الصدر</th>
                  <th>الطول</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.size}>
                    <td>{row.size}</td>
                    <td>{row.bust}</td>
                    <td>{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note" style={{ marginTop: 12 }}>الأرقام بالسنتيمتر.</p>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <div className="page container" style={{ paddingBottom: 72 }}>
      <header className="page-intro">
        <p className="en">Write</p>
        <h1>تواصلي مع الدار</h1>
        <p>
          {STORE.city} · {STORE.hours}
        </p>
      </header>
      <div className="split" style={{ marginTop: 28 }}>
        {sent ? (
          <p className="ok-note">وصلت رسالتكِ. نردّ في ساعات العمل، غالبًا في اليوم نفسه.</p>
        ) : (
          <form className="form-grid" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="cname">الاسم</label>
              <input id="cname" required name="name" />
            </div>
            <div className="field">
              <label htmlFor="cphone">الهاتف</label>
              <input id="cphone" required name="phone" />
            </div>
            <div className="field">
              <label htmlFor="cmsg">الرسالة</label>
              <textarea id="cmsg" required name="message" rows={5} />
            </div>
            <button className="btn btn-primary" type="submit">
              أرسلي
            </button>
          </form>
        )}
        <aside className="panel">
          <h2>أو واتساب</h2>
          <p>للطلب السريع والمقاس، واتساب أسرع من البريد.</p>
          <a className="btn btn-navy" href={whatsappLink("السلام عليكم، أودّ الاستفسار عن ستر")} style={{ marginTop: 16 }}>
            افتحي واتساب
          </a>
          <p className="note" style={{ marginTop: 14 }}>
            @{STORE.instagram}
            <br />
            {STORE.email}
          </p>
        </aside>
      </div>
    </div>
  );
}

export function WishlistPage() {
  const { wish } = useStore();
  const items = PRODUCTS.filter((item) => wish.includes(item.id));
  return (
    <div className="page container" style={{ paddingBottom: 72 }}>
      <header className="page-intro">
        <p className="en">Saved</p>
        <h1>المفضلة</h1>
      </header>
      {items.length === 0 ? (
        <div className="empty">
          <h2>لا قطع محفوظة</h2>
          <p className="muted">اضغطي القلب على أي قطعة لتعودي إليها.</p>
          <a className="btn btn-primary" href="#/shop" style={{ marginTop: 12 }}>
            المجموعة
          </a>
        </div>
      ) : (
        <div className="product-grid" style={{ marginTop: 28 }}>
          {items.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
