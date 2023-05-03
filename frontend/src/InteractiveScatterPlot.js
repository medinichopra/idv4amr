// import React, { useRef, useEffect, useState } from 'react';
// import * as d3 from 'd3';

// const ScatterPlot = ({ data }) => {
//   const svgRef = useRef();
//   const [togglePosition, setTogglePosition] = useState(0);

//   let svg;
//   let xScale;
//   let yScale;
  
//   useEffect(() => {
//     const margin = { top: 20, right: 20, bottom: 70, left: 70 };
//     const width = 500 - margin.left - margin.right;
//     const height = 500 - margin.top - margin.bottom;

//     const svg = d3.select(svgRef.current)
//       .attr('width', width + margin.left + margin.right)
//       .attr('height', height + margin.top + margin.bottom)
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//     const xScale = d3.scaleLinear()
//       .domain([d3.min(data, d => d.x) - 1, d3.max(data, d => d.x) + 1])
//       .range([0, width]);

//     const yScale = d3.scaleLinear()
//       .domain([d3.min(data, d => d.y) - 1, d3.max(data, d => d.y) + 1])
//       .range([height, 0]);

//     const xAxis = d3.axisBottom(xScale);
//     const yAxis = d3.axisLeft(yScale);

//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(xAxis);

//     svg.append('g')
//       .call(yAxis);

//     const circle = svg.selectAll('.circle')
//       .data(data)
//       .enter()
//       .append('circle')
//       .attr('class', 'circle')
//       .attr('cx', d => xScale(d.x))
//       .attr('cy', d => yScale(d.y))
//       .attr('r', 5)
//       .attr('fill', 'steelblue')
//       .on('mouseover', (event, d) => {
//         d3.select(event.target)
//           .transition()
//           .duration(100)
//           .attr('r', 8);

//         const tooltip = svg.append('text')
//           .attr('class', 'tooltip')
//           .text(`(${d.x}, ${d.y})`)
//           .attr('x', xScale(d.x) + 10)
//           .attr('y', yScale(d.y) - 10);
//       })
//       .on('mouseout', (event, d) => {
//         d3.select(event.target)
//           .transition()
//           .duration(200)
//           .attr('r', 5);

//         svg.selectAll('.tooltip').remove();
//       });

//       const interval = setInterval(() => {
//         const newData = data.map(d => ({
//           ...d,
//           y: togglePosition //getYCoordinate(togglePosition)
//         }));
      
//         const newCircle = svg.selectAll('.circle')
//           .data(newData);
      
//         newCircle.enter()
//           .append('circle')
//           .attr('class', 'circle')
//           .merge(newCircle)
//           .transition()
//           .duration(500) // set the duration to zero to update the circles instantly
//           .attr('cx', d => xScale(d.x))
//           .attr('cy', d => yScale(d.y))
//           .attr('r', 5)
//           .attr('fill', 'steelblue');
      
//         newCircle.exit().remove();
//       }  , 5000);
      
//       return () => clearInterval(interval);   
//   }, [data, togglePosition]);

//   const handleSliderChange = (event) => {
//     const value = event.target.value;
//     let newPosition = 0;
//     if (value <= 20) {
//       newPosition = 0;
//     } else if (value <= 40) {
//       newPosition = 1;
//     } else if (value <= 60) {
//       newPosition = 2;
//     } else if (value <= 80) {
//       newPosition = 3;
//     } else {
//       newPosition = 4;
//     }
//     setTogglePosition(newPosition);
  
//     const newY = [2, 4, 6, 8, 10][newPosition];
//     const newData = data.map((d) => ({ ...d, y: newY }));
  
//     const newCircle = svg.selectAll(".circle").data(newData);
  
//     newCircle
//       .enter()
//       .append("circle")
//       .attr("class", "circle")
//       .merge(newCircle)
//       .transition()
//       .duration(500)
//       .attr("cx", (d) => xScale(d.x))
//       .attr("cy", (d) => yScale(d.y))
//       .attr("r", 5)
//       .attr("fill", "steelblue");
  
//     newCircle.exit().remove();
//   }; 
  

//   return (
//     <div>
//     <input 
//          type="range" 
//          min="0" 
//          max="4" 
//          value={togglePosition} 
//         //  step="0.01"
//          onChange={handleSliderChange}
//          className="slider"
//          id="myRange"
//        />
//     <svg ref={svgRef}></svg>
//     </div>
//     );
// }
    
//   export default ScatterPlot;


// import React, { useRef, useEffect, useState } from 'react';
// import * as d3 from 'd3';

// const ScatterPlot = ({ data }) => {
//   const svgRef = useRef();
//   const [togglePosition, setTogglePosition] = useState(0);

//   useEffect(() => {
//     const margin = { top: 20, right: 20, bottom: 70, left: 70 };
//     const width = 500 - margin.left - margin.right;
//     const height = 500 - margin.top - margin.bottom;

//     const svg = d3.select(svgRef.current)
//       .attr('width', width + margin.left + margin.right)
//       .attr('height', height + margin.top + margin.bottom)
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//     const xScale = d3.scaleLinear()
//       .domain([d3.min(data, d => d.x) - 1, d3.max(data, d => d.x) + 1])
//       .range([0, width]);

//     const yScale = d3.scaleLinear()
//       .domain([d3.min(data, d => d.y) - 1, d3.max(data, d => d.y) + 1])
//       .range([height, 0]);

//     const xAxis = d3.axisBottom(xScale);
//     const yAxis = d3.axisLeft(yScale);

//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(xAxis);

//     svg.append('g')
//       .call(yAxis);

//     const circle = svg.selectAll('.circle')
//       .data(data)
//       .enter()
//       .append('circle')
//       .attr('class', 'circle')
//       .attr('cx', d => xScale(d.x))
//       .attr('cy', d => yScale(d.y))
//       .attr('r', 5)
//       .attr('fill', 'steelblue')
//       .on('mouseover', (event, d) => {
//         d3.select(event.target)
//           .transition()
//           .duration(100)
//           .attr('r', 8);

//         const tooltip = svg.append('text')
//           .attr('class', 'tooltip')
//           .text(`(${d.x}, ${d.y})`)
//           .attr('x', xScale(d.x) + 10)
//           .attr('y', yScale(d.y) - 10);
//       })
//       .on('mouseout', (event, d) => {
//         d3.select(event.target)
//           .transition()
//           .duration(200)
//           .attr('r', 5);

//         svg.selectAll('.tooltip').remove();
//       });

//     const interval = setInterval(() => {
//       const newData = data.map(d => ({
//         ...d,
//         y: togglePosition
//       }));

//       const newCircle = svg.selectAll('.circle')
//         .data(newData);

//       newCircle.enter()
//         .append('circle')
//         .merge(newCircle)
//         .transition()
//         .duration(1000)
//         .attr('cx', d => xScale(d.x))
//         .attr('cy', d => yScale(d.y));

//       newCircle.exit().remove();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [data, togglePosition]);

//   const handleSliderChange = event => {
//     setTogglePosition(event.target.value);
//   }

//   return (
//     <div>
//     <input 
//          type="range" 
//          min="0" 
//          max="100" 
//          value={togglePosition} 
//          onChange={handleSliderChange}
//          className="slider"
//          id="myRange"
//        />
//     <svg ref={svgRef}></svg>
//     </div>
//     );
// }
    
//   export default ScatterPlot;

import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 70, left: 70 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.x) - 1, d3.max(data, d => d.x) + 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.y) - 1, d3.max(data, d => d.y) + 1])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    const circle = svg.selectAll('.circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'steelblue')
      .on('mouseover', (event, d) => {
        d3.select(event.target)
          .transition()
          .duration(100)
          .attr('r', 8);

        const tooltip = svg.append('text')
          .attr('class', 'tooltip')
          .text(`(${d.x}, ${d.y})`)
          .attr('x', xScale(d.x) + 10)
          .attr('y', yScale(d.y) - 10);
      })
      .on('mouseout', (event, d) => {
        d3.select(event.target)
          .transition()
          .duration(200)
          .attr('r', 5);

        svg.selectAll('.tooltip').remove();
      });

    const interval = setInterval(() => {
      const newData = data.map(d => ({
        ...d,
        y: toggle ? (Math.floor(Math.random() * 2) + 1) : d.y
      }));

      const newCircle = svg.selectAll('.circle')
        .data(newData);

      newCircle.enter()
        .append('circle')
        .merge(newCircle)
        .transition()
        .duration(1000)
        .attr('cx', d => xScale(d.x))
        // .attr('cy', d => yScale(d.y));
        .attr('cy', d => yScale(Math.floor(Math.random() * (d3.max(data, d => d.y) - d3.min(data, d => d.y) + 1) + d3.min(data, d => d.y))))
        .on('mouseover', (event, d) => {
          d3.select(event.target)
            .transition()
            .duration(100)
            .attr('r', 8);
  
          const tooltip = svg.append('text')
            .attr('class', 'tooltip')
            .text(`(${d.x}, ${Math.floor(Math.random() * (d3.max(data, d => d.y) - d3.min(data, d => d.y) + 1) + d3.min(data, d => d.y))})`)
            .attr('x', xScale(d.x) + 10)
            .attr('y', yScale(Math.floor(Math.random() * (d3.max(data, d => d.y) - d3.min(data, d => d.y) + 1) + d3.min(data, d => d.y))) - 10);
        })
        .on('mouseout', (event, d) => {
          d3.select(event.target)
            .transition()
            .duration(200)
            .attr('r', 5);
  
          svg.selectAll('.tooltip').remove();
        });
      newCircle.exit().remove();
    }, setToggle);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <>
    <svg ref={svgRef}></svg>
    <button onClick={handleToggle}>Toggle Y-Coordinate</button>
    </>
    
  );
}

export default ScatterPlot;


// // // // import React, { useRef, useEffect } from 'react';
// // // // import * as d3 from 'd3';

// // // // const Scatterplot = ({ data }) => {
// // // //   const svgRef = useRef(null);

// // // //   useEffect(() => {
// // // //     const margin = { top: 20, right: 20, bottom: 70, left: 70 };
// // // //     const width = 500 - margin.left - margin.right;
// // // //     const height = 400 - margin.top - margin.bottom;

// // // //     const svg = d3.select(svgRef.current)
// // // //       .attr('width', width + margin.left + margin.right)
// // // //       .attr('height', height + margin.top + margin.bottom)
// // // //       .append('g')
// // // //       .attr('transform', `translate(${margin.left}, ${margin.top})`);

// // // //     const xScale = d3.scaleLinear()
// // // //       .domain([d3.min(data, d => d.x) - 1, d3.max(data, d => d.x) + 1])
// // // //       .range([0, width]);

// // // //     const yScale = d3.scaleLinear()
// // // //       .domain([d3.min(data, d => d.y) - 1, d3.max(data, d => d.y) + 1])
// // // //       .range([height, 0]);

// // // //     const xAxis = d3.axisBottom(xScale);
// // // //     const yAxis = d3.axisLeft(yScale);

// // // //     // const cx = 20;
// // // //     // const cy = 20;

// // // //     svg.append('g')
// // // //       .attr('transform', `translate(0, ${height})`)
// // // //       .call(xAxis);

// // // //     svg.append('g')
// // // //       .call(yAxis);

// // // //     svg.selectAll('circle')
// // // //       .data(data)
// // // //       .enter()
// // // //       .append('circle')
// // // //       // .transition() //added this
// // // //       // .duration(7000) //and this
// // // //       .attr('cx', d => xScale(d.x))
// // // //       // .attr("cx", function(d, i) {
// // // //       //   return cx + i * Math.random() * 1;
// // // //       // })
// // // //       .attr('cy', d => yScale(d.y))
// // // //       .attr('r', 5)
// // // //       // .attr("r", function(d, i) {
// // // //       //   return Math.sqrt(d * 2);
// // // //       // });
// // // //       .style('fill', 'steelblue')
// // // //       .on('mouseover', function (event, d) {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration('100')
// // // //           .attr('r', 10);
// // // //         svg.append('text')
// // // //           .attr('id', 'tooltip')
// // // //           .attr('x', xScale(d.x) - 20)
// // // //           .attr('y', yScale(d.y) - 20)
// // // //           .text(`(${d.x}, ${d.y})`);
// // // //       })
// // // //       .on('mouseout', function (event, d) {
// // // //         d3.select(this)
// // // //           .transition()
// // // //           .duration('100')
// // // //           .attr('r', 5);
// // // //         svg.select('#tooltip').remove();
// // // //       });

// // // //   }, [data]);

// // // //   return (
// // // //     <svg ref={svgRef}></svg>
// // // //   );
// // // // };

// // // // export default Scatterplot;