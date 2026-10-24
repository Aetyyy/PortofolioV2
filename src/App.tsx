import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
  type ChangeEvent,
  type RefObject,
} from "react";

/**
 * ============================================================================
 * 1. COMPLETE STRICT TYPESCRIPT DEFINITIONS & INTERFACES
 * ============================================================================
 */

export type IconName =
  | "arrow"
  | "diagonal"
  | "download"
  | "code"
  | "github"
  | "mail"
  | "award"
  | "menu"
  | "close"
  | "play"
  | "pause"
  | "volume"
  | "mute"
  | "minimize"
  | "expand";

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export type ProjectCategory = "Web App" | "Website";
export type ProjectArtKind = "finance" | "store" | "code";
export type FilterCategory = "All Projects" | ProjectCategory;

export interface SkillItem {
  mark: string;
  name: string;
  jp: string;
  code: string;
  type: string;
  color: string;
}

export interface ProjectItem {
  name: string;
  jpTitle: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  art: ProjectArtKind;
  number: string;
  year: string;
}

export interface CertificateItem {
  id: string;
  plate: string;
  title: string;
  issuer: string;
  recipient: string;
  year: string;
  credentialId: string;
  skillsCovered: string;
  jpStamp: string;
  url: string;
}

export interface LyricLine {
  start: number;
  end: number;
  text: string;
}

export interface StatDataItem {
  value: string;
  plus: string;
  label: string;
  jpText: string;
}

export interface ScrollEngineContextValue {
  smoothY: number;
  rawY: number;
  velocity: number;
  vh: number;
  vw: number;
}

export interface RefinedParallaxOptions {
  lockZone?: number;
  maxRotateX?: number;
  maxRotateY?: number;
  maxRotateZ?: number;
  maxTranslateY?: number;
  maxTranslateX?: number;
  maxTranslateZ?: number;
  maxScaleDrop?: number;
  tiltSign?: number;
  innerFactor?: number;
}

export interface ElementMetrics {
  center: number;
  height: number;
}

export interface RefinedParallaxReturn {
  offset: number;
  rawProgress: number;
  isLocked: boolean;
  visibility: number;
  shimmerPos: number;
  transformStyle: CSSProperties;
  innerParallaxStyle: CSSProperties;
}

export interface TiltPhysicsInternalState {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  glareX: number;
  glareY: number;
  hovering: boolean;
}

export interface TiltRenderState {
  rx: number;
  ry: number;
  glareX: number;
  glareY: number;
  isHovering: boolean;
}

export interface InteractiveTiltHandlers {
  onMouseMove: (e: ReactMouseEvent<HTMLElement>) => void;
  onMouseEnter: (e: ReactMouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
  onTouchStart: (e: ReactTouchEvent<HTMLElement>) => void;
  onTouchMove: (e: ReactTouchEvent<HTMLElement>) => void;
  onTouchEnd: () => void;
}

export interface UseInteractiveMouseTiltReturn {
  containerRef: RefObject<HTMLDivElement | null>;
  tiltState: TiltRenderState;
  handlers: InteractiveTiltHandlers;
}

/**
 * YouTube IFrame Player API Strict TypeScript Definitions
 */
export interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

export interface YTPlayerEvent {
  target: YTPlayerInstance;
  data: number;
}

export interface YTPlayerOptions {
  height?: string | number;
  width?: string | number;
  videoId: string;
  playerVars?: {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    disablekb?: 0 | 1;
    fs?: 0 | 1;
    loop?: 0 | 1;
    playlist?: string;
    modestbranding?: 0 | 1;
    playsinline?: 0 | 1;
    rel?: 0 | 1;
    origin?: string;
  };
  events?: {
    onReady?: (event: YTPlayerEvent) => void;
    onStateChange?: (event: YTPlayerEvent) => void;
    onError?: (event: YTPlayerEvent) => void;
  };
}

export interface YTNamespace {
  Player: new (
    elementId: string | HTMLElement,
    options: YTPlayerOptions,
  ) => YTPlayerInstance;
  PlayerState?: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export type FadePhase = "in" | "steady" | "manual-out";

export interface AudioFadeEngineState {
  wantPlay: boolean;
  isPlaying: boolean;
  userVolume: number;
  envelope: number;
  fadePhase: FadePhase;
  currentTime: number;
}

export interface DirectYouTubeCassettePlayerProps {
  startSignal: number;
}

export interface EditorialIntroProps {
  onComplete: () => void;
}

export interface KineticEditorialRibbonProps {
  textEn: string;
  textJp: string;
  direction?: 1 | -1;
}

export interface SectionHeadingProps {
  number: string;
  jpChapter: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface HeroSectionProps {
  cv: string;
}

export interface StatItemProps extends StatDataItem {
  index: number;
}

export interface SkillCardProps {
  skill: SkillItem;
  index: number;
}

export interface ProjectArtProps {
  kind: ProjectArtKind;
  innerStyle: CSSProperties;
}

export interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export interface FramedCertificateCardProps {
  cert: CertificateItem;
  index: number;
  onInspect: (cert: CertificateItem) => void;
}

export interface ViewportDimensions {
  vh: number;
  vw: number;
}

export interface ScrollPhysicsRef {
  targetY: number;
  currentY: number;
  prevY: number;
}

/**
 * ============================================================================
 * 2. MULTI-LAYER ARCHITECTURAL PARALLAX ENGINE (TACTILE 3D + FOCAL LOCK)
 * ============================================================================
 */
const ScrollContext = createContext<ScrollEngineContextValue>({
  smoothY: 0,
  rawY: 0,
  velocity: 0,
  vh: 800,
  vw: 1200,
});

const clamp = (val: number, min: number, max: number): number =>
  Math.min(Math.max(val, min), max);

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

function useScrollEngine(): ScrollEngineContextValue {
  return useContext(ScrollContext);
}

/**
 * Hook Multi-Layer Parallax dengan Zona Kunci Rata (Focal Lock Zone)
 */
function useRefinedParallax3D(
  ref: RefObject<HTMLElement | null>,
  options: RefinedParallaxOptions = {},
): RefinedParallaxReturn {
  const {
    lockZone = 0.22,
    maxRotateX = 8.5,
    maxRotateY = 5.2,
    maxRotateZ = 1.15,
    maxTranslateY = 44,
    maxTranslateX = 20,
    maxTranslateZ = 42,
    maxScaleDrop = 0.055,
    tiltSign = 1,
    innerFactor = 18,
  } = options;

  const { smoothY, velocity, vh, vw } = useScrollEngine();
  const [metrics, setMetrics] = useState<ElementMetrics>({
    center: 0,
    height: 1,
  });

  useEffect(() => {
    const measure = (): void => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const top = rect.top + scrollTop;
      const height = Math.max(1, rect.height);
      setMetrics({
        center: top + height / 2,
        height,
      });
    };

    measure();
    const t1 = window.setTimeout(measure, 120);
    const t2 = window.setTimeout(measure, 500);
    const t3 = window.setTimeout(measure, 1400);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("resize", measure);
    };
  }, [ref, vh, vw]);

  const viewportCenter = smoothY + vh / 2;
  const deltaY = metrics.center - viewportCenter;
  const travelRange = vh * 0.6 + metrics.height * 0.35;

  const rawProgress = clamp(deltaY / travelRange, -1.25, 1.25);
  const absRaw = Math.abs(rawProgress);

  // Di dalam lockZone, offset = 0 mutlak (posisi fix, rata & tidak miring)
  let settledOffset = 0;
  if (absRaw > lockZone) {
    const sign = Math.sign(rawProgress);
    const excess = (absRaw - lockZone) / (1 - lockZone);
    const eased = smoothstep(0, 1, clamp(excess, 0, 1.15));
    settledOffset = sign * eased;
  }

  const deviceFactor = vw < 640 ? 0.52 : vw < 1024 ? 0.78 : 1;
  const velocityMicroPitch =
    clamp(velocity * 0.04, -2.2, 2.2) * Math.abs(settledOffset);

  const rotateX =
    (-settledOffset * maxRotateX + velocityMicroPitch) * deviceFactor;
  const rotateY = settledOffset * maxRotateY * tiltSign * deviceFactor;
  const rotateZ = settledOffset * maxRotateZ * tiltSign * deviceFactor;
  const translateY = settledOffset * maxTranslateY * deviceFactor;
  const translateX =
    Math.abs(settledOffset) * maxTranslateX * tiltSign * deviceFactor;
  const translateZ = -Math.abs(settledOffset) * maxTranslateZ * deviceFactor;
  const scale = 1 - Math.abs(settledOffset) * maxScaleDrop;
  const isLocked = absRaw <= lockZone;
  const visibility = clamp(1 - Math.abs(settledOffset) * 0.65, 0.18, 1);

  const innerShiftY = -rawProgress * innerFactor * deviceFactor;
  const innerScale = 1 + Math.abs(settledOffset) * 0.045;
  const shimmerPos = clamp(((rawProgress + 1) / 2) * 100, 0, 100);

  const transformStyle: CSSProperties = {
    transform: `perspective(1250px) translate3d(${translateX.toFixed(
      1,
    )}px, ${translateY.toFixed(1)}px, ${translateZ.toFixed(
      1,
    )}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
      2,
    )}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
    opacity: visibility,
    willChange: "transform, opacity",
  };

  const innerParallaxStyle: CSSProperties = {
    transform: `translate3d(0px, ${innerShiftY.toFixed(
      1,
    )}px, 0px) scale(${innerScale.toFixed(3)})`,
    willChange: "transform",
  };

  return {
    offset: settledOffset,
    rawProgress,
    isLocked,
    visibility,
    shimmerPos,
    transformStyle,
    innerParallaxStyle,
  };
}

/**
 * ============================================================================
 * 3. INTERACTIVE 3D MOUSE-TILT HOOK (FOTO & BINGKAI BISA DIGOYANG PAKAI MOUSE)
 * ============================================================================
 */
function useInteractiveMouseTilt(
  maxTilt: number = 14,
): UseInteractiveMouseTiltReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const stateRef = useRef<TiltPhysicsInternalState>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    glareX: 50,
    glareY: 50,
    hovering: false,
  });

  const [tiltState, setTiltState] = useState<TiltRenderState>({
    rx: 0,
    ry: 0,
    glareX: 50,
    glareY: 50,
    isHovering: false,
  });

  useEffect(() => {
    let active = true;
    const animate = (): void => {
      if (!active) return;
      const s = stateRef.current;
      const dx = s.targetX - s.currentX;
      const dy = s.targetY - s.currentY;

      if (Math.abs(dx) > 0.04 || Math.abs(dy) > 0.04 || s.hovering) {
        s.currentX = lerp(s.currentX, s.targetX, 0.16);
        s.currentY = lerp(s.currentY, s.targetY, 0.16);
        setTiltState({
          rx: s.currentX,
          ry: s.currentY,
          glareX: s.glareX,
          glareY: s.glareY,
          isHovering: s.hovering,
        });
      }
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);
    return () => {
      active = false;
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const updatePointer = useCallback(
    (clientX: number, clientY: number): void => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = clamp((clientX - rect.left) / Math.max(1, rect.width), 0, 1);
      const relY = clamp((clientY - rect.top) / Math.max(1, rect.height), 0, 1);

      const ry = (relX - 0.5) * 2 * maxTilt;
      const rx = -(relY - 0.5) * 2 * maxTilt;

      stateRef.current.targetX = rx;
      stateRef.current.targetY = ry;
      stateRef.current.glareX = relX * 100;
      stateRef.current.glareY = relY * 100;
      stateRef.current.hovering = true;
    },
    [maxTilt],
  );

  const onMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLElement>): void => {
      updatePointer(e.clientX, e.clientY);
    },
    [updatePointer],
  );

  const onTouchMove = useCallback(
    (e: ReactTouchEvent<HTMLElement>): void => {
      if (e.touches && e.touches[0]) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [updatePointer],
  );

  const onLeave = useCallback((): void => {
    stateRef.current.targetX = 0;
    stateRef.current.targetY = 0;
    stateRef.current.hovering = false;
  }, []);

  return {
    containerRef,
    tiltState,
    handlers: {
      onMouseMove,
      onMouseEnter: onMouseMove,
      onMouseLeave: onLeave,
      onTouchStart: onTouchMove,
      onTouchMove,
      onTouchEnd: onLeave,
    },
  };
}

/**
 * ============================================================================
 * 4. CUSTOM EDITORIAL SVG ICONS
 * ============================================================================
 */
function Icon({
  name,
  size = 18,
  className = "",
}: IconProps): React.ReactElement {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    diagonal: <path d="M6 18 18 6M6 6h12v12" />,
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
    code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" />,
    github: (
      <path d="M9 19c-5 1-5-3-7-3m14 6v-4c0-1-.3-2-1-2.5 3-.4 6-1.5 6-6A5 5 0 0 0 19.5 6 5 5 0 0 0 19.4 2S18 1.5 15 3a14 14 0 0 0-6 0C6 1.5 4.6 2 4.6 2A5 5 0 0 0 4.5 6 5 5 0 0 0 3 9.5c0 4.5 3 5.6 6 6-.7.5-1 1.5-1 2.5v4" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="m8 14-1 8 5-3 5 3-1-8m-7-5 2 2 4-4" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    play: <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" />,
    pause: (
      <>
        <rect x="6" y="4" width="4" height="16" fill="currentColor" />
        <rect x="14" y="4" width="4" height="16" fill="currentColor" />
      </>
    ),
    volume: (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </>
    ),
    mute: (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </>
    ),
    minimize: <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />,
    expand: <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name] || paths.code}
    </svg>
  );
}

/**
 * ============================================================================
 * 5. PORTFOLIO DATA (TYPED ARRAYS FOR SKILLS, PROJECTS, CERTIFICATES, STATS)
 * ============================================================================
 */
const skills: SkillItem[] = [
  {
    mark: "⚛",
    name: "React",
    jp: "リアクト",
    code: "FE-01",
    type: "Frontend",
    color: "#61dafb",
  },
  {
    mark: "N",
    name: "Next.js",
    jp: "ネクスト",
    code: "FW-02",
    type: "Framework",
    color: "#f0f3f6",
  },
  {
    mark: "TS",
    name: "TypeScript",
    jp: "型安全言語",
    code: "LG-03",
    type: "Language",
    color: "#5ba4ee",
  },
  {
    mark: "JS",
    name: "JavaScript",
    jp: "スクリプト",
    code: "LG-04",
    type: "Language",
    color: "#f5d85c",
  },
  {
    mark: "≋",
    name: "Tailwind CSS",
    jp: "造形設計",
    code: "UI-05",
    type: "Styling",
    color: "#39c5dc",
  },
  {
    mark: "js",
    name: "Node.js",
    jp: "実行環境",
    code: "BE-06",
    type: "Backend",
    color: "#79c870",
  },
  {
    mark: "Py",
    name: "Python",
    jp: "パイソン",
    code: "LG-07",
    type: "Language",
    color: "#82add7",
  },
  {
    mark: "◇",
    name: "PostgreSQL",
    jp: "データ基盤",
    code: "DB-08",
    type: "Database",
    color: "#6c9bc7",
  },
];

const projects: ProjectItem[] = [
  {
    name: "Orbit — Finance Dashboard",
    jpTitle: "軌道 // 資産管理システム",
    description:
      "A clearer picture of your finances. An intuitive dashboard to track, manage, and grow your money.",
    category: "Web App",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    art: "finance",
    number: "01",
    year: "2024",
  },
  {
    name: "Kanso — Digital Experience",
    jpTitle: "簡素 // ミニマル商空間",
    description:
      "Less noise. More meaning. A minimal e-commerce experience for thoughtfully designed essentials.",
    category: "Website",
    tags: ["React", "Framer Motion", "Stripe"],
    art: "store",
    number: "02",
    year: "2024",
  },
  {
    name: "DevFlow — Developer Workspace",
    jpTitle: "開発流 // 統合開発環境",
    description:
      "Your ideas, code, and team. Connected in one collaborative workspace built for developers.",
    category: "Web App",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    art: "code",
    number: "03",
    year: "2023",
  },
];

const certificatesData: CertificateItem[] = [
  {
    id: "cert-meta",
    plate: "ARCHIVE NO. 01 // 認定証書 壱",
    title: "Meta Front-End Developer",
    issuer: "Meta · Coursera",
    recipient: "Muhammad Irwan",
    year: "2024",
    credentialId: "META-FE-994821-ID",
    skillsCovered:
      "React, Advanced JavaScript, UI/UX Architecture, Version Control",
    jpStamp: "公式認定",
    url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
  },
  {
    id: "cert-fcc",
    plate: "ARCHIVE NO. 02 // 認定証書 弐",
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    recipient: "Muhammad Irwan",
    year: "2024",
    credentialId: "FCC-JSADS-882104",
    skillsCovered:
      "Object-Oriented Programming, Functional Programming, Algorithmic Complexity",
    jpStamp: "技術証明",
    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/",
  },
  {
    id: "cert-dicoding",
    plate: "ARCHIVE NO. 03 // 認定証書 参",
    title: "Belajar Fundamental Aplikasi Web",
    issuer: "Dicoding Indonesia",
    recipient: "Muhammad Irwan",
    year: "2023",
    credentialId: "DCD-BFAW-773190",
    skillsCovered:
      "Web Components, Webpack Bundler, Asynchronous API, Clean Architecture",
    jpStamp: "優秀修了",
    url: "https://www.dicoding.com/academies/163",
  },
];

const statsData: StatDataItem[] = [
  { value: "3", plus: "+", label: "Years of experience", jpText: "経験" },
  { value: "20", plus: "+", label: "Projects delivered", jpText: "実績" },
  { value: "15", plus: "+", label: "Happy collaborators", jpText: "信頼" },
];

/**
 * ============================================================================
 * 6. DIRECT YOUTUBE AUDIO PLAYER FOR https://www.youtube.com/watch?v=wPb_miODtDI
 *    ("Akbar Chalay, Mingse - Astaga Bercanda", 2:47)
 *    + AUTOPLAY + 15% INITIAL VOLUME (0-100% ADJUSTABLE)
 *    + FADE-IN & FADE-OUT + SPINNING CASSETTE/VINYL MINIMIZABLE WIDGET
 * ============================================================================
 */
const YOUTUBE_VIDEO_ID: string = "wPb_miODtDI";
const TRACK_DURATION: number = 167; // 2:47

const ASTAGA_LYRICS: LyricLine[] = [
  {
    start: 0,
    end: 15,
    text: "♪ [Intro] Akbar Chalay, Mingse — Astaga Bercanda ♪",
  },
  {
    start: 15,
    end: 28,
    text: "♪ Saat aku mau aku yang jadi selalu ada di hatimu... ♪",
  },
  {
    start: 28,
    end: 40,
    text: "♪ Tapi sayang kamu sudah ada yang punya sekarang... ♪",
  },
  {
    start: 40,
    end: 56,
    text: "♪ Eh astaga bercanda... aku tunggu aja jadi yang pertama ♪",
  },
  {
    start: 56,
    end: 74,
    text: "♪ Kalo kamu masih sama dia, ku tunggu sampe putus aja ♪",
  },
  {
    start: 74,
    end: 95,
    text: "♪ Astaga bercanda... tapi kalo beneran juga gak apa-apa ♪",
  },
  {
    start: 95,
    end: 118,
    text: "♪ Pusing tujuh keliling, aku harus bersaing dapatkan kamu ♪",
  },
  {
    start: 118,
    end: 142,
    text: "♪ Eh astaga bercanda... aku tunggu aja jadi yang pertama ♪",
  },
  {
    start: 142,
    end: 160,
    text: "♪ Aku serius... eh tapi bercanda (Akbar Chalay ft. Mingse) ♪",
  },
  {
    start: 160,
    end: 168,
    text: "♪ [Fade Out] Astaga Bercanda — Selesai (2:47) ♪",
  },
];

const formatTime = (sec: number): string => {
  const s = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${String(rem).padStart(2, "0")}`;
};

function DirectYouTubeCassettePlayer({
  startSignal,
}: DirectYouTubeCassettePlayerProps): React.ReactElement {
  const [userVolume, setUserVolume] = useState<number>(15);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(TRACK_DURATION);
  const [fadeBadge, setFadeBadge] = useState<string>("FADE-IN 15%");
  const [ytReady, setYtReady] = useState<boolean>(false);

  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);

  const fadeEngineRef = useRef<AudioFadeEngineState>({
    wantPlay: true,
    isPlaying: false,
    userVolume: 15,
    envelope: 0,
    fadePhase: "in",
    currentTime: 0,
  });

  // Load YouTube IFrame API resmi untuk memutar https://www.youtube.com/watch?v=wPb_miODtDI
  useEffect(() => {
    let isMounted = true;

    const initPlayer = (): void => {
      if (!window.YT || !window.YT.Player || ytPlayerRef.current) return;

      ytPlayerRef.current = new window.YT.Player("yt-astaga-bercanda-player", {
        height: "1",
        width: "1",
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: YTPlayerEvent): void => {
            if (!isMounted) return;
            setYtReady(true);
            try {
              const dur = event.target.getDuration();
              if (dur && dur > 0) setDuration(dur);
              event.target.unMute();
              event.target.setVolume(1);
              event.target.playVideo();
            } catch {
              // Menunggu interaksi pertama bila diblokir browser
            }
          },
          onStateChange: (event: YTPlayerEvent): void => {
            if (!isMounted) return;
            if (event.data === 1) {
              fadeEngineRef.current.isPlaying = true;
              if (fadeEngineRef.current.fadePhase === "manual-out") {
                fadeEngineRef.current.fadePhase = "in";
              }
              setIsPlaying(true);
              const dur = event.target.getDuration();
              if (dur && dur > 0) setDuration(dur);
            } else if (event.data === 2) {
              if (fadeEngineRef.current.fadePhase !== "manual-out") {
                fadeEngineRef.current.isPlaying = false;
                setIsPlaying(false);
              }
            } else if (event.data === 0) {
              fadeEngineRef.current.envelope = 0.02;
              fadeEngineRef.current.fadePhase = "in";
              event.target.seekTo(0);
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.getElementById("youtube-iframe-js-api");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-js-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
          document.head.appendChild(tag);
        }
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = (): void => {
        if (typeof prevCallback === "function") prevCallback();
        initPlayer();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Sinkronisasi slider volume (0% - 100%)
  useEffect(() => {
    fadeEngineRef.current.userVolume = userVolume;
    const effectiveVol = Math.round(
      userVolume * fadeEngineRef.current.envelope,
    );
    if (
      ytPlayerRef.current &&
      typeof ytPlayerRef.current.setVolume === "function"
    ) {
      try {
        ytPlayerRef.current.setVolume(clamp(effectiveVol, 0, 100));
        if (userVolume === 0) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
        }
      } catch {
        // ignore
      }
    }
  }, [userVolume]);

  const triggerPlayWithFadeIn = useCallback((): void => {
    fadeEngineRef.current.wantPlay = true;
    fadeEngineRef.current.fadePhase = "in";
    if (fadeEngineRef.current.envelope < 0.05) {
      fadeEngineRef.current.envelope = 0.04;
    }

    if (
      ytPlayerRef.current &&
      typeof ytPlayerRef.current.playVideo === "function"
    ) {
      try {
        ytPlayerRef.current.unMute();
        ytPlayerRef.current.setVolume(
          Math.max(
            1,
            Math.round(
              fadeEngineRef.current.userVolume * fadeEngineRef.current.envelope,
            ),
          ),
        );
        ytPlayerRef.current.playVideo();
        fadeEngineRef.current.isPlaying = true;
        setIsPlaying(true);
      } catch {
        // ignore
      }
    }
  }, []);

  const triggerPauseWithFadeOut = useCallback((): void => {
    fadeEngineRef.current.wantPlay = false;
    fadeEngineRef.current.fadePhase = "manual-out";
    setFadeBadge("FADE OUT ↘");
  }, []);

  const togglePlayPause = useCallback((): void => {
    if (isPlaying) {
      triggerPauseWithFadeOut();
    } else {
      triggerPlayWithFadeIn();
    }
  }, [isPlaying, triggerPauseWithFadeOut, triggerPlayWithFadeIn]);

  useEffect(() => {
    if (startSignal > 0 || ytReady) {
      triggerPlayWithFadeIn();
    }
  }, [startSignal, ytReady, triggerPlayWithFadeIn]);

  useEffect(() => {
    const unlockOnGesture = (): void => {
      if (!fadeEngineRef.current.wantPlay) return;
      if (
        ytPlayerRef.current &&
        typeof ytPlayerRef.current.getPlayerState === "function"
      ) {
        try {
          const state = ytPlayerRef.current.getPlayerState();
          if (state !== 1) {
            triggerPlayWithFadeIn();
          }
        } catch {
          triggerPlayWithFadeIn();
        }
      } else if (!fadeEngineRef.current.isPlaying) {
        triggerPlayWithFadeIn();
      }
    };

    window.addEventListener("pointerdown", unlockOnGesture, { passive: true });
    window.addEventListener("keydown", unlockOnGesture, { passive: true });
    window.addEventListener("touchstart", unlockOnGesture, { passive: true });
    window.addEventListener("wheel", unlockOnGesture, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlockOnGesture);
      window.removeEventListener("keydown", unlockOnGesture);
      window.removeEventListener("touchstart", unlockOnGesture);
      window.removeEventListener("wheel", unlockOnGesture);
    };
  }, [triggerPlayWithFadeIn]);

  // Loop 100ms untuk mengatur Envelope Fade-In & Fade-Out
  useEffect(() => {
    const interval = window.setInterval(() => {
      const st = fadeEngineRef.current;
      const player = ytPlayerRef.current;

      if (player && typeof player.getCurrentTime === "function") {
        try {
          const pState = player.getPlayerState ? player.getPlayerState() : -1;
          if (pState === 1) {
            st.isPlaying = true;
            setIsPlaying(true);
            const cur = player.getCurrentTime() || 0;
            const dur = player.getDuration() || TRACK_DURATION;
            st.currentTime = cur;
            setCurrentTime(cur);
            if (dur > 0) setDuration(dur);
          }
        } catch {
          // ignore
        }
      }

      if (!st.isPlaying) return;

      const totalDur = duration || TRACK_DURATION;
      const fadeOutWindow = 6.5;

      if (st.fadePhase === "manual-out") {
        st.envelope = Math.max(0, st.envelope - 0.09);
        setFadeBadge("FADE OUT ↘");
        if (st.envelope <= 0.02) {
          st.envelope = 0;
          st.isPlaying = false;
          setIsPlaying(false);
          setFadeBadge("PAUSED");
          if (player && typeof player.pauseVideo === "function") {
            try {
              player.pauseVideo();
            } catch {
              // ignore
            }
          }
        }
      } else if (st.currentTime >= totalDur - fadeOutWindow && totalDur > 20) {
        const remain = Math.max(0, totalDur - st.currentTime);
        st.envelope = clamp(remain / fadeOutWindow, 0.02, 1);
        setFadeBadge("FADE OUT ↘");
      } else if (st.envelope < 1) {
        st.envelope = Math.min(1, st.envelope + 0.028);
        setFadeBadge(
          st.envelope < 0.96 ? "FADE IN ↗" : `VOL ${st.userVolume}%`,
        );
      } else {
        st.envelope = 1;
        setFadeBadge(`VOL ${st.userVolume}%`);
      }

      const actualVolume = clamp(
        Math.round(st.userVolume * st.envelope),
        0,
        100,
      );

      if (player && typeof player.setVolume === "function") {
        try {
          player.setVolume(actualVolume);
        } catch {
          // ignore
        }
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [duration]);

  const handleSeek = (e: ChangeEvent<HTMLInputElement>): void => {
    const nextSec = Number(e.target.value);
    setCurrentTime(nextSec);
    fadeEngineRef.current.currentTime = nextSec;
    if (
      ytPlayerRef.current &&
      typeof ytPlayerRef.current.seekTo === "function"
    ) {
      try {
        ytPlayerRef.current.seekTo(nextSec, true);
      } catch {
        // ignore
      }
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserVolume(Number(e.target.value));
  };

  const activeLyric: LyricLine =
    ASTAGA_LYRICS.find(
      (item) => currentTime >= item.start && currentTime < item.end,
    ) || ASTAGA_LYRICS[0];

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-end">
      {/* Container Tersembunyi untuk YouTube IFrame Resmi (https://www.youtube.com/watch?v=wPb_miODtDI) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-2499.75 -top-2499.75 h-px w-px overflow-hidden opacity-0"
      >
        <div id="yt-astaga-bercanda-player" />
      </div>

      {/* MODE MINIMIZED: KASET / PIRINGAN VINYL BERPUTAR COMPACT */}
      {isMinimized ? (
        <div
          style={{
            backgroundColor: "rgba(10, 15, 21, 0.96)",
            borderColor: "rgba(56, 189, 248, 0.3)",
          }}
          className="flex items-center gap-2 rounded-full border p-1.5 pr-3 shadow-[0_16px_45px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all hover:border-sky-400"
        >
          <button
            type="button"
            onClick={togglePlayPause}
            title={isPlaying ? "Pause (Fade-Out)" : "Play (Fade-In)"}
            style={{ backgroundColor: "#111922", color: "#38bdf8" }}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-400/40 cursor-pointer group"
          >
            <div
              className={`flex h-full w-full items-center justify-center rounded-full bg-[conic-gradient(from_0deg,#090d12,#1e293b,#38bdf8,#090d12,#1e293b,#090d12)] ${
                isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
              }`}
            >
              <span
                style={{ backgroundColor: "#080b0e" }}
                className="h-3.5 w-3.5 rounded-full border border-white/40"
              />
            </div>
            <span
              style={{ color: "#38bdf8" }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name={isPlaying ? "pause" : "play"} size={13} />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            style={{ backgroundColor: "transparent", color: "#f4f1ea" }}
            className="flex flex-col text-left cursor-pointer group"
            title="Perbesar pemutar musik"
          >
            <span
              style={{ color: "#38bdf8" }}
              className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isPlaying ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              {fadeBadge}
            </span>
            <span
              style={{ color: "#f4f1ea" }}
              className="max-w-28.75 truncate text-[11px] font-bold group-hover:text-sky-300 transition-colors"
            >
              Astaga Bercanda
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            aria-label="Expand music player"
            title="Buka kontrol musik"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "#cbd5e1",
            }}
            className="ml-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 hover:border-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
          >
            <Icon name="expand" size={12} />
          </button>
        </div>
      ) : (
        /* MODE EXPANDED: KASET VINYL BERPUTAR + SEEK BAR + VOLUME 15%-100% */
        <div
          style={{
            backgroundColor: "rgba(10, 15, 21, 0.96)",
            borderColor: "rgba(255, 255, 255, 0.16)",
          }}
          className="w-76.25 sm:w-85 rounded-2xl border p-3.5 shadow-[0_24px_70px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all"
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayPause}
              title={
                isPlaying ? "Pause dengan Fade-Out" : "Play dengan Fade-In"
              }
              style={{ backgroundColor: "#111922", color: "#38bdf8" }}
              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sky-400/40 cursor-pointer overflow-hidden group"
            >
              <div
                className={`flex h-full w-full items-center justify-center rounded-full bg-[conic-gradient(from_0deg,#090d12,#1e293b,#38bdf8,#090d12,#1e293b,#090d12)] ${
                  isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
                }`}
              >
                <span
                  style={{ backgroundColor: "#080b0e" }}
                  className="h-4 w-4 rounded-full border border-white/35"
                />
              </div>
              <span
                style={{ color: "#38bdf8" }}
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name={isPlaying ? "pause" : "play"} size={15} />
              </span>
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span
                  style={{ color: "#38bdf8" }}
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.15em] uppercase"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isPlaying
                        ? "bg-emerald-400 animate-pulse"
                        : "bg-amber-400"
                    }`}
                  />
                  {fadeBadge}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <p
                style={{ color: "#f4f1ea" }}
                className="mt-0.5 truncate text-xs font-bold"
              >
                Astaga Bercanda
              </p>
              <p className="truncate text-[10px] text-slate-400">
                Akbar Chalay, Mingse
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={togglePlayPause}
                className="aethyy-btn-cyan flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <Icon name={isPlaying ? "pause" : "play"} size={13} />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                title="Kecilkan pemutar musik"
                aria-label="Minimize music player"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "#cbd5e1",
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 hover:border-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
              >
                <Icon name="minimize" size={13} />
              </button>
            </div>
          </div>

          <div
            style={{ backgroundColor: "#06090d" }}
            className="mt-2.5 rounded-lg border border-white/10 px-2.5 py-1.5"
          >
            <p
              style={{ color: "#7dd3fc" }}
              className="truncate font-mono text-[10px]"
            >
              {activeLyric.text}
            </p>
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <span className="w-7 font-mono text-[9px] text-slate-400">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || TRACK_DURATION}
              step={0.5}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek timeline lagu"
              className="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-800 accent-sky-400"
            />
            <span className="w-7 text-right font-mono text-[9px] text-slate-400">
              {formatTime(duration)}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setUserVolume((v) => (v > 0 ? 0 : 15))}
              style={{ backgroundColor: "transparent", color: "#94a3b8" }}
              className="hover:text-sky-300 transition-colors cursor-pointer"
              title="Mute / Reset ke 15%"
            >
              <Icon name={userVolume === 0 ? "mute" : "volume"} size={14} />
            </button>

            <input
              type="range"
              min={0}
              max={100}
              value={userVolume}
              onChange={handleVolumeChange}
              aria-label="Volume 0 sampai 100 persen"
              className="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-800 accent-sky-400"
            />

            <span
              style={{ color: "#f4f1ea" }}
              className="w-9 text-right font-mono text-[10px] font-bold"
            >
              {userVolume}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ============================================================================
 * 7. SHOJI EDITORIAL CURTAIN INTRO ANIMATION (FIRST VISIT ONLY)
 * ============================================================================
 */
type IntroPhase = "counting" | "opening" | "done";

function EditorialIntro({
  onComplete,
}: EditorialIntroProps): React.ReactElement | null {
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<IntroPhase>("counting");

  useEffect(() => {
    let start: number | null = null;
    const duration = 1850;

    const step = (ts: number): void => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const p = clamp(Math.floor((elapsed / duration) * 100), 0, 100);
      setProgress(p);

      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      } else {
        setPhase("opening");
        window.setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 750);
      }
    };

    const id = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(id);
  }, [onComplete]);

  const handleEnterNow = (): void => {
    setProgress(100);
    setPhase("opening");
    window.setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 550);
  };

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden">
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#070a0d] border-b border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase === "opening" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-between px-8 opacity-10 select-none pointer-events-none overflow-hidden">
          <span className="font-mono text-xs tracking-[0.5em] text-slate-400">
            ISSUE NO. 01 // CIREBON
          </span>
          <span
            lang="ja"
            className="text-[120px] sm:text-[180px] font-black text-white"
          >
            創造
          </span>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#070a0d] border-t border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase === "opening" ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-between px-8 opacity-10 select-none pointer-events-none overflow-hidden">
          <span
            lang="ja"
            className="text-[120px] sm:text-[180px] font-black text-white"
          >
            美学
          </span>
          <span className="font-mono text-xs tracking-[0.5em] text-slate-400">
            ARCHITECTURAL PORTFOLIO
          </span>
        </div>
      </div>

      <div
        className={`relative z-10 flex flex-col items-center px-6 text-center transition-all duration-500 ${
          phase === "opening" ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="mb-4 inline-flex items-center gap-2.5 border border-white/15 bg-[#0d1319] px-3.5 py-1">
          <span className="inline-block h-2 w-2 bg-rose-600" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#f4f1ea] uppercase">
            MONOGRAPH EDITION // ポートフォリオ
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-black tracking-tight text-[#f4f1ea]">
          Muhammad Irwan<span className="text-sky-400">.</span>
        </h1>
        <p
          className="mt-1.5 font-mono text-[11px] tracking-[0.28em] text-slate-400"
          lang="ja"
        >
          ムハンマド・イルワン — 構造設計とデジタル工芸
        </p>

        <div className="mt-7 w-64 sm:w-72">
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-slate-400">
            <span>LOADING EXHIBITION</span>
            <span className="text-[#f4f1ea] font-bold">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
          <div className="h-0.5 w-full bg-white/10 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-sky-400 transition-all duration-75"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleEnterNow}
          className="aethyy-btn-cyan mt-7 inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.2em] uppercase transition-all cursor-pointer"
        >
          <span>ENTER EXHIBITION // 入場する</span>
          <Icon name="arrow" size={14} />
        </button>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * 8. VELOCITY-REACTIVE JAPANESE EDITORIAL RIBBON (PARALLAX DIVIDER)
 * ============================================================================
 */
function KineticEditorialRibbon({
  textEn,
  textJp,
  direction = 1,
}: KineticEditorialRibbonProps): React.ReactElement {
  const { smoothY, velocity } = useScrollEngine();
  const shiftX = ((smoothY * 0.14 * direction) % 420) - 210;
  const skewAngle = clamp(velocity * 0.08 * direction, -4, 4);

  return (
    <div
      aria-hidden="true"
      className="relative my-6 overflow-hidden border-y border-white/[0.07] bg-[#0a0f15]/70 py-2.5 select-none"
    >
      <div
        style={{
          transform: `translate3d(${shiftX.toFixed(
            1,
          )}px, 0px, 0px) skewX(${skewAngle.toFixed(2)}deg)`,
          willChange: "transform",
        }}
        className="flex whitespace-nowrap items-center gap-8 font-mono text-[10px] tracking-[0.32em] text-slate-400/80 uppercase"
      >
        {[0, 1, 2, 3].map((i) => (
          <React.Fragment key={i}>
            <span className="text-[#f4f1ea]/80 font-semibold">{textEn}</span>
            <span className="text-sky-400">◆</span>
            <span lang="ja" className="text-sky-300/80">
              {textJp}
            </span>
            <span className="text-rose-500/70">印</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * 9. LAYERED JAPANESE EDITORIAL BACKGROUND TYPOGRAPHY (MULTI-SPEED DEPTH)
 * ============================================================================
 */
function JapaneseEditorialBackground(): React.ReactElement {
  const { smoothY } = useScrollEngine();

  const driftSlow = Math.sin(smoothY * 0.0015) * 18;
  const driftMid = Math.cos(smoothY * 0.0018) * 24;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      <div className="mx-auto flex h-full max-w-7xl justify-between px-4 sm:px-8 opacity-[0.055]">
        <div className="h-full w-px bg-white" />
        <div className="hidden md:block h-full w-px bg-white" />
        <div className="hidden lg:block h-full w-px bg-white" />
        <div className="h-full w-px bg-white" />
      </div>

      {/* Rel Tategaki Kiri */}
      <div
        style={{
          transform: `translate3d(0px, ${(-smoothY * 0.11).toFixed(1)}px, 0px)`,
        }}
        className="hidden xl:flex fixed left-4 top-28 flex-col items-center gap-5 opacity-35"
      >
        <span className="border border-rose-500/60 bg-rose-950/30 px-1.5 py-1 font-mono text-[10px] font-bold text-rose-400">
          印
        </span>
        <p
          lang="ja"
          style={{ writingMode: "vertical-rl" }}
          className="font-mono text-[11px] tracking-[0.42em] text-slate-400"
        >
          ムハンマド・イルワン — 静寂と秩序の中に宿る機能美
        </p>
        <div className="h-16 w-px bg-white/20" />
        <p
          lang="ja"
          style={{ writingMode: "vertical-rl" }}
          className="font-mono text-[11px] tracking-[0.42em] text-sky-400/80"
        >
          西ジャワ州チレボン発 • 世界基準のウェブ設計
        </p>
      </div>

      {/* Rel Tategaki Kanan */}
      <div
        style={{
          transform: `translate3d(0px, ${(-smoothY * 0.075).toFixed(1)}px, 0px)`,
        }}
        className="hidden xl:flex fixed right-4 top-32 flex-col items-center gap-5 opacity-35"
      >
        <span className="border border-sky-400/40 px-1.5 py-1 font-mono text-[10px] text-sky-400">
          零壱
        </span>
        <p
          lang="ja"
          style={{ writingMode: "vertical-rl" }}
          className="font-mono text-[11px] tracking-[0.42em] text-slate-400"
        >
          一行一行のコードに魂と情熱を込める • フルスタック開発
        </p>
        <div className="h-16 w-px bg-sky-400/30" />
      </div>

      {/* Lapisan Kanji Raksasa Multi-Depth */}
      <div
        style={{
          transform: `translate3d(0px, ${(-smoothY * 0.2).toFixed(1)}px, 0px)`,
        }}
        className="absolute inset-x-0 top-0 h-1150"
      >
        <div
          style={{ transform: `translateX(${driftSlow.toFixed(1)}px)` }}
          className="absolute top-21.25 left-[4%] font-serif text-[110px] sm:text-[190px] lg:text-[230px] font-black text-white/[0.024] leading-none"
        >
          創造性
        </div>
        <div
          style={{ transform: `translateX(${(-driftMid).toFixed(1)}px)` }}
          className="absolute top-130 right-[5%] text-right"
        >
          <span className="block font-mono text-[10px] tracking-[0.45em] text-sky-400/20">
            STRUCTURAL HARMONY // 構造美
          </span>
          <span className="block font-serif text-[95px] sm:text-[170px] font-black text-sky-400/[0.026] leading-none">
            美学
          </span>
        </div>

        <div
          style={{ transform: `translateX(${driftMid.toFixed(1)}px)` }}
          className="absolute top-287.5 left-[7%]"
        >
          <span className="block font-mono text-[10px] tracking-[0.4em] text-white/15">
            CRAFT & ENGINEERING // 技術領域
          </span>
          <span className="block font-serif text-[100px] sm:text-[185px] font-black text-white/[0.024] leading-none">
            技術力
          </span>
        </div>

        <div
          style={{ transform: `translateX(${(-driftSlow).toFixed(1)}px)` }}
          className="absolute top-490 right-[6%] text-right"
        >
          <span className="block font-mono text-[10px] tracking-[0.4em] text-sky-400/15">
            SELECTED ARCHIVES // 厳選作品
          </span>
          <span className="block font-serif text-[105px] sm:text-[195px] font-black text-white/[0.024] leading-none">
            作品集
          </span>
        </div>

        <div
          style={{ transform: `translateX(${driftSlow.toFixed(1)}px)` }}
          className="absolute top-720 left-[6%]"
        >
          <span className="block font-mono text-[10px] tracking-[0.4em] text-sky-400/15">
            HALL OF CREDENTIALS // 認定証書額装展
          </span>
          <span className="block font-serif text-[100px] sm:text-[185px] font-black text-white/[0.024] leading-none">
            栄誉殿堂
          </span>
        </div>

        <div className="absolute top-920 right-[10%] font-serif text-[110px] sm:text-[190px] font-black text-sky-400/[0.026] leading-none">
          共創未来
        </div>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * 10. EDITORIAL SECTION HEADING (MULTI-PLANE PARALLAX -> LOCKS FLAT AT CENTER)
 * ============================================================================
 */
function SectionHeading({
  number,
  jpChapter,
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const { transformStyle, innerParallaxStyle, isLocked, shimmerPos } =
    useRefinedParallax3D(ref, {
      lockZone: 0.24,
      maxRotateX: 7.5,
      maxRotateY: 3.5,
      maxRotateZ: 0.7,
      maxTranslateY: 36,
      maxTranslateX: -14,
      tiltSign: -1,
    });

  return (
    <div
      ref={ref}
      style={transformStyle}
      className="relative mb-12 sm:mb-16 flex flex-col justify-between gap-4 border-b border-white/15 pb-6 md:flex-row md:items-end"
    >
      <div
        aria-hidden="true"
        style={{ left: `${shimmerPos}%` }}
        className="pointer-events-none absolute -bottom-px h-0.5 w-24 -translate-x-1/2 bg-linear-to-r from-transparent via-sky-400 to-transparent transition-opacity duration-300"
      />

      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] text-sky-400 uppercase">
          <span className="border border-sky-400/40 bg-sky-400/10 px-2 py-0.5 font-bold text-sky-300">
            {number}
          </span>
          <span>{eyebrow}</span>
          <span className="text-slate-600">/</span>
          <span lang="ja" className="text-slate-300">
            {jpChapter}
          </span>
          {isLocked && (
            <span className="hidden sm:inline-flex items-center gap-1.5 border border-white/10 bg-white/3 px-2 py-0.5 text-[9px] tracking-[0.18em] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              ALIGNED
            </span>
          )}
        </div>
        <h2 className="font-serif text-3xl font-black tracking-tight text-[#f4f1ea] sm:text-5xl">
          {title}
          <span className="text-sky-400">.</span>
        </h2>
      </div>

      <p
        style={innerParallaxStyle}
        className="max-w-sm text-xs sm:text-sm leading-relaxed text-slate-400 md:text-right"
      >
        {subtitle}
      </p>
    </div>
  );
}

/**
 * ============================================================================
 * 11. HERO SECTION + CLEAN 3D MOUSE-TILT PORTRAIT (TANPA OVERLAY KOORDINAT)
 * ============================================================================
 */
function HeroSection({ cv }: HeroSectionProps): React.ReactElement {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  const leftParallax = useRefinedParallax3D(leftRef, {
    lockZone: 0.28,
    maxRotateX: 7.0,
    maxRotateY: 4.5,
    maxRotateZ: 0.8,
    maxTranslateY: 36,
    maxTranslateX: -18,
    tiltSign: -1,
  });

  const rightParallax = useRefinedParallax3D(rightRef, {
    lockZone: 0.28,
    maxRotateX: 8.0,
    maxRotateY: 5.2,
    maxRotateZ: 1.0,
    maxTranslateY: 44,
    maxTranslateX: 18,
    tiltSign: 1,
  });

  // Foto developer tetap bisa digoyang-goyangkan pakai mouse / sentuhan jari,
  // namun bersih tanpa bar "INTERACTIVE PORTRAIT -0° / -0°" atau koordinat.
  const {
    containerRef: photoTiltRef,
    tiltState,
    handlers: photoHandlers,
  } = useInteractiveMouseTilt(15);

  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-4 pt-28 pb-14 sm:px-8 sm:pt-32 lg:pt-36 lg:pb-22"
    >
      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* KOLOM KIRI: Tipografi Editorial & Pengenalan */}
        <div
          ref={leftRef}
          style={leftParallax.transformStyle}
          className="space-y-5 sm:space-y-6 lg:col-span-7"
        >
          <div className="inline-flex flex-wrap items-center gap-2.5 border border-white/15 bg-[#0e141b] px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">AVAILABLE FOR WORK</span>
            <span className="text-slate-600">//</span>
            <span lang="ja" className="text-sky-300">
              新規案件受付中
            </span>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-sky-400">
            <span lang="ja" className="mr-2 text-slate-300">
              こんにちは
            </span>
            HELLO, I’M
          </p>

          <div>
            <h1 className="font-serif text-4xl font-black tracking-tight text-[#f4f1ea] sm:text-6xl xl:text-7xl leading-[1.03]">
              Muhammad{" "}
              <span className="italic font-normal text-sky-300">Irwan</span>
              <span className="text-sky-400">.</span>
            </h1>
            <p
              className="mt-2 font-mono text-[11px] sm:text-xs tracking-[0.22em] text-slate-400"
              lang="ja"
            >
              ムハンマド・イルワン{" "}
              <span lang="en" className="text-sky-400">
                / AETHYY.DEV
              </span>
            </p>
          </div>

          <h2
            style={leftParallax.innerParallaxStyle}
            className="text-xl font-bold leading-snug text-slate-200 sm:text-3xl lg:text-4xl"
          >
            Turning ideas into
            <br />
            <span className="text-sky-400">digital experiences.</span>
          </h2>

          <div className="space-y-3 border-l-2 border-sky-400/60 pl-4">
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-sky-300">
              Full-Stack Developer & Creative Thinker
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              I build thoughtful digital experiences that blend{" "}
              <strong className="font-semibold text-[#f4f1ea]">
                clean code
              </strong>{" "}
              with{" "}
              <strong className="font-semibold text-[#f4f1ea]">
                purposeful design.
              </strong>{" "}
              Based in Indonesia, creating for the world.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <a
              href="#projects"
              className="aethyy-btn-cyan inline-flex items-center gap-2.5 px-6 py-3.5 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all"
            >
              <span>Explore my work</span>
              <Icon name="diagonal" size={16} />
            </a>
            <a
              download="Muhammad-Irwan-CV.txt"
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(cv)}`}
              className="aethyy-btn-outline inline-flex items-center gap-2.5 px-6 py-3.5 font-mono text-xs sm:text-sm font-semibold transition-all"
            >
              <Icon name="download" size={16} className="text-sky-400" />
              <span>Download CV</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-[10px] tracking-[0.2em] text-slate-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center border border-white/15 bg-[#0c1117] text-slate-300 hover:border-sky-400 hover:text-sky-300 transition-colors"
            >
              <Icon name="github" size={17} />
            </a>
            <a
              href="https://instagram.com/aetyyy16"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center border border-white/15 bg-[#0c1117] font-serif text-sm font-bold text-slate-300 hover:border-sky-400 hover:text-sky-300 transition-colors"
            >
              <span className="[&>svg]:h-4 [&>svg]:w-4 [&>svg]:fill-[#cad5e2]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </span>
            </a>
            <a
              href="mailto:muhammad.irwan399@gmail.com"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center border border-white/15 bg-[#0c1117] text-slate-300 hover:border-sky-400 hover:text-sky-300 transition-colors"
            >
              <Icon name="mail" size={17} />
            </a>
            <span className="hidden sm:inline-block h-px w-8 bg-white/15" />
            <span className="text-[10px] text-slate-400">
              LET’S BUILD SOMETHING GREAT
            </span>
          </div>
        </div>

        {/* KOLOM KANAN: FOTO DEVELOPER INTERAKTIF (TANPA OVERLAY DERAJAT / KOORDINAT) */}
        <div
          ref={rightRef}
          style={rightParallax.transformStyle}
          className="relative flex flex-col items-center justify-center lg:col-span-5"
        >
          <span
            lang="ja"
            aria-hidden="true"
            style={rightParallax.innerParallaxStyle}
            className="pointer-events-none absolute -top-8 right-0 select-none font-serif text-7xl font-black text-white/5 sm:text-8xl"
          >
            創造
          </span>

          <div className="mb-2.5 flex w-full max-w-87.5 items-center justify-between font-mono text-[10px] tracking-[0.2em] text-slate-400">
            <span>
              <strong lang="ja" className="text-[#f4f1ea]">
                創造
              </strong>{" "}
              / THE ART OF CREATING
            </span>
          </div>

          <div
            ref={photoTiltRef}
            {...photoHandlers}
            style={{
              transform: `perspective(1000px) rotateX(${tiltState.rx.toFixed(
                2,
              )}deg) rotateY(${tiltState.ry.toFixed(2)}deg) scale(${
                tiltState.isHovering ? 1.025 : 1
              })`,
              transformStyle: "preserve-3d",
              transition: tiltState.isHovering
                ? "transform 60ms linear"
                : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="group relative w-full max-w-87.5 cursor-grab active:cursor-grabbing border border-white/20 bg-[#0d131a] p-3.5 shadow-[0_30px_80px_rgba(0,0,0,0.85)] select-none"
          >
            {/* Siku Presisi 3D */}
            <span
              style={{ transform: "translateZ(26px)" }}
              className="pointer-events-none absolute -top-1.5 -left-1.5 h-4 w-4 border-t-2 border-l-2 border-sky-400"
            />
            <span
              style={{ transform: "translateZ(26px)" }}
              className="pointer-events-none absolute -top-1.5 -right-1.5 h-4 w-4 border-t-2 border-r-2 border-sky-400"
            />
            <span
              style={{ transform: "translateZ(26px)" }}
              className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-4 w-4 border-b-2 border-l-2 border-sky-400"
            />
            <span
              style={{ transform: "translateZ(26px)" }}
              className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-4 w-4 border-b-2 border-r-2 border-sky-400"
            />

            {/* Stempel Hanko Jepang */}
            <div
              style={{ transform: "translateZ(34px)" }}
              className="pointer-events-none absolute top-6 right-6 z-20 flex h-9 w-9 items-center justify-center border border-rose-500/80 bg-rose-950/80 font-serif text-xs font-black text-rose-300 shadow-lg"
            >
              創
            </div>

            {/* Gambar Potret Utama — Bersih tanpa bar INTERACTIVE PORTRAIT -0° / -0° */}
            <div
              style={{ transform: "translateZ(14px)" }}
              className="relative aspect-4/5 w-full overflow-hidden bg-slate-950"
            >
              <img
                src="https://lnjmllypcuwkqakowmdo.supabase.co/storage/v1/object/public/images/gallery/gallery-2-1792334102161-a4add0f8-a43b-4fbc-aae6-5689b8756e71.webp"
                alt="Portrait of developer Muhammad Irwan"
                draggable={false}
                style={{
                  transform: `scale(1.07) translate3d(${(
                    -tiltState.ry * 0.45
                  ).toFixed(1)}px, ${(tiltState.rx * 0.45).toFixed(1)}px, 0px)`,
                }}
                className="h-full w-full object-cover object-center transition-transform duration-150"
              />

              {/* Pantulan Cahaya Kaca Mengikuti Mouse */}
              <div
                style={{
                  background: `radial-gradient(circle at ${tiltState.glareX}% ${tiltState.glareY}%, rgba(255,255,255,0.28), transparent 60%)`,
                  opacity: tiltState.isHovering ? 1 : 0,
                }}
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#080c10]/60 via-transparent to-transparent" />
            </div>

            <div
              style={{ transform: "translateZ(22px)" }}
              className="mt-3 flex items-center justify-between border border-white/10 bg-[#080c10] px-3.5 py-2.5 font-mono text-[11px] text-[#f4f1ea]"
            >
              <span>01 / THE DEVELOPER</span>
              <Icon name="code" size={16} className="text-sky-400" />
            </div>

            <div
              style={{ transform: "translateZ(18px)" }}
              className="mt-2 flex items-center justify-between border border-white/10 bg-[#0a0f15] px-3.5 py-2 font-mono text-[10px] tracking-wider text-slate-300"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                CIREBON, WEST JAVA
              </span>
              <span className="text-sky-400">GMT +7</span>
            </div>
          </div>

          <div className="mt-2.5 flex w-full max-w-87.5 items-center justify-center font-mono text-[10px] tracking-[0.18em] text-slate-500">
            <span>DESIGN WITH INTENT. BUILD WITH PURPOSE.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * 12. STATS, SKILLS & PROJECTS DENGAN MULTI-LAYER PARALLAX & SHIMMER TRACE
 * ============================================================================
 */
function StatItem({
  value,
  plus,
  label,
  jpText,
  index,
}: StatItemProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const tiltDir = index < 2 ? -1 : 1;

  const { transformStyle, innerParallaxStyle, shimmerPos } =
    useRefinedParallax3D(ref, {
      lockZone: 0.24,
      maxRotateX: 8.0,
      maxRotateY: 4.5,
      maxRotateZ: 0.9,
      maxTranslateY: 32 + index * 7,
      maxTranslateX: tiltDir * 14,
      tiltSign: tiltDir,
    });

  return (
    <div
      ref={ref}
      style={transformStyle}
      className="relative overflow-hidden border border-white/15 bg-[#0c1117]/95 p-5 sm:p-6"
    >
      <div
        aria-hidden="true"
        style={{ left: `${shimmerPos}%` }}
        className="pointer-events-none absolute top-0 h-[1.5px] w-20 -translate-x-1/2 bg-linear-to-rrom-transparent via-sky-400/80 to-transparent"
      />
      <span
        lang="ja"
        aria-hidden="true"
        style={innerParallaxStyle}
        className="pointer-events-none absolute right-2 bottom-1 select-none font-serif text-4xl font-black text-white/4.5"
      >
        {jpText}
      </span>
      <strong className="block font-serif text-3xl sm:text-4xl font-black text-[#f4f1ea]">
        {value}
        <span className="text-sky-400">{plus}</span>
      </strong>
      <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
        {label}
      </span>
    </div>
  );
}

function SkillCard({ skill, index }: SkillCardProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const col = index % 4;
  const tiltDirection = col < 2 ? -1 : 1;

  const { transformStyle, innerParallaxStyle, shimmerPos } =
    useRefinedParallax3D(ref, {
      lockZone: 0.22,
      maxRotateX: 8.5,
      maxRotateY: 5.0,
      maxRotateZ: 1.1,
      maxTranslateY: 34 + col * 8,
      maxTranslateX: (col - 1.5) * 10,
      tiltSign: tiltDirection,
      innerFactor: 10,
    });

  return (
    <div
      ref={ref}
      style={transformStyle}
      className="group relative flex items-center justify-between gap-3.5 overflow-hidden border border-white/15 bg-[#0c1218]/95 p-4 sm:p-5 transition-colors hover:border-sky-400/60"
    >
      <div
        aria-hidden="true"
        style={{ left: `${shimmerPos}%` }}
        className="pointer-events-none absolute top-0 h-[1.5px] w-16 -translate-x-1/2 bg-linear-to-r from-transparent via-sky-400/70 to-transparent"
      />
      <div className="flex items-center gap-3.5 min-w-0">
        <span
          style={{ ...innerParallaxStyle, color: skill.color }}
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 bg-[#070a0e] font-mono text-base font-bold"
        >
          {skill.mark}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm sm:text-base font-bold text-[#f4f1ea] group-hover:text-sky-300 transition-colors">
              {skill.name}
            </h3>
            <span className="font-mono text-[9px] text-slate-500">
              {skill.code}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {skill.type}{" "}
            <span lang="ja" className="text-slate-500">
              · {skill.jp}
            </span>
          </p>
        </div>
      </div>

      <span className="font-mono text-base text-slate-500 group-hover:text-sky-400 transition-colors">
        +
      </span>
    </div>
  );
}

function ProjectArt({ kind, innerStyle }: ProjectArtProps): React.ReactElement {
  return (
    <div className="relative h-56 sm:h-64 w-full overflow-hidden border-b border-white/15 bg-[#080c10] p-4">
      <div style={innerStyle} className="h-full w-full">
        {kind === "finance" ? (
          <div className="flex h-full gap-3 border border-white/15 bg-[#0d141c] p-3 text-xs">
            <div className="flex w-8 flex-col items-center gap-2.5 border border-white/10 bg-[#080c10] py-2.5 text-sky-400">
              <b>◈</b>
              <span className="opacity-50">▦</span>
              <span className="opacity-50">▤</span>
              <span className="opacity-50">◷</span>
            </div>
            <div className="flex flex-1 flex-col justify-between min-w-0">
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span>OVERVIEW // 資産</span>
                <span className="text-sky-400">↗</span>
              </div>
              <div>
                <small className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Total balance
                </small>
                <h4 className="font-serif text-lg sm:text-xl font-black text-[#f4f1ea]">
                  $24,680<span className="text-sky-400">.00</span>
                </h4>
              </div>
              <div className="flex h-16 items-end gap-1 pt-1">
                {[
                  22, 35, 29, 50, 42, 66, 54, 80, 70, 94, 83, 110, 98, 125, 116,
                ].map((h: number, i: number) => (
                  <i
                    key={i}
                    style={{ height: `${Math.min(100, h * 0.75)}%` }}
                    className="flex-1 bg-sky-400/75"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-1.5 font-mono text-[9px] text-slate-400">
                <span>
                  IN <b className="text-emerald-400">$8,420</b>
                </span>
                <span>
                  OUT <b className="text-rose-400">$3,240</b>
                </span>
              </div>
            </div>
          </div>
        ) : kind === "store" ? (
          <div className="flex h-full flex-col justify-between border border-stone-700/50 bg-[#141210] p-3.5 text-xs text-stone-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 font-serif text-[11px] font-bold">
              <span>kanso. // 簡素</span>
              <span className="font-mono text-[9px] font-normal text-stone-400">
                Objects · Story · Bag (0)
              </span>
            </div>
            <div className="my-auto flex items-center justify-between gap-3 py-1">
              <div>
                <small className="block font-mono text-[8px] tracking-[0.2em] text-amber-300/80">
                  LESS, BUT BETTER.
                </small>
                <h4 className="font-serif text-sm sm:text-base font-bold leading-snug text-[#f4f1ea]">
                  Objects for
                  <br />
                  everyday living.
                </h4>
                <p className="mt-0.5 text-[10px] text-stone-400">
                  Thoughtfully made. Naturally simple.
                </p>
              </div>
              <div className="flex h-20 w-16 shrink-0 items-center justify-center border border-amber-200/20 bg-stone-900">
                <div className="h-12 w-8 rounded-t-full bg-linear-to-tr from-amber-600/70 to-stone-200" />
              </div>
            </div>
            <div className="border-t border-white/10 pt-1.5 font-mono text-[8px] tracking-[0.2em] text-stone-400">
              CONSIDERED DESIGN · LASTING QUALITY
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between border border-white/15 bg-[#0b1018] p-3 font-mono text-[10px] text-slate-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[9px]">
              <b className="text-sky-400">▧ devflow</b>
              <span className="text-slate-400">workspace / project.tsx</span>
              <span className="text-slate-500">● ● ●</span>
            </div>
            <div className="grid flex-1 grid-cols-12 gap-2 py-2 overflow-hidden">
              <aside className="col-span-4 border border-white/5 bg-black/40 p-1.5 text-[8px] leading-relaxed text-slate-400">
                <div className="font-bold text-slate-300">EXPLORER</div>
                <div>⌄ src</div>
                <div className="pl-1.5 text-sky-300">◇ Project.tsx</div>
                <div className="pl-1.5">◇ Header.tsx</div>
                <div className="pl-1.5">◇ useProject.ts</div>
              </aside>
              <div className="col-span-8 border border-white/10 bg-black/60 p-2 text-[9px] leading-relaxed overflow-hidden">
                <p>
                  <span className="text-rose-400">import</span> {"{ useState }"}{" "}
                  <span className="text-rose-400">from</span>{" "}
                  <span className="text-emerald-300">&quot;react&quot;</span>;
                </p>
                <p>
                  <span className="text-rose-400">export default function</span>{" "}
                  <strong className="text-sky-300">Project</strong>() {"{"}
                </p>
                <p className="pl-2 text-slate-500">// Meaningful workspace</p>
                <p className="pl-2">
                  <span className="text-rose-400">return</span> &lt;
                  <strong className="text-sky-300">Workspace</strong> /&gt;;
                </p>
                <p>{"}"}</p>
              </div>
            </div>
            <footer className="flex items-center justify-between border-t border-white/10 pt-1 text-[8px] text-emerald-400">
              <span>✓ All changes saved</span>
              <span className="text-slate-500">TSX · UTF-8</span>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: ProjectCardProps): React.ReactElement {
  const ref = useRef<HTMLElement | null>(null);
  const tiltDir = index === 0 ? -1 : index === 2 ? 1 : 0.4;

  const { transformStyle, innerParallaxStyle, shimmerPos } =
    useRefinedParallax3D(ref, {
      lockZone: 0.22,
      maxRotateX: 8.5,
      maxRotateY: 5.2,
      maxRotateZ: 1.1,
      maxTranslateY: 42 + index * 10,
      maxTranslateX: (index - 1) * 18,
      tiltSign: tiltDir,
      innerFactor: 16,
    });

  return (
    <article
      ref={ref}
      style={transformStyle}
      className="group relative flex flex-col overflow-hidden border border-white/15 bg-[#0c1117]/95 transition-colors hover:border-sky-400/50"
    >
      <div
        aria-hidden="true"
        style={{ left: `${shimmerPos}%` }}
        className="pointer-events-none absolute top-0 z-20 h-0.5 w-24 -translate-x-1/2 bg-linear-to-r from-transparent via-sky-400 to-transparent"
      />

      <ProjectArt kind={project.art} innerStyle={innerParallaxStyle} />

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-sky-400">
            <span>
              {project.category.toUpperCase()} // {project.number}
            </span>
            <span lang="ja" className="text-slate-400">
              {project.jpTitle}
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#f4f1ea] group-hover:text-sky-300 transition-colors">
            {project.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
            {project.description}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t: string) => (
              <span
                key={t}
                className="border border-white/10 bg-white/3 px-2.5 py-1 font-mono text-[10px] text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3.5 font-mono text-[11px] font-semibold">
            <a
              href={`https://github.com/search?q=${encodeURIComponent(
                project.name.split(" — ")[0],
              )}&type=repositories`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-sky-300 transition-colors"
            >
              <Icon name="github" size={14} /> Source code
            </a>
            <a
              href={`https://vercel.com/templates/${
                project.art === "store" ? "ecommerce" : "next.js"
              }`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-200 transition-colors"
            >
              Explore demo <Icon name="diagonal" size={14} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * ============================================================================
 * 13. FRAMED PHOTO CERTIFICATE EXHIBITION + INTERACTIVE 3D MOUSE TILT
 * ============================================================================
 */
function FramedCertificateCard({
  cert,
  index,
  onInspect,
}: FramedCertificateCardProps): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const tiltDir = index === 0 ? -1 : index === 2 ? 1 : 0.4;

  const { transformStyle, innerParallaxStyle } = useRefinedParallax3D(
    scrollRef,
    {
      lockZone: 0.22,
      maxRotateX: 8.5,
      maxRotateY: 5.0,
      maxRotateZ: 1.0,
      maxTranslateY: 40 + index * 10,
      maxTranslateX: (index - 1) * 16,
      tiltSign: tiltDir,
      innerFactor: 12,
    },
  );

  const {
    containerRef: mouseTiltRef,
    tiltState,
    handlers: tiltHandlers,
  } = useInteractiveMouseTilt(13);

  return (
    <div
      ref={scrollRef}
      style={transformStyle}
      className="group relative flex flex-col items-center"
    >
      <div className="relative z-10 flex flex-col items-center">
        <span className="h-2 w-2 rounded-full bg-amber-400/90" />
        <div
          className="h-3.5 w-14 border-t border-l border-r border-slate-500/50 -mt-0.5"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
      </div>

      <div
        ref={mouseTiltRef}
        {...tiltHandlers}
        onClick={() => onInspect(cert)}
        style={{
          transform: `perspective(950px) rotateX(${tiltState.rx.toFixed(
            2,
          )}deg) rotateY(${tiltState.ry.toFixed(2)}deg) scale(${
            tiltState.isHovering ? 1.025 : 1
          })`,
          transformStyle: "preserve-3d",
          transition: tiltState.isHovering
            ? "transform 60ms linear"
            : "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="relative w-full cursor-pointer border-[9px] border-[#18202a] bg-[#0a0f14] p-3 sm:p-3.5 shadow-[0_25px_65px_rgba(0,0,0,0.85),inset_0_0_0_1px_rgba(255,255,255,0.12)] select-none"
      >
        <div
          style={{ transform: "translateZ(12px)" }}
          className="relative overflow-hidden border-2 border-[#dcd6c8] bg-[#f4f1ea] p-3.5 sm:p-4 text-slate-900 shadow-inner"
        >
          <div
            style={{
              background: `radial-gradient(circle at ${tiltState.glareX}% ${tiltState.glareY}%, rgba(255,255,255,0.55), transparent 60%)`,
              opacity: tiltState.isHovering ? 1 : 0,
            }}
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
          />

          <span className="pointer-events-none absolute top-1 left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-slate-400" />
          <span className="pointer-events-none absolute top-1 right-1 h-2.5 w-2.5 border-t-2 border-r-2 border-slate-400" />
          <span className="pointer-events-none absolute bottom-1 left-1 h-2.5 w-2.5 border-b-2 border-l-2 border-slate-400" />
          <span className="pointer-events-none absolute bottom-1 right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-slate-400" />

          <div
            style={innerParallaxStyle}
            className="relative flex aspect-4/3 w-full flex-col justify-between border border-slate-300 bg-[#fbfaf6] p-3 sm:p-4 text-left"
          >
            <span
              lang="ja"
              className="pointer-events-none absolute right-2 bottom-5 select-none font-serif text-4xl font-black text-slate-900/4"
            >
              {cert.jpStamp}
            </span>

            <div className="flex items-start justify-between border-b border-slate-200 pb-1.5">
              <div>
                <p className="font-mono text-[7px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  CERTIFICATE OF ACHIEVEMENT
                </p>
                <p className="font-serif text-[11px] font-bold text-slate-800">
                  {cert.issuer}
                </p>
              </div>
              <span
                lang="ja"
                className="border border-rose-600/80 bg-rose-50 px-1.5 py-0.5 font-mono text-[8px] font-black text-rose-700"
              >
                {cert.jpStamp}
              </span>
            </div>

            <div className="my-auto py-1">
              <p className="font-mono text-[8px] uppercase tracking-widest text-slate-400">
                Presented to
              </p>
              <p className="font-serif text-sm sm:text-base font-black text-slate-900 underline decoration-sky-500/50 underline-offset-4">
                {cert.recipient}
              </p>
              <h4 className="mt-1 text-xs font-extrabold leading-snug text-slate-800 line-clamp-2">
                {cert.title}
              </h4>
            </div>

            <div className="flex items-end justify-between border-t border-slate-200 pt-1.5">
              <div className="font-mono text-[7px] text-slate-500">
                <div>ID: {cert.credentialId}</div>
                <div>YEAR: {cert.year} · VERIFIED</div>
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-amber-300">
                <Icon name="award" size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 w-full border border-white/15 bg-[#0c1117] p-3.5">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.18em] text-sky-400">
          <span>{cert.plate}</span>
          <span>{cert.year}</span>
        </div>
        <h3 className="mt-1 font-serif text-sm sm:text-base font-bold text-[#f4f1ea]">
          {cert.title}
        </h3>
        <p className="text-xs text-slate-400">{cert.issuer}</p>

        <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => onInspect(cert)}
            style={{ backgroundColor: "transparent", color: "#38bdf8" }}
            className="hover:underline transition-colors cursor-pointer"
          >
            [ Lihat Ukuran Penuh ]
          </button>
          <a
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#94a3b8" }}
            className="inline-flex items-center gap-1 hover:text-sky-300 transition-colors"
          >
            <span>Kredensial</span>
            <Icon name="diagonal" size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * 14. CONTACT SECTION & TOOLBOX STRIP
 * ============================================================================
 */
function ContactSection(): React.ReactElement {
  const ref = useRef<HTMLElement | null>(null);
  const { transformStyle, innerParallaxStyle } = useRefinedParallax3D(ref, {
    lockZone: 0.26,
    maxRotateX: 7.5,
    maxRotateY: 3.0,
    maxRotateZ: 0.6,
    maxTranslateY: 38,
  });

  return (
    <section
      ref={ref}
      id="contact"
      style={transformStyle}
      className="relative mx-auto max-w-5xl px-4 py-20 sm:px-8 sm:py-28 text-center"
    >
      <span
        lang="ja"
        aria-hidden="true"
        style={innerParallaxStyle}
        className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 select-none font-serif text-7xl font-black text-white/4 sm:text-9xl"
      >
        共創
      </span>

      <div className="relative z-10 inline-flex items-center gap-2 border border-white/15 bg-[#0c1218] px-3.5 py-1 font-mono text-[10px] tracking-[0.24em] text-sky-300">
        <span className="font-bold text-[#f4f1ea]">04</span> WHAT’S NEXT? //
        第伍章
      </div>

      <h2 className="relative z-10 mt-5 font-serif text-3xl font-black tracking-tight text-[#f4f1ea] sm:text-5xl lg:text-6xl leading-tight">
        Have something in mind?
        <br />
        Let’s{" "}
        <span className="italic font-normal text-sky-300">make it happen.</span>
      </h2>

      <p className="relative z-10 mx-auto mt-4 max-w-xl text-xs sm:text-base leading-relaxed text-slate-300">
        I’m open to freelance projects, full-time opportunities,
        <br className="hidden sm:inline" /> and good conversations about
        building great things.
      </p>

      <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-4">
        <a
          href="mailto:muhammad.irwan399@gmail.com"
          className="aethyy-btn-cyan inline-flex items-center gap-2.5 px-7 py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all"
        >
          <span>Let’s work together</span>
          <Icon name="diagonal" size={16} />
        </a>

        <a
          href="mailto:muhammad.irwan399@gmail.com"
          style={{ color: "#cbd5e1" }}
          className="inline-flex items-center gap-2 font-mono text-xs hover:text-sky-300 transition-colors"
        >
          <span>muhammad.irwan399@gmail.com</span>
          <Icon name="arrow" size={14} />
        </a>

        <div className="inline-flex items-center gap-2 font-mono text-[11px] text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>
            Currently open to new opportunities · Cirebon, West Java, Indonesia
          </span>
        </div>
      </div>
    </section>
  );
}

function ToolboxStrip(): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const { transformStyle, shimmerPos } = useRefinedParallax3D(ref, {
    lockZone: 0.25,
    maxRotateX: 7.0,
    maxRotateY: 2.5,
    maxTranslateY: 28,
  });

  return (
    <div
      ref={ref}
      style={transformStyle}
      className="relative mt-8 flex flex-col items-center justify-between gap-3 overflow-hidden border border-white/15 bg-[#0c1117] px-5 py-4 sm:flex-row"
    >
      <div
        aria-hidden="true"
        style={{ left: `${shimmerPos}%` }}
        className="pointer-events-none absolute top-0 h-[1.5px] w-24 -translate-x-1/2 bg-linear-to-r from-transparent via-sky-400/70 to-transparent"
      />
      <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-sky-400">
        ALSO IN MY TOOLBOX // 補助技術
      </span>
      <p className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs text-slate-300">
        <span>Git & GitHub</span>
        <span className="text-sky-400">·</span>
        <span>Figma</span>
        <span className="text-sky-400">·</span>
        <span>Docker</span>
        <span className="text-sky-400">·</span>
        <span>REST APIs</span>
        <span className="text-sky-400">·</span>
        <span>Vercel</span>
        <span className="text-sky-400">·</span>
        <span>Supabase</span>
      </p>
    </div>
  );
}

/**
 * ============================================================================
 * 15. MAIN APPLICATION CONTROLLER (FULL TYPESCRIPT)
 * ============================================================================
 */
export default function App(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterCategory>("All Projects");
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [musicTrigger, setMusicTrigger] = useState<number>(0);
  const [activeLightboxCert, setActiveLightboxCert] =
    useState<CertificateItem | null>(null);

  const [smoothY, setSmoothY] = useState<number>(0);
  const [rawY, setRawY] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  const [viewport, setViewport] = useState<ViewportDimensions>({
    vh: typeof window !== "undefined" ? window.innerHeight : 800,
    vw: typeof window !== "undefined" ? window.innerWidth : 1200,
  });

  const scrollState = useRef<ScrollPhysicsRef>({
    targetY: 0,
    currentY: 0,
    prevY: 0,
  });

  useEffect(() => {
    const onScroll = (): void => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      scrollState.current.targetY = y;
      setRawY(y);
    };
    const onResize = (): void => {
      setViewport({
        vh: window.innerHeight,
        vw: window.innerWidth,
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    let rafId: number;
    const updateLoop = (): void => {
      const s = scrollState.current;
      s.prevY = s.currentY;
      s.currentY = lerp(s.currentY, s.targetY, 0.14);
      if (Math.abs(s.targetY - s.currentY) < 0.15) {
        s.currentY = s.targetY;
      }
      const vel = s.currentY - s.prevY;
      setSmoothY(s.currentY);
      setVelocity(vel);
      rafId = window.requestAnimationFrame(updateLoop);
    };

    rafId = window.requestAnimationFrame(updateLoop);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const nav: string[] = [
    "About",
    "Skills",
    "Projects",
    "Certificates",
    "Contact",
  ];
  const filterOptions: FilterCategory[] = [
    "All Projects",
    "Web App",
    "Website",
  ];
  const cv: string =
    "Muhammad Irwan\nFull-Stack Developer\nJawa Barat, Indonesia\n\nABOUT\nI build thoughtful digital experiences that blend clean code with purposeful design.\n\nSKILLS\nReact, Next.js, TypeScript, JavaScript, Tailwind CSS, Node.js, Python, PostgreSQL\n\nCONTACT\nmuhammad.irwan399@gmail.com";

  const maxScroll: number =
    typeof document !== "undefined"
      ? Math.max(1, document.documentElement.scrollHeight - viewport.vh)
      : 3000;
  const scrollProgress: number = clamp(smoothY / maxScroll, 0, 1);

  const engineContextValue = useMemo<ScrollEngineContextValue>(
    () => ({
      smoothY,
      rawY,
      velocity,
      vh: viewport.vh,
      vw: viewport.vw,
    }),
    [smoothY, rawY, velocity, viewport.vh, viewport.vw],
  );

  return (
    <ScrollContext.Provider value={engineContextValue}>
      <div className="relative min-h-screen bg-[#080b0e] text-[#f4f1ea] selection:bg-sky-400 selection:text-slate-950 overflow-x-hidden">
        {/* CSS PELINDUNG KONTRAS TOMBOL AGAR TIDAK TERTIMPA GLOBAL CSS (MENCEGAH BUG KOTAK PUTIH) */}
        <style>{`
          .aethyy-btn-cyan {
            background-color: #38bdf8 !important;
            color: #05080c !important;
            border: 1px solid #38bdf8 !important;
            box-shadow: 0 8px 25px -6px rgba(56, 189, 248, 0.45);
          }
          .aethyy-btn-cyan:hover {
            background-color: #7dd3fc !important;
            color: #05080c !important;
            border-color: #7dd3fc !important;
            box-shadow: 0 10px 30px -4px rgba(56, 189, 248, 0.65);
          }
          .aethyy-btn-cyan span,
          .aethyy-btn-cyan svg {
            color: #05080c !important;
            stroke: #05080c !important;
          }
          .aethyy-btn-outline {
            background-color: #0d131a !important;
            color: #f4f1ea !important;
            border: 1px solid rgba(255, 255, 255, 0.22) !important;
          }
          .aethyy-btn-outline:hover {
            background-color: rgba(56, 189, 248, 0.12) !important;
            color: #38bdf8 !important;
            border-color: #38bdf8 !important;
          }
          .aethyy-filter-active {
            background-color: #38bdf8 !important;
            color: #05080c !important;
            border: 1px solid #38bdf8 !important;
          }
          .aethyy-filter-active span {
            color: #05080c !important;
          }
          .aethyy-filter-inactive {
            background-color: transparent !important;
            color: #94a3b8 !important;
            border: 1px solid transparent !important;
          }
          .aethyy-filter-inactive:hover {
            background-color: rgba(255, 255, 255, 0.05) !important;
            color: #f4f1ea !important;
          }
        `}</style>

        {/* 1. INTRO ANIMATION (Hanya muncul saat pertama kali membuka web) */}
        {showIntro && (
          <EditorialIntro
            onComplete={() => {
              setShowIntro(false);
              setMusicTrigger((n: number) => n + 1);
            }}
          />
        )}

        {/* 2. SCROLL PROGRESS BAR */}
        <div
          aria-hidden="true"
          style={{ transform: `scaleX(${scrollProgress})` }}
          className="fixed top-0 left-0 right-0 z-50 h-0.5 origin-left bg-sky-400"
        />

        {/* 3. JAPANESE EDITORIAL BACKGROUND TYPOGRAPHY */}
        <JapaneseEditorialBackground />

        {/* 4. HEADER NAVIGATION (DENGAN TOMBOL LET'S TALK ANTI-BUG PUTIH) */}
        <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-[#080b0e]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
            <a
              href="#"
              aria-label="Aethyy homepage"
              className="flex items-center gap-2.5 text-base font-bold tracking-tight text-[#f4f1ea]"
            >
              <span className="flex h-8 w-8 items-center justify-center border border-sky-400/50 bg-[#0d141c] font-serif text-sm font-black text-[#f4f1ea]">
                a<span className="text-sky-400">.</span>
              </span>
              <span className="font-serif">
                Aethyy<span className="text-sky-400">.dev</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-widest text-slate-300">
              {nav.map((item: string) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{ color: "#cbd5e1" }}
                  className="hover:text-sky-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2.5">
              <a
                href="mailto:muhammad.irwan399@gmail.com"
                className="aethyy-btn-cyan inline-flex items-center gap-1.5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Let’s talk</span>
                <Icon name="diagonal" size={14} />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                backgroundColor: "#0d131a",
                color: "#f4f1ea",
              }}
              className="flex md:hidden h-9 w-9 items-center justify-center border border-white/15"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={18} />
            </button>
          </div>

          {menuOpen && (
            <nav className="flex flex-col gap-2 border-b border-white/10 bg-[#080b0e] px-6 py-4 md:hidden font-mono text-xs uppercase tracking-widest">
              {nav.map((item: string) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-slate-200 hover:text-sky-400 border-b border-white/5"
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
        </header>

        {/* 5. MAIN CONTENT */}
        <main className="relative z-10">
          <HeroSection cv={cv} />

          <KineticEditorialRibbon
            textEn="ARCHITECTURAL WEB ENGINEERING · CLEAN CODE · PURPOSEFUL DESIGN"
            textJp="構造設計とデジタル工芸の融合 · 静寂と秩序"
            direction={1}
          />

          {/* STATS STRIP */}
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statsData.map((item: StatDataItem, index: number) => (
                <StatItem
                  key={item.label}
                  index={index}
                  value={item.value}
                  plus={item.plus}
                  label={item.label}
                  jpText={item.jpText}
                />
              ))}
              <div className="flex flex-col justify-center border border-sky-400/30 bg-[#0c131a] p-5 sm:p-6">
                <span
                  lang="ja"
                  className="font-serif text-base sm:text-lg font-bold text-sky-300"
                >
                  一行一行に、情熱を。
                </span>
                <p className="mt-1 font-mono text-xs text-slate-300">
                  Passion in every line of code.
                </p>
              </div>
            </div>
          </div>

          {/* SKILLS SECTION */}
          <section
            id="skills"
            className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28"
          >
            <SectionHeading
              number="01"
              jpChapter="第弐章 // 技術領域"
              eyebrow="THE TOOLKIT"
              title="Tools I build with"
              subtitle="The right tools. The right solutions. Always learning, always evolving."
            />

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((s: SkillItem, idx: number) => (
                <SkillCard key={s.name} skill={s} index={idx} />
              ))}
            </div>

            <ToolboxStrip />
          </section>

          <KineticEditorialRibbon
            textEn="SELECTED WORKS & DIGITAL ARTIFACTS · FROM FIRST IDEA TO FINAL PIXEL"
            textJp="厳選された制作実績 · 機能美と構造の調和"
            direction={-1}
          />

          {/* PROJECTS SECTION */}
          <section
            id="projects"
            className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28"
          >
            <SectionHeading
              number="02"
              jpChapter="第参章 // 厳選作品"
              eyebrow="SELECTED WORK"
              title="Built with purpose"
              subtitle="A few things I’ve brought to life. From the first idea to the final pixel."
            />

            <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 border border-white/15 bg-[#0c1117] p-1.5">
                {filterOptions.map((f: FilterCategory) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3.5 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
                      filter === f
                        ? "aethyy-filter-active"
                        : "aethyy-filter-inactive"
                    }`}
                  >
                    <span>{f}</span>
                    {f === "All Projects" && (
                      <span className="ml-1.5 text-[10px] opacity-80">03</span>
                    )}
                  </button>
                ))}
              </div>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#cbd5e1" }}
                className="inline-flex items-center gap-1.5 font-mono text-xs hover:text-sky-400 transition-colors"
              >
                <span>More on GitHub</span>
                <Icon name="diagonal" size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter(
                  (p: ProjectItem) =>
                    filter === "All Projects" || p.category === filter,
                )
                .map((p: ProjectItem, idx: number) => (
                  <ProjectCard key={p.name} project={p} index={idx} />
                ))}
            </div>
          </section>

          {/* CERTIFICATES PHOTO EXHIBITION SECTION */}
          <section
            id="certificates"
            className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28"
          >
            <SectionHeading
              number="03"
              jpChapter="第四章 // 認定証書額装展"
              eyebrow="KEEP GROWING"
              title="Learning never stops"
              subtitle="Dipajang dalam bingkai pameran foto interaktif. Arahkan mouse untuk menggoyangkan bingkai atau klik untuk memperbesar."
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {certificatesData.map((c: CertificateItem, idx: number) => (
                <FramedCertificateCard
                  key={c.id}
                  cert={c}
                  index={idx}
                  onInspect={(item: CertificateItem) =>
                    setActiveLightboxCert(item)
                  }
                />
              ))}
            </div>
          </section>

          {/* CONTACT SECTION */}
          <ContactSection />
        </main>

        {/* 6. FOOTER */}
        <footer className="relative z-10 border-t border-white/10 bg-[#06090c]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-8">
            <a
              href="#"
              className="flex items-center gap-2.5 text-sm font-bold text-[#f4f1ea]"
            >
              <span className="flex h-7 w-7 items-center justify-center border border-sky-400/50 bg-[#0c1218] font-serif text-xs font-black">
                a<span className="text-sky-400">.</span>
              </span>
              <span className="font-serif">
                Aethyy<span className="text-sky-400">.dev</span>
              </span>
            </a>

            <p className="text-center font-mono text-xs text-slate-400">
              © {new Date().getFullYear()} Muhammad Irwan. Crafted with care &
              caffeine.
            </p>

            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-slate-300 hover:border-sky-400 hover:text-sky-300 transition-colors"
              >
                <Icon name="github" size={15} />
              </a>
              <a
                href="https://instagram.com/aetyyy16"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-white/15 font-serif text-xs font-bold text-slate-300 hover:border-sky-400 hover:text-sky-300 transition-colors"
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4 [&>svg]:fill-[#cad5e2]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </span>
              </a>
              <a
                href="mailto:muhammad.irwan399@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-slate-300 hover:border-sky-400 hover:text-sky-300 transition-colors"
              >
                <Icon name="mail" size={15} />
              </a>
              <a
                href="#"
                aria-label="Back to top"
                className="aethyy-btn-cyan flex h-9 w-9 items-center justify-center font-mono text-xs font-bold transition-colors"
              >
                <span>↑</span>
              </a>
            </div>
          </div>
        </footer>

        {/* 7. MODAL LIGHTBOX UNTUK MELIHAT BINGKAI SERTIFIKAT UKURAN PENUH */}
        {activeLightboxCert && (
          <div
            onClick={() => setActiveLightboxCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <div
              onClick={(e: ReactMouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              }
              className="relative w-full max-w-2xl border-10 border-[#1c2530] bg-[#0b0f14] p-4 sm:p-6 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveLightboxCert(null)}
                style={{
                  backgroundColor: "#080b0e",
                  color: "#f4f1ea",
                }}
                className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center border border-white/25 hover:text-sky-400 cursor-pointer"
                aria-label="Close preview"
              >
                <Icon name="close" size={16} />
              </button>

              <div className="border-2 border-[#d8d0c0] bg-[#f4f1ea] p-5 sm:p-8 text-slate-900">
                <div className="flex flex-col justify-between border border-slate-300 bg-[#fbfaf6] p-5 sm:p-7">
                  <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                    <div>
                      <p className="font-mono text-[10px] font-bold tracking-[0.25em] text-slate-500">
                        OFFICIAL EXHIBITION CERTIFICATE
                      </p>
                      <h3 className="mt-1 font-serif text-xl sm:text-2xl font-black text-slate-900">
                        {activeLightboxCert.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600">
                        Issued by {activeLightboxCert.issuer} ·{" "}
                        {activeLightboxCert.year}
                      </p>
                    </div>
                    <span
                      lang="ja"
                      className="border border-rose-600 bg-rose-50 px-2.5 py-1 font-mono text-xs font-bold text-rose-700"
                    >
                      {activeLightboxCert.jpStamp}
                    </span>
                  </div>

                  <div className="my-6 space-y-2">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                      This certifies that
                    </p>
                    <p className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
                      {activeLightboxCert.recipient}
                    </p>
                    <p className="pt-1 text-xs leading-relaxed text-slate-600">
                      Has successfully demonstrated proficiency in:{" "}
                      <strong>{activeLightboxCert.skillsCovered}</strong>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3 font-mono text-[10px] text-slate-500">
                    <span>
                      CREDENTIAL ID: {activeLightboxCert.credentialId}
                    </span>
                    <a
                      href={activeLightboxCert.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#0369a1" }}
                      className="inline-flex items-center gap-1 font-bold hover:underline"
                    >
                      <span>Buka Kredensial Asli</span>
                      <Icon name="diagonal" size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. PEMUTAR MUSIK LANGSUNG DARI YOUTUBE https://www.youtube.com/watch?v=wPb_miODtDI */}
        <DirectYouTubeCassettePlayer startSignal={musicTrigger} />
      </div>
    </ScrollContext.Provider>
  );
}
