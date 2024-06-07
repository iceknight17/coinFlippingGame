const capitalizeStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const getResult = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Math.random() * 100 > 50);
        }, 500);
    });
}

const MinAmount = 0.1;
const MaxAmount = 1000;

$(document).ready(() => {
    $(".btn-tail, .btn-head").click((e) => {
        const side = $(e.target).attr("data-side");
        $("#tab_1").addClass("hidden");
        $("#tab_2").removeClass("hidden");
        $("#bet_btn").text(`Bet on ${capitalizeStr(side)}s`);
    });

    $("#min_amount_btn").click(() => {
        $("#bet_amount").val(MinAmount);
    });

    $("#max_amount_btn").click(() => {
        $("#bet_amount").val(MaxAmount);
    });

    $("#bet_btn").click(async () => {
        const result = await getResult();
        console.log('result', result);
        coin.style.animation = "none";
        if(result){
            setTimeout(function(){
                coin.style.animation = "spin-heads 5s forwards";
            }, 100);
            heads++;
        }else{
            setTimeout(function(){
                coin.style.animation = "spin-tails 5s forwards";
            }, 100);
            tails++;
        }
        setTimeout(updateStats, 3000);
    });
});