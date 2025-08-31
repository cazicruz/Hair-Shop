import React from 'react'

function About() {
  return (
    <section>
    <h2>About Us</h2>  
    <div>
      <div>
        <h3>Our Mission</h3>
        <p>To provide exceptional hair care services that enhance our clients' natural beauty.</p>
        <p>We are a leading hair salon offering a wide range of services to keep your hair looking its best.</p>
      </div>
    </div>
  </section>
  )
}

const TextImageContainer = ({ text, image }) => {
  return (
    <div>
      <img src={image} alt={text} />
      <p>{text}</p>
    </div>
  );
};

export default About