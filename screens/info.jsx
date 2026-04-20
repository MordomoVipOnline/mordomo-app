import { useState } from 'react'
import { ScreenHeader, ChipRow } from '../ui'
import { Icon } from '../icons'
import { INFO_SECTIONS } from '../data'

/* Info — tips, ESG, hotel info */

const InfoScreen = () => {
  const [open, setOpen] = useState(null);
  const [section, setSection] = useState("dicas");

  const active = INFO_SECTIONS.find(s => s.id === section);

  return (
    <div className="fade-in">
      <ScreenHeader
        eyebrow="O essencial"
        title={<>Informações</>}
        subtitle="Dicas da casa, sustentabilidade e como tudo funciona por aqui."
      />

      <ChipRow
        items={INFO_SECTIONS.map(s => ({ id: s.id, label: s.title }))}
        active={section}
        onPick={setSection}
      />

      <div style={{ padding: "14px var(--pad-screen) 0" }}>
        <div className="t-sm" style={{ marginBottom: 14 }}>{active.subtitle}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {active.items.map(item => {
            const isOpen = open === item.id;
            return (
              <div key={item.id} className="card press" style={{ padding: 18, cursor: "pointer" }}
                   onClick={() => setOpen(isOpen ? null : item.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div className="t-h3" style={{ fontSize: 15 }}>{item.title}</div>
                  <Icon name={isOpen ? "minus" : "plus"} size={16} stroke={1.8} style={{ color: "var(--ink-3)", flexShrink: 0 }} />
                </div>
                {isOpen && (
                  <div className="slide-up" style={{ marginTop: 10 }}>
                    <div className="t-body">{item.body}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {section === "esg" && (
        <div className="section" style={{ marginTop: 24 }}>
          <div style={{
            padding: 20,
            background: "#E8EDDF",
            borderRadius: 20,
            color: "#2F4130",
          }}>
            <Icon name="leaf" size={22} stroke={1.6} style={{ marginBottom: 10 }} />
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 10 }}>
              Uma hospitalidade que devolve ao lugar.
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.9 }}>
              Nosso compromisso vai além da estadia. Cada decisão — da água ao cardápio — carrega o peso de um território que habitamos.
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 20 }} />
    </div>
  );
};

export default InfoScreen
