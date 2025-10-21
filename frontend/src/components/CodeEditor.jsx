import React from 'react';
import styles from './CodeEditor.module.css';

function CodeEditor() {
  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorHeader}>
        <span>Code Editor for Python</span>
      </div>
      <textarea 
        className={styles.textArea} 
        defaultValue="print('Hello, World!')" 
      />
      <div className={styles.outputArea}>
        <p>Output:</p>
        <pre><code></code></pre>
      </div>
    </div>
  );
}

export default CodeEditor;