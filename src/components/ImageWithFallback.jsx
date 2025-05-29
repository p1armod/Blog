import React, { useState } from 'react';

function ImageWithFallback({ src, alt, className }) {
    const [error, setError] = useState(false);

    return (
        <img 
            src={error ? '/default-image.jpg' : src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            onLoad={() => setError(false)}
            loading="lazy"
        />
    );
}

export default ImageWithFallback;