import type { DataProvider } from "@refinedev/core";
import file from './data/products.json';

const API_URL = "https://api.fake-rest.refine.dev";

// Extract data from the imported JSON file
const localData = file.data;

export const dataProvider: DataProvider = {
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
        let data = [...localData]; // Copy the local data to avoid modifying the original

        // Apply pagination
        if (pagination) {
            data = data.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize);
        }

        // Apply sorting
        if (sorters && sorters.length > 0) {
            sorters.forEach((sorter) => {
                data = data.sort((a, b) => {
                    if (sorter.order === 'asc') {
                        return a[sorter.field] > b[sorter.field] ? 1 : -1;
                    } else {
                        return a[sorter.field] < b[sorter.field] ? 1 : -1;
                    }
                });
            });
        }

        // Apply filters
        if (filters && filters.length > 0) {
            filters.forEach((filter) => {
                if ("field" in filter && filter.operator === "eq") {
                    data = data.filter((item) => item[filter.field] === filter.value);
                }
            });
        }

        // Total count of data
        const total = localData.length;
        console.log(data);
        return {
            data,
            total,
        };
    },
    getMany: async ({ resource, ids, meta }) => {
        const data = localData.filter(item => ids.includes(item.id));
        return { data };
    },
    getOne: async ({ resource, id, meta }) => {
        const data = localData.find(item => item.id === Number(id));
        if (!data) {
            throw new Error("Not found");
        }
        console.log(`Product found:`, data);  // Log the found product
        return { data };
    },

    create: async ({ resource, variables }) => {
        // Mock implementation for creating a new item
        const newItem = {
            id: localData.length + 1, // Assign a new ID based on the length of the array
            ...variables, // Merge the provided variables (e.g., name, description, etc.)
        };

        localData.push(newItem); // Add the new item to the local data array

        return {
            data: newItem,
        };
    },
    update: async ({ resource, id, variables }) => {
        const index = localData.findIndex(item => item.id === id);
        if (index === -1) throw new Error("Not found");

        const updatedItem = {
            ...localData[index], // Spread the existing item
            ...variables, // Overwrite with new values
        };

        localData[index] = updatedItem; // Update the item in the array

        return {
            data: updatedItem,
        };
    },
    getApiUrl: () => API_URL,
    deleteOne: () => { throw new Error("Not implemented"); },
    /* ... */
};
