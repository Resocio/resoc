import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

export type StarterAlertProps = {
  manifestPath: string;
  templateDir: string;
};

const StarterAlert = (props: StarterAlertProps) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="primary" onClose={() => setShow(false)} dismissible>
        <p>
          🖊️ Edit the files in <code>{props.templateDir}</code>. This is just some HTML and CSS, with a little bit
          of <a target="_blank" href="http://mustache.github.io/mustache.5.html">Mustache</a>, a simple templating system.
        </p>

        <p>
          👀 When you make a change in the template, this page reloads it so you immediately see what
          you have just done.
        </p>

        <p>
          ⚙️ Change the parameter values below to see how your template looks like in various situations.
          You can define your own parameters by editing <code>{props.manifestPath}</code>.
        </p>

        <p>
          🚀 When your template is ready, use the command line below to create an image &#8212; <i>or a thousand!</i>
        </p>
      </Alert>
    );
  } else {
    return (<span></span>);
  }
};

export default StarterAlert;
