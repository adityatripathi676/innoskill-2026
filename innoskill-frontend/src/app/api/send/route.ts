import { NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb', // Increase as needed
        },
    },
};

export async function POST(req: Request) {
    const body = await req.json();
    const apiUrl =
        process.env.BACKEND_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "https://innoskill-2026-0p01.onrender.com";

    try {
        const res = await fetch(`${apiUrl}/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const contentType = res.headers.get("Content-Type") || "application/json";
        const payload = await res.text();

        return new NextResponse(payload, {
            status: res.status,
            headers: { "Content-Type": contentType },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { message: "Backend fetch failed", error: message },
            { status: 502 },
        );
    }
}
