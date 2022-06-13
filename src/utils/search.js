// type GetString<T> = (item: T) => string;

export default (array, input, getStringFromItem) => {
    if (!input) return array;

    const startWith = array.filter(
        (item) => getStringFromItem(item).toLowerCase().startsWith(input.toLowerCase()),
    );

    const contains = array.filter(
        (item) => getStringFromItem(item).toLowerCase().indexOf(input.toLowerCase()) !== -1,
    );

    const subtractStartWithFromContains = contains.filter(
        (containsItem) => !startWith.some(
            (startWithItem) => getStringFromItem(containsItem) === getStringFromItem(startWithItem),
        ),
    );

    return [...startWith, ...subtractStartWithFromContains];
};
