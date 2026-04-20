import { useState, useEffect, useMemo, useRef } from 'react'
import { useApp } from '../ui'
import { Icon } from '../icons'
import { CHAT_HISTORY, BUTLER_SUGGESTIONS } from '../data'

/* Butler — conversational screen */

const ButlerScreen = () => {
    const { nav, tweaks } = useApp()
    const [messages, setMessages] = useState(CHAT_HISTORY)
    const [input, setInput] = useState("")
    const [typing, setTyping] = useState(false)
    const endRef = useRef(null)

    useEffect(() => {
        endRef.current && endRef.current.scrollIntoView({ block: "end" })
    }, [messages, typing])

    const quickReplies = useMemo(() => {
        const tod = tweaks.timeOfDay
        if (tod === "morning")
            return ["Onde é o café?", "Reservar yoga", "Pedir toalhas"]
        if (tod === "evening")
            return ["Jantar hoje", "Eventos esta noite", "Reservar mesa"]
        return ["O veleiro de hoje", "Reservar spa", "Sugestão para a tarde"]
    }, [tweaks.timeOfDay])

    const send = (text) => {
        if (!text.trim()) return
        setMessages((m) => [...m, { from: "user", text }])
        setInput("")
        setTyping(true)
        setTimeout(() => {
            const replies = {
                default:
                    "Com prazer. Verifiquei agora e há disponibilidade. Posso confirmar para você?",
                cafe: "O café é servido no Terra, das 7h às 10h30. Posso reservar uma mesa com vista?",
                yoga: "Marquei você no Yoga no Deque de amanhã às 7h. Enviaremos um lembrete.",
                toalha: "Pedido feito. A camareira chega ao quarto em 15 minutos.",
                jantar: "O Orla tem uma mesa livre às 20h, com vista mar. Reservo em seu nome?",
                veleiro:
                    "O veleiro das 17h30 tem 2 vagas. Confirmado para 1 pessoa?",
                spa: "O Ritual da Manhã amanhã às 10h está livre. Reservo para você?",
            }
            const low = text.toLowerCase()
            let r = replies.default
            if (low.includes("café") || low.includes("cafe")) r = replies.cafe
            else if (low.includes("yoga")) r = replies.yoga
            else if (low.includes("toalha")) r = replies.toalha
            else if (low.includes("jantar") || low.includes("mesa"))
                r = replies.jantar
            else if (low.includes("veleiro") || low.includes("pôr"))
                r = replies.veleiro
            else if (low.includes("spa")) r = replies.spa
            setMessages((m) => [...m, { from: "butler", text: r }])
            setTyping(false)
        }, 900)
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
                animation: "fadeIn 0.25s",
            }}
        >
            {/* Top bar */}
            <div
                style={{
                    padding: "16px 16px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    borderBottom: "0.5px solid var(--line)",
                    background:
                        "color-mix(in oklab, var(--surface) 85%, transparent)",
                    backdropFilter: "blur(16px)",
                }}
            >
                <button
                    onClick={() => nav("home")}
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
                    <Icon name="arrow-left" size={18} stroke={1.6} />
                </button>
                <div
                    style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background:
                            "linear-gradient(135deg, var(--accent) 0%, var(--accent-ink) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: 18,
                    }}
                >
                    Y
                </div>
                <div style={{ flex: 1 }}>
                    <div className="t-h3" style={{ fontSize: 15 }}>
                        Mordomo
                    </div>
                    <div
                        className="t-xs"
                        style={{
                            color: "var(--success)",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            marginTop: 1,
                        }}
                    >
                        <span className="dot dot-success" /> Disponível
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px 16px 20px",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div className="t-eyebrow">Hoje</div>
                </div>
                {messages.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            justifyContent:
                                m.from === "user" ? "flex-end" : "flex-start",
                            marginBottom: 10,
                            animation: "slideUp 0.25s",
                        }}
                    >
                        <div
                            style={{
                                maxWidth: "80%",
                                padding: "10px 14px",
                                borderRadius:
                                    m.from === "user"
                                        ? "20px 20px 4px 20px"
                                        : "20px 20px 20px 4px",
                                background:
                                    m.from === "user"
                                        ? "var(--ink-1)"
                                        : "var(--surface)",
                                color:
                                    m.from === "user"
                                        ? "var(--bg)"
                                        : "var(--ink-1)",
                                border:
                                    m.from === "user"
                                        ? "none"
                                        : "0.5px solid var(--line)",
                                fontSize: 14,
                                lineHeight: 1.4,
                                boxShadow:
                                    m.from === "user"
                                        ? "none"
                                        : "var(--shadow-1)",
                            }}
                        >
                            {m.text}
                        </div>
                    </div>
                ))}
                {typing && (
                    <div
                        style={{
                            display: "flex",
                            gap: 4,
                            padding: "10px 14px",
                            background: "var(--surface)",
                            borderRadius: "20px 20px 20px 4px",
                            width: "fit-content",
                            border: "0.5px solid var(--line)",
                        }}
                    >
                        <TypingDot delay={0} />
                        <TypingDot delay={150} />
                        <TypingDot delay={300} />
                    </div>
                )}
                <div ref={endRef} />
            </div>

            {/* Quick replies + input */}
            <div
                style={{
                    padding: "10px 0 24px",
                    background:
                        "color-mix(in oklab, var(--surface) 90%, transparent)",
                    backdropFilter: "blur(16px)",
                    borderTop: "0.5px solid var(--line)",
                }}
            >
                <div
                    className="hscroll"
                    style={{
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 10,
                    }}
                >
                    {quickReplies.map((q) => (
                        <button
                            key={q}
                            className="chip"
                            onClick={() => send(q)}
                            style={{ fontSize: 12 }}
                        >
                            {q}
                        </button>
                    ))}
                </div>
                <div
                    style={{
                        margin: "0 16px",
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        padding: "8px 8px 8px 16px",
                        background: "var(--surface)",
                        border: "0.5px solid var(--line)",
                        borderRadius: 999,
                    }}
                >
                    <input
                        type="text"
                        placeholder="Pergunte qualquer coisa…"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && send(input)}
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontSize: 14,
                            fontFamily: "var(--font-sans)",
                            color: "var(--ink-1)",
                        }}
                    />
                    <button
                        onClick={() => send(input)}
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: "var(--ink-1)",
                            color: "var(--bg)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icon name="send" size={14} stroke={2} />
                    </button>
                </div>
            </div>
        </div>
    )
}

const TypingDot = ({ delay }) => (
    <div
        style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--ink-4)",
            animation: `typing 1.2s infinite`,
            animationDelay: `${delay}ms`,
        }}
    >
        <style>{`@keyframes typing { 0%, 60%, 100% { opacity: 0.3; } 30% { opacity: 1; } }`}</style>
    </div>
)

export default ButlerScreen
