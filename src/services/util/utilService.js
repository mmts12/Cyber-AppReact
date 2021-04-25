
export const utilService = {
    delay,
    getRandomInt,
    makeId,
    formatTime,
    calcDoneTodos
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function formatTime(card, type) {
    if (!card.dueDate) return
    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const { dueDate } = card
    const timeDate = dueDate.split('T');
    const month = months[timeDate[0].substring(6, 7) - 1];
    const day = timeDate[0].substring(8);
    return (type === 'dateTime' ? `${month} ${day} at ${timeDate[1]}` : `${month} ${day} `)
};


function calcDoneTodos(card) {
    return card.checklists.reduce(
        (acc, checklist) => {
            checklist.todos.forEach((todo) => {
                acc.length++;
                if (todo.isDone) acc.done++;
            });
            return acc;
        },
        { done: 0, length: 0 }
    );
};