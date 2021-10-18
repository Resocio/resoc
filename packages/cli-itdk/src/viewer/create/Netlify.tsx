import React from 'react';
import { Button } from 'react-bootstrap';

const Netlify = () => {
  return (
    <div>
      <p className="mb-1">
        For a site deployed to Netlify, use
        the Social Image Netlify Build Plugin.
        Use case: <a href="https://blog.philippebernard.dev/automated-social-images-on-netlify-with-nextjs-and-resoc">
          Automated social images on Netlify - with Next.js and Resoc
        </a>.
      </p>

      <p>
        <Button
          as="a"
          href="https://www.npmjs.com/package/@resoc/netlify-plugin-social-image"
        >
          Use the Social Image Netlify Build Plugin
        </Button>
      </p>

      <p className="mb-1">
        If you deploy a Eleventy static site to Netlify, use the dedicated Social Image plugin for 11ty.
      </p>

      <p>
        <Button
          as="a"
          href="https://www.npmjs.com/package/@resoc/eleventy-plugin-social-image"
        >
          Use the Social Image plugin for 11ty
        </Button>
      </p>
    </div>
  );
};

export default Netlify;
