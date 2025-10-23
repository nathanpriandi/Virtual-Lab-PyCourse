import React, { useState, useEffect, useRef } from 'react';
import styles from './CodeEditor.module.css';
import { loadPyodide } from 'pyodide';

function CodeEditor() {
  const [code, setCode] = useState("print('Hello, World!')"); 
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const pyodideRef = useRef(null);

  console.log('CodeEditor render - isLoading:', isLoading);

  useEffect(() => {
    async function setupPyodide() {
      try {
        setOutput('Memuat interpreter Python...\n');
        const pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.0/full/'
        });
        pyodideRef.current = pyodide;
        pyodide.setStdout((text) => {
          setOutput((prevOutput) => prevOutput + text + '\n');
        });
        setOutput((prevOutput) => prevOutput + 'Interpreter siap. Silakan jalankan kode Anda.\n');
        console.log('Setting isLoading to false');
        setIsLoading(false);

      } catch (error) {
        console.error("Gagal memuat Pyodide:", error);
        setOutput(`Gagal memuat interpreter: ${error.message}\n`);
        setIsLoading(false);
      }
    }

    setupPyodide();
  }, []);
  const runCode = async () => {
    const pyodide = pyodideRef.current;

    if (!pyodide) {
      setOutput("Pyodide belum siap.");
      return;
    }

    try {
      setOutput(''); 
      await pyodide.runPythonAsync(code);

    } catch (error) {
      console.error(error);
      setOutput(error.toString());
    }
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorHeader}>
        <span>Editor Kode (Python)</span>
        <button 
          onClick={runCode} 
          disabled={isLoading}
          className={styles.runButton}
          style={{ display: 'block' }}
        >
          {isLoading ? 'Loading...' : 'Run'}
        </button>
      </div>
      <textarea 
        className={styles.textArea} 
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className={styles.outputArea}>
        <p>Output:</p>
        <pre><code>{output}</code></pre>
      </div>
    </div>
  );
}

export default CodeEditor;