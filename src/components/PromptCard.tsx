"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Prompt } from "@/types/prompt";

interface PromptCardProps {
    prompt: Prompt;
    onClick: () => void;
}

export default function PromptCard({ prompt, onClick }: PromptCardProps) {
    return (
        <motion.div
            layoutId={`card-${prompt.id}`}
            onClick={onClick}
            className="glass glass-hover rounded-2xl overflow-hidden cursor-pointer group flex flex-col h-full"
        >
            <div className="flex w-full h-48 sm:h-56">
                {/* Before Image */}
                <div className="relative flex-1 overflow-hidden border-r border-white/5">
                    <Image
                        src={prompt.beforeImage}
                        alt={`${prompt.title} - Before`}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        sizes="(max-width: 768px) 50vw, 16vw"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider text-white/70">
                        Before
                    </div>
                </div>

                {/* After Image */}
                <div className="relative flex-1 overflow-hidden">
                    <Image
                        src={prompt.afterImage}
                        alt={`${prompt.title} - After`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 16vw"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-500/80 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider text-white">
                        After
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-1 bg-gradient-to-b from-transparent to-black/20">
                <h3 className="text-lg font-semibold text-white truncate">{prompt.title}</h3>
                <p className="text-sm text-white/50 line-clamp-1">{prompt.description}</p>
                <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 font-medium">
                        {prompt.category}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
