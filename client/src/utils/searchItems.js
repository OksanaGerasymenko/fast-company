export function searchItems(items, fieldName, subString) {
    return items.filter(item => item[fieldName].toLowerCase().includes(subString.toLowerCase()));
};
