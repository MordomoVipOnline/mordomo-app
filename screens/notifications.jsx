/* Notifications screen */

const tintMap = {
    bronze: { bg: "var(--accent-soft)", fg: "var(--accent-ink)" },
    accent: { bg: "var(--accent-soft)", fg: "var(--accent-ink)" },
    success: { bg: "#E0E8D5", fg: "#3E5B2E" },
    pending: { bg: "#F3E4CA", fg: "#7B5C2B" },
    info: { bg: "#DDE5F0", fg: "#344E6E" },
}

const NotificationsScreen = ({ onClose }) => {
    const { nav } = useApp()
    const [cat, setCat] = useState("Tudo")
    const [readSet, setReadSet] = useState(() => {
        try {
            return new Set(
                JSON.parse(localStorage.getItem("mordomo.read") || "[]"),
            )
        } catch {
            return new Set()
        }
    })

    const persist = (s) =>
        localStorage.setItem("mordomo.read", JSON.stringify([...s]))

    const markRead = (id) => {
        setReadSet((s) => {
            const n = new Set(s)
            n.add(id)
            persist(n)
            return n
        })
    }
    const markAllRead = () => {
        const all = new Set(NOTIFICATIONS.map((n) => n.id))
        setReadSet(all)
        persist(all)
    }

    const items = NOTIFICATIONS.map((n) => ({
        ...n,
        unread: n.unread && !readSet.has(n.id),
    })).filter((n) => cat === "Tudo" || n.category === cat)

    // Group by when (today vs earlier)
    const today = items.filter(
        (n) => n.when.includes("min") || n.when.includes("h"),
    )
    const earlier = items.filter(
        (n) => !(n.when.includes("min") || n.when.includes("h")),
    )

    const act = (n) => {
        markRead(n.id)
        if (n.action?.to) {
            onClose()
            setTimeout(() => nav(n.action.to), 120)
        }
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "var(--bg)",
                zIndex: 30,
                display: "flex",
                flexDirection: "column",
                animation: "slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
        >
            <div
                style={{
                    padding: "50px 16px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background:
                        "color-mix(in oklab, var(--surface) 85%, transparent)",
                    backdropFilter: "blur(16px)",
                    borderBottom: "0.5px solid var(--line)",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "var(--surface-sunk)",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    <Icon name="close" size={18} stroke={1.6} />
                </button>
                <div style={{ flex: 1 }}>
                    <div className="t-h3" style={{ fontSize: 16 }}>
                        Notificações
                    </div>
                </div>
                <button
                    onClick={markAllRead}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 12,
                        color: "var(--ink-3)",
                        fontFamily: "var(--font-sans)",
                    }}
                >
                    Marcar como lidas
                </button>
            </div>

            {/* Category filter */}
            <div
                style={{
                    padding: "10px 0 6px",
                    borderBottom: "0.5px solid var(--line)",
                }}
            >
                <ChipRow
                    items={NOTIF_CATEGORIES.map((c) => ({ id: c, label: c }))}
                    active={cat}
                    onPick={setCat}
                />
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: "auto", paddingBottom: 40 }}>
                {items.length === 0 ? (
                    <div style={{ padding: "60px 24px", textAlign: "center" }}>
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                background: "var(--surface-sunk)",
                                color: "var(--ink-4)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 14,
                            }}
                        >
                            <Icon name="bell" size={24} stroke={1.5} />
                        </div>
                        <div className="t-h3" style={{ marginBottom: 6 }}>
                            Tudo em ordem
                        </div>
                        <div className="t-sm">
                            Nenhuma notificação nesta categoria.
                        </div>
                    </div>
                ) : (
                    <>
                        {today.length > 0 && (
                            <NotifGroup
                                label="Hoje"
                                items={today}
                                onAct={act}
                            />
                        )}
                        {earlier.length > 0 && (
                            <NotifGroup
                                label="Anteriores"
                                items={earlier}
                                onAct={act}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

const NotifGroup = ({ label, items, onAct }) => (
    <div>
        <div
            className="t-eyebrow"
            style={{ padding: "18px var(--pad-screen) 8px" }}
        >
            {label}
        </div>
        <div>
            {items.map((n) => (
                <NotifRow key={n.id} n={n} onAct={onAct} />
            ))}
        </div>
    </div>
)

const NotifRow = ({ n, onAct }) => {
    const tint = tintMap[n.tint] || tintMap.info
    return (
        <div
            className="press"
            onClick={() => onAct(n)}
            style={{
                display: "flex",
                gap: 14,
                padding: "14px var(--pad-screen)",
                position: "relative",
                background: n.unread
                    ? "color-mix(in oklab, var(--accent-soft) 35%, transparent)"
                    : "transparent",
                borderBottom: "0.5px solid var(--line)",
                cursor: "pointer",
            }}
        >
            {n.unread && (
                <span
                    style={{
                        position: "absolute",
                        left: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--accent)",
                    }}
                />
            )}
            <div
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: tint.bg,
                    color: tint.fg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <Icon name={n.icon} size={18} stroke={1.7} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                        alignItems: "baseline",
                    }}
                >
                    <span
                        className="t-xs"
                        style={{
                            color: "var(--ink-3)",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                        }}
                    >
                        {n.category}
                    </span>
                    <span className="t-xs" style={{ color: "var(--ink-4)" }}>
                        {n.when}
                    </span>
                </div>
                <div
                    className="t-h3"
                    style={{
                        fontSize: 14,
                        marginTop: 3,
                        fontWeight: n.unread ? 600 : 500,
                    }}
                >
                    {n.title}
                </div>
                <div
                    className="t-sm"
                    style={{ marginTop: 3, color: "var(--ink-2)" }}
                >
                    {n.body}
                </div>
                {n.action && (
                    <div style={{ marginTop: 8 }}>
                        <span
                            className="chip-soft"
                            style={{ display: "inline-flex", gap: 4 }}
                        >
                            {n.action.label}
                            <Icon name="arrow-right" size={12} stroke={2} />
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

window.NotificationsScreen = NotificationsScreen
