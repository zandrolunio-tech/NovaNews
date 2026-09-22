// NOVANEWS - PAINEL ADMINISTRATIVO

const newsForm = document.getElementById("newsForm");
const newsList = document.getElementById("newsList");

const categoryInput = document.getElementById("category");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");
const authorInput = document.getElementById("author");

const submitButton = newsForm.querySelector(
    'button[type="submit"]'
);

let news = JSON.parse(
    localStorage.getItem("novaNews")
) || [];

let editingId = null;


// ADICIONAR OU EDITAR NOTÍCIA

newsForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const category = categoryInput.value;
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const image = imageInput.value.trim();
    const author = authorInput.value.trim();

    if (title === "" || description === "" || author === "") {

        alert("Preencha o título, a descrição e o autor.");

        return;
    }

    if (editingId !== null) {

        news = news.map(function (item) {

            if (item.id === editingId) {

                return {
                    ...item,
                    category: category,
                    title: title,
                    description: description,
                    image: image,
                    author: author
                };
            }

            return item;
        });

        editingId = null;

        submitButton.textContent = "Adicionar notícia";

    } else {

        const newNews = {

            id: Date.now(),
            category: category,
            title: title,
            description: description,
            image: image,
            author: author,
            date: new Date().toLocaleDateString("pt-PT"),
            views: 0

        };

        news.push(newNews);
    }

    localStorage.setItem(
        "novaNews",
        JSON.stringify(news)
    );

    newsForm.reset();

    showNews();

});


// MOSTRAR NOTÍCIAS

function showNews() {

    newsList.innerHTML = "";

    if (news.length === 0) {

        newsList.innerHTML =
            "<p>Nenhuma notícia cadastrada.</p>";

        return;
    }

    news.forEach(function (item) {

        const article = document.createElement("article");

        article.className = "news-card";

        article.innerHTML = `

            <h3>${item.title}</h3>

            <p>
                <strong>Categoria:</strong>
                ${item.category}
            </p>

            <p>
                ${item.description}
            </p>

            <p>
                <strong>Autor:</strong>
                ${item.author}
            </p>

            <p>
                <strong>Data:</strong>
                ${item.date}
            </p>

            ${
                item.image
                    ? `<img src="${item.image}" alt="${item.title}">`
                    : ""
            }

            <div class="news-actions">

                <button
                    type="button"
                    onclick="editNews(${item.id})"
                >
                    Editar
                </button>

                <button
                    type="button"
                    onclick="deleteNews(${item.id})"
                >
                    Apagar
                </button>

            </div>
        `;

        newsList.appendChild(article);

    });
}


// EDITAR NOTÍCIA

function editNews(id) {

    const item = news.find(function (item) {

        return item.id === id;

    });

    if (!item) {
        return;
    }

    editingId = id;

    categoryInput.value = item.category;
    titleInput.value = item.title;
    descriptionInput.value = item.description;
    imageInput.value = item.image;
    authorInput.value = item.author;

    submitButton.textContent =
        "Guardar alterações";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// APAGAR NOTÍCIA

function deleteNews(id) {

    const confirmation = confirm(
        "Tem certeza que deseja apagar esta notícia?"
    );

    if (!confirmation) {
        return;
    }

    news = news.filter(function (item) {

        return item.id !== id;

    });

    localStorage.setItem(
        "novaNews",
        JSON.stringify(news)
    );

    showNews();

}


// INICIAR ADMIN

showNews();