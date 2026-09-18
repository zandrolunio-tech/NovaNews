document.addEventListener("DOMContentLoaded", () => {

    const searchButton =
        document.getElementById("searchButton");

    const themeButton =
        document.getElementById("themeButton");

    const refreshButton =
        document.getElementById("refreshButton");

    const newsletterForm =
        document.getElementById("newsletterForm");

    const loginButton =
        document.querySelector(".login-button");

    const newsCards =
        document.querySelectorAll(".news-card");


    // ========================================
    // TOAST
    // ========================================

    function showToast(message) {

        let toast =
            document.querySelector(".nova-toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.className =
                "nova-toast";

            document.body.appendChild(toast);


            const style =
                document.createElement("style");

            style.textContent = `

                .nova-toast {
                    position: fixed;
                    bottom: 25px;
                    right: 25px;

                    background: #111827;
                    color: white;

                    padding: 14px 20px;

                    border-radius: 10px;

                    z-index: 99999;

                    box-shadow:
                        0 10px 30px
                        rgba(0,0,0,.25);

                    opacity: 0;

                    transform:
                        translateY(30px);

                    transition: .3s;
                }

                .nova-toast.show {
                    opacity: 1;
                    transform:
                        translateY(0);
                }

            `;

            document.head.appendChild(style);
        }


        toast.textContent =
            message;

        toast.classList.add("show");


        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

    }


    // ========================================
    // MODO ESCURO
    // ========================================

    const darkStyle =
        document.createElement("style");

    darkStyle.textContent = `

        body.dark-mode {
            background: #0f172a;
            color: #e5e7eb;
        }

        body.dark-mode .header {
            background: #111827;
            border-color: #1f2937;
        }

        body.dark-mode .logo {
            color: white;
        }

        body.dark-mode .menu a {
            color: #cbd5e1;
        }

        body.dark-mode .small-news,
        body.dark-mode .news-card,
        body.dark-mode .category-box {
            background: #1e293b;
            color: #e5e7eb;
        }

        body.dark-mode .news-card h3,
        body.dark-mode .small-news h3,
        body.dark-mode .category-box h3 {
            color: white;
        }

        body.dark-mode .news-card p,
        body.dark-mode .small-news p {
            color: #cbd5e1;
        }

        body.dark-mode .section-title {
            color: white;
        }

        body.dark-mode #refreshButton {
            background: #334155;
            color: white;
        }

        body.dark-mode .newsletter {
            background: #1d4ed8;
        }

    `;

    document.head.appendChild(
        darkStyle
    );


    if (
        localStorage.getItem("nova-theme")
        === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

    }


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark-mode"
                );


                const dark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "nova-theme",
                    dark
                        ? "dark"
                        : "light"
                );


                showToast(
                    dark
                        ? "🌙 Modo escuro ativado"
                        : "☀️ Modo claro ativado"
                );

            }
        );

    }


    // ========================================
    // PESQUISA
    // ========================================

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            () => {

                const panel =
                    document.createElement("div");

                panel.className =
                    "search-panel";

                panel.innerHTML = `

                    <div class="search-box">

                        <button
                            class="close-search">
                            ✕
                        </button>

                        <h2>
                            Pesquisar no NovaNews
                        </h2>

                        <input
                            id="searchInput"
                            type="text"
                            placeholder="Pesquisar notícia..."
                        >

                        <div
                            id="searchResults">
                            Digite o que deseja procurar.
                        </div>

                    </div>

                `;


                document.body.appendChild(
                    panel
                );


                const style =
                    document.createElement("style");

                style.textContent = `

                    .search-panel {
                        position: fixed;
                        inset: 0;

                        background:
                            rgba(0,0,0,.7);

                        display: flex;
                        justify-content: center;

                        padding: 80px 20px;

                        z-index: 10000;
                    }

                    .search-box {
                        width: 100%;
                        max-width: 700px;

                        height: max-content;

                        background: white;

                        padding: 30px;

                        border-radius: 18px;

                        position: relative;
                    }

                    .search-box h2 {
                        margin-bottom: 20px;
                    }

                    .search-box input {
                        width: 100%;

                        padding: 15px;

                        border: 1px solid #ddd;

                        border-radius: 8px;

                        font-size: 16px;
                    }

                    .close-search {
                        position: absolute;

                        top: 15px;
                        right: 15px;

                        border: none;

                        background: transparent;

                        font-size: 20px;
                    }

                    .search-result {
                        padding: 12px 0;

                        border-bottom:
                            1px solid #ddd;

                        cursor: pointer;
                    }

                    body.dark-mode .search-box {
                        background: #1e293b;
                        color: white;
                    }

                `;

                document.head.appendChild(
                    style
                );


                const input =
                    panel.querySelector(
                        "#searchInput"
                    );

                const results =
                    panel.querySelector(
                        "#searchResults"
                    );


                input.focus();


                input.addEventListener(
                    "input",
                    () => {

                        const query =
                            input.value
                                .toLowerCase()
                                .trim();


                        if (!query) {

                            results.innerHTML =
                                "Digite o que deseja procurar.";

                            return;
                        }


                        let count = 0;

                        results.innerHTML = "";


                        newsCards.forEach(
                            card => {

                                if (
                                    card.textContent
                                        .toLowerCase()
                                        .includes(query)
                                ) {

                                    count++;


                                    const result =
                                        document.createElement(
                                            "div"
                                        );

                                    result.className =
                                        "search-result";

                                    result.textContent =
                                        card.querySelector(
                                            "h3"
                                        )?.textContent
                                        || "Notícia";


                                    result.addEventListener(
                                        "click",
                                        () => {

                                            panel.remove();

                                            card.scrollIntoView({
                                                behavior:
                                                    "smooth",
                                                block:
                                                    "center"
                                            });

                                        }
                                    );


                                    results.appendChild(
                                        result
                                    );

                                }

                            }
                        );


                        if (count === 0) {

                            results.innerHTML =
                                "❌ Nenhuma notícia encontrada.";

                        }

                    }
                );


                panel.querySelector(
                    ".close-search"
                ).addEventListener(
                    "click",
                    () => panel.remove()
                );


                panel.addEventListener(
                    "click",
                    event => {

                        if (
                            event.target === panel
                        ) {

                            panel.remove();

                        }

                    }
                );

            }
        );

    }


    // ========================================
    // MODAL DE NOTÍCIA
    // ========================================

    function openNews(card) {

        const title =
            card.querySelector("h3")?.textContent
            || "Notícia NovaNews";


        const description =
            card.querySelector("p")?.textContent
            || "";


        const image =
            card.querySelector("img")?.src
            || "";


        const category =
            card.querySelector(".category")
                ?.textContent
            || "NOTÍCIA";


        const modal =
            document.createElement("div");

        modal.className =
            "news-modal";


        modal.innerHTML = `

            <div class="news-modal-content">

                <button class="close-modal">
                    ✕
                </button>

                <img
                    src="${image}"
                    alt="${title}"
                >

                <div class="modal-content-body">

                    <span>
                        ${category}
                    </span>

                    <h2>
                        ${title}
                    </h2>

                    <p>
                        ${description}
                    </p>

                    <p>
                        Esta é uma notícia do
                        portal NovaNews.
                    </p>

                    <button class="modal-close-button">
                        Fechar
                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        const style =
            document.createElement("style");

        style.textContent = `

            .news-modal {
                position: fixed;
                inset: 0;

                background:
                    rgba(0,0,0,.75);

                display: flex;
                align-items: center;
                justify-content: center;

                padding: 20px;

                z-index: 10001;
            }

            .news-modal-content {
                width: 100%;
                max-width: 850px;

                max-height: 90vh;

                overflow-y: auto;

                background: white;

                border-radius: 18px;

                position: relative;
            }

            .news-modal-content > img {
                width: 100%;
                height: 350px;

                object-fit: cover;
            }

            .modal-content-body {
                padding: 30px;
            }

            .modal-content-body span {
                color: #2563eb;

                font-weight: bold;
            }

            .modal-content-body h2 {
                font-size: 32px;

                margin: 10px 0 20px;
            }

            .modal-content-body p {
                color: #64748b;

                line-height: 1.8;

                margin-bottom: 15px;
            }

            .close-modal {
                position: absolute;

                top: 15px;
                right: 15px;

                width: 40px;
                height: 40px;

                border: none;

                border-radius: 50%;

                background:
                    rgba(0,0,0,.7);

                color: white;

                font-size: 20px;
            }

            .modal-close-button {
                border: none;

                background: #2563eb;

                color: white;

                padding: 12px 20px;

                border-radius: 8px;
            }

            body.dark-mode
            .news-modal-content {
                background: #1e293b;
                color: white;
            }

        `;

        document.head.appendChild(
            style
        );


        const close =
            () => modal.remove();


        modal.querySelector(
            ".close-modal"
        ).addEventListener(
            "click",
            close
        );


        modal.querySelector(
            ".modal-close-button"
        ).addEventListener(
            "click",
            close
        );


        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    close();

                }

            }
        );

    }


    document.querySelectorAll(
        ".read-button"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const card =
                        button.closest(
                            ".news-card, .main-news"
                        );

                    if (card) {

                        openNews(card);

                    }

                }
            );

        }
    );


    // ========================================
    // NEWSLETTER
    // ========================================

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const email =
                    newsletterForm.querySelector(
                        "input"
                    ).value.trim();


                if (!email) {

                    showToast(
                        "Digite o seu email."
                    );

                    return;
                }


                showToast(
                    "✅ Inscrição realizada!"
                );


                newsletterForm.reset();

            }
        );

    }


    // ========================================
    // LOGIN
    // ========================================

    if (loginButton) {

        loginButton.addEventListener(
            "click",
            () => {

                showToast(
                    "🔐 Login de demonstração."
                );

            }
        );

    }


    // ========================================
    // ATUALIZAR
    // ========================================

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            () => {

                refreshButton.textContent =
                    "⟳ Atualizando...";


                refreshButton.disabled =
                    true;


                setTimeout(
                    () => {

                        refreshButton.textContent =
                            "🔄 Atualizar";

                        refreshButton.disabled =
                            false;

                        showToast(
                            "📰 Notícias atualizadas!"
                        );

                    },
                    1200
                );

            }
        );

    }


    // ========================================
    // FAVORITOS
    // ========================================

    function getFavorites() {

        return JSON.parse(
            localStorage.getItem(
                "nova-favorites"
            ) || "[]"
        );

    }


    function saveFavorites(
        favorites
    ) {

        localStorage.setItem(
            "nova-favorites",
            JSON.stringify(
                favorites
            )
        );

    }


    newsCards.forEach(
        (card, index) => {

            const news =
                novaNewsData[index];


            if (!news) {
                return;
            }


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "favorite-button";


            button.textContent =
                getFavorites()
                    .includes(news.id)
                    ? "★"
                    : "☆";


            button.title =
                "Adicionar aos favoritos";


            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    let favorites =
                        getFavorites();


                    if (
                        favorites.includes(
                            news.id
                        )
                    ) {

                        favorites =
                            favorites.filter(
                                id =>
                                    id !== news.id
                            );

                        button.textContent =
                            "☆";

                        showToast(
                            "☆ Removido dos favoritos"
                        );

                    } else {

                        favorites.push(
                            news.id
                        );

                        button.textContent =
                            "★";

                        showToast(
                            "⭐ Adicionado aos favoritos"
                        );

                    }


                    saveFavorites(
                        favorites
                    );

                }
            );


            card.appendChild(
                button
            );

        }
    );


    // ========================================
    // RELÓGIO
    // ========================================

    const clock =
        document.createElement(
            "div"
        );


    clock.className =
        "nova-clock";


    function updateClock() {

        const now =
            new Date();


        clock.textContent =
            "🕐 " +
            now.toLocaleTimeString(
                "pt-PT"
            );

    }


    updateClock();


    setInterval(
        updateClock,
        1000
    );


    const headerContent =
        document.querySelector(
            ".header-content"
        );


    if (headerContent) {

        headerContent.appendChild(
            clock
        );

    }


    // ========================================
    // ESTILO FAVORITOS + RELÓGIO
    // ========================================

    const extraStyle =
        document.createElement(
            "style"
        );


    extraStyle.textContent = `

        .favorite-button {
            position: absolute;

            top: 12px;
            right: 12px;

            width: 40px;
            height: 40px;

            border: none;

            border-radius: 50%;

            background: white;

            color: #f59e0b;

            font-size: 24px;

            box-shadow:
                0 5px 15px
                rgba(0,0,0,.15);

            z-index: 5;
        }


        .nova-clock {
            font-size: 13px;

            font-weight: bold;

            color: #64748b;

            white-space: nowrap;
        }


        body.dark-mode
        .nova-clock {
            color: #cbd5e1;
        }


        @media(max-width:700px) {

            .nova-clock {
                display: none;
            }

        }

    `;


    document.head.appendChild(
        extraStyle
    );


    // ========================================
    // ESC FECHA JANELAS
    // ========================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                document
                    .querySelector(
                        ".search-panel"
                    )
                    ?.remove();

                document
                    .querySelector(
                        ".news-modal"
                    )
                    ?.remove();

            }

        }
    );


    console.log(
        "🚀 NovaNews funcionando corretamente!"
    );

});