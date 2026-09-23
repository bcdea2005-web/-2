import { FormEvent, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { CITIES, STORE, money, whatsappLink } from "../data/catalog";
import { useStore, type Order } from "../store";

export function CartPage() {
  const store = useStore();
  return (
    <div className="page container">
      <header className="page-intro">
        <p className="en">The bag</p>
        <h1>الحقيبة</h1>
      </header>
      {store.lines.length === 0 ? (
        <div className="empty">
          <h2>لا قطع بعد</h2>
          <a className="btn btn-primary" href="#/shop">
            تسوّقي المجموعة
          </a>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {store.lines.map((line) => (
              <div className="line" key={`${line.id}-${line.size}`}>
                <img src={line.product.image} alt="" />
                <div>
                  <h3>{line.product.name}</h3>
                  <p className="muted">
                    {line.product.color.name} · {line.size}
                  </p>
                  <strong>{money(line.product.price)}</strong>
                  <div className="row-between">
                    <div className="qty">
                      <button type="button" aria-label="إنقاص" onClick={() => store.setQty(line.id, line.size, line.qty - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{line.qty}</span>
                      <button type="button" aria-label="زيادة" onClick={() => store.setQty(line.id, line.size, Math.min(line.product.limited ?? 5, line.qty + 1))}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button type="button" className="text-btn" onClick={() => store.remove(line.id, line.size)}>
                      إزالة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="summary">
            <h2>الملخص</h2>
            <div className="summary-row">
              <span>القطع</span>
              <span>{money(store.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>الشحن</span>
              <span>{store.shipping === 0 ? "مجاني" : money(store.shipping)}</span>
            </div>
            <div className="summary-row total">
              <span>الإجمالي</span>
              <span>{money(store.total)}</span>
            </div>
            <a className="btn btn-primary btn-wide" href="#/checkout" style={{ marginTop: 14 }}>
              إتمام الطلب
            </a>
            <p className="note" style={{ marginTop: 10 }}>
              الدفع عند الاستلام أو تحويل إنستاباي بعد تأكيد الدار.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

type Errors = Partial<Record<"name" | "phone" | "city" | "address", string>>;

function validPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^(01\d{9}|201\d{9})$/.test(digits);
}

export function CheckoutPage() {
  const store = useStore();
  const [payment, setPayment] = useState<"cod" | "instapay">("cod");
  const [errors, setErrors] = useState<Errors>({});

  if (store.lines.length === 0) {
    return (
      <div className="page container empty">
        <h2>الحقيبة فارغة</h2>
        <a className="btn btn-primary" href="#/shop">
          إلى المجموعة
        </a>
      </div>
    );
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const city = String(data.get("city") || "").trim();
    const address = String(data.get("address") || "").trim();
    const notes = String(data.get("notes") || "").trim();
    const next: Errors = {};
    if (name.length < 3) next.name = "اكتبي اسمكِ الكريم.";
    if (!validPhone(phone)) next.phone = "رقم مصري مكوّن من ١١ رقمًا، مثل ٠١٠xxxxxxxx.";
    if (!city) next.city = "اختاري المدينة.";
    if (address.length < 8) next.address = "العنوان يحتاج شارعًا وعلامة.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const id = `ستر-${Math.floor(1000 + Math.random() * 9000)}`;
    const order: Order = {
      id,
      name,
      phone,
      city,
      address,
      notes,
      payment,
      lines: store.lines.map((line) => ({
        id: line.id,
        size: line.size,
        qty: line.qty,
        name: line.product.name,
        price: line.product.price,
      })),
      subtotal: store.subtotal,
      shipping: store.shipping,
      total: store.total,
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem("sitr-last-order", JSON.stringify(order));
    const previous = JSON.parse(localStorage.getItem("sitr-orders") || "[]") as Order[];
    localStorage.setItem("sitr-orders", JSON.stringify([order, ...previous].slice(0, 12)));
    store.clearCart();
    window.location.hash = `#/success/${encodeURIComponent(id)}`;
  };

  return (
    <div className="page container">
      <header className="page-intro">
        <p className="en">Checkout</p>
        <h1>إتمام الطلب</h1>
        <p>نجهّز القطعة في القاهرة، ونوصلها إلى بابكِ. لا نطلب بيانات بطاقة.</p>
      </header>
      <form className="checkout" onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">الاسم</label>
            <input id="name" name="name" autoComplete="name" />
            {errors.name ? <span className="field-error">{errors.name}</span> : null}
          </div>
          <div className="field">
            <label htmlFor="phone">الهاتف</label>
            <input id="phone" name="phone" inputMode="tel" autoComplete="tel" placeholder="01xxxxxxxxx" />
            {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
          </div>
          <div className="field">
            <label htmlFor="city">المدينة</label>
            <select id="city" name="city" defaultValue="">
              <option value="" disabled>
                اختاري
              </option>
              {CITIES.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
            {errors.city ? <span className="field-error">{errors.city}</span> : null}
          </div>
          <div className="field">
            <label htmlFor="address">العنوان</label>
            <textarea id="address" name="address" rows={3} />
            {errors.address ? <span className="field-error">{errors.address}</span> : null}
          </div>
          <div className="field">
            <label htmlFor="notes">ملاحظات الطول أو الهدية</label>
            <textarea id="notes" name="notes" rows={2} placeholder="مثال: الطول ١٦٠ سم" />
          </div>
          <div className="field">
            <span>طريقة الدفع</span>
            <div className="pay-options">
              <button type="button" className={`pay-opt ${payment === "cod" ? "pay-on" : ""}`} onClick={() => setPayment("cod")}>
                <strong>الدفع عند الاستلام</strong>
                <p className="muted">تدفعين للمندوب بعد معاينة الشحنة.</p>
              </button>
              <button type="button" className={`pay-opt ${payment === "instapay" ? "pay-on" : ""}`} onClick={() => setPayment("instapay")}>
                <strong>إنستاباي</strong>
                <p className="muted">يصل رقم التحويل بعد تأكيد الطلب على واتساب.</p>
              </button>
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            تأكيد الطلب · {money(store.total)}
          </button>
        </div>
        <aside className="summary">
          <h2>طلبكِ</h2>
          {store.lines.map((line) => (
            <div className="summary-row" key={`${line.id}-${line.size}`}>
              <span>
                {line.product.name} · {line.size} × {line.qty}
              </span>
              <span>{money(line.product.price * line.qty)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>الشحن</span>
            <span>{store.shipping === 0 ? "مجاني" : money(store.shipping)}</span>
          </div>
          <div className="summary-row total">
            <span>الإجمالي</span>
            <span>{money(store.total)}</span>
          </div>
          <p className="note">مجاني فوق {money(STORE.freeShipping)} داخل مصر.</p>
        </aside>
      </form>
    </div>
  );
}

export function SuccessPage({ id }: { id: string }) {
  let order: Order | null = null;
  try {
    const raw = sessionStorage.getItem("sitr-last-order");
    order = raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    order = null;
  }
  const current = order && order.id === id ? order : null;
  const text = current
    ? `طلب ${current.id}\n${current.name} · ${current.phone}\n${current.city} — ${current.address}\n${current.lines.map((line) => `${line.name} / ${line.size} × ${line.qty}`).join("\n")}\nالإجمالي ${current.total} جنيه\nالدفع: ${current.payment === "cod" ? "عند الاستلام" : "إنستاباي"}`
    : `طلب ${id} من ستر`;

  return (
    <div className="page container">
      <div className="success-card">
        <p className="en">Received</p>
        <h1>وصل طلبكِ</h1>
        <p className="order-id">{id}</p>
        <p>نحفظ الطلب على هذا الجهاز للعرض، ونؤكده معكِ على واتساب قبل التجهيز. لا يُخصم شيء الآن.</p>
        {current ? (
          <div style={{ textAlign: "start", margin: "18px 0" }}>
            {current.lines.map((line) => (
              <div className="summary-row" key={`${line.id}-${line.size}`}>
                <span>
                  {line.name} · {line.size} × {line.qty}
                </span>
                <span>{money(line.price * line.qty)}</span>
              </div>
            ))}
            <div className="summary-row total">
              <span>الإجمالي</span>
              <span>{money(current.total)}</span>
            </div>
          </div>
        ) : null}
        <a className="btn btn-primary" href={whatsappLink(text)}>
          أرسلي الطلب على واتساب
        </a>
        <div style={{ marginTop: 12 }}>
          <a className="text-btn" href="#/shop">
            عودة إلى المجموعة
          </a>
        </div>
      </div>
    </div>
  );
}
