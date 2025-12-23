import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Tarotarot",
    description: "Please read these Terms of Service carefully before using our tarot reading services.",
};

export default function TermsPage() {
    const lastRevision = "December 23, 2025";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 md:p-12">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Terms of Service
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Last revised on {lastRevision}
                </p>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            Agreement to Terms
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Welcome to Tarotarot! By accessing our website (the "Site") and using our services (the "Services"), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service and our Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            1. Description of Services
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Tarotarot provides informational readings and profiles based on tarot card symbolism and interpretations. Our services are designed to offer self-reflection and personal insights. All content provided is for <strong className="text-purple-600 dark:text-purple-400">entertainment purposes only</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            2. Eligibility
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Our Services are available to individuals 13 years of age or older. If you are under 18, you may use the Services only with the approval of a parent or guardian.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            3. User Conduct
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            You agree not to use the Services for any unlawful purpose or any purpose prohibited under this Agreement. You agree not to:
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Upload or distribute any content that is defamatory, obscene, or infringing",
                                "Attempt to bypass or manipulate the operation of the Site",
                                "Use our content for commercial purposes without prior written authorization"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                    <div className="min-w-[20px] h-[20px] rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[10px] mt-1 font-bold">
                                        {i + 1}
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            4. Disclaimers
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 uppercase text-sm font-semibold tracking-wide">
                            TAROTAROT PROVIDES THE SERVICES ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE DISCLAIM ALL WARRANTIES OF ANY KIND.
                        </p>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
                            <p className="text-purple-900 dark:text-purple-200 leading-relaxed">
                                <b className="block mb-2 text-lg">Important:</b> Tarot readings are not a substitute for professional advice from qualified experts in fields such as medicine, law, or finance. We do not guarantee the accuracy or outcomes of any insights provided.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            5. Intellectual Property
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            All content on the Site, including text, graphics, logos, and card interpretations, is the property of Tarotarot or its content suppliers and is protected by copyright and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            6. Modifications
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We reserve the right to modify these Terms of Service at any time. Your continued use of the Site after such modifications indicates your agreement to the updated terms.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
