/* eslint-disable react/jsx-no-bind */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // npm install framer-motion
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import Input from '../src/components/Input';

// const BackgroudnImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={
                  (event) => {
                    setName(event.target.value);
                    sessionStorage.setItem('name', event.target.value);
                  }
                }
                placeholder="Diz aí seu nome!"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Pronto pra girar${name === '' ? '' : ', '}${name}?`}
              </Button>
              <Widget.Warning>
                <p data-disabled={name.length === 0}>Warning: Sem nome, sem quiz!</p>
              </Widget.Warning>
            </form>
            <p>{db.description}</p>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Mais Quizes feitos nessa imersão!</h1>
            <ul>
              {db.external.map((linkExternalQuiz) => {
                const [projectName, githubUser] = linkExternalQuiz
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExternalQuiz}>
                    <Widget.Topic
                      as={Link}
                      href={name.length === 0 ? '/' : `/quiz/${projectName}__${githubUser}`}
                      data-disabled={name.length === 0}
                    >
                      {`${projectName} / ${githubUser}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/joaopf4" />
    </QuizBackground>
  );
}
