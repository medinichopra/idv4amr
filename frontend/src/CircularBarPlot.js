import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = [
  {
    group: "Group 1",
    subgroups: [
      { name: "Subgroup 1", value: 10 },
      { name: "Subgroup 2", value: 20 },
      { name: "Subgroup 3", value: 30 },
    ],
  },
  {
    group: "Group 2",
    subgroups: [
      { name: "Subgroup 1", value: 40 },
      { name: "Subgroup 2", value: 50 },
      { name: "Subgroup 3", value: 60 },
    ],
  },
];

const width = 500;
const height = 500;

const CircularGroupedBarChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define the scales
    const x = d3
      .scaleBand()
      .range([0, 2 * Math.PI])
      .align(0)
      .domain(data.map((d) => d.group));

    const y = d3
      .scaleLinear()
      .range([0, height / 2 - 50])
      .domain([0, d3.max(data, (d) => d3.max(d.subgroups, (d) => d.value))]);

    const z = d3
      .scaleOrdinal()
      .range(d3.schemeCategory10)
      .domain(data.map((d) => d.group));

    // Draw the bars
    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr(
        "transform",
        (d) => `rotate(${((x(d.group) + x.bandwidth() / 2) * 180) / Math.PI - 90}) translate(${height / 2},0)`
      )
      .selectAll("rect")
      .data((d) => d.subgroups)
      .join("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => -y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(d.value))
      .attr("fill", (d) => z(d.name));

    // Draw the x-axis
    svg
      .append("g")
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .selectAll("g")
      .data(data)
      .join("g")
      .attr(
        "transform",
        (d) => `rotate(${((x(d.group) + x.bandwidth() / 2) * 180) / Math.PI - 90}) translate(${height / 2},0)`
      )
      .append("text")
      .attr("transform", (d) => (x(d.group) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90) translate(0, 5)" : "rotate(-90) translate(0, -7)")
      .text((d) => d.group);

  }, []);

  return (
    <svg width={width} height={height} ref={svgRef}></svg>
  );
};

export default CircularGroupedBarChart;
