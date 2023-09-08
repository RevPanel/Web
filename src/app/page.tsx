import Banner from "@/components/home/banner";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import Navbar from "@/components/home/navbar";
import Pricing from "@/components/home/pricing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col w-full md:p-6 gap-10">
      <Navbar />
      <div className="relative flex flex-col w-full p-2 md:p-6 gap-10">
        <Image
          className="absolute top-14 left-52 xl:left-[25rem] -z-10 hidden md:block"
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
          className="absolute top-14 right-0 md:right-52 xl:right-[32rem] -z-10"
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
          className="mx-auto rounded-xl w-1/2 hidden md:block"
        />
        <Pricing />
        <Banner />
        <Footer />
      </div>
    </main>
  );
}
