import { ProgressBarProps } from "@/types";

export default function ProgressBar({
    currentStepIdx,
    totalSteps
}: ProgressBarProps
) {
    const progress = ((currentStepIdx + 1) / totalSteps) * 100;

    return (
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-200/50 z-50">
            <div
                className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 shadow-md shadow-orange-500/30"
                style={{ 
                    width: `${progress}%`,
                    transition: 'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                }}
            />
        </div>
    )
}