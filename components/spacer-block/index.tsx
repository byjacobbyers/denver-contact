'use client'

// Types
import { SpacerBlockType } from "@/types/components/spacer-block-type"

const SpacerBlock: React.FC<SpacerBlockType> = ({
  active,
  componentIndex,
  anchor,
  size = "medium", // Default to "medium" if size is not provided
}) => {
  if (!active) return null

  // Determine padding classes based on size
  const paddingClasses = {
    small: "py-6 lg:py-12",
    medium: "py-12 lg:py-24",
    large: "py-24 lg:py-48",
  }

  return (
    <section
      id={`${anchor ? anchor : "spacer-block-" + componentIndex}`}
      className={`spacer-block w-full ${paddingClasses[size]}`}
    />
  )
}

export default SpacerBlock