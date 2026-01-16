/**
 * Example: Homepage with Translations
 * 
 * This file demonstrates how to integrate translations into the homepage component.
 * Copy the relevant sections to your actual page.tsx file.
 */

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button"
import { Star, ChevronRight, Users, HeartHandshake, Shield } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function HomePageExample() {
    // Get translation functions for different sections
    const tHomepage = useTranslations('Homepage');
    const tNav = useTranslations('Navigation');

    return (
        <div className="flex min-h-screen flex-col">

            {/* Reviews Section - TRANSLATED */}
            <section className="container py-20">
                <div className="mx-auto flex max-w-[68rem] flex-col items-center justify-center gap-6 text-center mb-16">
                    <Badge className="bg-gradient-to-r from-egyptian-gold/10 to-egyptian-gold/5">
                        <Star className="h-4 w-4 mr-2 inline fill-egyptian-gold" />
                        {tHomepage('reviews.badge')}
                    </Badge>

                    <h2 className="font-heading text-4xl font-extrabold sm:text-5xl md:text-6xl">
                        {tHomepage('reviews.title')}
                    </h2>

                    <p className="max-w-[90%] text-lg text-muted-foreground sm:text-xl">
                        {tHomepage('reviews.subtitle')}
                    </p>
                </div>

                {/* Reviews content here */}

                <div className="mt-16 flex justify-center">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/reviews">
                            {tHomepage('reviews.viewAll')}
                            <ChevronRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Tours Section - TRANSLATED */}
            <section className="bg-muted py-20">
                <div className="container">
                    <div className="mx-auto flex max-w-[68rem] flex-col items-center justify-center gap-6 text-center">
                        <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark">
                            {tHomepage('tours.badge')}
                        </Badge>

                        <h2 className="font-heading text-4xl font-extrabold sm:text-5xl md:text-6xl">
                            {tHomepage('tours.title')}
                        </h2>

                        <p className="max-w-[90%] text-lg text-muted-foreground sm:text-xl">
                            {tHomepage('tours.subtitle')}
                        </p>
                    </div>

                    {/* Tour carousel here */}

                    <div className="flex justify-center mt-16">
                        <Button asChild size="lg">
                            <Link href="/tours" className="inline-flex items-center gap-2">
                                {tHomepage('tours.viewAll')}
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section - TRANSLATED */}
            <section className="container py-20">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <div>
                        <Badge className="mb-6">
                            {tHomepage('whyChooseUs.badge')}
                        </Badge>

                        <h2 className="font-heading text-4xl font-extrabold sm:text-5xl md:text-6xl mb-8">
                            {tHomepage('whyChooseUs.title')}
                        </h2>

                        <div className="grid gap-6">
                            {/* Expert Guides */}
                            <div className="flex gap-5 group p-6 rounded-2xl bg-muted/30">
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center">
                                    <Users className="h-8 w-8 text-black" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">
                                        {tHomepage('whyChooseUs.expertGuides.title')}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">
                                        {tHomepage('whyChooseUs.expertGuides.description')}
                                    </p>
                                </div>
                            </div>

                            {/* Customized Itineraries */}
                            <div className="flex gap-5 group p-6 rounded-2xl bg-muted/30">
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center">
                                    <HeartHandshake className="h-8 w-8 text-black" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">
                                        {tHomepage('whyChooseUs.customized.title')}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">
                                        {tHomepage('whyChooseUs.customized.description')}
                                    </p>
                                </div>
                            </div>

                            {/* 5-Star Experiences */}
                            <div className="flex gap-5 group p-6 rounded-2xl bg-muted/30">
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center">
                                    <Star className="h-8 w-8 text-black fill-black" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">
                                        {tHomepage('whyChooseUs.fiveStars.title')}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">
                                        {tHomepage('whyChooseUs.fiveStars.description')}
                                    </p>
                                </div>
                            </div>

                            {/* Safety & Comfort */}
                            <div className="flex gap-5 group p-6 rounded-2xl bg-muted/30">
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center">
                                    <Shield className="h-8 w-8 text-black" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">
                                        {tHomepage('whyChooseUs.safety.title')}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">
                                        {tHomepage('whyChooseUs.safety.description')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button asChild size="lg" className="mt-12">
                            <Link href="/about">
                                {tHomepage('whyChooseUs.learnMore')}
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>

                    <div className="relative">
                        {/* Image and stats card here */}
                        <p className="text-sm text-muted-foreground">
                            {tHomepage('whyChooseUs.statsRating')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA Section - TRANSLATED */}
            <section className="bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-20">
                <div className="container text-center">
                    <Badge className="mb-8">
                        {tHomepage('cta.badge')}
                    </Badge>

                    <h2 className="font-heading text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                        {tHomepage('cta.title')}
                    </h2>

                    <p className="mx-auto max-w-[56rem] text-white/90 mb-12 text-lg sm:text-xl">
                        {tHomepage('cta.subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <Button asChild variant="default" size="lg">
                            <Link href="/tours" className="inline-flex items-center gap-2">
                                {tHomepage('cta.browseTours')}
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </Button>

                        <Button asChild variant="outline" size="lg">
                            <Link href="/contact">
                                {tHomepage('cta.contactUs')}
                            </Link>
                        </Button>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-12 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <Shield className="h-6 w-6 text-egyptian-gold" />
                            <div className="text-left">
                                <div className="font-bold text-sm">{tHomepage('cta.safeSecure')}</div>
                                <div className="text-xs">{tHomepage('cta.protected')}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Star className="h-6 w-6 text-egyptian-gold fill-egyptian-gold" />
                            <div className="text-left">
                                <div className="font-bold text-sm">{tHomepage('cta.rating')}</div>
                                <div className="text-xs">{tHomepage('cta.reviewCount')}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-left">
                                <div className="font-bold text-sm">{tHomepage('cta.awardWinning')}</div>
                                <div className="text-xs">{tHomepage('cta.yearsExperience')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
