import { useEffect, useState } from 'react';

const defaults = {
    essential: true,
    analytics: false,
    marketing: false,
};

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('cccdo_cookie_consent');
        if (!stored) {
            setIsVisible(true);
            setAnalytics(false);
            setMarketing(false);
            return;
        }

        try {
            const consent = JSON.parse(stored);
            if (consent) {
                setAnalytics(Boolean(consent.analytics));
                setMarketing(Boolean(consent.marketing));
            }
        } catch (error) {
            localStorage.removeItem('cccdo_cookie_consent');
            setIsVisible(true);
        }
    }, []);

    const saveConsent = (consent) => {
        localStorage.setItem('cccdo_cookie_consent', JSON.stringify(consent));
        setAnalytics(Boolean(consent.analytics));
        setMarketing(Boolean(consent.marketing));
        setIsVisible(false);
        setShowSettings(false);
    };

    const handleAcceptAll = () => {
        saveConsent({ essential: true, analytics: true, marketing: true });
    };

    const handleDecline = () => {
        saveConsent({ essential: true, analytics: false, marketing: false });
    };

    const handleSavePreferences = () => {
        saveConsent({ essential: true, analytics, marketing });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <>
            {/* Main Cookie Banner - White Background with Transparency */}
            <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6">
                <div className="mx-auto max-w-7xl rounded-lg bg-white/95 shadow-2xl backdrop-blur-md border border-slate-200/30 p-5 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Cookie Notice</p>
                            <p className="max-w-2xl text-sm text-slate-700 sm:text-base">
                                We use cookies to improve your experience, analyze site traffic, and provide personalized content. You can accept all cookies or manage your preferences.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <button
                                type="button"
                                onClick={handleAcceptAll}
                                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700"
                            >
                                Accept All Cookies
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowSettings(true)}
                                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Cookie Settings
                            </button>
                            <button
                                type="button"
                                onClick={handleDecline}
                                className="inline-flex items-center justify-center rounded-lg bg-slate-200/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-300/80"
                            >
                                Decline Non-essential
                            </button>
                        </div>
                    </div>

                    <p className="mt-4 text-xs text-slate-500">
                        By continuing, you agree to our{' '}
                        <a href="/privacy" className="font-semibold text-emerald-700 hover:text-emerald-800">
                            Privacy Policy
                        </a>.
                    </p>
                </div>
            </div>

            {/* Settings Modal - White Background with Transparency */}
            {showSettings && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 px-4 pb-6 pt-20 sm:items-center sm:px-6 backdrop-blur-sm">
                    <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white/95 shadow-2xl backdrop-blur-md border border-slate-200/30">
                        <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-5">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Cookie Preferences</h2>
                                <p className="mt-1 text-sm text-slate-500">Choose which cookies you allow on this site.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowSettings(false)}
                                className="text-slate-500 transition hover:text-slate-900"
                                aria-label="Close preferences"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-5 p-6">
                            <div className="rounded-lg bg-slate-50/80 p-5 border border-slate-200/30">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900">Essential Cookies</h3>
                                        <p className="text-sm text-slate-500">Required for basic site functionality and cannot be disabled.</p>
                                    </div>
                                    <span className="inline-flex rounded-lg bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">Always enabled</span>
                                </div>
                            </div>

                            <div className="rounded-lg bg-slate-50/80 p-5 border border-slate-200/30">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900">Analytics Cookies</h3>
                                        <p className="text-sm text-slate-500">Help us understand how visitors use the site so we can improve it.</p>
                                    </div>
                                    <label className="inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900">
                                        <input
                                            type="checkbox"
                                            checked={analytics}
                                            onChange={(event) => setAnalytics(event.target.checked)}
                                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        Enable
                                    </label>
                                </div>
                            </div>

                            <div className="rounded-lg bg-slate-50/80 p-5 border border-slate-200/30">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900">Marketing Cookies</h3>
                                        <p className="text-sm text-slate-500">Used for ads personalization and tracking preferences across sites.</p>
                                    </div>
                                    <label className="inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900">
                                        <input
                                            type="checkbox"
                                            checked={marketing}
                                            onChange={(event) => setMarketing(event.target.checked)}
                                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        Enable
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={handleDecline}
                                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Decline Non-essential
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSavePreferences}
                                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                >
                                    Save Preferences
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}