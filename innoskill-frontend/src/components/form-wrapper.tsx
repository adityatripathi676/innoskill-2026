export default function FormWrapper({
    title, subtitle, children
}: {
    title: string,
    subtitle?: string;
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-5 sm:gap-7 items-start w-full">
            <div className="w-full pb-4 border-b-2 border-slate-100">
                <h2 className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">{title}</h2>
                {subtitle && <p className="text-sm text-slate-500 mt-1 font-medium">{subtitle}</p>}
            </div>
            <div className="w-full">{children}</div>
        </div>
    )
}