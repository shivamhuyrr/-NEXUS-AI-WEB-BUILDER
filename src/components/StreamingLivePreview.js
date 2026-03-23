import React, { useEffect, useRef } from 'react';
import AIStepVisualizer from './AIStepVisualizer';
import '../styles/AIStepVisualizer.css';

const StreamingLivePreview = ({ htmlCode, cssCode, isGenerating, generationProgress = 0 }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument;

      // Update HTML
      const bodyContent = htmlCode || `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        ">
          <div>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto 16px; opacity: 0.3;">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2 style="
              color: rgba(255,255,255,0.3);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-weight: 400;
              font-size: 18px;
              margin: 0;
            ">Your website will appear here</h2>
            <p style="
              color: rgba(255,255,255,0.15);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-size: 14px;
              margin-top: 8px;
            ">Start by describing your vision</p>
          </div>
        </div>
      `;

      // Don't clear/change HTML content during generation if we already have content
      if (!isGenerating || !doc.body.innerHTML.includes(htmlCode)) {
        doc.body.innerHTML = bodyContent;
      }

      // Update CSS
      let style = doc.getElementById('dynamic-style');
      if (!style) {
        style = doc.createElement('style');
        style.id = 'dynamic-style';
        doc.head.appendChild(style);
      }

      // Default CSS for both placeholder and generated content
      const defaultCSS = htmlCode ? `
        body {
          background-color: #ffffff;
          color: #333333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          margin: 0;
          padding: 20px;
          box-sizing: border-box;
          overflow: auto;
          height: 100%;
        }
      ` : `
        body {
          background-color: transparent;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          overflow: auto;
          height: 100%;
        }
      `;

      // Don't modify CSS during generation if it's already set
      if (!isGenerating || style.textContent !== (defaultCSS + (cssCode || ''))) {
        const cssContent = defaultCSS + (cssCode || '');
        style.textContent = cssContent;
      }
    }
  }, [htmlCode, cssCode, isGenerating]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument;
      doc.open();
      doc.write('<html><head><style id="dynamic-style"></style></head><body></body></html>');
      doc.close();
    }
  }, []); // This effect runs only once on mount

  return (
    <div className={`streaming-live-preview ${isGenerating ? 'generating' : ''}`} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div className="preview-container" style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
        <iframe
          ref={iframeRef}
          title="Streaming Live Preview"
          style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#ffffff', display: 'block' }}
        />
        {isGenerating && (
          <div className="generating-overlay" style={{ opacity: 0.1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}></div>
        )}
      </div>
      {isGenerating && (
        <AIStepVisualizer isActive={isGenerating} progress={generationProgress} />
      )}
    </div>
  );
};

export default StreamingLivePreview;