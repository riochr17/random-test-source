function filterResult(result, filter) {
    if (!filter) {
        return result;
    }

    filter.query = filter.query.toLowerCase();
    result.products = result.products.filter(product => {

        /**
         * Check query keyword
         */
        if (!product.name.toLowerCase().includes(filter.query)) {
            return false;
        }

        /**
         * Check furniture style filter
         */
        let count_style = 0;
        for (let i in filter.furniture_style) {
            const style = filter.furniture_style[i];
            if (product.furniture_style.includes(style.value)) {
                count_style++;
            }
        }
        if (count_style == 0 && filter.furniture_style.length > 0) {
            return false;
        }

        /**
         * Check delivery time filter
         */
        let count_delivery_time = 0;
        for (let i in filter.delivery_time) {
            const delivery_time = filter.delivery_time[i];
            if (product.delivery_time < delivery_time.value || delivery_time.value == -1) {
                count_delivery_time++;
            }
        }
        if (count_delivery_time == 0 && filter.delivery_time.length > 0) {
            return false;
        }

        return true;
    });
    return result;
}

function getDataByFilter(filter, success, failure) {
    fetch(`https://www.mocky.io/v2/5c9105cb330000112b649af8`)
        .then(res => res.json())
        .then((result) => {
            if (typeof success !== 'function') {
                return;
            }
            setTimeout(_ => success(filterResult(result, filter)), 200);
        }, (error) => {
            if (typeof failure !== 'function') {
                return;
            }
            setTimeout(_ => failure(error), 200);
        });
}

export { getDataByFilter }