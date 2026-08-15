document.addEventListener("DOMContentLoaded", function () {

  // PÁGINA INDEX (LOGIN)
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      if (email && senha) {
        window.location.href = "exposicoes.html";
      }
    });
  }


  // CONTINUAR SEM CONTA

  const btnContinuar = document.getElementById("btnContinuar");

  if (btnContinuar) {
    btnContinuar.addEventListener("click", function () {
      window.location.href = "exposicoes.html";
    });
  }


  // SOBRE NÓS

  const btnAjuda = document.getElementById("btnAjuda");

  if (btnAjuda) {
    btnAjuda.addEventListener("click", function () {
      alert(
        "Sobre Nós\n\n" +
        "O Arty é uma plataforma de vídeos curtos voltada para a arte. " +
        "Aqui, artistas podem compartilhar seus trabalhos e usuários podem " +
        "descobrir, explorar e interagir com diferentes formas de arte."
      );
    });
  }


  // BUSCA DA PÁGINA INICIAL

  const searchInputIndex = document.getElementById("searchInput");

  if (searchInputIndex) {
    searchInputIndex.addEventListener("keypress", function (e) {

      if (e.key === "Enter") {

        const query = this.value.trim();

        if (query) {
          alert('Buscando por: "' + query + '"');
        }

      }

    });
  }


  // PÁGINA EXPOSIÇÕES

  const btnLike = document.getElementById("btn-like");
  const btnComment = document.getElementById("btn-comment");
  const btnSave = document.getElementById("btn-save");
  const btnShare = document.getElementById("btn-share");

  const tabAmigos = document.getElementById("tab-amigos");
  const tabParaVoce = document.getElementById("tab-paravoce");

  const btnLight = document.getElementById("btn-light");
  const btnDark = document.getElementById("btn-dark");

  const searchInput = document.getElementById("search");
  const btnSearch = document.getElementById("btn-search");

  const caption = document.getElementById("caption");


  // Só executa as funções do feed
  // quando estamos na página de exposições

  if (btnLike && tabAmigos) {

    let liked = false;
    let saved = false;


    // CURTIR

    function toggleLike() {

      liked = !liked;

      if (liked) {

        btnLike.textContent = "Curtido";
        alert("Você curtiu a arte!");

      } else {

        btnLike.textContent = "Curtir";

      }

    }

    btnLike.addEventListener("click", toggleLike);


    // COMENTAR

    if (btnComment) {

      btnComment.addEventListener("click", function () {

        const comentario = prompt("Escreva seu comentario:");

        if (comentario) {
          alert("Comentario enviado: " + comentario);
        }

      });

    }


    // SALVAR

    if (btnSave) {

      btnSave.addEventListener("click", function () {

        saved = !saved;

        if (saved) {

          btnSave.textContent = "Salvo";
          alert("Arte salva nos favoritos!");

        } else {

          btnSave.textContent = "Salvar";
          alert("Arte removida dos favoritos.");

        }

      });

    }


    // COMPARTILHAR

    if (btnShare) {

      btnShare.addEventListener("click", function () {

        const texto =
          "Minha primeira paisagem com guache!!";

        if (navigator.share) {

          navigator.share({
            title: "Art Social",
            text: texto,
            url: window.location.href
          }).catch(function () {

            alert(
              "Link: " +
              window.location.href
            );

          });

        } else {

          alert(
            "Compartilhar:\n" +
            texto +
            "\n" +
            window.location.href
          );

        }

      });

    }


    // ABAS

    function setTab(tab) {

      if (tab === "amigos") {

        tabAmigos.textContent = "-> Amigos <-";
        tabAmigos.classList.add("active");

        tabParaVoce.textContent = "Para Voce";
        tabParaVoce.classList.remove("active");

        if (caption) {
          caption.textContent = "Conteudo de Amigos";
        }

      } else {

        tabAmigos.textContent = "Amigos";
        tabAmigos.classList.remove("active");

        tabParaVoce.textContent = "-> Para Voce <-";
        tabParaVoce.classList.add("active");

        if (caption) {
          caption.textContent = "Minha primeira paisagem com tinta guache!!";
        }

      }

    }

    tabAmigos.addEventListener("click", function () {
      setTab("amigos");
    });

    tabParaVoce.addEventListener("click", function () {
      setTab("paravoce");
    });

    setTab("paravoce");


    // MODO CLARO / ESCURO

    function setMode(dark) {

      const sidebar = document.getElementById("sidebar");
      const header = document.getElementById("header");
      const feed = document.getElementById("feed");

      if (dark) {

        document.body.style.backgroundColor = "#111";
        document.body.style.color = "#eee";

        if (sidebar) {
          sidebar.style.backgroundColor = "#6b4cff";
        }

        if (header) {
          header.style.backgroundColor = "#1a1a1a";
        }

        if (feed) {
          feed.style.backgroundColor = "#111";
        }

        if (btnDark) {
          btnDark.textContent = "Escuro (ativo)";
        }

        if (btnLight) {
          btnLight.textContent = "Claro";
        }

      } else {

        document.body.style.backgroundColor = "#f5f5f5";
        document.body.style.color = "#111";

        if (sidebar) {
          sidebar.style.backgroundColor = "#8b6cff";
        }

        if (header) {
          header.style.backgroundColor = "#ffffff";
        }

        if (feed) {
          feed.style.backgroundColor = "#f5f5f5";
        }

        if (btnLight) {
          btnLight.textContent = "Claro (ativo)";
        }

        if (btnDark) {
          btnDark.textContent = "Escuro";
        }

      }

    }


    if (btnLight) {

      btnLight.addEventListener("click", function () {
        setMode(false);
      });

    }

    if (btnDark) {

      btnDark.addEventListener("click", function () {
        setMode(true);
      });

    }

    setMode(true);


    // BUSCA

    function fazerBusca() {

      const termo = searchInput
        ? searchInput.value.trim()
        : "";

      if (termo) {

        alert("Buscando por: " + termo);

      } else {

        alert(
          "Digite algo para buscar arte, artistas ou estilos."
        );

      }

    }


    if (btnSearch) {

      btnSearch.addEventListener(
        "click",
        fazerBusca
      );

    }


    if (searchInput) {

      searchInput.addEventListener(
        "keypress",
        function (e) {

          if (e.key === "Enter") {
            fazerBusca();
          }

        }
      );

    }


    // SIDEBAR

    const btnExplore =
      document.getElementById("btn-explore");

    const btnProfile =
      document.getElementById("btn-profile");

    const btnSettings =
      document.getElementById("btn-settings");

    const btnMessages =
      document.getElementById("btn-messages");

    const btnChat =
      document.getElementById("btn-chat");

    const btnCreate =
      document.getElementById("btn-create");

    const btnHelp =
      document.getElementById("btn-help");


    // EXPLORAR

    if (btnExplore) {

      btnExplore.addEventListener("click", function () {

        alert("Você já está na página Explorar!");

      });

    }


    // PERFIL

    if (btnProfile) {

      btnProfile.addEventListener("click", function () {

        window.location.href = "perfil.html";

      });

    }


    // CRIAR

    if (btnCreate) {

      btnCreate.addEventListener("click", function () {

        window.location.href = "criar.html";

      });

    }


    // CONFIGURAÇÕES

    if (btnSettings) {

      btnSettings.addEventListener("click", function () {

        alert("Abrindo Configurações...");

      });

    }


    // MENSAGENS

    if (btnMessages) {

      btnMessages.addEventListener("click", function () {

        alert("Abrindo Mensagens...");

      });

    }


    // CHAT

    if (btnChat) {

      btnChat.addEventListener("click", function () {

        alert("Abrindo Chat...");

      });

    }


    // AJUDA

    if (btnHelp) {

      btnHelp.addEventListener("click", function () {

        alert("Ajuda / Suporte");

      });

    }

  }


  // PÁGINA CRIAR

  const arquivo =
    document.getElementById("arquivo");

  const nomeArquivo =
    document.getElementById("nome-arquivo");

  const criarForm =
    document.getElementById("criarForm");


  // SELECIONAR ARQUIVO

  if (arquivo) {

    arquivo.addEventListener("change", function () {

      if (arquivo.files.length > 0) {

        nomeArquivo.textContent =
          "Arquivo selecionado: " +
          arquivo.files[0].name;

      }

    });

  }


  // PUBLICAR

  if (criarForm) {

    criarForm.addEventListener("submit", function (e) {

      e.preventDefault();

      const titulo =
        document.getElementById("titulo").value;

      alert(
        "Arte publicada com sucesso!\n\n" +
        "Título: " +
        titulo
      );

      window.location.href = "exposicoes.html";

    });

  }

});