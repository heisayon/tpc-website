import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { merchProducts, site } from "@/lib/site";

export default function Merch({ compact = false }: { compact?: boolean }) {
  const products = compact ? merchProducts.slice(0, 4) : merchProducts;
  const [official, ...rest] = products;

  return (
    <section id="merch" className="tpc-section bg-tpc-cream">
      <div className="tpc-container">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="tpc-eyebrow">Merch preview</p>
            <h2 className="tpc-heading mt-4 max-w-3xl">Birthing: A call to intimacy.</h2>
            <p className="tpc-subheading mt-4 max-w-2xl">
         This is the 2026 theme, and the shirt drop follows that message.
Preview the designs here, then place your order on Bumpa.
            </p>
          </div>
          <a href={site.storeLink} target="_blank" rel="noopener noreferrer" className="tpc-button tpc-button-dark w-fit">
            Order on Bumpa
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="tpc-card overflow-hidden bg-tpc-ink text-white">
            <div className="relative aspect-[4/3] min-h-[320px] bg-[#566b78]">
              <Image
                src={official.image}
                alt={official.name}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-contain"
                priority={compact}
              />
            </div>
            <div className="grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-tpc-honey">{official.tag}</p>
                <h3 className="mt-2 text-3xl font-black uppercase leading-none sm:text-5xl">{official.name}</h3>
                <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/70">{official.description}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-white/50">Price</p>
                <p className="mt-1 text-3xl font-black text-tpc-honey">{official.price}</p>
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((product) => (
              <article key={product.name} className="tpc-card tpc-card-hover grid grid-cols-[8.5rem_1fr] overflow-hidden">
                <div className="relative min-h-40 bg-[#566b78]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-tpc-red">{product.tag}</p>
                  <h3 className="mt-2 text-lg font-black uppercase leading-tight text-tpc-ink">{product.name}</h3>
                  <p className="mt-2 text-sm font-black text-tpc-red">{product.price}</p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-tpc-slate">{product.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm font-semibold leading-6 text-tpc-slate">
          Note:
This page is only a preview. Final orders, sizes, and availability will be confirmed on the Bumpa store.
        </p>
      </div>
    </section>
  );
}
