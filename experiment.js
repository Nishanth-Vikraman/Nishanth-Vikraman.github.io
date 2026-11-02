const D = window.RESEARCH_DATA;
const params = new URLSearchParams(location.search);
const id = params.get('id') || D.experiments[0].id;
const e = D.experiments.find(x => x.id === id) || D.experiments[0];

document.title = `${e.id} — ${e.shortTitle} — Nishanth Vikraman`;
document.querySelector('#article-kicker').textContent = `${e.id} / ${e.domain} / ${e.date}`;
document.querySelector('#article-title').textContent = e.title;
document.querySelector('#article-deck').textContent = e.deck;

document.querySelector('#experiment-card').innerHTML = `
  <div class="label">QUESTION</div><div>${e.article.question}</div>
  <div class="label">STATUS</div><div class="${e.statusClass}">${e.status}</div>
  <div class="label">VERDICT</div><div>${e.article.verdict}</div>
  <div class="label">RESULT</div><div>${e.metric}</div>
  <div class="label">ARTIFACTS</div><div id="artifact-summary"></div>`;

const artifacts = (e.artifacts || []).filter(item => {
  try { return ['http:', 'https:'].includes(new URL(item.url).protocol); }
  catch { return false; }
});
document.querySelector('#artifact-summary').textContent = artifacts.length
  ? `${artifacts.length} published ${artifacts.length === 1 ? 'link' : 'links'} below`
  : 'Not published yet';

const body = document.querySelector('#article-body');
body.innerHTML = `
  <p class="lead">${e.article.intro}</p>
  <div class="callout"><span class="meta">CURRENT VERDICT</span><br><strong>${e.article.verdict}</strong></div>
  ${e.article.sections.map(([h,p]) => `<h2>${h}</h2><p>${p}</p>`).join('')}
  <div class="artifacts" id="artifact-index">
    <div class="meta">ARTIFACT INDEX</div>
  </div>`;

const artifactIndex = document.querySelector('#artifact-index');
if (!artifacts.length) {
  const notice = document.createElement('p');
  notice.textContent = 'Artifacts have not been published for this experiment yet.';
  artifactIndex.appendChild(notice);
} else {
  artifacts.forEach(({ label, url }) => {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = `→ ${label}`;
    artifactIndex.appendChild(link);
  });
}
