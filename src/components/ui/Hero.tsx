"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, FileText, Globe, Zap, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HeroSection() {
  const stats = [
    {
      icon: <FileText className="h-8 w-8 text-[#7B19D8]" />,
      value: "50+",
      label: "Content Templates",
      gradient: "from-purple-50 to-purple-100",
    },
    {
      icon: <Globe className="h-8 w-8 text-[#7B19D8]" />,
      value: "25+",
      label: "Languages Supported",
      gradient: "from-blue-50 to-indigo-100",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#7B19D8]" />,
      value: "10x",
      label: "Faster Creation",
      gradient: "from-yellow-50 to-orange-100",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-gray-50 to-[#faf5ff] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-1/4 top-1/3 h-[50vh] w-[50vw] rounded-full bg-gradient-to-r from-[#7B19D8]/20 via-[#AD5CFF]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-1/4 bottom-1/3 h-[60vh] w-[60vw] rounded-full bg-gradient-to-l from-[#AD5CFF]/20 via-[#7B19D8]/20 to-transparent blur-3xl"
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      </div>

      <div className="mx-auto max-w-7xl text-center relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="mb-8 flex justify-center"
        >
          <div className="group relative rounded-full px-6 py-2 text-sm font-semibold leading-6 text-[#7B19D8] ring-1 ring-[#7B19D8]/20 hover:ring-[#7B19D8]/40 transition-all duration-300 flex items-center gap-2 bg-white/50 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            AI-Powered Content Creation
            <div className="absolute -top-1 -right-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl md:text-8xl"
        >
          <span className="bg-gradient-to-r from-[#7B19D8] via-[#9b4dff] to-[#AD5CFF] bg-clip-text text-transparent animate-gradient">
            Generate Stellar Content
          </span>
          <br />
          <span className="relative inline-block">
            in Seconds
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-0 left-0 h-3 bg-gradient-to-r from-[#7B19D8]/20 to-[#AD5CFF]/20 rounded-full -z-10"
            />
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto"
        >
          Create blog posts, social media content, and marketing copy with our
          powerful AI tools. No writing skills required.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4"
        >
          <Link href="/dashboard">
            <Button className="group relative rounded-xl bg-gradient-to-r from-[#7B19D8] to-[#AD5CFF] hover:from-[#8b2be8] hover:to-[#bd6cff] px-8 py-6 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-[#7B19D8]/50 hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Start Creating - It's Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3.5}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7B19D8] to-[#AD5CFF] ring-2 ring-white flex items-center justify-center text-white text-xs font-bold"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span>Trusted by 10,000+ creators</span>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          custom={4}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index + 4}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative rounded-2xl bg-gradient-to-br ${stat.gradient} p-8 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-xl hover:ring-[#7B19D8]/30 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="rounded-xl bg-white p-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  className="text-4xl font-bold bg-gradient-to-r from-[#7B19D8] to-[#AD5CFF] bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.p>
                <p className="text-base font-semibold text-gray-700">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
}