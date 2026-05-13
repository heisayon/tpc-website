const items = [
  "Prayer",
  "The Word",
  "Worship",
  "Consecration",
  "Community",
  "Discipleship",
  "Service",
  "Fire",
];

export default function Marquee() {
  const track = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden bg-tpc-red py-4 text-white" aria-label="TPC values">
      <div className="marquee-track">
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center text-sm font-extrabold uppercase tracking-[0.2em]">
            <span className="px-5">{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-tpc-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
