import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => {
    console.log('Accumulating exercises:', sum, 'Adding part:', part.exercises);
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
