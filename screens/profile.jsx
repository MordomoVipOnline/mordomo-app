/* Profile */

const ProfileScreen = () => {
    const { tweaks, setTweak, nav } = useApp()

    return (
        <div className="fade-in">
            {/* Header card */}
            <div style={{ padding: "12px var(--pad-screen) 20px" }}>
                <div
                    style={{
                        padding: 24,
                        background: "var(--surface)",
                        border: "0.5px solid var(--line)",
                        borderRadius: 24,
                        textAlign: "center",
                        boxShadow: "var(--shadow-1)",
                    }}
                >
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            background:
                                "linear-gradient(135deg, var(--accent) 0%, var(--accent-ink) 100%)",
                            margin: "0 auto 12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontFamily: "var(--font-serif)",
                            fontSize: 32,
                            fontStyle: "italic",
                            boxShadow: "var(--shadow-2)",
                        }}
                    >
                        H
                    </div>
                    <div
                        className="t-h2"
                        style={{ fontSize: 22, marginBottom: 4 }}
                    >
                        {GUEST.name}
                    </div>
                    <div className="t-sm">
                        {GUEST.room} · {GUEST.checkIn} — {GUEST.checkOut}
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div style={{ padding: "0 var(--pad-screen) 8px" }}>
                <div className="t-eyebrow" style={{ marginBottom: 10 }}>
                    Preferências
                </div>
                <div className="card" style={{ padding: "0 var(--pad-card)" }}>
                    <ListRow
                        icon="globe"
                        title="Idioma"
                        subtitle={GUEST.language}
                        right={
                            <Icon
                                name="chevron-right"
                                size={16}
                                style={{ color: "var(--ink-4)" }}
                            />
                        }
                        onClick={() => {}}
                    />
                    <ListRow
                        icon={tweaks.theme === "dark" ? "moon" : "sun"}
                        title="Tema"
                        subtitle={tweaks.theme === "dark" ? "Escuro" : "Claro"}
                        right={
                            <div className="seg">
                                <button
                                    className={
                                        tweaks.theme === "light" ? "active" : ""
                                    }
                                    onClick={() => setTweak("theme", "light")}
                                >
                                    Claro
                                </button>
                                <button
                                    className={
                                        tweaks.theme === "dark" ? "active" : ""
                                    }
                                    onClick={() => setTweak("theme", "dark")}
                                >
                                    Escuro
                                </button>
                            </div>
                        }
                        divider={true}
                    />
                    <ListRow
                        icon="bell"
                        title="Notificações"
                        subtitle="Eventos favoritos"
                        onClick={() => {}}
                    />
                    <ListRow
                        icon="user"
                        title="Dados pessoais"
                        subtitle="Telefone, e-mail"
                        onClick={() => {}}
                        divider={false}
                    />
                </div>
            </div>

            {/* Secondary sections */}
            <div style={{ padding: "24px var(--pad-screen) 8px" }}>
                <div className="t-eyebrow" style={{ marginBottom: 10 }}>
                    Mais
                </div>
                <div className="card" style={{ padding: "0 var(--pad-card)" }}>
                    <ListRow
                        icon="bag"
                        title="Boutique"
                        subtitle="Produtos do resort"
                        onClick={() => nav("shop")}
                    />
                    <ListRow
                        icon="info"
                        title="Informações & dicas"
                        subtitle="Tudo sobre o resort"
                        onClick={() => nav("info")}
                    />
                    <ListRow
                        icon="leaf"
                        title="Sustentabilidade"
                        subtitle="Nossa pegada"
                        onClick={() => nav("info")}
                        divider={false}
                    />
                </div>
            </div>

            <div style={{ padding: "24px var(--pad-screen) 8px" }}>
                <div className="card" style={{ padding: "0 var(--pad-card)" }}>
                    <ListRow
                        icon="settings"
                        title="Ajuda"
                        subtitle="Falar com a recepção"
                        onClick={() => {}}
                        divider={false}
                    />
                </div>
            </div>

            <div
                style={{
                    padding: "16px var(--pad-screen)",
                    textAlign: "center",
                }}
            >
                <div className="t-xs">Mordomo v1.0 · Atendente Virtual</div>
            </div>

            <div style={{ height: 20 }} />
        </div>
    )
}

window.ProfileScreen = ProfileScreen
