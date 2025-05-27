// Remove all existing elements from the document
document.body.innerHTML = '';

// Create a "Hacker Notice Board" with advanced professional styles
const board = document.createElement('div');
board.style.cssText = `
  background: linear-gradient(135deg, #151515 60%, #212f36 100%);
  color: #00ffa3;
  font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
  padding: 48px 32px;
  margin: 60px auto;
  max-width: 650px;
  border: 2px solid #00ffa3;
  border-radius: 18px;
  box-shadow: 0 0 80px 0 #00ffa377, 0 2px 24px #000c  ;
  text-shadow: 0 0 4px #0f0, 0 0 2px #00ffa3;
  letter-spacing: 0.06em;
  position: relative;
  overflow: hidden;
`;

// Add a subtle animated scanline effect
const style = document.createElement('style');
style.innerHTML = `
  @keyframes scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 8px; }
  }
  .scanline {
    pointer-events: none;
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      to bottom,
      rgba(0,255,163,0.07) 0px,
      rgba(0,255,163,0.13) 2px,
      transparent 4px,
      transparent 8px
    );
    mix-blend-mode: lighten;
    z-index: 2;
    animation: scanline 1s linear infinite;
  }
  .glow {
    color: #00ffa3;
    text-shadow:
      0 0 7px #00ffa3cc,
      0 0 14px #00ffa377,
      0 0 21px #00ffa344;
    letter-spacing: 0.09em;
  }
  .typewriter {
    overflow: hidden;
    white-space: pre-wrap;
    border-right: .16em solid #00ffa3;
    animation: typing 2.2s steps(30, end) 0.5s 1 normal both, blink-caret 0.7s step-end infinite;
  }
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #00ffa3 }
  }
`;
document.head.appendChild(style);

// Insert advanced hacker message
board.innerHTML = `
  <div class="scanline"></div>
  <h1 class="glow" style="font-size:2.6em; margin-bottom:0.2em; letter-spacing:0.18em;">
    &#x1F50E;&#xFE0F; HACKER NOTICE BOARD
  </h1>
  <hr style="border: 1px solid #00ffa344; margin: 1.3em 0 1.7em 0; box-shadow: 0 0 8px #00ffa388;">
  <div class="typewriter" style="font-size:1.23em; line-height:1.7; margin-bottom: 1.8em;">
  Greetings, Operative.

  &#x2022; Access: <span style="color:#0ff;">AUTHORIZED</span>
  &#x2022; Encryption: <span style="color:#0ff;">ACTIVE</span>
  &#x2022; Trace: <span style="color:#ff0044;">NONE</span>

  <span style="color:#97ffab; font-weight:bold;">Message of the Day:</span>
  // Stay curious. Stay undetected. Share knowledge.

  [ SYSTEM STATUS: SECURE ]
  [ Awaiting encrypted transmission... ]
  </div>
  <footer style="color:#00ffa388; font-size:0.98em; margin-top:2.5em;">
    <em>-- End of Secure Bulletin --</em>
  </footer>
`;

// Add the board to the document
document.body.appendChild(board);
