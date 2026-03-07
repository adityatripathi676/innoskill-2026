import { ProgressBarProps } from "@/types";

export default function ProgressBar({
    currentStepIdx,
    totalSteps
}: ProgressBarProps
) {
    const progress = ((currentStepIdx + 1) / totalSteps) * 100;

    return (
        <div
            className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 transition-all duration-500 z-50 shadow-md shadow-orange-500/30"
            style={{ width: `${progress}%` }}
        />
    )
}