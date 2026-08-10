document.addEventListener("DOMContentLoaded", () => {

  // =========================================
  // PÁGINA INDEX (LOGIN)
  // =========================================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      if (email && senha) {
        alert("Login simulado com sucesso!\nEmail: " + email);
      }
    });
  }

  const btnContinuar = document.getElementById("btnContinuar");
  if (btnContinuar) {
    btnContinuar.addEventListener("click", function () {
      alert("Continuando sem conta... Bem-vindo ao Arty!");
      // window.location.href = "exposicoes.html"; // descomente se quiser redirecionar
    });
  }

  const btnAjuda = document.getElementById("btnAjuda");
  if (btnAjuda) {
    btnAjuda.addEventListener("click", function () {
      alert("Sobre Nós – Em breve!");
    });
  }

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

  // =========================================
  // PÁGINA EXPOSIÇÕES (ART SOCIAL)
  // =========================================
  const btnLike     = document.getElementById("btn-like");
  const btnLike2    = document.getElementById("btn-like2");
  const btnComment  = document.getElementById("btn-comment");
  const btnSave     = document.getElementById("btn-save");
  const btnShare    = document.getElementById("btn-share");
  const tabAmigos   = document.getElementById("tab-amigos");
  const tabParaVoce = document.getElementById("tab-paravoce");
  const btnLight    = document.getElementById("btn-light");
  const btnDark     = document.getElementById("btn-dark");
  const searchInput = document.getElementById("search");
  const btnSearch   = document.getElementById("btn-search");
  const caption     = document.getElementById("caption");

  // Só executa se estiver na página de exposições
  if (btnLike && tabAmigos) {

    let liked = false;
    let saved = false;
    let currentTab = "paravoce";
    let isDark = true;

    // CURTIR
    function toggleLike() {
      liked = !liked;
      if (liked) {
        btnLike.textContent = "Curtido";
        if (btnLike2) btnLike2.textContent = "Curtido";
        alert("Voce curtiu a arte!");
      } else {
        btnLike.textContent = "Curtir";
        if (btnLike2) btnLike2.textContent = "Curtir";
      }
    }

    btnLike.addEventListener("click", toggleLike);
    if (btnLike2) btnLike2.addEventListener("click", toggleLike);

    // COMENTAR
    if (btnComment) {
      btnComment.addEventListener("click", () => {
        const comentario = prompt("Escreva seu comentario:");
        if (comentario) {
          alert("Comentario enviado: " + comentario);
        }
      });
    }

    // SALVAR
    if (btnSave) {
      btnSave.addEventListener("click", () => {
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
      btnShare.addEventListener("click", () => {
        const texto = "Olha essa arte: ONLY 2 colors masterpiece";
        if (navigator.share) {
          navigator.share({
            title: "Art Social",
            text: texto,
            url: window.location.href
          }).catch(() => {
            alert("Link copiado: " + window.location.href);
          });
        } else {
          alert("Compartilhar:\n" + texto + "\n" + window.location.href);
        }
      });
    }

    // ABAS
    function setTab(tab) {
      currentTab = tab;
      if (tab === "amigos") {
        tabAmigos.textContent = "-> Amigos <-";
        tabAmigos.classList.add("active");
        tabParaVoce.textContent = "Para Voce";
        tabParaVoce.classList.remove("active");
        if (caption) caption.textContent = "Conteudo de Amigos";
      } else {
        tabAmigos.textContent = "Amigos";
        tabAmigos.classList.remove("active");
        tabParaVoce.textContent = "-> Para Voce <-";
        tabParaVoce.classList.add("active");
        if (caption) caption.textContent = "ONLY 2 colors masterpiece";
      }
    }

    tabAmigos.addEventListener("click", () => setTab("amigos"));
    tabParaVoce.addEventListener("click", () => setTab("paravoce"));
    setTab("paravoce");

    // MODO CLARO / ESCURO
    function setMode(dark) {
      isDark = dark;
      if (dark) {
        document.body.style.backgroundColor = "#111";
        document.body.style.color = "#eee";
        const sidebar = document.getElementById("sidebar");
        const header = document.getElementById("header");
        const feed = document.getElementById("feed");
        if (sidebar) sidebar.style.backgroundColor = "#6b4cff";
        if (header) header.style.backgroundColor = "#1a1a1a";
        if (feed) feed.style.backgroundColor = "#111";
        btnDark.textContent = "Escuro (ativo)";
        btnLight.textContent = "Claro";
      } else {
        document.body.style.backgroundColor = "#f5f5f5";
        document.body.style.color = "#111";
        const sidebar = document.getElementById("sidebar");
        const header = document.getElementById("header");
        const feed = document.getElementById("feed");
        if (sidebar) sidebar.style.backgroundColor = "#8b6cff";
        if (header) header.style.backgroundColor = "#ffffff";
        if (feed) feed.style.backgroundColor = "#f5f5f5";
        btnLight.textContent = "Claro (ativo)";
        btnDark.textContent = "Escuro";
      }
    }

    if (btnLight) btnLight.addEventListener("click", () => setMode(false));
    if (btnDark) btnDark.addEventListener("click", () => setMode(true));
    setMode(true);

    // BUSCA
    function fazerBusca() {
      const termo = searchInput ? searchInput.value.trim() : "";
      if (termo) {
        alert("Buscando por: " + termo);
      } else {
        alert("Digite algo para buscar arte, artistas ou estilos.");
      }
    }

    if (btnSearch) btnSearch.addEventListener("click", fazerBusca);
    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") fazerBusca();
      });
    }

    // SIDEBAR BOTÕES
    const sidebarButtons = {
      "btn-explore": "Abrindo Explorar...",
      "btn-profile": "Abrindo Perfil...",
      "btn-settings": "Abrindo Configuracoes...",
      "btn-messages": "Abrindo Mensagens...",
      "btn-chat": "Abrindo Chat...",
      "btn-create": "Criar nova arte / post...",
      "btn-help": "Ajuda / Suporte"
    };

    Object.keys(sidebarButtons).forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", () => {
          alert(sidebarButtons[id]);
        });
      }
    });

    console.log("Art Social carregado com sucesso");
  }
});