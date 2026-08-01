"use client";

import React, { useState, useEffect, useRef } from 'react';
import { threadId } from 'worker_threads';

type carouselProps = {
    items:React.ReactNode[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
    className?:string;
}

export default function Carousel(props: carouselProps) {
    const {autoSlide = true, autoSlideInterval = 5000} = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = React.Children.toArray(props.items);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        slideRefs.current.forEach((slide, index) => {
            if (!slide) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setCurrentIndex(index);
                    }
                },
                {
                    root: carouselRef.current,
                    threshold: 0.5,
                }
            );

            observer.observe(slide);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % props.items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + props.items.length) % props.items.length);
    };

    return (
        <div
            className={`relative h-full mx-auto ${props.className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div ref={carouselRef} className="flex h-full overflow-y-auto overflow-x-auto snap-x snap-mandatory scrollbar-none">
                {slides.map((slide, index) => (
                    <div key={index} ref={(el) => {slideRefs.current[index] = el}} className={`w-full snap-center shrink-0 overflow-hidden`}>
                        {slide} {/*any component won't automatically be contained within this div and any overflow will just be hidden*/}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
            {slides.map((_, index) => (
                <button
                    key={index}
                    type='button'
                    className={`w-2 h-2 rounded-full mx-1 hover:cursor-pointer hover:bg-gray-600 ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
                    onClick={() => setCurrentIndex(index)}
                />
            ))}
            </div>
        </div>
    );
}