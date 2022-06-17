import  { useState } from 'react';


export default (defaultValue = false) => {
    const [isOn, toggle] = useState(defaultValue);

    const handleToggle = (value) => {
        const toggleState = typeof value === 'boolean' ? value : !isOn;

        toggle(toggleState);
    };

    return [isOn, handleToggle];
};
