import { useEffect } from 'react';

export default function Services({URL}) {
    useEffect(() => {
    const loadInstagram = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    if (window.instgrm) {
      loadInstagram();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = loadInstagram;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
    return (
        <blockquote
        className="instagram-media"
        data-instgrm-permalink={URL}
        data-instgrm-version="14"
        data-instgrm-captioned
        >
            <a href={URL}>
                View this post on Instagram
            </a>
        </blockquote>
    )
}