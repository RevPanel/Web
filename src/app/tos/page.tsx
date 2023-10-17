import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex w-full flex-col">
      <Navbar />

      <h1 className="mt-10 text-center text-4xl font-extrabold">
        Terms of Services
      </h1>
      <p className="text-center">
        Last updated: <b>October 17, 2023</b>
      </p>
      <div className="mx-auto my-6 w-3/4 px-4 md:px-0">
        <p>
          Welcome to RevPanel (&quot;the Company&quot;). By accessing and using
          our services, including but not limited to our website and application
          (collectively, &quot;the Service&quot;), you agree to comply with and
          be bound by the following terms and conditions. Please read these
          terms carefully before using our Service.
        </p>
        <h2 className="mt-4 text-lg font-bold">
          1. DESCRIPTION OF THE SERVICE
        </h2>
        <p>
          <b>1.1</b> Our Service is designed to provide users with a panel where
          they can manage their machines. The front end of the panel is fully
          hosted by us, while the back end, responsible for managing VPS
          (Virtual Private Servers), is hosted on the client&apos;s machines.
        </p>

        <h2 className="mt-4 text-lg font-bold">
          2. DISCLAIMER OF SECURITY AND DATA VULNERABILITY
        </h2>
        <p>
          <b>2.1</b> While the Company has taken the utmost care in developing
          the web application, there is also a need for a disclaimer. This
          disclaimer wants to clarify that the Company is not responsible for
          any security vulnerabilities, data breaches, or other security-related
          issues.
        </p>
        <p>
          <b>2.2</b> Users of the Service acknowledge that there are inherent
          risks associated with online services and data storage, and the
          Company cannot guarantee 100% security against such risks and data
          attacks.
        </p>

        <h2 className="mt-4 text-lg font-bold">3. PRIVACY POLICY</h2>
        <p>
          <b>3.1</b> By using our Service, the client agrees to the Privacy
          Policy, which outlines the data collection practices. The Privacy
          Policy can be found further down in the documentation.
        </p>

        <h2 className="mt-4 text-lg font-bold">
          4. PREMIUM PLANS AND REFUND POLICY
        </h2>
        <p>
          <b>4.1</b> For users on premium plans, refunds are only offered before
          the end of the first half of the month. After this period, no refunds
          will be provided.
        </p>

        <p>
          <b>4.2</b> The Company may offer partial or full refunds in cases
          where there’s an issue or a significant reason to why a refund should
          be granted. These instances and cases will be at the full discretion
          of the Company.
        </p>

        <p>
          <b>4.3</b> The Client acknowledges and agrees that a refund request
          may be denied for any reason, at any time, even when the cause and
          requirements are met, the Company is still able at their full
          discretion to deny a refund request.
        </p>

        <h2 className="mt-4 text-lg font-bold">
          5. ACCESS TO CLIENT DATA AND MACHINES
        </h2>
        <p>
          <b>5.1</b> Upon delivery, installation, maintenance, or other issues
          the Client may be experiencing, the Company will provide support for
          such issues. Support matters can be one hundred percent theoretical,
          but a practical step might be necessary.
        </p>
        <p>
          <b>5.2</b> Under the circumstances that the Company must access the
          panel of the Client, with or without the client’s permission, the
          Company is allowed to do so if the reason behind it corresponds with
          one of the following causes: a) fixing an issue or problem. b)
          providing assistance requested by the client. c) suspicious use or
          data income. d) other issues or reasons that violate these terms of
          service.
        </p>

        <h2 className="mt-4 text-lg font-bold">
          6. ACCESS TO CLIENT DATA AND MACHINES
        </h2>
        <p>
          <b>6.1</b> The Company does not allow illegal use, sharing, or theft
          of the panel, components, design, logos, or alike. The panel, web
          application, website, and everything within the Service is the sole
          property of the Company.
        </p>

        <h2 className="mt-4 text-lg font-bold">7. CHANGES TO TERMS</h2>
        <p>
          <b>7.1</b> The Company reserves the right to modify these terms at any
          time without notice. Your continued use of the Service following such
          changes constitutes your acceptance of the modified terms.
        </p>

        <h2 className="mt-4 text-lg font-bold">8. CONTACT INFORMATION</h2>
        <p>
          If you have any questions or concerns regarding these terms, please
          contact us at{" "}
          <Link href="mailto:contact@revpanel.io">contact@revpanel.io</Link>.
          <br /> By using our Service, you agree to these terms and our Privacy
          Policy. If you do not agree with these terms, please refrain from
          using our Service. Your use of the Service is at your own risk, and
          the Company disclaims any liability, except as expressly stated in
          these terms or as required by applicable law.
        </p>
      </div>

      <Footer />
    </main>
  );
}
