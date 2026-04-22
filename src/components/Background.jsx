import React from 'react';

const Background = () => {
  return (
    <div className="background-container">
      {/* YouTube Background Embed */}
      <div className="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/jtjVORGeGFg?autoplay=1&mute=1&loop=1&playlist=jtjVORGeGFg&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Black Liquid Background"
          className="video-iframe"
        ></iframe>
      </div>
      <div className="background-overlay"></div>
    </div>
  );
};

export default Background;
