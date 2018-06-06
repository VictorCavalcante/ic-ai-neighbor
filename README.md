
## IA-Neighbor (IC-IA)

O projeto constitui na implementação de um sistema de resolução do **problema de classificação** de um dataset utilizando conceitos e algoritmos de **Machine Learning**.

O sistema trabalha utilizando a **Abordagem de aprendizagem supervisionada** onde o programa aprende com a entrada de dados dada a ele e, em seguida, usa esse aprendizado para classificar novas observações.
Ele foi criado para imitar a capacidade de tomada de decisão de um especialista humano.

## Dataset

O Dataset utilizado é o referente a um conjunto de dados de **avaliação de carros** e constitui num modelo de decisão hierárquica que avalia carros de acordo com suas características.

[Car Evaluation Data Set](https://archive.ics.uci.edu/ml/datasets/Car+Evaluation)

## Algoritmo de classificação
O algoritmo de classificação utilizado é o KNN (K-Nearest Neighbor)

O algoritmo de k vizinhos mais próximos é um algoritmo de classificação que é **supervisionado**, ou seja, ele pega um monte de pontos rotulados e os usa para aprender a rotular outros pontos. 

Para rotular um novo ponto, ele olha para os pontos rotulados mais próximos daquele novo ponto (esses são seus vizinhos mais próximos), e esses vizinhos votam, então qualquer rótulo que a maioria dos vizinhos tenha é o rótulo para o novo ponto.
"K" é o número de vizinhos que ele verifica.


## Teste de precisão do classificador
O sistema possui um suporte para testar o nível de precisão que o classificador vai obter analisando os dados do dataset;

* Treinamos o Classificador usando dados de treinamento (**train_x** e **train_y**)
* Usamos o classificador para prever dados de teste (**test_x**)
* Comparamos previsões obtidas (**res_y**) com resultados reais (**test_y**)

###### Resultados
Ao final da execução é possível ver:

* O tamanho total do dataset de teste
  * Ex: 519
* O número de predições erradas
  * Ex: 112
* Taxa de precisão/sucesso do classificador
  * Ex: 78.42%

## Executando o projeto

##### Pre-requisitos:
Instalar o Node.js via package manager: 

[Install NodeJS](https://nodejs.org/en/download/package-manager)

##### Execução
###### 1. Servidor
Dentro da pasta express-server:
```
npm install
npm start
```
###### 2. Aplicação
Dentro da pasta angular-client:
```
npm install
npm start
```
Depois disto a aplicação estará rodando no host local e porta 4200:
```
http://localhost:4200
```

## Exemplo de execução projeto

![App example](https://i.imgur.com/QmPgKmu.png "App Example")
