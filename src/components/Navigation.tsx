import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles, Zap, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../contexts/AuthContext";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isAccountMenuOpen && !(event.target as Element).closest('.account-dropdown')) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAccountMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-fuchsia-500/5 opacity-50"></div>
        
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("hero")}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-tr from-purple-600 via-purple-500 to-fuchsia-500 p-2.5 rounded-xl">
                  <Zap className="w-5 h-5 text-white" fill="white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent" style={{ fontSize: '1.125rem' }}>
                  StudyBuddy
                </span>
                <span className="text-xs text-purple-400 tracking-wider -mt-1">AI POWERED</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {["Features", "How It Works", "About"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                  className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 group-hover:w-3/4 transition-all duration-300"></div>
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative account-dropdown">
                  <Button
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-purple-500/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.fullName || 'Account'}</span>
                  </Button>
                  
                  {/* Account Dropdown */}
                  <AnimatePresence>
                    {isAccountMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 shadow-2xl z-50"
                      >
                        <div className="space-y-3">
                          <div className="pb-3 border-b border-purple-500/20">
                            <p className="text-white font-semibold">{user?.fullName}</p>
                            <p className="text-gray-400 text-sm">{user?.email}</p>
                          </div>
                          <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                              Profile Settings
                            </button>
                            <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                              Study History
                            </button>
                            <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                              Preferences
                            </button>
                            <div className="pt-2 border-t border-purple-500/20">
                              <button
                                onClick={() => {
                                  logout();
                                  setIsAccountMenuOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
                              >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/signin">
                    <Button 
                      variant="ghost" 
                      className="text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-purple-500/20 transition-all duration-300"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 hover:from-purple-500 hover:via-purple-400 hover:to-fuchsia-500 text-white font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 relative overflow-hidden group">
                      <span className="relative z-10">Get Started</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-purple-500/10 rounded-xl transition-all duration-300 border border-purple-500/20"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-gradient-to-br from-black via-purple-950/20 to-black border-l border-purple-500/20 z-50 md:hidden overflow-y-auto"
            >
              <div className="p-8">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 text-white p-2 hover:bg-purple-500/10 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col gap-6 mt-16">
                  {["Features", "How It Works", "About"].map((item, index) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                      className="text-left text-xl font-semibold text-white hover:text-purple-400 transition-colors py-3 border-b border-purple-500/10 hover:border-purple-500/30"
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>

                <div className="flex flex-col gap-4 mt-12">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="pb-4 border-b border-purple-500/20">
                        <p className="text-white font-semibold">{user?.fullName}</p>
                        <p className="text-gray-400 text-sm">{user?.email}</p>
                      </div>
                      <button className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                        Profile Settings
                      </button>
                      <button className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                        Study History
                      </button>
                      <button className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                        Preferences
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link to="/signin">
                        <Button variant="outline" className="w-full border-purple-500/30 text-white hover:bg-purple-500/10 hover:border-purple-500/50">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold shadow-lg shadow-purple-500/50">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
