import app from "./src/app.js";

const PORT = process.env.PORT || 3000; // Usa porta do .env ou padrão 3000

// Inicia o servidor e exibe mensagem de confirmação
app.listen(PORT, () => {
    console.log(`Servidor ativo na porta ${PORT}.`);
});
