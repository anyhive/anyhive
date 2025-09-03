"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@anyhive-kit/ui/components/nav-main"
import { NavUser } from "@anyhive-kit/ui/components/nav-user"
import { SiteSwitcher } from "@anyhive-kit/ui/components/site-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@anyhive-kit/ui/components/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Lawrence",
    email: "lawrence@anyhivekit.com",
    avatar: "L",
  },
  sites: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },

  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SiteSwitcher sites={data.sites} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
