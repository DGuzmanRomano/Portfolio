import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [text, setText] = useState("");
  const [isWaiting, setIsWaiting] = useState(false); // State to track if we're waiting
  const period = 500; // Base time for typing effect
  const delayBeforeDelete = 3000; // 3 seconds delay before starting deletion

  useEffect(() => {
    let ticker = setInterval(() => {
      if (!isWaiting) {
        tick();
      }
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text, isDeleting, isWaiting]); // Added `isWaiting` dependency

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    
    // Keep the first letter constant, adjust the rest
    let updatedText = isDeleting
      ? fullText.substring(0, 1) + fullText.substring(1, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2); // Faster deletion
    }

    if (!isDeleting && updatedText === fullText) {
      setIsWaiting(true); // Start waiting period
      setDelta(period);

      // Delay before deleting (3 seconds)
      setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBeforeDelete);
    } else if (isDeleting && updatedText === fullText[0]) {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(200); // Reset typing speed
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">Welcome to my Portfolio</span>
            <h1>
              {"Hi, I'm Koopon"}
              </h1>
              <h1>
              <span className="wrap">
                {text}
                {/* Blinking cursor */}
                <span className="cursor">_</span>
              </span>
            </h1>
            <p>
              Soy el koopon y soi tortoga, amo a mi bebita linda y a oroger ti
              uwu
            </p>
            <button onClick={() => console.log("connect")}>
              Let's connect <ArrowRightCircle size={25} />
            </button>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={headerImg} alt="Header Img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
