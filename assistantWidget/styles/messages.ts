// styles/messages.ts
export const messageStyles = `
  .message {
    margin-bottom: 8px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
    flex-direction: row;
  }

  .message.user {
    flex-direction: row-reverse;
    margin-top: 16px;
  }

  .message-content {
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    max-width: 85%;
    word-wrap: break-word;
    line-height: 1.4;
  }

  .message.agent .message-content {
    background: var(--chat-agent-background-color, #f3f4f6);
    color: var(--chat-agent-foreground-color, #111827);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .message.user .message-content {
    background: var(--chat-user-background-color, #ecfdf5);
    color: var(--chat-user-foreground-color, #111827);
    margin-left: auto;
    border: 1px solid rgba(0, 0, 0, 0.05);
    margin-top: 16px;
    margin-bottom: 8px;
  }

  // Content formatting - Reduce spacing
  .message.agent .message-content br {
    content: "";
    display: block;
    margin-top: 0.2em;
  }

  .message-avatar {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    margin-top: 4px;
  }

  .message-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .message.user .message-avatar {
    width: 28px;
    height: 28px;
    margin-top: 16px;
  }
  

  /* Typography and spacing */
  .message-content p {
    margin: 0 0 8px 0;
  }

  .message-content p:last-child {
    margin-bottom: 0;
  }  

  /* Enhanced Lists styling */
  .message-content ul,
  .message-content ol {
    margin: 4px 0;
    padding-left: 20px;
    list-style-position: outside;
  }

  .message-content ul {
    list-style-type: disc;
  }

  .message-content ol {
    list-style-type: decimal;
  }

  /* Nested lists */
  .message-content ul ul,
  .message-content ol ul {
    list-style-type: circle;
  }

  .message-content ul ul ul,
  .message-content ol ul ul {
    list-style-type: square;
  }

  .message-content ol ol,
  .message-content ul ol {
    list-style-type: lower-alpha;
  }

  .message-content ol ol ol,
  .message-content ul ol ol {
    list-style-type: lower-roman;
  }

  .message-content li {
    margin: 4px 0;
    padding-left: 4px;
    line-height: 1.4;
    display: list-item; /* Ensures list markers are visible */
  }

  /* Remove margins for nested lists */
  .message-content li > ul,
  .message-content li > ol {
    margin: 2px 0;
  }

  /* Links styling */
  .message-content a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
  }

  .message.user .message-content a {
    color: inherit;
  }

  .message-content a:hover {
    text-decoration: underline;
  }

  /* Strong and emphasis */
  .message-content strong {
    font-weight: 600;
  }

  .message-content em {
    font-style: italic;
  }  

  .message-content h1,
  .message-content h2,
  .message-content h3,
  .message-content h4,
  .message-content h5,
  .message-content h6 {
    font-weight: 500;
    line-height: 1.3;
    margin: 16px 0 8px 0;  
  }

  .message-content h2,
  .message-content h3 {
    margin-top: 24px;  /* More space above section headers */
    margin-bottom: 12px;  /* More space below before content */
  }  

  .message-content h1 { font-size: 1.4em; }
  .message-content h2 { font-size: 1.3em; }
  .message-content h3 { font-size: 1.2em; }
  .message-content h4 { font-size: 1.1em; }
  .message-content h5 { font-size: 1em; }
  .message-content h6 { font-size: 0.9em; }

  /* Ensure first and last headings don't add extra spacing */
  .message-content > h1:first-child,
  .message-content > h2:first-child,
  .message-content > h3:first-child,
  .message-content > h4:first-child,
  .message-content > h5:first-child,
  .message-content > h6:first-child {
    margin-top: 0;
  }

  .message-content > h1:last-child,
  .message-content > h2:last-child,
  .message-content > h3:last-child,
  .message-content > h4:last-child,
  .message-content > h5:last-child,
  .message-content > h6:last-child {
    margin-bottom: 0;
  }

  /* Add space after paragraphs */
  .message-content p + h1,
  .message-content p + h2,
  .message-content p + h3,
  .message-content p + h4,
  .message-content p + h5,
  .message-content p + h6 {
    margin-top: 24px;  /* More space when heading follows paragraph */
  }  

  /* Adjust list spacing after headers */
  .message-content h1 + ul,
  .message-content h2 + ul,
  .message-content h3 + ul,
  .message-content h4 + ul,
  .message-content h5 + ul,
  .message-content h6 + ul {
    margin-top: 12px;
  }


  /* Code blocks */
  .message-content code {
    background: rgba(0, 0, 0, 0.05);
    padding: 2px 4px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
  }

  .message-content pre {
    background: rgba(0, 0, 0, 0.05);
    padding: 12px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 8px 0;
  }

  .message-content pre code {
    background: none;
    padding: 0;
  }

  /* Blockquotes */
  .message-content blockquote {
    border-left: 4px solid #059669;
    margin: 8px 0;
    padding: 4px 12px;
    color: #4b5563;
  }

  /* Tables */
  .message-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 8px 0;
  }

  .message-content th,
  .message-content td {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px;
    text-align: left;
  }

  .message-content th {
    background: rgba(0, 0, 0, 0.05);
    font-weight: 600;
  }

  /* Remove margin top from first element */
  .message-content > *:first-child {
    margin-top: 0;
  }

  /* Remove margin bottom from last element */
  .message-content > *:last-child {
    margin-bottom: 0;
  }


  @media (max-width: 480px) {
    .message-content {
      font-size: 13px;
      padding: 10px 14px;
    }
    
    .message-content ul,
    .message-content ol {
      padding-left: 20px;
    }
  }
`;
