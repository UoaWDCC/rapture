"use client";

import React, { useState, useEffect } from 'react';

type itemC = {
    id:number;
    image:string;
    heading:string;
    text:string;
}

type CarouselProps = {
    items:itemC[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
}

export default function Carousel({items, autoSlide = true, autoSlideInterval = 3000}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1));
            }, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, [autoSlide, autoSlideInterval])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

  return (
    <div className="relative w-100000 h-full max-w-3xl mx-auto">
        <div className="overflow-hidden relative h-64">
            {items.map((item, index) => (
                <div
                key={item.id}
                className={`absolute inset-0 transition-transfrom ${
                    index === currentIndex ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <img src={item.image} alt={`Slide ${item.id}`} className="w-full h-full object-cover" />
                    <h1>{item.heading}</h1>
                    <p>{item.text}</p>
                </div>
            ))}
        </div>

        {/* Controls - simple buttons */}
        <button className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer" onClick={prevSlide}>Prev</button>
        <button className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer" onClick={nextSlide}>Next</button>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}