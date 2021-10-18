import React from 'react';
import { Button } from 'react-bootstrap';

const ImageEngine = () => {
  return (
    <div>
      <p className="mb-1">
        Turn your image template to images via a simple, self-managed, Netlify-hosted API.
      </p>

      <p>
        <Button
          as="a"
          href="https://github.com/Resocio/resoc-netlify-image-engine"
        >
          Create your Netlify Image Engine
        </Button>
      </p>
    </div>
  );
};

export default ImageEngine;
