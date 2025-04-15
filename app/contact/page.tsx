import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import EgyptianDivider from "@/components/egyptian-divider";

export const metadata = {
  title: "Contact Us - Egydise Tours",
  description:
    "Get in touch with Egydise Tours to plan your Egyptian adventure or ask any questions about our tours and services.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Egyptian landscape"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/80 mb-6">
              Have questions or ready to plan your Egyptian adventure? We're
              here to help.
            </p>
            <EgyptianDivider className="my-6 bg-white/50" />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you're ready to book a tour, have questions about our
              services, or need assistance with an existing booking, our team is
              here to help. Fill out the form below, and we'll get back to you
              as soon as possible.
            </p>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="last-name" placeholder="Your last name" required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inquiry-type">
                  Inquiry Type <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger id="inquiry-type">
                    <SelectValue placeholder="Select an inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="booking">New Booking</SelectItem>
                    <SelectItem value="existing">Existing Booking</SelectItem>
                    <SelectItem value="custom">Custom Tour Request</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Please provide details about your inquiry or tour preferences"
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="privacy" />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="privacy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-egyptian-gold hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and consent to Egydise Tours processing my data.
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black"
              >
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <div className="bg-muted rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="h-5 w-5 text-egyptian-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Our Office</h4>
                    <p className="text-muted-foreground">
                      123 Tahrir Square, Cairo, Egypt
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="h-5 w-5 text-egyptian-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <p className="text-muted-foreground">+20 123 456 7890</p>
                    <p className="text-muted-foreground">
                      +20 098 765 4321 (WhatsApp)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="h-5 w-5 text-egyptian-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      info@egydise-tours.com
                    </p>
                    <p className="text-muted-foreground">
                      bookings@egydise-tours.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="h-5 w-5 text-egyptian-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Office Hours</h4>
                    <p className="text-muted-foreground">
                      Sunday - Thursday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-muted-foreground">
                      Friday - Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-muted-foreground">(Egypt Time, GMT+2)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-bold mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <Link
                    href="https://facebook.com"
                    className="h-10 w-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-egyptian-gold/20 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    className="h-10 w-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-egyptian-gold/20 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    className="h-10 w-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-egyptian-gold/20 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://youtube.com"
                    className="h-10 w-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-egyptian-gold/20 transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-[400px] relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Map of our Cairo office location"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <p className="font-bold">Egydise Tours Office</p>
                  <p className="text-sm text-muted-foreground">
                    123 Tahrir Square, Cairo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find quick answers to common questions about our tours and
              services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="!bg-muted rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                How far in advance should I book my tour?
              </h3>
              <p className="text-muted-foreground">
                We recommend booking at least 2-3 months in advance, especially
                during peak season (October to April). For travel during
                holidays or specialized tours, 4-6 months advance booking is
                advisable.
              </p>
            </div>

            <div className="!bg-muted rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                Do I need a visa to visit Egypt?
              </h3>
              <p className="text-muted-foreground">
                Most visitors need a visa to enter Egypt. Many nationalities can
                obtain a visa on arrival or apply for an e-visa online before
                travel. We can provide guidance based on your nationality.
              </p>
            </div>

            <div className="!bg-muted rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                What's included in your tour packages?
              </h3>
              <p className="text-muted-foreground">
                Our standard packages include accommodation, transportation
                within Egypt, daily breakfast, entrance fees, expert guides, and
                airport transfers. Specific inclusions are listed in each tour
                description.
              </p>
            </div>

            <div className="!bg-muted rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                Can you arrange custom or private tours?
              </h3>
              <p className="text-muted-foreground">
                Yes, we specialize in creating customized itineraries tailored
                to your interests, timeframe, and budget. Contact us with your
                preferences, and we'll design your perfect Egyptian adventure.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10"
            >
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
