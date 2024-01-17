import React, {FC, useEffect} from 'react';
import {Figure, FigureNames} from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {

  useEffect(()=> {
    const intervalId = setInterval(() => {
      if (figures.some(figure => figure.name === FigureNames.KING)) {
        alert("Король был съеден!");
        clearInterval(intervalId);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  },[figures]);

  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map(figure =>
        <div key={figure.id}>
          {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo}/>}
        </div>
      )}
    </div>
  );
};

export default LostFigures;
