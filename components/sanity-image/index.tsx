'use client'
import Image from 'next/image'
import { urlFor } from './url'

interface SanityImageProps {
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
}

export default function SanityImage({ 
  source, 
  alt, 
  width, 
  height, 
  fill=false, 
  componentIndex=1,
  shadow=false,
  role='none',
  sizes='(max-width: 600px) 90vw, (max-width: 1200px) 60vw, 500px',
  className
}: SanityImageProps) {

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

  // Handle non-SVG images with the next/image component
  let imageUrlBuilder = urlFor(imageUrl)
    .width(width)
    .height(height)
    .dpr(2)
    .quality(100)
    .auto('format')
    .fit('crop');

  if (source.hotspot) {
    imageUrlBuilder = imageUrlBuilder.focalPoint(source.hotspot.x, source.hotspot.y);
  }

  const imageUrlOptimized = imageUrlBuilder.url();

  const blurUrl = urlFor(imageUrl)
    .width(20)
    .quality(20)
    .url();

  const priority = componentIndex === 0;
  const loading = componentIndex === 0 ? 'eager' : 'lazy';
  const widthProp = fill ? undefined : width;
  const heightProp = fill ? undefined : height;
  
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
      sizes={sizes}
    />
  );
}
