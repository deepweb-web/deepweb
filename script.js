document.addEventListener("DOMContentLoaded", () => {

    const menuToggle =
        document.getElementById("menu-toggle");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const nav =
        document.querySelector(".nav-shell");


    /* =========================================
       MENU MOBILE
    ========================================= */

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const aberto =
                menuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!aberto)
            );

            menuToggle.setAttribute(
                "aria-label",
                aberto
                    ? "Abrir menu"
                    : "Fechar menu"
            );

            mobileMenu.classList.toggle(
                "open",
                !aberto
            );

        });


        /* Fechar menu depois de clicar */

        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuToggle.setAttribute(
                            "aria-label",
                            "Abrir menu"
                        );

                    }
                );

            });

    }


    /* =========================================
       HEADER AO ROLAR
    ========================================= */

    function atualizarHeader() {

        if (!nav) return;

        if (window.scrollY > 18) {

            nav.classList.add(
                "is-scrolled"
            );

        } else {

            nav.classList.remove(
                "is-scrolled"
            );

        }

    }

    window.addEventListener(
        "scroll",
        atualizarHeader,
        {
            passive: true
        }
    );

    atualizarHeader();


    /* =========================================
       SCROLL SUAVE
    ========================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }

                    const destino =
                        document.querySelector(
                            id
                        );

                    if (!destino) {
                        return;
                    }

                    event.preventDefault();

                    const alturaHeader =
                        nav
                            ? nav.offsetHeight
                            : 0;

                    const posicao =
                        destino
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        alturaHeader;

                    window.scrollTo({

                        top: posicao,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =========================================
       ANIMAÇÃO DOS CARDS
    ========================================= */

    const cards =
        document.querySelectorAll(
            ".product-card, .benefit-card"
        );

    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entradas => {

                    entradas.forEach(
                        entrada => {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target.style.opacity =
                                    "1";

                                entrada.target.style.transform =
                                    "translateY(0)";

                                observer.unobserve(
                                    entrada.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        cards.forEach(card => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(20px)";

            card.style.transition =
                "opacity .6s ease, transform .6s ease";

            observer.observe(card);

        });

    }


    /* =========================================
       ANO AUTOMÁTICO DO FOOTER
    ========================================= */

    const footer =
        document.getElementById(
            "footer-copy"
        );

    if (footer) {

        footer.textContent =
            `© ${new Date().getFullYear()} Cases Store. Todos os direitos reservados.`;

    }


    /* =========================================
       FECHAR MENU AO AUMENTAR A TELA
    ========================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800
                &&
                mobileMenu
            ) {

                mobileMenu.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                }

            }

        }
    );


    console.log(
        "Cases Store carregada com sucesso!"
    );

});