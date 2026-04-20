import { useState } from 'react'
import { useApp, ScreenHeader, ChipRow, Placeholder, Sheet } from '../ui'
import { SHOP_ITEMS, SHOP_CATEGORIES } from '../data'

/* Shop — boutique (no checkout, request to room) */

const ShopScreen = () => {
  const { toast, addReservation } = useApp();
  const [cat, setCat] = useState("Tudo");
  const [viewing, setViewing] = useState(null);

  const items = SHOP_ITEMS.filter(i => cat === "Tudo" || i.cat === cat);

  const requestToRoom = (item) => {
    addReservation({
      id: "shop-" + Date.now(),
      title: item.title,
      subtitle: `Boutique · ${item.price} · cobrado no check-out`,
      status: "pendente",
      type: "boutique",
    });
    toast(`${item.title} — a caminho`);
    setViewing(null);
  };

  return (
    <div className="fade-in">
      <ScreenHeader
        eyebrow="Boutique"
        title={<>A <em>casa</em>, para levar</>}
        subtitle="Produtos selecionados. Peça para o quarto — cobrado na saída."
      />

      <ChipRow
        items={SHOP_CATEGORIES.map(c => ({ id: c, label: c }))}
        active={cat}
        onPick={setCat}
      />

      <div style={{ padding: "14px var(--pad-screen) 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {items.map(item => (
          <div key={item.id} className="press" onClick={() => setViewing(item)}>
            <div style={{ position: "relative", height: 220, borderRadius: 16, overflow: "hidden", marginBottom: 8 }}>
              <Placeholder grad={item.grad} label={item.label} />
            </div>
            <div className="t-h3" style={{ fontSize: 14 }}>{item.title}</div>
            <div className="t-xs" style={{ marginTop: 2 }}>{item.subtitle}</div>
            <div className="t-sm" style={{ marginTop: 6, color: "var(--ink-1)", fontWeight: 500 }}>{item.price}</div>
          </div>
        ))}
      </div>

      <Sheet open={!!viewing} onClose={() => setViewing(null)}>
        {viewing && (
          <div>
            <div style={{ height: 260, margin: "12px 20px 0", borderRadius: 20, overflow: "hidden" }}>
              <Placeholder grad={viewing.grad} label={viewing.label} />
            </div>
            <div style={{ padding: "20px 24px 28px" }}>
              <div className="t-eyebrow" style={{ marginBottom: 6 }}>{viewing.cat}</div>
              <div className="t-display" style={{ fontSize: 28, marginBottom: 6 }}>{viewing.title}</div>
              <div className="t-body" style={{ marginBottom: 10 }}>{viewing.subtitle}</div>
              <div className="t-h2" style={{ marginBottom: 20 }}>{viewing.price}</div>
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => requestToRoom(viewing)}>
                Pedir para o quarto
              </button>
              <div className="t-xs" style={{ textAlign: "center", marginTop: 10 }}>
                Pagamento adicionado ao check-out
              </div>
            </div>
          </div>
        )}
      </Sheet>

      <div style={{ height: 20 }} />
    </div>
  );
};

export default ShopScreen
