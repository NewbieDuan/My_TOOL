var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var promiseHandle = function (val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(val);
            resolve(val);
        }, 1000);
    });
};

function limitLoad(list, handler, limit) {
    let queue = list.slice();
    let promises = queue.splice(0, limit).map((item, index) => {
        return handler(item).then(() => {
            return index;
        });
    });
    queue.reduce((last, item, curIndex) => {
        return last
            .then(() => {
                return Promise.race(promises);
            }).catch((err) => {
                console.log(err)
            })
            .then((res) => {
                promises[res] = handler(item).then(() => {
                    return res;
                });
            });
    }, Promise.resolve()).then(() => {
        Promise.all(promises)
    });
}

limitLoad(list, promiseHandle, 4);
