import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const InteractiveBarChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // set chart dimensions and margins
    const margin = { top: 30, right: 20, bottom: 50, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    // create scales
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, (d) => d.value)]);

    // create axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // append x axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-0.8em')
      .attr('dy', '-0.15em')
      // .attr('transform', 'rotate(-65)')
      ;

    // append y axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    // append bars
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('fill', 'steelblue')
      .on('mouseover', function (event, d) {
        // show value on hover
        d3.select(this)
          .transition()
          .duration(100)
          .attr('fill', 'orange');

        svg
          .append('text')
          .attr('class', 'value')
          .attr('x', x(d.name) + x.bandwidth()*1.25)
          .attr('y', y(d.value) + 12)
          .text(d.value)
          .attr('text-anchor', 'middle')
          .attr('font-size', '14px')
          .attr('font-weight', 'bold');
      })
      .on('mouseout', function (event, d) {
        // remove value on mouseout
        d3.select(this)
          .transition()
          .duration(100)
          .attr('fill', 'steelblue');

        svg.selectAll('.value').remove();
      });
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={500} height={400}></svg>
    </div>
  );
};

export default InteractiveBarChart;

// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const InteractiveBarChart = ({ data, width, height }) => {
//   const svgRef = useRef(null);

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);

//     // Add X axis
//     const x = d3.scaleBand()
//       .domain(data.map((d) => d.name))
//       .range([0, width])
//       .padding(0.2);

//     svg.select('.x-axis')
//       .call(d3.axisBottom(x))
//       .attr('transform', `translate(0, ${height})`);

//     // Add Y axis
//     const y = d3.scaleLinear()
//       .domain([0, d3.max(data, (d) => d.value)])
//       .nice()
//       .range([height, 0]);

//     svg.select('.y-axis')
//       .call(d3.axisLeft(y));

//     // Add bars
//     const bars = svg.select('.chart')
//       .selectAll('.bar')
//       .data(data)
//       .join('rect')
//       .attr('class', 'bar')
//       .attr('x', (d) => x(d.name))
//       .attr('y', (d) => y(d.value))
//       .attr('width', x.bandwidth())
//       .attr('height', (d) => height - y(d.value))
//       .attr('fill', '#69b3a2')
//       .on('mouseover', function(d) {
//         // Show value on right side when hovering over bar
//         svg.select('.value')
//           .text(d.value)
//           .attr('opacity', 1)
//           .attr('x', x(d.name) + x.bandwidth() + 5)
//           .attr('y', y(d.value) + 12);
//       })
//       .on('mouseout', function() {
//         // Hide value when not hovering over bar
//         svg.select('.value')
//           .attr('opacity', 0);
//       });

//     // Add label for value on right side
//     svg.append('text')
//       .attr('class', 'value')
//       .attr('text-anchor', 'start')
//       .attr('font-size', '12px')
//       .attr('opacity', 0);
//   }, [data, height, width]);

//   return (
//     <svg ref={svgRef} width={width} height={height}>
//       <g className="chart" />
//       <g className="x-axis" />
//       <g className="y-axis" />
//     </svg>
//   );
// };

// export default InteractiveBarChart;
