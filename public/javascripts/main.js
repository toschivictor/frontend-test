(() => {
    'use strict';

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

    const displayData = (data, parentEl) => {
        const elements = [];
        parentEl = document.getElementById(parentEl);

        data.forEach((item, index) => {
            elements.push(`
                <div class="celebrity">
                    <div class="person">
                        <img src="${item.picture}" alt="${item.name}">
                    </div>
                    <span class="sort">${index + 1}</span>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="tooltip">
                        <div class="option">
                            <span class="left-radius right-pipe">Gostam</span>
                            <p class="left-radius right-pipe">${item.positive}%</p>
                        </div>
                        <div class="option">
                            <span class="right-radius">Não gostam</span>
                            <p class="right-radius">${item.negative}%</p>
                        </div>
                    </div>
                </div>
            `);
        });

        parentEl.innerHTML = elements.join('');
    };

    fetch('../data/fazenda.json')
        .then(response => response.json())
        .then(data => changeItems(data.data))
        .then(data => sortItems(data))
        .then(data => displayData(data, 'ranking'))
})();