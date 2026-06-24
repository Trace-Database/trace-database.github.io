const releaseMeta = document.querySelector('[data-release-meta]');
const downloadLink = document.querySelector('[data-download]');
const versionTitle = document.querySelector('[data-version-title]');
const currentYear = document.querySelector('[data-current-year]');

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

async function loadLatestRelease() {
  try {
    const response = await fetch('/updates/current.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const release = await response.json();
    const dmg = release.downloads?.dmg;

    if (downloadLink && dmg?.url) {
      downloadLink.href = dmg.url;
    }

    if (versionTitle && release.version) {
      versionTitle.textContent = `TraceDB v${release.version}`;
    }

    if (releaseMeta && release.version) {
      const sizeMb = dmg?.size ? ` · ${Math.round(dmg.size / 1024 / 1024)} MB` : '';
      releaseMeta.textContent = `Latest v${release.version}${sizeMb}`;
    }
  } catch {
    if (releaseMeta) {
      releaseMeta.textContent = 'Latest release opens on GitHub';
    }
  }
}

void loadLatestRelease();
