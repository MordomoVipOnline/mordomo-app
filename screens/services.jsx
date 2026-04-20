import { useState } from 'react'
import { useApp, ScreenHeader, ChipRow, ListRow, Sheet } from '../ui'
import { Icon } from '../icons'
import { SERVICE_GROUPS } from '../data'

/* Services — grouped by intent */

const ServicesScreen = () => {
    const { addReservation, toast, nav } = useApp()
    const [activeGroup, setActiveGroup] = useState("quarto")
    const [confirming, setConfirming] = useState(null)

    const confirmRequest = (item) => {
        addReservation({
            id: "req-" + Date.now(),
            title: item.title,
            subtitle: `Solicitado · chegada em ${item.eta}`,
            status: "em andamento",
            type: "serviço",
        })
        toast(`${item.title} — a caminho`)
        setConfirming(null)
    }

    return (
        <div className="fade-in">
            <ScreenHeader
                eyebrow="Precisa de algo"
                title={<>Serviços</>}
                subtitle="Peça com um toque. Nossa equipe chega em minutos."
            />

            {/* Active request banner */}
            <div style={{ padding: "0 var(--pad-screen) 20px" }}>
                <div
                    className="card"
                    style={{
                        padding: 14,
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        background: "var(--accent-soft)",
                        border: "0.5px solid color-mix(in oklab, var(--accent) 20%, transparent)",
                    }}
                >
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: "var(--accent)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icon name="sparkle" size={18} stroke={1.8} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            className="t-h3"
                            style={{ fontSize: 13, color: "var(--accent-ink)" }}
                        >
                            Mordomo cuida disso para você
                        </div>
                        <div
                            className="t-xs"
                            style={{
                                color: "var(--accent-ink)",
                                opacity: 0.8,
                                marginTop: 2,
                            }}
                        >
                            Tempo médio de atendimento hoje: 12 min
                        </div>
                    </div>
                </div>
            </div>

            {/* Group chips */}
            <ChipRow
                items={SERVICE_GROUPS.map((g) => ({
                    id: g.id,
                    label: g.title,
                }))}
                active={activeGroup}
                onPick={setActiveGroup}
            />

            {/* Items */}
            <div style={{ padding: "14px var(--pad-screen) 0" }}>
                {SERVICE_GROUPS.filter((g) => g.id === activeGroup).map(
                    (group) => (
                        <div key={group.id}>
                            <div className="t-sm" style={{ marginBottom: 10 }}>
                                {group.subtitle}
                            </div>
                            <div
                                className="card"
                                style={{ padding: "0 var(--pad-card)" }}
                            >
                                {group.items.map((item, i) => (
                                    <ListRow
                                        key={item.id}
                                        icon={item.icon}
                                        title={item.title}
                                        subtitle={`Estimativa: ${item.eta}`}
                                        onClick={() => setConfirming(item)}
                                        divider={i !== group.items.length - 1}
                                    />
                                ))}
                            </div>
                        </div>
                    ),
                )}
            </div>

            {/* Custom request */}
            {/* <div style={{ padding: "24px var(--pad-screen)" }}>
                <div className="t-eyebrow" style={{ marginBottom: 10 }}>
                    Algo diferente?
                </div>
                <button
                    className="btn btn-secondary"
                    style={{ width: "100%" }}
                    onClick={() => nav("butler")}
                >
                    <Icon name="sparkle" size={16} stroke={1.8} />
                    Pedir ao Mordomo em conversa
                </button>
            </div> */}

            <Sheet open={!!confirming} onClose={() => setConfirming(null)}>
                {confirming && (
                    <div style={{ padding: "12px 24px 32px" }}>
                        <div className="t-eyebrow" style={{ marginBottom: 8 }}>
                            Confirmar pedido
                        </div>
                        <div
                            className="t-display"
                            style={{ fontSize: 30, marginBottom: 10 }}
                        >
                            {confirming.title}
                        </div>
                        <div className="t-body" style={{ marginBottom: 20 }}>
                            Enviaremos à equipe agora. Tempo estimado:{" "}
                            <strong>{confirming.eta}</strong>.
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }}
                        >
                            <button
                                className="btn btn-primary"
                                onClick={() => confirmRequest(confirming)}
                            >
                                Confirmar pedido
                            </button>
                            <button
                                className="btn btn-ghost"
                                onClick={() => setConfirming(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </Sheet>
        </div>
    )
}

export default ServicesScreen
