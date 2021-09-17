import styled from 'styled-components';
import React from 'react'
import { Alert, Button } from 'react-bootstrap';
import copy from 'copy-text-to-clipboard';

export type CodeBlockProps = {
  code: string;
  commandLine?: boolean;
};

const Wrapper = styled(Alert)`
  display: flex;
  align-items: flex-start;
`;

const Code = styled.pre`
  white-space: pre-wrap;
  flex: 1;
`;

const CodeBlock = (props: CodeBlockProps) => {
  return (
    <Wrapper
      className="p-3"
      variant="secondary"
    >
      <Code className="m-0">{props.commandLine && <span className="text-primary">$ </span>}{props.code}</Code>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => copy(props.code)}
      >
        Copy
      </Button>
    </Wrapper>
  )
}

export default CodeBlock;
