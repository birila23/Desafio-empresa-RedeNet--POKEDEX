document.getElementById("cadastro-form").addEventListener("submit", async (e) =>{
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3333/cadastrarUsuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });
    
    if (!response.ok) throw new Error("Erro no cadastro");

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";

    }catch (err) {
    alert("Erro ao cadastrar usuário!");
    console.error(err);
    }
});

