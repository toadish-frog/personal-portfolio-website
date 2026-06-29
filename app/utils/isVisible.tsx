'use client'

import { useEffect, useState, RefObject } from "react";

export function useIsVisible(ref: RefObject<Element | null>) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting);
        });

        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [ref]);
    return isIntersecting;
}
