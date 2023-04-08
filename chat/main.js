URL = "https://zorion.pythonanywhere.com/openai/complete";
// URL = "about:blank";
ERROR_CANT_THINK = 'I can\'t seem to think right now. Please try again later. Sorry!'
$(".form button").on("click", function () {
    query = $(".form input").val();
    if (!query) {
        return true;
    }
    $(this).fadeOut();
    scroll();
    $("#chat").append(messageBlock('you', query));
    $(".form input").val("")
    data = {
        q: query,
        max_tokens: 300,
        stop: "Q:"
    };
    $.ajax({
        type: 'POST',
        url: URL,
        'data': JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            writeMessage(data);
        },
        error: function (data) {
            console.log(data);
            writeMessage(ERROR_CANT_THINK);
        },
        complete:(function (data) {
            $(".form button").fadeIn();
            scroll();
        })
    });
});

$('.form input').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
     {
       $('.form button').click();
       return false;  
     }
   }); 

function writeMessage(message) {
    try {
        rep = message.choices[0].text;
    } catch(error){
        rep = ERROR_CANT_THINK;
    }
    $("#chat").append(messageBlock('bot', rep));
}

function messageBlock(type, message) {
    blockDiv = $(`<div class='message message-${type}'></div>`);
    block = $(`<div class='content'></div>`);
    block.append(`<p class='sender'>${type}</p>`);
    block.append(`<p class='text'>${message}</p>`);
    blockDiv.append(block);
    return blockDiv;
}

function scroll(){
    elem=$("#chat");
    elem.animate({ scrollTop: elem.prop("scrollHeight")}, 1000);
}