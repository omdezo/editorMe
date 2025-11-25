export interface PortfolioItem {
    id: string;
    name: string;
    count: string;
    description: string;
    videos: string[];
}

// Helper to convert Google Drive ID to embed link
const getDriveLink = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

export const portfolioData: PortfolioItem[] = [
    {
        id: 'motion-graphics',
        name: 'Motion Graphic',
        count: '01',
        description: 'Dynamic visual storytelling',
        videos: [
            getDriveLink('145UgNKhD89gcLgU2hslhuXjLC23CWufY'),
            getDriveLink('13VXgKJZPIAN-OQL8g1NB3UcHfO9bV2MT'),
            getDriveLink('1YOEHnndbZ68o_Xl4zxRe9UEgHuPcwxQe'),
        ]
    },
    {
        id: 'events',
        name: 'Events',
        count: '02',
        description: 'Capturing moments that matter',
        videos: [
            getDriveLink('17EZU57l-HOKiMjRTUwLYz2YtEyY9W2V9'),
            getDriveLink('1Gmeugwjwjgi-L39NFNPL1s7Yqbdywbeg'),
        ]
    },
    {
        id: 'commercial-proposals',
        name: 'Commercial & Proposals',
        count: '03',
        description: 'Brand focused narratives',
        videos: [
            getDriveLink('1vfU3Y0EE5uTIf9p8Z61HgMg4SprUbC7Z'),
            getDriveLink('1QTf2fHyu0TQLFH-jNa8lMJRQkPeW1bdn'),
        ]
    },
    {
        id: 'cinema-films',
        name: 'Cinema & Films',
        count: '04',
        description: 'Cinematic experiences',
        videos: [
            getDriveLink('1srf_8htvXhwKyUKi-UyoSzSe87TwRqPX'),
            getDriveLink('1NOeSGL8p8QcL42tLyrMXTsa-ZB06fInn'),
            getDriveLink('1fUqleio8gquYyt08G-ktyhLzcbvqbmka'),
        ]
    },
    {
        id: 'reels',
        name: 'Reels',
        count: '05',
        description: 'Short form impact',
        videos: [
            getDriveLink('1xR8pcginfLdsbRUrRrRw4dJ4bFqIIaEK'),
            getDriveLink('1DAyf_WOfSmWghfCPhsGkxIuu2Y64tmD9'),
            getDriveLink('10kdCrl5l6qUdhVXMiGmo9Fsg780FSO9P'),
        ]
    },
    {
        id: 'vfx-others',
        name: 'VFX & Others',
        count: '06',
        description: 'Visual effects and more',
        videos: [
            getDriveLink('16-uBbWSmJAr3dj2xRq3SvJicsbwlSYmq'),
            getDriveLink('1QjpMAW9hMRto9db8upMWV7kb2IMyoGQl'),
        ]
    },
];
