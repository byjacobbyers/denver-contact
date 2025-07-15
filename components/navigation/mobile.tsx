'use client'

// Tools
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

// Types
import { NavigationType } from "@/types/documents/navigation-type"
import { RouteType } from "@/types/objects/route-type"

// Components
import Route from "@/components/route"

interface NavProps {
  data: NavigationType
  closeMenu: () => void
}

const MobileNav: React.FC<NavProps> = ({
  data,
  closeMenu
}) => {

  const handleItemClick = () => {
    closeMenu();
  };

  return (
    <NavigationMenu className='w-full max-w-none mobile-menu'>
      <NavigationMenuList className='w-full flex flex-col p-0 gap-y-5'>
        {data.items?.map((item: RouteType, index: number) => (
          <NavigationMenuItem 
            key={'header' + index}
            id={'header' + index}
            className="w-full"
            onClick={handleItemClick}
          >
            <Route data={item} className='flex w-full justify-center text-2xl' >
              {item.title ? item.title : 'Needs title'}
            </Route>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MobileNav
