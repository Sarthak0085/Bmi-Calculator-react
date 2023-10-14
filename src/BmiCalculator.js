import React, { useState } from "react";


function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [result, setResult] = useState("");
  const [resultCategory,setResultCategory] = useState("");
  const [chartData, setChartData] = useState({});

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightUnitChange = (event) => {
    setWeightUnit(event.target.value);
  };

  const handleHeightUnitChange = (event) => {
    setHeightUnit(event.target.value);
  };

  const calculateBmi = (event) => {
    event.preventDefault();

    let weightInKg = weight;
    if (weightUnit === "lb") {
      weightInKg = weight * 0.45359237;
    } else if (weightUnit === "st") {
      weightInKg = (weight * 14 * 0.45359237) + ((height / 12) * 0.45359237);
    }

    let heightInM = height/100;
    if (heightUnit === "in") {
      heightInM = height * 0.0254;
    } else if (heightUnit === "ft") {
      heightInM = (height * 12 * 0.0254) + (weightInKg / 100);
    }

    const bmi = weightInKg / (heightInM * heightInM);
    setResult(bmi.toFixed(2));
 
    //Define the chart data
    setChartData({
      labels : ["BMI"],
      datasets : [
        {
          label: "BMI",
          backgroundColor : "rgba(75,192,192,0.4)",
          borderColor : "rgba(75,192,192,1)",
          borderWidth : 1,
          hoverBackgroundColor : "rgba(75,192,192,0.6)",
          hoverBorderColor : "rgba(75,192,192,1)",
          data : [bmi.toFixed(2)]
        }
      ]
    });

    //determine the bmi category
    if(bmi< 18.5){
      setResultCategory("Underweight");
    }
    else if(bmi >= 18.5 && bmi < 25){
      setResultCategory("Normal Weight");
    }
    else if(bmi >= 25 && bmi <30){
      setResultCategory("Overweight");
    }
    else if(bmi >= 30 && bmi < 35){
      setResultCategory("Obese (class I)");
    }
    else if(bmi >= 35 && bmi < 40){
      setResultCategory("Obese (class II)");
    }
    else {
      setResultCategory("Obese (class III)");
    }
  };

  return (
    <div>
      <h1>BMI Calculator</h1>
      <form onSubmit={calculateBmi}>
        <label>
          Weight:
          <input type="number" value={weight} onChange={handleWeightChange} />
          <select value={weightUnit} onChange={handleWeightUnitChange}>
            <option value="kg">kg</option>
            <option value="lb">lb</option>
            <option value="st">st</option>
          </select>
        </label>
        <br />
        <label>
          Height:
          <input type="number" value={height} onChange={handleHeightChange} />
          <select value={heightUnit} onChange={handleHeightUnitChange}>
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="ft">ft</option>
          </select>
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div>
          <h2>Result</h2>
          <h2>Your BMI is: {result}</h2>
          <h3>Your BMI category is : {resultCategory}</h3>
        </div> 
      )}
    </div>
  );
}

export default BmiCalculator;