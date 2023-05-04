import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import BarChart from "./BarChart";
import Circles from "./Circle";
import DonutChart from "./DonutChart";
// import CircularGroupedBarChart from "./CircularBarPlot";
import WorldMap from "./WorldMap";
import InteractiveBarChart from "./InteractiveBar";
import ScatterPlot from "./InteractiveScatterPlot";
// import bar from "C:Users/medin/OneDrive/Desktop/idv4amr/idv4amr/frontend/data/bar.json"
import React, { useState } from 'react';
import Scatter from "./scatters";
import StackedBarChart from "./StackedBar";


function App() {

    const data = [
        {year: 1980, efficiency: 24.3, sales: 8949000},
        {year: 1985, efficiency: 27.6, sales: 10979000},
        {year: 1990, efficiency: 28,   sales:9303000},
        {year: 1991, efficiency: 28.4, sales: 8185000},
        {year: 1992, efficiency: 27.9, sales: 8213000},
        {year: 1993, efficiency: 28.4, sales: 8518000},
        {year: 1994, efficiency: 28.3, sales: 8991000},
        {year: 1995, efficiency: 28.6, sales: 8620000},
        {year: 1996, efficiency: 28.5, sales: 8479000},
        {year: 1997, efficiency: 28.7, sales: 8217000},
        {year: 1998, efficiency: 28.8, sales: 8085000},
        {year: 1999, efficiency: 28.3, sales: 8638000},
        {year: 2000, efficiency: 28.5, sales: 8778000},
        {year: 2001, efficiency: 28.8, sales: 8352000},
        {year: 2002, efficiency: 29,   sales:8042000},
        {year: 2003, efficiency: 29.5, sales: 7556000},
        {year: 2004, efficiency: 29.5, sales: 7483000},
        {year: 2005, efficiency: 30.3, sales: 7660000},
        {year: 2006, efficiency: 30.1, sales: 7762000},
        {year: 2007, efficiency: 31.2, sales: 7562000},
        {year: 2008, efficiency: 31.5, sales: 6769000},
        {year: 2009, efficiency: 32.9, sales: 5402000},
        {year: 2010, efficiency: 33.9, sales: 5636000},
        {year: 2011, efficiency: 33.1, sales: 6093000},
        {year: 2012, efficiency: 35.3, sales: 7245000},
        {year: 2013, efficiency: 36.4, sales: 7586000},
        {year: 2014, efficiency: 36.5, sales: 7708000},
        {year: 2015, efficiency: 37.2, sales: 7517000},
        {year: 2016, efficiency: 37.7, sales: 6873000},
        {year: 2017, efficiency: 39.4, sales: 6081000}
      ]

    const data_2 = [
          { label: 'PEN', value: 10 },
          { label: 'OXA', value: 20 },
          { label: 'FLC', value: 30 },
          { label: 'CXM', value: 40 },
          { label: 'AMX', value: 40 },
          { label: 'AMC', value: 40 }
        ]
    const data_3 = [
        { name: 'A', value: 20, value2: 30, value3: 40  },
        { name: 'B', value: 40, value2: 60, value3: 80  },
        { name: 'C', value: 60, value2: 10, value3: 20  },
        { name: 'D', value: 80, value2: 30, value3: 50  },
        { name: 'E', value: 100, value2: 70, value3: 20  }
    ]    
    const data_4 = [
            { x: 10, y: 20 },
            { x: 20, y: 30 },
            { x: 30, y: 40 },
            { x: 40, y: 50 },
            { x: 50, y: 60 },
          ];
            
    const data_5 = [
        { category: "PEN", R: 5,  S: 20, I: 30, total: 80 },
        { category: "OXA", R: 20, S: 15, I: 10, total: 80 },
        { category: "FLC", R: 30, S: 10, I: 20, total: 80 },
        { category: "AMX", R: 10, S: 5,  I: 10, total: 80 },
        { category: "CXM", R: 40, S: 10, I: 10, total: 80 }
    ];

    return (
        <Router>
            <div className="App">
                <Navbar />  
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <header className="App-header">
                            </header>
                            <div > 
                            {/* style={{ display: 'flex' }} */}
                            <h1>E.Coli</h1>
                            <StackedBarChart data={data_5}/>
                            {/* <InteractiveBarChart data={data_3}/> */}
                            {/* <BarChart data={data}/> */}
                            <h1>Interactive Scatter Plot</h1>
                            {/* <button id="btn" onclick="setInterval()">Change Data</button> */}
                            <ScatterPlot data={data_4} />
                            {/* <Scatter></Scatter> */}
                            </div>                            
                            <div>
                            <h1>% of R to E.Coli</h1>
                            <DonutChart data={data_2} width={400} height={300} />
                            </div> 
                            <WorldMap/>

                            <Home />
                        </Route>
                        <Route exact path="/create">
                            <Create/ >
                        </Route>
                        <Route exact path="/blogs/:id">
                            <Circles></Circles>
                            <BlogDetails/>
                        </Route>
                        <Route path="*">
                            <NotFound/>
                        </Route>
                    </Switch>
                    {/* <Home />
                    <p>Liked {likes} times</p>
                    <a href={link}>Link</a> */}
                </div>
            </div>
        </Router>
    );
}

export default App;