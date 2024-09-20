import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap"; // Importing layout components from react-bootstrap
import contactImg from "../assets/img/contact-img.svg"; // Importing an image for the contact section
import 'animate.css'; // Importing animate.css for animations
import TrackVisibility from 'react-on-screen'; // Importing a package to track when elements are visible on screen

// Main Contact component
export const Contact = () => {
  // Initial form details for the contact form
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }

  // State to manage the form details, initialized with formInitialDetails
  const [formDetails, setFormDetails] = useState(formInitialDetails);

  // State to control the text of the submit button (e.g., 'Send', 'Sending...')
  const [buttonText, setButtonText] = useState('Send');

  // State to manage form submission status (success or error messages)
  const [status, setStatus] = useState({});

  // Function to handle updates to the form. It takes the category (field name) and value, then updates the corresponding state.
  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails, // Keep the previous form data
      [category]: value // Update only the specific field that is being changed
    })
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    setButtonText("Sending..."); // Change button text to 'Sending...'

    // Send a POST request with form details to the backend (e.g., localhost:5000/contact)
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8", // Specify JSON content
      },
      body: JSON.stringify(formDetails), // Send form details as JSON
    });

    setButtonText("Send"); // Reset button text to 'Send'

    // Get the response from the server
    let result = await response.json();

    // Reset form to initial empty state
    setFormDetails(formInitialDetails);

    // If the server response is successful, show a success message
    if (result.code == 200) {
      setStatus({ success: true, message: 'Message sent successfully' });
    } else {
      // If there was an error, show an error message
      setStatus({ success: false, message: 'Something went wrong, please try again later.' });
    }
  };

  // Render the contact form and display image using TrackVisibility for animations
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          {/* First column with the contact image */}
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />
              }
            </TrackVisibility>
          </Col>
          
          {/* Second column with the contact form */}
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      {/* First Name Input */}
                      <Col size={12} sm={6} className="px-1">
                        <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                      </Col>
                      {/* Last Name Input */}
                      <Col size={12} sm={6} className="px-1">
                        <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                      </Col>
                      {/* Email Input */}
                      <Col size={12} sm={6} className="px-1">
                        <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                      </Col>
                      {/* Phone Number Input */}
                      <Col size={12} sm={6} className="px-1">
                        <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} />
                      </Col>
                      {/* Message Input */}
                      <Col size={12} className="px-1">
                        <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                        {/* Submit Button */}
                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
                      {/* Display the status message after form submission */}
                      {status.message &&
                        <Col>
                          <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                        </Col>
                      }
                    </Row>
                  </form>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
