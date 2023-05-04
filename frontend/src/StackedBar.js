import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const StackedBarChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map(d => d.category));

    const y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(data, d => d.total)]);

    const z = d3.scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888']);

    const bars = g
    // .append('g')
      .selectAll('g')
      .data(d3.stack().keys(['value1', 'value2', 'value3'])(data))
      .enter().append('g')
      .attr('fill', d => z(d.key))
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', d => x(d.data.category))
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth())
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(100)
          .attr('fill', '#B4D3B2');
        g.append('text')
          .attr('class', 'value-text')
          .attr('x', x(d.data.category) + x.bandwidth() / 2)
          .attr('y', y(d[1]) - 5)
          .text(d.data[d3.select(this.parentNode).datum().key])
          .attr('text-anchor', 'middle')
          .attr('font-size', '14px');
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(100)
          .attr('fill', d => z(d3.select(this.parentNode).datum().key));
        g.select('.value-text').remove();
      });

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, 's'))
      .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('Value');

      const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width + margin.right - 18},${margin.top})`)
      .selectAll('g')
      .data(['R', 'S', 'I']) //.reverse()
      .enter().append('g')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);

    legend.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', z);

    legend.append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .text(d => d);


      return () => {
        bars.on('mouseover', null).on('mouseout', null);
      };
  }, [data]);

  return (
    <svg ref={svgRef} width="500" height="500"></svg>
  );
};

export default StackedBarChart;
