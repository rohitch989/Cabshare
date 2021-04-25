import React from "react";

export default function WelcomeAbout() {
  return (
    <div>
      <section className="section-2">
        <div className="heading">
          <h1>About</h1>
        </div>
        <div className="about-content" id="about">
          <div className="about-content-paragraph">
            <p>
              This is Nit Durgapur 's own cabshare website build and designed to
              facilitate people to get nit's cab while returning to college from
              any place ,where cab had gone to drop someone.
            </p>
          </div>
          <div className="about-content-paragraph">
            <p>
              you can book the cab only when the cab had gone to drop some one
              near your place.you will get the notification whenever cab is free
              returning from your local area after you signed in here.
            </p>
          </div>
          <div className="about-content-paragraph">
            <p>
              After logging in ,you have to request the driver whenever you get
              the notification to get the cab.Remember you can request the
              driver only when there is notification came from the driver .
            </p>
          </div>
          <div className="about-content-paragraph">
            <p>
              Once the request get accepted you can get the ride and driver
              takes you to college.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
