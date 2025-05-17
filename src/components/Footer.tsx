// src/components/Footer.tsx
import { LinkedinIcon, MailIcon, GithubIcon, PhoneIcon } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Events Manager
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The leading platform for professional event management
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#features" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                Features
              </a>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h4>
            <div className="flex flex-col space-y-3">
              <a 
                href="https://www.linkedin.com/in/kenley-gaitan-evanks-0a2739363/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="https://github.com/Gaitan19" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
                <span>GitHub</span>
              </a>

              <a 
                href="mailto:kenleyjos619@gmail.com" 
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <MailIcon className="w-5 h-5" />
                <span>kenleyjos619@gmail.com</span>
              </a>

              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <PhoneIcon className="w-5 h-5" />
                <span>+505 58083149</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Events Manager. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Built with ❤️ by Kenley Gaitán
          </p>
        </div>
      </div>
    </footer>
  );
};