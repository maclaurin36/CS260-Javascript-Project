let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
    updatePage();
});

function updatePage() {
    let baseUrl = "https://quote-garden.herokuapp.com/api/v3/quotes?"
    let author = document.getElementById("author").value;
    let genre = document.getElementById("genre").value;
    let query = document.getElementById("query").value;
    if (author == "" && genre == "" && query == "") {
        genre = "happiness";
    }
    let url = addIfNotEmpty(baseUrl, "author", author);
    url = addIfNotEmpty(url, "genre", genre);
    url = addIfNotEmpty(url, "query", query);
    url = url + 'count=50';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            let quoteContainer = document.getElementById("quote-container");
            quoteContainer.innerHTML = ""
            if (json.data.length == 0) {
                displayNoContent(true);
            }
            else {
                displayNoContent(false);
            }

            let numImages = json.data.length >= 5 ? 5 : json.data.length;
            for (let i = 0; i < numImages; i++) {
                let quoteIndex = getRandomInt(json.data.length);
                let quoteJson = json.data[quoteIndex];
                let text = quoteJson.quoteText;
                let author = quoteJson.quoteAuthor;
                let genre = quoteJson.quoteGenre;
                let quoteHtml = constructHtmlQuoteBlock(text, author);
                quoteContainer.innerHTML += quoteHtml;
                json.data.splice(quoteIndex, 1);
            }
        });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function displayNoContent(shouldDisplay) {
    let noContent = document.getElementById("no-content");
    if (shouldDisplay) {
        noContent.style.display = "block";
    }
    else {
        noContent.style.display = "none";
    }

}

function addIfNotEmpty(url, parameter, value) {
    if (value == null || value == "") {
        return url;
    }
    return url + parameter + '=' + value + '&';
}

function constructHtmlQuoteBlock(text, author) {
    let randomNumber = getRandomInt(1000);
    let html =
        `<div class="image-quote-block">
            <img src="https://picsum.photos/150?random=${randomNumber}">
            <p>${text}<br><br>
                <strong>${author}</strong>
            </p>
        </div>`;
    return html;
}

function OnKeyEnterPressDoThis() {
    updatePage();
}

document.getElementById("author").addEventListener("keypress", (e) => {

    var key = e.which || e.keyCode || 0;

    if (key === 13) {
        OnKeyEnterPressDoThis();
    }

});

document.getElementById("genre").addEventListener("keypress", (e) => {

    var key = e.which || e.keyCode || 0;

    if (key === 13) {
        OnKeyEnterPressDoThis();
    }

});

document.getElementById("query").addEventListener("keypress", (e) => {

    var key = e.which || e.keyCode || 0;

    if (key === 13) {
        OnKeyEnterPressDoThis();
    }

});
submitButton.click();
