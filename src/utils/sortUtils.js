// export enum SortOrder {
//     ASCENDING = 'asc',
//         DESCENDING = 'desc'
// }

// export enum SortType {
//     String = 'string',
//         Number = 'number'
// }

// type GetKey<T> = (item: T) => string | number;

export const sort = (
    data,
    getKey,
    sortOrder,
    sortType,
) => {
    const orderOfSort = sortOrder === 'asc'
        ? 1
        : sortOrder === 'desc'
            ? -1
            : 1;

    return [...data].sort((a, b) => {
        const x = sortType === 'string' ? (getKey(a) || '').toString().toLowerCase().trim() : +(getKey(a));
        const y = sortType === 'string' ? (getKey(b) || '').toString().toLowerCase().trim() : +(getKey(b));

        const result = x < y ? -1 : x > y ? 1 : 0;

        return result * orderOfSort;
    });
};
