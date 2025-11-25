import React, { useState, useEffect } from 'react';

const Timecode: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000 / 30); // 30fps update

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date: Date) => {
        const h = date.getHours().toString().padStart(2, '0');
        const m = date.getMinutes().toString().padStart(2, '0');
        const s = date.getSeconds().toString().padStart(2, '0');
        const ms = Math.floor(date.getMilliseconds() / 1000 * 30).toString().padStart(2, '0'); // Frames
        return `${h}:${m}:${s}:${ms}`;
    };

    return (
        <div className="fixed bottom-8 right-8 z-40 font-mono text-xs text-primary/50 tracking-widest pointer-events-none hidden md:block">
            REC {formatTime(time)}
        </div>
    );
};

export default Timecode;
