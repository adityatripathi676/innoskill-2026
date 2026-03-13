"use client";
import { useState, useCallback } from "react"

/**
 * A custom hook for managing multi-step forms with smooth transitions.
 * @param {Array} steps - An array containing the steps of the form as react components
 * @returns {Object} An object containing functions and state variables for managing the form.
 */
export const useMultiForm = (steps: React.ReactNode[]) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

    const smoothScroll = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    function next() {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setDirection('forward');
        
        setTimeout(() => {
            smoothScroll();
            setCurrentStepIndex(i => {
                if (i >= steps.length - 1) return i
                return i + 1
            });
            setIsTransitioning(false);
        }, 150);
    }

    function back() {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setDirection('backward');
        
        setTimeout(() => {
            smoothScroll();
            setCurrentStepIndex(i => {
                if (i <= 0) return i
                return i - 1
            });
            setIsTransitioning(false);
        }, 150);
    }

    /**
     * - Goes to the inputted step of the form
     * @param {*} index 
     */
    function goTo(index: number) {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setDirection(index > currentStepIndex ? 'forward' : 'backward');
        
        setTimeout(() => {
            smoothScroll();
            setCurrentStepIndex(index);
            setIsTransitioning(false);
        }, 150);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        goTo,
        FirstStep: currentStepIndex === 0,
        LastStep: currentStepIndex === steps.length - 1,
        next, back,
        steps,
        isTransitioning,
        direction,
    }
}   