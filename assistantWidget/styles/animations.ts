// styles/animations.ts
export const animationStyles = `
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

  @keyframes loading-animation {
    0%, 80%, 100% { transform: scaleY(1); }
    40% { transform: scaleY(1.5); }
  }
`;