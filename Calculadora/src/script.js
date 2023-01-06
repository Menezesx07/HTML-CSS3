/* Agradecimentos ao Matheus Battisti */

const previousOperationText = document.querySelector('#previoues-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')
//all para selecionar todos os botões do container

class Calculator {
    //clonando o objeto para não precisar acessar o dom diretamente
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""


    }

    //chamando a função da troca do digito do display
    addDigit(digit) {
        
        //vendo se a operação tem um ponto
        //includes para ver se o que está sendo passado como parametro, tem na variavel
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    //processando as operações da calculadora
    processOperation(operation) { //operation vem do if else para saber se é digito ou caracter (lá em baixo)
        
    //checkar se o current está vazio
     if(currentOperationText.innerText === "" && operation !== "C") { //!= C para não bugar no case do C
        if(this.previousOperationText.innerText !== "") {
            //se a calculadora iniciar vazia, não da pra setar a operação
            this.changeOperation(operation);
        }
        return;
     }
        
    //pegando o valor atual e anterior
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0]; //tem de tá um espaço no parametro
    let current = +this.currentOperationText.innerText

    switch(operation) {
        case "+": 
            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous) //updateScreen()
            break;

        case "-": 
            operationValue = previous - current
            this.updateScreen(operationValue, operation, current, previous) //updateScreen()
            break;

        case "/": 
            operationValue = previous / current
            this.updateScreen(operationValue, operation, current, previous) //updateScreen()
            break;
            
        case "*": 
            operationValue = previous * current
            this.updateScreen(operationValue, operation, current, previous) //updateScreen()
            break;

        case "DEL":
            this.processDelOperator()
            break;

        case "CE":
            this.processClearCurrentOperation() 
            break;

        case "C":
            this.processClearAll()
            break;
        
        case "=":
            this.processEqualOperator();

        default:
            break;
    }

    }

    //fazendo a trocar do numero do display
    updateScreen(operationValue = null,
         operation = null, //vem do valor passado como parametro da processOperation()
          current = null, 
          previous = null) {

        if(operationValue ===null ) {
        // so vai concatenar o digito anterior se a operação for nula
        this.currentOperationText.innerText += this.currentOperation;
        } else {
            //checkar se o valor é zero, se for, ele vai ser o valor corrente (zero é o valor default   )
            if(previous === 0) {
                operationValue = current
            }

            //adicionando o valor e a operação para o previous do display
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
        
    }
    
    //mudar a operação matematica
    changeOperation(operation) { //função que vai ser chamada no processsOperation

        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return
        }

        //fazendo a troca da operação caso já estiver sido feita uma antes (2*3+2)
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //apagando o ultimo digito (tá la no case DEL)
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //apagar a operação atual (lá no caso)
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processClearAll() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //sinal de igual
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation)
    }

}

    

//criando um objeto com as propriedades do constructor para ser usado fora da classe
const calc = new Calculator(previousOperationText, currentOperationText);


//para cada botão do buttons lá em cima, ele vai colocar essa função abaixo
buttons.forEach ((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText; //capturando o texto do botão, 
                                          //e jogando numa variavel

                                        
        // + tem a mesma funcão que o parseInt
        if(+value >= 0 || value === ".") {
            calc.addDigit(value) //calc vem do objeto criado logo acima dessa função do forEach
        } else {
            calc.processOperation(value) //calc vem do objeto criado logo acima dessa função do forEach
        } 

    }) 
})