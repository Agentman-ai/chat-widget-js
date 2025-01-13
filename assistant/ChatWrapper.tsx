// components/Assistant/ChatWrapper.tsx
'use client';

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ChatComponent } from './ChatComponent';


interface ChatWrapperProps {
  initialAgentToken?: string;
  initialApiUrl?: string;
  initialTitle?: string;
  initialVariant?: 'inline' | 'corner' | 'centered';
  logo?: string;
  headerLogo?: string;
  initialHeight?: string;
  initialWidth?: string;
  containerId?: string;
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

export function ChatWrapper({
  initialAgentToken = process.env.NEXT_PUBLIC_AGENT_TOKEN,
  initialApiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL,
  initialTitle = 'Agentman Assistant',
  initialVariant = 'corner',
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
}: ChatWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  console.log('Colors in wrapper:', agentBackgroundColor, userBackgroundColor);

  // Use useRef to generate a consistent containerId per instance
  const containerIdRef = useRef(
    containerId || `chat-${Math.random().toString(36).substr(2, 9)}`
  );

  useEffect(() => {
    async function initializeChat() {
      try {
        // Initialization logic if needed
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setIsLoading(false);
      }
    }

    initializeChat();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!initialAgentToken || !initialApiUrl) {
    console.warn('Missing required chat configuration');
    return null;
  }

  return (
    <ChatComponent
      agentToken={initialAgentToken}
      apiUrl={initialApiUrl}
      variant={initialVariant}
      initiallyOpen={false}
      title={initialTitle}
      logo={logo}
      headerLogo={headerLogo}
      initialHeight={initialHeight}
      initialWidth={initialWidth}
      containerId={containerIdRef.current}
      agentBackgroundColor={agentBackgroundColor}
      userBackgroundColor={userBackgroundColor}
      agentForegroundColor={agentForegroundColor}
      userForegroundColor={userForegroundColor}
      headerBackgroundColor={headerBackgroundColor}
      headerTextColor={headerTextColor}
      agentIconColor={agentIconColor}
      userIconColor={userIconColor}
      toggleText={toggleText}
      initialMessage={initialMessage}
    />
  );
}
