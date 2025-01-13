// types.ts
export type ChatVariant = 'inline' | 'corner' | 'centered';

export interface ChatTheme {
  textColor: string;
  backgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  agentBackgroundColor: string;
  userBackgroundColor: string;
  agentForegroundColor: string;
  userForegroundColor: string;
  headerBackgroundColor: string;
  headerTextColor: string;
  agentIconColor: string;
  userIconColor: string;
}

export interface ChatAssets {
  logo: string;
  headerLogo: string;
}

export interface ChatIcons {
  closeIcon: string;
  sendIcon: string;
  minimizeIcon: string;
  maximizeIcon: string;
  expandIcon: string;
  reduceIcon: string;
}

export interface ChatConfig {
  apiUrl: string;
  agentToken: string;
  variant: 'inline' | 'corner' | 'centered';
  containerId: string;
  title?: string;
  theme?: Partial<ChatTheme>;
  initiallyOpen?: boolean;
  logo?: string;
  headerLogo?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  initialHeight?: string;
  initialWidth?: string;
  assets?: Partial<ChatAssets>;
  icons?: Partial<ChatIcons>;
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

export interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: string;
  type: 'text' | 'html' | 'custom' | 'svg';
  data?: any;
}

export interface ChatState {
  isOpen: boolean;
  isExpanded: boolean;
  isInitialized: boolean;
  isSending: boolean;
  messages: Message[];
  error?: string;
}

export interface APIResponse {
  id: string;
  type: 'ai' | 'user';
  content: string;
}
