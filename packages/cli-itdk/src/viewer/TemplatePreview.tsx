import React, { useEffect, useState } from 'react';
import { ImageTemplate, ParamValues, renderTemplateToHtml } from '@resoc/core';

type SingleIframeProps = {
  me: 'a' | 'b';
  current: 'a' | 'b';
  content: string | null;
  width: number;
  height: number;
  onReady: () => void;
};

const SingleIframe = (props: SingleIframeProps) => (
  <div style={{
    zIndex: props.current === props.me ? 2 : 1,
    position: 'absolute',
    left: 0,
    right: 0
  }}>
    {props.content && (
      <iframe
        scrolling="no"
        srcDoc={props.content}
        width={props.width}
        height={props.height}
        style={{
          border: 0
        }}
        onLoad={() => {
          props.onReady();
        }}
      />
    )}
  </div>
);

export type TemplatePreviewProps = {
  template: ImageTemplate;
  parameters: ParamValues;
  width: number;
  height: number;
};

const TemplatePreview = (props: TemplatePreviewProps) => {
  // Why such a double-component system?
  // This is because the template system is not regular React code.
  // It relies on iframes for style isolation.
  // Consequence: unlike React reconsiliation, this is slow.
  // To prevent lame blinking effect, iframe are rendered off-screen
  // (more exactly: below the other iframe)

  const [showDivA, setShowDivA] = useState<boolean>(true);
  const [templateA, setTemplateA] = useState<string | null>(null);
  const [templateB, setTemplateB] = useState<string | null>(null);

  useEffect(() => {
    const templateAsHtml = renderTemplateToHtml(
      props.template, props.parameters, {
        width: props.width,
        height: props.height
      }
    );

    if (showDivA) {
      // Why checking changes in templateA and templateB instead of setting all the time?
      // This is to detect cases where hidden iframe just needs to be displayed again.
      // This happen when the user is toggling values.
      if (templateAsHtml !== templateB) {
        setTemplateB(templateAsHtml);
      } else {
        setShowDivA(false);
      }
    } else {
      if (templateAsHtml !== templateA) {
        setTemplateA(templateAsHtml);
      } else {
        setShowDivA(true);
      }
    }
  }, [props.template, props.parameters, props.width, props.height]);

  return (
    <div style={{
      position: 'relative',
      width: props.width,
      height: props.height,
      backgroundColor: 'white'
    }}>
      <SingleIframe
        me={'a'}
        current={showDivA ? 'a' : 'b'}
        content={templateA}
        width={props.width}
        height={props.height}
        onReady={() => setShowDivA(true)}
      />
      <SingleIframe
        me={'b'}
        current={showDivA ? 'a' : 'b'}
        content={templateB}
        width={props.width}
        height={props.height}
        onReady={() => setShowDivA(false)}
      />
    </div>
  );
};

export default TemplatePreview;
