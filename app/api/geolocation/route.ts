import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip')
    
    if (!ip) {
      return NextResponse.json(
        { error: 'Could not determine IP address' },
        { status: 400 }
      )
    }
    
    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.reason || 'Failed to fetch geolocation data')
    }
    
    return NextResponse.json({
      country: data.country_name,
      region: data.region,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude
    })
  } catch (error) {
    console.error('Geolocation error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch geolocation data' },
      { status: 500 }
    )
  }
} 