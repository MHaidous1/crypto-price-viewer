
function start(){

    //Accociate 'theButton' with the handleButton() function
    const theButton = document.getElementById('btn-fetch');
    theButton.onclick = handleButton;

}

function handleButton(){

    //Grabbed theSpan we called output in index.html
    const theSpan = document.getElementById('output');
    theSpan.innerHTML = "test";                         //Grabbed theSpan and set it to test

    //performing fetch
    fetchData(theSpan);
}

function fetchData(theSpan){

    //the 'then' statement returns a promise object

    fetch('https://api.coincap.io/v2/assets')

        .then(response => response.json())
        .then(json => {
            console.log(json);

            //for-each loop to grab meta data for each cryptocurrency
            let content = " ";
            json.data.forEach(cryptoCurrency => {
                content += cryptoCurrency.symbol;
                content += "<br>";
                content += cryptoCurrency.supply;
                content += "<br>";
                content += cryptoCurrency.priceUSD;
                content += "<br>";
                content += cryptoCurrency.changePercent24Hr;
                content +=" <br></br>";
            }); //end for each

            //setting content
            theSpan.innerHTML = content;
        });
}


window.onload = start;