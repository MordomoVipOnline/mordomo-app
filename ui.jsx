/* Mordomo — shared UI primitives */

const {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
    createContext,
    useContext,
} = React

/* ---------- App context ---------- */
const AppCtx = createContext(null)
const useApp = () => useContext(AppCtx)

/* ---------- Status bar ---------- */
const StatusBar = () => {
    const [time, setTime] = useState(() => {
        const d = new Date()
        return d.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        })
    })
    useEffect(() => {
        const t = setInterval(() => {
            const d = new Date()
            setTime(
                d.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            )
        }, 30000)
        return () => clearInterval(t)
    }, [])
    return (
        <div className="status-bar">
            <span>{time}</span>
            <div className="icons">
                <svg
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="currentColor"
                >
                    <rect x="0" y="6" width="3" height="4" rx="0.5" />
                    <rect x="5" y="4" width="3" height="6" rx="0.5" />
                    <rect x="10" y="2" width="3" height="8" rx="0.5" />
                    <rect x="15" y="0" width="3" height="10" rx="0.5" />
                </svg>
                <svg
                    width="16"
                    height="11"
                    viewBox="0 0 16 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                >
                    <path d="M1 4a10 10 0 0 1 14 0M3.5 6.5a6.5 6.5 0 0 1 9 0M5.8 9a3 3 0 0 1 4.4 0" />
                    <circle cx="8" cy="10" r="0.6" fill="currentColor" />
                </svg>
                <svg
                    width="26"
                    height="12"
                    viewBox="0 0 26 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                >
                    <rect x="1" y="1" width="22" height="10" rx="2.5" />
                    <rect
                        x="3"
                        y="3"
                        width="16"
                        height="6"
                        rx="1"
                        fill="currentColor"
                    />
                    <rect
                        x="24"
                        y="4"
                        width="1.5"
                        height="4"
                        rx="0.5"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </div>
    )
}

/* ---------- Tab bar ---------- */
const TabBar = ({ active, onNav }) => {
    const tabs = [
        { id: "home", label: "Início", icon: "home" },
        { id: "explore", label: "Explorar", icon: "compass" },
        { id: "shop", label: "Boutique", icon: "bag" },
        { id: "stay", label: "Minha estadia", icon: "stay" },
        { id: "profile", label: "Perfil", icon: "user" },
    ]
    return (
        <nav className="tab-bar">
            {tabs.map((t) => (
                <button
                    key={t.id}
                    className={`tab ${active === t.id ? "active" : ""}`}
                    onClick={() => onNav(t.id)}
                >
                    <Icon
                        name={t.icon}
                        size={22}
                        stroke={active === t.id ? 1.9 : 1.5}
                    />
                    <span>{t.label}</span>
                </button>
            ))}
        </nav>
    )
}

/* ---------- Top bar (brand + services + notifications) ---------- */
const TopBar = ({ onServices, onNotifications, unread = 0, title = null }) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px var(--pad-screen) 8px",
        }}
    >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
                style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background:
                        "linear-gradient(135deg, var(--accent) 0%, var(--accent-ink) 100%)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 15,
                    boxShadow: "var(--shadow-1)",
                }}
            >
                M
            </div>
            {title ? (
                <span className="t-h3" style={{ fontSize: 15 }}>
                    {title}
                </span>
            ) : (
                <span className="t-eyebrow" style={{ letterSpacing: "0.18em" }}>
                    Mordomo
                </span>
            )}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
            {/* <button
                onClick={onServices}
                aria-label="Serviços"
                style={topIconBtn}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4 17a7 7 0 0 1 16 0H4Z" />
                    <path d="M12 7V4M8 4h8M3 20h18" />
                </svg>
            </button> */}
            <button
                onClick={onNotifications}
                aria-label="Notificações"
                style={{ ...topIconBtn, position: "relative" }}
            >
                <NotifBellIcon />
                {unread > 0 && (
                    <span
                        style={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            minWidth: 14,
                            height: 14,
                            borderRadius: 999,
                            background: "var(--danger)",
                            color: "#fff",
                            fontSize: 9,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0 4px",
                            border: "1.5px solid var(--bg)",
                        }}
                    >
                        {unread > 9 ? "9+" : unread}
                    </span>
                )}
            </button>
        </div>
    </div>
)

const topIconBtn = {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "var(--surface)",
    border: "0.5px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "var(--ink-1)",
    boxShadow: "var(--shadow-1)",
}

// Differentiate the top-bar bell from the Services bell: concierge-style "service bell"
const NotifBellIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4Z" />
        <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
)

/* ---------- Image placeholder ---------- */
const Placeholder = ({ grad, label, style = {}, children }) => (
    <div className="ph" style={{ ...style }}>
        <div
            style={{
                position: "absolute",
                inset: 0,
                background: grad,
                zIndex: 1,
            }}
        />
        <div
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                background:
                    "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.28), transparent 55%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.22), transparent 55%)",
            }}
        />
        {label && <div className="ph-label">{label}</div>}
        {children}
    </div>
)

/* ---------- Explore / item card ---------- */
const ItemCard = ({ item, onOpen, size = "md" }) => {
    const { favorites, toggleFavorite } = useApp()
    const faved = favorites.has(item.id)
    const statusLabel =
        {
            reservável: "Reservável",
            livre: "Sem reserva",
            aberto: "Aberto a todos",
        }[item.status] || item.status

    const widths = { sm: 160, md: 220, lg: 280, full: "100%" }
    const heights = { sm: 200, md: 260, lg: 320, full: 340 }

    return (
        <div
            className="press"
            style={{ width: widths[size] }}
            onClick={() => onOpen(item)}
        >
            <div
                style={{
                    position: "relative",
                    height: heights[size],
                    borderRadius: 20,
                    overflow: "hidden",
                    marginBottom: 10,
                }}
            >
                <Placeholder grad={item.grad} label={item.label} />
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(item.id)
                    }}
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.18)",
                        backdropFilter: "blur(12px)",
                        border: "none",
                        cursor: "pointer",
                        color: faved ? "#fff" : "rgba(255,255,255,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 5,
                    }}
                    aria-label="favoritar"
                >
                    <Icon
                        name={faved ? "heart-fill" : "heart"}
                        size={16}
                        stroke={1.8}
                    />
                </button>
                {item.free && (
                    <div
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            padding: "4px 10px",
                            borderRadius: 999,
                            background: "rgba(255,255,255,0.92)",
                            fontSize: 10,
                            fontWeight: 600,
                            color: "#191714",
                            letterSpacing: "0.02em",
                            textTransform: "uppercase",
                            zIndex: 5,
                        }}
                    >
                        Grátis
                    </div>
                )}
            </div>
            <div style={{ padding: "0 2px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                    }}
                >
                    <span
                        className="t-h3"
                        style={{ fontSize: size === "sm" ? 15 : 17 }}
                    >
                        {item.title}
                    </span>
                </div>
                <div className="t-sm" style={{ marginTop: 2 }}>
                    {item.subtitle}
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 8,
                    }}
                >
                    <span
                        className="t-xs"
                        style={{ color: "var(--ink-2)", fontWeight: 500 }}
                    >
                        {item.time}
                    </span>
                    <span className="t-xs" style={{ color: "var(--ink-4)" }}>
                        ·
                    </span>
                    <span className="t-xs">{statusLabel}</span>
                </div>
            </div>
        </div>
    )
}

/* ---------- Butler bubble ---------- */
const ButlerBubble = ({ text, actions, onAction }) => (
    <div className="butler-bubble">
        <div className="butler-avatar">Y</div>
        <div style={{ flex: 1 }}>
            <div
                style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--ink-3)",
                    marginBottom: 4,
                    letterSpacing: "0.03em",
                }}
            >
                Mordomo
            </div>
            <div
                className="t-body"
                style={{ color: "var(--ink-1)", fontSize: 14 }}
            >
                {text}
            </div>
            {actions && (
                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 10,
                        flexWrap: "wrap",
                    }}
                >
                    {actions.map((a) => (
                        <button
                            key={a.label}
                            className={`chip ${a.primary ? "active" : ""}`}
                            onClick={() => onAction && onAction(a)}
                            style={{ fontSize: 11 }}
                        >
                            {a.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>
)

/* ---------- Sheet (bottom modal) ---------- */
const Sheet = ({ open, onClose, children, height = "auto" }) => {
    if (!open) return null
    return (
        <>
            <div className="sheet-backdrop" onClick={onClose} />
            <div className="sheet" style={{ height }}>
                <div className="sheet-handle" />
                {children}
            </div>
        </>
    )
}

/* ---------- Toast ---------- */
const Toast = ({ message, icon = "check" }) => (
    <div className="toast">
        <Icon name={icon} size={16} stroke={2} />
        <span>{message}</span>
    </div>
)

/* ---------- Screen header ---------- */
const ScreenHeader = ({ eyebrow, title, subtitle, right, sticky = false }) => (
    <div
        style={{
            padding: "8px var(--pad-screen) 20px",
            position: sticky ? "sticky" : "relative",
            top: 0,
            background: sticky
                ? "color-mix(in oklab, var(--bg) 90%, transparent)"
                : "transparent",
            backdropFilter: sticky ? "blur(12px)" : "none",
            zIndex: sticky ? 10 : 1,
        }}
    >
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
            }}
        >
            <div>
                {eyebrow && (
                    <div className="t-eyebrow" style={{ marginBottom: 6 }}>
                        {eyebrow}
                    </div>
                )}
                <div className="t-display">{title}</div>
                {subtitle && (
                    <div className="t-body" style={{ marginTop: 8 }}>
                        {subtitle}
                    </div>
                )}
            </div>
            {right && <div>{right}</div>}
        </div>
    </div>
)

/* ---------- Chip row ---------- */
const ChipRow = ({ items, active, onPick }) => (
    <div style={{ padding: "0 var(--pad-screen)" }}>
        <div className="hscroll" style={{ paddingTop: 4, paddingBottom: 8 }}>
            {items.map((c) => (
                <button
                    key={c.id}
                    className={`chip ${active === c.id ? "active" : ""}`}
                    onClick={() => onPick(c.id)}
                >
                    {c.label}
                </button>
            ))}
        </div>
    </div>
)

/* ---------- Status badge ---------- */
const StatusBadge = ({ status }) => {
    const map = {
        confirmada: {
            dot: "dot-success",
            label: "Confirmada",
            color: "var(--success)",
        },
        pendente: {
            dot: "dot-pending",
            label: "Pendente",
            color: "var(--pending)",
        },
        livre: { dot: "dot-info", label: "Livre", color: "var(--info)" },
        "em andamento": {
            dot: "dot-pending",
            label: "Em andamento",
            color: "var(--pending)",
        },
        concluída: {
            dot: "dot-success",
            label: "Concluída",
            color: "var(--success)",
        },
    }
    const c = map[status] || { dot: "dot-info", label: status }
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: c.color || "var(--ink-3)",
                fontWeight: 500,
            }}
        >
            <span className={`dot ${c.dot}`} /> {c.label}
        </span>
    )
}

/* ---------- List row (for Services / settings / info) ---------- */
const ListRow = ({ icon, title, subtitle, right, onClick, divider = true }) => (
    <>
        <div
            className="press"
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 2px",
                cursor: onClick ? "pointer" : "default",
            }}
        >
            {icon && (
                <div
                    style={{
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        background: "var(--accent-soft)",
                        color: "var(--accent-ink)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <Icon name={icon} size={18} stroke={1.7} />
                </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div className="t-h3" style={{ fontSize: 15 }}>
                    {title}
                </div>
                {subtitle && (
                    <div className="t-sm" style={{ marginTop: 2 }}>
                        {subtitle}
                    </div>
                )}
            </div>
            {right !== undefined
                ? right
                : onClick && (
                      <Icon
                          name="chevron-right"
                          size={18}
                          stroke={1.4}
                          style={{ color: "var(--ink-4)" }}
                      />
                  )}
        </div>
        {divider && <div className="div-line" />}
    </>
)

Object.assign(window, {
    AppCtx,
    useApp,
    StatusBar,
    TabBar,
    TopBar,
    Placeholder,
    ItemCard,
    ButlerBubble,
    Sheet,
    Toast,
    ScreenHeader,
    ChipRow,
    StatusBadge,
    ListRow,
})
