import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const InteractiveScatterPlot = ({ data }) => {
  const svgRef = useRef(null);
  const [toggleValue, setToggleValue] = useState(1);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Create scale for scatterplot
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, 500]);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([500, 0]);
    const rScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.r)])
      .range([2, 10]);

    // Render scatterplot
    svg.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", d => rScale(d.r));

  }, [data, toggleValue]);

  // Event handler for drag toggle
  const handleToggleChange = (event) => {
    const value = event.target.value;
    setToggleValue(value);
  };

  return (
    <>
      <input type="range" min="1" max="10" value={toggleValue} onChange={handleToggleChange} />
      <svg ref={svgRef} width="500" height="500"></svg>
    </>
  );
};

export default InteractiveScatterPlot;
