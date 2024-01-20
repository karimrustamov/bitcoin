const API_KEY = 'AZDYE9MS3PVGAMWG';
let month = ['2022-01-31', '2022-02-28', '2022-03-31', '2022-04-30', '2022-05-31', '2022-06-30', '2022-07-31', '2022-08-31', '2022-09-30', '2022-10-31', '2022-11-30', '2022-12-31', '2023-01-31', '2023-02-28', '2023-03-31', '2023-04-30', '2023-05-31'];
let course = [];

async function init() {
    loadCourse();
    loadMonthlyCourse();
    renderChart();
}

async function loadCourse(){
    let url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=' + API_KEY;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let currentCourse = (Math.round(responseAsJson['Realtime Currency Exchange Rate']['5. Exchange Rate']));

    document.getElementById('course').innerHTML = `<b> ${currentCourse} € </b>`;
}

async function loadMonthlyCourse() {
    let url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=' + API_KEY;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    //console.log(responseAsJson['Time Series (Digital Currency Monthly)']['2022-01-31']['1a. open (EUR)']);

    let monthlyCourse = responseAsJson['Time Series (Digital Currency Monthly)'];

    for (let i = 0; i < month.length; i++) {
        const courseEachMonth = Math.round(monthlyCourse[month[i]]['1a. open (EUR)']);
        course.push(courseEachMonth);
    }

}