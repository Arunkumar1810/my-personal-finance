import React from 'react';

export const LiquidityRiver: React.FC = () => {
    return (
        <div className="bg-panel border border-bordercol p-6 rounded-2xl h-64 flex flex-col items-center justify-center text-gray-500 mb-8 relative overflow-hidden">
            <span className="z-10 bg-[#0D0D12]/80 px-4 py-2 rounded-lg border border-bordercol text-sm text-white shadow-lg backdrop-blur-sm">
                Liquidity River (Sankey Flow Diagram)
            </span>
            <svg className="absolute bottom-0 left-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#38bdf8" strokeWidth="4" opacity="0.5" />
                <path d="M0,70 Q25,50 50,70 T100,70" fill="none" stroke="#fbbf24" strokeWidth="4" opacity="0.5" />
                <path d="M0,90 Q25,70 50,90 T100,90" fill="none" stroke="#f43f5e" strokeWidth="4" opacity="0.5" />
            </svg>
        </div>
    );
};
