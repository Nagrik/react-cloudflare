import  { useState } from 'react';


const useToggle = (defaultValue = false) => {
    const [isOn, toggle] = useState(defaultValue);

    const handleToggle = (value) => {
        const toggleState = typeof value === 'boolean' ? value : !isOn;

        toggle(toggleState);
    };

    return [isOn, handleToggle];
};


export default useToggle;