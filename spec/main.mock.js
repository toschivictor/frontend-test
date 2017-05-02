const calcPercentage = (negative, positive) => {
    negative = null || undefined !== negative ? Number(negative) : 0;
    positive = null || undefined !== positive ? Number(positive) : 0;

    let total = negative + positive;

    return {
        negative: 0 !== total ? Math.floor((negative / total) * 100) : 0,
        positive: 0 !== total ? Math.floor((positive / total) * 100) : 0
    }
};

const changeItems = items => {
    let percent;

    return items.map(curr => {
        percent = calcPercentage(curr.negative, curr.positive);
        curr.negative = percent.negative;
        curr.positive = percent.positive;

        return curr;
    });
};

const sortItems = items => {
    items.sort((a, b) => {
        if (a.positive > b.positive) {
            return -1;
        }
        return 1;
    })

    return items;
};