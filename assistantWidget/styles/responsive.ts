// styles/responsive.ts
export const responsiveStyles = `
  @media (max-width: 640px) {
    .chat-widget--corner .chat-container {
      width: 100%;
      height: 100vh;
      bottom: 0;
      right: 0;
      border-radius: 0;
    }

    .chat-widget--centered {
      max-width: 100%;
      margin: 0 16px;
    }
  }

  @media (max-width: 480px) {
    .chat-widget--centered {
      margin: 0;
    }

    .chat-widget--centered .chat-container {
      border-radius: 0;
    }
  }
`;
