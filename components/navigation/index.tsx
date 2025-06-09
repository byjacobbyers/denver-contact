'use client'

// Tools
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Types
import { NavigationType } from "@/types/documents/navigation-type"
import { RouteType } from "@/types/objects/route-type"

// Components
import Route from "@/components/route"

interface NavProps {
  data: NavigationType
}

const Nav: React.FC<NavProps> = ({
  data
}) => {

  return (
    <NavigationMenu>
			<NavigationMenuList className='flex flex-wrap gap-2 lg:gap-6'>
        {data.items?.map((item: RouteType, index: number) => (
          <NavigationMenuItem key={`header-${index}`}>
            <Route data={item}>
              <motion.div
                initial={{ 
                  scale: 1
                }}
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ 
                  scale: 0.95
                }}
                transition={{ 
                  type: 'spring',
                  duration: 0.5
                }}
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  "text-lg lg:text-xl"
                )}
              >
                {item.title || 'Needs title'}
              </motion.div>
            </Route>
          </NavigationMenuItem>
        ))}

      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Nav