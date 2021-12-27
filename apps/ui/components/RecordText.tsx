import {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { css, jsx } from '@emotion/react';
import { Annotation } from '@quechua.ai/entities';
import { Typography } from '@mui/material';

interface Props {
  text: string;
  annotations: Annotation[];
  onTextSelection: (selection) => void;
}

export default function RecordText({
  text,
  annotations = [],
  onTextSelection = (_) => {},
}: PropsWithChildren<Props>) {
  const lettersRef = useRef<
    {
      index: number;
      element: HTMLSpanElement;
    }[]
  >([]);
  const colors = {};
  const formats = {};

  useEffect(() => {
    lettersRef.current = lettersRef.current.slice(0, text.split('').length);
  }, [text]);

  const handleSelection = () => {
    const range = window.getSelection()?.getRangeAt(0);
    if (range) {
      const start = parseInt(
        range.startContainer?.parentElement?.dataset.index!
      );
      const startOffset = range.startOffset; // 0 is ok
      const end =
        range.endContainer instanceof Text
          ? parseInt(range.endContainer?.parentElement?.dataset.index!)
          : parseInt((range.endContainer as HTMLElement).dataset.index!);
      const endOffset = range.endOffset;
      onTextSelection({
        text: range.cloneContents().textContent,
        start: start + startOffset,
        end: end + (endOffset === 0 ? -1 : 0),
      });
    }
  };

  annotations.forEach((annotation) => {
    for (let i = annotation.start; i <= annotation.end; i++) {
      colors[i] = annotation.color;
      formats[i] = {
        textDecoration: annotation.formats.includes('underlined')
          ? 'underline'
          : 'unset',
        fontWeight: annotation.formats.includes('bold') ? 'bold' : 'unset',
        fontStyle: annotation.formats.includes('italic') ? 'italic' : 'unset',
      };
    }
  });

  return (
    <>
      {text.split('').map((letter, index) => (
        <Typography
          key={index}
          variant="h3"
          component="div"
          color={colors[index]}
          sx={formats[index]}
          ref={(el) =>
            (lettersRef.current[index] = {
              index,
              element: el,
            })
          }
          data-index={index}
          onMouseUp={handleSelection}
        >
          {letter}
        </Typography>
      ))}
    </>
  );
}
