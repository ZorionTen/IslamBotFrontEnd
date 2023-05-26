document.addEventListener('DOMContentLoaded', function () {
    // Fetch News Data
    fetch('https://ntccchat.000webhostapp.com/')
        .then(response => response.json())
        .then(data => {
            // Populate News Cards
            const newsContainer = document.getElementById('news-container');
            data.forEach(newsItem => {
                const newsCard = document.createElement('div');
                newsCard.classList.add('news-card');

                const newsImage = document.createElement('img');
                newsImage.src = newsItem.img;
                newsCard.appendChild(newsImage);

                const newsHeading = document.createElement('h2');
                newsHeading.textContent = newsItem.head;
                newsCard.appendChild(newsHeading);

                const newsText = document.createElement('p');
                newsText.textContent = newsItem.text;
                newsCard.appendChild(newsText);

                const pubDate = document.createElement('p');
                pubDate.classList.add('pub-date');
                pubDate.textContent = newsItem.pub;
                newsCard.appendChild(pubDate);

                const newsLink = document.createElement('a');
                newsLink.href = newsItem.link;
                newsLink.textContent = 'Read More';
                newsCard.appendChild(newsLink);

                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => console.log(error));
});
