import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
    [key: string]: {
        en: string;
        ar: string;
    };
}

// Translation Dictionary
const translations: Translations = {
    // Navbar
    'nav.work': { en: 'Work', ar: 'أعمالي' },
    'nav.about': { en: 'About', ar: 'عني' },
    'nav.contact': { en: 'Contact', ar: 'تواصل معي' },

    // Hero
    'hero.title': { en: 'FOCUS ON THE STORY', ar: 'ركز على القصة' },
    'hero.subtitle': { en: 'CLARITY IN CHAOS', ar: 'الوضوح في الفوضى' },
    'hero.scroll': { en: 'FIND YOUR FOCUS', ar: 'اكتشف رؤيتك' },

    // About
    'about.title': { en: 'ABOUT ME', ar: 'من أنا' },
    'about.bio': { en: 'I am a visual storyteller and editor based in Dubai.', ar: 'أنا مونتير وصانع قصص بصرية مقيم في دبي.' },
    'about.workstation': { en: 'WORKSTATION', ar: 'محطة العمل' },
    'about.project': { en: 'PROJECT: PORTFOLIO_V1', ar: 'المشروع: ملف_أعمال_1' },
    'about.search': { en: 'Search...', ar: 'بحث...' },
    'about.master': { en: 'Master Sequence', ar: 'التسلسل الرئيسي' },
    'about.footage': { en: 'Footage', ar: 'اللقطات' },
    'about.audio': { en: 'Audio', ar: 'الصوتيات' },
    'about.gfx': { en: 'GFX', ar: 'الجرافيكس' },
    'about.metadata': { en: 'Clip Metadata', ar: 'بيانات المقطع' },
    'about.meta_name': { en: 'Name', ar: 'الاسم' },
    'about.meta_dur': { en: 'Dur', ar: 'المدة' },
    'about.meta_res': { en: 'Res', ar: 'الدقة' },
    'about.meta_codec': { en: 'Codec', ar: 'الترميز' },
    'about.source': { en: 'SOURCE: (NO CLIP)', ar: 'المصدر: (لا يوجد مقطع)' },
    'about.program': { en: 'PROGRAM: MASTER_SEQ', ar: 'البرنامج: التسلسل_الرئيسي' },

    // Contact
    'contact.title': { en: "LET'S CREATE", ar: 'لنبدأ الإبداع' },
    'contact.subtitle': { en: 'Ready to start your next project? Get in touch.', ar: 'جاهز لبدء مشروعك القادم؟ تواصل معي.' },
    'contact.name': { en: 'Name', ar: 'الاسم' },
    'contact.email': { en: 'Email', ar: 'البريد الإلكتروني' },
    'contact.message': { en: 'Message', ar: 'الرسالة' },
    'contact.send': { en: 'Send Message', ar: 'إرسال الرسالة' },
    'contact.sending': { en: 'Sending...', ar: 'جاري الإرسال...' },
    'contact.sent': { en: 'Message Sent!', ar: 'تم الإرسال!' },
    'contact.error': { en: 'Something went wrong. Please try again or email directly.', ar: 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو إرسال بريد إلكتروني مباشرة.' },

    // Work
    'work.title': { en: 'SELECTED WORK', ar: 'أعمال مختارة' },
    'work.subtitle': { en: 'A collection of my best edits and motion graphics.', ar: 'مجموعة من أفضل أعمالي في المونتاج والجرافيك.' },
    'work.view_project': { en: 'View Project', ar: 'عرض المشروع' },
    'work.category_commercial': { en: 'Commercial', ar: 'إعلانات' },
    'work.category_narrative': { en: 'Narrative', ar: 'سردي' },
    'work.category_music_video': { en: 'Music Video', ar: 'فيديو كليب' },
    'work.category_documentary': { en: 'Documentary', ar: 'وثائقي' },

    // Work Categories & Items
    'work.motion-graphics.name': { en: 'Motion Graphic', ar: 'موشن جرافيك' },
    'work.motion-graphics.desc': { en: 'Dynamic visual storytelling', ar: 'سرد قصصي بصري ديناميكي' },
    'work.events.name': { en: 'Events', ar: 'تغطية فعاليات' },
    'work.events.desc': { en: 'Capturing moments that matter', ar: 'توثيق اللحظات المهمة' },
    'work.commercial-proposals.name': { en: 'Commercial & Proposals', ar: 'إعلانات وعروض' },
    'work.commercial-proposals.desc': { en: 'Brand focused narratives', ar: 'سرد يركز على العلامة التجارية' },
    'work.cinema-films.name': { en: 'Cinema & Films', ar: 'سينما وأفلام' },
    'work.cinema-films.desc': { en: 'Cinematic experiences', ar: 'تجارب سينمائية' },
    'work.reels.name': { en: 'Reels', ar: 'ريلز' },
    'work.reels.desc': { en: 'Short form impact', ar: 'تأثير في وقت قصير' },
    'work.vfx-others.name': { en: 'VFX & Others', ar: 'مؤثرات بصرية وأخرى' },
    'work.vfx-others.desc': { en: 'Visual effects and more', ar: 'مؤثرات بصرية والمزيد' },

    // Work Gallery
    'gallery.back': { en: 'Back to Categories', ar: 'العودة إلى الفئات' },
    'gallery.not_found': { en: 'Category not found', ar: 'الفئة غير موجودة' },

    // Footer
    'footer.brand': { en: 'PORTFOLIO', ar: 'ملف الأعمال' },
    'footer.tagline': { en: 'Creating visual stories that matter.', ar: 'نصنع قصصاً بصرية ذات معنى.' },
    'footer.rights': { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
};

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = language;

        // Optional: Add a class to body for font switching
        if (language === 'ar') {
            document.body.classList.add('font-arabic');
        } else {
            document.body.classList.remove('font-arabic');
        }
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
    };

    const t = (key: string) => {
        const translation = translations[key];
        if (!translation) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }
        return translation[language];
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
