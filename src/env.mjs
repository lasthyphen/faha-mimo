// @ts-check

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		STRIPE_SECRET_KEY: z.string(),
		STRIPE_CURRENCY: z.string(),
		STRIPE_WEBHOOK_SECRET: z.string().optional(),

		ENABLE_STRIPE_TAX: z
			.string()
			.optional()
			.transform((str) => !!str),
	},
	client: {
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
		NEXT_PUBLIC_URL: z.string().url(),

		NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional(),

		NEXT_PUBLIC_NEWSLETTER_ENDPOINT: z.string().optional(),

		NEXT_PUBLIC_LANGUAGE: z.string().optional().default("en"),
	},
	runtimeEnv: {
		STRIPE_SECRET_KEY:
			"sk_test_51Pq4dAF1uYmeDdYBfiOVmHvj2uPspd8MCCpdNz5LA0E5vOrVnIWaFgtMx73GqPnJtDlE42UXNPZ0DSt6MNh0dzt000uavQfKXw",
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		STRIPE_CURRENCY: process.env.STRIPE_CURRENCY,

		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
			"pk_test_51Pq4dAF1uYmeDdYBHS9WQZkFj4fXnIaN1TtUcWzs2MZ0KVfqaGTQP63ZAhl1bu1M2l5t7YS9ffLlQ4Xijg9DhLBX00S6QHU69H",
		NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
		NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
		NEXT_PUBLIC_NEWSLETTER_ENDPOINT: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT,

		ENABLE_STRIPE_TAX: process.env.ENABLE_STRIPE_TAX,

		NEXT_PUBLIC_LANGUAGE: process.env.NEXT_PUBLIC_LANGUAGE,
	},
});
