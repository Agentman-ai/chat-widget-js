# Agentman Chat Widget Documentation

A customizable chat widget that can be easily integrated into any web application. The widget provides a modern, responsive interface for users to interact with Agentman AI.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [React Applications](#react-applications)
  - [Vanilla JavaScript](#vanilla-javascript)
  - [CDN Usage](#cdn-usage)
- [Configuration](#configuration)
- [Theming](#theming)
- [Examples](#examples)
- [Technical Details](#technical-details)
- [Browser Support](#browser-support)
- [License](#license)

## Features

- 🎨 Fully customizable theme and styling
- 📱 Responsive design that works on all devices
- 💬 Support for real-time chat interactions
- 🔧 Multiple layout variants (corner, centered)
- 🎯 Customizable positioning
- 🖼️ SVG logo support (URL or inline SVG)
- 📐 Resizable chat window
- 🔄 Multiple integration methods (React, JavaScript, CDN)

## Installation

```bash
npm install @agentman/chat-widget
```

## Usage

### React Applications

```javascript
import { ChatWidget } from '@agentman/chat-widget';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const widget = new ChatWidget({
      apiUrl: 'https://your-api.com',
      agentToken: 'your-token',
      variant: 'corner',
      containerId: 'chat-container',
      // Optional: override default logos
      logo: 'https://your-logo.svg',
      headerLogo: 'https://your-header-logo.svg'
    });

    // Cleanup on unmount
    return () => widget.destroy();
  }, []);

  return <div id="chat-container" />;
}
```

Using the React Component:
```jsx
import { ChatComponent } from '@agentman/chat-widget/react';

function App() {
  return (
    <ChatComponent
      agentToken="YOUR_AGENT_TOKEN"
      variant="corner"
      title="Agentman Assistant"
      position="bottom-right"
      initialMessage="Hello!"
      theme={{
        headerBackgroundColor: "#059669",
        headerTextColor: "#ffffff"
        // ... other theme options
      }}
    />
  );
}
```

### Vanilla JavaScript

```html
<!-- In your HTML file -->
<div id="chat-container"></div>

<script src="node_modules/@agentman/chat-widget/dist/index.js"></script>
<script>
  const { ChatWidget } = window['@agentman/chat-widget'];
  const widget = new ChatWidget({
    apiUrl: 'https://your-api.com',
    agentToken: 'your-token',
    containerId: 'chat-container',
    variant: 'corner'
  });
</script>
```

### CDN Usage

```html
<script src="https://unpkg.com/@agentman/chat-widget"></script>
<script>
  const { ChatWidget } = window['@agentman/chat-widget'];
  const widget = new ChatWidget({
    apiUrl: 'https://your-api.com',
    agentToken: 'your-token',
    containerId: 'chat-container'
  });
</script>
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `agentToken` | `string` | Required | Your Agentman API token |
| `variant` | `'corner' \| 'centered'` | `'corner'` | Widget layout variant |
| `containerId` | `string` | Required | ID of the container element |
| `title` | `string` | `'Agentman Assistant'` | Chat window title |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Widget position (corner variant only) |
| `initiallyOpen` | `boolean` | `false` | Whether chat should be open on load |
| `initialMessage` | `string` | `'Hello!'` | Initial message to display |
| `initialHeight` | `string` | `'600px'` | Initial chat window height |
| `initialWidth` | `string` | `'400px'` | Initial chat window width |
| `toggleText` | `string` | `'Ask Agentman'` | Text shown on the toggle button |
| `logo` | `string` | Built-in SVG | URL to logo image or inline SVG |
| `headerLogo` | `string` | Built-in SVG | URL to header logo image or inline SVG |

## Theming

The widget supports comprehensive theming options:

```javascript
const config = {
    // ... other options
    theme: {
        headerBackgroundColor: '#059669',
        headerTextColor: '#ffffff',
        agentIconColor: '#059669',
        userIconColor: '#059669',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        buttonColor: '#10b981',
        buttonTextColor: '#ffffff',
        agentBackgroundColor: '#f3f4f6',
        userBackgroundColor: '#10b981',
        agentForegroundColor: '#000000'
    }
};
```

### Theme Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `headerBackgroundColor` | `string` | `'#059669'` | Header background color |
| `headerTextColor` | `string` | `'#ffffff'` | Header text color |
| `backgroundColor` | `string` | `'#ffffff'` | Main chat window background color |
| `textColor` | `string` | `'#1f2937'` | Main text color |
| `buttonColor` | `string` | `'#10b981'` | Action button background color |
| `buttonTextColor` | `string` | `'#ffffff'` | Action button text color |
| `agentBackgroundColor` | `string` | `'#f3f4f6'` | Agent message bubble background |
| `userBackgroundColor` | `string` | `'#10b981'` | User message bubble background |
| `agentForegroundColor` | `string` | `'#000000'` | Agent message text color |
| `agentIconColor` | `string` | `'#059669'` | Agent message icon color |
| `userIconColor` | `string` | `'#059669'` | User message icon color |

## Examples

### Basic Corner Widget
```html
<div id="chat-container"></div>
<script>
    const chatWidget = new ChatWidget({
        agentToken: 'YOUR_AGENT_TOKEN',
        variant: 'corner',
        containerId: 'chat-container',
        title: 'Agentman Assistant',
        position: 'bottom-right',
        initialMessage: 'Hello!'
    });
</script>
```

### Centered Widget
```html
<div id="chat-container" style="height: 600px; width: 400px;"></div>
<script>
    const chatWidget = new ChatWidget({
        agentToken: 'YOUR_AGENT_TOKEN',
        variant: 'centered',
        containerId: 'chat-container',
        title: 'Agentman Assistant',
        initialMessage: 'Hello!'
    });
</script>
```

## Technical Details

### Logo Handling
The widget supports multiple ways to specify logos:
1. URLs (absolute or relative)
2. Inline SVG content
3. Data URLs

The logo detection logic automatically determines the correct way to render the logo:
```javascript
// URL example
logo: 'https://your-domain.com/logo.svg'

// Inline SVG example
logo: '<svg>...</svg>'

// Using default
logo: undefined // Will use built-in SVG
```

### Module Formats
The widget is distributed as a UMD module, which means it supports:
- ES6 Modules (import/export)
- CommonJS (require/module.exports)
- AMD (define/require)
- Global variable when included via script tag

### Asset Management
- Default logos are bundled with the widget
- Custom logos can be provided via URLs or inline SVG
- All assets are optimized for production use

### Build System
The widget is built using:
- TypeScript for type safety
- Webpack for bundling
- UMD format for universal compatibility

## Browser Support

The chat widget supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
