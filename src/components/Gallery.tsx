import Image from "next/image";
import { galleryImages } from "@/lib/site";

export default function Gallery() {
  return (
    <section className="tpc-section bg-white">
      <div className="tpc-container">
        <div className="mb-12 max-w-3xl">
          <p className="tpc-eyebrow">From the room</p>
          <h2 className="tpc-heading mt-4">Not stock. Not staged. Just TPC.</h2>
          <p className="tpc-subheading mt-5">
            These are real moments from the room, young people praying, laughing, learning, serving, and meeting God together.
          </p>
        </div>

        <div className="grid auto-rows-[230px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[260px]">
          {galleryImages.map((image) => (
            <figure
              key={image.src}
              className={`group relative overflow-hidden rounded-[1.2rem] bg-tpc-ink ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.label}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,11,13,0)_40%,rgba(16,11,13,0.82)_100%)]" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-sm font-black uppercase tracking-[0.12em] text-white">
                {image.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
