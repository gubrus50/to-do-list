function getOrCreateEmptyList(list_name: string) {
    let list = undefined;

    // Try to execute the following command
    try {
        // Get 'list_name' from the localStorage as JavaScript object.
        list = JSON.parse(localStorage.getItem(list_name) || "");
    }
    // If there is an error, report the problem in the console and set an empty list.
    catch (error) {
        list = [];
        console.error(error);
    }

    return list;
}

export default getOrCreateEmptyList;