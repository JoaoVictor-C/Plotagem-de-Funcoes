// Lista para armazenar os traços do gráfico
let listaDeGraficos = [];
let listaDeFuncoes = [];
let rangeInicial = 0;

let modoTrigonometrico = false;

// Função que irá plotar o gráfico
plotarGrafico = () => {
    modoTrigonometrico = false;
    // Pegando o valor do input
    let funcao = document.getElementById('funcao').value.trim();
        //Caso tenha uma função com mesmo nome, substitui
        if (listaDeFuncoes.includes(funcao) || listaDeFuncoes[0] == '') {
            let index = listaDeFuncoes.indexOf(funcao);
            listaDeFuncoes.splice(index, 1);
            listaDeGraficos.splice(index, 1);
        }
    
        // Adicionando a função à lista
        listaDeFuncoes.push(funcao);
    
    // Criando um vetor de valores de x
    let x = math.range(rangeInicial, 25, 0.008)._data;
    // Criando um vetor de valores de y
    let y = x.map((valor) => {
        try {
            // Avaliando a função para cada valor de x
            return math.evaluate(funcao, { x: valor });
        } catch (error) {
            return undefined;
        }
    });

    // Adicionando um novo traço à lista
    let novoGrafico = {
        x: x,
        y: y,
        type: 'scatter',
        name: funcao
    };
    if (listaDeGraficos.length === 1 && listaDeGraficos[0].y[0] == undefined) {
        listaDeGraficos[0].x = x;
        listaDeGraficos[0].y = y;
    } else {
        listaDeGraficos.push(novoGrafico);
    }
    if (listaDeGraficos.length > 1) {
        if (listaDeFuncoes[0] == '') {
            listaDeFuncoes.shift();
        }
        var title = `Gráfico das funções: ${listaDeFuncoes.join(', ')}`
    } else {
        var title = 'Gráfico da função: ' + funcao;
    }

    let range = 5;
    listaDeGraficos.forEach((grafico) => {
        grafico.x.forEach((valor) => {
            if (valor <= 5) {
                range = grafico.y[grafico.x.indexOf(valor)];
            }
        });
    });
    console.log(range);
    if (range > 5) {
        if (range >= 50) {
            range = 100;
        }
        else if (range > 25) {
            range = 50;
        } else if (range > 10) {
            range = 25;
        } else {
            range = 10;
        }
    } else {
        range = 5; 
    }
    
    // Configurações do gráfico
    let layout = {
        title: title,
        xaxis: {
            title: 'Eixo x',
            tickmode: 'array',
            tickvals: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            tickfont: {
                family: 'Roboto, sans-serif', 
                size: 14,
                color: 'black'
            },
            range: [rangeInicial, 5]
        },
        yaxis: {
            title: 'Eixo y',
            tickfont: {
                family: 'Roboto, sans-serif',
                size: 14,
                color: 'black' 
            },
            range: [0, range]
        },
        legend: {
            text: listaDeFuncoes.join(', '),
            x: 1,
            y: 1,
            traceorder: 'normal',
            font: {
                family: 'Roboto, sans-serif',
                size: 10,
                color: '#000'
            }
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
}

limparGrafico = () => {
    listaDeGraficos = [];
    listaDeFuncoes = [];
    document.getElementById('funcao').value = '';
    plotarGrafico();
}

limparGrafico();

function modoCicloTrigonometrico() {
    modoTrigonometrico = true;
    let funcao = document.getElementById('funcao').value.trim();
    funcao = funcao.replace(/sen/g, 'sin');

    // Verificando se a função é válida
    try {
        math.evaluate(funcao, { x: 0 });
    } catch (error) {
        return;
    }  

    // Se a função já estiver na lista, remove a da lista
    if (listaDeFuncoes.includes(funcao)) {
        let index = listaDeFuncoes.indexOf(funcao);
        listaDeFuncoes.splice(index, 1);
        listaDeGraficos.splice(index, 1);
    }

    // Ao adicionar o primeiro gráfico, o gráfico padrão é deletado
    if (listaDeGraficos.length === 1 && listaDeGraficos[0].y[0] == undefined) {
        listaDeGraficos = [];
    }

    // Adicionando a função à lista
    listaDeFuncoes.push(funcao);

    let x = math.range(-2 * Math.PI, 2 * Math.PI, 0.008)._data;
    let y = x.map((valor) => {
        // Avaliando a função para cada valor de x
        try {
            return math.evaluate(funcao, { x: valor });
        } catch (error) {
            return undefined;
        }
    });
    

    let novoGrafico = {
        x: x,
        y: y,
        type: 'scatter',
        name: funcao
    };
    let layout = {
        title: 'Gráfico do ciclo trigonométrico',
        xaxis: {
            title: 'Eixo x',
            tickmode: 'array',
            tickvals: [-2 * Math.PI, -11 * Math.PI / 6, -7 * Math.PI / 4, -5 * Math.PI / 3, -3 * Math.PI / 2, -4 * Math.PI / 3, -5 * Math.PI / 4, -7 * Math.PI / 6, -Math.PI, -5 * Math.PI / 6, -3 * Math.PI / 4, -2 * Math.PI / 3, -Math.PI / 2, -Math.PI / 3, -Math.PI / 4, -Math.PI / 6, 0,  Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3, 3 * Math.PI / 4, 5 * Math.PI / 6, Math.PI, 7 * Math.PI / 6, 5 * Math.PI / 4, 4 * Math.PI / 3, 3 * Math.PI / 2, 5 * Math.PI / 3, 7 * Math.PI / 4, 11 * Math.PI / 6, 2 * Math.PI],
            ticktext: ['-2π', '-11π/6', '-7π/4', '-5π/3', '-3π/2', '-4π/3', '-5π/4', '-7π/6', '-π', '-5π/6', '-3π/4', '-2π/3', '-π/2', '-π/3', '-π/4', '-π/6', '0', 'π/6', 'π/4', 'π/3', 'π/2', '2π/3', '3π/4', '5π/6', 'π', '7π/6', '5π/4', '4π/3', '3π/2', '5π/3', '7π/4', '11π/6', '2π'],
            tickfont: {
                family: 'Roboto, sans-serif', 
                size: 14,
                color: 'black'
            },
            
            range: [rangeInicial, 2 * Math.PI]
        },
        yaxis: {
            title: 'Eixo y',
            tickfont: {
                family: 'Roboto, sans-serif',
                size: 14,
                color: 'black' 
            }
        },
        legend: {
            text: listaDeFuncoes.join(', '),
            x: 1,
            y: 1,
            traceorder: 'normal',
            font: {
                family: 'Roboto, sans-serif',
                size: 10,
                color: '#000'
            },
        },
        margin: {
            l: 40,
            r: 40,
            b: 40,
            t: 40
        },

    };

    listaDeGraficos.push(novoGrafico);
    Plotly.newPlot('grafico', listaDeGraficos, layout, { responsive: true, scrollZoom: true, staticPlot: true });
}

alterarVisibilidade = () => {
    if (rangeInicial != 0) {
        rangeInicial = 0;
        if (modoTrigonometrico) {
            modoCicloTrigonometrico();
        } else {
            plotarGrafico();
        }
    } else {
        if (modoTrigonometrico) {
            rangeInicial = -2 * Math.PI;
            modoCicloTrigonometrico();
        } else {
            rangeInicial = -5;
            plotarGrafico();
        }
    }
    
}