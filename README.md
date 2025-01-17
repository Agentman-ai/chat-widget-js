# Agentman Chat Widget Documentation

A customizable chat widget that can be easily integrated into any web application. The widget provides a modern, responsive interface for users to interact with Agentman AI.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [JavaScript](#javascript)
  - [HTML](#html)
- [Configuration](#configuration)
- [Theme Customization](#theme-customization)
- [Icon Customization](#icon-customization)
- [License](#license)

## Features

- 🎨 Fully customizable UI and icons
- 🔒 Secure token-based authentication
- 🌐 Easy integration with any web application
- 📱 Responsive design for all devices
- ⚡ Lightweight and performant

## Installation

```bash
npm install @agentman/chat-widget
```

## Usage

### JavaScript

```javascript
import { ChatWidget } from '@agentman/chat-widget';

const config = {
  agentToken: 'YOUR_AGENT_TOKEN',
  apiUrl: 'https://your-api.com',
  containerId: 'chat-widget-container',
  variant: 'corner', // or 'centered'
  position: 'bottom-right', // or 'bottom-left', 'top-right', 'top-left'
  title: 'Agentman Assistant',
  initiallyOpen: false,
  initialMessage: 'Hello! How can I help you today?',
  theme: {
    headerBackgroundColor: '#059669',
    headerTextColor: '#ffffff',
    userIconColor: '#059669',
    agentIconColor: '#059669'
  },
  icons: {
    userIcon: 'https://example.com/user-icon.png', // URL or SVG string
    agentIcon: '<svg>...</svg>' // URL or SVG string
  },
  logo: 'https://example.com/logo.png', // URL for the logo
  headerLogo: 'https://example.com/header-logo.png' // URL for the header logo
};

const chatWidget = new ChatWidget(config);

// Cleanup when needed
chatWidget.destroy();
```

### HTML

```html
<div id="chat-widget-container"></div>
```

## Configuration

| Option | Type | Description |
|--------|------|-------------|
| `agentToken` | `string` | Your Agentman API token |
| `apiUrl` | `string` | The API endpoint URL |
| `containerId` | `string` | ID of the container element |
| `variant` | `'corner' \| 'centered'` | Widget placement style |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | Widget position |
| `title` | `string` | Chat widget title |
| `initiallyOpen` | `boolean` | Whether to open chat on load |
| `initialMessage` | `string` | Initial bot message |
| `theme` | `object` | UI theme customization |
| `icons` | `object` | Icon customization |
| `logo` | `string` | URL for the main logo |
| `headerLogo` | `string` | URL for the header logo |

## Theme Customization

```typescript
interface ChatTheme {
  headerBackgroundColor: string;
  headerTextColor: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  agentBackgroundColor: string;
  userBackgroundColor: string;
  agentForegroundColor: string;
  userForegroundColor: string;
  agentIconColor: string;  // Color for the agent's icon (when using SVG)
  userIconColor: string;   // Color for the user's icon (when using SVG)
}
```

## Icon Customization

The chat widget supports customization of user and agent icons through the `icons` configuration option. Icons can be specified either as URLs to image files or as SVG strings.

```typescript
interface ChatIcons {
  userIcon?: string;  // URL to image or SVG string
  agentIcon?: string; // URL to image or SVG string
}
```

### Icon Types Support

1. **Image URLs**
   - Supports any valid image URL (PNG, JPG, etc.)
   - Example: `'https://example.com/user-icon.png'`

2. **SVG Strings**
   - Supports inline SVG code
   - Colors can be customized using `userIconColor` and `agentIconColor` in the theme
   - Example: `'<svg viewBox="0 0 24 24">...</svg>'`

### Logo Customization

The widget also supports custom logos through direct configuration properties:

- `logo`: Main logo URL
- `headerLogo`: Header logo URL

Example:
```javascript
const config = {
  // ... other config options ...
  logo: 'https://example.com/logo.png',
  headerLogo: 'https://example.com/header-logo.png',
  icons: {
    userIcon: 'https://example.com/user-icon.png',
    agentIcon: '<svg viewBox="0 0 24 24">...</svg>'
  }
};
```

## License

MIT License
