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
- [License](#license)

## Features

- 🎨 Fully customizable UI
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
    headerTextColor: '#ffffff'
  }
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
  agentIconColor: string;
  userIconColor: string;
}
```

## License

MIT License
