import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import EgyptianDivider from "@/components/egyptian-divider"

export const metadata = {
  title: "Terms & Conditions - WanderLand Egypt",
  description: "Read our terms and conditions for booking tours and services with WanderLand Egypt.",
}

export default function TermsPage() {
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
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-lg text-white/80">
              Please read these terms carefully before booking with WanderLand Egypt.
            </p>
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
              Welcome to WanderLand Egypt. These Terms and Conditions govern your use of our website and the booking of our
              tour services. By accessing our website and/or booking our services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
            </p>
            <p>
              WanderLand Egypt is a registered tour operator based in Cairo, Egypt, specializing in guided tours throughout
              Egypt. Our company registration number is EGT-12345, and we are licensed by the Egyptian Ministry of
              Tourism (License No. 567890).
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">2. Booking and Payment</h2>
            <h3 className="text-xl font-bold mt-6 mb-3">2.1 Booking Process</h3>
            <p>
              Bookings can be made through our website, by email, by telephone, or in person at our Cairo office. A
              booking is confirmed only after we have received the required deposit and sent you a written confirmation.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">2.2 Deposit and Final Payment</h3>
            <p>
              A non-refundable deposit of 25% of the total tour price is required to secure your booking. The remaining
              balance must be paid no later than 30 days before the tour start date. For bookings made within 30 days of
              the tour start date, full payment is required at the time of booking.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">2.3 Payment Methods</h3>
            <p>
              We accept payment by credit/debit card (Visa, Mastercard, American Express), PayPal, bank transfer, and
              cash (for in-person bookings at our Cairo office only). All prices are quoted in US Dollars (USD) unless
              otherwise specified.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">2.4 Price Guarantee</h3>
            <p>
              Once your booking is confirmed and deposit paid, the price of your tour is guaranteed and will not change,
              except in the case of government-imposed taxes or fees that were not in effect at the time of booking.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">3. Cancellation and Refund Policy</h2>
            <h3 className="text-xl font-bold mt-6 mb-3">3.1 Cancellation by Client</h3>
            <p>
              Cancellations must be made in writing (email or letter) and are subject to the following cancellation
              fees:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>60+ days before tour start date: Full refund minus deposit</li>
              <li>30-59 days before tour start date: 75% refund minus deposit</li>
              <li>15-29 days before tour start date: 50% refund minus deposit</li>
              <li>Less than 15 days before tour start date: No refund</li>
            </ul>
            <p>
              We strongly recommend purchasing comprehensive travel insurance to protect against unforeseen
              circumstances that may require cancellation.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">3.2 Cancellation by WanderLand Egypt</h3>
            <p>
              In the rare event that we must cancel a tour due to circumstances beyond our control (such as natural
              disasters, political instability, or insufficient participants for a group tour), you will be offered the
              choice of:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>A full refund of all payments made</li>
              <li>An alternative tour of equivalent or superior quality (if available)</li>
              <li>An alternative tour of lower quality with a price difference refund (if available)</li>
            </ul>
            <p>
              WanderLand Egypt is not responsible for any incidental expenses that you may have incurred as a result of
              your booking, such as visas, vaccinations, or non-refundable flights.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">4. Tour Changes and Modifications</h2>
            <h3 className="text-xl font-bold mt-6 mb-3">4.1 Changes by Client</h3>
            <p>
              If you wish to make changes to your confirmed booking, such as adding or removing participants or changing
              dates, please contact us as soon as possible. We will make reasonable efforts to accommodate your
              requests, but cannot guarantee that changes will be possible. A change fee of $50 USD may apply, in
              addition to any price differences resulting from the changes.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">4.2 Changes by WanderLand Egypt</h3>
            <p>
              While we make every effort to operate tours as advertised, we reserve the right to modify itineraries,
              accommodations, and services due to weather conditions, safety concerns, or other circumstances beyond our
              control. If significant changes are necessary before the tour begins, we will inform you as soon as
              possible and offer options similar to our cancellation policy.
            </p>
            <p>
              Minor changes to daily itineraries may occur during the tour itself. Our guides will always work to
              provide the best possible experience while ensuring your safety and comfort.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">5. Travel Documents and Requirements</h2>
            <h3 className="text-xl font-bold mt-6 mb-3">5.1 Passports and Visas</h3>
            <p>
              It is your responsibility to ensure that you have a valid passport (with at least 6 months validity beyond
              your return date) and the appropriate visas for Egypt and any other countries included in your itinerary.
              WanderLand Egypt can provide general information about visa requirements but is not responsible for any
              issues arising from inadequate travel documentation.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">5.2 Health Requirements</h3>
            <p>
              You are responsible for ensuring that you are physically and mentally fit for travel and for obtaining any
              required vaccinations or medications. We recommend consulting with a healthcare professional regarding
              health precautions for travel to Egypt.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">6. Insurance</h2>
            <p>
              We strongly recommend that all clients purchase comprehensive travel insurance that includes coverage for
              trip cancellation, medical emergencies, evacuation, and lost luggage. Proof of travel insurance may be
              required before the start of your tour.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">7. Liability and Responsibility</h2>
            <h3 className="text-xl font-bold mt-6 mb-3">7.1 Limitation of Liability</h3>
            <p>
              WanderLand Egypt acts as an intermediary between you and the various service providers (hotels,
              transportation companies, attractions, etc.). While we select these providers with care, we cannot be held
              responsible for any injury, damage, loss, accident, delay, or irregularity that may occur due to the
              actions or omissions of these third-party providers.
            </p>
            <p>
              Our liability for any claims arising from your tour is limited to the total amount paid to WanderLand Egypt
              for your booking. We are not liable for force majeure events, including but not limited to natural
              disasters, acts of government, civil unrest, or other circumstances beyond our reasonable control.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">7.2 Client Responsibility</h3>
            <p>
              You are responsible for your personal safety and the security of your belongings throughout the tour. You
              must comply with local laws and regulations, as well as the instructions of your tour guide regarding
              safety and conduct. WanderLand Egypt reserves the right to remove any participant whose conduct is deemed
              incompatible with the interests of the tour group, without refund.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">8. Privacy Policy</h2>
            <p>
              WanderLand Egypt collects and processes personal information in accordance with our{" "}
              <Link href="/privacy-policy" className="text-egyptian-gold hover:underline">
                Privacy Policy
              </Link>
              . By booking with us, you consent to the collection and processing of your personal information as
              described in that policy.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">9. Governing Law and Jurisdiction</h2>
            <p>
              These Terms and Conditions are governed by the laws of Egypt. Any disputes arising from these terms or
              your booking shall be subject to the exclusive jurisdiction of the courts of Cairo, Egypt.
            </p>

            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">10. Contact Information</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us:</p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              <li>
                <strong>WanderLand Egypt</strong>
              </li>
              <li>123 Tahrir Square, Cairo, Egypt</li>
              <li>Phone: +20 123 456 7890</li>
              <li>Email: info@WanderLand Egypt.com</li>
            </ul>

            <EgyptianDivider className="my-8" />

            <p className="text-center text-muted-foreground">
              By booking a tour with WanderLand Egypt, you acknowledge that you have read, understood, and agree to these
              Terms and Conditions.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
              <Link href="/contact">Contact Us With Questions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

