document.addEventListener("DOMContentLoaded", () => {

  var categorias = [
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

  var btnSobreNos = document.getElementById("btnSobreNos");
  var modalSobreNos = document.getElementById("modalSobreNos");
  var modalSobreNosClose = document.getElementById("modalSobreNosClose");

  if(btnSobreNos && modalSobreNos) {
    btnSobreNos.addEventListener("click", () => {
      modalSobreNos.classList.add("open");
    });

    if(modalSobreNosClose) {
      modalSobreNosClose.addEventListener("click", () => {
        modalSobreNos.classList.remove("open");
      });
    }

    modalSobreNos.addEventListener("click", (e) => {
      if(e.target === modalSobreNos) {
        modalSobreNos.classList.remove("open");
      }
    });
  }

  function setIdentidade(nomeBase) {
    if(localStorage.getItem("artyUserName") && localStorage.getItem("artyUserPhoto")) return;
    const nomeFormatado = nomeBase.charAt(0).toUpperCase() + nomeBase.slice(1);
    const foto = "https://ui-avatars.com/api/?background=6b4cff&color=fff&size=128&name=" + encodeURIComponent(nomeFormatado);
    localStorage.setItem("artyUserName", nomeFormatado);
    localStorage.setItem("artyUserPhoto", foto);
  }

  function carregaPerfil() {
    const nome = localStorage.getItem("artyUserName");
    const foto = localStorage.getItem("artyUserPhoto");
    const bio = localStorage.getItem("artyUserBio");

    if(foto) {
      document.querySelectorAll("#sidebar-profile").forEach((el) => {
        el.innerHTML = `<img src="${foto}" alt="${nome || "Perfil"}">`;
      });
      const avatarGrande = document.querySelector(".profile-avatar-lg");
      if(avatarGrande) {
        avatarGrande.innerHTML = `<img src="${foto}" alt="${nome || "Perfil"}">`;
      }
    }

    const nomeEl = document.querySelector(".profile-name");
    if(nomeEl && nome) nomeEl.textContent = nome;

    const bioEl = document.querySelector(".profile-bio");
    if(bioEl && bio) bioEl.textContent = bio;
  }

  carregaPerfil();

  var loginForm = document.getElementById("loginForm");
  var senhaInput = document.getElementById("senha");
  var senhaErro = document.getElementById("senhaError");

  function limpaErro() {
    if(senhaErro) senhaErro.textContent = "";
    if(senhaInput) senhaInput.classList.remove("input-error");
  }

  function mostraErro(msg) {
    if(senhaErro) senhaErro.textContent = msg;
    if(senhaInput) senhaInput.classList.add("input-error");
  }

  if(senhaInput) {
    senhaInput.addEventListener("input", limparErroSenha);
  }

  if(loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value;

      if(!email || !senha) return;

      limpaErro();

      const usuarios = JSON.parse(localStorage.getItem("artyUsers") || "[]");
      const existente = usuarios.find((u) => u.email === email);

      if(existente) {
        if(existente.senha === senha) {
          localStorage.setItem("artySession", email);
          setIdentidade(email.split("@")[0]);
          window.location.href = "exposicoes.html";
        } else {
          mostraErro("Senha incorreta. Tente novamente.");
        }
      } else {
        usuarios.push({ email, senha });
        localStorage.setItem("artyUsers", JSON.stringify(usuarios));
        localStorage.setItem("artySession", email);
        setIdentidade(email.split("@")[0]);
        alert("Conta criada com sucesso! Bem-vindo(a) à Arty.");
        window.location.href = "exposicoes.html";
      }
    });
  }

  var btnContinuar = document.getElementById("btnContinuar");
  if(btnContinuar) {
    btnContinuar.addEventListener("click", function () {
      localStorage.setItem("artySession", "guest");
      setIdentidade("Convidado");
      window.location.href = "exposicoes.html";
    });
  }

  var btnGoogle = document.getElementById("btnGoogle");
  if(btnGoogle) {
    btnGoogle.addEventListener("click", function () {
      const nome = prompt("Simulação de login com Google.\nDigite o nome da conta Google:");
      if(!nome || !nome.trim()) return;

      const nomeLimpo = nome.trim();
      const foto = "https://ui-avatars.com/api/?background=6b4cff&color=fff&size=128&name=" + encodeURIComponent(nomeLimpo);

      localStorage.setItem("artyUserName", nomeLimpo);
      localStorage.setItem("artyUserPhoto", foto);
      localStorage.setItem("artySession", "google:" + nomeLimpo);
      window.location.href = "exposicoes.html";
    });
  }

  var searchIndex = document.getElementById("searchInput");
  var sugestoes = document.getElementById("searchSuggestions");

  function vaiPraCategoria(nomeCategoria) {
    window.location.href = "exposicoes.html?q=" + encodeURIComponent(nomeCategoria);
  }

  function mostraSugestoes(filtro) {
    if(!sugestoes) return;
    const termo = (filtro || "").trim().toLowerCase();
    const opcoes = categorias.filter((c) => !termo || c.nome.toLowerCase().includes(termo));

    sugestoes.innerHTML = "";

    if(!opcoes.length) {
      const vazio = document.createElement("div");
      vazio.className = "suggestion-empty";
      vazio.textContent = "Nenhuma categoria encontrada";
      sugestoes.appendChild(vazio);
    } else {
      opcoes.forEach((cat) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "suggestion-item";
        item.textContent = cat.nome;
        item.addEventListener("mousedown", (e) => {

          e.preventDefault();
          vaiPraCategoria(cat.nome);
        });
        sugestoes.appendChild(item);
      });
    }

    sugestoes.classList.add("open");
  }

  if(searchIndex && sugestoes) {
    searchIndex.addEventListener("focus", () => mostraSugestoes(searchIndex.value));
    searchIndex.addEventListener("input", () => mostraSugestoes(searchIndex.value));
    searchIndex.addEventListener("blur", () => {
      sugestoes.classList.remove("open");
    });

    searchIndex.addEventListener("keypress", function (e) {
      if(e.key === "Enter") {
        const query = this.value.trim();
        if(query) vaiPraCategoria(query);
      }
    });
  }

  var temaSalvo = localStorage.getItem("artyTheme");
  var escuro = temaSalvo !== "light";

  function mudaTema(escuro) {
    document.body.classList.toggle("light-mode", !escuro);
    localStorage.setItem("artyTheme", escuro ? "dark" : "light");

    const btnLightEl = document.getElementById("btn-light");
    const btnDarkEl = document.getElementById("btn-dark");
    if(btnLightEl) btnLightEl.classList.toggle("active-mode", !escuro);
    if(btnDarkEl) btnDarkEl.classList.toggle("active-mode", escuro);

    const btnModoClaroEl = document.getElementById("btnModoClaro");
    const btnModoEscuroEl = document.getElementById("btnModoEscuro");
    if(btnModoClaroEl) btnModoClaroEl.classList.toggle("active-mode", !escuro);
    if(btnModoEscuroEl) btnModoEscuroEl.classList.toggle("active-mode", escuro);
  }

  if(document.body.classList.contains("app-shell")) {
    mudaTema(escuro);
  }

  var btnLight = document.getElementById("btn-light");
  var btnDark = document.getElementById("btn-dark");
  if(btnLight) btnLight.addEventListener("click", () => mudaTema(false));
  if(btnDark) btnDark.addEventListener("click", () => mudaTema(true));

  var btnModoClaro = document.getElementById("btnModoClaro");
  var btnModoEscuro = document.getElementById("btnModoEscuro");
  if(btnModoClaro) btnModoClaro.addEventListener("click", () => mudaTema(false));
  if(btnModoEscuro) btnModoEscuro.addEventListener("click", () => mudaTema(true));

  var categoryBar = document.getElementById("categoryBar");
  var videoPlayer = document.getElementById("videoPlayer");
  var videoRect = document.getElementById("videoRect");
  var videoPlaceholder = document.getElementById("videoPlaceholder");
  var caption = document.getElementById("caption");
  var btnComment = document.getElementById("btn-comment");
  var btnSave = document.getElementById("btn-save");
  var btnShare = document.getElementById("btn-share");
  var btnNext = document.getElementById("btn-next-video");
  var searchInput = document.getElementById("search");
  var btnSearch = document.getElementById("btn-search");

  var categoriaAtual = null;
  var indiceVideo = 0;
  var videoAtual = null;

  function pegaSalvos() {
    return JSON.parse(localStorage.getItem("artySavedVideos") || "[]");
  }

  function salvaLista(lista) {
    localStorage.setItem("artySavedVideos", JSON.stringify(lista));
  }

  function jaSalvo(src) {
    return pegaSalvos().some((v) => v.src === src);
  }

  function travaVolume(video) {
    if(!video || video.dataset.volumeTravado) return;
    video.dataset.volumeTravado = "1";
    video.muted = true;
    video.volume = 0;
    video.addEventListener("volumechange", () => {
      if(!video.muted || video.volume !== 0) {
        video.muted = true;
        video.volume = 0;
      }
    });
  }

  if(videoPlayer) travaVolume(videoPlayer);

  function carregaVideo(catIndex, videoIndex) {
    const cat = categorias[catIndex];
    if(!cat) return;
    categoriaAtual = cat;

    document.querySelectorAll(".category-chip").forEach((chip, i) => {
      chip.classList.toggle("active", i === catIndex);
    });

    if(!cat.videos.length) {
      indiceVideo = 0;
      videoAtual = null;
      if(videoPlayer) {
        videoPlayer.pause();
        videoPlayer.removeAttribute("src");
        videoPlayer.style.display = "none";
      }
      if(btnNext) btnNext.style.display = "none";
      if(videoPlaceholder) {
        videoPlaceholder.style.display = "flex";
        videoPlaceholder.innerHTML = `<span>Nenhum vídeo ainda</span><small>A categoria "${cat.nome}" ainda não tem vídeos publicados.</small>`;
      }
      if(caption) caption.textContent = "";
      if(btnSave) btnSave.classList.remove("saved");
      return;
    }

    indiceVideo = ((videoIndex % cat.videos.length) + cat.videos.length) % cat.videos.length;
    videoAtual = cat.videos[indiceVideo];

    if(videoPlaceholder) videoPlaceholder.style.display = "none";
    if(videoPlayer) {
      videoPlayer.style.display = "block";
      videoPlayer.src = videoAtual.src;
      videoPlayer.loop = true;
      videoPlayer.muted = true;
      videoPlayer.volume = 0;
      videoPlayer.onerror = () => {

        videoPlayer.style.display = "none";
        if(videoPlaceholder) {
          videoPlaceholder.style.display = "flex";
          videoPlaceholder.innerHTML = `<span>Vídeo em breve</span><small>Este vídeo da categoria "${cat.nome}" ainda não foi publicado.</small>`;
        }
      };
      videoPlayer.play().catch(() => {});
    }
    if(btnNext) btnNext.style.display = cat.videos.length > 1 ? "flex" : "none";
    if(caption) caption.textContent = cat.nome;
    if(btnSave) btnSave.classList.toggle("saved", jaSalvo(videoAtual.src));
    atualizaComent();
  }

  function carregaCat(catIndex) {
    carregaVideo(catIndex, 0);
  }

  function proxVideo() {
    if(!categoriaAtual || !categoriaAtual.videos.length) return;
    const catIndex = categorias.indexOf(categoriaAtual);
    carregaVideo(catIndex, indiceVideo + 1);
  }

  function mostraCats(filtro) {
    if(!categoryBar) return;
    categoryBar.innerHTML = "";
    const termo = (filtro || "").trim().toLowerCase();

    categorias.forEach((cat, i) => {
      if(termo && !cat.nome.toLowerCase().includes(termo)) return;
      const chip = document.createElement("button");
      chip.className = "category-chip";
      chip.type = "button";
      chip.textContent = cat.nome;
      chip.addEventListener("click", () => carregaCat(i));
      categoryBar.appendChild(chip);
    });
  }

  if(categoryBar) {
    mostraCats();
    carregaCat(0);
  }

  if(videoPlayer) {
    videoPlayer.addEventListener("click", () => {
      if(videoPlayer.paused) {
        videoPlayer.play().catch(() => {});
      } else {
        videoPlayer.pause();
      }
    });
  }

  if(btnNext) {
    btnNext.addEventListener("click", (e) => {
      e.stopPropagation();
      proxVideo();
    });
  }

  if(videoRect) {
    const LIMIAR_ARRASTE = 60;
    let inicioY = null;

    const iniciarArraste = (y) => { inicioY = y; };
    const finalizarArraste = (y) => {
      if(inicioY === null) return;
      const delta = y - inicioY;
      inicioY = null;
      if(delta > LIMIAR_ARRASTE) proxVideo();
    };

    videoRect.addEventListener("mousedown", (e) => iniciarArraste(e.clientY));
    window.addEventListener("mouseup", (e) => finalizarArraste(e.clientY));

    videoRect.addEventListener("touchstart", (e) => {
      if(e.touches[0]) iniciarArraste(e.touches[0].clientY);
    }, { passive: true });

    videoRect.addEventListener("touchend", (e) => {
      if(e.changedTouches[0]) finalizarArraste(e.changedTouches[0].clientY);
    }, { passive: true });
  }

  if(btnSave) {
    btnSave.addEventListener("click", () => {
      if(!videoAtual || !categoriaAtual) return;
      let lista = pegaSalvos();
      const jaSalvo = lista.some((v) => v.src === videoAtual.src);

      if(jaSalvo) {
        lista = lista.filter((v) => v.src !== videoAtual.src);
      } else {
        lista.push({ src: videoAtual.src, categoria: categoriaAtual.nome });
      }

      salvaLista(lista);
      btnSave.classList.toggle("saved", !jaSalvo);
    });
  }

  function userKey() {
    return localStorage.getItem("artySession") || "guest";
  }

  function pegaComents() {
    return JSON.parse(localStorage.getItem("artyComments") || "{}");
  }

  function salvaComents(obj) {
    localStorage.setItem("artyComments", JSON.stringify(obj));
  }

  function temComent(src) {
    if(!src) return false;
    const comentarios = pegaComents();
    const chave = userKey() + "::" + src;
    return !!(comentarios[chave] && comentarios[chave].trim());
  }

  function atualizaComent() {
    if(!btnComment) return;
    btnComment.classList.toggle("has-comment", videoAtual ? temComent(videoAtual.src) : false);
  }

  if(btnComment) {
    btnComment.addEventListener("click", () => {
      if(!videoAtual) return;
      const comentarios = pegaComents();
      const chave = userKey() + "::" + videoAtual.src;
      const existente = comentarios[chave] || "";

      const novoComentario = prompt("Seu comentário (privado, só você vê):", existente);
      if(novoComentario === null) return;

      comentarios[chave] = novoComentario;
      salvaComents(comentarios);
      atualizaComent();
    });
  }

  if(btnShare) {
    btnShare.addEventListener("click", () => {
      const texto = "Olha essa arte na Arty!";
      if(navigator.share) {
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

  function busca() {
    const termo = searchInput ? searchInput.value.trim() : "";
    mostraCats(termo);
    if(!termo) return;

    const encontrada = categorias.findIndex((c) => c.nome.toLowerCase().includes(termo.toLowerCase()));
    if(encontrada >= 0) {
      carregaCat(encontrada);
    }
  }

  if(btnSearch) btnSearch.addEventListener("click", busca);
  if(searchInput) {
    searchInput.addEventListener("input", () => mostraCats(searchInput.value));
    searchInput.addEventListener("keypress", (e) => {
      if(e.key === "Enter") busca();
    });

    const params = new URLSearchParams(window.location.search);
    const termoUrl = params.get("q");
    if(termoUrl) {
      searchInput.value = termoUrl;
      busca();
    }
  }

  var btnLogout = document.getElementById("btnLogout");
  if(btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("artySession");
      alert("Você saiu da sua conta.");
      window.location.href = "index.html";
    });
  }

  var btnEdit = document.getElementById("btnEdit");
  var modalEdit = document.getElementById("modalEdit");
  const modalEditClose = document.getElementById("modalEditClose");
  var btnSalvar = document.getElementById("btnSalvar");
  var editFoto = document.getElementById("editFoto");
  var previewFoto = document.getElementById("previewFoto");

  var novaFoto = null;

  function mostraPreview(fotoUrl) {
    if(!previewFoto) return;
    if(fotoUrl) {
      previewFoto.innerHTML = `<img src="${fotoUrl}" alt="Pré-visualização">`;
    } else {
      previewFoto.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z"/></svg>`;
    }
  }

  if(btnEdit && modalEdit) {
    btnEdit.addEventListener("click", () => {
      const nomeAtual = document.querySelector(".profile-name");
      const bioAtual = document.querySelector(".profile-bio");
      const editNome = document.getElementById("editNome");
      const editBio = document.getElementById("editBio");

      if(editNome) editNome.value = localStorage.getItem("artyUserName") || (nomeAtual ? nomeAtual.textContent : "");
      if(editBio) editBio.value = localStorage.getItem("artyUserBio") || (bioAtual ? bioAtual.textContent : "");

      novaFoto = null;
      if(editFoto) editFoto.value = "";
      mostraPreview(localStorage.getItem("artyUserPhoto"));

      modalEdit.classList.add("open");
    });

    if(modalEditClose) {
      modalEditClose.addEventListener("click", () => {
        modalEdit.classList.remove("open");
      });
    }

    modalEdit.addEventListener("click", (e) => {
      if(e.target === modalEdit) {
        modalEdit.classList.remove("open");
      }
    });
  }

  if(editFoto) {
    editFoto.addEventListener("change", () => {
      const arquivo = editFoto.files && editFoto.files[0];
      if(!arquivo) return;

      const leitor = new FileReader();
      leitor.onload = () => {
        novaFoto = leitor.result;
        mostraPreview(novaFoto);
      };
      leitor.readAsDataURL(arquivo);
    });
  }

  if(btnSalvar) {
    btnSalvar.addEventListener("click", () => {
      const novoNome = document.getElementById("editNome").value.trim();
      const novaBio = document.getElementById("editBio").value.trim();

      if(novoNome) {
        localStorage.setItem("artyUserName", novoNome);
        const nomeEl = document.querySelector(".profile-name");
        if(nomeEl) nomeEl.textContent = novoNome;
      }

      if(novaBio) {
        localStorage.setItem("artyUserBio", novaBio);
        const bioEl = document.querySelector(".profile-bio");
        if(bioEl) bioEl.textContent = novaBio;
      }

      if(novaFoto) {
        localStorage.setItem("artyUserPhoto", novaFoto);
        carregaPerfil();
        novaFoto = null;
      }

      if(modalEdit) modalEdit.classList.remove("open");
    });
  }

  var modalVideo = document.getElementById("modalVideo");
  const modalVideoVideo = document.getElementById("modalVideoVideo");
  const modalVideoClose = document.getElementById("modalVideoClose");
  const modalVideoLabel = document.getElementById("modalVideoLabel");

  function abreVideo(src, categoria) {
    if(!modalVideo || !modalVideoVideo) return;
    travaVolume(modalVideoVideo);
    modalVideoVideo.src = src;
    modalVideoVideo.loop = true;
    modalVideoVideo.muted = true;
    modalVideoVideo.volume = 0;
    if(modalVideoLabel) modalVideoLabel.textContent = categoria || "";
    modalVideo.classList.add("open");
    modalVideoVideo.play().catch(() => {});
  }

  function fechaVideo() {
    if(!modalVideo || !modalVideoVideo) return;
    modalVideoVideo.pause();
    modalVideo.classList.remove("open");
  }

  if(modalVideoClose) modalVideoClose.addEventListener("click", fechaVideo);
  if(modalVideo) {
    modalVideo.addEventListener("click", (e) => {
      if(e.target === modalVideo) fechaVideo();
    });
  }

  var gridSalvos = document.getElementById("gridSalvos");
  if(gridSalvos) {
    const lista = pegaSalvos();
    if(lista.length) {
      gridSalvos.innerHTML = "";
      lista.forEach((v) => {
        const item = document.createElement("div");
        item.className = "grid-item saved-video-item";
        item.innerHTML = `<video src="${v.src}" muted preload="metadata"></video><span>${v.categoria || "Vídeo salvo"}</span>`;
        item.addEventListener("click", () => abreVideo(v.src, v.categoria));
        gridSalvos.appendChild(item);
      });
    }
  }

  console.log("carregou");
});