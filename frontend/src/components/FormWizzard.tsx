

import React, { useState, createContext, useContext, useEffect } from 'react';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import Spinner from './Spinner';
import { setLoading } from '../redux/slices/formSlice';
import Button from './ui/button/Button';
import { electron } from 'process';


const WizardContext = createContext()

export const useWizzar = () => {

  return useContext(WizardContext)
}

const FormWizardProvider = ({ children }) => {
  const [currentStep, setStep] = useState(1);
  const [canNext, setCanNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nextLabel, setNextLabel] = useState("siguiente");
  const totalSteps = React.Children.count(children);
  const [onNextHandler, setOnNextHandler] = useState(() => async () => true); // middleware por defecto
  const [onFinishHandler, setOnFinishHandler] = useState(() => async () => true); // middleware por defecto

  /* 
      useEffect(() => {
        
      
        return () => {
          
        }
      }, [currentStep]) */


  const registerOnNext = (fn) => {
    setOnNextHandler(() => fn); // almacenamos la nueva función
  };


  const registerOnFinish = (fn) => {
    setOnFinishHandler(() => fn); // almacenamos la nueva función
  };



  const disableNext = () => {
    setCanNext(false)
  };
  const enableNext = () => {
    setCanNext(true)
  };


  const nextStep = async () => {



    /* const childrenArray = React.Children.toArray(children)

    const currentChildren = childrenArray[currentStep-1]

    if(React.isValidElement(currentChildren)){
        const onNext = currentChild.props?.onNext;

    } */
    const result = await onNextHandler?.();

    if (result === false) {

      return
    }
    // console.log(result)



    if (currentStep < totalSteps) {

      setStep(currentStep + 1);
    }

    if (currentStep < totalSteps) {

      setStep(currentStep + 1);

    }


  };

  const prevStep = () => {
    if (currentStep > 1) setStep(currentStep - 1);
  };

  const progressWidth = (currentStep / totalSteps) * 100;

  return (<WizardContext.Provider value={{
    currentStep,
    nextStep,
    prevStep,
    disableNext,
    enableNext,
    setNextLabel,
    registerOnNext,
    setIsLoading,
    registerOnFinish


  }}>
    <div className="max-w-xl mx-auto mt-2 p-6  rounded-lg">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-10">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      {React.Children.map(children, (child, index) => {
        // Solo modifica elementos válidos
        //  console.log((index+1),currentStep)
        if ((index + 1) === currentStep) {
          //    console.log(index)
          return React.cloneElement(child, {
            step: index + 1
          });
        }

      })}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-10">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded ${currentStep === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Atrás
        </button>
        {currentStep < totalSteps ? (
          <Button
            disabled={!canNext}
            onClick={async (e) => {
              if (canNext) await nextStep()
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isLoading ? (
              <Spinner></Spinner>
            ) : "siguiente"}
          </Button>
        ) : (
          <Button
            variant='success'
            onClick={async (e) => {
              const result = await onFinishHandler?.();


            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isLoading ? (
              <Spinner></Spinner>
            ) : "finalizar"}
          </Button>
        )}
      </div>
    </div>
  </WizardContext.Provider>
  );
};






export default FormWizardProvider;





