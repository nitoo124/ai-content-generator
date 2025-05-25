"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, FileText, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

export default function HeroSection() {
  const stats = [
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
  ];

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-gray-50 to-[#faf5ff] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[50vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#7B19D8]/10 to-[#AD5CFF]/10 blur-3xl" />
        <div className="absolute left-0 top-1/2 h-[50vh] w-[30vw] rounded-full bg-[#7B19D8]/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[40vh] w-[30vw] rounded-full bg-[#AD5CFF]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="mb-8 flex justify-center"
        >
          <div className="relative rounded-full px-4 py-2 text-sm leading-6 text-[#7B19D8] ring-1 ring-[#7B19D8]/10 hover:ring-[#7B19D8]/20 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI-Powered Content Creation
          </div>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl"
        >
          <span className="bg-gradient-to-r from-[#7B19D8] to-[#AD5CFF] bg-clip-text text-transparent">
            Generate Stellar Content
          </span>
          <br />
          in Seconds
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto"
        >
          Create blog posts, social media content, and marketing copy with our
          powerful AI tools. No writing skills required.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <Link href="/dashboard">
            <Button className="rounded-xl bg-[#7B19D8] hover:bg-[#6a14c0] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-[#7B19D8]/40">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Creating - It's Free
            </Button>
          </Link>
     
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md hover:ring-[#7B19D8]/30"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-lg bg-[#7B19D8]/10 p-3">{stat.icon}</div>
                <p className="text-3xl font-bold text-[#7B19D8]">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
