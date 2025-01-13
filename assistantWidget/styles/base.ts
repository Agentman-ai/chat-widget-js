// styles/base.ts
export const baseStyles = `
  .chat-widget {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    z-index: 1000;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .chat-container {
    background: var(--chat-background-color, #FFFFFF);
    flex-direction: column;
    overflow: hidden;
    display: flex;
    width: 360px;
    height: 560px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    flex: 1;
  }

  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    min-height: 48px;
    background: var(--chat-header-background-color, #059669);
    color: var(--chat-header-text-color, #FFFFFF);
  }

  .chat-header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .chat-logo-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
  }

  .chat-logo {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .chat-logo svg {
    width: 100%;
    height: 100%;
  }

  .chat-header-logo {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .chat-header-logo svg {
    width: 100%;
    height: 100%;
  }  

  .chat-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: inherit !important;
  }

  .chat-header button {
    background: none;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chat-header button svg {
    width: 20px;
    height: 20px;
    fill: var(--chat-header-text-color, #FFFFFF);
  }

  .chat-header button:hover {
    opacity: 0.8;
  }

  .chat-messages {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 16px;
    min-height: 0;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .chat-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .chat-avatar.agent {
    background: var(--chat-header-background-color, #BE185D);
  }

  .chat-avatar.user {
    background: var(--chat-user-background-color, #F43F5E);
  }

  .chat-avatar img, .chat-avatar svg {
    width: 20px;
    height: 20px;
  }

  .chat-avatar.agent svg {
    fill: var(--chat-agent-icon-color, #FFFFFF);
  }

  .chat-avatar.user svg {
    fill: var(--chat-user-icon-color, #FFFFFF);
  }

  .chat-input-container {
    position: relative;
    padding: 12px 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    background: white;
    z-index: 2;
  }

  .chat-input-wrapper {
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 8px;
    background: white;
  }

  .chat-input {
    flex: 1;
    min-height: 40px;
    max-height: 120px;
    padding: 8px 40px 8px 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    font-size: 14px;
    line-height: 1.4;
    resize: none;
    overflow-y: auto;
    background: white;
  }

  .chat-send {
    width: 40px;
    height: 40px;
    padding: 8px;
    background: var(--chat-header-background-color, #059669);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  .chat-send:hover {
    opacity: 0.9;
  }

  .chat-send svg {
    width: 20px;
    height: 20px;
    fill: var(--chat-header-text-color, #FFFFFF);
  }

  .chat-initializing {
    padding: 16px;
    text-align: center;
    color: #6B7280;
  }

  /* Override any external styles that might affect the header text */
  .chat-header * {
    color: inherit !important;
  }
  
  .chat-minimize {
    border: none;
    background: none;
    cursor: pointer;
  }
`;
