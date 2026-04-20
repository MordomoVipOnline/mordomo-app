/* Home — context-aware dashboard */

const greetingFor = (tod, name) => {
    if (tod === "morning")
        return { greet: "Bom dia", body: `Uma manhã calma começa, ${name}.` }
    if (tod === "afternoon")
        return { greet: "Boa tarde", body: `O sol está generoso, ${name}.` }
    if (tod === "evening")
        return { greet: "Boa noite", body: `A noite chega devagar, ${name}.` }
    return { greet: "Olá", body: `Bem-vinda, ${name}.` }
}

const HomeScreen = () => {
    const { nav, openItem, tweaks, addReservation, reservations } = useApp()
    const tod = tweaks.timeOfDay
    const g = greetingFor(tod, GUEST.firstName)
    const butlerSuggestions =
        BUTLER_SUGGESTIONS[tod] || BUTLER_SUGGESTIONS.afternoon

    // Featured items by time of day
    const featuredItems = useMemo(() => {
        if (tod === "morning")
            return EXPLORE_ITEMS.filter((i) =>
                ["exp-yoga", "rest-terra", "kids-aventura"].includes(i.id),
            )
        if (tod === "evening")
            return EXPLORE_ITEMS.filter((i) =>
                ["rest-orla", "evt-jazz", "exp-degustacao"].includes(i.id),
            )
        return EXPLORE_ITEMS.filter((i) =>
            ["exp-sunset-sail", "spa-signature", "evt-jazz"].includes(i.id),
        )
    }, [tod])

    const upcoming = reservations
        .filter((r) => r.status !== "concluída")
        .slice(0, 2)

    return (
        <div className="fade-in">
            {/* Greeting */}
            <div style={{ padding: "8px var(--pad-screen) 24px" }}>
                <div className="t-eyebrow" style={{ marginBottom: 8 }}>
                    {GUEST.room} · Dia {GUEST.dayOfStay} de {GUEST.totalDays}
                </div>
                <div
                    className="t-display"
                    style={{ fontSize: 44, marginBottom: 6 }}
                >
                    {g.greet}, <em>{GUEST.firstName}</em>.
                </div>
                <div className="t-body" style={{ color: "var(--ink-3)" }}>
                    {g.body}
                </div>
            </div>

            {/* Butler bubble */}
            {/* <div style={{ padding: "0 var(--pad-screen) 24px" }}>
                <ButlerBubble
                    text={butlerSuggestions[0].text}
                    actions={[
                        {
                            label: "Sim, por favor",
                            primary: true,
                            action: "confirm",
                        },
                        { label: "Agora não", action: "dismiss" },
                        { label: "Ver detalhes", action: "details" },
                    ]}
                    onAction={(a) => {
                        if (a.action === "confirm") {
                            addReservation({
                                id: "r-" + Date.now(),
                                title:
                                    tod === "evening"
                                        ? "Orla"
                                        : tod === "morning"
                                          ? "Yoga no Deque"
                                          : "Veleiro ao pôr do sol",
                                subtitle:
                                    tod === "evening"
                                        ? "Jantar · 20h"
                                        : tod === "morning"
                                          ? "Amanhã · 7h"
                                          : "Hoje · 17h30",
                                status: "confirmada",
                                type: "experiência",
                            })
                        } else if (a.action === "details") {
                            nav("butler")
                        }
                    }}
                />
                <button
                    onClick={() => nav("butler")}
                    className="press"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 12,
                        marginLeft: 48,
                        background: "none",
                        border: "none",
                        color: "var(--ink-3)",
                        fontSize: 12,
                        cursor: "pointer",
                        padding: 0,
                        fontFamily: "var(--font-sans)",
                    }}
                >
                    Conversar com Mordomo
                    <Icon name="arrow-right" size={14} stroke={1.5} />
                </button>
            </div> */}

            {/* Quick actions */}
            <div className="section">
                <div className="section-hd">
                    <div className="title">Atalhos</div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                    }}
                >
                    <QuickAction
                        icon="bell"
                        label="Pedir algo"
                        subtitle="Toalhas, arrumação…"
                        onClick={() => nav("services")}
                    />
                    <QuickAction
                        icon="compass"
                        label="O que fazer"
                        subtitle="Agora no resort"
                        onClick={() => nav("explore")}
                    />
                    <QuickAction
                        icon="calendar"
                        label="Reservar mesa"
                        subtitle="3 restaurantes"
                        onClick={() => {
                            nav("explore")
                        }}
                    />
                    <QuickAction
                        icon="sparkle"
                        label="Falar com Mordomo"
                        subtitle="Pergunte qualquer coisa"
                        onClick={() => nav("butler")}
                    />
                </div>
            </div>

            {/* Upcoming */}
            {upcoming.length > 0 && (
                <div className="section">
                    <div className="section-hd">
                        <div className="title">Seus planos</div>
                        <button
                            onClick={() => nav("stay")}
                            style={{
                                background: "none",
                                border: "none",
                                color: "var(--ink-3)",
                                fontSize: 13,
                                cursor: "pointer",
                                fontFamily: "var(--font-sans)",
                            }}
                        >
                            Ver todos
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                        }}
                    >
                        {upcoming.map((r) => (
                            <div
                                key={r.id}
                                className="card press"
                                style={{
                                    padding: 16,
                                    display: "flex",
                                    gap: 14,
                                    alignItems: "center",
                                }}
                                onClick={() => nav("stay")}
                            >
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 14,
                                        background: "var(--accent-soft)",
                                        color: "var(--accent-ink)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon
                                        name={
                                            r.type === "serviço"
                                                ? "bell"
                                                : "calendar"
                                        }
                                        size={20}
                                        stroke={1.6}
                                    />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div
                                        className="t-h3"
                                        style={{ fontSize: 15 }}
                                    >
                                        {r.title}
                                    </div>
                                    <div
                                        className="t-sm"
                                        style={{ marginTop: 2 }}
                                    >
                                        {r.subtitle}
                                    </div>
                                </div>
                                <StatusBadge status={r.status} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Happening now */}
            <div className="section">
                <div className="section-hd">
                    <div>
                        <div className="title">
                            {tod === "morning"
                                ? "Comece sua manhã"
                                : tod === "evening"
                                  ? "Esta noite"
                                  : "Acontecendo agora"}
                        </div>
                        <div className="t-sm" style={{ marginTop: 2 }}>
                            Sugestões para este momento
                        </div>
                    </div>
                    <button
                        onClick={() => nav("explore")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "var(--ink-3)",
                            fontSize: 13,
                            cursor: "pointer",
                            fontFamily: "var(--font-sans)",
                        }}
                    >
                        Explorar
                    </button>
                </div>
                <div className="hscroll">
                    {featuredItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            size="md"
                            onOpen={openItem}
                        />
                    ))}
                </div>
            </div>

            {/* Editorial moment */}
            <div className="section">
                <div
                    className="press"
                    onClick={() => nav("explore")}
                    style={{
                        position: "relative",
                        height: 260,
                        borderRadius: 24,
                        overflow: "hidden",
                    }}
                >
                    <Placeholder
                        grad="linear-gradient(160deg, #2D3F4E 0%, #4A6179 50%, #8EA5B4 100%)"
                        label=""
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            padding: 24,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.5), transparent 50%)",
                            color: "#fff",
                            zIndex: 5,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.15em",
                                opacity: 0.8,
                                marginBottom: 6,
                            }}
                        >
                            Especial da casa
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: 32,
                                lineHeight: 1,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            A região em
                            <br />
                            <em>um único dia</em>
                        </div>
                        <div
                            style={{
                                marginTop: 10,
                                fontSize: 13,
                                opacity: 0.9,
                                maxWidth: 260,
                            }}
                        >
                            Um roteiro feito pela equipe, com os melhores
                            horários e paradas.
                        </div>
                    </div>
                </div>
            </div>

            {/* Wellness / ESG tile */}
            <div className="section">
                <div
                    className="press"
                    onClick={() => nav("info")}
                    style={{
                        padding: 20,
                        background: "var(--surface)",
                        border: "0.5px solid var(--line)",
                        borderRadius: 20,
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            background: "#E8EDDF",
                            color: "#4A6238",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icon name="leaf" size={22} stroke={1.6} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div className="t-h3" style={{ fontSize: 15 }}>
                            Nossa pegada hoje
                        </div>
                        <div className="t-sm" style={{ marginTop: 2 }}>
                            78% solar · 42 produtores locais
                        </div>
                    </div>
                    <Icon
                        name="chevron-right"
                        size={18}
                        stroke={1.4}
                        style={{ color: "var(--ink-4)" }}
                    />
                </div>
            </div>

            <div style={{ height: 20 }} />
        </div>
    )
}

const QuickAction = ({ icon, label, subtitle, onClick }) => (
    <button
        className="press"
        onClick={onClick}
        style={{
            background: "var(--surface)",
            border: "0.5px solid var(--line)",
            borderRadius: 18,
            padding: 16,
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "var(--shadow-1)",
        }}
    >
        <div
            style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                background: "var(--accent-soft)",
                color: "var(--accent-ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Icon name={icon} size={18} stroke={1.7} />
        </div>
        <div>
            <div className="t-h3" style={{ fontSize: 14 }}>
                {label}
            </div>
            <div className="t-xs" style={{ marginTop: 2 }}>
                {subtitle}
            </div>
        </div>
    </button>
)

window.HomeScreen = HomeScreen
