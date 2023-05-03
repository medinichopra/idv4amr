import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

function Scatterplot() {
  const svgRef = useRef(null);
  const [data, setData] = useState(
    [
    { x: 10, y: 20 },
    { x: 20, y: 30 },
    { x: 30, y: 40 },
    { x: 40, y: 50 },
  ]);
  const [yCoords, setYCoords] = useState([])

  useEffect(() => {
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([500, 0]);

    setYCoords(data.map(d => yScale(d.y)));

    const svg = d3.select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .attr("cy", (d, i) => yCoords[i]);
  }, [data]);

  const updatePoints = (newData) => {
    setData(newData);

    // Define your updated y-scale
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(newData, d => d.y)])
      .range([500, 0]);

    const newYCoords = newData.map(d => yScale(d.y));
    // Transition your data points to their new positions
    const svg = d3.select(svgRef.current);
    svg.selectAll("circle")
      .data(newData)
      .transition()
      .duration(1000)
      .attrTween("cy", function(d, i) {
        //const currentY = yCoords[i]
        const currentY = i === 0 ? yCoords[i] : newYCoords[i - 1];
        const newY = newYCoords[i];
        return d3.interpolateNumber(currentY, newY);
      });
      // .attr("cy", (d, i) => newYCoords[i]);

    setData(newData);
    setYCoords(newYCoords);
  };

  const handleButtonClick = () => {
    // const updatedData = data.map(d => ({ x: d.x, y: d.y + 10 }));
    const updatedData = data.map(d => ({
      x: d.x,
      y: (Math.floor(Math.random() * 2) + 1)
    }));
    updatePoints(updatedData);
  };

  return (
    <div>
      <svg ref={svgRef} width={500} height={500}>
        {data.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={5} fill="blue" />
        ))}
      </svg>
      <button onClick={() => handleButtonClick()}>Update Points</button>
    </div>
  );
}

export default Scatterplot;


// import React, { useRef, useEffect } from "react";
// import * as d3 from "d3";

// function Scatter() {
//   const svgRef = useRef(null);

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);

//     // Define your data
//     const data = [
//       { x: 10, y: 20 },
//       { x: 20, y: 30 },
//       { x: 30, y: 40 },
//       { x: 40, y: 50 },
//     ];
    
//     // Define your scales
//     const xScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.x)])
//       .range([0, 500]);

//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.y)])
//       .range([500, 0]);

//     // Add your data points
//     svg.selectAll("circle")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", d => xScale(d.x))
//       .attr("cy", d => yScale(d.y))
//       .attr("r", 5)
//       .attr("fill", "blue");

//   }, []);

//   function updateYValues(data, deltaY) {
//     return data.map(d => ({ x: d.x, y: d.y + deltaY }));
//   }

//   const updatePoints = () => {
//     // Define your updated data
//     const updatedData = [    { x: 10, y: 30 },    { x: 20, y: 40 },    { x: 30, y: 50 },    { x: 40, y: 60 },  ];
  
//     const deltaY = 10; // change this to the desired value
  
//     // Update the y values of the data
//     const updatedYData = updateYValues(updatedData, deltaY);
  
//     // Define your updated y-scale
//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(updatedYData, d => d.y)])
//       .range([500, 0]);
  
//     // Transition your data points to their new positions
//     const svg = d3.select(svgRef.current);
//     svg.selectAll("circle")
//       .data(updatedYData)
//       .transition()
//       .duration(1000)
//       .attr("cy", d => yScale(d.y));
//   };

//   return (
//     <div>
//       <svg ref={svgRef} width={500} height={500}></svg>
//       <button onClick={updatePoints}>Update Points</button>
//     </div>
//   );
// }

// export default Scatter;
