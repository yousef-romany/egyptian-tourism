import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import EgyptianDivider from "@/components/egyptian-divider"

export const metadata = {
  title: "Privacy Policy - WanderLand Egypt",
  description: "Learn how WanderLand Egypt collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-[#0c1e35] text-white py-16 md:py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=400&width=1600"
            alt="Egyptian landscape"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-white/80">How we collect, use, and protect your personal information.</p>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground">Last updated: April 3, 2023</p>

            <EgyptianDivider className="my-8" />

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              At WanderLand Egypt, we respect your privacy and are committed to protecting your personal data. This privacy
              policy explains how we collect, use, and safeguard your information when you visit our website, book our
              tours, or interact with us in any way.
            </p>
            <p>
              Please read this privacy policy carefully. By using our website or services, you consent to the practices
              described in this policy.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-bold mt-6 mb-3">2.1 Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Contact Information:</strong> Name, email address, postal address, phone number
              </li>
              <li>
                <strong>Identification Information:</strong> Passport details, date of birth, nationality (required for
                booking tours and processing visas)
              </li>
              <li>
                <strong>Payment Information:</strong> Credit card details, billing address (note that full payment card
                details are processed securely through our payment processors)
              </li>
              <li>
                <strong>Travel Information:</strong> Flight details, accommodation preferences, dietary requirements,
                health information relevant to your tour
              </li>
              <li>
                <strong>Communication Records:</strong> Records of your communications with us, including emails, phone
                calls, and online chat sessions
              </li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about your device and usage
              patterns, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referral source</li>
              <li>Length of visit, page views, and website navigation paths</li>
              <li>Information about the timing, frequency, and pattern of your website use</li>
            </ul>
            <p>
              We collect this information using cookies and similar technologies. For more information about our use of
              cookies, please see our Cookie Policy.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>To process and fulfill your tour bookings</li>
              <li>To communicate with you about your bookings, inquiries, or requests</li>
              <li>To arrange necessary travel documents, including visas where applicable</li>
              <li>To personalize your experience and provide tailored service</li>
              <li>To process payments and prevent fraudulent transactions</li>
              <li>To improve our website, products, and services</li>
              <li>To send you marketing communications about our tours and special offers (if you have opted in)</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, property, or safety, or the rights, property, or safety of others</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">4. Legal Basis for Processing</h2>
            <p>We process your personal information on the following legal grounds:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Contract:</strong> Processing is necessary for the performance of a contract with you (e.g., to
                fulfill your tour booking)
              </li>
              <li>
                <strong>Consent:</strong> You have given consent for specific purposes (e.g., marketing communications)
              </li>
              <li>
                <strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests, such as
                improving our services and preventing fraud
              </li>
              <li>
                <strong>Legal Obligation:</strong> Processing is necessary to comply with legal obligations
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">5. Data Sharing and Disclosure</h2>
            <p>We may share your personal information with the following categories of recipients:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Service Providers:</strong> Hotels, transportation companies, local tour operators, and other
                third parties necessary to fulfill your booking
              </li>
              <li>
                <strong>Payment Processors:</strong> Financial institutions that process your payments
              </li>
              <li>
                <strong>Government Authorities:</strong> When required for visa applications, border control, or other
                legal requirements
              </li>
              <li>
                <strong>Professional Advisers:</strong> Lawyers, accountants, and insurers when necessary
              </li>
              <li>
                <strong>Law Enforcement:</strong> When required by law, court order, or governmental regulation
              </li>
            </ul>
            <p>
              We require all third parties to respect the security of your personal data and to treat it in accordance
              with the law. We do not allow our third-party service providers to use your personal data for their own
              purposes and only permit them to process your personal data for specified purposes and in accordance with
              our instructions.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">6. International Transfers</h2>
            <p>
              As a tour operator based in Egypt, we may transfer your personal information to countries outside your
              country of residence, including Egypt and other countries where we operate tours. These countries may have
              different data protection laws than your country of residence.
            </p>
            <p>
              When we transfer your personal information internationally, we take appropriate safeguards to ensure that
              your information receives an adequate level of protection, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Using approved standard contractual clauses</li>
              <li>Ensuring that recipients adhere to appropriate data protection standards</li>
              <li>Obtaining your explicit consent for specific transfers where required</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">7. Data Security</h2>
            <p>
              We have implemented appropriate security measures to prevent your personal information from being
              accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. These measures
              include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Encryption of sensitive data</li>
              <li>Secure network infrastructure with firewalls and intrusion detection</li>
              <li>Regular security assessments and testing</li>
              <li>Access controls and authentication procedures</li>
              <li>Staff training on data protection and security</li>
            </ul>
            <p>
              We have procedures to deal with any suspected personal data breach and will notify you and any applicable
              regulator of a breach where we are legally required to do so.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">8. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as necessary to fulfill the purposes for which
              we collected it, including for the purposes of satisfying any legal, accounting, or reporting
              requirements.
            </p>
            <p>
              In general, we keep basic customer information (name, contact details, booking history) for 7 years after
              your last interaction with us for tax and legal purposes. More detailed information related to specific
              bookings may be retained for shorter periods.
            </p>
            <p>
              In some circumstances, we may anonymize your personal information (so that it can no longer be associated
              with you) for research or statistical purposes, in which case we may use this information indefinitely
              without further notice to you.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">9. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Access:</strong> The right to request copies of your personal information
              </li>
              <li>
                <strong>Rectification:</strong> The right to request that we correct inaccurate or incomplete
                information
              </li>
              <li>
                <strong>Erasure:</strong> The right to request that we delete your personal information in certain
                circumstances
              </li>
              <li>
                <strong>Restriction:</strong> The right to request that we restrict the processing of your information
                in certain circumstances
              </li>
              <li>
                <strong>Data Portability:</strong> The right to request that we transfer your information to another
                organization or to you
              </li>
              <li>
                <strong>Objection:</strong> The right to object to processing of your personal information
              </li>
              <li>
                <strong>Withdraw Consent:</strong> The right to withdraw consent where we are relying on consent to
                process your personal information
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the details provided in the "Contact Us" section
              below. We may need to request specific information from you to help us confirm your identity and ensure
              your right to access your personal data.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">10. Marketing Communications</h2>
            <p>
              We may send you marketing communications about our tours, special offers, and related information if you
              have:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Requested information from us or booked tours with us</li>
              <li>Provided us with your details when registering for a promotion or subscribing to our newsletter</li>
              <li>Opted in to receive marketing communications</li>
            </ul>
            <p>You can opt out of receiving marketing communications from us at any time by:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Clicking the "unsubscribe" link in any marketing email we send you</li>
              <li>Contacting us using the details provided in the "Contact Us" section</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">11. Children's Privacy</h2>
            <p>
              Our website and services are not intended for children under 16 years of age. We do not knowingly collect
              personal information from children under 16. If you are a parent or guardian and believe that your child
              has provided us with personal information, please contact us so that we can delete the information.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">12. Third-Party Links</h2>
            <p>
              Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links
              or enabling those connections may allow third parties to collect or share data about you. We do not
              control these third-party websites and are not responsible for their privacy statements. We encourage you
              to read the privacy policy of every website you visit.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">13. Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices or for other
              operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new
              privacy policy on this page and updating the "Last updated" date.
            </p>
            <p>
              We encourage you to review this privacy policy periodically for any changes. Changes to this privacy
              policy are effective when they are posted on this page.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">14. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us:</p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              <li>
                <strong>WanderLand Egypt</strong>
              </li>
              <li>123 Tahrir Square, Cairo, Egypt</li>
              <li>Phone: +20 123 456 7890</li>
              <li>Email: privacy@WanderLand Egypt.com</li>
            </ul>
            <p>
              If you have unresolved concerns, you may also have the right to make a complaint to your local data
              protection authority.
            </p>

            <EgyptianDivider className="my-8" />

            <p className="text-center text-muted-foreground">
              By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
              <Link href="/contact">Contact Our Privacy Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

