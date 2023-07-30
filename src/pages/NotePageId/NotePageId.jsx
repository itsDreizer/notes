import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

const NotePageId = () => {
  const params = useParams();
  return (
    <div>
      <Header />
      {params.id}
    </div>
  );
};

export default NotePageId;
