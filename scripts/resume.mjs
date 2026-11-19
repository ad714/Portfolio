import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const source = process.argv[2] ?? 'H:/Job/resumes/ArunBM_Resume_2026.tex';
const tex = fs.readFileSync(source, 'utf8').replace(/\r\n/g, '\n');
const body = tex.slice(tex.indexOf('\\begin{document}') + 16, tex.indexOf('\\end{document}'));
const publicTex = tex.replace(/^Phone:.*\n/m, '');
if (publicTex === tex || /\+91[-\s]?\d{10}/.test(publicTex)) throw new Error('Phone number still in the public copy. Check the header before publishing.');

const clean = (text) =>
	text
		.replace(/\\href\{[^}]*\}\{([^}]*)\}/g, '$1')
		.replace(/\\(?:textbf|texttt|textit|emph|url)\{([^}]*)\}/g, '$1')
		.replace(/\s*\\(?:quad|qquad)\s*/g, ', ')
		.replace(/\\noindent|\\hrule height [\d.]+pt|\\par\b/g, '')
		.replace(/\\([&%_#$])/g, '$1')
		.replace(/(\S)--(\S)/g, '$1 to $2')
		.replace(/ -- /g, ', ')
		.replace(/~/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

const sections = body.split(/\\section\*\{([^}]*)\}/).slice(1);
const resume = { updated: fs.statSync(source).mtime.toISOString().slice(0, 10), sections: [] };

for (let i = 0; i < sections.length; i += 2) {
	const title = sections[i];
	const text = sections[i + 1];
	const entries = [];
	const chunks = text.split(/\n\s*\n/).map((chunk) => chunk.trim()).filter(Boolean);
	for (const chunk of chunks) {
		const [head, list = ''] = chunk.split('\\begin{itemize}');
		const items = [...list.matchAll(/\\item\s+([\s\S]*?)(?=\\item|\\end\{itemize\}|$)/g)].map((m) => m[1]);
		const lines = head.split('\\\\').map(clean).filter(Boolean);
		if (!lines.length && !items.length) continue;
		const [first = '', ...rest] = lines;
		const [name, date = ''] = first.split('\\hfill').map(clean);
		entries.push({
			title: name,
			date,
			lines: rest,
			items: items.map((item) => {
				const [label, when = ''] = item.split('\\hfill').map((part) => part.split('\\\\')[0]);
				const detail = item.includes('\\\\') ? clean(item.split('\\\\').slice(1).join(' ')) : '';
				return { text: clean(label), date: clean(when), detail };
			})
		});
	}
	if (!entries.length) throw new Error(`Section "${title}" parsed to nothing. The .tex layout changed.`);
	resume.sections.push({ title, entries });
}

const known = ['Summary', 'Experience', 'Skills', 'Projects', 'Education'];
for (const name of known) {
	if (!resume.sections.some((s) => s.title === name)) throw new Error(`Missing section "${name}".`);
}

fs.writeFileSync('src/lib/resume.json', JSON.stringify(resume, null, '\t') + '\n');

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'resume-'));
fs.writeFileSync(path.join(work, 'resume.tex'), publicTex);
for (let pass = 0; pass < 2; pass++) {
	execFileSync('pdflatex', ['-interaction=nonstopmode', '-halt-on-error', 'resume.tex'], { cwd: work, stdio: 'ignore' });
}
fs.copyFileSync(path.join(work, 'resume.pdf'), 'static/ArunBM_Resume.pdf');
fs.rmSync(work, { recursive: true, force: true });

console.log(`Resume synced: ${resume.sections.length} sections, source dated ${resume.updated}.`);
