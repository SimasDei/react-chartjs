import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
          {
            label: 'Videos Made',
            backgroundColor: 'rgba(255, 0, 255, 0.75)',
            data: [4, 5, 1, 10, 32, 2, 12],
          },
          {
            label: 'Subscribtions',
            backgroundColor: 'rgba(0, 255,0,0.75)',
            data: [14, 15, 21, 0, 12, 34, 42],
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
        <Line
          options={{
            responsive: true,
          }}
          data={this.getChartData}
        />
      </div>
    );
  }
}
