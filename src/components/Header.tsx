"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full px-6 py-4 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex-1 opacity-0 pointer-events-none md:flex">
                    {/* Spacer to help center the title */}
                </div>

                <h1 className="text-2xl font-semibold tracking-tight text-white flex-shrink-0">
                    OpenPrompt Library
                </h1>

                <div className="flex-1 flex justify-end">
                    <Link
                        href="https://forms.gle/your-google-form-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-all"
                    >
                        Submit Prompt
                        <ExternalLink size={16} />
                    </Link>
                </div>
            </div>
        </header>
    );
}
