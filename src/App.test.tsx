import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {detectFeaturesInText, Features} from './reducers/features-detector'
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

const english = 'english';
const french = 'french';
const unknownLanguage = 'zulu';


it('correctly detects english sentence', () => {
  var detected = detectFeaturesInText('Hello There! My name is Anas and I am writing some tests', english);
  expect(detected).toContain(Features.SENTENCE);
})

it('shouldnt detects sentence in wrong language', () => {
  var detected = detectFeaturesInText('Mon nom est Anas et je suis entrain de faire des tests', unknownLanguage);
  expect(detected).toEqual([]);
})

it('should detects a french sentence', () => {
  var detected = detectFeaturesInText('Mon nom est Anas et je suis entrain de faire des tests', french);
  expect(detected).toContain(Features.SENTENCE);
})

it('correctly detects long lines', () => {
  var detected = detectFeaturesInText('Hello There! This is a very long line that is definetly not part of a signature', french);
  expect(detected).toContain(Features.LONG_LINE);
})


it('correctly detects phone french', () => {
  var detected = detectFeaturesInText('Hello There! My name is +33 45 56 67 78 Anas and I am writing some tests', english);
  expect(detected).toContain(Features.PHONE);
})

it('correctly detects phone american', () => {
  var detected = detectFeaturesInText('(345) 235 4576', english);
  expect(detected).toContain(Features.PHONE);
})

it('correctly detects full name', () => {
  var detected = detectFeaturesInText('Eric Larson Garcia', english);
  expect(detected).toContain(Features.FULL_NAME);
})

it('correctly detects email', () => {
  var detected = detectFeaturesInText('my email is pirhanas@windowslive.com of', english);
  expect(detected).toContain(Features.EMAIL);
})

it('correctly detects web link 1', () => {
  var detected = detectFeaturesInText('www.linkedin.com/username', english);
  expect(detected).toContain(Features.LINK);
})

it('correctly detects empty lines', () => {
  var detected = detectFeaturesInText('', unknownLanguage);
  expect(detected).toContain(Features.EMPTY_LINE);
})

it('correctly detects white space lines', () => {
  var detected = detectFeaturesInText('     ', unknownLanguage);
  expect(detected).toContain(Features.EMPTY_LINE);
})

it('correctly detects a sentence with capital case', () => {
  var detected = detectFeaturesInText('Official Revolut App', english);
  expect(detected).toEqual([Features.CAPITAL_CASE, Features.NO_STOP_WORDS].sort());
})

it('correctly detects a sentence with no stop words', () => {
  var detected = detectFeaturesInText('Dragon Tail Talon Hailey', english);
  expect(detected).toContain(Features.NO_STOP_WORDS);
})

it('correctly detects a double dash (start of signature block)', () => {
  var detected = detectFeaturesInText('--  ', english);
  expect(detected).toContain(Features.DOUBLE_DASH);
})






