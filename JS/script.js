// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (email && senha) {
    alert('Login simulado com sucesso!\nEmail: ' + email);
  }
});

// Continuar sem conta
document.getElementById('btnContinuar').addEventListener('click', function() {
  alert('Continuando sem conta... Bem-vindo ao Arty!');
});

// Botão de ajuda (?)
document.getElementById('btnAjuda').addEventListener('click', function() {
  alert('Sobre Nós – Em breve!');
});

// Busca
document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const query = this.value.trim();
    if (query) {
      alert('Buscando por: "' + query + '"');
    }
  }
});