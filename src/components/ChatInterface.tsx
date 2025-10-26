import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Copy, ThumbsUp, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  source?: {
    page: number;
    excerpt: string;
  };
}

const demoMessages: Message[] = [
  {
    id: "1",
    type: "user",
    content: "What is Ohm's Law and how does it relate to electrical circuits?",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "2",
    type: "ai",
    content: "Ohm's Law is a fundamental principle in electrical engineering that defines the relationship between voltage, current, and resistance. It states that V = I × R, where V is voltage in volts, I is current in amperes, and R is resistance in ohms.",
    timestamp: new Date(Date.now() - 295000),
    source: {
      page: 45,
      excerpt: "Ohm's Law defines the relationship between voltage, current, and resistance in an electrical circuit...",
    },
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "This is a demo AI response. In production, this would be powered by advanced AI analyzing your study materials to provide accurate, contextual answers with source references.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 backdrop-blur-xl mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300 tracking-wide">
              INTERACTIVE AI CHAT
            </span>
          </div>
          
          <h2 className="mb-6" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            <span className="block text-white">Chat With Your</span>
            <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              Study Materials
            </span>
          </h2>
          
          <p className="text-xl text-gray-400">
            Ask anything. Get instant, accurate answers with sources.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-black/40 backdrop-blur-2xl border border-purple-500/20 rounded-3xl overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-purple-600/10 border-b border-purple-500/20 px-8 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-fuchsia-600 rounded-xl blur-lg opacity-60"></div>
                    <div className="relative bg-gradient-to-tr from-purple-600 to-fuchsia-600 p-3 rounded-xl">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">AI Study Assistant</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                      <span className="text-sm text-gray-400">Online & Ready</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <Zap className="w-4 h-4 text-purple-400" fill="currentColor" />
                  <span className="text-sm font-semibold text-purple-300">Instant Answers</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="h-[500px] p-8" ref={scrollRef}>
              <div className="space-y-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] ${message.type === "user" ? "max-w-[70%]" : ""}`}>
                        {/* Message Bubble */}
                        <div
                          className={`rounded-2xl p-5 ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30"
                              : "bg-black/60 backdrop-blur-xl text-gray-100 border border-purple-500/20"
                          }`}
                          style={{ fontSize: '1.0625rem', lineHeight: '1.6' }}
                        >
                          <p>{message.content}</p>
                        </div>

                        {/* Timestamp */}
                        <div className={`flex items-center gap-2 mt-2 text-xs text-gray-500 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                          <span>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>

                        {/* Source Card for AI messages */}
                        {message.type === "ai" && message.source && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 bg-black/60 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/40 transition-all group cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">📄</span>
                                  </div>
                                  <span className="text-sm font-semibold text-purple-400">
                                    Page {message.source.page}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                  {message.source.excerpt}
                                </p>
                              </div>
                              <button className="text-purple-400 hover:text-purple-300 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-purple-500/10 rounded-lg">
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* AI message actions */}
                        {message.type === "ai" && (
                          <div className="flex items-center gap-2 mt-3">
                            <button className="text-gray-500 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-purple-500/10 group">
                              <ThumbsUp className="w-4 h-4 group-hover:fill-purple-400" />
                            </button>
                            <button className="text-gray-500 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-purple-500/10">
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="flex justify-start"
                  >
                    <div className="bg-black/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl px-6 py-4">
                      <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2.5 h-2.5 bg-purple-400 rounded-full"
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="bg-gradient-to-r from-purple-950/20 via-fuchsia-950/20 to-purple-950/20 border-t border-purple-500/20 p-6">
              <div className="flex items-end gap-4">
                <div className="flex-1 relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything about your study materials..."
                    rows={1}
                    className="w-full bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none max-h-32"
                    style={{ fontSize: '1.0625rem', minHeight: "56px" }}
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 hover:from-purple-500 hover:via-purple-400 hover:to-fuchsia-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 relative overflow-hidden group"
                  style={{ height: '56px', width: '56px', padding: '0' }}
                >
                  <Send className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
