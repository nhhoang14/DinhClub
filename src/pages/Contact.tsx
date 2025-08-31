import { useState, ChangeEvent, DragEvent } from "react";
import '../css/Contact.css';
import logo from '../images/logo_white.png';

function Contact() {
  const [files, setFiles] = useState<File[]>([]);

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => {
      const existing = prev.map((f) => f.name + f.size);
      const filtered = newFiles.filter(
        (f) => !existing.includes(f.name + f.size)
      );
      return [...prev, ...filtered];
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles as File[]);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    addFiles(selectedFiles as File[]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="contact">
      <div className="contact-info">
        <img src={logo} alt="Dính Club Logo" className="logo" />
      </div>
      <div className="contact-content">
        <form className="contact-form" action="">
          <div className="form-heading">
            <h2>Lắng nghe các cậu!</h2>
            <p>Các mom có thắc mắc gì? Hãy liên hệ cho tụi mình nháaaa!</p>
          </div>
          <div className="form-group">
            <div className="name-form">
              <p>Tên của bạn</p>
              <input type="text" placeholder="Tên người đẹp là gì ạaa..." required />
            </div>
            <div className="email-form">
              <p>Email của bạn</p>
              <input type="email" placeholder="Email nữa nhá người đẹp ơiii..." required />
            </div>
            <div className="message-form">
              <p>Nội dung của bạn</p>
              <textarea placeholder="Người đẹp băn khoăn gì thế..." required></textarea>
            </div>

            {/* Drop area */}
            <div
              className="file-form drop-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p>Kéo thả file vào đây hoặc click để chọn</p>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput" className="file-label">
                Chọn File
              </label>

              <div className="file-list">
                {files.map((file, index) => (
                  <div className="file-item" key={index}>
                    <span>{file.name}</span>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFile(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Drop area end */}
          </div>
          <button className="contact-btn" type="submit">
            Gửi thông tin
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
