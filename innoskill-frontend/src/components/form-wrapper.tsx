export default function FormWrapper({
    title, subtitle, children
}: {
    title: string,
    subtitle?: string;
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-4 sm:gap-6 items-center w-full">
            <div className="flex flex-col gap-0.5 sm:gap-1 text-center w-full">
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-slate-800">{title}</h1>
                <span className="font-medium text-xs sm:text-sm text-orange-500">{subtitle}</span>
            </div>
            <div className="w-full">{children}</div>
        </div>
    )
}