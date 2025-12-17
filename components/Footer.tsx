import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

export default function Footer() {
    const footerLinks: FooterSection[] = [
        {
            title: "Product",
            links: [
                { label: "Features", href: "/#features" },
                { label: "Pricing", href: "/#pricing" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Changelog", href: "/changelog" },
                { label: "Recent Highlights", href: "/highlights" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About", href: "/about" },
            ],
        },
        {
            title: "Legal",
            links: [
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Credits Policy", href: "/credits" },
            ],
        },
        {
            title: "Connect",
            links: [
                { label: "Twitter", href: "https://twitter.com", external: true },
                { label: "Xiaohongshu", href: "https://xiaohongshu.com", external: true },
                { label: "Discord", href: "https://discord.com", external: true },
            ],
        },
    ];

    return (
        <footer className="border-t border-purple-100 dark:border-purple-900/40 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl mt-auto">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {footerLinks.map((section) => (
                        <div key={section.title} className="flex flex-col space-y-4">
                            <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-sm">
                                {section.title}
                            </h3>
                            <div className="flex flex-col space-y-3">
                                {section.links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors flex items-center gap-1 group w-fit"
                                        target={link.external ? "_blank" : undefined}
                                        rel={link.external ? "noopener noreferrer" : undefined}
                                    >
                                        {link.label}
                                        {link.external && (
                                            <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-purple-100/50 dark:border-purple-900/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Tarot Card Meanings. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
