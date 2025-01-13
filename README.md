# Agentman Chat Widget

A customizable chat widget that can be easily integrated into any web application. The widget provides a modern, responsive interface for users to interact with Agentman AI.

## Features

- 🎨 Fully customizable theme and styling
- 📱 Responsive design that works on all devices
- 💬 Support for real-time chat interactions
- 🔧 Multiple layout variants (corner, embedded)
- 🎯 Customizable positioning
- 🖼️ SVG logo support
- 📐 Resizable chat window

## Installation

```bash
npm install @agentman/chat-widget
```

## Quick Start

```javascript
import { ChatWidget } from '@agentman/chat-widget';

const config = {
    agentToken: 'YOUR_AGENT_TOKEN',
    variant: 'corner',
    containerId: 'chat-container',
    title: 'Agentman Assistant',
    position: 'bottom-right',
    initialMessage: 'Hello!'
};

const chatWidget = new ChatWidget(config);
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `agentToken` | `string` | Required | Your Agentman API token |
| `variant` | `'corner' \| 'embedded'` | `'corner'` | Widget layout variant |
| `containerId` | `string` | Required | ID of the container element |
| `title` | `string` | `'Agentman Assistant'` | Chat window title |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Widget position (corner variant only) |
| `initiallyOpen` | `boolean` | `false` | Whether chat should be open on load |
| `initialMessage` | `string` | `'Hello!'` | Initial message to display |
| `initialHeight` | `string` | `'600px'` | Initial chat window height |
| `initialWidth` | `string` | `'400px'` | Initial chat window width |
| `toggleText` | `string` | `'Ask Agentman'` | Text shown on the toggle button |

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

## React Component

For React applications, you can use the provided React component:

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
                headerTextColor: "#ffffff",
                agentIconColor: "#059669",
                userIconColor: "#059669",
                backgroundColor: "#ffffff",
                textColor: "#1f2937",
                buttonColor: "#10b981",
                buttonTextColor: "#ffffff",
                agentBackgroundColor: "#f3f4f6",
                userBackgroundColor: "#10b981",
                agentForegroundColor: "#000000"
            }}
        />
    );
}
```

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

### Embedded Widget
```html
<div id="chat-container" style="height: 600px; width: 400px;"></div>
<script>
    const chatWidget = new ChatWidget({
        agentToken: 'YOUR_AGENT_TOKEN',
        variant: 'embedded',
        containerId: 'chat-container',
        title: 'Agentman Assistant',
        initialMessage: 'Hello!'
    });
</script>
```

## Browser Support

The chat widget supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
