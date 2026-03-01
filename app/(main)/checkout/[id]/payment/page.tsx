import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";

export default function PaymentPage() {
  return (
    <section className="bg-secondary text-foreground min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-4 pt-8 pb-56 md:px-8">
        <h1 className="text-5xl leading-tight font-extrabold md:text-6xl">
          Review and place
          <br />
          your order
        </h1>

        <article className="bg-background mt-8 p-4 md:p-8">
          <h2 className="text-4xl font-extrabold md:text-5xl">
            Delivery address
          </h2>

          <div className="mt-8 flex items-start gap-3">
            <MapPin className="mt-1 h-8 w-8" strokeWidth={2.2} />
            <div>
              <p className="text-[2rem] leading-none font-bold">
                kk Badashpur Road
              </p>
              <p className="mt-4 text-[2.6rem] leading-none font-normal">
                Dhaka
              </p>
            </div>
          </div>

          <div className="border-border text-muted-foreground mt-8 rounded-3xl border px-4 py-6 text-2xl md:px-6 md:py-8 md:text-4xl">
            Note to rider - e.g. building, landma...
          </div>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 text-[2rem] leading-none font-semibold"
          >
            Change
            <ChevronDown className="text-primary h-8 w-8" strokeWidth={2.5} />
          </button>

          <div className="bg-border my-8 h-px" />

          <div className="flex items-center justify-between">
            <p className="text-[2rem] leading-none">Contactless delivery</p>
            <button
              type="button"
              aria-label="Toggle contactless delivery"
              className="bg-muted relative h-10 w-20 rounded-full"
            >
              <span className="bg-background absolute top-1 left-1 h-8 w-8 rounded-full shadow-sm" />
            </button>
          </div>
        </article>
      </div>

      <aside className="border-border bg-background fixed right-0 bottom-0 left-0 border-t px-4 pt-4 pb-6 md:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[2.8rem] leading-none font-bold">
                Total{" "}
                <span className="text-muted-foreground text-[2rem] font-normal">
                  (incl. fees and tax)
                </span>
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-[2rem] leading-none font-semibold underline"
              >
                See summary
              </Link>
            </div>

            <div className="text-right">
              <p className="text-primary text-[3rem] leading-none font-bold">
                Tk 513
              </p>
              <p className="text-muted-foreground mt-3 text-[2.2rem] leading-none line-through">
                Tk 537
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="bg-muted text-muted-foreground/60 mt-6 h-20 w-full rounded-3xl text-[2rem] font-semibold"
          >
            Place order
          </button>
        </div>
      </aside>
    </section>
  );
}
