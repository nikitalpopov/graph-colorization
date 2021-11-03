import React from 'react';
import './Examples.css';

export class Examples extends React.Component {
  render() {
    const examples = [
      { value: 'a - b - c', comment: 'connected and red-blue colorable graph' },
      { value: 'a - b, f - g', comment: 'not connected graph' },
      { value: 'a - b\\nf - g', comment: 'same but with line break' },
      { value: 'a - b, f - g, b - b', comment: 'same but with loop' },
      { value: 'a - b - c - a', comment: 'connected graph, but not red-blue colorable' },
      { value: 'a - b, c - d, b - c, a - d', comment: 'connected and red-blue colorable graph' },
    ];

    return (
      <div>
        <span>Examples:</span>
        <ol>
          {examples.map((example, i) => (
            <li key={`example-${i}`}>
              <code onClick={() => navigator.clipboard.writeText(example.value)} title="Click to copy">{example.value}</code>
              <span> {example.comment}</span><br />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
