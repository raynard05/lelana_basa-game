'use client';

interface DialogBubbleProps {
  actorName: string;
  dialogueText: string;
  speakerPosition?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export default function DialogBubble({
  actorName,
  dialogueText,
  speakerPosition = 'left',
  className = '',
  style,
}: DialogBubbleProps) {
  return (
    <div className={`dialog-bubble-container ${speakerPosition} ${className}`} style={style}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .dialog-bubble-container {
          position: relative;
          background-color: #ecd7ae;
          border: 3px solid #5a3500;
          border-radius: 16px;
          padding: 16px 24px;
          min-height: 80px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          font-family: 'Outfit', 'Inter', sans-serif;
          box-sizing: border-box;
          width: 100%;
          max-width: 800px;
        }

        .dialog-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .dialog-actor {
          font-weight: 800;
          font-size: 18px;
          color: #2b1500;
          margin: 0;
          line-height: 1.2;
        }

        .dialog-text {
          font-size: 16px;
          font-weight: 500;
          color: #2b1500;
          margin: 0;
          line-height: 1.5;
        }

        /* SVG Tail Positioning */
        .dialog-bubble-tail {
          position: absolute;
          width: 22px;
          height: 24px;
          pointer-events: none;
          z-index: 5;
        }

        .dialog-bubble-container.left .dialog-bubble-tail {
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
        }

        .dialog-bubble-container.right .dialog-bubble-tail {
          right: -20px;
          top: 50%;
          transform: translateY(-50%) scaleX(-1);
        }

        /* Mobile Adjustments */
        @media (max-width: 600px) {
          .dialog-bubble-container {
            padding: 12px 18px;
          }
          
          .dialog-actor {
            font-size: 16px;
          }
          
          .dialog-text {
            font-size: 14px;
          }
        }

        @media (max-height: 600px) and (orientation: landscape) {
          .dialog-bubble-container {
            padding: 12px 10px;
            border-width: 2px;
            min-height: auto;
            border-radius: 12px;
          }
          .dialog-actor {
            font-size: 14px;
          }
          .dialog-text {
            font-size: 12px;
            line-height: 1.3;
          }
          .dialog-bubble-tail {
            width: 16px;
            height: 18px;
          }
          .dialog-bubble-container.left .dialog-bubble-tail {
            left: -14px;
          }
          .dialog-bubble-container.right .dialog-bubble-tail {
            right: -14px;
          }
        }
      `}} />

      {/* Speech Bubble Tail */}
      <div className="dialog-bubble-tail">
        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer tail shape (dark brown border) */}
          <path d="M22 2C16 4 2 16 0 18C4 18 18 14 22 13V2" fill="#5a3500" />
          {/* Inner tail shape (parchment fill) */}
          <path d="M22 4.5C17.5 6.5 4.5 16 3 17C6 16.5 17.5 13.5 22 13V4.5" fill="#ecd7ae" />
          {/* Helper line to blend the border */}
          <line x1="21.5" y1="3" x2="21.5" y2="12.5" stroke="#ecd7ae" strokeWidth="2" />
        </svg>
      </div>

      {/* Dialogue Content */}
      <div className="dialog-content">
        <h3 className="dialog-actor">{actorName}:</h3>
        <p className="dialog-text">"{dialogueText}"</p>
      </div>
    </div>
  );
}
