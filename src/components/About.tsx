import { motion } from "motion/react";
import { Github, Linkedin, Mail, Sparkles, Heart } from "lucide-react";

const team = [
  {
    name: "Husaamuddin Ahmed",
    role: "UG-2 CSE",
    bio: "Passionate about leveraging AI to create personalized learning journeys for students.",
    initials: "HA",
    gradient: "from-purple-600 to-fuchsia-600",
  },
  {
    name: "R Nishanth Reddy",
    role: "UG-2 AI & DS",
    bio: "Crafting delightful experiences that make learning feel effortless and fun.",
    initials: "NR",
    gradient: "from-fuchsia-600 to-pink-600",
  },
  {
    name: "Aadithya Mouli",
    role: "UG-2 CSE",
    bio: "Building scalable platforms that help students ace their exams.",
    initials: "AM",
    gradient: "from-violet-600 to-purple-600",
  },
];

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 backdrop-blur-xl mb-6">
            <Heart className="w-4 h-4 text-purple-400" fill="currentColor" />
            <span className="text-sm font-semibold text-purple-300 tracking-wide">
              MEET THE TEAM
            </span>
          </div>
          
          <h2 className="mb-6" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            <span className="block text-white">Built by Students,</span>
            <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              for Students
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make learning more interactive, efficient, and enjoyable. 
            <span className="text-purple-300 font-semibold"> AI should empower students</span> to learn better, not just faster.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative h-full bg-black/40 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-8 text-center hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-2">
                {/* Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 blur-xl`}></div>
                
                {/* Profile Image */}
                <div className="relative inline-block mb-6">
                  <div className={`absolute -inset-2 bg-gradient-to-br ${member.gradient} rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
                  <div className={`relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-500 bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                    <span className="text-5xl font-bold text-white">
                      {member.initials}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-400 border-4 border-black flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${member.gradient} mb-4`}>
                  <p className="text-sm font-semibold text-white">
                    {member.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-gray-400 leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3">
                  <button className="p-3 text-gray-400 hover:text-white bg-purple-500/0 hover:bg-purple-500/20 rounded-xl transition-all duration-300 border border-purple-500/0 hover:border-purple-500/30 group/btn">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-white bg-purple-500/0 hover:bg-purple-500/20 rounded-xl transition-all duration-300 border border-purple-500/0 hover:border-purple-500/30 group/btn">
                    <Github className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-white bg-purple-500/0 hover:bg-purple-500/20 rounded-xl transition-all duration-300 border border-purple-500/0 hover:border-purple-500/30 group/btn">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="relative inline-block max-w-3xl mx-auto">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
            
            {/* Card */}
            <div className="relative bg-black/40 backdrop-blur-2xl border border-purple-500/30 rounded-3xl p-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h3 className="text-3xl font-bold text-white">
                  Let's Connect!
                </h3>
              </div>
              
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                Have feedback, questions, or just want to say hi? We'd love to hear from you!
              </p>
              
              <button className="px-10 py-5 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 hover:from-purple-500 hover:via-purple-400 hover:to-fuchsia-500 text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3 group relative overflow-hidden text-lg">
                <span className="relative z-10 flex items-center gap-3">
                  <Mail className="w-6 h-6" />
                  Get in Touch
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
