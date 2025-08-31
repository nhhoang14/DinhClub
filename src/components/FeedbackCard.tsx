import '../css/FeedbackCard.css';

function FeedbackCard({ feedback }) {
  return (
    <div className="feedback-card" style={{ backgroundColor: feedback.bgColor, color: feedback.textColor }}>
      <div className="fbcard-content">
        <p className="fbcard-author">{feedback.author}</p>
        <p className="fbcard-text">{feedback.text}</p>
      </div>
      <div className="fbcard-subcontent">
        <img src={feedback.image} alt={feedback.author} className='fbcard-img' />
      </div>
    </div>
  );
}

export default FeedbackCard;