import type { DataProvider } from "@refinedev/core";
import file from './data/invoices.json';

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

        return { data };
    },

    create: async ({ resource, variables }) => {
        let newId = localData.length > 0 ? Math.max(...localData.map(item => item.id)) + 1 : 1;

        while (localData.find(item => item.id === newId)) {
            newId += 1; // Ensure the ID is unique
        }

        const newItem = {
            id: newId,
            ...variables,
        };

        localData.push(newItem);

        return {
            data: newItem,
        };
    },

    update: async ({ resource, id, variables }) => {

        const index = localData.findIndex(item => item.id === Number(id));
        if (index === -1) throw new Error("Not found");

        // Update the item with the new variables
        const updatedItem = {
            ...localData[index],
            ...variables, // Merge the updated fields
        };

        // Replace the old item with the updated one
        localData[index] = updatedItem;

        return {
            updatedItem,
        };
    },


    deleteOne: async ({ resource, id }) => {
        const index = localData.findIndex(item => item.id === id);
        if (index === -1) throw new Error("Not found");

        localData.splice(index, 1); // Remove the item from the array

        return {
            data: { id }
        };
    },
    getApiUrl: () => API_URL,

};
