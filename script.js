// Navegação e troca de fundo
function trocarFundoPorId(id) {
  if (id === 'inicio') document.body.style.backgroundImage = "url('fundo.inicio.jpg')";
  else if (id === 'promocoes') document.body.style.backgroundImage = "url('fundo.ofertas.jpg')";
  else if (id === 'contato') document.body.style.backgroundImage = "url('fundo.contato.jpg')";
}

function ativarBotoes() {
  const botoes = document.querySelectorAll('nav button[data-target]');
  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const destino = document.getElementById(botao.dataset.target);
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
        trocarFundoPorId(botao.dataset.target);
        // Se voltar ao início, mostra promoções e oculta tela estoque
        if(botao.dataset.target === 'inicio' || botao.dataset.target === 'promocoes') {
          document.getElementById('promocoes').style.display = 'block';
          document.getElementById('tela-estoque').style.display = 'none';
          // Resetar login estoque
          document.getElementById('login-estoque').style.display = 'block';
          document.getElementById('sistema-estoque').style.display = 'none';
          document.getElementById('usuario').value = '';
          document.getElementById('senha').value = '';
          document.getElementById('erro-login').style.display = 'none';
          document.getElementById('info-produto').style.display = 'none';
          document.getElementById('busca-produto').value = '';
        }
      }
    });
  });
}

// Tela Estoque
const btnEstoque = document.getElementById('btn-estoque');
const telaEstoque = document.getElementById('tela-estoque');
const secPromocoes = document.getElementById('promocoes');

const btnLogin = document.getElementById('btn-login');
const erroLogin = document.getElementById('erro-login');
const sistemaEstoque = document.getElementById('sistema-estoque');
const loginEstoque = document.getElementById('login-estoque');

const usuarioCorreto = 'admin';
const senhaCorreta = '1234';

btnEstoque.onclick = () => {
  telaEstoque.style.display = 'block';
  secPromocoes.style.display = 'none';
  // Reset login sempre que acessar estoque
  loginEstoque.style.display = 'block';
  sistemaEstoque.style.display = 'none';
  document.getElementById('usuario').value = '';
  document.getElementById('senha').value = '';
  document.getElementById('erro-login').style.display = 'none';
  document.getElementById('info-produto').style.display = 'none';
  document.getElementById('busca-produto').value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Login com Enter
document.getElementById('senha').addEventListener('keypress', function(e){
  if(e.key === 'Enter') btnLogin.click();
});
document.getElementById('usuario').addEventListener('keypress', function(e){
  if(e.key === 'Enter') btnLogin.click();
});

btnLogin.onclick = () => {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  if(usuario === usuarioCorreto && senha === senhaCorreta){
    loginEstoque.style.display = 'none';
    sistemaEstoque.style.display = 'block';
    erroLogin.style.display = 'none';
  } else {
    erroLogin.style.display = 'block';
  }
};

// Dados de produtos
const produtos = [
  {codigo:'001', nome:'Banana Prata', quantidade:120, valorCompra:2.00, valorVenda:2.99, vendaDiaria:30, vendaSemanal:200, vendaMensal:800, proximaEntrega:'2025-09-10', fornecedor:'Tropical Fruits Ltda', img:'banana.jpg'},
  {codigo:'002', nome:'Arroz 5kg', quantidade:50, valorCompra:15.50, valorVenda:19.90, vendaDiaria:10, vendaSemanal:70, vendaMensal:300, proximaEntrega:'2025-09-12', fornecedor:'Arroz Bom Preço S.A.', img:'arroz.jpg'},
  {codigo:'003', nome:'Detergente Ypê', quantidade:200, valorCompra:0.90, valorVenda:1.25, vendaDiaria:20, vendaSemanal:140, vendaMensal:600, proximaEntrega:'2025-09-08', fornecedor:'Ypê S.A.', img:'detergente.jpg'},
  {codigo:'004', nome:'Leite Integral 1L', quantidade:80, valorCompra:3.20, valorVenda:4.50, vendaDiaria:25, vendaSemanal:150, vendaMensal:600, proximaEntrega:'2025-09-11', fornecedor:'Leite Bom S.A.', img:'leite.jpg'}
];

// Buscar produto com Enter
const buscaInput = document.getElementById('busca-produto');
const btnBuscar = document.getElementById('btn-buscar');

buscaInput.addEventListener('keypress', function(e){
  if(e.key === 'Enter') btnBuscar.click();
});

btnBuscar.onclick = () => {
  const busca = buscaInput.value.toLowerCase();
  const produto = produtos.find(p => p.codigo === busca || p.nome.toLowerCase().includes(busca));
  if(produto){
    document.getElementById('info-produto').style.display = 'block';
    document.getElementById('img-produto').src = produto.img;
    document.getElementById('codigo-produto').innerText = produto.codigo;
    document.getElementById('nome-produto').innerText = produto.nome;
    document.getElementById('quantidade-produto').innerText = produto.quantidade;
    document.getElementById('valor-compra').innerText = produto.valorCompra.toFixed(2);
    document.getElementById('valor-venda').innerText = produto.valorVenda.toFixed(2);
    document.getElementById('venda-diaria').innerText = produto.vendaDiaria;
    document.getElementById('venda-semanal').innerText = produto.vendaSemanal;
    document.getElementById('venda-mensal').innerText = produto.vendaMensal;
    document.getElementById('proxima-entrega').innerText = produto.proximaEntrega;
    document.getElementById('fornecedor').innerText = produto.fornecedor;
  } else {
    alert('Produto não encontrado!');
  }
};

window.addEventListener('load', ativarBotoes);
