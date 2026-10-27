import { useEffect, useState } from "react";
import splash from "@/assets/screens/splash.png.asset.json";
import welcome from "@/assets/screens/welcome.png.asset.json";
import signup from "@/assets/screens/signup.png.asset.json";
import home from "@/assets/screens/home.png.asset.json";
import detail from "@/assets/screens/detail.png.asset.json";
import browse from "@/assets/screens/browse.png.asset.json";
import library from "@/assets/screens/library.png.asset.json";
import profile from "@/assets/screens/profile.png.asset.json";

type Screen = "splash" | "welcome" | "signup" | "home" | "browse" | "library" | "profile" | "detail";

// Source screens are 604 x 1318 px; hotspots are in those pixel coordinates.
const W = 604;
const H = 1318;
type Spot = { x: number; y: number; w: number; h: number; to: Screen; label: string };

const tabBar: Spot[] = (["home", "browse", "library", "profile"] as const).map((to, i) => ({
  x: 20 + i * 141,
  y: 1162,
  w: 141,
  h: 104,
  to,
  label: to,
}));

const screens: Record<Screen, { src: string; spots: Spot[] }> = {
  splash: { src: splash.url, spots: [{ x: 0, y: 0, w: W, h: H, to: "welcome", label: "Continue" }] },
  welcome: {
    src: welcome.url,
    spots: [
      { x: 22, y: 1094, w: 560, h: 82, to: "signup", label: "Sign Up" },
      { x: 180, y: 1188, w: 244, h: 70, to: "signup", label: "Log In" },
    ],
  },
  signup: {
    src: signup.url,
    spots: [
      { x: 22, y: 526, w: 560, h: 82, to: "home", label: "Continue" },
      { x: 22, y: 722, w: 560, h: 82, to: "home", label: "Continue with Apple" },
      { x: 22, y: 814, w: 560, h: 82, to: "home", label: "Continue with Google" },
      { x: 400, y: 925, w: 90, h: 50, to: "home", label: "Sign In" },
    ],
  },
  home: {
    src: home.url,
    spots: [
      { x: 22, y: 664, w: 560, h: 328, to: "detail", label: "Continue watching" },
      { x: 22, y: 1088, w: 540, h: 70, to: "detail", label: "Picked for you" },
      ...tabBar,
    ],
  },
  detail: { src: detail.url, spots: [{ x: 14, y: 66, w: 70, h: 70, to: "home", label: "Back" }] },
  browse: {
    src: browse.url,
    spots: [
      { x: 18, y: 748, w: 516, h: 312, to: "detail", label: "Trending video" },
      ...tabBar,
    ],
  },
  library: { src: library.url, spots: tabBar },
  profile: { src: profile.url, spots: tabBar },
};

const pct = (v: number, t: number) => `${(v / t) * 100}%`;

export function FlunoApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [back, setBack] = useState<Screen>("home");

  useEffect(() => {
    // Preload all screens for instant transitions
    Object.values(screens).forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  useEffect(() => {
    if (screen !== "splash") return;
    const t = setTimeout(() => setScreen("welcome"), 1800);
    return () => clearTimeout(t);
  }, [screen]);

  const go = (to: Screen) => {
    if (to === "detail") setBack(screen);
    setScreen(to === "home" && screen === "detail" ? back : to);
  };

  const current = screens[screen];

  return (
    <div className="flex min-h-screen items-center justify-center bg-stage p-4">
      <div
        className="relative overflow-hidden rounded-[44px] bg-background shadow-2xl"
        style={{ height: "min(92vh, 852px)", aspectRatio: `${W} / ${H}` }}
      >
        <img key={screen} src={current.src} alt={screen} className="animate-screen absolute inset-0 h-full w-full select-none" draggable={false} />
        {current.spots.map((s) => (
          <button
            key={s.label + s.x}
            aria-label={s.label}
            onClick={() => go(s.to)}
            className="absolute cursor-pointer rounded-full"
            style={{ left: pct(s.x, W), top: pct(s.y, H), width: pct(s.w, W), height: pct(s.h, H) }}
          />
        ))}
      </div>
    </div>
  );
}
