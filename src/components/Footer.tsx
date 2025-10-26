import { Github, Linkedin, Twitter, Zap, Heart } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Help", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="relative border-t border-purple-500/20 bg-gradient-to-b from-transparent via-purple-950/5 to-black/80 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-600/10 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center gap-10">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-60"></div>
                <div className="relative bg-gradient-to-tr from-purple-600 via-purple-500 to-fuchsia-500 p-2.5 rounded-xl">
                  <Zap className="w-5 h-5 text-white" fill="white" />
                </div>
              </div>
              <span className="font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent text-2xl">
                StudyBuddy
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered learning for the next generation
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white transition-all duration-300 relative group font-medium"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 text-gray-400 hover:text-white bg-purple-500/0 hover:bg-purple-500/20 rounded-xl transition-all duration-300 border border-purple-500/0 hover:border-purple-500/30 hover:scale-110 group"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>

          {/* Divider */}
          <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-gray-500 flex items-center justify-center gap-2 flex-wrap">
              <span>© {currentYear} StudyBuddy.</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                Built with <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" /> by Team WanderThink
              </span>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Making education accessible through AI
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </footer>
  );
}
