import { useState, useEffect, useCallback } from 'react';
import './css/App.css';
import Header from './component/Header';
import Choice from './component/Choice';

type ChoiceType = {
  name: string;
  data: number;
  isCorrectAwnser: boolean;
};

type Choices = Array<ChoiceType>;

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [firstChoice, setFirstChoice] = useState<ChoiceType>();
  const [secondChoice, setSecondChoice] = useState<ChoiceType>();

  const startingAwnser = 'Choose an anwser';
  const [userAwnser, setUserAwnser] = useState<string>(startingAwnser);

  const [firstChoiceData, setFirstChoiceData] = useState<number>(-1);
  const [secondChoiceData, setSecondChoiceData] = useState<number>(-1);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = useCallback(async () => {
    const choices: Choices = await fetch(`${API_URL}/game/continue?choiceType=townFR`)
      .then(response => response.json())
      .catch(console.error);

    setFirstChoiceData(choices[0].data);
    setSecondChoiceData(choices[1].data);
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

  function handleClick(isUserAwnserCorrect: boolean) {
    if (userAwnser !== startingAwnser) return; // user albready anwsered

    if (isUserAwnserCorrect) setUserAwnser('Correct ✅')
    else setUserAwnser('Wrong ❌')

    if (firstChoice && firstChoiceData !== null) {
      firstChoice.data = firstChoiceData;
      setFirstChoice(firstChoice);
    }

    if (secondChoice && secondChoiceData !== null) {
      secondChoice.data = secondChoiceData;
      setSecondChoice(secondChoice);
    }
  }

  if (loading) return <div>Loading data.</div>;
  if (!firstChoice || !secondChoice) return <div>Error loading data.</div>;

  return (
    <div className='main'>
      <Header userAwnser={userAwnser} handleNext={fetchData} />

      <div className='choicesContainer'>
        <Choice
          name={firstChoice.name}
          data={firstChoice.data}
          isCorrectAwnser={firstChoice.isCorrectAwnser}
          handleClick={handleClick}
        />

        <Choice
          name={secondChoice.name}
          data={secondChoice.data}
          isCorrectAwnser={secondChoice.isCorrectAwnser}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default App;
