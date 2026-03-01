import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TELEGRAM_BOT_URL = "https://t.me/your_bot";

const BONUSES = [
  "Бесплатный аудит",
  "Скидка 20%",
  "Чек-лист роста",
  "Бонус к запуску",
  "Разбор карточки",
  "Консультация",
];

const SERVICES = [
  {
    icon: "MapPin",
    title: "Продвижение в Яндекс Картах и 2ГИС",
    items: [
      "SEO-описание карточки",
      "Категории и атрибуты",
      "Работа с отзывами",
      "Рост показов и звонков",
    ],
  },
  {
    icon: "Globe",
    title: "Сайт за 68 часов",
    items: [
      "Адаптивный дизайн",
      "Структура под конверсию",
      "Форма заявки",
      "Базовая SEO-настройка",
    ],
  },
  {
    icon: "Bot",
    title: "Боты и автоматизация",
    items: [
      "Системный сбор отзывов",
      "Бот для привлечения трафика",
      "Автоматизация повторных касаний",
      "Повышение лояльности",
    ],
    tech: true,
  },
];

const FOR_WHOM = [
  { icon: "Scissors", label: "Салоны" },
  { icon: "Heart", label: "Стоматологии" },
  { icon: "Activity", label: "Клиники" },
  { icon: "Car", label: "Автосервисы" },
  { icon: "Building2", label: "Локальный бизнес" },
];

const PROBLEMS = [
  "Карточка есть, заявок нет",
  "Конкуренты выше в выдаче",
  "Мало отзывов",
  "Нет системной работы с клиентами",
];

const STEPS = [
  { num: "01", label: "Участвуете в рулетке" },
  { num: "02", label: "Получаете бонус или аудит" },
  { num: "03", label: "Получаете план роста" },
  { num: "04", label: "Запускаем продвижение" },
  { num: "05", label: "Фиксируем результат" },
];

const WORKS = [
  {
    category: "Яндекс Карты",
    title: "Стоматология «Улыбка»",
    result: "+340% показов за 2 месяца",
    tag: "Карты",
  },
  {
    category: "2ГИС + Сайт",
    title: "Автосервис «Мастер»",
    result: "×3 звонка из карт",
    tag: "Сайт",
  },
  {
    category: "Автоматизация",
    title: "Салон красоты «Мия»",
    result: "87 новых отзывов за месяц",
    tag: "Бот",
  },
];

function RouletteWidget() {
  const [spinning, setSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setRevealed(false);
    let i = 0;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BONUSES.length);
      i++;
      if (i > 18) {
        clearInterval(intervalRef.current!);
        setSpinning(false);
        setRevealed(true);
      }
    }, 80);
  };

  useEffect(() => () => clearInterval(intervalRef.current!), []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-xs">
        <div className="border border-border rounded-2xl overflow-hidden bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="text-xs text-muted-foreground font-body">бонус-рулетка</span>
          </div>
          <div className="relative h-20 flex items-center justify-center overflow-hidden">
            <div
              className={`text-center px-6 transition-all duration-75 ${spinning ? "blur-[1px] scale-95" : "blur-0 scale-100"}`}
            >
              <p className={`text-xl font-display font-bold ${revealed ? "text-brand" : "text-foreground"}`}>
                {BONUSES[currentIndex]}
              </p>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />
            </div>
          </div>
        </div>
        {revealed && (
          <div className="mt-3 text-center animate-fade-up">
            <p className="text-sm text-muted-foreground font-body">
              Ваш бонус определён! Получите его в боте →
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          onClick={handleSpin}
          disabled={spinning}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-white hover:bg-secondary/50 text-foreground font-display font-medium text-sm transition-all disabled:opacity-50"
        >
          <Icon name="RotateCcw" size={15} />
          {spinning ? "Крутится..." : "Крутить"}
        </button>
        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand text-white font-display font-semibold text-sm transition-all hover:opacity-90 animate-pulse-glow"
        >
          <span>🎁</span>
          Получить бонус
        </a>
      </div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Услуги" },
    { href: "#how", label: "Как работаем" },
    { href: "#works", label: "Примеры" },
    { href: "#about", label: "Обо мне" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          <a href="#hero" className="font-display font-bold text-lg text-foreground tracking-tight">
            Карты<span className="text-brand">.</span>про
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-sm text-muted-foreground hover:text-foreground font-body">
                {l.label}
              </a>
            ))}
          </div>
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-display font-medium hover:opacity-90 transition-opacity"
          >
            <span>🎁</span> Запустить рулетку
          </a>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-5 py-4 flex flex-col gap-4 animate-fade-up">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm text-foreground font-body py-1">
                {l.label}
              </a>
            ))}
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand text-white text-sm font-display font-semibold"
            >
              🎁 Запустить рулетку
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="pt-32 pb-24 md:pt-40 md:pb-32 px-5 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-light border border-brand/20 text-brand text-xs font-body font-medium mb-8 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              Яндекс Карты · 2ГИС · Telegram-боты
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.08] tracking-tight mb-6 animate-fade-up-delay-1">
              За 68 часов упакую ваш бизнес так, чтобы карты начали приводить клиентов
            </h1>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-10 animate-fade-up-delay-2">
              SEO-упаковка, сайт под конверсию и автоматизация сбора отзывов.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up-delay-3">
              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-brand text-white font-display font-bold text-base hover:opacity-90 transition-all animate-pulse-glow"
              >
                <span className="text-xl">🎁</span>
                Запустить рулетку и получить бонус
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground font-body animate-fade-up-delay-3">
              Разыгрываю бесплатный аудит, скидку на запуск и бонусы для бизнеса
            </p>
          </div>

          <div className="animate-fade-up-delay-2">
            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              <p className="font-display font-semibold text-lg text-foreground mb-1">
                Проверим, какой бонус достанется вам?
              </p>
              <p className="text-sm text-muted-foreground font-body mb-6">
                Нажмите кнопку и получите подарок в Telegram-боте
              </p>
              <RouletteWidget />
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground font-body text-center mb-3">Что можно выиграть:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {BONUSES.map((b) => (
                    <span key={b} className="px-2.5 py-1 rounded-full bg-secondary text-xs font-body text-muted-foreground">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR WHOM */}
      <section className="py-20 px-5 md:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs text-brand font-body font-medium uppercase tracking-widest mb-4">Для кого</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
                Малый и средний офлайн-бизнес
              </h2>
              <div className="flex flex-wrap gap-3">
                {FOR_WHOM.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-border text-sm font-body text-foreground">
                    <Icon name={item.icon} size={16} className="text-brand" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-brand font-body font-medium uppercase tracking-widest mb-4">Типичные проблемы</p>
              <div className="flex flex-col gap-3">
                {PROBLEMS.map((p) => (
                  <div key={p} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border">
                    <div className="w-5 h-5 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Minus" size={10} className="text-brand" />
                    </div>
                    <p className="text-sm font-body text-foreground">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-brand font-body font-medium uppercase tracking-widest mb-4">Услуги</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-12">
            Что я делаю
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className={`card-hover rounded-2xl p-8 border ${s.tech ? "bg-foreground text-white border-foreground" : "bg-white border-border"}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${s.tech ? "bg-white/10" : "bg-brand-light"}`}>
                  <Icon name={s.icon} size={20} className={s.tech ? "text-white" : "text-brand"} />
                </div>
                <h3 className={`font-display font-bold text-lg mb-5 ${s.tech ? "text-white" : "text-foreground"}`}>
                  {s.tech ? "Боты, которые работают вместо менеджера" : s.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${s.tech ? "bg-white/10" : "bg-brand-light"}`}>
                        <Icon name="Check" size={10} className={s.tech ? "text-white" : "text-brand"} />
                      </div>
                      <span className={`text-sm font-body ${s.tech ? "text-white/70" : "text-muted-foreground"}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-5 md:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-brand font-body font-medium uppercase tracking-widest mb-4">Процесс</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-12">
            Как проходит работа
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center mb-4 font-display font-black text-2xl text-brand shadow-sm">
                  {step.num}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-0 h-px bg-gradient-to-r from-border to-transparent" />
                )}
                <p className="text-sm font-body text-foreground leading-tight max-w-[120px]">{step.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand text-white font-display font-bold text-base hover:opacity-90 transition-all"
            >
              <span className="text-xl">🎁</span>
              Начать с рулетки — это бесплатно
            </a>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="py-24 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-brand font-body font-medium uppercase tracking-widest mb-4">Примеры работ</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-12">
            Результаты клиентов
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {WORKS.map((w) => (
              <div key={w.title} className="card-hover bg-white rounded-2xl border border-border overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
                  <Icon name="BarChart2" size={40} className="text-border" />
                </div>
                <div className="p-6">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-brand-light text-brand text-xs font-body font-medium mb-3">
                    {w.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-foreground mb-2">{w.title}</h3>
                  <p className="text-sm font-body text-muted-foreground">{w.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-5 md:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs text-brand font-body font-medium uppercase tracking-widest mb-4">Обо мне</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                Работаю так же, как строю семью — надолго и по-настоящему
              </h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                Я предприниматель, отец и счастливый муж. В работе для меня важны ответственность, честность и долгосрочный результат.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-10">
                Мне важно не «продать», а выстроить системный рост бизнеса клиента. Каждый проект — это партнёрство, а не разовая услуга.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Яндекс Карты", "2ГИС", "Telegram-боты", "Сайты под ключ"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-white border border-border text-sm font-body text-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="w-72 h-80 rounded-3xl overflow-hidden bg-secondary border border-border shadow-md">
                  <img
                    src="https://cdn.poehali.dev/projects/b4046174-4b9b-4675-9db9-692367635694/files/82fcdc3c-42ca-4767-b089-2f4b3fc670ee.jpg"
                    alt="Специалист по продвижению"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl border border-border px-4 py-3 shadow-sm">
                  <p className="font-display font-bold text-sm text-foreground">5+ лет опыта</p>
                  <p className="text-xs text-muted-foreground font-body">в продвижении офлайн-бизнеса</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contacts" className="py-24 px-5 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-brand font-body font-medium uppercase tracking-widest mb-4">Контакты</p>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Попробуйте — возможно, именно вам достанется максимальный бонус
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-10">
            Нажмите кнопку и перейдите в Telegram-бот. Контакт оставляете внутри — перед получением бонуса.
          </p>
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-brand text-white font-display font-black text-lg hover:opacity-90 transition-all animate-pulse-glow"
          >
            <span className="text-2xl">🎁</span>
            Перейти в бота и запустить рулетку
          </a>
          <p className="mt-4 text-xs text-muted-foreground font-body">
            Бесплатно · Без обязательств · Мгновенный результат
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-5 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display font-bold text-foreground">
            Карты<span className="text-brand">.</span>про
          </p>
          <div className="flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-body">© 2026</p>
        </div>
      </footer>
    </div>
  );
}