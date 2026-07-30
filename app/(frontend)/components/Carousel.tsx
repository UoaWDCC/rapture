"use client";

import React, { useState, useEffect, useRef } from 'react';

type carouselProps = {
    isImageCarousel:false;
    items:React.ReactNode[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
    className?:string;
}

export default function Carousel(props: carouselProps) {
    const {autoSlide = true, autoSlideInterval = 5000} = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (autoSlide && !isPaused && isVisible) {
            const slideInterval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % props.items.length);
            }, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, [autoSlide, autoSlideInterval, props.items.length, isPaused, isVisible])

    useEffect (() => {
        carouselRef.current?.children[currentIndex]?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block:"nearest",
        })
    }, [currentIndex])

    useEffect(() => {
        const element = carouselRef.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.5, // visible when 50% of carousel is on screen
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % props.items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + props.items.length) % props.items.length);
    };

    const slides = React.Children.toArray(props.items);
    return (
        <div
            className={`relative h-full mx-auto ${props.className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none">
                {slides.map((slide, index) => (
                    <button key={index} className={`w-full snap-center shrink-0`}>
                        {slide}
                    </button>
                ))}
            </div>
        </div>
    );
}