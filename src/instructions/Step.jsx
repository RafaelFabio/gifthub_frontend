import React from 'react';

function Step({ id, title, subtitle, instructions, current }) {
    return (
        <>{current === id &&
            <section className="step">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <p>{instructions}</p>
            </section>
        }</>
    );
}

export default Step;