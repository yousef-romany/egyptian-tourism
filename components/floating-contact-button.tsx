"use client"

import { useState } from "react"
import { MessageCircle, X, Phone, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-72 border-2 border-egyptian-gold/30"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-egyptian-gold" />
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/201234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 group"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">WhatsApp</div>
                  <div className="font-semibold">+20 123 456 7890</div>
                </div>
              </a>

              <a
                href="tel:+201234567890"
                className="flex items-center gap-3 p-3 rounded-lg bg-egyptian-gold hover:bg-egyptian-gold-dark text-black transition-colors duration-200 group"
              >
                <Phone className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Call Us</div>
                  <div className="font-semibold">+20 123 456 7890</div>
                </div>
              </a>

              <a
                href="mailto:info@wonderlandegypt.com"
                className="flex items-center gap-3 p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 group"
              >
                <Mail className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs opacity-90">Email Us</div>
                  <div className="font-semibold text-sm">info@wonderlandegypt.com</div>
                </div>
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Available 24/7 for your inquiries
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black shadow-2xl flex items-center justify-center transition-all duration-300 hover:shadow-egyptian-gold/50 group"
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse animation when closed */}
      {!isOpen && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full bg-egyptian-gold"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-egyptian-gold"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1,
            }}
          />
        </>
      )}
    </div>
  )
}
