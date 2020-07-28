import React from 'react';
// import { Link } from '@shopify/polaris'; // LinkLikeComponentProps
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

interface Props extends Partial<LinkProps> {
	external?: boolean;
	ref?: any;
	url: string;
}

// copied from their docs:
// https://polaris.shopify.com/components/structure/app-provider#section-using-linkcomponent
export const Link = ({ children, url = '', external, ref, ...rest }: Props) => {
	// react-router only supports links to pages it can handle itself. It does not
	// support arbitrary links, so anything that is not a path-based link should
	// use a regular old `a` tag
	if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
		rest.target = '_blank';
		rest.rel = 'noopener noreferrer';
		return (
			<a href={url} {...rest}>
				{children}
			</a>
		);
	}

	return (
		<ReactRouterLink to={url} {...rest}>
			{children}
		</ReactRouterLink>
	);
};
