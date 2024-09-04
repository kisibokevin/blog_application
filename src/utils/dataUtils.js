
export const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }
    return data;
}


export const filterItems = (items, searchTerm, filterKey, searchKeys) => {
    let filtered = items;

    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        filtered = filtered.filter((item) =>
        searchKeys.some((key) =>
            item[key]?.toString().toLowerCase().includes(lowercasedTerm)
        )
        );
    }

    if (filterKey) {
        filtered = filtered.filter((item) => item.status === filterKey);
    }

    return filtered;
};


export const sortItems = (items, sortKey, sortOrder = "asc") => {
    return items.sort((a, b) => {
        if (!sortKey) return 0;

        const itemA = a[sortKey];
        const itemB = b[sortKey];

        if (sortOrder === "asc") {
        return itemA > itemB ? 1 : itemA < itemB ? -1 : 0;
        } else {
        return itemA < itemB ? 1 : itemA > itemB ? -1 : 0;
        }
    });
};

export const paginateItems = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
};

