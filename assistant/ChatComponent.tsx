// ChatComponent.tsx
import React, { useEffect, useRef } from 'react';
import { ChatWidget } from '../assistantWidget/ChatWidget';

interface ChatComponentProps {
  agentToken: string;
  apiUrl: string;
  variant?: 'inline' | 'corner' | 'centered';
  containerId: string;
  initiallyOpen?: boolean;
  title?: string;
  logo?: string;
  headerLogo?: string;
  initialHeight?: string;
  initialWidth?: string;
  agentBackgroundColor?: string;
  userBackgroundColor?: string;
  agentForegroundColor?: string;
  userForegroundColor?: string;
  headerBackgroundColor?: string;
  headerTextColor?: string;
  agentIconColor?: string;
  userIconColor?: string;
  toggleText?: string;
  initialMessage?: string;
}

export const ChatComponent: React.FC<ChatComponentProps> = ({
  agentToken,
  apiUrl,
  variant = 'corner',
  containerId,
  initiallyOpen = false,
  title,
  logo,
  headerLogo,
  initialHeight,
  initialWidth,
  agentBackgroundColor,
  userBackgroundColor,
  agentForegroundColor,
  userForegroundColor,
  headerBackgroundColor,
  headerTextColor,
  agentIconColor,
  userIconColor,
  toggleText = 'Ask Agentman',
  initialMessage
}) => {
  const chatWidgetRef = useRef<ChatWidget | null>(null);

  useEffect(() => {
    // Initialize chat widget with preview mode configuration
    const config = {
      apiUrl,
      agentToken,
      variant,
      containerId,
      initiallyOpen,
      title,
      logo,
      headerLogo,
      toggleText,
      initialMessage,
      initialHeight: variant === 'inline' ? '100%' : initialHeight,
      initialWidth: variant === 'inline' ? '100%' : initialWidth,
      agentBackgroundColor,
      userBackgroundColor,
      theme: {
        backgroundColor: 'white',
        textColor: 'black',
        buttonColor: '#10b981',
        buttonTextColor: 'white',
        agentBackgroundColor: agentBackgroundColor || '#f3f4f6',
        userBackgroundColor: userBackgroundColor || '#10b981',
        agentForegroundColor: agentForegroundColor || '#000000',
        userForegroundColor: userForegroundColor || '#ffffff',
        headerBackgroundColor: headerBackgroundColor || '#059669',
        headerTextColor: headerTextColor || '#FFFFFF',
        agentIconColor: agentIconColor || '#059669',
        userIconColor: userIconColor || '#F43F5E'
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
    initiallyOpen,
    title,
    logo,
    headerLogo,
    initialHeight,
    initialWidth,
    containerId,
    agentBackgroundColor,
    userBackgroundColor,
    agentForegroundColor,
    userForegroundColor,
    headerBackgroundColor,
    headerTextColor,
    agentIconColor,
    userIconColor,
    toggleText,
    initialMessage
  ]);

  return React.createElement('div', {
    id: containerId,
    className: 'chat-widget-container h-full w-full',
    style: variant === 'inline' ? {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column'
    } : {
      position: 'fixed',
      bottom: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      pointerEvents: 'none'
    }
  });
};
