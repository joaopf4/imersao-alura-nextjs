/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
  /* <pre style={{ color: 'black' }}>
      {JSON.stringify(dbExterno.questions, null, 4)}
    </pre> */
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('__');
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      throw new Error('Falha em entregar os dados');
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
    .catch((err) => {
      console.error('msg de erro', err);
    });

  console.log('dbexterno', dbExterno);
  console.log('infos next gives us', context.query.id);

  return {
    props: {
      dbExterno,
    }, // will be passed to the page component as props
  };
}
