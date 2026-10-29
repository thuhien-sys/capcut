import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { ICONS } from "./Icons";
import { NetworkArt, PhoneMockup } from "./Mockups";
import { SceneArt as SceneArtSpec } from "./types";

export const ART_SIZE = 300;
const MEDALLION = 210;
const SATELLITE = 66;
const ORBIT = 120;

const Medallion: React.FC<{ spec: Extract<SceneArtSpec, { icon: unknown }>; from: number }> = ({ spec, from }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - from, fps, config: { damping: 12, mass: 0.8 } });
  const float = Math.sin(frame / 22) * 6;
  const Icon = ICONS[spec.icon];
  const satellites = spec.satellites ?? [];

  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${pop})` }}>
      {/* Pulsing rings */}
      {[0, 30].map((offset) => {
        const t = ((frame + offset) % 60) / 60;
        return (
          <div
            key={offset}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: MEDALLION,
              height: MEDALLION,
              marginLeft: -MEDALLION / 2,
              marginTop: -MEDALLION / 2,
              borderRadius: "50%",
              border: `3px solid ${COLORS.gold}`,
              opacity: 0.5 * (1 - t),
              transform: `scale(${1 + t * 0.4})`,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: MEDALLION,
          height: MEDALLION,
          marginLeft: -MEDALLION / 2,
          marginTop: -MEDALLION / 2 + float,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, #2c6db3 0%, ${COLORS.navyDark} 70%)`,
          border: `6px solid ${COLORS.gold}`,
          boxShadow: `0 0 40px rgba(245,196,0,0.35), inset 0 0 30px rgba(0,0,0,0.4)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={112} color={COLORS.white} strokeWidth={1.6} />
      </div>
      {satellites.map((name, i) => {
        const SatIcon = ICONS[name];
        const appear = spring({ frame: frame - from - 10 - i * 6, fps, config: { damping: 14 } });
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / satellites.length + frame / 140;
        const x = Math.cos(angle) * ORBIT;
        const y = Math.sin(angle) * ORBIT * 0.92;
        return (
          <div
            key={name}
            style={{
              position: "absolute",
              left: ART_SIZE / 2 + x - SATELLITE / 2,
              top: ART_SIZE / 2 + y - SATELLITE / 2,
              width: SATELLITE,
              height: SATELLITE,
              borderRadius: "50%",
              background: i % 2 === 0 ? COLORS.red : COLORS.gold,
              boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${appear})`,
            }}
          >
            <SatIcon size={36} color={i % 2 === 0 ? COLORS.white : COLORS.navyDeep} strokeWidth={2.2} />
          </div>
        );
      })}
    </div>
  );
};

/** A user-supplied photo with a slow zoom. */
const Photo: React.FC<{ src: string; from: number }> = ({ src, from }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const pop = spring({ frame: frame - from, fps, config: { damping: 14 } });
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.12]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 10,
        borderRadius: 24,
        overflow: "hidden",
        border: `6px solid ${COLORS.gold}`,
        boxShadow: "0 12px 36px rgba(0,0,0,0.5)",
        transform: `scale(${pop})`,
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }} />
    </div>
  );
};

export const SceneArtView: React.FC<{ art: SceneArtSpec; from: number }> = ({ art, from }) => (
  <div style={{ position: "absolute", right: 40, top: 92, width: ART_SIZE, height: ART_SIZE }}>
    {"image" in art ? (
      <Photo src={art.image} from={from} />
    ) : "phone" in art ? (
      <PhoneMockup spec={art.phone} from={from} size={ART_SIZE} />
    ) : "network" in art ? (
      <NetworkArt spec={art.network} from={from} size={ART_SIZE} />
    ) : (
      <Medallion spec={art} from={from} />
    )}
  </div>
);
