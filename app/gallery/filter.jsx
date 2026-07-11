'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect, useTransition } from 'react'
import NSS_SESSION from '@/data/nss_session.json'
import { FaSpinner, FaSearch } from 'react-icons/fa';


export function Filters({ wings = [], searchQuery = "", onSearchChange = () => { } }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [startDate, setStartDate] = useState(searchParams.get('start-date') || '');
    const [endDate, setEndDate] = useState(searchParams.get('end-date') || '');
    const [session, setSession] = useState(searchParams.get("session") || "2025-2026");
    const [selectedWing, setSelectedWing] = useState(searchParams.get('wing') || 'All');
    const [isPending, startTransition] = useTransition();

    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [localSearch, setLocalSearch] = useState(searchQuery || '');

    useEffect(() => {
        setLocalSearch(searchQuery);
    }, [searchQuery]);

    // Sync input states if URL parameters change externally
    useEffect(() => {
        setStartDate(searchParams.get('start-date') || '');
        setEndDate(searchParams.get('end-date') || '');
        setSession(searchParams.get("session") || "2025-2026");
        setSelectedWing(searchParams.get('wing') || 'All');
        if (innerWidth < 640) setIsMobileDevice(true);
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams.toString());

        if (startDate) params.set('start-date', startDate);
        else params.delete('start-date');

        if (endDate) params.set('end-date', endDate);
        else params.delete('end-date');

        if (selectedWing && selectedWing !== 'All') params.set('wing', selectedWing);
        else params.delete('wing');

        if (session && NSS_SESSION.find(s => s.session == session)) params.set("session", session);
        else params.delete("session");

        startTransition(() => router.push(`${pathname}?${params.toString()}`, { scroll: false }));
    };

    const handleClear = () => {
        setStartDate('');
        setEndDate('');
        setSession("2025-2026");
        setSelectedWing('All');
        setLocalSearch('');
        onSearchChange('');
        router.push(pathname, { scroll: false });
    };

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl relative">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5 items-end justify-between">

                    {/* Start Date */}
                    {/* <div className="w-full md:flex-1 flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="start-date">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            name="start-date"
                            id="start-date"
                            className="w-full border border-slate-200 outline-brand-blue py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all focus:bg-white focus:border-brand-blue/50"
                        />
                    </div> */}

                    {/* End Date */}
                    {/* <div className="w-full md:flex-1 flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="end-date">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            name="end-date"
                            id="end-date"
                            className="w-full border border-slate-200 outline-brand-blue py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all focus:bg-white focus:border-brand-blue/50"
                        />
                    </div> */}

                    {/* sessionwise date filter */}
                    <div className="w-full md:flex-1 flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="end-date">
                            Session
                        </label>
                        <select
                            value={session}
                            onChange={(e) => setSession(e.target.value)}
                            name="session"
                            id="session"
                            className="w-full border border-slate-200 outline-brand-blue py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all focus:bg-white focus:border-brand-blue/50"
                        >
                            {NSS_SESSION.filter(s => s.session !== "2026-2027" && s.session !== "2024-2025").map((session, index) => {
                                return <option key={index} value={session.session} className="uppercase">{session.session}</option>
                            })}
                        </select>
                    </div>

                    {/* Wing Filter */}
                    <div className="w-full md:flex-1 flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="wing-select">
                            Wing / Category
                        </label>
                        <select
                            id="wing-select"
                            value={selectedWing}
                            onChange={(e) => setSelectedWing(e.target.value)}
                            className="w-full border border-slate-200 outline-brand-blue py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all focus:bg-white focus:border-brand-blue/50 cursor-pointer"
                        >
                            <option value="All">All Wings</option>
                            {wings.map((w) => (
                                <option key={w.id} value={w.name}>
                                    {w.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Client-side Search */}
                    <div className="w-full md:w-auto flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="local-search-input">
                            Search
                        </label>
                        <div className="relative flex items-center h-[48px]">
                            <div
                                className={`flex items-center bg-slate-50/50 border outline-none rounded-2xl transition-all duration-300 ${isSearchFocused || localSearch || isMobileDevice
                                    ? "w-full md:w-56 lg:w-64 border-brand-blue/50 bg-white shadow-sm"
                                    : "w-[48px] border-slate-200 hover:bg-slate-100 hover:border-slate-300 bg-slate-50/50"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSearchFocused(true);
                                        document.getElementById("local-search-input")?.focus();
                                    }}
                                    className="w-[46px] h-[46px] flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer flex-shrink-0"
                                >
                                    <FaSearch size={14} />
                                </button>
                                <input
                                    id="local-search-input"
                                    type="text"
                                    value={localSearch}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setIsSearchFocused(false);
                                        }, 250);
                                    }}
                                    onChange={(e) => {
                                        setLocalSearch(e.target.value);
                                        onSearchChange(e.target.value);
                                    }}
                                    placeholder="Search current events..."
                                    className={`text-sm font-medium text-slate-800 bg-transparent outline-none border-none py-2.5 pr-4 w-full transition-opacity duration-300 ${isSearchFocused || localSearch || isMobileDevice ? "opacity-100 block" : "opacity-0 hidden"
                                        }`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="w-full md:w-auto flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={handleClear}
                            className="flex-1 md:flex-none border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3 px-6 rounded-2xl transition-all cursor-pointer text-sm"
                        >
                            Reset
                        </button>
                        <button
                            disabled={isPending}
                            type="submit"
                            className="flex-1 flex flex-row justify-center flex-nowrap items-center md:flex-none text-white bg-brand-blue hover:bg-brand-blue/90 font-bold py-3 px-8 rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer text-sm"
                        >
                            {isPending && <FaSpinner className="animate-spin me-3" />} <span>Apply Filters</span>
                        </button>
                    </div>

                </form>
            </div>
        </section>
    )
}
