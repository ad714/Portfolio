const sources = {
	work: import.meta.glob('/content/work/*.md', { eager: true }),
	builds: import.meta.glob('/content/builds/*.md', { eager: true }),
	writing: import.meta.glob('/content/writing/*.md', { eager: true }),
	log: import.meta.glob('/content/log/*.md', { eager: true })
};

const byDate = (a, b) => String(b.date ?? b.year).localeCompare(String(a.date ?? a.year));
const order = { work: (a, b) => a.rank - b.rank, builds: byDate, writing: byDate, log: byDate };

export function list(kind) {
	return Object.entries(sources[kind])
		.map(([path, mod]) => ({ ...mod.metadata, slug: path.split('/').pop().replace(/\.md$/, ''), component: mod.default }))
		.filter((entry) => !entry.draft)
		.sort(order[kind]);
}

export function find(kind, slug) {
	return list(kind).find((entry) => entry.slug === slug);
}

export function formatDate(date) {
	return new Date(String(date).slice(0, 10) + 'T00:00:00Z').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
