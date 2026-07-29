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

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % props.items.length);
            }, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, [autoSlide, autoSlideInterval, props.items.length])

    useEffect (() => {
        carouselRef.current?.children[currentIndex]?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block:"nearest",
        })
    }, [currentIndex])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % props.items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + props.items.length) % props.items.length);
    };

    const slides = React.Children.toArray(props.items);
    return (
        <div className={`relative h-full mx-auto ${props.className}`}>
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