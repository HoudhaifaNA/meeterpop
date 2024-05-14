import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col gap-8 py-12 items-center p-child">
        <div className="flex flex-col gap-8 text-center sm:w-[75%]">
          <h1 className="text-3xl sm:text-4xl lg:leading-snug lg:text-6xl font-bold leading-relaxed ">
            Start making money with the best{" "}
            <span className="text-cyan-600">PainCalls</span> service you will
            pop up with.
          </h1>
          <p className="leading-relaxed sm:text-lg md:text-xl text-base">
            A great way to attract customers with our software that is easy to
            use and very customizable to your needs.
          </p>
        </div>

        <Button asChild className="w-max">
          <Link href="/login">Start poping</Link>
        </Button>
      </section>
      <section className="flex flex-col gap-20 py-12 items-center p-child bg-cyan-900">
        <h4 className="text-lg font-semibold text-center text-white">
          Two steps, One minute, More customers.
        </h4>

        <div className="flex items-center justify-center flex-col gap-12 lg:gap-20 md:flex-row">
          <div className="flex flex-col items-center justify-center text-center gap-4 text-white">
            <div className="w-12 h-12 rounded font-semibold bg-white flex items-center justify-center text-cyan-600 text-xl">
              1
            </div>
            <p className="text-base">
              Add customizable popups with your website domains
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-4 text-white">
            <div className="w-12 h-12 rounded font-semibold bg-white flex items-center justify-center text-cyan-600 text-xl">
              2
            </div>
            <p className="text-base">
              Add the script to your website and you are done
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
