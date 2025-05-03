# IP Address Viewer Chrome Extension

## Overview
The **IP Address Viewer** is a Google Chrome extension that displays your IPv4 and IPv6 addresses in a user-friendly popup. It also includes quick copy buttons for each address, making it easy to copy them to your clipboard.

## Features
- Displays both IPv4 and IPv6 addresses.
- Quick copy buttons for each IP address.
- Dark mode interface for better visual comfort.
- Lightweight and easy to use.

## Installation
1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click on **Load unpacked** and select the folder containing this extension.

## File Structure
```
manifest.json       # Extension metadata and configuration
popup.html          # HTML for the popup interface
popup.js            # JavaScript logic for fetching and copying IPs
styles.css          # Styling for the popup interface
icons/              # Icons used in the extension
  copy-icon.svg
  ip-address-16.png
  ip-address-32.png
  ip-address-48.png
  ip-address-128.png
```

## Usage
1. Click on the extension icon in the Chrome toolbar.
2. View your IPv4 and IPv6 addresses in the popup.
3. Use the copy buttons to quickly copy the addresses to your clipboard.
