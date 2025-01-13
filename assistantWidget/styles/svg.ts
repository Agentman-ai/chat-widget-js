// Add these styles to your style-manager.ts
export const svgStyles = `
  
  .chat-svg-container {
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 4px;
  }

  .chat-svg-wrapper {
    width: 200px;  // Back to original size
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-svg-wrapper svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .chat-svg-wrapper.small {
    width: 100px;
  }
  .chat-svg-wrapper.medium {
    width: 200px;
  }
  .chat-svg-wrapper.large {
    width: 300px;
  }   

`;