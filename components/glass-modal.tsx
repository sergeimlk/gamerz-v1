"use client"

import type React from "react"
import { useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/theme-context"

interface GlassModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  theme?: "light" | "dark"
}

export const GlassModal: React.FC<GlassModalProps> = ({ isOpen, onClose, title, children, theme: propTheme }) => {
  const { theme: contextTheme } = useTheme()
  const theme = propTheme || contextTheme

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm",
            theme === "light" ? "bg-black/10" : "bg-black/50",
          )}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={cn(
              "relative w-full max-w-lg rounded-lg shadow-lg overflow-hidden backdrop-blur-xl border",
              theme === "light"
                ? "bg-white/90 text-gray-800 border-gray-200"
                : "bg-gray-900/90 text-white border-gray-700",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={cn(
                  "absolute top-4 right-4 hover:text-red-500 transition-colors",
                  theme === "light" ? "text-gray-600" : "text-white/70",
                )}
              >
                <X className="h-6 w-6" />
              </motion.button>
              <h2 className={cn("text-2xl font-bold mb-4", theme === "light" ? "text-gray-900" : "text-white")}>
                {title}
              </h2>
              <div className={theme === "light" ? "text-gray-700" : "text-white/90"}>{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

