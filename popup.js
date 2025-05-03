document.addEventListener('DOMContentLoaded', () => {
  const ipv4Element = document.getElementById('ipv4-address');
  const ipv6Element = document.getElementById('ipv6-address');
  const copyIpv4Button = document.getElementById('copy-ipv4');
  const copyIpv6Button = document.getElementById('copy-ipv6');

  // Fetch IPv4 and IPv6 addresses
  fetch('https://api64.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      ipv4Element.textContent = data.ip;
    })
    .catch(() => {
      ipv4Element.textContent = 'Error fetching IPv4';
    });

  fetch('https://api64.ipify.org?format=json&ipv=6')
    .then(response => response.json())
    .then(data => {
      ipv6Element.textContent = data.ip;
    })
    .catch(() => {
      ipv6Element.textContent = 'Error fetching IPv6';
    });

  // Copy to clipboard functionality
  copyIpv4Button.addEventListener('click', () => {
    navigator.clipboard.writeText(ipv4Element.textContent);
  });

  copyIpv6Button.addEventListener('click', () => {
    navigator.clipboard.writeText(ipv6Element.textContent);
  });
});