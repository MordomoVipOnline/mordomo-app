import { useState, useEffect } from "react"
import { AppCtx, TopBar, TabBar, Sheet, Toast } from "./ui"
import { Icon } from "./icons"
import { NOTIFICATIONS } from "./data"
import HomeScreen from "./screens/home"
import ExploreScreen from "./screens/explore"
import MyStayScreen from "./screens/mystay"
import ProfileScreen from "./screens/profile"
import ShopScreen from "./screens/shop"
import InfoScreen from "./screens/info"
import ServicesScreen from "./screens/services"
import DetailScreen from "./screens/detail"
import ButlerScreen from "./screens/butler"
import NotificationsScreen from "./screens/notifications"

/* Mordomo app — root component */

const App = () => {
    const [tab, setTab] = useState(
        () => localStorage.getItem("mordomo.tab") || "home",
    )
    const [overlay, setOverlay] = useState(null) // 'butler' | 'detail'
    const [detailItem, setDetailItem] = useState(null)
    const [favorites, setFavorites] = useState(
        new Set(["exp-sunset-sail", "rest-orla"]),
    )
    const [reservations, setReservations] = useState([
        {
            id: "r-init-1",
            title: "Orla",
            subtitle: "Jantar · quinta 20h",
            status: "confirmada",
            type: "restaurante",
        },
        {
            id: "req-init-1",
            title: "Mais toalhas",
            subtitle: "Solicitado há 3 min",
            status: "em andamento",
            type: "serviço",
        },
    ])
    const [tweaks, setTweaks] = useState(() => ({
        theme: window.__TWEAKS__.theme,
        accent: window.__TWEAKS__.accent,
        density: window.__TWEAKS__.density,
        timeOfDay: window.__TWEAKS__.timeOfDay,
        serifTitles: window.__TWEAKS__.serifTitles,
    }))
    const [tweaksOpen, setTweaksOpen] = useState(false)
    const [editModeOn, setEditModeOn] = useState(false)
    const [toastMsg, setToastMsg] = useState(null)
    const [notifOpen, setNotifOpen] = useState(false)
    const [servicesSheetOpen, setServicesSheetOpen] = useState(false)
    const [readSet, setReadSet] = useState(() => {
        try {
            return new Set(
                JSON.parse(localStorage.getItem("mordomo.read") || "[]"),
            )
        } catch {
            return new Set()
        }
    })
    const unreadCount = NOTIFICATIONS.filter(
        (n) => n.unread && !readSet.has(n.id),
    ).length

    useEffect(() => {
        localStorage.setItem("mordomo.tab", tab)
    }, [tab])

    // Tweaks edit-mode wiring
    useEffect(() => {
        const handler = (e) => {
            if (e.data?.type === "__activate_edit_mode") setEditModeOn(true)
            if (e.data?.type === "__deactivate_edit_mode") setEditModeOn(false)
        }
        window.addEventListener("message", handler)
        window.parent.postMessage({ type: "__edit_mode_available" }, "*")
        return () => window.removeEventListener("message", handler)
    }, [])

    useEffect(() => {
        if (editModeOn) setTweaksOpen(true)
        else setTweaksOpen(false)
    }, [editModeOn])

    const setTweak = (key, value) => {
        setTweaks((t) => {
            const next = { ...t, [key]: value }
            window.parent.postMessage(
                { type: "__edit_mode_set_keys", edits: { [key]: value } },
                "*",
            )
            return next
        })
    }

    const toggleFavorite = (id) => {
        setFavorites((s) => {
            const n = new Set(s)
            if (n.has(id)) n.delete(id)
            else n.add(id)
            return n
        })
    }

    const addReservation = (r) => setReservations((list) => [r, ...list])

    const toast = (msg) => {
        setToastMsg(msg)
        setTimeout(() => setToastMsg(null), 2200)
    }

    const nav = (to) => {
        // if (to === "butler") setOverlay("butler")
        if (to === "notifications") setNotifOpen(true)
        else if (to === "services") setServicesSheetOpen(true)
        else if (
            ["home", "explore", "stay", "profile", "shop", "info"].includes(to)
        ) {
            setOverlay(null)
            setDetailItem(null)
            setServicesSheetOpen(false)
            setNotifOpen(false)
            setTab(to)
        }
    }

    const openItem = (item) => {
        setDetailItem(item)
    }

    const ctx = {
        nav,
        openItem,
        favorites,
        toggleFavorite,
        reservations,
        addReservation,
        tweaks,
        setTweak,
        toast,
    }

    const renderScreen = () => {
        switch (tab) {
            case "home":
                return <HomeScreen />
            case "explore":
                return <ExploreScreen />
            case "stay":
                return <MyStayScreen />
            case "profile":
                return <ProfileScreen />
            case "shop":
                return <ShopScreen />
            case "info":
                return <InfoScreen />
            default:
                return <HomeScreen />
        }
    }

    // Recompute unread on open/close
    useEffect(() => {
        if (!notifOpen) {
            try {
                setReadSet(
                    new Set(
                        JSON.parse(
                            localStorage.getItem("mordomo.read") || "[]",
                        ),
                    ),
                )
            } catch {}
        }
    }, [notifOpen])

    return (
        <AppCtx.Provider value={ctx}>
            <div
                className="mordomo-phone"
                data-theme={tweaks.theme}
                data-accent={tweaks.accent}
                data-density={tweaks.density}
                data-serif-titles={String(tweaks.serifTitles)}
            >
                {/* <StatusBar /> */}
                <TopBar
                    onServices={() => setServicesSheetOpen(true)}
                    onNotifications={() => setNotifOpen(true)}
                    unread={unreadCount}
                />
                <div className="screen" key={tab}>
                    {renderScreen()}
                </div>
                <TabBar active={tab} onNav={nav} />

                {servicesSheetOpen && (
                    <Sheet
                        open={true}
                        onClose={() => setServicesSheetOpen(false)}
                        height="86%"
                    >
                        <div style={{ overflowY: "auto", flex: 1 }}>
                            <ServicesScreen />
                        </div>
                    </Sheet>
                )}
                {notifOpen && (
                    <NotificationsScreen onClose={() => setNotifOpen(false)} />
                )}
                {detailItem && (
                    <DetailScreen
                        item={detailItem}
                        onClose={() => setDetailItem(null)}
                    />
                )}
                {/* overlay === "butler" && <ButlerScreen /> */}
                {toastMsg && <Toast message={toastMsg} />}
                {tweaksOpen && (
                    <TweaksPanel
                        tweaks={tweaks}
                        setTweak={setTweak}
                        onClose={() => setTweaksOpen(false)}
                    />
                )}
            </div>
        </AppCtx.Provider>
    )
}

const TweaksPanel = ({ tweaks, setTweak, onClose }) => (
    <div className="tweaks-panel">
        <h4>
            Tweaks
            <button
                onClick={onClose}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--ink-3)",
                }}
            >
                <Icon name="close" size={16} stroke={1.6} />
            </button>
        </h4>
        <div className="tweaks-row">
            <label>Tema</label>
            <div className="seg">
                <button
                    className={tweaks.theme === "light" ? "active" : ""}
                    onClick={() => setTweak("theme", "light")}
                >
                    Claro
                </button>
                <button
                    className={tweaks.theme === "dark" ? "active" : ""}
                    onClick={() => setTweak("theme", "dark")}
                >
                    Escuro
                </button>
            </div>
        </div>
        <div className="tweaks-row">
            <label>Cor de acento</label>
            <div className="swatch-row">
                {[
                    { id: "bronze", color: "#8E6A3D" },
                    { id: "sage", color: "#5F7A5D" },
                    { id: "indigo", color: "#3B4A7A" },
                    { id: "terracotta", color: "#A65A3D" },
                    { id: "graphite", color: "#2C2A28" },
                ].map((s) => (
                    <div
                        key={s.id}
                        className={`swatch ${tweaks.accent === s.id ? "active" : ""}`}
                        style={{ background: s.color }}
                        onClick={() => setTweak("accent", s.id)}
                    />
                ))}
            </div>
        </div>
        <div className="tweaks-row">
            <label>Densidade</label>
            <div className="seg">
                <button
                    className={tweaks.density === "spacious" ? "active" : ""}
                    onClick={() => setTweak("density", "spacious")}
                >
                    Amplo
                </button>
                <button
                    className={tweaks.density === "compact" ? "active" : ""}
                    onClick={() => setTweak("density", "compact")}
                >
                    Compacto
                </button>
            </div>
        </div>
        <div className="tweaks-row">
            <label>Momento do dia</label>
            <div className="seg">
                <button
                    className={tweaks.timeOfDay === "morning" ? "active" : ""}
                    onClick={() => setTweak("timeOfDay", "morning")}
                >
                    Manhã
                </button>
                <button
                    className={tweaks.timeOfDay === "afternoon" ? "active" : ""}
                    onClick={() => setTweak("timeOfDay", "afternoon")}
                >
                    Tarde
                </button>
                <button
                    className={tweaks.timeOfDay === "evening" ? "active" : ""}
                    onClick={() => setTweak("timeOfDay", "evening")}
                >
                    Noite
                </button>
            </div>
        </div>
        <div className="tweaks-row">
            <label>Títulos serifados</label>
            <div className="seg">
                <button
                    className={tweaks.serifTitles ? "active" : ""}
                    onClick={() => setTweak("serifTitles", true)}
                >
                    Sim
                </button>
                <button
                    className={!tweaks.serifTitles ? "active" : ""}
                    onClick={() => setTweak("serifTitles", false)}
                >
                    Não
                </button>
            </div>
        </div>
    </div>
)

export default App
