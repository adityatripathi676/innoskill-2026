import FormFooter from "@/components/form-footer";
import SiteNav from "@/components/site-nav";
import { Users, Target, BookOpen, Star } from "lucide-react";
import Image from "next/image";
import mrlogo from "@/assets/mrlogo.png";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50 overflow-hidden pt-24">
            <SiteNav dark={false} />

            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden border-b border-slate-200 bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.05),transparent_50%)]" />
                
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-semibold text-orange-600 mb-8 shadow-sm">
                            About INNOSKILL
                        </span>
                        
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                            Get To Know <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Us</span>
                        </h1>
                        
                        <p className="mt-8 text-lg text-slate-600 leading-relaxed font-medium">
                            Dear All, <br/><br/>
                            Greetings from Manav Rachna Educational Institutions! <br/><br/>
                            We are pleased to inform you that our annual technical festival &quot;INNOSKILL 2025&quot; is planned to be held during 3rd – 4th April 2025 wherein students of various reputed Universities, Colleges and Schools of the country will participate.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-orange-500 to-red-500 blur-2xl opacity-20 transform -rotate-6" />
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200">
                                <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-90 mix-blend-multiply" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                                    <div className="z-10 flex flex-col items-center gap-4 p-8 mt-auto w-full">
                                        <Image src={mrlogo} alt="MR Logo" width={80} height={80} className="w-20 bg-white/10 backdrop-blur-md rounded-2xl p-2" />
                                        <h3 className="text-white text-2xl font-bold">Innovation & Excellence</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-4">A Legacy of Innovation</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Different activities of the INNOSKILL 2025 include- Project Competitions which will showcase cutting-edge innovations in various fields of Engineering and Technology, Competitions, Tech Shows, Workshops and Skill Corner.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                                        <Target className="text-orange-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900">Cutting-Edge Innovation</h4>
                                        <p className="text-slate-600 mt-2">&apos;INNOSKILL 2025&apos; will be witness to a plethora of inventions by students from various institutes.</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                                        <Users className="text-red-500" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900">Young Entrepreneurs</h4>
                                        <p className="text-slate-600 mt-2">Your support will be a huge motivation for the young entrepreneurs in the making. We invite you for active participation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-24 bg-white border-t border-slate-200">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Our Patrons & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Leadership</span></h2>
                        <p className="text-slate-600 text-lg">Guided by visionaries dedicated to excellence in education and innovation.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            { name: "Mrs. Satya Bhalla", role: "Chief Patron MREI", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
                            { name: "Dr. Prashant Bhalla", role: "President MREI", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
                            { name: "Dr. Amit Bhalla", role: "Vice President MREI", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" }
                        ].map((patron) => (
                            <div key={patron.name} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg relative group-hover:scale-105 transition-transform duration-300">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${patron.image}')` }} />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-2">{patron.name}</h3>
                                <p className="text-orange-600 font-bold text-xs uppercase tracking-wider">{patron.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FormFooter dark={false} />
        </main>
    );
}
