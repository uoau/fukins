module.exports.runPromiseByQueue = async function(promiseArr){
    await promiseArr.reduce((prePromise, nowPromise) => {
        return prePromise.then(() => nowPromise());
    }, Promise.resolve());
}