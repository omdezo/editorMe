import React from 'react';

const FilmGrain: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[90] opacity-20 mix-blend-overlay overflow-hidden">
            <div
                className="absolute inset-[-200%] w-[400%] h-[400%] animate-grain"
                style={{
                    backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
                    backgroundSize: '200px 200px',
                }}
            />
        </div>
    );
};

export default FilmGrain;
