import { Text } from 'grommet';
import React from 'react';
import './Examples.css';

export const Examples = () => {
  const examples = [
    { value: 'a - b - c', comment: 'connected and red-blue colorable graph' },
    { value: 'a - b, f - g', comment: 'not connected graph' },
    { value: 'a - b\\nf - g', comment: 'same but with line break' },
    { value: 'a - b, f - g, b - b', comment: 'same but with loop' },
    { value: 'a - b - c - a', comment: 'connected graph, but not red-blue colorable' },
    { value: 'a - b, c - d, b - c, a - d', comment: 'connected and red-blue colorable graph' },
    { value: 'a-b,c-d,b-c,a-d,e-f,a-f,f-g,b-g,b-e,c-f,d-g,g-h,e-h,a-h,c-h,d-e', comment: 'connected and red-blue colorable graph' },
  ];

  return (
    <div>
      <Text>Examples:</Text>
      <ol>
        {examples.map((example, i) => (
          <li key={`example-${i}`}>
            <code onClick={() => navigator.clipboard.writeText(example.value)} title="Click to copy">{example.value}</code>
            <Text size="small" color="brand"> {example.comment}</Text>
          </li>
        ))}
      </ol>
    </div>
  );
}
