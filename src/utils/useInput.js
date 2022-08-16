import { useState } from 'react';


const useInput = (defaultValue = '') => {
    const [value, setValue] = useState(defaultValue);
    const onChange = (data) => {
        const valueInput = typeof data === 'string' ? data : data.target.value;
        setValue(valueInput);
    };
    return [value, onChange];
};

export default useInput;