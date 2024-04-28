const months = {
    1: 'Январь',
    2: 'Февраль',
    3: 'Март',
    4: 'Апрель',
    5: 'Май',
    6: 'Июнь',
    7: 'Июль',
    8: 'Август',
    9: 'Сентябрь',
    10: 'Октябрь',
    11: 'Ноябрь',
    12: 'Декабрь',
};

const getMonth = (num) => {
    for (let key in months) {
        if (key.toString() === num.toString()) return months[key];
    }
    return 'Не месяц';
}

export default (curtimestamp) => {
    const date = new Date(curtimestamp);
    const correctDate = `${date.getFullYear()} ${getMonth(date.getMonth() + 1)} ${date.getDate()}`
    return correctDate;
}