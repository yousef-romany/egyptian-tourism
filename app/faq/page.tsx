import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Search } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"

export const metadata = {
  title: "Frequently Asked Questions - Egydise Tours",
  description: "Find answers to common questions about traveling in Egypt, our tours, booking process, and more.",
}

export default function FAQPage() {
  const faqCategories = {
    general: [
      {
        question: "What makes Egydise Tours different from other tour companies?",
        answer:
          "Egydise Tours stands out for our expert Egyptologist guides, personalized service, and authentic experiences. We focus exclusively on Egypt, allowing us to provide deeper insights and connections. Our guides are certified Egyptologists with extensive knowledge of history, archaeology, and culture. We also maintain small group sizes to ensure a more intimate experience and customize itineraries based on your interests.",
      },
      {
        question: "How large are your tour groups?",
        answer:
          "Our standard group tours typically have 8-15 participants, allowing for a personalized experience while maintaining an engaging social dynamic. We also offer private tours for those who prefer an exclusive experience, and can accommodate larger groups for family reunions or special events upon request.",
      },
      {
        question: "Do you offer customized or private tours?",
        answer:
          "Yes, we specialize in creating customized itineraries tailored to your specific interests, timeframe, and budget. Our private tours give you the flexibility to travel at your own pace with dedicated guides and vehicles. Contact our team to start planning your personalized Egyptian adventure.",
      },
      {
        question: "What languages do your guides speak?",
        answer:
          "All our guides speak fluent English. We also have guides available who speak French, Spanish, German, Italian, Russian, Chinese, Japanese, and Arabic. Please specify your language preference when booking, and we'll do our best to accommodate your needs.",
      },
      {
        question: "Is Egypt safe for tourists?",
        answer:
          "Yes, tourist areas in Egypt are generally very safe and well-protected. The Egyptian government places a high priority on tourism safety, with dedicated tourist police at all major sites. As with travel to any destination, we recommend standard precautions like being aware of your surroundings and safeguarding your valuables. Our guides are always available to provide advice and assistance throughout your journey.",
      },
    ],
    booking: [
      {
        question: "How far in advance should I book my tour?",
        answer:
          "We recommend booking at least 2-3 months in advance, especially during the peak season (October to April). For travel during holidays or for specialized tours, 4-6 months advance booking is advisable. Last-minute bookings are sometimes possible, but availability may be limited, particularly for preferred accommodations and specific guides.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and cash payments at our office in Cairo. For tour bookings, we typically require a 25% deposit to secure your reservation, with the balance due 30 days before your tour begins.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Our standard cancellation policy is as follows: Full refund for cancellations made 60+ days before the tour start date; 75% refund for cancellations 30-59 days before; 50% refund for cancellations 15-29 days before; and no refund for cancellations less than 15 days before the tour start date. We strongly recommend purchasing travel insurance to protect against unexpected cancellations.",
      },
      {
        question: "Do you offer travel insurance?",
        answer:
          "We don't sell travel insurance directly, but we strongly recommend purchasing comprehensive travel insurance that covers trip cancellation, medical emergencies, evacuation, and lost luggage. We can suggest reputable insurance providers that offer good coverage for Egypt if needed.",
      },
      {
        question: "Can I make changes to my booking after confirmation?",
        answer:
          "Yes, we understand that plans can change. We'll do our best to accommodate modifications to your itinerary, though changes made less than 30 days before departure may incur additional fees. Please contact us as soon as possible if you need to make any changes to your booking.",
      },
    ],
    travel: [
      {
        question: "Do I need a visa to visit Egypt?",
        answer:
          "Most visitors need a visa to enter Egypt. Many nationalities can obtain a visa on arrival at Egyptian airports for approximately $25 USD, or apply for an e-visa online before travel. Some nationalities require a visa obtained in advance from an Egyptian embassy or consulate. We can provide guidance based on your nationality and help with the visa process if needed.",
      },
      {
        question: "What is the best time of year to visit Egypt?",
        answer:
          "The most comfortable time to visit Egypt is from October to April when temperatures are milder. December and January are peak tourist months. Summer (May to September) can be very hot, especially in Upper Egypt (Luxor and Aswan), but offers fewer crowds and lower prices. Ramadan dates vary each year and may affect opening hours of some establishments, though tourist sites remain open.",
      },
      {
        question: "What should I pack for my trip to Egypt?",
        answer:
          "We recommend lightweight, modest clothing that covers shoulders and knees (especially for visiting religious sites), comfortable walking shoes, a hat, sunglasses, sunscreen, and a light jacket for evenings. In winter (December-February), bring warmer layers for cooler evenings. A small daypack, reusable water bottle, and camera are also useful. A detailed packing list is provided after booking.",
      },
      {
        question: "Is it safe to drink tap water in Egypt?",
        answer:
          "We don't recommend drinking tap water in Egypt. Bottled water is widely available and provided during our tours. Use bottled water for brushing teeth as well. Ice in established restaurants and hotels is generally safe as it's made from purified water.",
      },
      {
        question: "What currency is used in Egypt and should I bring cash?",
        answer:
          "The Egyptian Pound (EGP) is the local currency. While credit cards are accepted at most hotels, restaurants, and larger shops, it's advisable to carry some cash for smaller establishments, markets, and tips. ATMs are widely available in cities and tourist areas. We recommend bringing some US dollars or Euros to exchange upon arrival.",
      },
    ],
    tours: [
      {
        question: "What's included in your tour packages?",
        answer:
          "Our standard tour packages typically include accommodation, transportation within Egypt (including domestic flights where applicable), daily breakfast and selected meals, entrance fees to attractions, expert Egyptologist guides, airport transfers, and bottled water during tours. Specific inclusions vary by tour and are clearly listed in each tour description.",
      },
      {
        question: "Are entrance fees to attractions included in the tour price?",
        answer:
          "Yes, entrance fees to all attractions mentioned in the itinerary are included in our tour prices. However, optional activities or special exhibitions may have additional costs, which will be clearly communicated to you.",
      },
      {
        question: "Do your tours include airfare to/from Egypt?",
        answer:
          "Our standard tour packages do not include international airfare to/from Egypt, allowing you flexibility in your travel arrangements. However, we can assist with booking international flights if requested. Domestic flights within Egypt (such as Cairo to Luxor or Aswan) are included in tour packages where applicable.",
      },
      {
        question: "What type of accommodations do you use?",
        answer:
          "We primarily work with 4-star and 5-star hotels that meet our quality standards for comfort, cleanliness, service, and location. On Nile cruises, we use 5-star vessels with comfortable cabins and amenities. We can accommodate requests for specific hotels or upgrade options when available.",
      },
      {
        question: "Can you accommodate dietary restrictions or food allergies?",
        answer:
          "Yes, we can accommodate various dietary needs including vegetarian, vegan, gluten-free, and halal options. Please inform us of any dietary restrictions or allergies when booking so we can make appropriate arrangements with restaurants and hotels in advance.",
      },
    ],
    practical: [
      {
        question: "What is the tipping culture in Egypt?",
        answer:
          "Tipping (known as 'baksheesh') is an important part of Egyptian culture. It's customary to tip guides, drivers, hotel staff, restaurant servers, and others who provide services. We provide tipping guidelines in our pre-departure information. For convenience, some of our tours offer a tipping package that covers standard tips throughout your journey.",
      },
      {
        question: "Is Wi-Fi widely available in Egypt?",
        answer:
          "Wi-Fi is available in most hotels, restaurants, and cafes in major cities and tourist areas, though connection speeds may vary. For continuous connectivity, we recommend purchasing a local SIM card with a data package upon arrival, which is inexpensive and provides good coverage throughout most of Egypt.",
      },
      {
        question: "What type of electrical outlets are used in Egypt?",
        answer:
          "Egypt uses the European-style two-pin round plugs (Type C) with 220V electricity. We recommend bringing a universal adapter if your devices use different plugs. Some higher-end hotels may have outlets that accommodate multiple plug types.",
      },
      {
        question: "What are appropriate clothing guidelines for Egypt?",
        answer:
          "Egypt is a conservative country, and modest dress is appreciated, especially in non-tourist areas. For both men and women, clothing that covers shoulders and knees is recommended, particularly when visiting religious sites. In tourist resorts like Hurghada and Sharm El Sheikh, more casual beachwear is acceptable in resort areas. Women are not required to cover their hair except when visiting active mosques.",
      },
      {
        question: "Are there any photography restrictions at Egyptian sites?",
        answer:
          "Photography is generally permitted at most tourist sites, though some museums and tombs prohibit photography or charge an additional camera fee. Flash photography is often restricted to protect ancient paintings and artifacts. Your guide will advise you about specific restrictions at each site. Always ask permission before photographing local people, especially in rural areas.",
      },
    ],
  }

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
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-white/80 mb-6">
              Find answers to common questions about traveling in Egypt and our tours.
            </p>
            <EgyptianDivider className="my-6 bg-white/50" />
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full h-12 pl-12 pr-4 rounded-md border border-egyptian-gold/30 focus:border-egyptian-gold focus:outline-none"
            />
          </div>
        </div>

        <Tabs defaultValue="general" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
              <TabsTrigger value="tours">Tours</TabsTrigger>
              <TabsTrigger value="practical">Practical</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(faqCategories).map(([category, questions]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {questions.map((faq, index) => (
                <Card key={index} className="border-egyptian-gold/20">
                  <CardContent className="p-0">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between p-6">
                        <h3 className="font-medium text-lg">{faq.question}</h3>
                        <ChevronRight className="h-5 w-5 text-egyptian-gold transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="p-6 pt-0 text-muted-foreground">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              If you couldn't find the answer to your question, our team is here to help. Contact us and we'll get back
              to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10"
              >
                <Link href="mailto:info@egydise-tours.com">Email Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-egyptian-gold/20">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-egyptian-gold"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">
                Chat with our customer service team in real-time for immediate assistance with your questions.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10"
              >
                <Link href="#">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-egyptian-gold/20">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-egyptian-gold"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-4">
                Speak directly with our travel experts who can answer your questions and help plan your trip.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10"
              >
                <Link href="tel:+201234567890">+20 123 456 7890</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-egyptian-gold/20">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-egyptian-gold"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-4">
                Send us an email with your questions or concerns, and we'll respond within 24 hours.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10"
              >
                <Link href="mailto:info@egydise-tours.com">info@egydise-tours.com</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}

