document.addEventListener("DOMContentLoaded", () => {

  // =========================================
  // CATEGORIAS E VÍDEOS
  // vid1-5   → Ideias de Desenho
  // vid6-10  → Pinturas
  // vid11-15 → Escultura   (aguardando envio dos vídeos)
  // vid16-20 → Design Digital (aguardando envio dos vídeos)
  // =========================================
  const categorias = [
    {
      id: "ideias-desenho",
      nome: "Ideias de Desenho",
      videos: [
        { src: "videos/vid1.mp4" },
        { src: "videos/vid2.mp4" },
        { src: "videos/vid3.mp4" },
        { src: "videos/vid4.mp4" },
        { src: "videos/vid5.mp4" }
      ]
    },
    {
      id: "pinturas",
      nome: "Pinturas",
      videos: [
        { src: "videos/vid6.mp4" },
        { src: "videos/vid7.mp4" },
        { src: "videos/vid8.mp4" },
        { src: "videos/vid9.mp4" },
        { src: "videos/vid10.mp4" }
      ]
    },
    {
      id: "escultura",
      nome: "Escultura",
      videos: [
        { src: "videos/vid11.mp4" },
        { src: "videos/vid12.mp4" },
        { src: "videos/vid13.mp4" },
        { src: "videos/vid14.mp4" },
        { src: "videos/vid15.mp4" }
      ]
    },
    {
      id: "design-digital",
      nome: "Design Digital",
      videos: [
        { src: "videos/vid16.mp4" },
        { src: "videos/vid17.mp4" },
        { src: "videos/vid18.mp4" },
        { src: "videos/vid19.mp4" },
        { src: "videos/vid20.mp4" }
      ]
    }
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
  // IDENTIDADE DO USUÁRIO (nome e foto vêm do login)
  // =========================================
  function definirIdentidadeSeNecessario(nomeBase) {
    if (localStorage.getItem("artyUserName") && localStorage.getItem("artyUserPhoto")) return;
    const nomeFormatado = nomeBase.charAt(0).toUpperCase() + nomeBase.slice(1);
    const foto = "https://ui-avatars.com/api/?background=6b4cff&color=fff&size=128&name=" + encodeURIComponent(nomeFormatado);
    localStorage.setItem("artyUserName", nomeFormatado);
    localStorage.setItem("artyUserPhoto", foto);
  }

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
  const senhaInputEl = document.getElementById("senha");
  const senhaErrorEl = document.getElementById("senhaError");

  function limparErroSenha() {
    if (senhaErrorEl) senhaErrorEl.textContent = "";
    if (senhaInputEl) senhaInputEl.classList.remove("input-error");
  }

  function mostrarErroSenha(msg) {
    if (senhaErrorEl) senhaErrorEl.textContent = msg;
    if (senhaInputEl) senhaInputEl.classList.add("input-error");
  }

  if (senhaInputEl) {
    senhaInputEl.addEventListener("input", limparErroSenha);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value;

      if (!email || !senha) return;

      limparErroSenha();

      const usuarios = JSON.parse(localStorage.getItem("artyUsers") || "[]");
      const existente = usuarios.find((u) => u.email === email);

      if (existente) {
        if (existente.senha === senha) {
          localStorage.setItem("artySession", email);
          definirIdentidadeSeNecessario(email.split("@")[0]);
          window.location.href = "exposicoes.html";
        } else {
          mostrarErroSenha("Senha incorreta. Tente novamente.");
        }
      } else {
        usuarios.push({ email, senha });
        localStorage.setItem("artyUsers", JSON.stringify(usuarios));
        localStorage.setItem("artySession", email);
        definirIdentidadeSeNecessario(email.split("@")[0]);
        alert("Conta criada com sucesso! Bem-vindo(a) à Arty.");
        window.location.href = "exposicoes.html";
      }
    });
  }

  const btnContinuar = document.getElementById("btnContinuar");
  if (btnContinuar) {
    btnContinuar.addEventListener("click", function () {
      localStorage.setItem("artySession", "guest");
      definirIdentidadeSeNecessario("Convidado");
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
  const searchSuggestionsIndex = document.getElementById("searchSuggestions");

  function irParaCategoria(nomeCategoria) {
    window.location.href = "exposicoes.html?q=" + encodeURIComponent(nomeCategoria);
  }

  function renderizarSugestoesIndex(filtro) {
    if (!searchSuggestionsIndex) return;
    const termo = (filtro || "").trim().toLowerCase();
    const opcoes = categorias.filter((c) => !termo || c.nome.toLowerCase().includes(termo));

    searchSuggestionsIndex.innerHTML = "";

    if (!opcoes.length) {
      const vazio = document.createElement("div");
      vazio.className = "suggestion-empty";
      vazio.textContent = "Nenhuma categoria encontrada";
      searchSuggestionsIndex.appendChild(vazio);
    } else {
      opcoes.forEach((cat) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "suggestion-item";
        item.textContent = cat.nome;
        item.addEventListener("mousedown", (e) => {
          // mousedown (em vez de click) evita que o blur do input feche a lista antes do clique
          e.preventDefault();
          irParaCategoria(cat.nome);
        });
        searchSuggestionsIndex.appendChild(item);
      });
    }

    searchSuggestionsIndex.classList.add("open");
  }

  if (searchInputIndex && searchSuggestionsIndex) {
    searchInputIndex.addEventListener("focus", () => renderizarSugestoesIndex(searchInputIndex.value));
    searchInputIndex.addEventListener("input", () => renderizarSugestoesIndex(searchInputIndex.value));
    searchInputIndex.addEventListener("blur", () => {
      searchSuggestionsIndex.classList.remove("open");
    });

    searchInputIndex.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const query = this.value.trim();
        if (query) irParaCategoria(query);
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

    const btnLightEl = document.getElementById("btn-light");
    const btnDarkEl = document.getElementById("btn-dark");
    if (btnLightEl) btnLightEl.classList.toggle("active-mode", !escuro);
    if (btnDarkEl) btnDarkEl.classList.toggle("active-mode", escuro);

    const btnModoClaroEl = document.getElementById("btnModoClaro");
    const btnModoEscuroEl = document.getElementById("btnModoEscuro");
    if (btnModoClaroEl) btnModoClaroEl.classList.toggle("active-mode", !escuro);
    if (btnModoEscuroEl) btnModoEscuroEl.classList.toggle("active-mode", escuro);
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
  // PÁGINA EXPOSIÇÕES (vídeos curtos, estilo Reels)
  // =========================================
  const categoryBar = document.getElementById("categoryBar");
  const videoPlayer = document.getElementById("videoPlayer");
  const videoRect = document.getElementById("videoRect");
  const videoPlaceholder = document.getElementById("videoPlaceholder");
  const caption = document.getElementById("caption");
  const btnComment = document.getElementById("btn-comment");
  const btnSave = document.getElementById("btn-save");
  const btnShare = document.getElementById("btn-share");
  const btnNextVideo = document.getElementById("btn-next-video");
  const searchInput = document.getElementById("search");
  const btnSearch = document.getElementById("btn-search");

  let categoriaAtual = null;
  let indiceVideoAtual = 0;
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

  // Garante que o vídeo fique sempre mudo e com volume travado em 0
  function travarVolume(video) {
    if (!video || video.dataset.volumeTravado) return;
    video.dataset.volumeTravado = "1";
    video.muted = true;
    video.volume = 0;
    video.addEventListener("volumechange", () => {
      if (!video.muted || video.volume !== 0) {
        video.muted = true;
        video.volume = 0;
      }
    });
  }

  if (videoPlayer) travarVolume(videoPlayer);

  function carregarVideoPorIndice(catIndex, videoIndex) {
    const cat = categorias[catIndex];
    if (!cat) return;
    categoriaAtual = cat;

    document.querySelectorAll(".category-chip").forEach((chip, i) => {
      chip.classList.toggle("active", i === catIndex);
    });

    if (!cat.videos.length) {
      indiceVideoAtual = 0;
      videoAtual = null;
      if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.removeAttribute("src");
        videoPlayer.style.display = "none";
      }
      if (btnNextVideo) btnNextVideo.style.display = "none";
      if (videoPlaceholder) {
        videoPlaceholder.style.display = "flex";
        videoPlaceholder.innerHTML = `<span>Nenhum vídeo ainda</span><small>A categoria "${cat.nome}" ainda não tem vídeos publicados.</small>`;
      }
      if (caption) caption.textContent = "";
      if (btnSave) btnSave.classList.remove("saved");
      return;
    }

    indiceVideoAtual = ((videoIndex % cat.videos.length) + cat.videos.length) % cat.videos.length;
    videoAtual = cat.videos[indiceVideoAtual];

    if (videoPlaceholder) videoPlaceholder.style.display = "none";
    if (videoPlayer) {
      videoPlayer.style.display = "block";
      videoPlayer.src = videoAtual.src;
      videoPlayer.loop = true;
      videoPlayer.muted = true;
      videoPlayer.volume = 0;
      videoPlayer.onerror = () => {
        // Arquivo de vídeo ainda não foi enviado para esta categoria
        videoPlayer.style.display = "none";
        if (videoPlaceholder) {
          videoPlaceholder.style.display = "flex";
          videoPlaceholder.innerHTML = `<span>Vídeo em breve</span><small>Este vídeo da categoria "${cat.nome}" ainda não foi publicado.</small>`;
        }
      };
      videoPlayer.play().catch(() => {});
    }
    if (btnNextVideo) btnNextVideo.style.display = cat.videos.length > 1 ? "flex" : "none";
    if (caption) caption.textContent = cat.nome;
    if (btnSave) btnSave.classList.toggle("saved", isVideoSaved(videoAtual.src));
    atualizarIndicadorComentario();
  }

  function carregarCategoria(catIndex) {
    carregarVideoPorIndice(catIndex, 0);
  }

  function proximoVideo() {
    if (!categoriaAtual || !categoriaAtual.videos.length) return;
    const catIndex = categorias.indexOf(categoriaAtual);
    carregarVideoPorIndice(catIndex, indiceVideoAtual + 1);
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
      chip.addEventListener("click", () => carregarCategoria(i));
      categoryBar.appendChild(chip);
    });
  }

  if (categoryBar) {
    renderizarCategorias();
    carregarCategoria(0);
  }

  // Clique no vídeo alterna play/pause (já que o controle nativo foi removido)
  if (videoPlayer) {
    videoPlayer.addEventListener("click", () => {
      if (videoPlayer.paused) {
        videoPlayer.play().catch(() => {});
      } else {
        videoPlayer.pause();
      }
    });
  }

  // Botão de seta para baixo → próximo vídeo
  if (btnNextVideo) {
    btnNextVideo.addEventListener("click", (e) => {
      e.stopPropagation();
      proximoVideo();
    });
  }

  // Arrastar para baixo (mouse ou toque) → próximo vídeo
  if (videoRect) {
    const LIMIAR_ARRASTE = 60;
    let inicioY = null;

    const iniciarArraste = (y) => { inicioY = y; };
    const finalizarArraste = (y) => {
      if (inicioY === null) return;
      const delta = y - inicioY;
      inicioY = null;
      if (delta > LIMIAR_ARRASTE) proximoVideo();
    };

    videoRect.addEventListener("mousedown", (e) => iniciarArraste(e.clientY));
    window.addEventListener("mouseup", (e) => finalizarArraste(e.clientY));

    videoRect.addEventListener("touchstart", (e) => {
      if (e.touches[0]) iniciarArraste(e.touches[0].clientY);
    }, { passive: true });

    videoRect.addEventListener("touchend", (e) => {
      if (e.changedTouches[0]) finalizarArraste(e.changedTouches[0].clientY);
    }, { passive: true });
  }

  if (btnSave) {
    btnSave.addEventListener("click", () => {
      if (!videoAtual || !categoriaAtual) return;
      let lista = getSavedVideos();
      const jaSalvo = lista.some((v) => v.src === videoAtual.src);

      if (jaSalvo) {
        lista = lista.filter((v) => v.src !== videoAtual.src);
      } else {
        lista.push({ src: videoAtual.src, categoria: categoriaAtual.nome });
      }

      setSavedVideos(lista);
      btnSave.classList.toggle("saved", !jaSalvo);
    });
  }

  // Comentários privados: só o usuário logado vê o próprio comentário de cada vídeo
  function chaveUsuarioAtual() {
    return localStorage.getItem("artySession") || "guest";
  }

  function getComentarios() {
    return JSON.parse(localStorage.getItem("artyComments") || "{}");
  }

  function setComentarios(obj) {
    localStorage.setItem("artyComments", JSON.stringify(obj));
  }

  // Indica visualmente (bolinha no botão Comentar) que o vídeo atual já tem comentário salvo
  function temComentario(src) {
    if (!src) return false;
    const comentarios = getComentarios();
    const chave = chaveUsuarioAtual() + "::" + src;
    return !!(comentarios[chave] && comentarios[chave].trim());
  }

  function atualizarIndicadorComentario() {
    if (!btnComment) return;
    btnComment.classList.toggle("has-comment", videoAtual ? temComentario(videoAtual.src) : false);
  }

  if (btnComment) {
    btnComment.addEventListener("click", () => {
      if (!videoAtual) return;
      const comentarios = getComentarios();
      const chave = chaveUsuarioAtual() + "::" + videoAtual.src;
      const existente = comentarios[chave] || "";

      const novoComentario = prompt("Seu comentário (privado, só você vê):", existente);
      if (novoComentario === null) return;

      comentarios[chave] = novoComentario;
      setComentarios(comentarios);
      atualizarIndicadorComentario();
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
      carregarCategoria(encontrada);
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
  const editFotoInput = document.getElementById("editFotoInput");
  const editAvatarPreview = document.getElementById("editAvatarPreview");

  // Guarda a nova foto (base64) escolhida no upload até o usuário clicar em "Salvar alterações"
  let novaFotoSelecionada = null;

  function definirPreviewAvatar(fotoUrl) {
    if (!editAvatarPreview) return;
    if (fotoUrl) {
      editAvatarPreview.innerHTML = `<img src="${fotoUrl}" alt="Pré-visualização">`;
    } else {
      editAvatarPreview.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z"/></svg>`;
    }
  }

  if (btnEditProfile && modalEditProfile) {
    btnEditProfile.addEventListener("click", () => {
      const nomeAtual = document.querySelector(".profile-name");
      const bioAtual = document.querySelector(".profile-bio");
      const editNome = document.getElementById("editNome");
      const editBio = document.getElementById("editBio");

      if (editNome) editNome.value = localStorage.getItem("artyUserName") || (nomeAtual ? nomeAtual.textContent : "");
      if (editBio) editBio.value = localStorage.getItem("artyUserBio") || (bioAtual ? bioAtual.textContent : "");

      novaFotoSelecionada = null;
      if (editFotoInput) editFotoInput.value = "";
      definirPreviewAvatar(localStorage.getItem("artyUserPhoto"));

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

  if (editFotoInput) {
    editFotoInput.addEventListener("change", () => {
      const arquivo = editFotoInput.files && editFotoInput.files[0];
      if (!arquivo) return;

      const leitor = new FileReader();
      leitor.onload = () => {
        novaFotoSelecionada = leitor.result;
        definirPreviewAvatar(novaFotoSelecionada);
      };
      leitor.readAsDataURL(arquivo);
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

      if (novaFotoSelecionada) {
        localStorage.setItem("artyUserPhoto", novaFotoSelecionada);
        carregarIdentidade();
        novaFotoSelecionada = null;
      }

      if (modalEditProfile) modalEditProfile.classList.remove("open");
    });
  }

  // Modal para assistir um vídeo salvo (sempre mudo, igual ao feed)
  const modalVideoPlayer = document.getElementById("modalVideoPlayer");
  const modalVideoPlayerVideo = document.getElementById("modalVideoPlayerVideo");
  const modalVideoPlayerClose = document.getElementById("modalVideoPlayerClose");
  const modalVideoPlayerLabel = document.getElementById("modalVideoPlayerLabel");

  function abrirVideoSalvo(src, categoria) {
    if (!modalVideoPlayer || !modalVideoPlayerVideo) return;
    travarVolume(modalVideoPlayerVideo);
    modalVideoPlayerVideo.src = src;
    modalVideoPlayerVideo.loop = true;
    modalVideoPlayerVideo.muted = true;
    modalVideoPlayerVideo.volume = 0;
    if (modalVideoPlayerLabel) modalVideoPlayerLabel.textContent = categoria || "";
    modalVideoPlayer.classList.add("open");
    modalVideoPlayerVideo.play().catch(() => {});
  }

  function fecharVideoSalvo() {
    if (!modalVideoPlayer || !modalVideoPlayerVideo) return;
    modalVideoPlayerVideo.pause();
    modalVideoPlayer.classList.remove("open");
  }

  if (modalVideoPlayerClose) modalVideoPlayerClose.addEventListener("click", fecharVideoSalvo);
  if (modalVideoPlayer) {
    modalVideoPlayer.addEventListener("click", (e) => {
      if (e.target === modalVideoPlayer) fecharVideoSalvo();
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
        item.innerHTML = `<video src="${v.src}" muted preload="metadata"></video><span>${v.categoria || "Vídeo salvo"}</span>`;
        item.addEventListener("click", () => abrirVideoSalvo(v.src, v.categoria));
        savedVideosGrid.appendChild(item);
      });
    }
  }

  console.log("Arty carregado com sucesso");
});
