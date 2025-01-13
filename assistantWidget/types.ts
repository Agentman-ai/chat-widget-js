export interface ChatWidgetConfig {
  agentToken: string;
  apiUrl?: string;
  variant?: 'inline' | 'corner' | 'centered';
  containerId: string;
  initiallyOpen?: boolean;
  title?: string;
  logo?: string;
  headerLogo?: string;
  toggleText?: string;
  initialMessage?: string;
  initialHeight?: string;
  initialWidth?: string;
  position?: 'bottom-right' | 'bottom-left';
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
