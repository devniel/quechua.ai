import { PropsWithChildren } from 'react';
import { css, jsx } from '@emotion/react';

interface Props {
  color: string;
  content: string;
}

export default function Annotation({
  color,
  content,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      css={css`
        font-size: 32px;
        border-radius: 4px;
        color: ${color};
      `}
    >
      {children}
    </div>
  );
}
