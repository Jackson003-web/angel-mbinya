
import React, { useEffect, useState } from 'react';

const HeartBackground: React.FC = () => {
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement("div");
      heart.classList.add("heart-particle");
      const emojis = ["❤️", "💖", "💕", "💘", "🌸", "✨"];
      heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      
      const size = Math.random() * 20 + 10;
      const left = Math.random() * 100;
      const duration = Math.random() * 3 + 4;
      
      heart.style.fontSize = `${size}px`;
      heart.style.left = `${left}vw`;
      heart.style.top = `110vh`;
      heart.style.animationDuration = `${duration}s`;
      heart.style.color = `rgba(255, ${Math.random() * 100 + 100}, ${Math.random() * 150 + 100}, 0.6)`;
      
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
    };

    const interval = setInterval(createHeart, 400);
    return () => clearInterval(interval);
  }, []);

  return null; // Logic-only component that appends to body
};

export default HeartBackground;
