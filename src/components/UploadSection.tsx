import { useState } from "react";
import { Upload, FileText, X, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: "uploading" | "success" | "error";
  progress: number;
}

export function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: formatFileSize(file.size),
      status: "uploading",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...uploadedFiles]);

    uploadedFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: "success", progress: 100 } : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress } : f))
        );
      }
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px]"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 backdrop-blur-xl mb-6">
            <Upload className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300 tracking-wide">
              UPLOAD & LEARN
            </span>
          </div>
          
          <h2 className="mb-6" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            <span className="block text-white">Drop Your Study</span>
            <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              Materials Here
            </span>
          </h2>
          
          <p className="text-xl text-gray-400">
            PDF, Word, TXT • Up to 50MB • Instant processing
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-500 ${
              isDragging
                ? "border-purple-500 bg-purple-500/10 scale-[1.02]"
                : "border-purple-500/30 bg-black/20 hover:border-purple-500/50 hover:bg-black/30"
            }`}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-purple-600/10 transition-opacity duration-500 ${isDragging ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>

            <div className="relative z-10">
              {/* Upload Icon */}
              <motion.div
                animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl blur-2xl transition-opacity duration-500 ${isDragging ? 'opacity-70' : 'opacity-40'}`}></div>
                  <div className="relative bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 p-8 rounded-3xl border border-purple-500/30 backdrop-blur-xl">
                    <Upload className="w-16 h-16 text-purple-400" strokeWidth={2} />
                  </div>
                </div>
              </motion.div>

              {/* Text */}
              <h3 className="text-3xl font-bold text-white mb-4">
                {isDragging ? "Drop files here!" : "Drag & drop files"}
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                or click the button below to browse
              </p>

              {/* Upload Button */}
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt"
              />
              <label htmlFor="file-upload">
                <Button
                  type="button"
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 hover:from-purple-500 hover:via-purple-400 hover:to-fuchsia-500 text-white font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  style={{ height: '3.5rem', padding: '0 2.5rem', fontSize: '1.0625rem' }}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Choose Files
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </label>

              <p className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI-powered instant processing</span>
              </p>
            </div>
          </div>

          {/* Uploaded Files List */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 space-y-4"
              >
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-black/40 backdrop-blur-2xl border border-purple-500/20 rounded-2xl p-5 hover:border-purple-500/40 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      {/* File Icon */}
                      <div className="bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 p-4 rounded-xl border border-purple-500/30">
                        <FileText className="w-6 h-6 text-purple-400" />
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-white font-semibold truncate text-lg">
                            {file.name}
                          </p>
                          <div className="flex items-center gap-3 ml-4">
                            {file.status === "uploading" && (
                              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                            )}
                            {file.status === "success" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              >
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                              </motion.div>
                            )}
                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-gray-400 hover:text-red-400 transition-colors p-1 hover:bg-red-500/10 rounded-lg"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-400">{file.size}</span>
                          {file.status === "uploading" && (
                            <>
                              <div className="flex-1">
                                <Progress value={file.progress} className="h-2" />
                              </div>
                              <span className="text-sm font-semibold text-purple-400 min-w-[3rem] text-right">
                                {Math.round(file.progress)}%
                              </span>
                            </>
                          )}
                          {file.status === "success" && (
                            <span className="text-sm font-semibold text-green-400">
                              ✓ Ready to study
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
