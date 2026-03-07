export default function Loading() {
    return (
        <main className="min-h-screen bg-slate-950 animate-pulse">
            {/* Nav skeleton */}
            <div className="h-[72px] w-full border-b border-white/10 bg-slate-900/50 backdrop-blur" />

            {/* Hero skeleton */}
            <section className="relative min-h-[70vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
                <div className="relative z-10 mx-auto flex flex-col items-center justify-center px-6 text-center max-w-4xl">
                    <div className="h-8 w-56 rounded-full bg-white/10" />
                    <div className="mt-8 h-16 w-80 rounded-xl bg-white/10 md:w-[36rem]" />
                    <div className="mt-6 h-5 w-72 rounded bg-white/5 md:w-[28rem]" />
                    <div className="mt-10 flex gap-4">
                        <div className="h-14 w-40 rounded-xl bg-red-500/20" />
                        <div className="h-14 w-36 rounded-xl bg-white/10" />
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                        <div className="h-28 rounded-2xl bg-white/5 border border-white/10" />
                        <div className="h-28 rounded-2xl bg-white/5 border border-white/10" />
                        <div className="h-28 rounded-2xl bg-white/5 border border-white/10" />
                        <div className="h-28 rounded-2xl bg-white/5 border border-white/10" />
                    </div>
                </div>
            </section>

            {/* Cards skeleton */}
            <section className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-16 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-[380px] rounded-3xl bg-white/5 border border-white/10" />
                ))}
            </section>
        </main>
    );
}
