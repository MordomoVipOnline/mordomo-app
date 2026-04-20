import { useState } from 'react'
import { useApp, ScreenHeader, Placeholder, ListRow, StatusBadge } from '../ui'
import { GUEST, EXPLORE_ITEMS } from '../data'

/* My Stay — reservations, requests, favorites */

const MyStayScreen = () => {
  const { reservations, favorites, openItem, nav } = useApp();
  const [tab, setTab] = useState("planos");

  const plans = reservations.filter(r => r.type !== "serviço" && r.status !== "concluída");
  const requests = reservations.filter(r => r.type === "serviço");
  const favList = EXPLORE_ITEMS.filter(i => favorites.has(i.id));

  return (
    <div className="fade-in">
      <ScreenHeader
        eyebrow={`${GUEST.checkIn} → ${GUEST.checkOut} · ${GUEST.room}`}
        title={<>Sua <em>estadia</em></>}
        subtitle={`Dia ${GUEST.dayOfStay} de ${GUEST.totalDays}. Tudo que está a caminho, num só lugar.`}
      />

      {/* Segmented */}
      <div style={{ padding: "0 var(--pad-screen) 14px" }}>
        <div style={{
          display: "flex",
          background: "var(--surface-sunk)",
          padding: 3, borderRadius: 12,
        }}>
          {[
            { id: "planos", label: `Planos ${plans.length ? `· ${plans.length}` : ""}` },
            { id: "pedidos", label: `Pedidos ${requests.length ? `· ${requests.length}` : ""}` },
            { id: "favoritos", label: `Favoritos ${favList.length ? `· ${favList.length}` : ""}` },
          ].map(t => (
            <button key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, padding: "9px 10px",
                border: "none", cursor: "pointer",
                borderRadius: 9, fontSize: 12, fontWeight: 500,
                fontFamily: "var(--font-sans)",
                background: tab === t.id ? "var(--surface)" : "transparent",
                boxShadow: tab === t.id ? "var(--shadow-1)" : "none",
                color: tab === t.id ? "var(--ink-1)" : "var(--ink-3)",
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "planos" && (
        <div style={{ padding: "8px var(--pad-screen) 0" }}>
          {plans.length === 0 ? (
            <EmptyState
              title="Nenhum plano ainda"
              body="Explore as experiências do resort e reserve seu próximo momento."
              cta="Explorar"
              onCta={() => nav("explore")}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {plans.map(r => <PlanCard key={r.id} r={r} />)}
            </div>
          )}
        </div>
      )}

      {tab === "pedidos" && (
        <div style={{ padding: "8px var(--pad-screen) 0" }}>
          {requests.length === 0 ? (
            <EmptyState
              title="Nenhum pedido ativo"
              body="Precisa de algo? A equipe chega em minutos."
              cta="Pedir"
              onCta={() => nav("services")}
            />
          ) : (
            <div className="card" style={{ padding: "0 var(--pad-card)" }}>
              {requests.map((r, i) => (
                <ListRow
                  key={r.id}
                  icon="bell"
                  title={r.title}
                  subtitle={r.subtitle}
                  right={<StatusBadge status={r.status} />}
                  divider={i !== requests.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "favoritos" && (
        <div style={{ padding: "8px var(--pad-screen) 0" }}>
          {favList.length === 0 ? (
            <EmptyState
              title="Nenhum favorito ainda"
              body="Toque no coração em qualquer experiência para salvar aqui."
              cta="Explorar"
              onCta={() => nav("explore")}
            />
          ) : (
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18,
            }}>
              {favList.map(item => (
                <div key={item.id} onClick={() => openItem(item)} className="press">
                  <div style={{ position: "relative", height: 180, borderRadius: 16, overflow: "hidden", marginBottom: 8 }}>
                    <Placeholder grad={item.grad} label={item.label} />
                  </div>
                  <div className="t-h3" style={{ fontSize: 14 }}>{item.title}</div>
                  <div className="t-xs" style={{ marginTop: 2 }}>{item.subtitle}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ height: 20 }} />
    </div>
  );
};

const PlanCard = ({ r }) => (
  <div className="card" style={{ padding: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "3px 10px", borderRadius: 999,
        background: "var(--surface-sunk)", fontSize: 10,
        fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em",
        color: "var(--ink-3)",
      }}>{r.type}</div>
      <StatusBadge status={r.status} />
    </div>
    <div className="t-h2" style={{ fontSize: 20, marginBottom: 4 }}>{r.title}</div>
    <div className="t-sm" style={{ marginBottom: 14 }}>{r.subtitle}</div>
    <div style={{ display: "flex", gap: 8 }}>
      <button className="btn btn-secondary" style={{ padding: "8px 14px", fontSize: 13 }}>
        Detalhes
      </button>
      <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13, color: "var(--ink-3)" }}>
        Cancelar
      </button>
    </div>
  </div>
);

const EmptyState = ({ title, body, cta, onCta }) => (
  <div style={{
    padding: "40px 20px",
    textAlign: "center",
    background: "var(--surface)",
    border: "0.5px dashed var(--line-strong)",
    borderRadius: 20,
  }}>
    <div className="t-h3" style={{ marginBottom: 6 }}>{title}</div>
    <div className="t-sm" style={{ marginBottom: 18 }}>{body}</div>
    <button className="btn btn-primary" style={{ padding: "10px 22px", fontSize: 13 }} onClick={onCta}>
      {cta}
    </button>
  </div>
);

export default MyStayScreen
