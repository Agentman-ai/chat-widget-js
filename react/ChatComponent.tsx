import React, { useEffect, useRef } from 'react';
import { ChatWidget } from '../assistantWidget/ChatWidget';

interface ChatComponentProps {
  // Required props
  agentToken: string;
  apiUrl: string;

  // Optional props with defaults
  variant?: 'corner' | 'centered';
  position?: 'bottom-right' | 'bottom-left';
  title?: string;
  initiallyOpen?: boolean;
  initialMessage?: string;
  initialHeight?: string;
  initialWidth?: string;
  toggleText?: string;
  logo?: string;
  headerLogo?: string;

  // Theme options
  theme?: {
    headerBackgroundColor?: string;
    headerTextColor?: string;
    backgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    agentBackgroundColor?: string;
    userBackgroundColor?: string;
    agentForegroundColor?: string;
    userForegroundColor?: string;
    agentIconColor?: string;
    userIconColor?: string;
  };
}

/**
 * React component for the Agentman Chat Widget.
 * 
 * @example
 * ```jsx
 * <ChatComponent
 *   agentToken="YOUR_AGENT_TOKEN"
 *   apiUrl="https://your-api.com"
 *   variant="corner"
 *   title="Agentman Assistant"
 *   position="bottom-right"
 *   initialMessage="Hello!"
 *   theme={{
 *     headerBackgroundColor: "#059669",
 *     headerTextColor: "#ffffff"
 *   }}
 * />
 * ```
 */
export const ChatComponent: React.FC<ChatComponentProps> = ({
  // Required props
  agentToken,
  apiUrl,

  // Optional props with defaults
  variant = 'corner',
  position = 'bottom-right',
  title = 'Agentman Assistant',
  initiallyOpen = false,
  initialMessage = 'Hello!',
  initialHeight = '600px',
  initialWidth = '400px',
  toggleText = 'Ask Agentman',
  logo,
  headerLogo,

  // Theme
  theme
}) => {
  const containerRef = useRef<string>(`chat-widget-${Math.random().toString(36).substr(2, 9)}`);
  const chatWidgetRef = useRef<ChatWidget | null>(null);

  useEffect(() => {
    const config = {
      apiUrl,
      agentToken,
      variant,
      containerId: containerRef.current,
      position,
      title,
      initiallyOpen,
      initialMessage,
      initialHeight,
      initialWidth,
      toggleText,
      logo,
      headerLogo,
      theme: {
        headerBackgroundColor: theme?.headerBackgroundColor || '#059669',
        headerTextColor: theme?.headerTextColor || '#ffffff',
        backgroundColor: theme?.backgroundColor || '#ffffff',
        textColor: theme?.textColor || '#1f2937',
        buttonColor: theme?.buttonColor || '#10b981',
        buttonTextColor: theme?.buttonTextColor || '#ffffff',
        agentBackgroundColor: theme?.agentBackgroundColor || '#f3f4f6',
        userBackgroundColor: theme?.userBackgroundColor || '#10b981',
        agentForegroundColor: theme?.agentForegroundColor || '#000000',
        userForegroundColor: theme?.userForegroundColor || '#ffffff',
        agentIconColor: theme?.agentIconColor || '#059669',
        userIconColor: theme?.userIconColor || '#059669'
      }
    };

    chatWidgetRef.current = new ChatWidget(config);

    return () => {
      chatWidgetRef.current?.destroy();
      chatWidgetRef.current = null;
    };
  }, [
    apiUrl,
    agentToken,
    variant,
    position,
    title,
    initiallyOpen,
    initialMessage,
    initialHeight,
    initialWidth,
    toggleText,
    logo,
    headerLogo,
    theme
  ]);

  return (
    <div
      id={containerRef.current}
      className="chat-widget-container"
      style={{
        position: variant === 'centered' ? 'relative' : 'fixed',
        height: variant === 'centered' ? '100%' : 'auto',
        width: variant === 'centered' ? '100%' : 'auto',
        bottom: 0,
        right: position === 'bottom-right' ? 0 : 'auto',
        left: position === 'bottom-left' ? 0 : 'auto'
      }}
    />
  );
};
