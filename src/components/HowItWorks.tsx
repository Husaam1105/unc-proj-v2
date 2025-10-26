import { Upload, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Materials",
    description: "Drag and drop PDFs, documents, or notes. Our AI processes and understands your content instantly.",
    gradient: "from-purple-600 via-purple-500 to-fuchsia-600",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Ask Questions",
    description: "Chat naturally like texting a friend. Our AI understands context and finds exact answers.",
    gradient: "from-fuchsia-600 via-pink-500 to-purple-600",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Learn Faster",
    description: "Get instant answers with source references and page numbers. Study smarter, not harder.",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-600",
  },
];

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/5 via-fuchsia-950/10 to-purple-950/5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px]"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 backdrop-blur-xl mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300 tracking-wide">
              HOW IT WORKS
            </span>
          </div>
          
          <h2 className="mb-6" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            <span className="block text-white">Start Learning in</span>
            <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            It's so easy, you'll be studying smarter in under a minute
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-24 left-[16.666%] right-[16.666%] h-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative h-full bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500/40 transition-all duration-500 hover:transform hover:-translate-y-2">
                  {/* Gradient Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 blur-xl`}></div>
                  
                  {/* Number Badge */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-black border-2 border-purple-500/30 flex items-center justify-center">
                      <span className="text-sm font-bold bg-gradient-to-br from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Bottom Indicator */}
                  <div className={`h-1 bg-gradient-to-r ${step.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100`}></div>
                </div>

                {/* Arrow Indicator (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-8 z-10">
                    <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-xl border border-purple-500/30 flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <p className="text-gray-400 text-lg">Ready to ace your next exam?</p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 hover:from-purple-500 hover:via-purple-400 hover:to-fuchsia-500 text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Start Learning Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
