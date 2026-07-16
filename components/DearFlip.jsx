'use client'

import { useEffect, useState } from "react";

export default function DearFlipPdf({ source, className = "", id = 'dear-flip-pdf' }) {
    const [isDFlipReady, setIsDFlipReady] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const checkMobile = () => {
            if (isMounted) {
                setIsMobile(window.innerWidth < 768);
            }
        };

        // Run check initially
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // 1. Helper to load stylesheet if not already present
        const addStylesheet = (href, id) => {
            if (document.getElementById(id)) return;
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        };

        // 2. Helper to load script sequentially with promise wrapper
        const loadScript = (src, id) => {
            return new Promise((resolve, reject) => {
                const existingScript = document.getElementById(id);
                if (existingScript) {
                    // Script tag exists. Check if library is already active/loaded.
                    if (id === 'dflip-jquery' && window.jQuery) {
                        resolve();
                        return;
                    }
                    if (id === 'dflip-js' && window.DFLIP) {
                        resolve();
                        return;
                    }
                    // Wait for it to finish loading
                    existingScript.addEventListener('load', resolve);
                    existingScript.addEventListener('error', reject);
                    return;
                }

                const script = document.createElement('script');
                script.src = src;
                script.id = id;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        async function loadResources() {
            try {
                // Add DearFlip styles to document head
                addStylesheet('/dflip/css/themify-icons.min.css', 'dflip-themify-css');
                addStylesheet('/dflip/css/dflip.min.css', 'dflip-css');

                // Load jQuery first (required by DearFlip)
                await loadScript('/dflip/js/libs/jquery.min.js', 'dflip-jquery');

                // Then load DearFlip core JS
                await loadScript('/dflip/js/dflip.min.js', 'dflip-js');

                if (isMounted) {
                    // Check if DFLIP exists and parse new elements
                    if (window.DFLIP && typeof window.DFLIP.parseBooks === 'function') {
                        window.DFLIP.parseBooks();
                    }

                    // Give a small delay to make sure the 3D flipbook is fully rendering
                    setTimeout(() => {
                        if (isMounted) {
                            setIsDFlipReady(true);
                        }
                    }, 800);
                }
            } catch (error) {
                console.error("Error initializing DearFlip:", error);
            }
        }

        loadResources();

        return () => {
            isMounted = false;
            window.removeEventListener('resize', checkMobile);
            // Note: We keep scripts and styles in the document to prevent unnecessary
            // re-downloads when user navigates around or triggers re-renders.
        };
    }, [id, isMobile]);

    return (
        <div key={isMobile ? 'mobile' : 'desktop'} className="relative w-full min-h-[200px] rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-white">
            {/* Light-themed skeleton loading state */}
            {!isDFlipReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20">
                    <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-amber-500/10 border-t-amber-500 animate-spin" />
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center animate-pulse text-lg">
                            📖
                        </div>
                    </div>
                    <span className="text-amber-600 font-mono text-xs uppercase tracking-widest font-extrabold animate-pulse">
                        Opening 3D Flipbook
                    </span>
                </div>
            )}

            {/* DearFlip book container element */}
            <div
                id={id}
                className={`_df_book w-full h-full ${className}`}
                source={source}
                // Options configured via attributes
                webgl="true"
                direction="1"
                backgroundcolor="transparent"
                pagemode={isMobile ? "1" : "2"}
            />
        </div>
    );
}