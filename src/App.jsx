import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let operationValues = ["+", "-", "*", "/"]

  const [value, setValue] = useState(String())

  return (
    <>
      <h1>Calculator App</h1>
      <p>{value}</p>
      <div className="card">
        <button onClick={() => setValue((value) => value + String(7))}>7</button>
        <button onClick={() => setValue((value) => value + String(8))}>8</button>
        <button onClick={() => setValue((value) => value + String(9))}>9</button>
        <button onClick={() => setValue((value) => value + "+")}>+</button>
        <button onClick={() => setValue((value) => value + "*")}>*</button>
      </div>
      <div className="card">
        <button onClick={() => setValue((value) => value + String(4))}>4</button>
        <button onClick={() => setValue((value) => value + String(5))}>5</button>
        <button onClick={() => setValue((value) => value + String(6))}>6</button>
        <button onClick={() => setValue((value) => value + "-")}>-</button>
      </div>
      <div className="card">
        <button onClick={() => setValue((value) => value + String(1))}>1</button>
        <button onClick={() => setValue((value) => value + String(2))}>2</button>
        <button onClick={() => setValue((value) => value + String(3))}>3</button>
        <button onClick={()=>
        {
          let answer = value

          function addFunction(left, right){
            let result = parseInt(left) + parseInt(right)
            answer = answer.replace(left+"+"+right, result)

            console.log("Result: " + left + "+"+ right + " = " + result)
            console.log("Answer: " + answer)
          }

          function subtractFunction(left, right){
            let result = parseInt(left) - parseInt(right)
            answer = answer.replace(left+"-"+right, result)

            console.log("Result: " + left + "-"+ right + " = " + result)
            console.log("Answer: " + answer)
          }

          function multiplyFunction(left, right){
            let result = parseInt(left) * parseInt(right)              
            answer = answer.replace(left+"*"+right, result)

            console.log("Result: " + left + "*"+ right + " = " + result)
            console.log("Answer: " + answer)
          }
          
          function calculate(operation, operationFunction){
            //operation: operation value in string like "+", "-", etc.
            //operationFunction: function that does the operation

            while(answer.includes(operation)){
              //get index of operation, skip the first negative sign
              let index = answer.indexOf(operation)
              if(answer.at(0) == "-"){
                index = answer.indexOf(operation, 1)
                if(index == -1){
                  break
                }
              }
              let leftIndex = 0
              let rightIndex = answer.length - 1

              //locate left side of operation
              for(let i = index - 1; i >= 0; i--){
                //store left side index
                if(operationValues.includes(answer.at(i))){
                  //Consider negatives
                  if(answer.at(i) == "-"){
                    leftIndex = i
                  }
                  else{
                    leftIndex = i+1
                  }
                  break
                }
              }
              //locate right side of +
              //TODO: consider negatives
              for(let i = index + 1; i < answer.length; i++){
                //store right side index
                if(operationValues.includes(answer.at(i)) && answer.at(i) != "-"){
                  //TODO: Consider negatives
                  rightIndex = i - 1
                  break
                }
              }
              
              console.log("Index: " + leftIndex + ", " + index + ", " + rightIndex)

              //Detect incorrect input
              if(leftIndex == index || rightIndex == index || index == -1){
                answer = "Error"
                break
              }

              else{
                let left = answer.substring(leftIndex, index)
                let right = answer.substring(index + 1, rightIndex + 1)

                operationFunction(left, right)
              }
            }
          }
          
          answer.replaceAll("--", "+")
          calculate("*", multiplyFunction)
          calculate("+", addFunction)
          calculate("-", subtractFunction)
          
          
          setValue((value) => value + "=" + answer)
        }

        


        }>=</button>
      </div>
    </>
  )
}

export default App
