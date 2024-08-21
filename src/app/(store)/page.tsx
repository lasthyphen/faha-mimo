import Image from "next/image";
import type { Metadata } from "next/types";
import { getTranslations } from "next-intl/server";
import * as Commerce from "commerce-kit";
import { ProductList } from "@/ui/products/productList";
import { CategoryBox } from "@/ui/CategoryBox";
import AccessoriesImage from "@/images/accessories.jpg";
import ApparelImage from "@/images/apparel.jpg";
import { YnsLink } from "@/ui/YnsLink";
import { env } from "@/env.mjs";

export const metadata = {
	alternates: { canonical: env.NEXT_PUBLIC_URL },
} satisfies Metadata;

export default async function Home() {
	const t = await getTranslations("/");

	const products = await Commerce.productBrowse({ first: 6 });

	return (
		<main>
			<section className="rounded bg-[url('https://tokens.dijets.io/hero-top-left.svg')] bg-[length:220px_220px] md:bg-[length:330px_330px] bg-no-repeat bg-neutral-100 py-8 sm:py-12">
				<div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
					<div className="max-w-md space-y-4">
						<h2 className="text-balance text-xl font-bold tracking-normal md:text-2xl">
							{t("hero.title")}
						</h2>
						<p className="text-pretty text-neutral-600">{t("hero.description")}</p>
						<YnsLink
							className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-none focus:ring-1 focus:ring-neutral-950"
							href={t("hero.link")}
						>
							{t("hero.action")}
						</YnsLink>
					</div>
					<Image
						alt="Cup of coffee"
						loading="eager"
						priority={true}
						className="rounded"
						height={450}
						width={450}
						src="https://tokens.dijets.io/sale.png"
						style={{
							objectFit: "cover",
						}}
					/>
				</div>
			</section>
			<ProductList products={products} />

			<section className="w-full py-8">
				<div className="grid gap-8 lg:grid-cols-2">
					{[
						{ categorySlug: "apparel", src: AccessoriesImage },
						{ categorySlug: "apparel", src: ApparelImage },
					].map(({ categorySlug, src }) => (
						<CategoryBox key={categorySlug} categorySlug={categorySlug} src={src} />
					))}
				</div>
			</section>
		</main>
	);
}
