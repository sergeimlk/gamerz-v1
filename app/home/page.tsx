"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, Activity, Star, ArrowLeft } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <div className={cn("min-h-screen p-8", theme === "light" ? "bg-gray-50 text-gray-900" : "bg-black text-white")}>
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full",
              theme === "light" ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
            )}
            asChild
          >
            <Link href="/dashboard" title="Retour au dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="text-red-500">GamerPro99</span>!
            </h1>
            <p className={theme === "light" ? "text-gray-600" : "text-zinc-400"}>
              Here's what's happening in your gaming world.
            </p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<MessageSquare className="h-6 w-6" />} title="Active Chats" value="5" theme={theme} />
        <StatCard icon={<Users className="h-6 w-6" />} title="Online Friends" value="12" theme={theme} />
        <StatCard icon={<Activity className="h-6 w-6" />} title="Recent Games" value="8" theme={theme} />
        <StatCard icon={<Star className="h-6 w-6" />} title="Achievements" value="23" theme={theme} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card
          className={cn("col-span-2", theme === "light" ? "bg-white border-gray-200" : "bg-zinc-900 border-zinc-800")}
        >
          <CardHeader>
            <CardTitle className={theme === "light" ? "text-gray-900" : "text-white"}>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                    <AvatarFallback
                      className={theme === "light" ? "bg-gray-200 text-gray-700" : "bg-zinc-700 text-zinc-300"}
                    >
                      UN
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className={cn("text-sm font-medium", theme === "light" ? "text-gray-900" : "text-white")}>
                      User{index + 1} joined the Valorant salon
                    </p>
                    <p className={theme === "light" ? "text-xs text-gray-500" : "text-xs text-zinc-400"}>2 hours ago</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className={theme === "light" ? "bg-white border-gray-200" : "bg-zinc-900 border-zinc-800"}>
          <CardHeader>
            <CardTitle className={theme === "light" ? "text-gray-900" : "text-white"}>Popular Salons</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {["Valorant", "Minecraft", "Apex Legends"].map((salon, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      theme === "light"
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                    )}
                    asChild
                  >
                    <Link href={`/dashboard?salon=${salon.toLowerCase().replace(" ", "-")}`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {salon}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  theme,
}: {
  icon: React.ReactNode
  title: string
  value: string
  theme: "light" | "dark"
}) {
  return (
    <Card className={theme === "light" ? "bg-white border-gray-200" : "bg-zinc-900 border-zinc-800"}>
      <CardContent className="flex items-center p-6">
        <div className={theme === "light" ? "bg-red-50 p-3 rounded-full mr-4" : "bg-red-500/10 p-3 rounded-full mr-4"}>
          {icon}
        </div>
        <div>
          <p className={theme === "light" ? "text-sm font-medium text-gray-500" : "text-sm font-medium text-zinc-400"}>
            {title}
          </p>
          <p className={theme === "light" ? "text-2xl font-bold text-gray-900" : "text-2xl font-bold text-white"}>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

