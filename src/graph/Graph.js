import React from 'react';
import './Graph.css';

export class Graph extends React.Component {
  render() {
    const nodes = Object.keys(this.props.colorization ?? []);
    const coords = {};
    nodes.forEach((node, i) => {
      coords[node] = {
        x: 250 + Math.sin(2 * Math.PI * i / nodes.length) * 200,
        y: 250 + Math.cos(2 * Math.PI * i / nodes.length) * 200
      };
    });

    return (
      <div>
        <svg width={500} height={500} viewBox="0 0 500 500">
          {
            nodes.map((node, i) => {
              return Array.from(this.props.connectivity[node]).map(connectedNode => {
                // Render links between nodes (will add each link twice since we store data for both directions)
                return (
                  <line
                    key={'link-' + node + '-' + connectedNode}
                    x1={coords[node].x} y1={coords[node].y}
                    x2={coords[connectedNode].x} y2={coords[connectedNode].y}
                    stroke="black"
                  />
                );
              });
            })
          }
          {
            nodes.map((node, i) => {
              // Render nodes itself
              return (
                <g key={'node-' + node}>
                  <circle
                    stroke={this.props.colorization[node] ? 'red' : 'blue'}
                    cx={coords[node].x}
                    cy={coords[node].y}
                    r={5}
                    strokeWidth={10}
                  ></circle>
                  <text textAnchor="middle" fill="white" x={coords[node].x} y={coords[node].y + 4}>{node}</text>
                </g>
              );
            })
          }
        </svg>
      </div>
    );
  }
}