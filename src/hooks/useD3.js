import {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const useD3 = (renderChartFn, dependencies) => {
    const ref = useRef();

    useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => {};
      }, [dependencies]);
    return ref;
}

export default useD3;
//this function is a hook that accepts two arguments, the render chart function contains d3 code to execute
//and the dependencies array is used to determine when the hook should be executed