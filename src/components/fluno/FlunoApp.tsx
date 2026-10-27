import { useEffect, useState, type ReactNode } from "react";
import {
  Home, Bookmark, User, Play, ChevronLeft, ChevronRight, Copy, Volume2, Languages,
  SlidersHorizontal, Settings, Bell, HelpCircle, CalendarDays, MoreHorizontal, SquarePlay,
  WandSparkles, Type, ScrollText, Compass, CircleDashed,
} from "lucide-react";
import emily from "@/assets/emily.jpg";
import emily2 from "@/assets/emily2.jpg";
import friends from "@/assets/friends.jpg";
import collage from "@/assets/collage.png.asset.json";
import avatar from "@/assets/avatar.png.asset.json";

type Screen = "splash" | "welcome" | "signup" | "app";
type Tab = "home" | "browse" | "library" | "profile";

/* ---------- shared ---------- */

function Mark({ size = 24, light = false }: { size?: number; light?: boolean }) {
  const c = light ? "bg-background" : "bg-brand";
  const w = size * 0.2;
  return (
    <span className="inline-flex items-center" style={{ height: size, gap: size * 0.1 }}>
      <span className={`rounded-full ${c}`} style={{ width: w, height: size * 0.5 }} />
      <span className={`rounded-full ${c}`} style={{ width: w, height: size }} />
      <span className={`rounded-full ${c}`} style={{ width: w, height: size * 0.6 }} />
      <span className={`rounded-full ${c}`} style={{ width: w, height: size * 0.35 }} />
    </span>
  );
}

function Wordmark({ size = 30 }: { size?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <Mark size={size * 0.7} />
      <span className="font-medium tracking-tight" style={{ fontSize: size, lineHeight: 1 }}>fluno</span>
    </div>
  );
}

function StatusBar({ light }: { light?: boolean }) {
  const c = light ? "text-background" : "text-foreground";
  return (
    <div className={`flex h-11 shrink-0 items-center justify-between px-7 text-[15px] font-semibold ${c}`}>
      <span>4:21</span>
      <span className="flex items-center gap-1.5">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 2.2c2 0 3.9.8 5.3 2.1l1.1-1.1A9 9 0 0 0 7.5.6 9 9 0 0 0 1.1 3.2l1.1 1.1A7.5 7.5 0 0 1 7.5 2.2Zm0 3.2c1.2 0 2.2.4 3 1.2l1.1-1.1a6 6 0 0 0-8.2 0l1.1 1.1c.8-.8 1.8-1.2 3-1.2Zm0 3.2-1.6 1.6L7.5 11l1.6-1.6-1.6-.8Z"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="3" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="18" height="8" rx="1.8" fill="currentColor"/><rect x="23" y="4" width="1.5" height="4" rx=".7" fill="currentColor" opacity=".4"/></svg>
      </span>
    </div>
  );
}

function HomeIndicator({ light }: { light?: boolean }) {
  return <div className={`pointer-events-none absolute bottom-2 left-1/2 z-40 h-[5px] w-36 -translate-x-1/2 rounded-full ${light ? "bg-background" : "bg-ink"}`} />;
}

function Streak() {
  return <div className="flex h-9 items-center gap-1 rounded-full bg-background px-3 text-[15px] font-medium">🔥<span>7</span></div>;
}

function Pill({ children, glass }: { children: ReactNode; glass?: boolean }) {
  return (
    <span className={`rounded-full px-3 py-1 text-[13px] font-medium ${glass ? "bg-background/30 text-background backdrop-blur" : "bg-surface"}`}>{children}</span>
  );
}

/* ---------- onboarding ---------- */

function Splash({ next }: { next: () => void }) {
  useEffect(() => {
    const t = setTimeout(next, 1800);
    return () => clearTimeout(t);
  }, [next]);
  return (
    <button onClick={next} className="relative flex h-full w-full flex-col bg-brand">
      <StatusBar light />
      <div className="relative flex flex-1 items-center justify-center">
        <div className="absolute flex items-center gap-6">
          <span className="h-[90px] w-[42px] rounded-full bg-background/15" />
          <span className="h-[200px] w-[48px] rounded-full bg-background/15" />
          <span className="h-[90px] w-[42px] rounded-full bg-background/15" />
          <span className="h-[90px] w-[42px] rounded-full bg-background/15" />
        </div>
        <div className="relative"><Mark size={80} light /></div>
      </div>
      <HomeIndicator light />
    </button>
  );
}

function Welcome({ next }: { next: () => void }) {
  return (
    <div className="animate-screen relative flex h-full flex-col bg-brand text-background">
      <StatusBar light />
      <div className="mt-5 flex justify-center"><Mark size={40} light /></div>
      <img src={collage.url} alt="" className="mx-auto mt-4 w-[340px]" />
      <h1 className="mt-auto px-6 text-center text-[38px] font-medium leading-[1.12] tracking-tight">Watch - Immerse yourself in videos</h1>
      <div className="px-4 pb-12 pt-7">
        <button onClick={next} className="h-14 w-full rounded-full bg-background text-[17px] font-medium text-foreground">Sign Up</button>
        <button onClick={next} className="mt-3 h-11 w-full text-[17px] font-medium">Log In</button>
      </div>
      <HomeIndicator light />
    </div>
  );
}

function SignUp({ next }: { next: () => void }) {
  const [email, setEmail] = useState("lilysmith@gmail.com");
  return (
    <div className="animate-screen relative flex h-full flex-col bg-background px-4">
      <StatusBar />
      <div className="mt-6 flex justify-center"><Wordmark size={32} /></div>
      <h1 className="mt-14 text-center text-[33px] font-medium tracking-tight">Get started learning</h1>
      <p className="mt-6 text-center text-[17px] text-muted-foreground">Sign Up with Email</p>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-4 h-14 rounded-full bg-surface px-5 text-[17px] outline-none" />
      <button onClick={next} className="mt-3 h-14 rounded-full bg-ink text-[17px] font-medium text-ink-foreground">Sign In</button>
      <div className="my-5 flex items-center gap-4 text-[17px] text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
      <button onClick={next} className="flex h-14 items-center justify-center gap-2 rounded-full border border-border text-[17px] font-medium">
        <svg width="18" height="20" viewBox="0 0 17 20" fill="currentColor"><path d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.8 2 5.8 1.1 7.4c-1.8 3.2-.5 7.9 1.3 10.4.9 1.3 1.9 2.7 3.2 2.6 1.3-.1 1.8-.8 3.4-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.2-2.6 1-1.4 1.4-2.9 1.4-3-.1 0-2.9-1.1-2.9-4.2ZM11.6 3c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5Z"/></svg>
        Continue with Apple
      </button>
      <button onClick={next} className="mt-3 flex h-14 items-center justify-center gap-2 rounded-full border border-border text-[17px] font-medium">
        <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
        Continue with Google
      </button>
      <p className="mt-9 text-center text-[15px] text-muted-foreground">Already have an account? <button onClick={next} className="font-medium text-foreground">Sign In</button></p>
      <p className="mt-6 text-center text-[15px] text-muted-foreground">By signing up, you agree to our <b className="font-medium text-foreground">Terms, Privacy Policy</b></p>
      <HomeIndicator />
    </div>
  );
}

/* ---------- tabs ---------- */

const week = [
  { d: "Mon", n: 4, k: "dash" }, { d: "Tue", n: 5, k: "done" }, { d: "Wed", n: 6, k: "dash" },
  { d: "Thu", n: 7, k: "done" }, { d: "Fri", n: 8, k: "today" }, { d: "Sat", n: 9, k: "future" }, { d: "Sun", n: 10, k: "future" },
];

function Ring({ n, k, green }: { n: number; k: string; green?: boolean }) {
  const cls =
    k === "dash" ? "border-dashed border-muted-foreground/60" :
    k === "future" ? "border-border text-muted-foreground" :
    k === "today" && green ? "border-success" : "border-foreground";
  return <span className={`flex h-[37px] w-[37px] items-center justify-center rounded-full border-2 text-[17px] ${cls}`}>{n}</span>;
}

function TabHeader({ title }: { title: string }) {
  return <div className="flex items-center justify-between pt-3"><h1 className="text-[29px] font-medium tracking-tight">{title}</h1><Streak /></div>;
}

function HomeTab({ open }: { open: () => void }) {
  return (
    <div className="px-4 pb-36">
      <div className="flex items-center justify-between pt-3"><Wordmark size={28} /><Streak /></div>
      <div className="mt-4 flex justify-between">
        {week.map((w) => (
          <div key={w.d} className={`flex w-[50px] flex-col items-center gap-1.5 rounded-2xl py-2 text-[13px] ${w.k === "today" ? "bg-background font-medium text-foreground" : "text-muted-foreground"}`}>
            {w.d}<Ring n={w.n} k={w.k} />
          </div>
        ))}
      </div>
      <div className="relative mt-5 overflow-hidden rounded-[20px] bg-background p-4">
        <p className="text-[20px] font-medium">Practice with AI today</p>
        <div className="mt-2 flex gap-2"><Pill>eloquent</Pill><Pill>negotiate</Pill><Pill>+3</Pill></div>
        <button className="mt-4 flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium text-ink-foreground"><Play size={14} fill="currentColor" />Start Session</button>
        <div className="absolute -right-4 top-4 w-28 rotate-6 space-y-2 rounded-xl bg-surface p-3 opacity-90">
          <div className="h-2 w-12 rounded bg-border" /><div className="h-2 w-16 rounded bg-border" /><div className="h-2 w-10 rounded bg-border" />
        </div>
        <div className="absolute bottom-6 right-6 flex h-7 w-20 -rotate-6 items-center gap-1 rounded-md bg-brand-soft/40 px-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink"><Play size={8} className="text-ink-foreground" fill="currentColor" /></span>
          <span className="h-2 flex-1 rounded bg-brand/40" />
        </div>
      </div>
      <h2 className="mb-3 mt-7 text-[21px] font-medium">Continue watching</h2>
      <button onClick={open} className="relative block h-[208px] w-full overflow-hidden rounded-[20px] text-left text-background">
        <img src={emily2} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute left-4 top-4 flex gap-2"><Pill glass>A2</Pill><Pill glass>Adults</Pill></div>
        <div className="absolute inset-x-4 bottom-4">
          <p className="text-[17px] font-medium">Conversations with Emily in Paris</p>
          <p className="truncate text-[14px] opacity-80">Phrases native speakers actually use. Phrases native speakers actually use.</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full bg-background/30 px-3 py-1 text-[14px] font-medium backdrop-blur"><Play size={12} fill="currentColor" />45m</span>
            <MoreHorizontal size={20} />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-background/30"><div className="h-full w-1/4 bg-background/80" /></div>
      </button>
      <h2 className="mb-3 mt-7 text-[21px] font-medium">Picked for you</h2>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4">
        {[{ img: friends, t: "How to Sound Like a Native Speaker", tags: ["B1", "Adults"] }, { img: emily, t: "Speak French with Emily in Paris", tags: ["A2", "Adults"] }].map((c) => (
          <button key={c.t} onClick={open} className="relative h-[208px] w-[332px] shrink-0 overflow-hidden rounded-[20px] text-left text-background">
            <img src={c.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute left-4 top-4 flex gap-2">{c.tags.map((t) => <Pill key={t} glass>{t}</Pill>)}</div>
            <p className="absolute inset-x-4 bottom-4 text-[17px] font-medium">{c.t}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function BrowseTab({ open }: { open: () => void }) {
  const [chip, setChip] = useState("For You");
  return (
    <div className="px-4 pb-36">
      <TabHeader title="Browse" />
      <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4">
        {["For You", "YouTube", "Netflix", "Curated", "Popular"].map((c) => (
          <button key={c} onClick={() => setChip(c)} className={`h-9 shrink-0 rounded-full px-3.5 text-[15px] ${chip === c ? "bg-border font-medium" : "bg-background"}`}>{c}</button>
        ))}
      </div>
      <h2 className="mb-3 mt-6 text-[21px] font-medium">Collections picked for you</h2>
      <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4">
        {[{ t: "Conversations That Stick", bg: "bg-lemon", d: "45m", deco: "swirl" }, { t: "Movie Lines You'll Recognize", bg: "bg-lilac", d: "36m", deco: "leaf" }, { t: "Everyday Slang", bg: "bg-brand-soft", d: "28m", deco: "swirl" }].map((c) => (
          <button key={c.t} onClick={open} className={`relative flex h-[200px] w-[176px] shrink-0 flex-col justify-between overflow-hidden rounded-[16px] p-4 text-left ${c.bg}`}>
            <span className="relative z-10 text-[18px] font-medium leading-snug">{c.t}</span>
            {c.deco === "swirl" ? (
              <span className="absolute -bottom-8 -right-6 h-36 w-36 rounded-full border-[14px] border-background/30"><span className="absolute inset-5 rounded-full border-[10px] border-background/30" /></span>
            ) : (
              <span className="absolute bottom-2 right-0 flex rotate-12 gap-2">{[0, 1, 2].map((i) => <span key={i} className="h-16 w-6 rounded-full bg-background/30" />)}</span>
            )}
            <span className="relative z-10 flex w-fit items-center gap-1.5 rounded-full bg-ink/10 px-3 py-1 text-[14px] font-medium"><Play size={12} fill="currentColor" />{c.d}</span>
          </button>
        ))}
      </div>
      <h2 className="mb-3 mt-7 text-[21px] font-medium">Trending now</h2>
      <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4">
        {[{ img: friends, t: "How to Sound Like a Native Speaker", tags: ["B1", "Adults"] }, { img: emily2, t: "Learn French with Emily", tags: ["A2", "Adults"] }].map((c) => (
          <button key={c.t} onClick={open} className="relative h-[200px] w-[332px] shrink-0 overflow-hidden rounded-[16px] text-left text-background">
            <img src={c.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute left-4 top-4 flex gap-2">{c.tags.map((t) => <Pill key={t} glass>{t}</Pill>)}</div>
            <p className="absolute inset-x-4 bottom-4 text-[17px] font-medium">{c.t}</p>
          </button>
        ))}
      </div>
      <h2 className="mb-3 mt-7 text-[21px] font-medium">Short & Easy</h2>
      <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4">
        {[emily, friends].map((img, i) => (
          <button key={i} onClick={open} className="relative h-[200px] w-[332px] shrink-0 overflow-hidden rounded-[16px]">
            <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

const words = [["comprendre", "to understand"], ["réunion", "meeting"], ["façon", "a way / manner"], ["d'accord", "okay / agreed"], ["bientôt", "soon"]];
const sentences = [["Je ne sais pas.", "I don't know."], ["On y va ?", "Shall we go?"], ["C'est la vie.", "That's life."]];

function LibraryTab({ open }: { open: () => void }) {
  const [tab, setTab] = useState("Words");
  const list = tab === "Words" ? words : sentences;
  return (
    <div className="px-4 pb-48">
      <TabHeader title="Library" />
      <div className="mt-5 flex items-center gap-5">
        {["Videos", "Words", "Sentences"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`pb-1.5 text-[17px] ${tab === t ? "border-b-2 border-foreground font-medium" : "text-muted-foreground"}`}>{t}</button>
        ))}
        <button className="ml-auto flex h-10 items-center gap-2 rounded-full bg-background px-4 text-[15px]"><SlidersHorizontal size={16} />Filters</button>
      </div>
      <div className="mt-5 space-y-2.5">
        {tab === "Videos"
          ? [emily, friends, emily2].map((img, i) => (
              <button key={i} onClick={open} className="block h-40 w-full overflow-hidden rounded-[16px]"><img src={img} alt="" className="h-full w-full object-cover" /></button>
            ))
          : list.map(([w, t]) => (
              <div key={w} className="rounded-[16px] bg-background p-4">
                <div className="flex items-center justify-between"><p className="text-[17px] font-medium">{w}</p><div className="flex gap-3"><Copy size={19} /><Volume2 size={19} /></div></div>
                <p className="mt-2 flex items-center gap-2 text-[15px] text-muted-foreground"><Languages size={17} />{t}</p>
                <p className="mt-1.5 flex items-center gap-2 text-[15px] text-muted-foreground"><SquarePlay size={17} />Speak French with Emily in Paris</p>
              </div>
            ))}
      </div>
    </div>
  );
}

function ProfileTab() {
  const Row = ({ icon, label }: { icon: ReactNode; label: string }) => (
    <button className="flex h-[60px] w-full items-center gap-3 border-b border-border text-[17px]">{icon}<span className="flex-1 text-left">{label}</span><ChevronRight size={22} /></button>
  );
  return (
    <div className="px-4 pb-36">
      <div className="flex items-center gap-3 pt-3">
        <img src={avatar.url} alt="Lily Smith" className="h-14 w-14 rounded-full object-cover" />
        <div className="flex-1"><p className="text-[25px] font-medium leading-tight">Lily Smith</p><p className="text-[15px] text-muted-foreground">@lilysmith</p></div>
        <Settings size={24} />
      </div>
      <div className="mt-5 rounded-[20px] bg-background p-4">
        <p className="text-[17px] font-medium">Daily Streak</p>
        <div className="mt-3 flex justify-between">
          {week.map((w) => (
            <div key={w.d} className="flex flex-col items-center gap-1.5 text-[13px] text-muted-foreground">
              <span className={w.k === "today" ? "text-foreground" : ""}>{w.d[0]}</span><Ring n={w.n} k={w.k} green />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-[15px] text-muted-foreground">Account</p>
      <Row icon={<User size={22} />} label="Personal Details" />
      <Row icon={<Compass size={22} />} label="Preferences" />
      <Row icon={<Bell size={22} />} label="Notifications" />
      <Row icon={<Languages size={22} />} label="Language" />
      <Row icon={<HelpCircle size={22} />} label="About and Support" />
      <p className="mt-6 text-[15px] text-muted-foreground">Streak</p>
      <Row icon={<CalendarDays size={22} />} label="Streak Calendar" />
      <Row icon={<CircleDashed size={22} />} label="Ring Colors Explained" />
    </div>
  );
}

function VideoDetail({ back }: { back: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="animate-screen no-scrollbar absolute inset-0 z-30 overflow-y-auto bg-surface pb-10">
      <div className="relative h-[250px]">
        <img src={emily} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0"><StatusBar light /></div>
        <button onClick={back} aria-label="Back" className="absolute left-4 top-[52px] flex h-9 w-9 items-center justify-center rounded-full bg-background/30 text-background backdrop-blur"><ChevronLeft size={20} /></button>
      </div>
      <div className="bg-background px-4 pb-6 pt-5">
        <h1 className="text-[22px] font-medium">Speak French with Emily in Paris</h1>
        <div className="mt-3 flex items-center gap-2"><Pill>A2 - B1</Pill><Pill>Adults</Pill><span className="ml-auto flex items-center gap-1.5 text-[15px] font-medium"><Play size={13} fill="currentColor" />45m</span></div>
        <p className="mt-4 text-[15px] leading-snug text-muted-foreground">Follow Emily's Parisian adventures and pick up real French words as you watch. Real scenes, real phras... <b className="font-medium text-foreground">Read More</b></p>
        <div className="mt-5 flex gap-3">
          <button className="flex h-14 flex-1 items-center justify-center gap-2.5 rounded-full bg-ink text-[17px] font-medium text-ink-foreground"><Play size={16} fill="currentColor" />Start Watching</button>
          <button onClick={() => setSaved(!saved)} aria-label="Save" className="flex h-14 w-14 items-center justify-center rounded-full bg-surface"><Bookmark size={20} fill={saved ? "currentColor" : "none"} /></button>
        </div>
        <div className="mt-6 flex justify-between text-[15px]"><span className="text-muted-foreground">Watching time</span><span><b className="font-medium">26</b>/42 mins left</span></div>
        <div className="mt-2.5 h-2 rounded-full bg-surface"><div className="h-full w-[38%] rounded-full bg-brand" /></div>
      </div>
      <div className="px-4 pt-5">
        <p className="mb-3 text-[15px] text-muted-foreground">Learning Progress</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[16px] bg-background p-4"><Type size={20} /><p className="mt-4 text-[15px] text-muted-foreground">Words:</p><p className="mt-1 text-[17px]">87<span className="text-muted-foreground">/285</span></p></div>
          <div className="rounded-[16px] bg-background p-4"><ScrollText size={20} /><p className="mt-4 text-[15px] text-muted-foreground">Sentences:</p><p className="mt-1 text-[17px]">18<span className="text-muted-foreground">/66</span></p></div>
        </div>
      </div>
    </div>
  );
}

function TabBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: [Tab, string, typeof Home][] = [["home", "Home", Home], ["browse", "Browse", SquarePlay], ["library", "Library", Bookmark], ["profile", "Profile", User]];
  return (
    <nav className="absolute inset-x-4 bottom-7 z-20 flex rounded-full bg-background/85 p-1 shadow-[0_8px_30px_-10px] shadow-ink/20 backdrop-blur-xl">
      {items.map(([id, label, Icon]) => {
        const active = tab === id;
        return (
          <button key={id} onClick={() => setTab(id)} className={`flex h-[54px] flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[12px] transition-colors ${active ? "bg-surface font-medium text-foreground" : "text-muted-foreground"}`}>
            <Icon size={21} fill={active ? "currentColor" : "none"} className={active && id === "browse" ? "[&>path]:fill-background" : ""} />
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
        <div className="sticky top-0 z-10 bg-surface"><StatusBar /></div>
        {tab === "home" && <HomeTab open={open} />}
        {tab === "browse" && <BrowseTab open={open} />}
        {tab === "library" && <LibraryTab open={open} />}
        {tab === "profile" && <ProfileTab />}
      </div>
      {tab === "library" && !detail && (
        <button className="absolute bottom-[104px] left-1/2 z-20 flex h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-ink-foreground"><WandSparkles size={17} />Practice with AI</button>
      )}
      {!detail && <TabBar tab={tab} setTab={setTab} />}
      {detail && <VideoDetail back={() => setDetail(false)} />}
      <HomeIndicator />
    </div>
  );
}

export function FlunoApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  return (
    <div className="flex min-h-screen items-center justify-center bg-stage p-4">
      <div className="relative h-[844px] w-[390px] overflow-hidden rounded-[48px] bg-background font-sans shadow-2xl ring-[10px] ring-ink">
        {screen === "splash" && <Splash next={() => setScreen("welcome")} />}
        {screen === "welcome" && <Welcome next={() => setScreen("signup")} />}
        {screen === "signup" && <SignUp next={() => setScreen("app")} />}
        {screen === "app" && <MainApp />}
      </div>
    </div>
  );
}
