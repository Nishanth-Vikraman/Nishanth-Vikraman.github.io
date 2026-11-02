const D = window.RESEARCH_DATA;
const $ = (sel) => document.querySelector(sel);

function expUrl(exp) { return `experiment.html?id=${encodeURIComponent(exp.id)}`; }

function renderStats() {
  const experiments = D.experiments;
  const formatCount = count => String(count).padStart(2, '0');
  const stats = [
    ['Experiments documented', formatCount(experiments.length)],
    ['Experiments with rejected branches', formatCount(experiments.filter(e => /\bREJECTED\b/i.test(e.status)).length)],
    ['Active threads', formatCount(experiments.filter(e => e.status.trim().toUpperCase() === 'ACTIVE').length)],
    ['Evidence layer', 'GitHub']
  ];
  $('#stats').innerHTML = stats.map(([k,v]) => `<div class="stat-row"><span>${k}</span><strong>${v}</strong></div>`).join('');
}

function renderFeatures() {
  const featured = D.experiments.filter(x => x.featured);
  // Alternate full-width cards with pairs of half-width cards, preserving each group's order.
  const wide = featured.filter(e => e.wide);
  const narrow = featured.filter(e => !e.wide);
  const ordered = [];
  while (wide.length || narrow.length) {
    if (wide.length) ordered.push(wide.shift());
    if (narrow.length >= 2) ordered.push(narrow.shift(), narrow.shift());
    else if (narrow.length && !wide.length) ordered.push(narrow.shift());
  }
  const narrowCount = featured.filter(e => !e.wide).length;
  $('#feature-grid').innerHTML = ordered.map((e, index) => `
    <a class="feature-card ${e.wide || (!e.wide && narrowCount % 2 === 1 && index === ordered.length - 1) ? 'wide' : ''}" href="${expUrl(e)}" data-experiment-id="${e.id}">
      <div>
        <div class="meta meta-grid">
          <span>EXPERIMENT</span><span>${e.id}</span>
          <span>DOMAIN</span><span>${e.domain}</span>
          <span>DATE</span><span>${e.date}</span>
          <span>STATUS</span><span class="${e.statusClass}">${e.status}</span>
        </div>
        <h3>${e.title}</h3>
        <p>${e.deck}</p>
      </div>
      <div class="metric">RESULT &nbsp; <strong>${e.metric}</strong></div>
    </a>`).join('');
  $('#feature-grid').querySelectorAll('.feature-card').forEach(card => {
    const experiment = featured.find(e => e.id === card.dataset.experimentId);
    if (experiment?.map?.artwork) card.style.setProperty('--map-art', `url("${experiment.map.artwork}")`);
  });
}

// Blend the relevant theme anchors and apply a small manual spacing adjustment.
function mapPosition(exp) {
  let x = 0, y = 0, total = 0;
  for (const [name, weight] of Object.entries(exp.map?.themes || {})) {
    const theme = D.mapThemes[name];
    if (!theme || !Number.isFinite(weight) || weight <= 0) continue;
    x += theme.x * weight; y += theme.y * weight; total += weight;
  }
  if (!total) {
    console.warn(`No valid map themes for ${exp.id}; placing it in the center.`);
    return { x: 50, y: 50 };
  }
  const offset = exp.map?.offset || {};
  return {
    x: Math.max(0, Math.min(100, x / total + (Number.isFinite(offset.x) ? offset.x : 0))),
    y: Math.max(0, Math.min(100, y / total + (Number.isFinite(offset.y) ? offset.y : 0)))
  };
}

const mapStatuses = {
  active: { label: 'Active', statuses: ['ACTIVE'] },
  concept: { label: 'Concept', statuses: ['THESIS'] },
  positive: { label: 'Positive / limited', statuses: ['SUCCESS', 'REPLICATED / LIMITED'] },
  mixed: { label: 'Mixed / on hold', statuses: ['MIXED', 'HOLD'] },
  rejected: { label: 'Rejected / partial rejection', statuses: ['REJECTED', 'PARTIAL / REJECTED BRANCH'] },
  archive: { label: 'Archive', statuses: ['ARCHIVE'] }
};

function mapStatus(status) {
  return Object.keys(mapStatuses).find(key => mapStatuses[key].statuses.includes(status.trim().toUpperCase())) || 'other';
}

function renderMap() {
  const wrap = $('#map-wrap');
  wrap.querySelectorAll('.map-node, .map-label').forEach(n => n.remove());
  const svg = wrap.querySelector('svg');
  svg.innerHTML = '';

  Object.values(D.mapThemes).forEach(theme => {
    const el = document.createElement('div');
    el.className = 'map-label'; el.textContent = theme.label; el.style.left = `${theme.labelX}%`; el.style.top = `${theme.labelY}%`; wrap.appendChild(el);
  });

  const positions = Object.fromEntries(D.experiments.map(e => [e.id, mapPosition(e)]));
  D.links.forEach(([a,b,kind]) => {
    const A = positions[a], B = positions[b];
    if (!A || !B) return;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${A.x}%`); line.setAttribute('y1', `${A.y}%`);
    line.setAttribute('x2', `${B.x}%`); line.setAttribute('y2', `${B.y}%`);
    line.setAttribute('class', `map-line ${kind === 'dashed' ? 'dashed' : ''}`);
    svg.appendChild(line);
  });

  D.experiments.forEach(e => {
    const node = document.createElement('a');
    node.className = `map-node map-status-${mapStatus(e.status)}`; node.href = expUrl(e);
    node.style.left = `${positions[e.id].x}%`; node.style.top = `${positions[e.id].y}%`;
    if (e.map?.artwork) node.style.setProperty('--map-art', `url("${e.map.artwork}")`);
    const name = document.createElement('span');
    name.className = 'map-node-name'; name.textContent = e.shortTitle;
    node.appendChild(name);
    node.setAttribute('aria-label', `${e.shortTitle} — ${e.status}`);
    node.title = e.status;
    wrap.appendChild(node);
  });

  const usedStatuses = new Set(D.experiments.map(e => mapStatus(e.status)));
  const legend = $('#map-legend');
  legend.innerHTML = '';
  const entries = { ...mapStatuses, other: { label: 'Other status' } };
  Object.entries(entries).forEach(([key, entry]) => {
    if (!usedStatuses.has(key)) return;
    const item = document.createElement('span');
    item.className = `map-legend-item map-status-${key}`;
    item.innerHTML = `<span class="map-legend-swatch" aria-hidden="true"></span>${entry.label}`;
    legend.appendChild(item);
  });
}

function renderTimeline() {
  const arr = [...D.experiments].sort((a,b) => b.id.localeCompare(a.id));
  $('#timeline').innerHTML = arr.map(e => `
    <div class="timeline-item">
      <div class="timeline-date">${e.date}</div>
      <a class="timeline-card" href="${expUrl(e)}">
        <div class="meta">${e.id} · ${e.domain} · <span class="${e.statusClass}">${e.status}</span></div>
        <h3>${e.title}</h3>
        <p>${e.result}</p>
        <div class="mini-result">${e.metric} →</div>
      </a>
    </div>`).join('');
}

function setupToggle() {
  document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    $(`#${btn.dataset.view}-view`).classList.add('active');
  }));
}

function init() {
  $('#hero-name').textContent = D.researcher.name;
  $('#hero-copy').textContent = D.researcher.note;
  renderStats(); renderFeatures(); renderMap(); renderTimeline(); setupToggle();
  $('#year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', init);
