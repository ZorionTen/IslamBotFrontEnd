BLACKLIST_URL = 'https://zorion.pythonanywhere.com/openai/blacklist';

element = document.querySelector("#list");

fetch(BLACKLIST_URL)
    .then(response => response.json())
    .then(function (data) {
        element.value = data.blocked_words.join(', ');
        toggleModal(false);
    });

updateButton = document.querySelector("#update");
updateButton.addEventListener('click', function () {
    toggleModal(true);
    fetch(BLACKLIST_URL, {
        method: 'POST',
        body: JSON.stringify({"blocked_words":element.value}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(function (data) {
        console.log(data);
        element.value = data.blocked_words.join(', ');
        toggleModal(false);
    });
});

function toggleModal(show){
    modal = document.querySelector("#modal");
    if(show){
        modal.style.display= 'flex';
        modal.style.opacity= '1';
    } else {
        modal.style.display= 'none';
        modal.style.opacity= '0';
    }
}