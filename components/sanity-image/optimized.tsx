'use client'
import Image from 'next/image'
import { urlFor } from './url'

interface OptimizedSanityImageProps {
  source: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          aspectRatio: number
          height: number
          width: number
        }
      }
    }
    hotspot?: {
      x: number
      y: number
    }
  }
  alt: string
  width: number
  height: number
  shadow?: boolean
  fill?: boolean
  componentIndex?: number
  role?: string
  sizes?: string
  className?: string
  priority?: boolean
}

export default function OptimizedSanityImage({ 
  source, 
  alt, 
  width, 
  height, 
  fill=false, 
  componentIndex=1,
  shadow=false,
  role='none',
  sizes,
  className,
  priority: propPriority
}: OptimizedSanityImageProps) {

  const imageUrl = source.asset.url;

  // Check if the image is an SVG
  const isSvg = imageUrl.endsWith('.svg');

  if (isSvg) {
    // Return a simple <img> element for SVGs
    return (
      <img 
        className={className}
        src={imageUrl}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        role={role}
        style={{ width: fill ? '100%' : undefined, height: fill ? '100%' : undefined }}
      />
    );
  }

  // Calculate optimal dimensions for high-DPI displays
  const baseWidth = width;
  const baseHeight = height;
  
  // For large screens, we want to provide higher resolution images
  const isLargeImage = baseWidth >= 1920;
  const targetWidth = isLargeImage ? Math.round(baseWidth * 1.5) : baseWidth;
  const targetHeight = isLargeImage ? Math.round(baseHeight * 1.5) : baseHeight;

  // Handle non-SVG images with the next/image component
  let imageUrlBuilder = urlFor(imageUrl)
    .width(targetWidth)
    .height(targetHeight)
    .dpr(3) // High DPR for crisp images on high-DPI displays
    .quality(95) // Optimal quality for performance vs visual quality
    .auto('format')
    .fit('crop');

  if (source.hotspot) {
    imageUrlBuilder = imageUrlBuilder.focalPoint(source.hotspot.x, source.hotspot.y);
  }

  const imageUrlOptimized = imageUrlBuilder.url();

  // Generate blur placeholder
  const blurUrl = urlFor(imageUrl)
    .width(40) // Slightly larger blur for better quality
    .quality(30)
    .url();

  // Determine priority loading
  const priority = propPriority !== undefined ? propPriority : componentIndex === 0;
  const loading = priority ? 'eager' : 'lazy';
  
  // Calculate optimal sizes for responsive images
  const defaultSizes = isLargeImage 
    ? '(max-width: 600px) 90vw, (max-width: 1200px) 70vw, (max-width: 1920px) 85vw, 1400px'
    : '(max-width: 600px) 90vw, (max-width: 1200px) 60vw, (max-width: 1920px) 80vw, 1200px';
  
  const finalSizes = sizes || defaultSizes;
  
  const widthProp = fill ? undefined : baseWidth;
  const heightProp = fill ? undefined : baseHeight;
  
  return (
    <Image
      className={`${shadow && 'drop-shadow-lg'} ${className}`}
      src={imageUrlOptimized}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurUrl}
      width={widthProp}
      height={heightProp}
      fill={fill}
      priority={priority}
      loading={loading}
      role={role}
      sizes={finalSizes}
    />
  );
}
