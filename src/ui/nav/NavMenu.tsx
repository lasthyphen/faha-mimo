"use client";

import * as React from "react";

// TODO https://github.com/radix-ui/primitives/issues/2769

import { useState, type ComponentPropsWithRef, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/ui/shadcn/navigation-menu";
import { YnsLink } from "@/ui/YnsLink";

const links = [
	{
		title: "About Faha",
		href: "#",
		description: "Learn more about Faha Couture",
	},
	{
		title: "Current Deals",
		href: "#",
		description: "Active Deals at Faha Store",
	},
];

export function NavMenu() {
	const [value, setValue] = useState<string | undefined>(undefined);
	return (
		<NavigationMenu value={value} onValueChange={setValue}>
			<NavigationMenuList>
				<NavigationMenuItem value="shop">
					<NavigationMenuTriggerWithFixedUX
						onKeyboardOpen={() => setValue((value) => (value === "shop" ? undefined : "shop"))}
					>
						Shop
					</NavigationMenuTriggerWithFixedUX>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 w-[260px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
							<li className="row-span-3  bg-gradient-to-b from-muted/50 to-muted">
								<NavigationMenuLink asChild>
									<YnsLink
										className="flex h-[160px] w-[230px] md:h-full md:w-full select-none flex-col justify-end rounded-md bg-[url('https://tokens.dijets.io/faha-menu-2.svg')] md:bg-contain bg-cover bg-no-repeat p-6 no-underline outline-none focus:shadow-md"
										href="/"
									>
										<p className="leading-tight text-muted-foreground opacity-0 md:opacity-100">
											Your Fashion Retailer
										</p>
									</YnsLink>
								</NavigationMenuLink>
							</li>
							<ListItem href="/products" title="Fashion">
								Access all the Faha products.
							</ListItem>
							<ListItem href="/category/apparel" title="Apparel">
								All apparel products in our store.
							</ListItem>
							<ListItem href="/products" title="Accessories">
								All accessories products in our store.
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem value="about">
					<NavigationMenuTriggerWithFixedUX
						onKeyboardOpen={() => setValue((value) => (value === "about" ? undefined : "about"))}
					>
						About
					</NavigationMenuTriggerWithFixedUX>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] xl:w-[600px]">
							{links.map((link) => (
								<ListItem key={link.title} title={link.title} href={link.href} target="_blank">
									{link.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<div className="my-0 !mr-4 w-[1px] self-stretch bg-[#d8ccaf]" />
				<NavigationMenuItem value="instagram">
					<a href="https://www.instagram.com/faha.couture/" target="_blank">
				<svg
      className="icon icon--instagram"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.722 17.347c-.024 0-.024 0 0 0L4.102 17.3c-1.765 0-3.178-1.436-3.178-3.202L.97 4.232c0-1.742 1.436-3.155 3.179-3.155h.023l10.62.047c.847 0 1.647.33 2.236.942.589.612.918 1.413.918 2.26l-.047 9.866c0 .848-.33 1.648-.941 2.237a3.235 3.235 0 01-2.237.918zM4.15 1.783a2.472 2.472 0 00-2.473 2.473l-.047 9.842a2.472 2.472 0 002.473 2.472l10.619.047c.659 0 1.271-.259 1.742-.706.47-.471.73-1.083.73-1.743l.047-9.865c0-.66-.259-1.272-.706-1.743a2.44 2.44 0 00-1.743-.73L4.15 1.783zm5.274 11.89A4.472 4.472 0 014.95 9.2a4.472 4.472 0 014.474-4.474A4.472 4.472 0 0113.898 9.2a4.472 4.472 0 01-4.474 4.474zm0-8.24A3.778 3.778 0 005.657 9.2a3.778 3.778 0 003.767 3.768A3.778 3.778 0 0013.19 9.2a3.763 3.763 0 00-3.767-3.767zm4.497-.236a.87.87 0 01-.871-.87c0-.472.4-.872.871-.872s.871.4.871.871-.4.871-.87.871zm0-1.271c-.212 0-.4.188-.4.4 0 .212.188.4.4.4.212 0 .4-.188.4-.4 0-.212-.188-.4-.4-.4z"
        fill="currentColor"
      />
    </svg>
	</a>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = ({
	className,
	title,
	children,
	href,
	ref,
	...props
}: ComponentPropsWithRef<"a">) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<YnsLink
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
					href={href ?? "#"}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
				</YnsLink>
			</NavigationMenuLink>
		</li>
	);
};

const NavigationMenuTriggerWithFixedUX = ({
	onKeyboardOpen,
	...props
}: React.ComponentProps<typeof NavigationMenuTrigger> & {
	onKeyboardOpen?: (e: KeyboardEvent | PointerEvent) => void;
}) => {
	return (
		<NavigationMenuTrigger
			{...props}
			onClick={(e) => {
				// the menu should open on click on touch screens
				// in some browsers onClick can be triggered by PointerEvent
				if (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType !== "mouse") {
					return;
				}
				// prevent the default behavior for mouse users
				e.preventDefault();
			}}
			// the menu should open on click on touch screens
			onPointerDown={(e) => onKeyboardOpen?.(e)}
			onKeyDown={(e) => {
				// reimplement the default behavior for keyboard users
				if (e.key === "Enter" || e.key === " ") {
					return onKeyboardOpen?.(e);
				}
			}}
		/>
	);
};
