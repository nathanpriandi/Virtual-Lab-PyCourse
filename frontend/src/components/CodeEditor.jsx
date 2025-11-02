import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './CodeEditor.module.css';
import { loadPyodide } from 'pyodide';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { EditorView } from '@codemirror/view';
import API_BASE_URL from '../apiConfig';

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

function CodeEditor({ moduleId, initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const pyodideRef = useRef(null);

  const debouncedCode = useDebounce(code, 1500); // 1.5 second debounce delay

  // Effect to auto-save the debounced code
  useEffect(() => {
    const saveCode = async () => {
      const token = localStorage.getItem('token');
      if (!token || debouncedCode === initialCode) {
        // Don't save if user is not logged in or code hasn't changed from initial
        return;
      }

      try {
        await fetch(`${API_BASE_URL}/api/progress/save-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify({ moduleId, code: debouncedCode }),
        });
        // console.log('Code saved'); // Optional: for debugging
      } catch (error) {
        console.error('Failed to save code:', error);
      }
    };

    saveCode();
  }, [debouncedCode, moduleId, initialCode]);

  // Effect to load Pyodide
  useEffect(() => {
    async function setupPyodide() {
      try {
        setOutput('Memuat interpreter Python...\n');
        const pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.0/full/'
        });
        pyodideRef.current = pyodide;
        
        const handleOutput = (text) => {
          const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
          setOutput((prev) => prev + normalizedText + '\n');
        };

        pyodide.setStdout({ batched: handleOutput });
        pyodide.setStderr({ batched: handleOutput });

        setOutput('Interpreter siap.\n');
        setIsLoading(false);
      } catch (error) {
        console.error("Gagal memuat Pyodide:", error);
        setOutput(`Gagal memuat interpreter: ${error.message}\n`);
        setIsLoading(false);
      }
    }
    setupPyodide();
  }, []);

  // Reset code when the initialCode prop changes (i.e., when navigating to a new module)
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);
  
  const runCode = async () => {
    const pyodide = pyodideRef.current;
    if (!pyodide) return;

    setIsExecuting(true);
    try {
      setOutput('');
      await pyodide.runPythonAsync(code);
      setOutput((prev) => prev || 'Kode dijalankan tanpa output.\n');
    } catch (error) {
      console.error(error);
      setOutput((prev) => prev + '\nError: ' + error.message);
    } finally {
      setIsExecuting(false);
    }
  };

  const onCodeChange = useCallback((value) => {
    setCode(value);
  }, []);

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorHeader}>
        <span>Editor Kode (Python)</span>
        <button onClick={runCode} disabled={isLoading || isExecuting} className={styles.runButton}>
          {isLoading ? 'Memuat...' : isExecuting ? 'Menjalankan...' : 'Run'}
        </button>
      </div>
      
      <CodeMirror
        value={code}
        onChange={onCodeChange}
        className={styles.editorWrapper}
        theme={vscodeDark} // Changed to dark theme to match output
        height='100%'
        extensions={[python(), EditorView.lineWrapping]}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          indentOnInput: true,
          autocompletion: true,
        }}
        readOnly={isLoading}
      />
      
      <div className={styles.outputArea}>
        <p>Output:</p>
        <pre><code>{output}</code></pre>
      </div>
    </div>
  );
}

export default CodeEditor;
