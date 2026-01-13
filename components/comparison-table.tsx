import { Tour } from "@/lib/api/strapi"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Star, MapPin, Clock, Users, DollarSign } from "lucide-react"
import Image from "next/image"
import { getMediaUrl } from "@/lib/api/strapi"
import Link from "next/link"

interface ComparisonTableProps {
  tours: Tour[]
}

export function ComparisonTable({ tours }: ComparisonTableProps) {
  const comparisonFields = [
    {
      key: 'price',
      label: 'Price',
      icon: DollarSign,
      render: (tour: Tour) => (
        <div className="text-xl font-bold text-egyptian-gold">
          {tour.priceDisplay || `$${tour.price}`}
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Duration',
      icon: Clock,
      render: (tour: Tour) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{tour.duration}</span>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location',
      icon: MapPin,
      render: (tour: Tour) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{tour.location}</span>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      icon: null,
      render: (tour: Tour) => (
        <Badge variant="secondary">{tour.category}</Badge>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      icon: Star,
      render: (tour: Tour) => (
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{tour.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({tour.reviews} reviews)
          </span>
        </div>
      )
    },
    {
      key: 'groupSize',
      label: 'Group Size',
      icon: Users,
      render: (tour: Tour) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{tour.groupSize || 'Flexible'}</span>
        </div>
      )
    },
    {
      key: 'highlights',
      label: 'Highlights',
      icon: null,
      render: (tour: Tour) => (
        <ul className="space-y-2">
          {tour.highlights?.slice(0, 5).map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      key: 'included',
      label: 'What\'s Included',
      icon: null,
      render: (tour: Tour) => (
        <ul className="space-y-2">
          {tour.included?.slice(0, 5).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    }
  ]

  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No tours to compare.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-6">
        {tours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={getMediaUrl(tour.image)}
                alt={tour.title}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-egyptian-gold text-white">
                {tour.priceDisplay || `$${tour.price}`}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-4">{tour.title}</h3>
              <div className="space-y-3">
                {comparisonFields.map((field) => (
                  <div key={field.key} className="border-b pb-3 last:border-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      {field.icon && <field.icon className="h-4 w-4" />}
                      <span className="font-medium">{field.label}</span>
                    </div>
                    <div>{field.render(tour)}</div>
                  </div>
                ))}
              </div>
              <Link href={`/tours/${tour.slug}`}>
                <button className="w-full mt-4 bg-egyptian-gold hover:bg-egyptian-gold-dark text-white py-2 px-4 rounded-md font-semibold transition-colors">
                  View Tour
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left font-semibold bg-muted min-w-[150px] sticky left-0">
                Feature
              </th>
              {tours.map((tour) => (
                <th key={tour.id} className="p-4 min-w-[280px]">
                  <Card className="overflow-hidden border-2 border-egyptian-gold/20">
                    <div className="relative h-48">
                      <Image
                        src={getMediaUrl(tour.image)}
                        alt={tour.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{tour.title}</h3>
                      <Badge className="bg-egyptian-gold text-white">
                        {tour.priceDisplay || `$${tour.price}`}
                      </Badge>
                      <Link href={`/tours/${tour.slug}`}>
                        <button className="w-full mt-3 bg-egyptian-gold hover:bg-egyptian-gold-dark text-white py-2 px-4 rounded-md font-semibold transition-colors text-sm">
                          View Details
                        </button>
                      </Link>
                    </CardContent>
                  </Card>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFields.map((field) => (
              <tr key={field.key} className="border-t">
                <td className="p-4 font-semibold bg-muted sticky left-0">
                  <div className="flex items-center gap-2">
                    {field.icon && <field.icon className="h-4 w-4" />}
                    <span>{field.label}</span>
                  </div>
                </td>
                {tours.map((tour) => (
                  <td key={tour.id} className="p-4 align-top">
                    {field.render(tour)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
