import './WishCard.css';

function EventCard({ key, type, date }) {

    return (
        <div key={key} className='wish-card'>
            <h2>{type}:</h2>
            <h3>{date.split('T')[0]}</h3>
        </div>
    );
}

export default EventCard;