'use client'
import Image from 'next/image'
import Logo from '@/public/favicon.png'

const OhmniIcon = () => {
	return <Image src={Logo.src} alt='Ohmni LLC' width={24} height={24} />
}

export default OhmniIcon
