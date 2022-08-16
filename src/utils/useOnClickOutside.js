import React, { useEffect } from 'react';


const useOnClickOutside =  (callback) => {
    const containerRef = React.useRef(null);

    useEffect(() => {
        const listener = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                callback();
            }

            return null;
        };

        document.body.addEventListener('click', listener);

        return () => {
            document.body.addEventListener('click', listener);
        };
    }, [callback]);

    return containerRef;
};

export default useOnClickOutside;