// use the useD3 hook
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function DonutChart(props) {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = props.data;

    // Set up the SVG element and dimensions
    const svg = d3.select(svgRef.current);
    const width = svg.attr('width');
    const height = svg.attr('height');
    const radius = Math.min(width, height) / 2;
    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Set up the color scale
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(d3.schemeCategory10);

    // Set up the arc generator
    const arcGenerator = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    // Set up the pie generator
    const pieGenerator = d3.pie()
      .value(d => d.value)
      .sort(null);

    // Draw the arcs
    const arcs = g.selectAll('.arc')
      .data(pieGenerator(data))
      .enter().append('g')
        .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arcGenerator)
      .attr('fill', d => colorScale(d.data.label))
      .on("mouseover", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", d3.arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius * 0.9)
          );
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arcGenerator);
      });

    // Draw the labels
    arcs.append('text')
      .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => d.data.label);
  }, [props.data]);

  return (
    <svg ref={svgRef} width={props.width} height={props.height}></svg>
  );
}

export default DonutChart;