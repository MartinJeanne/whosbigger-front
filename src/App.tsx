import { useState, useRef, useEffect, useCallback } from 'react';
import './css/App.css';
import Header from './component/Header';
import Choice from './component/Choice';

type ChoiceType = {
  name: string;
  data: number;
  metadata: any;
  isCorrectAwnser: boolean;
};

type Choices = Array<ChoiceType>;

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [firstChoice, setFirstChoice] = useState<ChoiceType>();
  const [secondChoice, setSecondChoice] = useState<ChoiceType>();

  const startingAwnser = 'Choose an anwser';
  const [userAwnser, setUserAwnser] = useState<string>(startingAwnser);

  const firstChoiceData = useRef<number>(-1);
  const secondChoiceData = useRef<number>(-1);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = useCallback(async () => {
    const choices: Choices = await fetch(`${API_URL}/game/continue?choiceType=townFR`)
      .then(response => response.json())
      .catch(console.error);

    firstChoiceData.current = choices[0].data;
    secondChoiceData.current = choices[1].data;

    choices[0].data = -1;
    choices[1].data = -1;

    setFirstChoice(choices[0]);
    setSecondChoice(choices[1]);
    setUserAwnser(startingAwnser);
    setLoading(false);
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData, API_URL]);

  if (loading) return <div>Loading data...</div>;
  if (!firstChoice || !secondChoice) return <div>Error loading data</div>;

  function handleClick(isUserAwnserCorrect: boolean) {
    if (userAwnser !== startingAwnser) return; // user albready anwsered

    if (isUserAwnserCorrect) setUserAwnser('Correct ✅')
    else setUserAwnser('Wrong ❌')

    if (firstChoice && firstChoiceData.current !== null) {
      firstChoice.data = firstChoiceData.current;
      setFirstChoice(firstChoice);
    }

    if (secondChoice && secondChoiceData.current !== null) {
      secondChoice.data = secondChoiceData.current;
      setSecondChoice(secondChoice);
    }
  }

  function handleLoose() {
    console.log('You loose!');

  }

  return (
    <div className='main'>
      <Header userAwnser={userAwnser} handleNext={fetchData} handleLoose={handleLoose} />

      <div className='choicesContainer'>
        <Choice
          name={firstChoice.name}
          data={firstChoice.data}
          metadata={firstChoice.metadata}
          isCorrectAwnser={firstChoice.isCorrectAwnser}
          handleClick={handleClick}
        />

        <Choice
          name={secondChoice.name}
          data={secondChoice.data}
          metadata={secondChoice.metadata}
          isCorrectAwnser={secondChoice.isCorrectAwnser}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default App;
