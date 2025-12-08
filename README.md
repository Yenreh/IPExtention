# IP Address Viewer

Extensión para navegador que muestra tus direcciones IPv4 e IPv6 públicas con botones de copia rápida.

## Características

- Muestra tu dirección IPv4 pública
- Muestra tu dirección IPv6 pública (si está disponible)
- Copia direcciones IP con un solo clic
- Botón de actualización para obtener las direcciones más recientes
- Diseño moderno y responsivo
- Indicadores de estado en tiempo real
- Feedback visual al copiar

## Instalación

### Google Chrome

1. Abre Chrome y navega a `chrome://extensions/`
2. Activa el **Modo de desarrollador** (esquina superior derecha)
3. Haz clic en **Cargar extensión sin empaquetar**
4. Selecciona la carpeta `Chrome` de este proyecto
5. La extensión aparecerá en tu barra de herramientas

### Mozilla Firefox

1. Abre Firefox y navega a `about:debugging#/runtime/this-firefox`
2. Haz clic en **Cargar complemento temporal...**
3. Navega a la carpeta `Firefox` del proyecto
4. Selecciona el archivo `manifest.json`
5. La extensión se cargará temporalmente

> **Nota para Firefox:** Las extensiones temporales se eliminan al cerrar el navegador. Para una instalación permanente, necesitas firmar la extensión a través de [addons.mozilla.org](https://addons.mozilla.org).

## Uso

1. Haz clic en el icono de la extensión en la barra de herramientas
2. Espera a que se carguen las direcciones IP
3. Usa el botón "Copiar" junto a cada dirección para copiarla al portapapeles
4. Haz clic en "Actualizar" para obtener las direcciones más recientes

## API Utilizada

Esta extensión utiliza el servicio gratuito [ipify](https://www.ipify.org/) para obtener las direcciones IP públicas.

## Estructura del Proyecto

```
IPExtention/
├── Chrome/
│   ├── manifest.json
│   ├── popup/
│   │   ├── popup.html
│   │   ├── popup.css
│   │   └── popup.js
│   └── icons/
├── Firefox/
│   ├── manifest.json
│   ├── popup/
│   │   ├── popup.html
│   │   ├── popup.css
│   │   └── popup.js
│   └── icons/
└── README.md
```
