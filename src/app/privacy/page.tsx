import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex w-full flex-col">
      <Navbar />

      <h1 className="mt-10 text-center text-4xl font-extrabold">
        Privacy Policy
      </h1>
      <p className="text-center">
        Last updated: <b>October 17, 2023</b>
      </p>
      <div className="mx-auto my-6 w-3/4 px-4 md:px-0">
        <p>
          RevPanel (&quot;the Company&quot;) is committed to protecting the
          privacy of our users. This Privacy Policy outlines the types of data
          we collect and how we use that data. By using our services, you
          consent to the practices described in this policy.
        </p>
        <h2 className="mt-4 text-lg font-bold">1. DATA COLLECTION</h2>
        <p>We collect the following data:</p>
        <ul className="ml-4 list-inside list-disc">
          <li>
            Users&apos; IP addresses and User Agent information: This data is
            collected for session management and to enhance the user experience.
          </li>
          <li>
            User Email, Name, and Username: This information is collected for
            account creation and communication purposes.
          </li>
          <li>
            Server IP Addresses: We collect server IP addresses to enable users
            to manage their server connections effectively.
          </li>
        </ul>

        <h2 className="mt-4 text-lg font-bold">2. DATA USAGE</h2>
        <p>We only use the collected data for the following purposes:</p>
        <ul className="ml-4 list-inside list-disc">
          <li>Account management and communication with users.</li>
          <li>Enhancing and optimizing the user experience.</li>
          <li>Providing the features and functionalities of our panel.</li>
        </ul>

        <h2 className="mt-4 text-lg font-bold">3. DATA SECURITY</h2>
        <p>
          While we take reasonable measures to protect your data, we want to
          clarify that no online service can guarantee 100% security against
          potential security vulnerabilities and data breaches. Users of our
          Service acknowledge this inherent risk.
        </p>

        <h2 className="mt-4 text-lg font-bold">4. THIRD PARTIES</h2>
        <p>
          The Company uses a self-hosted version of “Plausible Analytics” to
          collect data on how users interact with our website and application.
          “Plausible Analytics” is a third-party service that operates
          independently to provide us with usage data. Please note that the
          third-party does not receive any data from the Company, but uses the
          application to provide the Company with statistics and advanced
          analytics. For more information, please read the “Plausible Analytics”
          privacy policy:{" "}
          <Link href="https://plausible.io/privacy">
            https://plausible.io/privacy
          </Link>
        </p>

        <h2 className="mt-4 text-lg font-bold">8. CONTACT INFORMATION</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy or data
          practices, please contact us at{" "}
          <Link href="mailto:contact@revpanel.io">contact@revpanel.io</Link>.
          <br /> By using our Service, you agree to this Privacy Policy. If you
          do not agree with this policy, please refrain from using our Service.
          We may update this Privacy Policy from time to time, and any changes
          will be posted on our website. Your continued use of our Service
          constitutes your acceptance of the updated policy.
        </p>
      </div>

      <Footer />
    </main>
  );
}
