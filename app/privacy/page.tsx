import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Tarotarot",
    description: "Our Privacy Policy explains our practices with respect to the information that we collect from our users.",
};

export default function PrivacyPage() {
    const lastUpdated = "December 23, 2025";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 md:p-12">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Privacy Policy
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Last updated on {lastUpdated}
                </p>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            Welcome to Tarotarot
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Welcome to the website of Tarotarot ("we", "us" and/or "our"). This Privacy Policy has been created to provide information about our company and our tarot readings and related services (together with the Site, the "Services") to our users and visitors ("Users", "you", "your").
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            Information We Collect
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            When you interact with us through the Services, we may collect Personal Data and other information from you, as further described below:
                        </p>
                        <div className="grid gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Personal Data</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">We collect information you voluntarily provide, such as your email address when registering or contacting us.</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Profile Information</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">To provide personalized readings, we may collect your birthdate, time of birth, and location.</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Usage Data</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">We automatically collect information about how you interact with our services, including device information and log data.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            How We Use Your Information
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            We use the Personal Data you provide in a manner that is consistent with this Privacy Policy.
                        </p>
                        <ul className="space-y-3">
                            {["To provide and maintain the Services", "To personalize your tarot experience", "To communicate with you about updates", "To analyze and improve our Services"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                    <span className="text-purple-500 mt-1.5">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
                        <h2 className="text-xl font-bold text-purple-900 dark:text-purple-200 mb-3">
                            Entertainment Purposes Only
                        </h2>
                        <p className="text-purple-800/80 dark:text-purple-300/80 leading-relaxed italic">
                            All readings and insights provided through Tarotarot are for entertainment purposes only. They do not constitute professional medical, legal, or financial advice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                            Data Security
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We take reasonable steps to protect the Personal Data provided via the Services from loss, misuse, and unauthorized access. However, no Internet transmission is ever fully secure.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
