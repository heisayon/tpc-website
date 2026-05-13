import Link from "next/link";
import { ArrowRight } from "lucide-react";
import YearSchedule from "@/components/YearSchedule";

export default function Conference({ compact = false }: { compact?: boolean }) {
  return (
    <section id="conference" className="tpc-section bg-white">
      <div className="tpc-container">
        <div className="mb-12 grid gap-7 lg:grid-cols-[0.9fr_1fr] lg:items-end">
          <div>
            <p className="tpc-eyebrow">2026 calendar</p>
            <h2 className="tpc-heading mt-4 max-w-3xl">March to August is not random, It is a build-up.</h2>
          </div>
          <div>
            <p className="tpc-subheading">
              March and April are completed. <br />
              Creator&apos;s Conf is open for registration.
              School outreach is handled through direct enquiry.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/register" className="tpc-button tpc-button-primary">
                Register
                <ArrowRight size={16} />
              </Link>
              <Link href="/support" className="tpc-button tpc-button-ghost">
                Support the work
              </Link>
            </div>
          </div>
        </div>

        <YearSchedule compact={compact} />
      </div>
    </section>
  );
}
