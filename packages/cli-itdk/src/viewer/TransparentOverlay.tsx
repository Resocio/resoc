import React, { ReactFragment } from 'react'
import styled from 'styled-components';

export type TransparentOverlayProps = {
  width: number;
  height: number;
  children: ReactFragment;
  backgroundImageUrl?: string;
  opacity?: number;
}

const Wrapper = styled.div<any>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
`;

const BackgroundImage = styled.img<any>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: absolute;
  left: 0;
  top: 0;
`;

const OverlayWrapper = styled.div<any>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  opacity: ${props => props.opacity};
`;

const TransparentOverlay = (props: TransparentOverlayProps) => (
  <Wrapper width={props.width} height={props.height}>
    {props.backgroundImageUrl && (
      <BackgroundImage
        width={props.width}
        height={props.height}
        src={props.backgroundImageUrl}
      />
    )}
    <OverlayWrapper
      width={props.width}
      height={props.height}
      opacity={props.opacity !== undefined ? props.opacity : 1}
    >
      {props.children}
    </OverlayWrapper>
  </Wrapper>
);

export default TransparentOverlay;
