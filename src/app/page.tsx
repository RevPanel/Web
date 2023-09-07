import { Button, LinkButton } from "@/components/button";
import Logo from "@/components/logo";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <div className="w-3/4 mx-auto flex justify-between items-center m-4 md:m-0 md:mx-auto">
      <Logo />
      <div className="hidden md:flex gap-4 items-center">
        <Link className="text-tertiary" href="#">
          Enterprise
        </Link>
        <Link className="text-tertiary" href="#">
          Plans
        </Link>
        <Link className="text-tertiary" href="#">
          Discord
        </Link>
        <Link className="text-tertiary" href="#">
          About Us
        </Link>
      </div>
      <LinkButton
        href="/app"
        role="secondary"
        className="uppercase hidden md:flex"
      >
        Client Portal
      </LinkButton>
      <FontAwesomeIcon icon={faBars} className="md:hidden text-2xl" />
    </div>
  );
}

function Hero() {
  return (
    <div className="md:w-1/2 xl:w-1/3 mx-auto flex flex-col gap-4 text-center items-center justify-center">
      <Button className="text-gradient font-medium" role="secondary">
        AN INNOVATIVE AND EXCLUSIVE PANEL
      </Button>
      <h1 className="font-medium text-4xl">
        Have the best <span className="text-gradient">panel</span> on the
        current market
      </h1>
      <p className="text-tertiary">
        Integrate with your system and generate a great organization for your
        project
      </p>
      <Button
        className="font-medium !p-4 !px-8 flex items-center gap-2"
        role="primary"
      >
        <FontAwesomeIcon icon={faCircleUser} />
        GET STARTED
      </Button>
    </div>
  );
}

function Pricing() {
  return (
    <div className="md:w-3/4 mx-auto flex flex-col gap-2 text-center md:text-left">
      <Button role="secondary" className="uppercase w-fit mx-auto md:m-0">
        <span className="text-gradient">Prices</span>
      </Button>
      <div className="flex flex-col md:flex-row items-center w-full justify-between">
        <h1 className="text-4xl">See the plans we offer</h1>
        <p>TODO: Monthly</p>
      </div>
      <p className="text-tertiary">The best plans for your company</p>

      <div className="mt-4 w-full flex flex-col md:flex-row gap-2 justify-between">
        <PriceCard />
        <PriceCard />
        <PriceCard role="primary" />
      </div>
    </div>
  );
}

function PriceCard({ role }: { role?: "primary" }) {
  return (
    <div
      className={
        "bg-background-secondary md:bg-none m-4 md:m-0 p-4 md:w-96 rounded-xl flex flex-col gap-2 " +
        (role ? "bg-background-secondary" : "")
      }
    >
      <h1 className="text-3xl">Free</h1>
      <p className="text-tertiary">Perfect plan to get started</p>
      <h2 className="text-3xl">
        €0<span className="text-sm text-tertiary">/month</span>
      </h2>
      <p className="text-tertiary w-3/4">
        A free plan grants you access to some cool features.
      </p>
      <ul className="list-disc list-inside flex flex-col gap-2 text-lg">
        <li>Lorem ipsum</li>
        <li>Lorem ipsum</li>
        <li>Lorem ipsum</li>
        <li>Lorem ipsum</li>
        <li>Lorem ipsum</li>
      </ul>
    </div>
  );
}

function Banner() {
  return (
    <div className="relative md:w-3/4 md:h-96 p-8 py-14 md:py-4 md:p-4 mx-auto bg-background-secondary rounded-xl flex flex-col gap-2 justify-center items-center text-center">
      <Image
        src="/dots.svg"
        className="absolute top-0 left-0"
        alt="dots"
        width="100"
        height="100"
      />
      <h3 className="text-tertiary">
        More than 1000+ companies using our dashboard
      </h3>
      <h1 className="text-gradient md:w-1/2 text-3xl font-bold">
        The Future has arrived, the best dashboard for your company
      </h1>
      <Button role="white" className="font-medium uppercase !p-4 !px-8">
        <span className="text-black">Get the Dashboard</span>
      </Button>
      <Image
        src="/dots.svg"
        className="absolute bottom-0 right-0"
        alt="dots"
        width="100"
        height="100"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="md:w-3/4 mx-auto flex flex-col gap-8 border-t border-t-gray-900 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">VPS Panel</h1>
          <div className="flex gap-2">
            <LinkButton role="secondary" href="/discord">
              <FontAwesomeIcon icon={faDiscord} />
            </LinkButton>
            <LinkButton role="secondary" href="/github">
              <FontAwesomeIcon icon={faGithub} />
            </LinkButton>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">About</h2>
            <Link className="text-white" href="#">
              About Us
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">About</h2>
            <Link className="text-white" href="#">
              About Us
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">About</h2>
            <Link className="text-white" href="#">
              About Us
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">About</h2>
            <Link className="text-white" href="#">
              About Us
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full text-tertiary flex flex-col md:flex-row justify-between border-t border-t-gray-900 pt-4">
        <p>Copyright &copy; VPS Panel - 2023</p>
        <Link className="text-tertiary" href="mailto:contact@vpspanel.com">
          contact@vpspanel.com
        </Link>
      </div>
    </footer>
  );
}

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
