import React, { useState } from 'react';




export default (defaultValue = '') => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (data) => {
        const valueInput = typeof data === 'string' ? data : data.target.value;

        setValue(valueInput);
    };

    return [value, onChange];
};
