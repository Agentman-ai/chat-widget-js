export const loadingStyles = `
  .loading-message {
    padding: 8px 16px;
    margin: 8px 0;
    opacity: 1;
    transition: opacity 0.15s ease-out;
  }

  .loading-message.loading-fade-out {
    opacity: 0;
  }

  .loading-container {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    border-radius: 12px;
  }

  .loading-bars {
    display: flex;
    align-items: center;
    gap: 3px;
    height: 20px;
  }

  .loading-bars span {
    display: inline-block;
    width: 3px;
    height: 100%;
    background-color: var(--chat-secondary-color, #666);
    border-radius: 3px;
    animation: loading-animation 1s infinite ease-in-out;
  }

  .loading-bars span:nth-child(1) {
    animation-delay: -0.32s;
  }

  .loading-bars span:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes loading-animation {
    0%, 80%, 100% {
      transform: scaleY(1);
    }
    40% {
      transform: scaleY(1.5);
    }
  }

  .loading-text-wrapper {
    display: flex;
    align-items: center;
    height: 20px;
  }

  .loading-text {
    color: var(--chat-secondary-color, #666);
    font-size: 14px;
    line-height: 1;
    transition: opacity 0.3s ease-out;
  }
`; 