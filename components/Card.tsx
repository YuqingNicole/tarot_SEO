"use client";

import { useState } from "react";
import { TarotCard } from "@/lib/types";
import { getSingleCardReading } from "@/services/geminiService";

interface CardProps {
    card: TarotCard;
    // Controlled mode props (for wheel/spread)
    style?: React.CSSProperties;
    onClick?: () => void;
    className?: string;
    // Self-controlled mode
    interactive?: boolean;
    showReading?: boolean;
}

export default function Card({
    card,
    style,
    onClick,
    className = "",
    interactive = false,
    showReading = false,
}: CardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [reading, setReading] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        if (onClick) {
            onClick();
            return;
        }

        if (interactive) {
            setIsFlipped(!isFlipped);

            if (showReading && !reading && !isFlipped) {
                setIsLoading(true);
                try {
                    const aiReading = await getSingleCardReading(card);
                    setReading(aiReading.meaning);
                } catch (error) {
                    console.error("Error fetching reading:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
    };

    const cardClasses = `
    relative w-full h-full cursor-pointer
    transition-transform duration-700 transform-style-3d
    ${isFlipped ? "rotate-y-180" : ""}
    ${className}
  `;

    return (
        <div
            className={cardClasses}
            style={style}
            onClick={handleClick}
        >
            {/* Card Back */}
            <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-xl">
                <div className="w-full h-full bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex flex-col items-center justify-center p-4">
                    <div className="text-6xl mb-4">🔮</div>
                    <div className="text-center text-white">
                        <div className="text-base font-bold mb-1">{card.name}</div>
                        {card.arcana === "major" && (
                            <div className="text-xs opacity-80">Major Arcana</div>
                        )}
                        {card.arcana === "minor" && card.suit && (
                            <div className="text-xs opacity-80 capitalize">{card.suit}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Card Front */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-800">
                <div className="w-full h-full p-4 flex flex-col">
                    {/* Card Image */}
                    <div className="flex-1 relative rounded-lg overflow-hidden mb-3">
                        <img
                            src={card.image_path}
                            alt={card.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Card Name - Always Visible */}
                    <div className="text-center">
                        <h3 className="font-bold text-base mb-1 line-clamp-2">{card.name}</h3>
                        {card.isReversed && (
                            <span className="text-xs text-red-600 dark:text-red-400">
                                (Reversed)
                            </span>
                        )}
                    </div>

                    {/* Reading (if available) */}
                    {showReading && reading && (
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
                            {reading}
                        </div>
                    )}

                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="mt-2 text-xs text-purple-600 animate-pulse">
                            Reading the cards...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
