// Lista para armazenar os traços do gráfico
let listaDeGraficos = [];
let listaDeFuncoes = [];
let rangeInicial = 0;

// Função que irá plotar o gráfico
plotarGrafico = () => {
    // Pegando o valor do input
    let funcao = document.getElementById('funcao').value.trim();
    funcao = funcao.replace(/sen/g, 'sin');

    // Verificando se a função é válida
    try {
        math.evaluate(funcao, { x: 0 });
    } catch (error) {
        return;
    }   

    // Se a função já estiver na lista, não faz nada
    if (listaDeFuncoes.includes(funcao)) {
        return;
    }
    // Adicionando a função à lista
    listaDeFuncoes.push(funcao); 
    
    // Criando um vetor de valores de x
    let x = math.range(-10, 10, 0.005)._data;
    // Criando um vetor de valores de y
    let y = x.map((valor) => {
        // Avaliando a função para cada valor de x
        try {
            return math.evaluate(funcao, { x: valor });
        } catch (error) {
            return undefined;
        }
    });

    // Adicionando um novo traço à lista
    let novoGrafico = {
        x: x,
        y: y,
        type: 'scatter'
    };
    if (listaDeGraficos.length === 1 && listaDeGraficos[0].y[0] == undefined) {
        listaDeGraficos[0].x = x;
        listaDeGraficos[0].y = y;
    } else {
        listaDeGraficos.push(novoGrafico);
    }
    if (listaDeGraficos.length > 1) {
        console.log(listaDeFuncoes)
        if (listaDeFuncoes[0] == '') {
            listaDeFuncoes.shift();
        }
        var title = `Gráfico das funções: ${listaDeFuncoes.join(', ')}`
    } else {
        var title = 'Gráfico da função: ' + funcao;
    }
    
    // Configurações do gráfico
    let layout = {
        title: title,
        xaxis: {
            title: 'Eixo x'
        },
        yaxis: {
            title: 'Eixo y'
        },
        margin: {
            l: 40,
            r: 40,
            b: 40,
            t: 40
        },
    };

    // Plotando o gráfico com todos os traços da lista
    Plotly.newPlot('grafico', listaDeGraficos, layout, { responsive: true, scrollZoom: true });
    document.getElementById('funcao').value = '';
}

limparGrafico = () => {
    listaDeGraficos = [];
    listaDeFuncoes = [];
    document.getElementById('funcao').value = '';
    plotarGrafico();
}

limparGrafico();

function modoCicloTrigonometrico() {
    console.log(`Range inicial 1: ${rangeInicial}`);
    let funcao = document.getElementById('funcao').value.trim();
    funcao = funcao.replace(/sen/g, 'sin');

    // Verificando se a função é válida
    try {
        math.evaluate(funcao, { x: 0 });
    } catch (error) {
        return;
    }  
    console.log(`Range inicial 2: ${rangeInicial}`);

    // Se a função já estiver na lista, remove a da lista
    if (listaDeFuncoes.includes(funcao)) {
        listaDeFuncoes.splice(listaDeFuncoes.indexOf(funcao), 1);
        listaDeGraficos.splice(listaDeFuncoes.indexOf(funcao), 1);
    }
    // Adicionando a função à lista
    listaDeFuncoes.push(funcao);

    let x = math.range(-2 * Math.PI, 2 * Math.PI, 0.0001)._data;
    let y = x.map((valor) => {
        // Avaliando a função para cada valor de x
        try {
            return math.evaluate(funcao, { x: valor });
        } catch (error) {
            return undefined;
        }
    });
    console.log(`Range inicial 3: ${rangeInicial}`);

    

    let novoGrafico = {
        x: x,
        y: y,
        type: 'scatter'
    };
    console.log(`Range inicial 2: ${rangeInicial}`);
    let layout = {
        title: 'Gráfico do ciclo trigonométrico',
        xaxis: {
            title: 'Eixo x',
            tickmode: 'array',
            tickvals: [-2 * Math.PI, -11 * Math.PI / 6, -7 * Math.PI / 4, -5 * Math.PI / 3, -3 * Math.PI / 2, -4 * Math.PI / 3, -5 * Math.PI / 4, -7 * Math.PI / 6, -Math.PI, -5 * Math.PI / 6, -3 * Math.PI / 4, -2 * Math.PI / 3, -Math.PI / 2, -Math.PI / 3, -Math.PI / 4, -Math.PI / 6, 0,  Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3, 3 * Math.PI / 4, 5 * Math.PI / 6, Math.PI, 7 * Math.PI / 6, 5 * Math.PI / 4, 4 * Math.PI / 3, 3 * Math.PI / 2, 5 * Math.PI / 3, 7 * Math.PI / 4, 11 * Math.PI / 6, 2 * Math.PI],
            ticktext: ['-2π', '-11π/6', '-7π/4', '-5π/3', '-3π/2', '-4π/3', '-5π/4', '-7π/6', '-π', '-5π/6', '-3π/4', '-2π/3', '-π/2', '-π/3', '-π/4', '-π/6', '0', 'π/6', 'π/4', 'π/3', 'π/2', '2π/3', '3π/4', '5π/6', 'π', '7π/6', '5π/4', '4π/3', '3π/2', '5π/3', '7π/4', '11π/6', '2π'],
            tickfont: {
                family: 'Roboto, sans-serif', 
                size: 13,
                color: 'black'
            },
            
            range: [rangeInicial, 2 * Math.PI]
        },
        yaxis: {
            title: 'Eixo y',
            tickfont: {
                family: 'Roboto, sans-serif',
                size: 13,
                color: 'black' 
            }
        },
        
            

    };

    listaDeGraficos.push(novoGrafico);
    Plotly.newPlot('grafico', listaDeGraficos, layout, { responsive: true, scrollZoom: true });
}

alterarVisibilidade = () => {
    if (rangeInicial == -2 * Math.PI) {
        rangeInicial = 0;
    }
    else if (rangeInicial == 0) {
        rangeInicial = -2 * Math.PI;
    }
    console.log(rangeInicial);
    modoCicloTrigonometrico();
}