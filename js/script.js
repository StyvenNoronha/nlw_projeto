const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format("DD"),
      semana: {
        curto: dayjs(data).format("ddd"),
        longo: dayjs(data).format("dddd"),
      },
    },
    mes: dayjs(data).format("MMMM"),
    hora: dayjs(data).format("HH:mm"),
  };
};

const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-09 10:00"),
  finalizada: true,
};

let atividades = [
  atividade,
  {
    nome: "Academia em grupo",
    data: new Date("2024-07-10 11:00"),
    finalizada: false,
  },
  {
    nome: "Academia em grupo 2 ",
    data: new Date("2024-07-10 18:00"),
    finalizada: true,
  },
];

const criarItemAtividade = (atividade) => {
  let input = `<input onchange="concluirAtividade(event)" value="${atividade.data}" type="checkbox"`;

  if (atividade.finalizada) {
    input += " checked";
  }

  input += ">";

  const formatar = formatador(atividade.data);

  return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>${formatar.dia.semana.longo},dia ${formatar.dia.numerico} de ${formatar.mes} às  ${formatar.hora}h</time>
    </div>
    
    `;
};

const atualizarAtividades = () => {
  const section = document.querySelector("section");
  section.innerHTML = ''

  if (atividades.length == 0) {
    section.innerHTML = `<p>nenhuma atividade registrada</p>`;
    return;
  }

  for (let atividade of atividades) {
    section.innerHTML += criarItemAtividade(atividade);
  }
};

atualizarAtividades();

const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)
  
    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`
  
    const novaAtividade = {
      nome,
      data,
      finalizada: false
    }
  
    const atividadeExiste = atividades.find((atividade) => {
      return atividade.data == novaAtividade.data
    })
  
    if (atividadeExiste) {
      return alert('Não foi possivel.')
    }
  
    atividades = [novaAtividade, ...atividades]
    atualizarAtividades()
  }

const criarDiasSelecao = () => {
  const dias = [
    "2024-09-07",
    "2024-09-08",
    "2024-09-09",
    "2024-09-10",
    "2024-09-11",
    "2024-09-12",
    "2024-09-13",
    "2024-09-14",
    "2024-09-15",
  ];

  let diasSelecao = "";

  for (let dia of dias) {
    const formatar = formatador(dia);
    const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`;

    diasSelecao += `<option value="${dia}">${diaFormatado}</option>`;
  }

  document.querySelector('select[name="dia"]').innerHTML = diasSelecao;
};

criarDiasSelecao();

const criarHoraSelecao = () => {
  let horasDisponiveis = "";

  for (let i = 5; i < 23; i++) {
    document.querySelector('select[name="hora"]').innerHTML =
      horasDisponiveis += `<option value="${i}:00">${i}:00</option>`;
    horasDisponiveis += `<option value="${i}:30">${i}:30</option>`;
  }
};
criarHoraSelecao();



const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value
  
    const atividade = atividades.find((atividade) => {
      return atividade.data == dataDesteInput
    })
  
    if(!atividade) {
      return
    }
  
    atividade.finalizada = !atividade.finalizada
  }

