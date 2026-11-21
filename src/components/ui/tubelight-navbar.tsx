import React, { useState } from "react"
import { m } from "framer-motion"
import { type LucideIcon, Home, User, Briefcase, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

export interface NavBarProps {
  items: NavItem[]
  className?: string
  activeTab?: string
  onTabChange?: (name: string, url: string) => void
  playClick?: () => void
  playType?: () => void
}

export function NavBar({
  items,
  className,
  activeTab: controlledActiveTab,
  onTabChange,
  playClick,
  playType,
}: NavBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(items[0]?.name || "")
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (playClick) playClick()
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(item.name)
    }
    if (onTabChange) {
      onTabChange(item.name, item.url)
    }
    if (item.url.startsWith("#")) {
      e.preventDefault()
      const target = document.querySelector(item.url)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <div className={cn("relative z-50", className)}>
      <div className="flex items-center gap-1 sm:gap-1.5 bg-[var(--hero-cream-badge-bg)] border border-[var(--hero-cream-border)] backdrop-blur-lg py-1 px-1.5 rounded-full shadow-lg transition-colors duration-300">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab.toLowerCase() === item.name.toLowerCase()

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleItemClick(e, item)}
              onMouseEnter={playType}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-medium px-3.5 sm:px-4 md:px-5 py-1.5 rounded-full transition-colors duration-300 flex items-center gap-1.5 select-none",
                "text-[var(--hero-cream-muted)] hover:text-[var(--hero-cream)]",
                isActive && "text-[var(--hero-cream)] font-semibold"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={16} strokeWidth={2.2} />
              </span>
              {isActive && (
                <m.div
                  layoutId="tubelight-lamp"
                  className="absolute inset-0 w-full bg-[var(--hero-cream)]/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                  }}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[var(--hero-cream)] rounded-t-full transition-colors duration-300">
                    <div className="absolute w-12 h-5 bg-[var(--hero-cream)]/30 rounded-full blur-md -top-2 -left-2 transition-colors duration-300" />
                    <div className="absolute w-8 h-5 bg-[var(--hero-cream)]/30 rounded-full blur-md -top-1 transition-colors duration-300" />
                    <div className="absolute w-4 h-3 bg-[var(--hero-cream)]/40 rounded-full blur-xs top-0 left-2 transition-colors duration-300" />
                  </div>
                </m.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'About', url: '#', icon: User },
    { name: 'Projects', url: '#', icon: Briefcase },
    { name: 'Resume', url: '#', icon: FileText }
  ]

  return <NavBar items={navItems} />
}
