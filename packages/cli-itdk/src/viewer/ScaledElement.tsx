import React, { ReactFragment, useRef, useState } from 'react'
import useResizeObserver from '@react-hook/resize-observer'
//import ResizeObserverEntry from "@react-hook/resize-observer"
import CSS from 'csstype';

export type ScaledElementProps = {
  children: ReactFragment;
};

const ScaledElement = (props: ScaledElementProps) => {
  const [ childrenRect, setChildrenRect ] = useState<ResizeObserverEntry["contentRect"] | null>(null);
  const children = useRef<HTMLDivElement>(null);
  useResizeObserver(children, (entry) => {
    if (!childrenRect) {
      setChildrenRect(entry.contentRect);
    }
  });

  const [ selfRect, setSelfRect ] = useState<ResizeObserverEntry["contentRect"] | null>(null);
  const self = useRef<HTMLDivElement>(null);
  useResizeObserver(self, (entry) => setSelfRect(entry.contentRect));

  let selfStyles: CSS.Properties = {
    position: 'relative'
  };
  let childrenStyles: CSS.Properties = {
    position: 'absolute'
  };

  if (selfRect && childrenRect) {
    const scaleRatio = selfRect.width / childrenRect.width;
    selfStyles = {
      transform: `scale(${scaleRatio})`,
      transformOrigin: 'top left',
      height: `${childrenRect.height * scaleRatio}px`
    }
    childrenStyles = {};
  }

  console.log("S", selfRect, "C", childrenRect);
  console.log(selfStyles);

  return (
    <div ref={self} style={selfStyles}>
      <div ref={children} style={childrenStyles}>
        {props.children}
      </div>
    </div>
  );
}

export default ScaledElement;
