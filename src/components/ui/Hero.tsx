"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, FileText, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

export default function HeroSection() {
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      className="relative isolate overflow-hidden bg-gradient-to-b from-gray-50 to-[#faf5ff] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute left-1/2 top-0 h-[50vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#7B19D8]/10 to-[#AD5CFF]/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute left-0 top-1/2 h-[50vh] w-[30vw] rounded-full bg-[#7B19D8]/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.9 }}
          className="absolute right-0 bottom-0 h-[40vh] w-[30vw] rounded-full bg-[#AD5CFF]/10 blur-3xl"
        />
      </div>

      <motion.div 
        variants={container}
        className="mx-auto max-w-7xl text-center"
      >
        {/* Animated badge */}
        <motion.div variants={item} className="mb-8 flex justify-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative rounded-full px-4 py-2 text-sm leading-6 text-[#7B19D8] ring-1 ring-[#7B19D8]/10 hover:ring-[#7B19D8]/20 flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Content Creation
          </motion.div>
        </motion.div>

        {/* Animated heading */}
        <motion.h1 
          variants={item}
          className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl"
        >
          <motion.span 
            initial={{ backgroundPosition: "0%" }}
            animate={{ backgroundPosition: "100%" }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
            className="bg-gradient-to-r from-[#7B19D8] to-[#AD5CFF] bg-clip-text text-transparent bg-[length:200%_auto]"
          >
            Generate Stellar Content
          </motion.span>
          <br />
          <motion.span variants={item}>in Seconds</motion.span>
        </motion.h1>

        {/* Animated paragraph */}
        <motion.p 
          variants={item}
          className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto"
        >
          Create blog posts, social media content, and marketing copy with our
          powerful AI tools. No writing skills required.
        </motion.p>

        {/* Animated CTA Buttons */}
        <motion.div 
          variants={container}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <motion.div variants={item}>
            <Link href="/dashboard">
              <Button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-[#7B19D8] hover:bg-[#6a14c0] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-[#7B19D8]/40"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating - It's Free
              </Button>
            </Link>
          </motion.div>
         
        </motion.div>

        {/* Animated Stats grid */}
        <motion.div 
          variants={fadeIn}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto"
        >
          {[
            {
              icon: <FileText className="h-8 w-8 text-[#7B19D8]" />,
              value: "10+",
              label: "Content Templates",
            },
            {
              icon: <Globe className="h-8 w-8 text-[#7B19D8]" />,
              value: "10+",
              label: "Languages Supported",
            },
            {
              icon: <Zap className="h-8 w-8 text-[#7B19D8]" />,
              value: "10x",
              label: "Faster Creation",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md hover:ring-[#7B19D8]/30"
            >
              <div className="flex flex-col items-center gap-3">
                <motion.div 
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="rounded-lg bg-[#7B19D8]/10 p-3"
                >
                  {stat.icon}
                </motion.div>
                <p className="text-3xl font-bold text-[#7B19D8]">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}