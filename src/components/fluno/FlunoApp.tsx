import { useEffect, useState, type ReactNode } from "react";
import {
  Home, PlaySquare, Bookmark, User, Play, ChevronLeft, ChevronRight, Copy, Volume2,
  Languages, SlidersHorizontal, Sparkles, Settings, Bell, Globe, HelpCircle, Calendar,
  CircleDot, Compass, MoreHorizontal, Loader2, Type, ListChecks,
} from "lucide-react";
import paris from "@/assets/paris.jpg";
import friends from "@/assets/friends.jpg";
import office from "@/assets/office.jpg";

type Screen = "splash" | "welcome" | "signup" | "app";
type Tab = "home" | "browse" | "library" | "profile";

function Logo({ size = 20, light = false }: { size?: number; light?: boolean }) {
  const bars = [0.45, 1, 0.7, 0.4];
  return (
    <span className="inline-flex items-center gap-[3px]" style={{ height: size }}>
      {bars.map((h, i) => (
        <span
          key={i}
          className={`rounded-full ${light ? "bg-background" : "bg-brand"}`}
          style={{ width: size * 0.18, height: size * h }}
        />
      ))}
    </span>
  );
}

function Wordmark() {
  return (
    <div className="flex items-center gap-2">
      <Logo size={22} />
      <span className="text-[26px] font-medium tracking-tight">fluno</span>
    </div>
  );
}

function StatusBar({ light }: { light?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-7 pt-3 pb-1 text-sm font-semibold ${light ? "text-background" : "text-foreground"}`}>
      <span>4:21</span>
      <span className="flex items-center gap-1 text-xs">●●● ▮</span>
    </div>
  );
}

function Streak() {
  return (
    <div className="flex items-center gap-1 rounded-full bg-background px-3 py-1.5 text-sm font-semibold shadow-sm">
      🔥 7
    </div>
  );
}

/* ---------------- Onboarding ---------------- */

function Splash({ next }: { next: () => void }) {
  useEffect(() => {
    const t = setTimeout(next, 1800);
    return () => clearTimeout(t);
  }, [next]);
  return (
    <button onClick={next} className="relative flex h-full w-full items-center justify-center bg-brand">
      <div className="absolute flex items-center gap-4 opacity-25">
        <span className="h-24 w-12 rounded-full bg-background" />
        <span className="h-48 w-12 rounded-full bg-background" />
        <span className="h-24 w-12 rounded-full bg-background" />
        <span className="h-16 w-12 rounded-full bg-background" />
      </div>
      <div className="relative flex items-center gap-2">
        {[0.45, 1, 0.7, 0.4].map((h, i) => (
          <span key={i} className="animate-wave w-3 rounded-full bg-background" style={{ height: 80 * h, animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </button>
  );
}

function Welcome({ next }: { next: () => void }) {
  return (
    <div className="animate-screen flex h-full flex-col bg-brand text-background">
      <StatusBar light />
      <div className="mt-6 flex justify-center"><Logo size={36} light /></div>
      <div className="relative mx-auto mt-6 h-[380px] w-full">
        <div className="absolute left-1/2 top-0 w-[200px] -translate-x-1/2 rotate-6 rounded-3xl bg-background p-3 text-foreground shadow-2xl">
          <p className="mb-2 text-sm font-medium">Library</p>
          {[paris, office, friends].map((src, i) => (
            <div key={i} className="mb-2 overflow-hidden rounded-xl">
              <img src={src} alt="" className="h-24 w-full object-cover" />
            </div>
          ))}
        </div>
        <img src={friends} alt="" className="absolute left-4 top-6 h-24 w-36 -rotate-6 rounded-xl object-cover shadow-xl" />
        <img src={office} alt="" className="absolute right-3 bottom-6 h-24 w-32 rotate-12 rounded-xl object-cover shadow-xl" />
      </div>
      <h1 className="mt-auto px-6 text-center text-[34px] font-medium leading-tight">Watch - Immerse yourself in videos</h1>
      <div className="space-y-3 px-6 pb-10 pt-8">
        <button onClick={next} className="w-full rounded-full bg-background py-4 font-medium text-foreground">Sign Up</button>
        <button onClick={next} className="w-full py-2 font-medium">Log In</button>
      </div>
    </div>
  );
}

function SignUp({ next }: { next: () => void }) {
  const [email, setEmail] = useState("lilysmith@gmail.com");
  const [loading, setLoading] = useState(false);
  const go = () => {
    setLoading(true);
    setTimeout(next, 1100);
  };
  return (
    <div className="animate-screen flex h-full flex-col bg-background px-6">
      <StatusBar />
      <div className="mt-6 flex justify-center"><Wordmark /></div>
      <h1 className="mt-16 text-center text-3xl font-medium">Get started learning</h1>
      <p className="mt-6 text-center text-muted-foreground">Sign Up with Email</p>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-4 rounded-full bg-surface px-5 py-4 outline-none" />
      <button onClick={go} className="mt-4 flex h-14 items-center justify-center rounded-full bg-ink font-medium text-ink-foreground">
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Continue"}
      </button>
      <div className="my-6 flex items-center gap-4 text-sm text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
      <button onClick={go} className="mb-3 rounded-full border border-border py-3.5 font-medium"> Continue with Apple</button>
      <button onClick={go} className="rounded-full border border-border py-3.5 font-medium"><span className="font-bold text-brand">G</span> Continue with Google</button>
      <p className="mt-8 text-center text-sm text-muted-foreground">Already have an account? <button onClick={go} className="font-medium text-foreground">Sign In</button></p>
      <p className="mt-6 text-center text-sm text-muted-foreground">By signing up, you agree to our <b className="font-medium text-foreground">Terms, Privacy Policy</b></p>
    </div>
  );
}

/* ---------------- Tabs ---------------- */

const days = [["Mon", 4, "dash"], ["Tue", 5, "done"], ["Wed", 6, "dash"], ["Thu", 7, "done"], ["Fri", 8, "today"], ["Sat", 9, "future"], ["Sun", 10, "future"]] as const;

function DayRing({ n, kind }: { n: number; kind: string }) {
  const cls = {
    dash: "border-dashed border-muted-foreground/50",
    done: "border-foreground",
    today: "border-foreground",
    future: "border-border text-muted-foreground",
  }[kind];
  return <span className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm ${cls}`}>{n}</span>;
}

function VideoCard({ img, title, sub, tags, onClick, h = "h-52" }: { img: string; title: string; sub?: string; tags: string[]; onClick?: () => void; h?: string }) {
  return (
    <button onClick={onClick} className={`relative w-full shrink-0 overflow-hidden rounded-2xl text-left text-background ${h}`}>
      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
      <div className="absolute left-4 top-4 flex gap-2">
        {tags.map((t) => <span key={t} className="rounded-full bg-background/25 px-3 py-1 text-xs font-medium backdrop-blur">{t}</span>)}
      </div>
      <div className="absolute inset-x-4 bottom-4">
        <p className="font-medium">{title}</p>
        {sub && <p className="truncate text-sm opacity-80">{sub}</p>}
      </div>
    </button>
  );
}

function HomeTab({ open }: { open: () => void }) {
  return (
    <div className="space-y-6 px-5 pb-32">
      <div className="flex items-center justify-between pt-2"><Wordmark /><Streak /></div>
      <div className="flex justify-between">
        {days.map(([d, n, k]) => (
          <div key={d} className={`flex flex-col items-center gap-1.5 rounded-2xl px-1 py-2 text-xs ${k === "today" ? "bg-background font-semibold shadow-sm" : "text-muted-foreground"}`}>
            {d}<DayRing n={n} kind={k} />
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-background p-4">
        <p className="text-lg font-medium">Practice with AI today</p>
        <div className="mt-2 flex gap-2 text-sm">{["eloquent", "negotiate", "+3"].map((t) => <span key={t} className="rounded-full bg-surface px-3 py-1">{t}</span>)}</div>
        <button className="mt-4 flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground"><Play size={14} fill="currentColor" /> Start Session</button>
      </div>
      <section>
        <h2 className="mb-3 text-xl font-medium">Continue watching</h2>
        <div className="relative">
          <VideoCard img={paris} tags={["A2", "Adults"]} title="Conversations with Emily in Paris" sub="Phrases native speakers actually use." onClick={open} />
          <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden rounded-b-2xl bg-background/30"><div className="h-full w-1/4 bg-background" /></div>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-medium">Picked for you</h2>
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          <div className="w-[85%] shrink-0"><VideoCard img={friends} tags={["B1", "Adults"]} title="How to Sound Like a Native Speaker" onClick={open} /></div>
          <div className="w-[85%] shrink-0"><VideoCard img={office} tags={["B2", "Adults"]} title="Speak English with The Devil Wears Prada" onClick={open} /></div>
        </div>
      </section>
    </div>
  );
}

function BrowseTab({ open }: { open: () => void }) {
  const [chip, setChip] = useState("For You");
  return (
    <div className="space-y-6 px-5 pb-32">
      <div className="flex items-center justify-between pt-2"><h1 className="text-3xl font-medium">Browse</h1><Streak /></div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
        {["For You", "YouTube", "Netflix", "Curated", "Popular"].map((c) => (
          <button key={c} onClick={() => setChip(c)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${chip === c ? "bg-border" : "bg-background"}`}>{c}</button>
        ))}
      </div>
      <section>
        <h2 className="mb-3 text-xl font-medium">Collections picked for you</h2>
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {[["Conversations That Stick", "bg-lemon", "45m"], ["Movie Lines You'll Recognize", "bg-lilac", "36m"], ["Everyday Slang", "bg-brand-soft", "28m"]].map(([t, bg, d]) => (
            <button key={t} onClick={open} className={`flex h-48 w-44 shrink-0 flex-col justify-between rounded-2xl p-4 text-left ${bg}`}>
              <span className="text-lg font-medium leading-snug">{t}</span>
              <span className="flex w-fit items-center gap-1 rounded-full bg-background/40 px-3 py-1 text-sm font-medium"><Play size={12} fill="currentColor" />{d}</span>
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-medium">Trending now</h2>
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          <div className="w-[85%] shrink-0"><VideoCard img={friends} tags={["B1", "Adults"]} title="How to Sound Like a Native Speaker" onClick={open} /></div>
          <div className="w-[85%] shrink-0"><VideoCard img={paris} tags={["A2", "Adults"]} title="Speak French with Emily in Paris" onClick={open} /></div>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-medium">Short & Easy</h2>
        <VideoCard img={office} tags={["A1", "Teens"]} title="Office Small Talk in 5 Minutes" onClick={open} h="h-44" />
      </section>
    </div>
  );
}

const words = [["comprendre", "to understand"], ["réunion", "meeting"], ["façon", "a way / manner"], ["d'accord", "okay / agreed"]];

function LibraryTab() {
  const [tab, setTab] = useState("Words");
  return (
    <div className="space-y-4 px-5 pb-40">
      <div className="flex items-center justify-between pt-2"><h1 className="text-3xl font-medium">Library</h1><Streak /></div>
      <div className="flex items-center gap-5">
        {["Videos", "Words", "Sentences"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`pb-1 text-lg ${tab === t ? "border-b-2 border-foreground font-medium" : "text-muted-foreground"}`}>{t}</button>
        ))}
        <button className="ml-auto flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm"><SlidersHorizontal size={16} />Filters</button>
      </div>
      {tab === "Videos" ? (
        <div className="space-y-3">
          <VideoCard img={paris} tags={["A2"]} title="Speak French with Emily in Paris" h="h-40" />
          <VideoCard img={office} tags={["B2"]} title="The Devil Wears Prada" h="h-40" />
        </div>
      ) : (
        <div className="space-y-3">
          {(tab === "Words" ? words : [["Je ne sais pas.", "I don't know."], ["On y va ?", "Shall we go?"]]).map(([w, t]) => (
            <div key={w} className="rounded-2xl bg-background p-4">
              <div className="flex items-center justify-between"><p className="text-lg font-medium">{w}</p><div className="flex gap-3"><Copy size={18} /><Volume2 size={18} /></div></div>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Languages size={16} />{t}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><PlaySquare size={16} />Speak French with Emily in Paris</p>
            </div>
          ))}
        </div>
      )}
      <button className="absolute bottom-28 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-ink-foreground shadow-lg"><Sparkles size={16} />Practice with AI</button>
    </div>
  );
}

function ProfileTab() {
  const Row = ({ icon, label }: { icon: ReactNode; label: string }) => (
    <button className="flex w-full items-center gap-3 border-b border-border py-4 text-lg">{icon}<span className="flex-1 text-left">{label}</span><ChevronRight size={20} /></button>
  );
  return (
    <div className="px-5 pb-32">
      <div className="flex items-center gap-4 pt-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-xl font-semibold text-background">LS</div>
        <div className="flex-1"><p className="text-2xl font-medium">Lily Smith</p><p className="text-muted-foreground">@lilysmith</p></div>
        <Settings />
      </div>
      <div className="mt-6 rounded-2xl bg-background p-4">
        <p className="font-medium">Daily Streak</p>
        <div className="mt-3 flex justify-between">
          {days.map(([d, n, k]) => (
            <div key={d} className="flex flex-col items-center gap-1.5 text-xs text-muted-foreground">
              {d[0]}
              {k === "today" ? <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-success text-sm text-foreground">{n}</span> : <DayRing n={n} kind={k} />}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">Account</p>
      <Row icon={<User size={22} />} label="Personal Details" />
      <Row icon={<Compass size={22} />} label="Preferences" />
      <Row icon={<Bell size={22} />} label="Notifications" />
      <Row icon={<Globe size={22} />} label="Language" />
      <Row icon={<HelpCircle size={22} />} label="About and Support" />
      <p className="mt-6 text-sm text-muted-foreground">Streak</p>
      <Row icon={<Calendar size={22} />} label="Streak Calendar" />
      <Row icon={<CircleDot size={22} />} label="Ring Colors Explained" />
    </div>
  );
}

function VideoDetail({ back }: { back: () => void }) {
  return (
    <div className="animate-screen absolute inset-0 z-30 overflow-y-auto bg-surface pb-10">
      <div className="relative h-64">
        <img src={paris} alt="" className="h-full w-full object-cover" />
        <button onClick={back} className="absolute left-5 top-12 flex h-9 w-9 items-center justify-center rounded-full bg-background/40 text-background backdrop-blur"><ChevronLeft size={20} /></button>
      </div>
      <div className="space-y-5 bg-background p-5">
        <h1 className="text-2xl font-medium">Speak French with Emily in Paris</h1>
        <div className="flex items-center gap-2 text-sm"><span className="rounded-full bg-surface px-3 py-1">A2 - B1</span><span className="rounded-full bg-surface px-3 py-1">Adults</span><span className="ml-auto flex items-center gap-1 font-medium"><Play size={12} fill="currentColor" />45m</span></div>
        <p className="text-muted-foreground">Follow Emily's Parisian adventures and pick up real French words as you watch. Real scenes, real phrases.</p>
        <div className="flex gap-3">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-4 font-medium text-ink-foreground"><Play size={16} fill="currentColor" />Start Watching</button>
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-surface"><Bookmark size={20} /></button>
        </div>
        <div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Watching time</span><span>26/42 mins left</span></div>
          <div className="mt-2 h-2 rounded-full bg-surface"><div className="h-full w-[38%] rounded-full bg-brand" /></div>
        </div>
      </div>
      <div className="p-5">
        <p className="mb-3 text-sm text-muted-foreground">Learning Progress</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-background p-4"><Type size={20} /><p className="mt-3 text-muted-foreground">Words:</p><p className="text-lg">87<span className="text-muted-foreground">/285</span></p></div>
          <div className="rounded-2xl bg-background p-4"><ListChecks size={20} /><p className="mt-3 text-muted-foreground">Sentences:</p><p className="text-lg">18<span className="text-muted-foreground">/66</span></p></div>
        </div>
      </div>
    </div>
  );
}

function TabBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: [Tab, string, typeof Home][] = [["home", "Home", Home], ["browse", "Browse", PlaySquare], ["library", "Library", Bookmark], ["profile", "Profile", User]];
  return (
    <nav className="absolute inset-x-4 bottom-6 z-20 flex rounded-full bg-background/90 p-1.5 shadow-lg backdrop-blur">
      {items.map(([id, label, Icon]) => {
        const active = tab === id;
        return (
          <button key={id} onClick={() => setTab(id)} className={`flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-xs transition-colors ${active ? "bg-surface font-semibold text-foreground" : "text-muted-foreground"}`}>
            <Icon size={20} fill={active ? "currentColor" : "none"} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

function MainApp() {
  const [tab, setTab] = useState<Tab>("home");
  const [detail, setDetail] = useState(false);
  const open = () => setDetail(true);
  return (
    <div className="relative h-full bg-surface">
      <div key={tab} className="animate-screen no-scrollbar h-full overflow-y-auto">
        <StatusBar />
        {tab === "home" && <HomeTab open={open} />}
        {tab === "browse" && <BrowseTab open={open} />}
        {tab === "library" && <LibraryTab />}
        {tab === "profile" && <ProfileTab />}
      </div>
      <TabBar tab={tab} setTab={(t) => { setDetail(false); setTab(t); }} />
      {detail && <VideoDetail back={() => setDetail(false)} />}
    </div>
  );
}

export function FlunoApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  return (
    <div className="flex min-h-screen items-center justify-center bg-stage p-4">
      <div className="relative h-[844px] w-[390px] overflow-hidden rounded-[48px] border-[10px] border-ink bg-background shadow-2xl">
        {screen === "splash" && <Splash next={() => setScreen("welcome")} />}
        {screen === "welcome" && <Welcome next={() => setScreen("signup")} />}
        {screen === "signup" && <SignUp next={() => setScreen("app")} />}
        {screen === "app" && <MainApp />}
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-40 h-1.5 w-32 -translate-x-1/2 rounded-full bg-ink/80" />
        {screen !== "splash" && (
          <button onClick={() => setScreen("splash")} className="absolute right-4 top-3 z-50 opacity-0" aria-label="Restart"><MoreHorizontal /></button>
        )}
      </div>
    </div>
  );
}
