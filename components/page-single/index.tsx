// Tools
import { SanityDocument } from "next-sanity"

// Components
import Sections from "@/components/sections"


// Stop Caching
export const fetchCache = 'force-no-store';



export default function Page({ page }: { page: SanityDocument }) {

  const { sections } = page

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-24 pb-12 lg:pb-24">
      <Sections body={sections} />
    </main>
  )
}