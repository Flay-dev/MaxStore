const produtos = [
  { id: 1, nome: "iPhone 15 Pro", categoria: "smartphones", preco: 7999, precoOriginal: 8999, imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400", descricao: "Smartphone Apple com câmera avançada" },
  { id: 2, nome: "MacBook Air M2", categoria: "laptops", preco: 8999, precoOriginal: 10999, imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", descricao: "Notebook Apple ultrafino e potente" },
  { id: 3, nome: "AirPods Pro", categoria: "headphones", preco: 1899, precoOriginal: 2299, imagem: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400", descricao: "Fones sem fio com cancelamento de ruído" },
  { id: 4, nome: "Samsung Galaxy S24", categoria: "smartphones", preco: 5499, precoOriginal: 6299, imagem: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", descricao: "Smartphone Samsung com tela AMOLED" },
  { id: 5, nome: "Apple Watch Series 9", categoria: "smartwatch", preco: 3299, precoOriginal: 3799, imagem: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400", descricao: "Relógio inteligente com monitoramento" },
  { id: 6, nome: "Teclado Mecânico", categoria: "accessories", preco: 499, imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", descricao: "Teclado mecânico RGB para gamers" },
  { id: 7, nome: "Sony WH-1000XM5", categoria: "headphones", preco: 2499, precoOriginal: 2999, imagem: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400", descricao: "Fone com cancelamento de ruído" },
  { id: 8, nome: "Dell XPS 13", categoria: "laptops", preco: 7999, imagem: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400", descricao: "Notebook Windows premium" }
];

const containerProdutos = document.querySelector(".produtos-container");
const inputPesquisa = document.querySelector(".input-pesquisa");
const todosBotoes = document.querySelectorAll(".botao-categorias");

let textoInput = "";
let categoria = "todos";

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

function htmlPreco(prd) {
  const precoAtual = `<span class="preco-atual">R$ ${formatarPreco(prd.preco)}</span>`;
  if (prd.precoOriginal) {
    const precoAntigo = `<span class="preco-original" style="text-decoration: line-through; opacity:.7; margin-right:.5rem;">R$ ${formatarPreco(prd.precoOriginal)}</span>`;
    return `${precoAntigo}${precoAtual}`;
  }
  return precoAtual;
}

function montarCard(prd) {
  return `
    <div class="card-produto">
      <img src="${prd.imagem}" alt="${prd.nome}" class="imagen-produto" />
      <div class="info-produtos">
        <h3 class="nome-produto">${prd.nome}</h3>
        <p class="descricao-produto">${prd.descricao}</p>
        <p class="preco-produto">${htmlPreco(prd)}</p>
        <button class="btn-produto">Ver detalhes</button>
      </div>
    </div>
  `;
}

function mostrarProdutos() {
  const termo = textoInput.toLowerCase();
  const filtrados = produtos.filter(prd =>
    (prd.nome.toLowerCase().includes(termo) || prd.descricao.toLowerCase().includes(termo)) &&
    (categoria === "todos" || prd.categoria === categoria)
  );

  containerProdutos.innerHTML = filtrados.length
    ? filtrados.map(montarCard).join("")
    : '<div class="empty"><p>Nenhum produto encontrado.</p></div>';
}

inputPesquisa.addEventListener("input", () => {
  textoInput = inputPesquisa.value;
  mostrarProdutos();
});

todosBotoes.forEach(botao => {
  botao.addEventListener("click", () => {
    categoria = botao.dataset.categoria;
    todosBotoes.forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    mostrarProdutos();
  });
});

mostrarProdutos();
