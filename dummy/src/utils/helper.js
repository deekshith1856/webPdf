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
            if (start === end) {
                formattedNumbers.push(start.toString());
            } else {
                formattedNumbers.push(`${start}-${end}`);
            }
            start = pageNumbers[i];
            end = pageNumbers[i];
        }
    }

    if (start !== null) {
        if (start === end) {
            formattedNumbers.push(start.toString());
        } else {
            formattedNumbers.push(`${start}-${end}`);
        }
    }

    return formattedNumbers.join(', ');
}

export { formatPageNumbers }
