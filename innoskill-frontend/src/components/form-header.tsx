import mrlogo from "@/assets/mrlogo.png";
import Image from "next/image";
import { Roboto_Slab } from "next/font/google"

const roboto = Roboto_Slab({ subsets: ["latin"] });

export default function FormHeader(){
    return (
        <div className="flex flex-col justify-center items-center">
        <Image src={mrlogo} alt="MRIIRS Logo" width={200} className="select-none w-full max-w-[200px] h-auto opacity-90" />
        <div className="text-center my-3 max-w-4xl">
            <h1 className="font-semibold text-sm text-slate-500 tracking-wide">8th Edition</h1>
            <span className={roboto.className}>
                <h1 className="font-extrabold text-2xl md:text-3xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent uppercase">INNOSKILLS 2026</h1>
            </span>
            <h1 className="font-medium text-sm text-slate-600 mt-1">Annual Technical Festival • MRIIRS</h1>
        </div>
    </div>
    )
}