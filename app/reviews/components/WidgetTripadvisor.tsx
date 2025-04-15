"use client";
import { ExternalLink, Star } from "lucide-react";
import { memo } from "react";

interface TravelCard {
  imageUrl: string;
  title: string;
  rating: number;
  reviewCount: number;
  tripadvisorUrl: string;
}

const travelData: TravelCard[] = [
  {
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/13/bd/e6/21.jpg",
    title: "Sunrise Hot Air Balloon Ride in Luxor",
    rating: 5,
    reviewCount: 12,
    tripadvisorUrl:
      "https://www.tripadvisor.com/UserReviewEdit-g294205-d28634817-Sunrise_Hot_Air_Balloon_Ride_in_Luxor-Luxor_Nile_River_Valley.html",
  },

  {
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/73/e2/40.jpg",
    title: "Ultimate Luxor Experience: East & West Banks Tour",
    rating: 5,
    reviewCount: 10,
    tripadvisorUrl:
      "https://www.tripadvisor.com/UserReviewEdit-g294205-d28137743-Ultimate_Luxor_Experience_East_West_Banks_Tour-Luxor_Nile_River_Valley.html",
  },
  {
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/73/9c/f8.jpg",
    title: "Luxor to Abu Simbel Private Tour with Tickets & VIP Access",
    rating: 5,
    reviewCount: 15,
    tripadvisorUrl:
      "https://www.tripadvisor.com/UserReviewEdit-g294205-d28211353-Luxor_to_Abu_Simbel_Private_Tour_with_Tickets_VIP_Access-Luxor_Nile_River_Valley.html",
  },
  {
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/73/e1/a3.jpg",
    title: "Ultimate Luxor Tour: Explore East & West Bank with Tickets&Guide",
    rating: 5,
    reviewCount: 15,
    tripadvisorUrl:
      "https://www.tripadvisor.com/UserReviewEdit-g294205-d28556072-Ultimate_Luxor_Tour_Explore_East_West_Bank_with_Tickets_Guide-Luxor_Nile_River_Valley.html",
  },
];

const WidgetTripadvisor = () => {
  return (
    <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 container py-8">
      {travelData.map((card, index) => (
        <a
          key={index}
          href={card.tripadvisorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {card.title}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(card.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({card.reviewCount} reviews)
                </span>
              </div>
              <ExternalLink
                size={20}
                className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300"
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
export default memo(WidgetTripadvisor);
