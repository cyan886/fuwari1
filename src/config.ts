import type {
	ExpressiveCodeConfig,
	ImageFallbackConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
	UmamiConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Betsy Blog",
	subtitle: "分享网络技术、服务器部署、Unity开发、AI技术应用与原理",
	description: "分享网络技术、服务器部署、Unity开发、AI技术应用与原理、作者为流转星(Betsy)",

	keywords: [],
	lang: "zh_CN", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	themeColor: {
		hue: 361, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: true, // Hide the theme color picker for visitors
		forceDarkMode: true, // Force dark mode and hide theme switcher
	},
	banner: {
		enable: false,
		src: "/xinghui.avif", // Relative to the /src directory. Relative to the /public directory if it starts with '/'

		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "Pixiv @chokei", // Credit text to be displayed

			url: "https://image.cloudrunmax.top/random?type=img&dir=package", // (Optional) URL link to the original artwork or artist's page
		},
	},
	background: {
		enable: true, // Enable background image
		src: "https://image.cloudrunmax.top/random?type=img&dir=package", // 🎯 使用主力图床测试 fallback
		position: "center", // Background position: 'top', 'center', 'bottom'
		size: "cover", // Background size: 'cover', 'contain', 'auto'
		repeat: "no-repeat", // Background repeat: 'no-repeat', 'repeat', 'repeat-x', 'repeat-y'
		attachment: "fixed", // Background attachment: 'fixed', 'scroll', 'local'
		opacity: 0.5, // Background opacity (0-1)
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
			src: "https://image.cloudrunmax.top/file/CF/1756734381495_58fc963052f0a5cd8ce123b8d10c4a53.jpg", // Path of the favicon, relative to the /public directory
			//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
			//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		},
	],
	apps: [
		{
			name: "AI网站",
			url: "https://ai0728.com.cn/",
			image: "/favicon/openwebui.png",
			description: "智能对话与创作助手",
			external: true,
		},
		{
			name: "私人云盘",
			url: "https://cloudrunmax.top/",
			image: "/favicon/cloudreve.png",
			description: "内容管理入口",
			external: true,
		},
		{
			name: "私人图床",
			url: "https://image.cloudrunmax.top/",
			image: "/favicon/imagebed.png",
			description: "利用CloudflareR2搭建的私人图床",
			external: true,
		},
		{
			name: "私人AI绘图",
			url: "https://aiimage.cloudrunmax.top/",
			image: "/favicon/aiimage.png",
			description: "利用CloudflareWorker搭建的私人AI绘图",
			external: true,
		}
	]
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{ name: "应用", url: "/apps/", external: false },
		{
			name: "赞助",
			url: "/donate/", // Internal links should not include the base path, as it is automatically added
			external: false, // Show an external link icon and will open in a new tab
		},
		{
			name: "统计",
			url: "https://us.umami.is/share/Ly5RD4PNG2SJRx2i/www.micostar.tech", // External Umami share dashboard
			external: true, // Show an external link icon and will open in a new tab
		},
		{
			name: "状态",
			url: "https://stats.uptimerobot.com/nqCDcNPcUp", // UptimeRobot status page
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "https://image.cloudrunmax.top/file/CF/1756734381495_58fc963052f0a5cd8ce123b8d10c4a53.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "流转星(Betsy)",
	bio: "爱我所爱，我们是彼此永远的动力",
	links: [
		{
			name: "Bilibli",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/420378171",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Besty0728",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

//图片回退
export const imageFallbackConfig: ImageFallbackConfig = {
	enable: true,
	originalDomain: "image.cloudrunmax.top",           // 主力图床
	fallbackDomain: "images.ai0728.com.cn",         // R2备用图床
};

export const umamiConfig: UmamiConfig = {
	enable: true,
	baseUrl: "https://us.umami.is",
	shareId: "Ly5RD4PNG2SJRx2i",
	timezone: "Asia/Shanghai",
};

export const googleAnalyticsConfig = {
	enable: true,
	measurementId: "G-C7LN161H2G",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};