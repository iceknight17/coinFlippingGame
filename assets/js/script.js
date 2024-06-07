const API_URL = 'http://127.0.0.1:5000/api/get_bet_result';
const MinAmount = 0.1;
const MaxAmount = 1000;
let isFlipping = false;
let betOn = '';

const capitalizeStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const getResult = async () => {
    // simulation
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(Math.random() * 100 > 50);
    //     }, 500);
    // });
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData.result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Network response was not ok', error);
    }
}

const alertResult = (res) => {
    if( (betOn =='head' && res) || (betOn =='tail' && !res) ) {
        alert('You are win!');
    }else{
        alert('You are lose!');
    }
    $("#bet_amount").val("");
    $("#tab_1").removeClass("hidden");
    $("#tab_2").addClass("hidden");
    let coin = document.querySelector("#coin");
    coin.style.animation = "none";
}

$(document).ready(() => {
    $(".btn-tail, .btn-head").click((e) => {
        const side = $(e.target).attr("data-side");
        $("#tab_1").addClass("hidden");
        $("#tab_2").removeClass("hidden");
        $("#bet_btn").text(`Bet on ${capitalizeStr(side)}s`);
        betOn = side;
    });

    $("#min_amount_btn").click(() => {
        $("#bet_amount").val(MinAmount);
    });

    $("#max_amount_btn").click(() => {
        $("#bet_amount").val(MaxAmount);
    });

    $("#bet_btn").click(async () => {
        if (!$("#bet_amount").val()) {
            return null;
        }

        if (isFlipping) {
            return null;
        }

        isFlipping = true;
        const result = await getResult();
        console.log('result', result);
        let coin = document.querySelector("#coin");
        coin.style.animation = "none";
        if(result){
            setTimeout(function(){
                coin.style.animation = "spin-heads 5s forwards";
                setTimeout(() => {
                    isFlipping = false;
                    alertResult(result);
                }, 5000);
            }, 100);
        }else{
            setTimeout(function(){
                coin.style.animation = "spin-tails 5s forwards";
                setTimeout(() => {
                    isFlipping = false;
                    alertResult(result);
                }, 5000);
            }, 100);
        }
    });
});