export const live = { writing: false, builds: false, log: false };

export const site = {
	name: 'Arun BM',
	mark: 'അരുൺ',
	url: 'https://ad714.github.io/Portfolio',
	line: 'Full-stack developer. I get live data out of places that never meant to give it up.',
	description: 'Arun BM, full-stack developer in Kollam, Kerala. Live-data systems in React, TypeScript, Python and React Native.',
	facts: [
		['Now', 'Full Stack Developer, Snapshareai'],
		['Also', 'Xattica Gaming Zone app, freelance'],
		['Based', 'Kollam, Kerala, open to work']
	],
	email: 'arunbiju60271@gmail.com',
	links: [
		['GitHub', 'https://github.com/ad714'],
		['LinkedIn', 'https://www.linkedin.com/in/arunad714/'],
		['Telegram', 'https://t.me/aryaad714'],
		['YouTube', 'https://www.youtube.com/@arunad714']
	],
	snapshare: {
		headline: 'Intern to full-time in three months.',
		line: 'Since January 2026, on an AI photo delivery platform for event photographers. I ship across the web app, the CRM backend, the public galleries and the main backend.',
		areas: [
			['CRM', 'Leads, jobs, shoots with multiple locations, crew, deliverables, quotes, contracts and payments in every currency.'],
			['Galleries and Face Search', 'Photo drive, collections, face search and the visitor gallery.'],
			['Website builder', 'Responsive templates photographers publish their sites from.'],
			['Integrations', 'Google Calendar sync for shoots, WhatsApp crew invites and job links.'],
			['Product updates board', 'Ideas, votes and team replies across three repos.']
		]
	},
	nav: [
		['Index', '/'],
		['Writing', '/writing'],
		['Builds', '/builds'],
		['Log', '/log'],
		['Resume', '/resume']
	].filter(([, href]) => live[href.slice(1)] !== false)
};
