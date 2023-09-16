import React from 'react';
import './Step.css';

function Step({ id, title, subtitle, instructions, icons, indication, current }) {
    return (
        <>{current === id &&
            <section className="step">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <p>{instructions}</p>
                <div className="icon-row">
                    {icons.map((icon, index) => (
                        <img
                            key={index}
                            src={icon}
                            className="icon"
                            alt={`Step ${id}, Icon ${index + 1}`}
                        />
                    ))}
                </div>
                <p><i>{indication}</i></p>
            </section>
        }</>
    );
}

export default Step;