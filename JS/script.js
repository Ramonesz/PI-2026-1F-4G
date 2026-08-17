document.addEventListener("DOMContentLoaded", () => {

  // =========================================
  // CATEGORIAS E VÍDEOS
  // Envie os links dos próximos vídeos e eu preencho
  // os arrays "videos" de cada categoria abaixo.
  // =========================================
  const categorias = [
    {
      id: "ideias-desenho",
      nome: "Ideias de desenho",
      videos: [
        { src: "videos/vid1.mp4", caption: "ONLY 2 colors masterpiece" }
      ]
    },
    { id: "pintura", nome: "Pintura", videos: [] },
    { id: "fotografia", nome: "Fotografia", videos: [] },
    { id: "escultura", nome: "Escultura", videos: [] },
    { id: "design-digital", nome: "Design digital", videos: [] }
  ];

  // =========================================
  // MODAL "SOBRE NÓS" — usado em todas as páginas
  // =========================================
  const btnSobreNos = document.getElementById("btnSobreNos");
  const modalSobreNos = document.getElementById("modalSobreNos");
  const modalSobreNosClose = document.getElementById("modalSobreNosClose");

  if (btnSobreNos && modalSobreNos) {
    btnSobreNos.addEventListener("click", () => {
      modalSobreNos.classList.add("open");
    });

    if (modalSobreNosClose) {
      modalSobreNosClose.addEventListener("click", () => {
        modalSobreNos.classList.remove("open");
      });
    }

    modalSobreNos.addEventListener("click", (e) => {
      if (e.target === modalSobreNos) {
        modalSobreNos.classList.remove("open");
      }
    });
  }

  // =========================================
  // IDENTIDADE DO USUÁRIO (nome, foto e bio)
  // Preenchida pelo login com Google (simulado) ou pela edição de perfil
  // =========================================
  function carregarIdentidade() {
    const nome = localStorage.getItem("artyUserName");
    const foto = localStorage.getItem("artyUserPhoto");
    const bio = localStorage.getItem("artyUserBio");

    if (foto) {
      document.querySelectorAll("#sidebar-profile").forEach((el) => {
        el.innerHTML = `<img src="${foto}" alt="${nome || "Perfil"}">`;
      });
      const avatarGrande = document.querySelector(".profile-avatar-lg");
      if (avatarGrande) {
        avatarGrande.innerHTML = `<img src="${foto}" alt="${nome || "Perfil"}">`;
      }
    }

    const nomeEl = document.querySelector(".profile-name");
    if (nomeEl && nome) nomeEl.textContent = nome;

    const bioEl = document.querySelector(".profile-bio");
    if (bioEl && bio) bioEl.textContent = bio;
  }

  carregarIdentidade();

  // =========================================
  // PÁGINA INDEX (LOGIN)
  // =========================================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value;

      if (!email || !senha) return;

      const usuarios = JSON.parse(localStorage.getItem("artyUsers") || "[]");
      const existente = usuarios.find((u) => u.email === email);

      if (existente) {
        if (existente.senha === senha) {
          localStorage.setItem("artySession", email);
          window.location.href = "exposicoes.html";
        } else {
          alert("Senha incorreta. Tente novamente.");
        }
      } else {
        usuarios.push({ email, senha });
        localStorage.setItem("artyUsers", JSON.stringify(usuarios));
        localStorage.setItem("artySession", email);
        alert("Conta criada com sucesso! Bem-vindo(a) à Arty.");
        window.location.href = "exposicoes.html";
      }
    });
  }

  const btnContinuar = document.getElementById("btnContinuar");
  if (btnContinuar) {
    btnContinuar.addEventListener("click", function () {
      localStorage.setItem("artySession", "guest");
      window.location.href = "exposicoes.html";
    });
  }

  // Login com Google (versão simulada — veja observação sobre isso na conversa)
  const btnGoogleLogin = document.getElementById("btnGoogleLogin");
  if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener("click", function () {
      const nome = prompt("Simulação de login com Google.\nDigite o nome da conta Google:");
      if (!nome || !nome.trim()) return;

      const nomeLimpo = nome.trim();
      const foto = "https://ui-avatars.com/api/?background=6b4cff&color=fff&size=128&name=" + encodeURIComponent(nomeLimpo);

      localStorage.setItem("artyUserName", nomeLimpo);
      localStorage.setItem("artyUserPhoto", foto);
      localStorage.setItem("artySession", "google:" + nomeLimpo);
      window.location.href = "exposicoes.html";
    });
  }

  const searchInputIndex = document.getElementById("searchInput");
  if (searchInputIndex) {
    searchInputIndex.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const query = this.value.trim();
        if (query) {
          window.location.href = "exposicoes.html?q=" + encodeURIComponent(query);
        }
      }
    });
  }

  // =========================================
  // TEMA (CLARO / ESCURO) — aplicado em todas as páginas internas
  // =========================================
  const temaSalvo = localStorage.getItem("artyTheme"); // "light" | "dark"
  const escuroInicial = temaSalvo !== "light";

  function aplicarTema(escuro) {
    document.body.classList.toggle("light-mode", !escuro);
    localStorage.setItem("artyTheme", escuro ? "dark" : "light");

    const btnLight = document.getElementById("btn-light");
    const btnDark = document.getElementById("btn-dark");
    if (btnLight) {
      btnLight.classList.toggle("active-mode", !escuro);
      btnLight.textContent = !escuro ? "Claro (ativo)" : "Claro";
    }
    if (btnDark) {
      btnDark.classList.toggle("active-mode", escuro);
      btnDark.textContent = escuro ? "Escuro (ativo)" : "Escuro";
    }

    const btnModoClaro = document.getElementById("btnModoClaro");
    const btnModoEscuro = document.getElementById("btnModoEscuro");
    if (btnModoClaro) btnModoClaro.classList.toggle("active-mode", !escuro);
    if (btnModoEscuro) btnModoEscuro.classList.toggle("active-mode", escuro);
  }

  if (document.body.classList.contains("app-shell")) {
    aplicarTema(escuroInicial);
  }

  const btnLight = document.getElementById("btn-light");
  const btnDark = document.getElementById("btn-dark");
  if (btnLight) btnLight.addEventListener("click", () => aplicarTema(false));
  if (btnDark) btnDark.addEventListener("click", () => aplicarTema(true));

  const btnModoClaro = document.getElementById("btnModoClaro");
  const btnModoEscuro = document.getElementById("btnModoEscuro");
  if (btnModoClaro) btnModoClaro.addEventListener("click", () => aplicarTema(false));
  if (btnModoEscuro) btnModoEscuro.addEventListener("click", () => aplicarTema(true));

  // =========================================
  // PÁGINA EXPOSIÇÕES (vídeos curtos)
  // =========================================
  const categoryBar = document.getElementById("categoryBar");
  const videoPlayer = document.getElementById("videoPlayer");
  const videoPlaceholder = document.getElementById("videoPlaceholder");
  const caption = document.getElementById("caption");
  const btnLike = document.getElementById("btn-like");
  const btnComment = document.getElementById("btn-comment");
  const btnSave = document.getElementById("btn-save");
  const btnShare = document.getElementById("btn-share");
  const searchInput = document.getElementById("search");
  const btnSearch = document.getElementById("btn-search");

  let categoriaAtual = null;
  let videoAtual = null;

  function getSavedVideos() {
    return JSON.parse(localStorage.getItem("artySavedVideos") || "[]");
  }

  function setSavedVideos(lista) {
    localStorage.setItem("artySavedVideos", JSON.stringify(lista));
  }

  function isVideoSaved(src) {
    return getSavedVideos().some((v) => v.src === src);
  }

  function carregarVideo(catIndex) {
    const cat = categorias[catIndex];
    if (!cat) return;
    categoriaAtual = cat;

    document.querySelectorAll(".category-chip").forEach((chip, i) => {
      chip.classList.toggle("active", i === catIndex);
    });

    if (!cat.videos.length) {
      videoAtual = null;
      if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.removeAttribute("src");
        videoPlayer.style.display = "none";
      }
      if (videoPlaceholder) {
        videoPlaceholder.style.display = "flex";
        videoPlaceholder.innerHTML = `<span>Nenhum vídeo ainda</span><small>A categoria "${cat.nome}" ainda não tem vídeos publicados.</small>`;
      }
      if (caption) caption.textContent = "";
      if (btnSave) btnSave.classList.remove("saved");
      return;
    }

    videoAtual = cat.videos[0];
    if (videoPlaceholder) videoPlaceholder.style.display = "none";
    if (videoPlayer) {
      videoPlayer.src = videoAtual.src;
      videoPlayer.style.display = "block";
    }
    if (caption) caption.textContent = videoAtual.caption || "";
    if (btnSave) btnSave.classList.toggle("saved", isVideoSaved(videoAtual.src));
  }

  function renderizarCategorias(filtro) {
    if (!categoryBar) return;
    categoryBar.innerHTML = "";
    const termo = (filtro || "").trim().toLowerCase();

    categorias.forEach((cat, i) => {
      if (termo && !cat.nome.toLowerCase().includes(termo)) return;
      const chip = document.createElement("button");
      chip.className = "category-chip";
      chip.type = "button";
      chip.textContent = cat.nome;
      chip.addEventListener("click", () => carregarVideo(i));
      categoryBar.appendChild(chip);
    });
  }

  if (categoryBar) {
    renderizarCategorias();
    carregarVideo(0);
  }

  if (btnLike) {
    let liked = false;
    btnLike.addEventListener("click", () => {
      liked = !liked;
      btnLike.classList.toggle("liked", liked);
    });
  }

  if (btnSave) {
    btnSave.addEventListener("click", () => {
      if (!videoAtual) return;
      let lista = getSavedVideos();
      const jaSalvo = lista.some((v) => v.src === videoAtual.src);

      if (jaSalvo) {
        lista = lista.filter((v) => v.src !== videoAtual.src);
      } else {
        lista.push({ src: videoAtual.src, caption: videoAtual.caption });
      }

      setSavedVideos(lista);
      btnSave.classList.toggle("saved", !jaSalvo);
    });
  }

  if (btnComment) {
    btnComment.addEventListener("click", () => {
      const comentario = prompt("Escreva seu comentário:");
      if (comentario) {
        alert("Comentário enviado: " + comentario);
      }
    });
  }

  if (btnShare) {
    btnShare.addEventListener("click", () => {
      const texto = "Olha essa arte na Arty!";
      if (navigator.share) {
        navigator.share({
          title: "Arty",
          text: texto,
          url: window.location.href
        }).catch(() => {});
      } else {
        alert("Compartilhar:\n" + texto + "\n" + window.location.href);
      }
    });
  }

  function fazerBusca() {
    const termo = searchInput ? searchInput.value.trim() : "";
    renderizarCategorias(termo);
    if (!termo) return;

    const encontrada = categorias.findIndex((c) => c.nome.toLowerCase().includes(termo.toLowerCase()));
    if (encontrada >= 0) {
      carregarVideo(encontrada);
    }
  }

  if (btnSearch) btnSearch.addEventListener("click", fazerBusca);
  if (searchInput) {
    searchInput.addEventListener("input", () => renderizarCategorias(searchInput.value));
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") fazerBusca();
    });

    // Recebe o termo pesquisado no index.html pela URL (?q=...)
    const params = new URLSearchParams(window.location.search);
    const termoUrl = params.get("q");
    if (termoUrl) {
      searchInput.value = termoUrl;
      fazerBusca();
    }
  }

  // Botão "Ajuda" da sidebar (diferente do widget "Sobre Nós")
  const btnHelpSidebar = document.getElementById("btn-help");
  if (btnHelpSidebar) {
    btnHelpSidebar.addEventListener("click", () => {
      alert("Ajuda / Suporte – em breve!");
    });
  }

  // =========================================
  // PÁGINA CONFIGURAÇÕES
  // =========================================
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("artySession");
      alert("Você saiu da sua conta.");
      window.location.href = "index.html";
    });
  }

  // =========================================
  // PÁGINA PERFIL
  // =========================================
  const btnEditProfile = document.getElementById("btnEditProfile");
  const modalEditProfile = document.getElementById("modalEditProfile");
  const modalEditProfileClose = document.getElementById("modalEditProfileClose");
  const btnSalvarPerfil = document.getElementById("btnSalvarPerfil");

  if (btnEditProfile && modalEditProfile) {
    btnEditProfile.addEventListener("click", () => {
      const nomeAtual = document.querySelector(".profile-name");
      const bioAtual = document.querySelector(".profile-bio");
      const editNome = document.getElementById("editNome");
      const editBio = document.getElementById("editBio");

      if (editNome) editNome.value = localStorage.getItem("artyUserName") || (nomeAtual ? nomeAtual.textContent : "");
      if (editBio) editBio.value = localStorage.getItem("artyUserBio") || (bioAtual ? bioAtual.textContent : "");

      modalEditProfile.classList.add("open");
    });

    if (modalEditProfileClose) {
      modalEditProfileClose.addEventListener("click", () => {
        modalEditProfile.classList.remove("open");
      });
    }

    modalEditProfile.addEventListener("click", (e) => {
      if (e.target === modalEditProfile) {
        modalEditProfile.classList.remove("open");
      }
    });
  }

  if (btnSalvarPerfil) {
    btnSalvarPerfil.addEventListener("click", () => {
      const novoNome = document.getElementById("editNome").value.trim();
      const novaBio = document.getElementById("editBio").value.trim();

      if (novoNome) {
        localStorage.setItem("artyUserName", novoNome);
        const nomeEl = document.querySelector(".profile-name");
        if (nomeEl) nomeEl.textContent = novoNome;
      }

      if (novaBio) {
        localStorage.setItem("artyUserBio", novaBio);
        const bioEl = document.querySelector(".profile-bio");
        if (bioEl) bioEl.textContent = novaBio;
      }

      if (modalEditProfile) modalEditProfile.classList.remove("open");
    });
  }

  const savedVideosGrid = document.getElementById("savedVideosGrid");
  if (savedVideosGrid) {
    const lista = getSavedVideos();
    if (lista.length) {
      savedVideosGrid.innerHTML = "";
      lista.forEach((v) => {
        const item = document.createElement("div");
        item.className = "grid-item saved-video-item";
        item.innerHTML = `<video src="${v.src}" muted preload="metadata"></video><span>${v.caption || "Vídeo salvo"}</span>`;
        savedVideosGrid.appendChild(item);
      });
    }
  }

  console.log("Arty carregado com sucesso");
});
