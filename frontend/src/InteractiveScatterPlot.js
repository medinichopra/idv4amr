import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function ScatterPlot() {
  const [data, setData] = useState([
    { x: 'E.Coli', y: 30 },
    { x: 'E', y: 50 },
    { x: 'F', y: 20 },
    { x: 'G', y: 30 },
    { x: 'H', y: 50 },
  ]);
  const [isToggled, setIsToggled] = useState(false);

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Set the dimensions and margins of the plot
    const margin = { top: 20, right: 30, bottom: 30, left: 60 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Add the x-axis
    const x = d3.scaleBand()
      .domain(data.map((d) => d.x))
      .range([0, width])
      .padding(0.1);
    svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
      .call(d3.axisBottom(x));

    // Add the y-axis
    const y = d3.scaleLinear()
      .domain([0, 80])
      .range([height, 0 ]); // 
    svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").call(d3.axisLeft(y));

    // Add the scatter plot
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.x) + margin.left + x.bandwidth() / 2;
      })
      .attr("cy", function (d) {
        return y(d.y) + margin.top; // - margin.left
      })
      .attr("r", 5)
      .style("fill", "red");
  }, [data]);

  // Define the function to toggle the scatter plot
  function togglePlot() {
    if (isToggled) {
      setData([
        { x: 'E.Coli', y: 30 },
        { x: 'E', y: 50 },
        { x: 'F', y: 20 },
        { x: 'G', y: 30 },
        { x: 'H', y: 50 },
      ]);
    } else {
      setData([
        { x: 'E.Coli', y: 15 },
        { x: 'E', y: 30 },
        { x: 'F', y: 10 },
        { x: 'G', y: 50 },
        { x: 'H', y: 60 },
      ]);
    }
    setIsToggled(!isToggled);
  }

  // Use D3 to update the points on the scatter plot
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const y = d3.scaleLinear().domain([0, 80]).range([400, 0]);

    svg
      .selectAll("circle")
      .data(data)
      .transition()
      .duration(1000)
      .attr("cy", function (d) {
        return y(d.y) ; //+ 20
      });
      // .transition()
      // .duration(1000)
      // .attr("cy", function (d) {
      //   return y(d.y);
      // });
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={400} height={400} />
      <button onClick={togglePlot}>
        {isToggled ? "Show Original" : "Show Updated"}
      </button>
    </div>
  );
}

export default ScatterPlot;


// import React, { useRef, useEffect, useState } from 'react';
// import * as d3 from 'd3';

// const InteractiveScatterPlot = ({ data }) => {
//   const svgRef = useRef(null);
//   const [toggleValue, setToggleValue] = useState(1);

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);

//     // Create scale for scatterplot
//     const xScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.x)])
//       .range([0, 500]);
//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.y)])
//       .range([500, 0]);
//     const rScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.r)])
//       .range([2, 10]);

//     // Render scatterplot
//     svg.selectAll("circle")
//       .data(data)
//       .join("circle")
//       .attr("cx", d => xScale(d.x))
//       .attr("cy", d => yScale(d.y))
//       .attr("r", d => rScale(d.r));

//   }, [data, toggleValue]);

//   // Event handler for drag toggle
//   const handleToggleChange = (event) => {
//     const value = event.target.value;
//     setToggleValue(value);
//   };

//   return (
//   <>
//     <input type="range" min="1" max="10" value={toggleValue} onChange={handleToggleChange} />
//     <svg ref={svgRef} width="500" height="500"></svg>
//   </>
// );
// };

// export default InteractiveScatterPlot;

// // import React, { useRef, useEffect, useState } from 'react';
// // import * as d3 from 'd3';

// // const ScatterPlot = ({ data }) => {
// //   const svgRef = useRef();
// //   const [togglePosition, setTogglePosition] = useState(0);

// //   let svg;
// //   let xScale;
// //   let yScale;
  
// //   useEffect(() => {
// //     const margin = { top: 20, right: 20, bottom: 70, left: 70 };
// //     const width = 500 - margin.left - margin.right;
// //     const height = 500 - margin.top - margin.bottom;

// //     const svg = d3.select(svgRef.current)
// //       .attr('width', width + margin.left + margin.right)
// //       .attr('height', height + margin.top + margin.bottom)
// //       .append('g')
// //       .attr('transform', `translate(${margin.left},${margin.top})`);

// //     const xScale = d3.scaleLinear()
// //       .domain([d3.min(data, d => d.x) - 1, d3.max(data, d => d.x) + 1])
// //       .range([0, width]);

// //     const yScale = d3.scaleLinear()
// //       .domain([d3.min(data, d => d.y) - 1, d3.max(data, d => d.y) + 1])
// //       .range([height, 0]);

// //     const xAxis = d3.axisBottom(xScale);
// //     const yAxis = d3.axisLeft(yScale);

// //     svg.append('g')
// //       .attr('transform', `translate(0, ${height})`)
// //       .call(xAxis);

// //     svg.append('g')
// //       .call(yAxis);

// //     const circle = svg.selectAll('.circle')
// //       .data(data)
// //       .enter()
// //       .append('circle')
// //       .attr('class', 'circle')
// //       .attr('cx', d => xScale(d.x))
// //       .attr('cy', d => yScale(d.y))
// //       .attr('r', 5)
// //       .attr('fill', 'steelblue')
// //       .on('mouseover', (event, d) => {
// //         d3.select(event.target)
// //           .transition()
// //           .duration(100)
// //           .attr('r', 8);

// //         const tooltip = svg.append('text')
// //           .attr('class', 'tooltip')
// //           .text(`(${d.x}, ${d.y})`)
// //           .attr('x', xScale(d.x) + 10)
// //           .attr('y', yScale(d.y) - 10);
// //       })
// //       .on('mouseout', (event, d) => {
// //         d3.select(event.target)
// //           .transition()
// //           .duration(200)
// //           .attr('r', 5);

// //         svg.selectAll('.tooltip').remove();
// //       });

// //       const interval = setInterval(() => {
// //         const newData = data.map(d => ({
// //           ...d,
// //           y: togglePosition //getYCoordinate(togglePosition)
// //         }));
      
// //         const newCircle = svg.selectAll('.circle')
// //           .data(newData);
      
// //         newCircle.enter()
// //           .append('circle')
// //           .attr('class', 'circle')
// //           .merge(newCircle)
// //           .transition()
// //           .duration(500) // set the duration to zero to update the circles instantly
// //           .attr('cx', d => xScale(d.x))
// //           .attr('cy', d => yScale(d.y))
// //           .attr('r', 5)
// //           .attr('fill', 'steelblue');
      
// //         newCircle.exit().remove();
// //       }  , 5000);
      
// //       return () => clearInterval(interval);   
// //   }, [data, togglePosition]);

// //   const handleSliderChange = (event) => {
// //     const value = event.target.value;
// //     let newPosition = 0;
// //     if (value <= 20) {
// //       newPosition = 0;
// //     } else if (value <= 40) {
// //       newPosition = 1;
// //     } else if (value <= 60) {
// //       newPosition = 2;
// //     } else if (value <= 80) {
// //       newPosition = 3;
// //     } else {
// //       newPosition = 4;
// //     }
// //     setTogglePosition(newPosition);
  
// //     const newY = [2, 4, 6, 8, 10][newPosition];
// //     const newData = data.map((d) => ({ ...d, y: newY }));
  
// //     const newCircle = svg.selectAll(".circle").data(newData);
  
// //     newCircle
// //       .enter()
// //       .append("circle")
// //       .attr("class", "circle")
// //       .merge(newCircle)
// //       .transition()
// //       .duration(500)
// //       .attr("cx", (d) => xScale(d.x))
// //       .attr("cy", (d) => yScale(d.y))
// //       .attr("r", 5)
// //       .attr("fill", "steelblue");
  
// //     newCircle.exit().remove();
// //   }; 
  

// //   return (
// //     <div>
// //     <input 
// //          type="range" 
// //          min="0" 
// //          max="4" 
// //          value={togglePosition} 
// //         //  step="0.01"
// //          onChange={handleSliderChange}
// //          className="slider"
// //          id="myRange"
// //        />
// //     <svg ref={svgRef}></svg>
// //     </div>
// //     );
// // }
    
// //   export default ScatterPlot;


// // import React, { useRef, useEffect, useState } from 'react';
// // import * as d3 from 'd3';

// // const ScatterPlot = ({ data }) => {
// //   const svgRef = useRef();
// //   const [togglePosition, setTogglePosition] = useState(0);

// //   useEffect(() => {
// //     const margin = { top: 20, right: 20, bottom: 70, left: 70 };
// //     const width = 500 - margin.left - margin.right;
// //     const height = 500 - margin.top - margin.bottom;

// //     const svg = d3.select(svgRef.current)
// //       .attr('width', width + margin.left + margin.right)
// //       .attr('height', height + margin.top + margin.bottom)
// //       .append('g')
// //       .attr('transform', `translate(${margin.left},${margin.top})`);

// //     const xScale = d3.scaleLinear()
// //       .domain([d3.min(data, d => d.x) - 1, d3.max(data, d => d.x) + 1])
// //       .range([0, width]);

// //     const yScale = d3.scaleLinear()
// //       .domain([d3.min(data, d => d.y) - 1, d3.max(data, d => d.y) + 1])
// //       .range([height, 0]);

// //     const xAxis = d3.axisBottom(xScale);
// //     const yAxis = d3.axisLeft(yScale);

// //     svg.append('g')
// //       .attr('transform', `translate(0, ${height})`)
// //       .call(xAxis);

// //     svg.append('g')
// //       .call(yAxis);

// //     const circle = svg.selectAll('.circle')
// //       .data(data)
// //       .enter()
// //       .append('circle')
// //       .attr('class', 'circle')
// //       .attr('cx', d => xScale(d.x))
// //       .attr('cy', d => yScale(d.y))
// //       .attr('r', 5)
// //       .attr('fill', 'steelblue')
// //       .on('mouseover', (event, d) => {
// //         d3.select(event.target)
// //           .transition()
// //           .duration(100)
// //           .attr('r', 8);

// //         const tooltip = svg.append('text')
// //           .attr('class', 'tooltip')
// //           .text(`(${d.x}, ${d.y})`)
// //           .attr('x', xScale(d.x) + 10)
// //           .attr('y', yScale(d.y) - 10);
// //       })
// //       .on('mouseout', (event, d) => {
// //         d3.select(event.target)
// //           .transition()
// //           .duration(200)
// //           .attr('r', 5);

// //         svg.selectAll('.tooltip').remove();
// //       });

// //     const interval = setInterval(() => {
// //       const newData = data.map(d => ({
// //         ...d,
// //         y: togglePosition
// //       }));

// //       const newCircle = svg.selectAll('.circle')
// //         .data(newData);

// //       newCircle.enter()
// //         .append('circle')
// //         .merge(newCircle)
// //         .transition()
// //         .duration(1000)
// //         .attr('cx', d => xScale(d.x))
// //         .attr('cy', d => yScale(d.y));

// //       newCircle.exit().remove();
// //     }, 5000);

// //     return () => clearInterval(interval);
// //   }, [data, togglePosition]);

// //   const handleSliderChange = event => {
// //     setTogglePosition(event.target.value);
// //   }

// //   return (
// //     <div>
// //     <input 
// //          type="range" 
// //          min="0" 
// //          max="100" 
// //          value={togglePosition} 
// //          onChange={handleSliderChange}
// //          className="slider"
// //          id="myRange"
// //        />
// //     <svg ref={svgRef}></svg>
// //     </div>
// //     );
// // }
    
// //   export default ScatterPlot;

// // import React, { useState, useRef, useEffect } from 'react';
// // import * as d3 from 'd3';

// // const ScatterPlot = ({ data }) => {
// //   const svgRef = useRef();
// //   const [toggle, setToggle] = useState(false);

// //   const handleToggle = () => {
// //     setToggle(!toggle);
// //   };

// //   useEffect(() => {
// //     const margin = { top: 20, right: 20, bottom: 70, left: 70 };
// //     const width = 500 - margin.left - margin.right;
// //     const height = 500 - margin.top - margin.bottom;

// //     const svg = d3.select(svgRef.current)
// //       .attr('width', width + margin.left + margin.right)
// //       .attr('height', height + margin.top + margin.bottom)
// //       .append('g')
// //       .attr('transform', `translate(${margin.left},${margin.top})`);

// //     const xScale = d3.scaleLinear()
// //       .domain([d3.min(data, d => d.x) - 1, d3.max(data, d => d.x) + 1])
// //       .range([0, width]);

// //     const yScale = d3.scaleLinear()
// //       .domain([d3.min(data, d => d.y) - 1, d3.max(data, d => d.y) + 1])
// //       .range([height, 0]);

// //     const xAxis = d3.axisBottom(xScale);
// //     const yAxis = d3.axisLeft(yScale);

// //     svg.append('g')
// //       .attr('transform', `translate(0, ${height})`)
// //       .call(xAxis);

// //     svg.append('g')
// //       .call(yAxis);

// //     const circle = svg.selectAll('.circle')
// //       .data(data)
// //       .enter()
// //       .append('circle')
// //       .attr('class', 'circle')
// //       .attr('cx', d => xScale(d.x))
// //       .attr('cy', d => yScale(d.y))
// //       .attr('r', 5)
// //       .attr('fill', 'steelblue')
// //       .on('mouseover', (event, d) => {
// //         d3.select(event.target)
// //           .transition()
// //           .duration(100)
// //           .attr('r', 8);

// //         const tooltip = svg.append('text')
// //           .attr('class', 'tooltip')
// //           .text(`(${d.x}, ${d.y})`)
// //           .attr('x', xScale(d.x) + 10)
// //           .attr('y', yScale(d.y) - 10);
// //       })
// //       .on('mouseout', (event, d) => {
// //         d3.select(event.target)
// //           .transition()
// //           .duration(200)
// //           .attr('r', 5);

// //         svg.selectAll('.tooltip').remove();
// //       });

// //     const interval = setInterval(() => {
// //       const newData = data.map(d => ({
// //         ...d,
// //         y: toggle ? (Math.floor(Math.random() * 2) + 1) : d.y
// //       }));

// //       const newCircle = svg.selectAll('.circle')
// //         .data(newData);

// //       newCircle.enter()
// //         .append('circle')
// //         .merge(newCircle)
// //         .transition()
// //         .duration(1000)
// //         .attr('cx', d => xScale(d.x))
// //         // .attr('cy', d => yScale(d.y));
// //         .attr('cy', d => yScale(Math.floor(Math.random() * (d3.max(data, d => d.y) - d3.min(data, d => d.y) + 1) + d3.min(data, d => d.y))))
// //         .on('mouseover', (event, d) => {
// //           d3.select(event.target)
// //             .transition()
// //             .duration(100)
// //             .attr('r', 8);
  
// //           const tooltip = svg.append('text')
// //             .attr('class', 'tooltip')
// //             .text(`(${d.x}, ${Math.floor(Math.random() * (d3.max(data, d => d.y) - d3.min(data, d => d.y) + 1) + d3.min(data, d => d.y))})`)
// //             .attr('x', xScale(d.x) + 10)
// //             .attr('y', yScale(Math.floor(Math.random() * (d3.max(data, d => d.y) - d3.min(data, d => d.y) + 1) + d3.min(data, d => d.y))) - 10);
// //         })
// //         .on('mouseout', (event, d) => {
// //           d3.select(event.target)
// //             .transition()
// //             .duration(200)
// //             .attr('r', 5);
  
// //           svg.selectAll('.tooltip').remove();
// //         });
// //       newCircle.exit().remove();
// //     }, setToggle);

// //     return () => clearInterval(interval);
// //   }, [data]);

// //   return (
// //     <>
// //     <svg ref={svgRef}></svg>
// //     <button onClick={handleToggle}>Toggle Y-Coordinate</button>
// //     </>
    
// //   );
// // }

// // export default ScatterPlot;


// // // // // import React, { useRef, useEffect } from 'react';
// // // // // import * as d3 from 'd3';

// // // // // const Scatterplot = ({ data }) => {
// // // // //   const svgRef = useRef(null);

// // // // //   useEffect(() => {
// // // // //     const margin = { top: 20, right: 20, bottom: 70, left: 70 };
// // // // //     const width = 500 - margin.left - margin.right;
// // // // //     const height = 400 - margin.top - margin.bottom;

// // // // //     const svg = d3.select(svgRef.current)
// // // // //       .attr('width', width + margin.left + margin.right)
// // // // //       .attr('height', height + margin.top + margin.bottom)
// // // // //       .append('g')
// // // // //       .attr('transform', `translate(${margin.left}, ${margin.top})`);

// // // // //     const xScale = d3.scaleLinear()
// // // // //       .domain([d3.min(data, d => d.x) - 1, d3.max(data, d => d.x) + 1])
// // // // //       .range([0, width]);

// // // // //     const yScale = d3.scaleLinear()
// // // // //       .domain([d3.min(data, d => d.y) - 1, d3.max(data, d => d.y) + 1])
// // // // //       .range([height, 0]);

// // // // //     const xAxis = d3.axisBottom(xScale);
// // // // //     const yAxis = d3.axisLeft(yScale);

// // // // //     // const cx = 20;
// // // // //     // const cy = 20;

// // // // //     svg.append('g')
// // // // //       .attr('transform', `translate(0, ${height})`)
// // // // //       .call(xAxis);

// // // // //     svg.append('g')
// // // // //       .call(yAxis);

// // // // //     svg.selectAll('circle')
// // // // //       .data(data)
// // // // //       .enter()
// // // // //       .append('circle')
// // // // //       // .transition() //added this
// // // // //       // .duration(7000) //and this
// // // // //       .attr('cx', d => xScale(d.x))
// // // // //       // .attr("cx", function(d, i) {
// // // // //       //   return cx + i * Math.random() * 1;
// // // // //       // })
// // // // //       .attr('cy', d => yScale(d.y))
// // // // //       .attr('r', 5)
// // // // //       // .attr("r", function(d, i) {
// // // // //       //   return Math.sqrt(d * 2);
// // // // //       // });
// // // // //       .style('fill', 'steelblue')
// // // // //       .on('mouseover', function (event, d) {
// // // // //         d3.select(this)
// // // // //           .transition()
// // // // //           .duration('100')
// // // // //           .attr('r', 10);
// // // // //         svg.append('text')
// // // // //           .attr('id', 'tooltip')
// // // // //           .attr('x', xScale(d.x) - 20)
// // // // //           .attr('y', yScale(d.y) - 20)
// // // // //           .text(`(${d.x}, ${d.y})`);
// // // // //       })
// // // // //       .on('mouseout', function (event, d) {
// // // // //         d3.select(this)
// // // // //           .transition()
// // // // //           .duration('100')
// // // // //           .attr('r', 5);
// // // // //         svg.select('#tooltip').remove();
// // // // //       });

// // // // //   }, [data]);

// // // // //   return (
// // // // //     <svg ref={svgRef}></svg>
// // // // //   );
// // // // // };

// // // // // export default Scatterplot;