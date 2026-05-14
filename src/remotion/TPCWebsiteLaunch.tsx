import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";

const fps = 30;

// Change these if the final campaign wording changes.
const launchCopy = {
  url: "tpcglobal.live",
  line: "Register. Share. Bring someone.",
  tag: "TPC 2026 - Birthing SZN",
};

const assets = {
  oldDraft: staticFile("/assets/tpc/tpc-site-launch-old-draft.mp4"),
  logo: staticFile("/assets/tpc/tpc-logo.png"),
};

function fade(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

function fadeDown(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
}

function rise(frame: number, delay = 0, from = 44) {
  const value = spring({
    frame: frame - delay,
    fps,
    config: { damping: 24, stiffness: 120, mass: 0.85 },
  });

  return interpolate(value, [0, 1], [from, 0]);
}

function FilmPolish() {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 1080], [0, 90], { extrapolateRight: "clamp" });

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 45%, transparent 0%, rgba(0,0,0,0.05) 42%, rgba(0,0,0,0.28) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.08,
          transform: `translateY(${drift}px)`,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 18%, transparent 76%, rgba(0,0,0,0.26) 100%)",
        }}
      />
    </>
  );
}

function FinalLift() {
  const frame = useCurrentFrame();
  const local = frame - 915;
  const overlayOpacity = fade(frame, 920, 970);
  const cardOpacity = fade(frame, 954, 984);
  const exitDim = fade(frame, 900, 960);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 35%, rgba(243,169,18,0.18), transparent 34%), linear-gradient(180deg, rgba(16,11,13,0.08), rgba(16,11,13,0.74))",
          opacity: exitDim,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 118,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          opacity: overlayOpacity * fadeDown(frame, 1060, 1080),
          transform: `translateY(${rise(local, 0, 32)}px)`,
        }}
      >
        <Img
          src={assets.logo}
          style={{
            width: 118,
            height: 118,
            objectFit: "contain",
            opacity: fade(local, 0, 18),
            filter: "drop-shadow(0 18px 38px rgba(0,0,0,0.3))",
          }}
        />
        <div
          style={{
            marginTop: 22,
            width: "100%",
            maxWidth: 830,
            borderRadius: 38,
            padding: "34px 34px 38px",
            background: "linear-gradient(180deg, rgba(255,248,236,0.96), rgba(255,255,255,0.9))",
            boxShadow: "0 34px 90px rgba(0,0,0,0.32)",
            border: "2px solid rgba(243,169,18,0.42)",
            opacity: cardOpacity,
            transform: `scale(${interpolate(cardOpacity, [0, 1], [0.96, 1])})`,
          }}
        >
          <div
            style={{
              color: "#b71613",
              fontFamily: 'Inter, "Montserrat", Arial, sans-serif',
              fontSize: 15,
              fontWeight: 900,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            website is live
          </div>
          <div
            style={{
              marginTop: 18,
              color: "#100b0d",
              fontFamily: 'Inter, "Montserrat", Arial, sans-serif',
              fontSize: 88,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: 0,
              textTransform: "lowercase",
            }}
          >
            {launchCopy.url}
          </div>
          <div
            style={{
              marginTop: 20,
              color: "#514950",
              fontFamily: 'Inter, "Montserrat", Arial, sans-serif',
              fontSize: 27,
              lineHeight: 1.24,
              fontWeight: 800,
            }}
          >
            {launchCopy.line}
          </div>
        </div>
        <div
          style={{
            marginTop: 24,
            borderRadius: 999,
            padding: "18px 26px",
            background: "#f3a912",
            color: "#100b0d",
            fontFamily: 'Inter, "Montserrat", Arial, sans-serif',
            fontSize: 24,
            fontWeight: 900,
            opacity: fade(frame, 990, 1015),
          }}
        >
          {launchCopy.tag}
        </div>
      </div>
    </>
  );
}

export function TPCWebsiteLaunch() {
  return (
    <AbsoluteFill style={{ background: "#100b0d", overflow: "hidden" }}>
      <OffthreadVideo
        src={assets.oldDraft}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <FilmPolish />
      <FinalLift />
    </AbsoluteFill>
  );
}
