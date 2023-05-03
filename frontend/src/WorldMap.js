import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
// import worldMapData from "C:/Users/medin/OneDrive/Desktop/idv4amr/idv4amr/src/WorldMapData.json"

const WorldMap = () => {
  const width = 800;
  const height = 400;

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const projection = d3.geoMercator().scale(120);
    const path = d3.geoPath(projection);

    const g = svg.append("g");

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(
      (data) => {
        const countries = topojson.feature(data, data.objects.countries);
        g.selectAll("path")
          .data(countries.features)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", path)
          .on("mouseover", function () {
            d3.select(this).style("fill", "blue");
          })
          .on("mouseout", function () {
            d3.select(this).style("fill", "#ccc");
          })
          .on("click", function() {
            d3.select(this).style("fill", "red");
          })
          ;
      }
    );
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default WorldMap;