/* Explore — unified discovery screen */

const ExploreScreen = () => {
  const { openItem } = useApp();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    return EXPLORE_ITEMS.filter(i => {
      if (category !== "all" && i.category !== category) return false;
      if (freeOnly && !i.free) return false;
      if (query && !(`${i.title} ${i.subtitle}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [category, query, freeOnly]);

  // Featured — one large card up top
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="fade-in">
      <ScreenHeader
        eyebrow="Durante sua estadia"
        title={<>O que <em>fazer</em></>}
        subtitle="Gastronomia, bem-estar, cultura e atividades — tudo em um só lugar."
      />

      {/* Search */}
      <div style={{ padding: "0 var(--pad-screen) 14px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 14px",
          background: "var(--surface)",
          border: "0.5px solid var(--line)",
          borderRadius: 999,
        }}>
          <Icon name="search" size={16} stroke={1.6} style={{ color: "var(--ink-3)" }} />
          <input
            type="text"
            placeholder="O que você procura?"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, border: "none", outline: "none",
              background: "transparent", fontSize: 14,
              fontFamily: "var(--font-sans)", color: "var(--ink-1)",
            }}
          />
          <Icon name="mic" size={16} stroke={1.6} style={{ color: "var(--ink-3)" }} />
        </div>
      </div>

      {/* Category chips */}
      <ChipRow items={EXPLORE_CATEGORIES} active={category} onPick={setCategory} />

      {/* Filters row */}
      <div style={{ padding: "6px var(--pad-screen) 20px", display: "flex", gap: 8 }}>
        <button className={`chip ${freeOnly ? "active" : ""}`} onClick={() => setFreeOnly(!freeOnly)} style={{ fontSize: 11 }}>
          Apenas grátis
        </button>
        <button className="chip" style={{ fontSize: 11 }}>
          <Icon name="clock" size={12} stroke={1.8} /> Hoje
        </button>
        <button className="chip" style={{ fontSize: 11 }}>
          <Icon name="filter" size={12} stroke={1.8} /> Filtros
        </button>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{ padding: "40px var(--pad-screen)", textAlign: "center" }}>
          <div className="t-h3" style={{ marginBottom: 6 }}>Nada encontrado</div>
          <div className="t-sm">Tente ajustar os filtros.</div>
        </div>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <div className="section">
              <div className="press" onClick={() => openItem(featured)} style={{
                position: "relative",
                height: 360,
                borderRadius: 24,
                overflow: "hidden",
              }}>
                <Placeholder grad={featured.grad} label={featured.label} />
                <div style={{
                  position: "absolute", inset: 0,
                  padding: 20,
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)",
                  color: "#fff",
                  zIndex: 5,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{
                      padding: "4px 10px", borderRadius: 999,
                      background: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(12px)",
                      fontSize: 10, fontWeight: 500, letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      Destaque
                    </div>
                  </div>
                  <div>
                    <div className="t-eyebrow" style={{ color: "rgba(255,255,255,0.75)" }}>{featured.type}</div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 34, lineHeight: 1, letterSpacing: "-0.02em", marginTop: 6 }}>
                      {featured.title}
                    </div>
                    <div style={{ marginTop: 6, fontSize: 13, opacity: 0.9 }}>{featured.subtitle} · {featured.time}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of rest */}
          {rest.length > 0 && (
            <div className="section">
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
              }}>
                {rest.map(item => (
                  <div key={item.id} onClick={() => openItem(item)} className="press">
                    <div style={{
                      position: "relative", height: 200,
                      borderRadius: 16, overflow: "hidden", marginBottom: 8,
                    }}>
                      <Placeholder grad={item.grad} label={item.label} />
                      {item.free && (
                        <div style={{
                          position: "absolute", top: 8, left: 8,
                          padding: "3px 8px", borderRadius: 999,
                          background: "rgba(255,255,255,0.9)",
                          fontSize: 9, fontWeight: 600, color: "#191714",
                          letterSpacing: "0.03em", textTransform: "uppercase",
                          zIndex: 5,
                        }}>Grátis</div>
                      )}
                    </div>
                    <div className="t-h3" style={{ fontSize: 14 }}>{item.title}</div>
                    <div className="t-xs" style={{ marginTop: 2 }}>{item.subtitle}</div>
                    <div className="t-xs" style={{ color: "var(--ink-2)", marginTop: 4, fontWeight: 500 }}>{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div style={{ height: 20 }} />
    </div>
  );
};

window.ExploreScreen = ExploreScreen;
