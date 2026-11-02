const root = document.documentElement;
const toggle = document.querySelector('#theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('theme'); } catch {}
if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
function updateThemeButton() {
  const light = root.dataset.theme === 'light';
  toggle.textContent = light ? 'dark' : 'light';
  toggle.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
}
updateThemeButton();
toggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
  updateThemeButton();
});
const search = document.querySelector('#search');
if (search) {
  document.querySelector('.search-label').hidden = false;
  const rows = [...document.querySelectorAll('.post-row')];
  search.addEventListener('input', () => {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const row of rows) { row.hidden = !terms.every(term => row.dataset.search.includes(term)); if (!row.hidden) count++; }
    document.querySelector('#no-results').hidden = count > 0;
    document.querySelector('.search-status').textContent = `${count} ${count === 1 ? 'entry' : 'entries'} found`;
  });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable) { e.preventDefault(); search.focus(); }
    if (e.key === 'Escape' && document.activeElement === search) { search.value = ''; search.dispatchEvent(new Event('input')); search.blur(); }
  });
}
