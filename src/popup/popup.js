// IP Address Viewer - Popup Script
// Shared helpers (t, showStatus) live in common.js

// One card per address family; the IPv6 endpoint answers with IPv4 when IPv6 is missing
const FAMILIES = [
  { id: 'ipv4', url: 'https://api.ipify.org?format=json', matches: (ip) => !ip.includes(':') },
  { id: 'ipv6', url: 'https://api64.ipify.org?format=json', matches: (ip) => ip.includes(':') }
];

// Show a status message inside a container
function setMessage(element, className, text) {
  const span = document.createElement('span');
  span.className = className;
  span.textContent = text;
  element.replaceChildren(span);
}

// Allow line breaks only after each ':' so IPv6 groups stay whole
function showAddress(element, address) {
  element.replaceChildren();
  address.split(':').forEach((group, index) => {
    if (index > 0) element.append(':', document.createElement('wbr'));
    element.append(group);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = FAMILIES.map((family) => ({
    ...family,
    address: null,
    element: document.getElementById(`${family.id}-address`),
    status: document.getElementById(`${family.id}-status`),
    copyButton: document.getElementById(`copy-${family.id}`)
  }));

  function updateStatus(card, state, text) {
    card.status.querySelector('.status-dot').className = `status-dot ${state}`;
    card.status.querySelector('.status-text').textContent = text;
  }

  async function fetchAddress(card) {
    card.address = null;
    card.copyButton.disabled = true;
    setMessage(card.element, 'loading-text', t('obtainingAddress'));
    updateStatus(card, 'loading', t('statusLoading'));

    try {
      const response = await fetch(card.url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const { ip } = await response.json();
      if (!ip || !card.matches(ip)) throw new Error('Address family not available');

      card.address = ip;
      showAddress(card.element, ip);
      updateStatus(card, 'success', t('statusConnected'));
      card.copyButton.disabled = false;
    } catch {
      setMessage(card.element, 'error-text', t('statusUnavailable'));
      updateStatus(card, 'error', t('statusUnavailable'));
    }
  }

  async function copyAddress(card) {
    if (!card.address) return;
    const label = card.copyButton.querySelector('.copy-text');

    try {
      await navigator.clipboard.writeText(card.address);
      card.copyButton.classList.add('copied');
      label.textContent = t('copiedLabel');
      setTimeout(() => {
        card.copyButton.classList.remove('copied');
        label.textContent = t('copyLabel');
      }, 2000);
    } catch {
      showStatus(t('copyErrorAlert'), 'error');
    }
  }

  function refreshAll() {
    cards.forEach(fetchAddress);
  }

  cards.forEach((card) => {
    card.copyButton.addEventListener('click', () => copyAddress(card));
  });
  document.getElementById('refresh-btn').addEventListener('click', refreshAll);

  refreshAll();
});
