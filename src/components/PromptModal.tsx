"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, ExternalLink } from "lucide-react";
import { Prompt } from "@/types/prompt";
import { useState } from "react";

interface PromptModalProps {
    prompt: Prompt | null;
    onClose: () => void;
}

export default function PromptModal({ prompt, onClose }: PromptModalProps) {
    const [copied, setCopied] = useState(false);

    if (!prompt) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const aiTools = [
        { name: "Gemini", url: "https://gemini.google.com/" },
        { name: "Midjourney", url: "https://www.midjourney.com/" },
        { name: "DALL-E", url: "https://chatgpt.com/" },
    ];

    return (
        <AnimatePresence>
            {prompt && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        layoutId={`card-${prompt.id}`}
                        className="relative w-full max-w-4xl bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-fit max-h-[90vh]"
                    >
                        {/* Close Button Mobile */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white md:hidden"
                        >
                            <X size={20} />
                        </button>

                        {/* Images Column */}
                        <div className="w-full md:w-1/2 flex flex-col lg:flex-row h-64 md:h-auto border-b md:border-b-0 md:border-r border-white/10">
                            <div className="relative flex-1 group overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
                                <Image
                                    src={prompt.beforeImage}
                                    alt="Before"
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-widest text-white/50">
                                    Original
                                </div>
                            </div>
                            <div className="relative flex-1 group overflow-hidden">
                                <Image
                                    src={prompt.afterImage}
                                    alt="After"
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600/80 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-widest text-white">
                                    Modified
                                </div>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{prompt.category}</span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{prompt.title}</h2>
                                    <p className="text-white/60">{prompt.description}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="hidden md:flex p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">Image-to-Image Prompt</h3>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all"
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                        {copied ? "Copied!" : "Copy Prompt"}
                                    </button>
                                </div>

                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl font-mono text-sm text-white/80 leading-relaxed max-h-48 overflow-y-auto">
                                    {prompt.prompt}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">Try it with</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {aiTools.map((tool) => (
                                        <a
                                            key={tool.name}
                                            href={tool.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                                        >
                                            <span className="text-xs font-medium text-white/60 group-hover:text-white">{tool.name}</span>
                                            <ExternalLink size={12} className="mt-1 text-white/30 group-hover:text-white/50" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
