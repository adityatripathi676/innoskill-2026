import Link from "next/link";

export default function FormFooter({ dark = false }: { dark?: boolean }) {
    return (
        <footer className={`border-t ${dark ? "border-white/10 bg-slate-950" : "border-slate-200 bg-white"}`}>
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:px-8">
                <div className="space-y-3">
                    <h3 className={`text-xl font-bold ${dark ? "text-white" : "text-slate-800"}`}>
                        INNO<span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">SKILLS</span> 2026
                    </h3>
                    <p className={`text-sm leading-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                        Annual Technical Festival of Manav Rachna International Institute of Research and Studies, Faridabad.
                    </p>
                </div>
                <div className="space-y-3">
                    <h4 className={`font-semibold ${dark ? "text-white" : "text-slate-800"}`}>Quick Links</h4>
                    <div className={`flex flex-col gap-2 text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
                        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
                        <Link href="/registration" className="hover:text-orange-500 transition-colors">Registration</Link>
                        <Link href="/coordinators" className="hover:text-orange-500 transition-colors">Coordinators</Link>
                        <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link>
                    </div>
                </div>
                <div className="space-y-3">
                    <h4 className={`font-semibold ${dark ? "text-white" : "text-slate-800"}`}>Credits</h4>
                    <p className={`text-sm leading-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                        Designed and Developed by <a href="https://www.linkedin.com/in/aditya766/" target="_blank" rel="noopener noreferrer" className="text-orange-500 font-medium hover:underline">Aditya Tripathi</a> and <a href="https://www.linkedin.com/in/saurav-kumar-astro/" target="_blank" rel="noopener noreferrer" className="text-orange-500 font-medium hover:underline">Saurav Kumar</a> under MRIIRS, Faridabad.
                    </p>
                </div>
            </div>
            <div className={`border-t ${dark ? "border-white/10" : "border-slate-200"}`}>
                <div className={`mx-auto max-w-7xl px-6 py-4 text-center text-xs ${dark ? "text-slate-500" : "text-slate-400"}`}>
                    © 2026 INNOSKILLS. All rights reserved.
                </div>
            </div>
        </footer>
    );
}