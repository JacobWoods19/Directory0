import React from 'react';
export default function Footer() {
    return (

        <footer class="p-4 bg-slate-800 sm:p-6">
            <div class="md:flex md:justify-between">
                <div class="mb-6 md:mb-0">
                    <img src="Logo.png" alt="Logo" class="w-50 h-10 mr-2" />
                    <a href="https://www.buymeacoffee.com/jacobwoods">
                        <img src="bmc-button.png" alt="Logo" class="w-32 py-3" />
                    </a>
                </div>
                <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                        <ul class="text-gray-600 dark:text-gray-400">
                            <li>
                                <a href="https://twitter.com/JWoodsDev" class="hover:underline">Twitter</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                        <ul class="text-gray-600 dark:text-gray-400">
                            <li class="mb-4">
                                <a href="/privacy" class="hover:underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/tos" class="hover:underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Directory0.Org . All Rights Reserved.
                </span>
            </div>
        </footer>

    );
}