import Banner from "@/components/home/banner";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import Navbar from "@/components/home/navbar";
import Pricing from "@/components/home/pricing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full flex-col gap-10 md:p-6">
      <Navbar />
      <div className="relative flex w-full flex-col gap-10 p-2 md:p-6">
        <Image
          className="absolute left-52 top-14 -z-10 hidden md:block xl:left-[25rem]"
          src="/frame1.svg"
          alt="frame"
          width="160"
          height="300"
        />
        <div
          style={{
            opacity: 0.3,
            background:
              "linear-gradient(0deg, #C082FF 0%, #7967FF 54.17%, #C3BBFF 100%)",
            filter: "blur(150px)",
          }}
          className="absolute right-0 top-14 -z-10 md:right-52 xl:right-[32rem]"
        >
          <Image
            src="/frame2.svg"
            alt="frame"
            width="160"
            height="300"
            className="opacity-0 md:opacity-100"
          />
        </div>
        <Hero />
        <Image
          src="/panel.png"
          alt="panel"
          width="1000"
          height="500"
          className="rounded-xl md:hidden"
        />
        <Image
          src="/panel.png"
          alt="panel"
          width="800"
          height="300"
          className="mx-auto hidden w-1/2 rounded-xl md:block"
        />
        <Pricing />
        <Banner />
        <Footer />
      </div>
    </main>
  );
}
