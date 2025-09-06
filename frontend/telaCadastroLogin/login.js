document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Erro no login");

    // Salvar usuário logado
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("userName", data.user.name);

    alert(`Bem-vindo, ${data.user.name}!`);
    window.location.href = "../telaPokedex/pokedex.html"; // redireciona pra pokédex
  } catch (err) {
    alert("E-mail ou senha inválidos!");
    console.error(err);
  }
});