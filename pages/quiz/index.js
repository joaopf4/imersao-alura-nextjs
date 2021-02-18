/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import LoadingWidget from '../../src/components/LoadingWidget';

const ResultMessage = {
  INITIAL: ['Calculando...', 'https://media.giphy.com/media/3o6ozymuzrBpskGS88/giphy.gif'],
  FAIL: ['É, numa cicloviagem tu ia pegar rabo, rsrs', 'https://media.giphy.com/media/MuI3ZwofXpd1ykijzE/giphy.gif'],
  NOTBAD: ['Ó, num rolê de galera tu já consegue entrosar!', 'https://media.giphy.com/media/3o7TKEV1V6NlTz16Zq/giphy.gif'],
  SUCCESS: ['Aêê! Tu é bixão memo!', 'https://media.giphy.com/media/11nPtzt27joQQ8/giphy.gif'],
};

function ResultWidget({ results }) {
  const Score = Math.floor(results.reduce((score, weight) => score + weight, 0) * 100);
  const [[scoreMessage, scoreAnimation], setScoreMessage] = React.useState(ResultMessage.INITIAL);

  React.useEffect(() => {
    if (Score >= 50) {
      setScoreMessage(ResultMessage.SUCCESS);
    } else if (Score >= 30) {
      setScoreMessage(ResultMessage.NOTBAD);
    } else {
      setScoreMessage(ResultMessage.FAIL);
    }
  }, []);

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        Tela de Resultado:
      </Widget.Header>

      <Widget.Result>
        <h2>{scoreMessage}</h2>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={scoreAnimation}
        />
      </Widget.Result>

      <Widget.Content>
        <h3>
          <b>
            { `${(Score >= 50) ? 'Boa, ' : ''}
            ${(Score >= 30 && Score < 50) ? 'Quase, ' : ''}
            ${(Score <= 20) ? 'Poxa, ' : ''}
          ${sessionStorage.getItem('name')}! Você fez ${Score} ${(Score > 1 || Score === 0) ? 'Pontos' : 'Ponto'}!` }
          </b>
        </h3>
        <ul>
          {results.map((result, index) => (
            <Widget.Result
              as="label"
              transition={{ delay: (index) / 10, duration: 0.4 }}
              variants={{
                show: { opacity: 1, x: '0' },
                hidden: { opacity: 0, x: '-30%' },
              }}
              initial="hidden"
              animate="show"
              key={`result__${result}`}
              data-correct={result > 0}
            >
              <p>{`QUESTÃO ${index + 1}: ${result > 0 ? 'Resposta Certa!' : 'Resposta Errada!'}`}</p>
            </Widget.Result>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

// função que gera o widget de cada questão através do map
function QuestionWidget({
  question, // objeto question
  questionIndex, // indice da questão no array de questions
  totalQuestions, // total de questões no array de questions
  onSubmit, // função para atualizar a questão dps de respondida
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const [rightAlternative, setRightAlternative] = React.useState(undefined);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h2>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h2>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            setRightAlternative(true);
            setTimeout(() => {
              addResult(isCorrect);
              setRightAlternative(undefined);
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
              onSubmit();
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && isSelected && alternativeStatus}
                data-right={
                  isQuestionSubmited && alternativeIndex === question.answer && rightAlternative
                }
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                  checked={isSelected}
                  disabled={rightAlternative}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected || isQuestionSubmited}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Dalee!</p>}
          {isQuestionSubmited && !isCorrect && <p>iiih, errou a marcha!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      (result ? 1 / 10 : 0),
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2 * 1000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT
        && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
