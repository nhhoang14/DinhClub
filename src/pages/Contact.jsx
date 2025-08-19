import '../css/Contact.css';

function Contact() {
  return (
    <div className="contact">
      <div className="contact-info">

      </div>
      <div className="contact-content">
        <form className="contact-form" action="">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
