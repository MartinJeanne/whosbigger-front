import { useState, useEffect } from 'react';
import './App.css';
import Choice from './Choice';

type Choices = {
  name: string;
  data: number;
  isCorrectAwnser: boolean;
  handleClick: (isUserAwnserCorrect: boolean) => void;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [firstChoice, setFirstChoice] = useState<Choices>();
  const [secondChoice, setSecondChoice] = useState<Choices>();

  useEffect(() => {
    const fetchData = async () => {
      const choices = await fetch('http://localhost:3001/game/continue?choiceType=townFR')
        .then(response => response.json())
        .catch(console.error);

      setFirstChoice(choices[0]);
      setSecondChoice(choices[1]);
      setLoading(false);
    }

    fetchData();
  }, []);

  function handleClick(isUserAwnserCorrect: boolean) {
    if (isUserAwnserCorrect) console.log('handleClick true')
    else console.log('handleClick false')

  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!firstChoice || !secondChoice) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className='main'>
      <div className='questionContainer'>
        <div>Who's bigger?</div>
      </div>

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
