/* Detail — full-screen modal for any explore item */

const DetailScreen = ({ item, onClose }) => {
  const { addReservation, toast, favorites, toggleFavorite } = useApp();
  const [booking, setBooking] = useState(false);
  const faved = favorites.has(item.id);

  const book = () => {
    addReservation({
      id: "r-" + Date.now(),
      title: item.title,
      subtitle: `${item.subtitle} · ${item.time}`,
      status: item.free ? "confirmada" : "pendente",
      type: item.type,
    });
    toast(`${item.title} — ${item.free ? "confirmado" : "solicitado"}`);
    setBooking(false);
    setTimeout(onClose, 400);
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "var(--bg)",
      zIndex: 30,
      display: "flex", flexDirection: "column",
      animation: "slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
    }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
        {/* Hero */}
        <div style={{ position: "relative", height: 420 }}>
          <Placeholder grad={item.grad} label={item.label} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.4) 100%)",
            zIndex: 3,
          }} />
          {/* Top controls */}
          <div style={{
            position: "absolute", top: 16, left: 16, right: 16,
            display: "flex", justifyContent: "space-between",
            zIndex: 5,
          }}>
            <button onClick={onClose} style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(255,255,255,0.22)",
              backdropFilter: "blur(16px)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff",
            }}>
              <Icon name="close" size={18} stroke={1.8} />
            </button>
            <button onClick={() => toggleFavorite(item.id)} style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(255,255,255,0.22)",
              backdropFilter: "blur(16px)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff",
            }}>
              <Icon name={faved ? "heart-fill" : "heart"} size={18} stroke={1.8} />
            </button>
          </div>
        </div>

        <div style={{ padding: "24px var(--pad-screen)", marginTop: -40, position: "relative", zIndex: 4 }}>
          <div style={{
            background: "var(--surface)",
            border: "0.5px solid var(--line)",
            borderRadius: 24,
            padding: 22,
            boxShadow: "var(--shadow-2)",
          }}>
            <div className="t-eyebrow" style={{ marginBottom: 6 }}>{item.type}</div>
            <div className="t-display" style={{ fontSize: 34, marginBottom: 8 }}>{item.title}</div>
            <div className="t-body" style={{ marginBottom: 16 }}>{item.subtitle}</div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
              {item.tags && item.tags.map(t => (
                <span key={t} className="chip-soft">{t}</span>
              ))}
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
              padding: "14px 0", borderTop: "0.5px solid var(--line)", borderBottom: "0.5px solid var(--line)",
            }}>
              <InfoStat icon="clock" label="Horário" value={item.time} />
              <InfoStat icon="mappin" label="Valor" value={item.free ? "Incluso" : item.price} />
            </div>

            <div className="t-body" style={{ marginTop: 18 }}>{item.description}</div>
            {item.chef && (
              <div className="t-sm" style={{ marginTop: 12, fontStyle: "italic", fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--ink-2)" }}>
                — {item.chef}
              </div>
            )}
          </div>

          {/* Butler micro */}
          <div style={{ marginTop: 18 }}>
            <ButlerBubble
              text={
                item.type === "restaurante"
                  ? "Posso reservar para esta noite? A mesa com vista ao mar está disponível às 20h."
                  : item.type === "spa"
                  ? "Amanhã de manhã está calmo. Gostaria que eu reservasse às 10h?"
                  : "Tem um horário excelente hoje à tarde. Garanto sua vaga?"
              }
            />
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "16px 20px 32px",
        background: "color-mix(in oklab, var(--surface) 90%, transparent)",
        backdropFilter: "blur(16px)",
        borderTop: "0.5px solid var(--line)",
      }}>
        <button className="btn btn-primary" style={{ width: "100%", padding: "16px" }} onClick={() => setBooking(true)}>
          {item.status === "livre" ? "Entrar" : item.free ? "Reservar vaga" : "Reservar"}
        </button>
      </div>

      <Sheet open={booking} onClose={() => setBooking(false)}>
        <div style={{ padding: "12px 24px 32px" }}>
          <div className="t-eyebrow" style={{ marginBottom: 8 }}>Confirmar</div>
          <div className="t-display" style={{ fontSize: 28, marginBottom: 8 }}>{item.title}</div>
          <div className="t-body" style={{ marginBottom: 8 }}>{item.time}</div>
          <div className="t-sm" style={{ marginBottom: 24 }}>
            {item.free
              ? "Esta experiência é cortesia da casa. Confirmaremos sua presença."
              : "O valor será adicionado à sua conta final no check-out. Sem pagamento agora."}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="btn btn-primary" onClick={book}>Confirmar reserva</button>
            <button className="btn btn-ghost" onClick={() => setBooking(false)}>Voltar</button>
          </div>
        </div>
      </Sheet>
    </div>
  );
};

const InfoStat = ({ icon, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{
      width: 30, height: 30, borderRadius: 9,
      background: "var(--surface-sunk)", color: "var(--ink-2)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Icon name={icon} size={14} stroke={1.7} />
    </div>
    <div>
      <div className="t-xs" style={{ color: "var(--ink-4)" }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-1)" }}>{value}</div>
    </div>
  </div>
);

window.DetailScreen = DetailScreen;
