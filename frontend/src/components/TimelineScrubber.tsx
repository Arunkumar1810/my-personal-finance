import { useState, useCallback, useRef, type ChangeEvent } from 'react';
import { scrubTimeline } from '../services/api';

const STRESS_TEST_DROP_PERCENT = 20;

export const TimelineScrubber = ({ onScrubResult }: { onScrubResult: (data: any) => void }) => {
    const [sliderVal, setSliderVal] = useState(50);
    const [stressTestActive, setStressTestActive] = useState(false);
    const debounceTimeout = useRef<number | null>(null);

    const performScrub = useCallback(async (val: number, stress: boolean) => {
        let offset = 0;
        if (val < 50) {
            offset = (val / 50) * 6 - 6; // 0 -> -6, 50 -> 0
        } else {
            offset = ((val - 50) / 50) * 60; // 50 -> 0, 100 -> +60
        }
        
        const drop = stress ? STRESS_TEST_DROP_PERCENT : 0;
        try {
            const res = await scrubTimeline({ months_offset: offset, stress_test_drop: drop });
            onScrubResult({
                offsetMonths: Math.round(offset),
                stressTestActive: stress,
                dropPercent: drop,
                data: res
            });
        } catch (e) {
            console.error("Scrub failed", e);
        }
    }, [onScrubResult]);

    const handleScrub = useCallback((val: number, stress: boolean) => {
        if (debounceTimeout.current) {
            window.clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = window.setTimeout(() => {
            performScrub(val, stress);
        }, 150);
    }, [performScrub]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        setSliderVal(val);
        handleScrub(val, stressTestActive);
    };

    const toggleStressTest = () => {
        const newStress = !stressTestActive;
        setStressTestActive(newStress);
        handleScrub(sliderVal, newStress);
    };

    return (
        <div className="flex-shrink-0 bg-[#0D0D12] border-t border-bordercol px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-6 flex-1">
                <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">Timeline</span>
                <input 
                    type="range" min="0" max="100" value={sliderVal} onChange={onChange} 
                    className="w-full h-1 bg-bordercol rounded-lg appearance-none cursor-pointer accent-sky-500" 
                />
                <div className="flex space-x-2 text-xs text-gray-400 font-mono">
                    <span>-6M</span>
                    <span className="text-white">TODAY</span>
                    <span>+5Y</span>
                </div>
            </div>
            <div className="ml-8 border-l border-bordercol pl-6">
                <button 
                    onClick={toggleStressTest}
                    className={`border px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2 ${stressTestActive ? 'bg-rose-500 text-white border-rose-500' : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500 hover:text-white'}`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span>{stressTestActive ? `Stress-Test Active (Market drops ${STRESS_TEST_DROP_PERCENT}%)` : 'Stress-Test Portfolio'}</span>
                </button>
            </div>
        </div>
    );
};
