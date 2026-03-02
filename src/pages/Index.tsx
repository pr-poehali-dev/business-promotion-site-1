import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TG_BOT_URL = "https://t.me/algoritm_novikova_bot";
const PHOTO_URL = "https://cdn.poehali.dev/projects/b4046174-4b9b-4675-9db9-692367635694/files/fd600bc5-dfc8-42ac-a50c-4600cbad271a.jpg";

const BONUSES = [
  { label: "Бесплатный аудит", icon: "Search" },
  { label: "Скидка 20%", icon: "Tag" },
  { label: "Консультация", icon: "MessageCircle" },
  { label: "Чек-лист", icon: "CheckSquare" },
  { label: "Файл фишек", icon: "FileText" },
  { label: "Разбор карточки", icon: "Map" },
];

const STEPS = [
  { num: "01", title: "Переходите в Telegram", desc: "Нажмите кнопку — откроется бот Алгоритма Новикова", icon: "Send" },
  { num: "02", title: "Крутите колесо бонусов", desc: "Укажите контакт и запустите колесо — выпадет ваш подарок", icon: "RotateCw" },
  { num: "03", title: "Получаете подарок", desc: "Аудит, скидка, чек-лист или консультация — сразу на руки", icon: "Gift" },
  { num: "04", title: "Получаете план роста", desc: "Персональный разбор: что сделать, чтобы карты начали приносить клиентов", icon: "TrendingUp" },
];

const REPUTATION_FEATURES = [
  "Автоматически запрашивает отзыв у каждого клиента",
  "Разделяет позитив и негатив до публикации",
  "Направляет довольных на Яндекс Карты и 2ГИС",
  "Удерживает негатив внутри — не доходит до площадок",
  "Увеличивает количество отзывов в разы",
  "Повышает рейтинг и позиции в поиске",
];

const NAV_LINKS = [
  { href: "#video", label: "О системе" },
  { href: "#how", label: "Как работает" },
  { href: "#services", label: "Направления" },
  { href: "#trust", label: "Обо мне" },
];

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [wonBonus, setWonBonus] = useState<string | null>(null);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitShown, setExitShown] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitShown) {
        setShowExitPopup(true);
        setExitShown(true);
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [exitShown]);

  const spinWheel = () => {
    if (wheelSpinning || wonBonus) return;
    setWheelSpinning(true);
    const spins = 5 + Math.floor(Math.random() * 4);
    const extra = Math.floor(Math.random() * 360);
    setWheelAngle((prev) => prev + spins * 360 + extra);
    setTimeout(() => {
      setWheelSpinning(false);
      const idx = Math.floor(Math.random() * BONUSES.length);
      setWonBonus(BONUSES[idx].label);
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-[11px] text-foreground tracking-tight uppercase">Алгоритм</span>
            <span className="font-display font-black text-[11px] text-brand tracking-tight uppercase">Новикова</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={TG_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-white text-sm font-body font-semibold transition-all hover:opacity-90"
          >
            <Icon name="Send" size={14} />
            В Telegram
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-foreground">
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden animate-slide-down bg-white border-t border-border px-5 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm font-body text-foreground py-1">{l.label}</a>
            ))}
            <a
              href={TG_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-brand text-white font-body font-semibold text-sm"
            >
              <Icon name="Send" size={14} />
              🎁 Запустить рулетку
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative pt-28 pb-20 px-5 md:px-10 overflow-hidden dark-section grid-pattern min-h-screen flex items-center">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-500/8 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 mb-8 animate-fade-up">
                <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="text-xs font-body font-medium text-blue-300 uppercase tracking-widest">Алгоритм Новикова</span>
              </div>

              <h1 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6 animate-fade-up-1">
                За <span className="text-brand text-glow">68 часов</span> упакую ваш бизнес так, чтобы Яндекс Карты и 2ГИС начали{" "}
                <span className="text-brand">приводить клиентов</span>, а не просто показывать карточку.
              </h1>

              <p className="font-body text-base md:text-lg text-blue-100/70 mb-10 leading-relaxed animate-fade-up-2">
                Продвижение в картах, сайт под конверсию и системное управление репутацией.
              </p>

              <div className="animate-fade-up-3">
                <a
                  href={TG_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-brand text-white font-display font-bold text-base animate-pulse-glow transition-all hover:opacity-90 hover:scale-[1.02]"
                >
                  <span className="text-xl">🎁</span>
                  Запустить рулетку и получить бонус
                </a>
                <p className="font-body text-xs text-blue-200/40 mt-4">
                  Бесплатный аудит, скидки и полезные материалы для роста бизнеса.
                </p>
              </div>
            </div>

            {/* Wheel */}
            <div className="flex flex-col justify-center items-center gap-5 animate-fade-up-2">
              <div className="relative">
                <div
                  ref={wheelRef}
                  className="relative w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-brand/40 glow-blue"
                  style={{
                    transition: wheelSpinning ? "transform 3.2s cubic-bezier(0.17, 0.67, 0.12, 1)" : "none",
                    transform: `rotate(${wheelAngle}deg)`,
                  }}
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {BONUSES.map((b, i) => {
                      const startAngle = (i * 360) / BONUSES.length;
                      const endAngle = ((i + 1) * 360) / BONUSES.length;
                      const start = polarToCartesian(100, 100, 98, startAngle);
                      const end = polarToCartesian(100, 100, 98, endAngle);
                      const mid = polarToCartesian(100, 100, 65, (startAngle + endAngle) / 2);
                      const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                      return (
                        <g key={i}>
                          <path
                            d={`M 100 100 L ${start.x} ${start.y} A 98 98 0 ${largeArc} 1 ${end.x} ${end.y} Z`}
                            fill={i % 2 === 0 ? "#0a1628" : "#0d1e38"}
                            stroke="rgba(0,132,255,0.3)"
                            strokeWidth="0.5"
                          />
                          <text
                            x={mid.x}
                            y={mid.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="rgba(255,255,255,0.85)"
                            fontSize="7"
                            fontFamily="Golos Text"
                            fontWeight="600"
                            transform={`rotate(${(startAngle + endAngle) / 2}, ${mid.x}, ${mid.y})`}
                          >
                            {b.label.split(" ").map((word, wi) => (
                              <tspan key={wi} x={mid.x} dy={wi === 0 ? "-0.4em" : "1.2em"}>{word}</tspan>
                            ))}
                          </text>
                        </g>
                      );
                    })}
                    <circle cx="100" cy="100" r="14" fill="#0a0f1e" stroke="rgba(0,132,255,0.6)" strokeWidth="2" />
                    <circle cx="100" cy="100" r="7" fill="#0084ff" />
                  </svg>
                </div>
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[16px] border-t-transparent border-b-transparent border-l-brand" />
                </div>

                {wonBonus && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#0a0f1e]/95 border border-brand rounded-2xl px-5 py-4 text-center animate-exit-pop">
                      <div className="text-3xl mb-2">🎉</div>
                      <p className="text-white font-display font-bold text-base">{wonBonus}</p>
                      <a
                        href={TG_BOT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-brand text-white text-xs font-body font-semibold"
                      >
                        Забрать в Telegram
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {!wonBonus && (
                <button
                  onClick={spinWheel}
                  disabled={wheelSpinning}
                  className="px-6 py-2.5 rounded-xl bg-brand/20 border border-brand/40 text-brand text-sm font-body font-semibold hover:bg-brand/30 transition-colors disabled:opacity-50"
                >
                  {wheelSpinning ? "Крутится..." : "↻ Крутить превью"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="py-24 px-5 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-brand mb-4">Видео-презентация</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mb-4">
            Что такое Алгоритм Новикова?
          </h2>
          <p className="font-body text-muted-foreground mb-10 text-base md:text-lg">
            Иван лично объясняет систему: 3 направления, логика роста заявок и механика работы с отзывами.
          </p>
          <div className="relative rounded-3xl overflow-hidden bg-foreground aspect-video flex items-center justify-center border border-border shadow-2xl">
            <div className="absolute inset-0 dark-section grid-pattern" />
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center shadow-2xl glow-blue animate-float">
                <Icon name="Play" size={32} className="text-white ml-1" />
              </div>
              <p className="font-body text-white/50 text-sm">Вставьте ссылку на видео — я размещу плеер</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-5 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-brand mb-4">Механика</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mb-14">
            Как работает Алгоритм Новикова
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="card-hover relative bg-white rounded-2xl p-7 border border-border group">
                <div className="flex items-start justify-between mb-5">
                  <span className="font-display font-black text-4xl text-border group-hover:text-brand/20 transition-colors">{step.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center">
                    <Icon name={step.icon} size={18} className="text-brand" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-2">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="font-body text-sm text-muted-foreground mb-5">
              Перед получением бонуса пользователь оставляет контакт в Telegram — так формируется ваша база клиентов.
            </p>
            <a
              href={TG_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-brand text-white font-display font-bold text-sm hover:opacity-90 transition-opacity"
            >
              <span>🎁</span>
              Запустить рулетку
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-5 md:px-10 dark-section grid-pattern">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-brand mb-4">3 направления</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-14">Алгоритм Новикова</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover rounded-2xl p-8 border border-blue-500/20 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-brand/20 flex items-center justify-center mb-6">
                <Icon name="MapPin" size={22} className="text-brand" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-4">Продвижение в Яндекс Картах и 2ГИС</h3>
              <ul className="flex flex-col gap-3">
                {["SEO-описание и категории", "Атрибуты и витрина услуг", "Рост показов и звонков", "Усиление доверия к карточке"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span className="font-body text-sm text-blue-100/75">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-hover rounded-2xl p-8 border border-brand/40 bg-brand/10 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-body font-semibold text-brand bg-brand/20 px-2.5 py-1 rounded-full">68 часов</div>
              <div className="w-12 h-12 rounded-2xl bg-brand/20 flex items-center justify-center mb-6">
                <Icon name="Globe" size={22} className="text-brand" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-4">Сайт за 68 часов</h3>
              <ul className="flex flex-col gap-3">
                {["Современный адаптивный дизайн", "Структура под конверсию", "Форма заявки и логика блоков", "Базовая SEO-настройка"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span className="font-body text-sm text-blue-100/75">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-hover rounded-2xl p-8 border border-blue-500/20 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-brand/20 flex items-center justify-center mb-6">
                <Icon name="Star" size={22} className="text-brand" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-1">Управление репутацией</h3>
              <p className="font-body text-xs text-brand mb-4 font-semibold uppercase tracking-wide">Системный рост отзывов и рейтинга</p>
              <p className="font-body text-sm text-blue-100/60 mb-4">Персональные решения под вашу нишу и аудиторию.</p>
              <ul className="flex flex-col gap-2">
                {REPUTATION_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Icon name="Check" size={13} className="text-brand mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-blue-100/75">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 p-3 rounded-xl bg-brand/15 border border-brand/30">
                <p className="font-body text-xs text-brand font-semibold">Результат: больше доверия → больше обращений</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BONUSES */}
      <section id="bonuses" className="py-24 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-brand mb-4">Колесо бонусов</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mb-4">Что можно выиграть</h2>
          <p className="font-body text-muted-foreground mb-12 text-base">
            Крутите колесо в Telegram-боте и получайте реальную пользу для бизнеса.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BONUSES.map((b, i) => (
              <div key={i} className="card-hover flex items-center gap-4 p-5 rounded-2xl border border-border bg-background hover:border-brand/40 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0 group-hover:bg-brand/15 transition-colors">
                  <Icon name={b.icon} size={20} className="text-brand" />
                </div>
                <div>
                  <p className="font-display font-bold text-base text-foreground">{b.label}</p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">Может выпасть вам</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={TG_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand text-white font-display font-bold text-base animate-pulse-glow hover:opacity-90 transition-opacity"
            >
              <span>🎁</span>
              Перейти в Telegram и запустить колесо
            </a>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="py-24 px-5 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-brand mb-4">Личная ответственность</p>
              <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                Алгоритм работает, потому что я отвечаю за результат лично.
              </h2>
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
                Я Иван Новиков — предприниматель, отец и счастливый муж.
                Работаю системно и на долгосрочный результат.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "68ч", label: "Срок упаковки" },
                  { value: "100+", label: "Проектов" },
                  { value: "5★", label: "Средний рейтинг" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white border border-border p-4 text-center">
                    <div className="font-display font-black text-2xl text-brand">{s.value}</div>
                    <div className="font-body text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <a
                href={TG_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand text-brand font-display font-bold text-sm hover:bg-brand hover:text-white transition-all"
              >
                <Icon name="Send" size={15} />
                Написать Ивану
              </a>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
                <img src={PHOTO_URL} alt="Иван Новиков" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white border border-border rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-body text-sm font-semibold text-foreground">Доступен для консультации</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-5 md:px-10 dark-section grid-pattern relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/5 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="text-5xl mb-6">🎁</div>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight">
            Попробуйте Алгоритм Новикова и получите персональный план роста
          </h2>
          <p className="font-body text-blue-100/60 text-base mb-10">
            Бесплатный аудит, скидки и полезные материалы — всё через колесо бонусов.
          </p>
          <a
            href={TG_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-5 rounded-2xl bg-brand text-white font-display font-black text-lg animate-pulse-glow hover:opacity-90 hover:scale-[1.02] transition-all"
          >
            <Icon name="Send" size={20} />
            Перейти в Telegram и запустить колесо
          </a>
          <p className="font-body text-xs text-blue-200/30 mt-5">Бесплатно. Без обязательств.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-5 md:px-10 bg-[#050a14] border-t border-blue-900/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-display font-black text-sm text-white uppercase">Алгоритм Новикова</span>
            <span className="font-body text-xs text-blue-400/50 ml-2">— система роста заявок</span>
          </div>
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="font-body text-xs text-blue-400/50 hover:text-blue-400 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* STICKY CTA */}
      {stickyVisible && (
        <a
          href={TG_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-brand text-white font-display font-bold text-sm shadow-2xl animate-pulse-glow hover:opacity-90 transition-opacity animate-exit-pop"
        >
          <span>🎁</span>
          <span className="hidden sm:inline">Запустить рулетку</span>
          <Icon name="Send" size={15} />
        </a>
      )}

      {/* EXIT POPUP */}
      {showExitPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowExitPopup(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-exit-pop text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="font-display font-black text-2xl text-foreground mb-3">Подождите!</h3>
            <p className="font-body text-muted-foreground mb-6">
              Прежде чем уйти — получите бонус бесплатно. Крутите колесо и заберите подарок для вашего бизнеса.
            </p>
            <a
              href={TG_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-brand text-white font-display font-bold text-base mb-3 hover:opacity-90 transition-opacity"
            >
              <span>🎁</span>
              Запустить рулетку
            </a>
            <button
              onClick={() => setShowExitPopup(false)}
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Нет, спасибо
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
