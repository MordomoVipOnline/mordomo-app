/* Mordomo data — Portuguese (Brazil) */

const GUEST = {
    name: "Helena",
    firstName: "Helena",
    checkIn: "14 abr",
    checkOut: "19 abr",
    dayOfStay: 3,
    totalDays: 5,
    room: "Suíte 412",
    language: "Português",
}

/* 6 categories — discovery-unified */
const EXPLORE_CATEGORIES = [
    { id: "all", label: "Tudo" },
    { id: "gastronomia", label: "Gastronomia" },
    { id: "bem-estar", label: "Bem-estar" },
    { id: "atividades", label: "Atividades" },
    { id: "cultura", label: "Cultura" },
    { id: "kids", label: "Família" },
]

const EXPLORE_ITEMS = [
    {
        id: "rest-orla",
        type: "restaurante",
        category: "gastronomia",
        title: "Orla",
        subtitle: "Cozinha contemporânea · Vista mar",
        time: "19h — 23h",
        price: "$$$",
        status: "reservável",
        free: false,
        grad: "linear-gradient(135deg, #D6A978 0%, #7C4A2A 100%)",
        label: "Orla",
        description:
            "Uma cozinha de autor que celebra o litoral: peixes frescos do dia, azeites do Sul, fogo a lenha.",
        chef: "Chef Marina Vilas",
        tags: ["Reserva recomendada", "Vista mar", "Vegetariano"],
    },
    {
        id: "exp-sunset-sail",
        type: "experiência",
        category: "atividades",
        title: "Veleiro ao pôr do sol",
        subtitle: "Passeio guiado · 90 min",
        time: "Hoje · 17h30",
        price: "Incluso",
        status: "reservável",
        free: true,
        grad: "linear-gradient(160deg, #E8B678 0%, #B56A3D 50%, #3D2617 100%)",
        label: "Sunset",
        description:
            "Uma saída de veleiro pela costa no momento em que o sol toca o mar. Espumante de cortesia a bordo.",
        tags: ["Grátis", "Limitado a 8 pessoas", "Hoje"],
    },
    {
        id: "spa-signature",
        type: "spa",
        category: "bem-estar",
        title: "Ritual da Manhã",
        subtitle: "Massagem · 80 min",
        time: "Diariamente",
        price: "$$",
        status: "reservável",
        free: false,
        grad: "linear-gradient(135deg, #D4C4A8 0%, #6B5C42 100%)",
        label: "Spa",
        description:
            "Um ritual de despertar com óleos botânicos, pressão suave e aromaterapia de cítricos.",
        tags: ["80 min", "Spa"],
    },
    {
        id: "evt-jazz",
        type: "evento",
        category: "cultura",
        title: "Jazz no Lounge",
        subtitle: "Trio ao vivo · Sexta",
        time: "Hoje · 21h",
        price: "Incluso",
        status: "aberto",
        free: true,
        grad: "linear-gradient(135deg, #3D2F42 0%, #7A5C6D 100%)",
        label: "Jazz",
        description:
            "Nosso trio residente interpreta standards e composições autorais no Lounge Mirante.",
        tags: ["Grátis", "Lounge Mirante"],
    },
    {
        id: "kids-aventura",
        type: "atividade",
        category: "kids",
        title: "Trilha dos Pequenos",
        subtitle: "Crianças 6–12 · Com guia",
        time: "Amanhã · 10h",
        price: "Incluso",
        status: "reservável",
        free: true,
        grad: "linear-gradient(135deg, #A8C48E 0%, #4A6238 100%)",
        label: "Kids",
        description:
            "Uma pequena expedição pelo jardim botânico do resort, descobrindo plantas e pequenos animais.",
        tags: ["Grátis", "6–12 anos"],
    },
    {
        id: "rest-terra",
        type: "restaurante",
        category: "gastronomia",
        title: "Terra",
        subtitle: "Café da manhã · Almoço",
        time: "7h — 15h",
        price: "$$",
        status: "livre",
        free: false,
        grad: "linear-gradient(135deg, #E6D4B8 0%, #9A7E52 100%)",
        label: "Terra",
        description:
            "Mesa farta, ingredientes locais, pães da casa. Sem reserva — primeiro a chegar.",
        tags: ["Sem reserva", "Café"],
    },
    {
        id: "exp-yoga",
        type: "atividade",
        category: "bem-estar",
        title: "Yoga no Deque",
        subtitle: "Todos os níveis · 60 min",
        time: "Amanhã · 7h",
        price: "Incluso",
        status: "reservável",
        free: true,
        grad: "linear-gradient(135deg, #B8D4C4 0%, #4A6B5C 100%)",
        label: "Yoga",
        description:
            "Prática suave ao amanhecer, no deque voltado para o mar. Tapetes e toalhas fornecidos.",
        tags: ["Grátis", "7h"],
    },
    {
        id: "exp-degustacao",
        type: "experiência",
        category: "gastronomia",
        title: "Degustação de vinhos",
        subtitle: "Com sommelier · 90 min",
        time: "Sáb · 18h",
        price: "$$$",
        status: "reservável",
        free: false,
        grad: "linear-gradient(135deg, #8B3A4C 0%, #3D1820 100%)",
        label: "Vinhos",
        description:
            "Cinco rótulos selecionados pelo nosso sommelier, harmonizados com pequenos pratos.",
        tags: ["Reserva obrigatória", "Adultos"],
    },
]

/* Services — grouped by intent, not department */
const SERVICE_GROUPS = [
    {
        id: "quarto",
        title: "No quarto",
        subtitle: "Conforto, limpeza e amenities",
        items: [
            {
                id: "s-arrumacao",
                title: "Arrumação do quarto",
                eta: "~25 min",
                icon: "bed",
            },
            {
                id: "s-toalhas",
                title: "Mais toalhas",
                eta: "~15 min",
                icon: "towel",
            },
            {
                id: "s-amenities",
                title: "Amenities de banho",
                eta: "~10 min",
                icon: "bottle",
            },
            {
                id: "s-minibar",
                title: "Repor frigobar",
                eta: "~20 min",
                icon: "minibar",
            },
            {
                id: "s-travesseiro",
                title: "Travesseiro extra",
                eta: "~10 min",
                icon: "pillow",
            },
        ],
    },
    {
        id: "reparos",
        title: "Reparos",
        subtitle: "Algo precisa de atenção",
        items: [
            {
                id: "s-ar",
                title: "Ar-condicionado",
                eta: "~30 min",
                icon: "wind",
            },
            { id: "s-tv", title: "TV / streaming", eta: "~20 min", icon: "tv" },
            {
                id: "s-wifi",
                title: "Wi-Fi / rede",
                eta: "~15 min",
                icon: "wifi",
            },
            {
                id: "s-eletrica",
                title: "Iluminação",
                eta: "~25 min",
                icon: "bulb",
            },
        ],
    },
    {
        id: "concierge",
        title: "Concierge",
        subtitle: "Pedidos especiais",
        items: [
            {
                id: "s-taxi",
                title: "Transfer / táxi",
                eta: "~10 min",
                icon: "car",
            },
            { id: "s-laundry", title: "Lavanderia", eta: "24h", icon: "shirt" },
            {
                id: "s-mensagem",
                title: "Recado ao chef",
                eta: "~5 min",
                icon: "note",
            },
            {
                id: "s-flores",
                title: "Flores no quarto",
                eta: "~45 min",
                icon: "flower",
            },
        ],
    },
]

/* Shop */
const SHOP_CATEGORIES = ["Tudo", "Essenciais", "Spa", "Livraria", "Lembranças"]
const SHOP_ITEMS = [
    {
        id: "sh-oil",
        title: "Óleo Corporal da Casa",
        subtitle: "Amêndoas & laranja",
        price: "R$ 220",
        cat: "Spa",
        grad: "linear-gradient(135deg, #E6D4B8 0%, #9A7E52 100%)",
        label: "Óleo",
    },
    {
        id: "sh-robe",
        title: "Roupão Mordomo",
        subtitle: "Algodão egípcio",
        price: "R$ 890",
        cat: "Essenciais",
        grad: "linear-gradient(135deg, #EAE4D8 0%, #B8AE9A 100%)",
        label: "Roupão",
    },
    {
        id: "sh-candle",
        title: "Vela Assinatura",
        subtitle: "Cedro & âmbar",
        price: "R$ 340",
        cat: "Spa",
        grad: "linear-gradient(135deg, #C4A882 0%, #5C3D1F 100%)",
        label: "Vela",
    },
    {
        id: "sh-book",
        title: "Guia da Região",
        subtitle: "Edição limitada",
        price: "R$ 180",
        cat: "Livraria",
        grad: "linear-gradient(135deg, #3D2F42 0%, #7A5C6D 100%)",
        label: "Livro",
    },
    {
        id: "sh-chocolate",
        title: "Chocolates artesanais",
        subtitle: "Caixa com 12",
        price: "R$ 160",
        cat: "Lembranças",
        grad: "linear-gradient(135deg, #6B4A32 0%, #2E1B10 100%)",
        label: "Cacau",
    },
    {
        id: "sh-tea",
        title: "Blend de chá",
        subtitle: "Ervas da horta",
        price: "R$ 95",
        cat: "Lembranças",
        grad: "linear-gradient(135deg, #A8C48E 0%, #4A6238 100%)",
        label: "Chá",
    },
]

/* Info */
const INFO_SECTIONS = [
    {
        id: "dicas",
        title: "Dicas da estadia",
        subtitle: "Recomendações da casa",
        items: [
            {
                id: "i-amanhecer",
                title: "O melhor amanhecer",
                body: "O mirante leste fica a 8 minutos a pé da recepção. Leve um casaco leve — o vento vem do mar.",
            },
            {
                id: "i-regiao",
                title: "A região em 1 dia",
                body: "Vila histórica pela manhã, almoço à beira-mar, cachoeira pela tarde. Pedimos o transfer para você?",
            },
            {
                id: "i-mercado",
                title: "Mercado local",
                body: "Toda quarta e sábado pela manhã, na praça central. Frutas, queijos e cestaria.",
            },
        ],
    },
    {
        id: "esg",
        title: "Sustentabilidade",
        subtitle: "Nosso compromisso",
        items: [
            {
                id: "e-agua",
                title: "Água & energia",
                body: "Captação de água da chuva, painéis solares em 78% do consumo, reuso de águas cinzas nos jardins.",
            },
            {
                id: "e-comunidade",
                title: "Comunidade",
                body: "85% da equipe mora em um raio de 30 km. Compramos de 42 produtores locais.",
            },
            {
                id: "e-biodiversidade",
                title: "Biodiversidade",
                body: "6 hectares de mata nativa em restauração desde 2018. Avistamentos documentados de 114 espécies de aves.",
            },
        ],
    },
    {
        id: "hotel",
        title: "Informações do hotel",
        subtitle: "O essencial",
        items: [
            {
                id: "h-horarios",
                title: "Horários",
                body: "Recepção 24h · Check-out até 12h · Café 7h–10h30 · Piscina 7h–21h",
            },
            {
                id: "h-wifi",
                title: "Wi-Fi",
                body: "Rede: Mordomo-Guest · Senha automática no seu dispositivo.",
            },
            {
                id: "h-emergencia",
                title: "Emergência",
                body: "Ramal 9 · Segurança 24h · Atendimento médico de plantão.",
            },
        ],
    },
]

/* Butler suggestions — time-aware */
const BUTLER_SUGGESTIONS = {
    morning: [
        {
            id: "b-m1",
            text: "Posso reservar o Yoga no Deque às 7h para amanhã? Céu limpo previsto.",
        },
        {
            id: "b-m2",
            text: "O café no Terra começa em 20 min. Reservo uma mesa com vista?",
        },
    ],
    afternoon: [
        {
            id: "b-a1",
            text: "O veleiro ao pôr do sol tem 2 vagas hoje. Gostaria de garantir?",
        },
        {
            id: "b-a2",
            text: "Está quente lá fora. Posso preparar o ritual de spa das 16h?",
        },
    ],
    evening: [
        {
            id: "b-e1",
            text: "Boa noite, Helena. O Orla tem uma mesa livre às 20h — com vista mar.",
        },
        {
            id: "b-e2",
            text: "Jazz no Lounge começa em 40 min. Reservo seus lugares de sempre?",
        },
    ],
}

const CHAT_HISTORY = [
    { from: "butler", text: "Boa tarde, Helena. Como posso ajudar?" },
    {
        from: "butler",
        text: "Notei que você favoritou o veleiro ao pôr do sol. Hoje ainda há 2 vagas.",
    },
]

/* Notifications */
const NOTIFICATIONS = [
    {
        id: "n-1",
        category: "Reservas",
        unread: true,
        icon: "calendar",
        tint: "bronze",
        title: "Reserva confirmada no Orla",
        body: "Sua mesa para hoje às 20h está confirmada, vista mar.",
        when: "há 8 min",
        ts: "2026-04-18T15:32",
        action: { label: "Ver reserva", to: "stay" },
    },
    {
        id: "n-2",
        category: "Serviços",
        unread: true,
        icon: "bell",
        tint: "pending",
        title: "Mais toalhas — a caminho",
        body: "Camareira a caminho do quarto. Chegada em ~7 min.",
        when: "há 12 min",
        ts: "2026-04-18T15:28",
        action: { label: "Acompanhar", to: "stay" },
    },
    {
        id: "n-3",
        category: "Eventos",
        unread: true,
        icon: "sparkle",
        tint: "accent",
        title: "Jazz no Lounge começa em 40 min",
        body: "Você favoritou este evento. Reservo seus lugares de sempre?",
        when: "há 25 min",
        ts: "2026-04-18T15:15",
        action: { label: "Reservar lugares", to: "explore" },
    },
    {
        id: "n-4",
        category: "Mordomo",
        unread: false,
        icon: "sparkle",
        tint: "accent",
        title: "Mordomo tem uma sugestão",
        body: "Está quente lá fora. Posso preparar o ritual de spa das 16h?",
        when: "há 1 h",
        ts: "2026-04-18T14:40",
        action: { label: "Conversar", to: "butler" },
    },
    {
        id: "n-5",
        category: "Reservas",
        unread: false,
        icon: "calendar",
        tint: "success",
        title: "Lembrete — Veleiro ao pôr do sol",
        body: "Encontro no píer às 17h15. Leve um casaco leve.",
        when: "há 2 h",
        ts: "2026-04-18T13:40",
        action: { label: "Ver detalhes", to: "stay" },
    },
    {
        id: "n-6",
        category: "Hotel",
        unread: false,
        icon: "leaf",
        tint: "success",
        title: "Sua pegada de hoje",
        body: "78% da energia usada no resort veio do sol. Obrigado por estar conosco.",
        when: "hoje, 09h",
        ts: "2026-04-18T09:00",
        action: { label: "Saber mais", to: "info" },
    },
    {
        id: "n-7",
        category: "Boutique",
        unread: false,
        icon: "bag",
        tint: "bronze",
        title: "Novidade na Boutique",
        body: "O blend de chá da horta chegou em edição de abril.",
        when: "ontem",
        ts: "2026-04-17T18:00",
        action: { label: "Ver", to: "shop" },
    },
]

const NOTIF_CATEGORIES = [
    "Tudo",
    "Reservas",
    "Serviços",
    "Eventos",
    "Mordomo",
    "Boutique",
    "Hotel",
]

Object.assign(window, {
    GUEST,
    EXPLORE_CATEGORIES,
    EXPLORE_ITEMS,
    SERVICE_GROUPS,
    SHOP_CATEGORIES,
    SHOP_ITEMS,
    INFO_SECTIONS,
    BUTLER_SUGGESTIONS,
    CHAT_HISTORY,
    NOTIFICATIONS,
    NOTIF_CATEGORIES,
})
