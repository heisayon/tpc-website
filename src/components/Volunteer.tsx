import { MessageCircle } from "lucide-react";
import { site, volunteerTeams } from "@/lib/site";

export default function Volunteer() {
  return (
    <section id="volunteer" className="tpc-section bg-white">
      <div className="tpc-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="tpc-eyebrow">Volunteer</p>
            <h2 className="tpc-heading mt-4 max-w-2xl">The fire spreads because people serve.</h2>
          </div>
          <div>
            <p className="tpc-subheading">
              Volunteers are not extra hands. They carry the room in prayer, order, care, and quiet attention. July is strictly for the volunteer prayer meeting.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.whatsapp} className="tpc-button tpc-button-ghost" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} />
                Volunteer on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {volunteerTeams.map((team) => (
            <article key={team.name} className="tpc-card tpc-card-hover p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-tpc-red/10 text-tpc-red">
                <team.icon size={22} />
              </div>
              <h3 className="font-display text-2xl text-tpc-ink">{team.name}</h3>
              <p className="mt-3 text-sm leading-6 text-tpc-slate">{team.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
