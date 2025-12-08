// IP Address Viewer - Popup Script

document.addEventListener('DOMContentLoaded', () => {
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
      updateStatus(ipv4Status, 'loading', 'Cargando...');
      
      const response = await fetch('https://api64.ipify.org?format=json');
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();
      ipv4Address = data.ip;
      
      ipv4Element.textContent = ipv4Address;
      ipv4Element.classList.remove('loading-text', 'error-text');
      updateStatus(ipv4Status, 'success', 'Conectado');
      copyIpv4Button.disabled = false;
      
    } catch (error) {
      console.error('Error fetching IPv4:', error);
      ipv4Element.innerHTML = '<span class="error-text">Error al obtener IPv4</span>';
      updateStatus(ipv4Status, 'error', 'Error');
      copyIpv4Button.disabled = true;
    }
  }

  // Obtener IPv6
  async function fetchIPv6() {
    try {
      updateStatus(ipv6Status, 'loading', 'Cargando...');
      
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
        updateStatus(ipv6Status, 'success', 'Conectado');
        copyIpv6Button.disabled = false;
      } else {
        // Si no contiene :, no es IPv6 o no está disponible
        throw new Error('IPv6 no disponible');
      }
      
    } catch (error) {
      console.error('Error fetching IPv6:', error);
      ipv6Element.innerHTML = '<span class="error-text">No disponible</span>';
      updateStatus(ipv6Status, 'error', 'No disponible');
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
      button.querySelector('.copy-text').textContent = 'Copiado!';
      
      setTimeout(() => {
        button.classList.remove('copied');
        button.querySelector('.copy-text').textContent = originalText;
      }, 2000);
      
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Error al copiar al portapapeles');
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
    
    ipv4Element.innerHTML = '<span class="loading-text">Obteniendo dirección...</span>';
    ipv6Element.innerHTML = '<span class="loading-text">Obteniendo dirección...</span>';
    
    fetchIPv4();
    fetchIPv6();
  });

  // Cargar direcciones IP al inicio
  fetchIPv4();
  fetchIPv6();
});
