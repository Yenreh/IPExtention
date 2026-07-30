// IP Address Viewer - Popup Script

const i18n = typeof browser !== 'undefined' ? browser.i18n : chrome.i18n;

function t(key) {
  return i18n.getMessage(key) || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();

  const ipv4Element = document.getElementById('ipv4-address');
  const ipv6Element = document.getElementById('ipv6-address');
  const ipv4Status = document.getElementById('ipv4-status');
  const ipv6Status = document.getElementById('ipv6-status');
  const copyIpv4Button = document.getElementById('copy-ipv4');
  const copyIpv6Button = document.getElementById('copy-ipv6');
  const refreshButton = document.getElementById('refresh-btn');

  let ipv4Address = null;
  let ipv6Address = null;

  // Actualizar estado de indicador
  function updateStatus(statusElement, state, text) {
    const dot = statusElement.querySelector('.status-dot');
    const statusText = statusElement.querySelector('.status-text');

    dot.className = `status-dot ${state}`;
    statusText.textContent = text;
  }

  // Obtener IPv4
  async function fetchIPv4() {
    try {
      updateStatus(ipv4Status, 'loading', t('statusLoading'));

      const response = await fetch('https://api.ipify.org?format=json');

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      // Verificar que sea una dirección IPv4 válida (sin :)
      if (data.ip && !data.ip.includes(':')) {
        ipv4Address = data.ip;
        ipv4Element.textContent = ipv4Address;
        ipv4Element.classList.remove('loading-text', 'error-text');
        updateStatus(ipv4Status, 'success', t('statusConnected'));
        copyIpv4Button.disabled = false;
      } else {
        throw new Error('No se pudo obtener IPv4');
      }

    } catch {
      ipv4Element.innerHTML = `<span class="error-text">${t('statusUnavailable')}</span>`;
      updateStatus(ipv4Status, 'error', t('statusUnavailable'));
      copyIpv4Button.disabled = true;
    }
  }

  // Obtener IPv6
  async function fetchIPv6() {
    try {
      updateStatus(ipv6Status, 'loading', t('statusLoading'));

      const response = await fetch('https://api64.ipify.org?format=json');

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      // Verificar si es una dirección IPv6 válida (contiene :)
      if (data.ip && data.ip.includes(':')) {
        ipv6Address = data.ip;
        ipv6Element.textContent = ipv6Address;
        ipv6Element.classList.remove('loading-text', 'error-text');
        updateStatus(ipv6Status, 'success', t('statusConnected'));
        copyIpv6Button.disabled = false;
      } else {
        throw new Error('IPv6 no disponible');
      }

    } catch {
      ipv6Element.innerHTML = `<span class="error-text">${t('statusUnavailable')}</span>`;
      updateStatus(ipv6Status, 'error', t('statusUnavailable'));
      copyIpv6Button.disabled = true;
    }
  }

  // Copiar al portapapeles con feedback visual
  async function copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);

      // Feedback visual
      const originalText = button.querySelector('.copy-text').textContent;
      button.classList.add('copied');
      button.querySelector('.copy-text').textContent = t('copiedLabel');

      setTimeout(() => {
        button.classList.remove('copied');
        button.querySelector('.copy-text').textContent = originalText;
      }, 2000);

    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert(t('copyErrorAlert'));
    }
  }

  // Event listeners
  copyIpv4Button.addEventListener('click', () => {
    if (ipv4Address) {
      copyToClipboard(ipv4Address, copyIpv4Button);
    }
  });

  copyIpv6Button.addEventListener('click', () => {
    if (ipv6Address) {
      copyToClipboard(ipv6Address, copyIpv6Button);
    }
  });

  refreshButton.addEventListener('click', () => {
    ipv4Address = null;
    ipv6Address = null;
    copyIpv4Button.disabled = true;
    copyIpv6Button.disabled = true;

    ipv4Element.innerHTML = `<span class="loading-text">${t('obtainingAddress')}</span>`;
    ipv6Element.innerHTML = `<span class="loading-text">${t('obtainingAddress')}</span>`;

    fetchIPv4();
    fetchIPv6();
  });

  // Cargar direcciones IP al inicio
  fetchIPv4();
  fetchIPv6();
});
