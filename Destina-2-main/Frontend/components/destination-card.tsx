import Image from "next/image"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Heart, Star } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useState } from "react"

type DestinationCardProps = {
    title: string,
    badge: string,
    rate: number,
    location: string,
    image?: string,
    price: number

}

export const DestinationCard = (props: DestinationCardProps) => {
    return (
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-80 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-2 border-slate-300 flex items-center justify-center">
                        {props.image ? <Image src={props.image} alt={props.title} width={100} height={100} /> : <svg
                            className="w-16 h-16 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>}

                    </div>
                </div>

                <Badge className="absolute top-4 left-4 bg-white text-slate-900 hover:bg-white shadow-lg font-semibold px-3 py-1">
                    {props.badge}
                </Badge>

                <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-4 right-4 bg-white hover:bg-white shadow-lg rounded-full transition-all text-slate-700`}
                >
                    <Heart
                        className="h-5 w-5"
                    />
                </Button>
            </div>

            <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-1.5">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-lg">{props.rate}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                    {props.title}
                </h3>

                <p className="text-slate-600 text-lg">{props.location}</p>

                <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">${props.price}</span>
                    <span className="text-slate-600">/ noche</span>
                </div>
            </CardContent>
        </Card>
    )
}