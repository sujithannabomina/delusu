// FILE: Toast.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\components\Toast.jsx
// PURPOSE: Temporary success/error notification that auto-dismisses
 
import { useState, useEffect } from 'react';
import './Toast.css';
 
export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);
 
  return (
    <div className={`toast toast--${type}`}>
      <span className="toast-icon">{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
}