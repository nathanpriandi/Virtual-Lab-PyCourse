import React, { useState, useEffect, useRef } from 'react';
import styles from './CodeEditor.module.css';
import { loadPyodide } from 'pyodide';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { EditorView } from '@codemirror/view';

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
        
        pyodide.setStdout({
          batched: (text) => {
            setOutput((prevOutput) => prevOutput + text);
          }
        });
        
        pyodide.setStderr({
          batched: (text) => {
            setOutput((prevOutput) => prevOutput + text);
          }
        });
        
        setOutput('Interpreter siap.\n');
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
      
      setOutput((prev) => prev || 'Kode dijalankan tanpa output.\n');

    } catch (error) {
      console.error(error);
      setOutput((prev) => prev + '\nError: ' + error.message);
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
        >
          {isLoading ? 'Loading...' : 'Run'}
        </button>
      </div>
      
      <CodeMirror
        value={code}
        onChange={(value) => setCode(value)}
        className={styles.editorWrapper}
        theme={vscodeLight}
        height='100%'
        extensions={[python(), EditorView.lineWrapping]}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          indentOnInput: true,
          autocompletion: true,
        }}
      />
      
      <div className={styles.outputArea}>
        <p>Output:</p>
        <pre><code>{output}</code></pre>
      </div>
    </div>
  );
}

export default CodeEditor;