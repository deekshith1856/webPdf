function formatPageNumbers(pageNumbers) {
    const formattedNumbers = [];

    let start = null;
    let end = null;

    for (let i = 0; i < pageNumbers.length; i++) {
        if (start === null) {
            start = pageNumbers[i];
            end = pageNumbers[i];
        } else if (pageNumbers[i] === end + 1) {
            end = pageNumbers[i];
        } else {
            // If a range of consecutive page numbers ends, push the range to the formatted numbers
            if (start === end) {
                formattedNumbers.push(start.toString());
            } else {
                formattedNumbers.push(`${start}-${end}`);
            }
            start = pageNumbers[i];
            end = pageNumbers[i];
        }
    }

    // Push the last range or single page number if present
    if (start !== null) {
        if (start === end) {
            formattedNumbers.push(start.toString());
        } else {
            formattedNumbers.push(`${start}-${end}`);
        }
    }

    // Join the formatted numbers with a comma and space
    return formattedNumbers.join(', ');
}

export { formatPageNumbers }
