'use client'

// Types
import { DividerBlockType } from "@/types/components/divider-block-type"

const DividerBlock: React.FC<DividerBlockType> = ({
  active,
  componentIndex,
  anchor,
  size = "zero",
}) => {
  if (!active) return null

  // Determine padding classes based on size
  const paddingClasses = {
    zero: "py-0",
    small: "py-6 lg:py-12",
    medium: "py-12 lg:py-24",
    large: "py-24 lg:py-48",
  }

  return (
    <section
      id={`${anchor ? anchor : "divider-block-" + componentIndex}`}
      className={`divider-block w-full flex justify-center px-5 ${paddingClasses[size]}`}
    >
      <div className="container" >
        <hr className="border-t-2 border-black" />
      </div>
    </section>
  )
}

export default DividerBlock