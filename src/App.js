import React, { Component } from 'react';
import { Chart, Bar } from 'react-chartjs-2';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: ['January', 'February', 'March', 'April', 'June', 'July'],
        datasets: [
          {
            label: 'Videos Made',
            backgroundColor: 'rgba(255, 0, 255, 0.75)',
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      },
    };
  }

  setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 800, 750);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.95, 'rgba(133, 122,144, 0.5)');
    return gradient;
  };

  getChartData = canvas => {
    const data = this.state.data;
    if (data.datasets) {
      let colors = ['rgba(255, 0, 255, 0.75)', 'rgba(0, 255,0,0.75)'];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = this.setGradientColor(canvas, colors[i]);
        set.borderColor = 'white';
        set.borderWidth = 2;
      });
    }

    return data;
  };

  render() {
    return (
      <div style={{ position: 'relative', width: 600, height: 550 }}>
        <h3>React ChartJs</h3>
        <Bar
          options={{
            responsive: true,
          }}
          data={this.getChartData}
          plugins={{
            id: 'curvature',
            beforeInit: (chart, _easing) => {
              if (!chart.options.curvature) return;

              Chart.elements.Rectangle.prototype.draw = function() {
                const ctx = this._chart.ctx;
                const vm = this._view;

                let left, right, top, bottom, signX, signY, borderSkipped, radius;
                let borderWidth = vm.borderWidth;

                let cornerRadius = chart.options.curvature;
                if (cornerRadius > 20) {
                  console.log('Whoa there buddy !');
                  cornerRadius = 20;
                }

                if (!vm.horizontal) {
                  left = vm.x - vm.width / 2;
                  right = vm.x + vm.width / 2;
                  top = vm.y;
                  bottom = vm.base;

                  signX = 1;
                  signY = bottom > top ? 1 : -1;
                  borderSkipped = vm.borderSkipped || 'bottom';
                } else {
                  left = vm.base;
                  right = vm.x;
                  top = vm.y - vm.height / 2;
                  bottom = vm.y + vm.height / 2;

                  signX = right > left ? 1 : -1;
                  signY = 1;
                  borderSkipped = vm.borderSkipped || 'left';
                }

                if (borderWidth) {
                  const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));

                  borderWidth = borderWidth > barSize ? barSize : borderWidth;
                  const halfStroke = borderWidth / 2;
                  const borderLeft = left + (borderSkipped !== 'left' ? halfStroke + signX : 0);
                  const borderRight = right + (borderSkipped !== 'right' ? halfStroke + signX : 0);
                  const borderTop = top + (borderSkipped !== 'top' ? halfStroke + signY : 0);
                  const borderBottom =
                    bottom + (borderSkipped !== 'bottom' ? halfStroke + signY : 0);

                  if (borderLeft !== borderRight) {
                    top = borderTop;
                    bottom = borderBottom;
                  }

                  if (borderTop !== borderBottom) {
                    left = borderLeft;
                    right = borderRight;
                  }
                }

                ctx.beginPath();
                ctx.fillStyle = vm.backgroundColor;
                ctx.strokeStyle = vm.borderColor;
                ctx.lineWidth = borderWidth;

                const corners = [[left, bottom], [left, top], [right, top], [right, bottom]];

                const border = ['bottom', 'left', 'top', 'right'];
                let startCorner = border.indexOf(borderSkipped, 0);
                if (startCorner === -1) {
                  startCorner = 0;
                }

                function cornerAt(index) {
                  return corners[(startCorner + index) % 4];
                }

                let corner = cornerAt(0);
                let width, height, x, y, nextCornerId, nextCorner;
                let xTL, xTR, yTL, yTR;
                let xBL, xBR, yBL, yBR;
                ctx.moveTo(corner[0], corner[1]);

                for (let i = 1; i < 4; i++) {
                  corner = cornerAt(i);
                  nextCornerId = i + 1;
                  if (nextCornerId === 4) {
                    nextCornerId = 0;
                  }
                }
              };
            },
          }}
        />
      </div>
    );
  }
}
