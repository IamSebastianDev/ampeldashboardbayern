/** @format */

import React, { useRef } from 'react';
import { useClickInside } from '../../hooks/useClickInside.hook.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.hook';
import { joinClassNames as cls } from '../../scripts/joinClassNames.util.js';

import { InternalLink } from './InternalLink';
import { ExternalLink } from './ExternalLink';
import { NavItem } from './NavItem.js';

export const MobileNav = ({ toggleNav, showNav }) => {
	/**
	 * @todo: ref targets the ul instead of the link itself. The nav should only close if a link was clicked
	 * successfully.
	 */

	const prefersReducedMotion = useReducedMotion();
	const navRef = useRef();
	useClickInside(navRef, toggleNav, 'a');

	return (
		<nav
			className={cls(
				'fixed top-0 left-0 w-screen h-screen dark:bg-zinc-900 bg-zinc-200 flex flex-col justify-center items-center text-4xl transform  -z-10 md:hidden duration-700 ease-in-out',
				showNav
					? 'translate-y-0 opacity-100'
					: '-translate-y-full opacity-0',
				prefersReducedMotion
					? 'transition-opacity'
					: 'transition-transopaque'
			)}>
			<ul
				ref={navRef}
				className="flex flex-col justify-center items-center h-1/3">
				<NavItem>
					<InternalLink className="py-8" to="/">
						Dashboard
					</InternalLink>
				</NavItem>
				<NavItem className="py-8">
					<ExternalLink href="https://github.com/iamsebastiandev/krankenhausampelbayern.de/">
						API
					</ExternalLink>
				</NavItem>
				<NavItem>
					<ExternalLink
						className="py-8"
						href="https://github.com/IamSebastianDev/Covid-19-Widget">
						Widget <span className="text-xs self-end">für iOs</span>
					</ExternalLink>
				</NavItem>
			</ul>
		</nav>
	);
};
