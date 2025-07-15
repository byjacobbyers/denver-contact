import { LazyMotion, domAnimation, m } from 'framer-motion'

interface MenuButtonProps {
	onClick: () => void
	isOpen: boolean
	defaultColor: string
}

const MenuButton: React.FC<MenuButtonProps> = ({
	onClick,
	isOpen,
	defaultColor,
}) => {
	return (
		<LazyMotion features={domAnimation}>
			<m.button
				className='z-50 flex h-8 w-8 flex-col items-center  justify-center gap-y-[6px]'
				onClick={onClick}
				animate={isOpen ? 'open' : 'closed'}
				initial={false}
			>
				<m.svg width='30' height='30'>
					<m.rect
						width='24'
						height='4'
						initial={'closed'}
						animate={isOpen ? 'open' : 'closed'}
						transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
						variants={{
							closed: {
								rotate: 0,
								y: 11,
								x: 3,
								fill: defaultColor,
							},
							open: {
								rotate: 45,
								y: 15,
								x: 3,
								fill: '#020817',
							},
						}}
					/>
					<m.rect
						width='24'
						height='4'
						initial={'closed'}
						animate={isOpen ? 'open' : 'closed'}
						transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
						variants={{
							closed: {
								rotate: 0,
								y: 19,
								x: 3,
								fill: defaultColor,
							},
							open: {
								rotate: -45,
								y: 15,
								x: 3,
								fill: '#020817',
							},
						}}
					/>
				</m.svg>
			</m.button>
		</LazyMotion>
	)
}

export default MenuButton
