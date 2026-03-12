"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
    options: UseScrollRevealOptions = {}
) {
    const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", once = true } = options;
    const ref = useRef<T>(null);
    // Start as true to avoid flash of invisible content
    const [isRevealed, setIsRevealed] = useState(true);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check if element is already in viewport on mount
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            // Already in view - keep revealed, mark as animated
            setIsRevealed(true);
            setHasAnimated(true);
            return;
        }

        // Not in view - start hidden and observe
        setIsRevealed(false);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    setHasAnimated(true);
                    if (once) {
                        observer.unobserve(element);
                    }
                } else if (!once) {
                    setIsRevealed(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, isRevealed, hasAnimated };
}

// Hook for staggered children animations
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
    options: UseScrollRevealOptions = {}
) {
    const { threshold = 0.1, rootMargin = "0px 0px -30px 0px", once = true } = options;
    const ref = useRef<T>(null);
    const [isRevealed, setIsRevealed] = useState(true);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check if element is already in viewport on mount
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            setIsRevealed(true);
            return;
        }

        // Not in view - start hidden and observe
        setIsRevealed(false);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    if (once) {
                        observer.unobserve(element);
                    }
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, isRevealed };
}

// Component wrapper for scroll reveal
export function ScrollReveal({
    children,
    className = "",
    animation = "up",
    delay = 0,
    ...options
}: {
    children: React.ReactNode;
    className?: string;
    animation?: "up" | "left" | "right" | "scale";
    delay?: number;
} & UseScrollRevealOptions) {
    const { ref, isRevealed } = useScrollReveal(options);
    
    const animationClass = {
        up: "reveal-on-scroll",
        left: "reveal-left",
        right: "reveal-right",
        scale: "reveal-scale",
    }[animation];

    return (
        <div
            ref={ref}
            className={`${animationClass} ${isRevealed ? "revealed" : ""} ${className}`}
            style={{ animationDelay: delay ? `${delay}ms` : undefined }}
        >
            {children}
        </div>
    );
}

// Stagger container component
export function StaggerContainer({
    children,
    className = "",
    ...options
}: {
    children: React.ReactNode;
    className?: string;
} & UseScrollRevealOptions) {
    const { ref, isRevealed } = useStaggerReveal(options);

    return (
        <div
            ref={ref}
            className={`stagger-children ${isRevealed ? "revealed" : ""} ${className}`}
        >
            {children}
        </div>
    );
}
