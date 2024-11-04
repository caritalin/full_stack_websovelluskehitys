import React from 'react';

// Part component
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

// Content component
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

// Header component
const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

// Course component
const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <p><strong>total of {totalExercises} exercises</strong></p>
    </div>
  );
};

export default Course;
