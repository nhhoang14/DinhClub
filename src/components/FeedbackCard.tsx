import '../css/FeedbackCard.css';

interface Feedback {
  author: string;
  text: string;
  image: string;
  bgColor?: string;
  textColor?: string;
}

interface FeedbackCardProps {
  feedback: Feedback;
}

function FeedbackCard({ feedback }: FeedbackCardProps) {
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