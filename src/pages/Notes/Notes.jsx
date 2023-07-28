import React, { useState } from "react";
import Header from "../../components/Header/Header";

import "./Notes.scss";
import { FireBase } from "../../API/firebase";

const Notes = () => {
  const [notes, setNotes] = useState([{ title: "Test", body: "Test", tags: "Test", date: Date.now() }]);
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <section className="intro">
          <div className="intro__container">
            <h1 className="intro__title">Добро пожаловать в Notes! </h1>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Notes;
