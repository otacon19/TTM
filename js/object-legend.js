function renderObjectLegend(containerId = 'objectLegend') {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  const objects = (localStorage.getItem('movies') || '')
    .split(',')
    .filter(Boolean);

  if (objects.length === 0) {
    container.hidden = true;
    return;
  }

  container.innerHTML = `
    <h3>${window.TTM?.t('object_legend_title') || 'Objects legend'}</h3>
    <div class="object-legend-list">
      ${objects.map((name, index) => `
        <div class="object-legend-item">
          <strong>${window.TTM?.t('object_label') || 'Object'} ${index + 1}</strong>
          <span>${name}</span>
        </div>
      `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderObjectLegend();
});
