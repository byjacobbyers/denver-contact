'use client'

import { motion } from "framer-motion"
import { AnnouncementType } from "@/types/documents/announcement-type"
import SimpleText from "@/components/simple-text"
import Route from "@/components/route"
import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { activeAnnouncementsQuery } from "@/sanity/queries/documents/announcement-query"


export default function Announcement() {
  const [announcement, setAnnouncement] = useState<AnnouncementType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]
        const data = await client.fetch(activeAnnouncementsQuery, { today })
        setAnnouncement(data)
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  if (isLoading || !announcement) {
    return null
  }

  const announcementContent = (
    <motion.div
      className='announcement relative z-40 bg-primary text-primary-foreground px-4 py-2 text-center'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SimpleText content={announcement.content} />
    </motion.div>
  )

  if (announcement.isClickable && announcement.route) {
    return (
      <Route data={announcement.route} className="block">
        {announcementContent}
      </Route>
    )
  }

  return announcementContent
}
