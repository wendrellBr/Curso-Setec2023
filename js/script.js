
// navbarr
const navbarr = document.getElementById('navbar');
let scrolled = false;
window.onscroll = () => {
  if (window.scrollY > 100) { // scrollY Se refere a altura da página 
    if (!scrolled) { // não falso
      navbarr.classList.add('scrolled'); // adicionamos pela propriedade classlist a classe 'scrolled'
      scrolled = true;
    }
  } else if (scrolled) { // Se nao for mais que 100 e se scrolled for verdadeiro
    navbarr.classList.remove('scrolled'); // removemos a classe presente
    scrolled = false; // e reatribuimos scrolled como falso
  }
}

const themeToggle = document.getElementById('theme-toggle'); //pegando o botao pelo id
themeToggle.addEventListener('click', () => { //adicionando um evento de click ao mesmo pelo metodo addEventListener

  // Alterar o tema
  const currentTheme = document.documentElement.getAttribute('data-theme'); //atribuindo no corpo do html o atribudo data-theme
  const newTheme = currentTheme === 'escuro' ? 'claro' : 'escuro'; //fazendo por meio do if ternario a troca de temas
  // condição ?(é verdadeira?) se sim: claro :(senao) escuro
  document.documentElement.setAttribute('data-theme', newTheme); //reatribuindo por meio do set a mudanca de elemento no documento


  // Trocar a imagem do tema chamando a funcao responsavel por isso
  otherImgTheme();

});

//funcao que deixa padrao o tema claro primeiro
function setDefaultTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (!currentTheme) { // verificando a existencia do data-theme
    document.documentElement.setAttribute('data-theme', 'claro'); // 'claro' é o tema padrão, você pode alterar para 'escuro' se preferir
    const imgThemeElement = document.getElementById("img-theme");
    const dayTheme = document.getElementById("img-theme-day");
    imgThemeElement.src = dayTheme.src; // pegando diretamente o arquivo e mudando
  }
}
//chamando a funcao para ser executada 
setDefaultTheme();

function otherImgTheme() {
  const imgThemeElement = document.getElementById("img-theme"); // pegando pelo id o elemento foto
  const currentTheme = document.documentElement.getAttribute('data-theme'); // atribuindo o elemento data
  const nightTheme = document.getElementById("img-theme-night"); //buscando a foto da lua
  const dayTheme = document.getElementById("img-theme-day");//buscando a foto do sol

  if (currentTheme === "escuro") { // se for igual a escuro(tema da lya)
    imgThemeElement.src = nightTheme.src; // trocaremos a imagem que estiver atual pela imagem da lua
  }
  if (currentTheme === "claro") {
    imgThemeElement.src = dayTheme.src;
  }

}







function TestaCPF(strCPF) {
  let Soma = 0;
  let Resto;

  //tirando os pontos e o traço e atribuindo a uma variavel
  let strCPFClear = deMaskCPF(strCPF);

  for (let i = 0; i < 9; i++) { //for para pegara posição do numero
    //atribuindo soma a soma
    Soma += parseInt((strCPFClear.charAt(i))) * (10 - i); // .charAt pega o caracter do indice especificado e começar pelo indice 0
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
      Resto = 0;
    }

    if (Resto !== parseInt(strCPFClear.charAt(9))) {
      return false; // pegando diretamente o digito verificador primeiro
    }

    Soma = 0;

    // Verificando o segundo dígito

    for (let i = 0; i < 10; i++) {  //for para pegara posição do numero
      Soma += parseInt(strCPFClear.charAt(i)) * (11 - i); // Corrigido o comentário para "de 10 até 2"
    }

    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
      Resto = 0;
    }

    if (Resto !== parseInt(strCPFClear.charAt(10))) {
      return false; // Se a verificação falhar, retorne false imediatamente
    }

    return true;
  }
  //inicio do formulario
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const cpfInput = document.querySelector("#cpf");
  const submitButton = document.querySelector("#send");
  const message = document.querySelector(".msg");

  //BOTAO PARA
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    //pegando os valores passados para os elementos
    let nameValue = nameInput.value;
    let emailValue = emailInput.value;
    let cpfValue = cpfInput.value;


    var resultado = TestaCPF(cpfValue); // passando a funcao testacpf como valor, sendo que ela recebera o cpf da pessoa
    if (resultado === true) {
      message.textContent = "Cadastrado com Sucesso!"
      message.classList = "acerto";

      //tempo na tela
      setTimeout(() => {
        message.textContent = "";
        message.classList = "";
      }, 10000);

    } else {
      message.textContent = "CPF Inválido! Por favor, insira um cpf válido!.";
      message.classList = "error"; //busca na classe error

      //tempo para a faixa error ficar em tela
      setTimeout(() => {
        message.textContent = "";
        message.classList = "";
        //deixando vazio o cpf
        cpfInput.value = "";
      }, 12000);
    }

    ///tratamento de erro
    if (nameValue === "" || emailValue === "" || cpfValue === "") {
      message.textContent = "Por favor, preencha todos os campos!";
      message.classList = "error"; //busca na classe error

      //tempo para a faixa error ficar em tela
      setTimeout(() => {
        message.textContent = "";
        message.classList = "";
      }, 5000);
      return; //sai da função
    }

    //limpa todos os campos no final
    nameInput.value = "";
    emailInput.value = "";
    cpfInput.value = "";
  });
}

//colocando . e - conforme as especificações
function maskCPF() {
  let strCPF = cpfInput.value;
  if (strCPF.length == 3 || strCPF.length == 7) cpfInput.value += ".";
  if (strCPF.length == 11) cpfInput.value += "-";
}
//retirando tudo que n seja apenas digitos
function deMaskCPF(cpf) {
  return cpf.replace(/\D/g, '');
}

// Toda vez que começar a ser inserido conteudo no cpf
cpfInput.addEventListener("input", function () {
  maskCPF();
});