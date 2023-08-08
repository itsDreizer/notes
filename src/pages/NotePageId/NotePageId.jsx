import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { FireBase } from "../../API/firebase";
import useFetching from "../../hooks/useFetching";
import NotePage from "../../components/UI/NotePage/NotePage";
import NotePageHeader from "../../components/UI/NotePage/NotePageHeader";
import NotePageBody from "../../components/UI/NotePage/NotePageBody";
import { CategoriesContext } from "../../context/CategoriesContext";
import PageLoader from "../../components/pageloader/PageLoader";
import CreateCategoryModal from "../../components/createCategoryModal/CreateCategotyModal";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";

const NotePageId = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const params = useParams();
  const { allCategories, fetchCategories } = useContext(CategoriesContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(Date.now());
  const [body, setBody] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Без категории");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [fetchNote, isNoteLoading, isNoteError] = useFetching(async () => {
    const note = await FireBase.getNote(params.id);
    if (params.id && !note) {
      navigate("/notes/main");
      return;
    }
    setTitle(note.title);
    setBody(note.body);
    setDate(note.date);
    setIsFavorite(note.isFavorite);
    setCurrentCategory(note.category);
  });

  useEffect(() => {
    fetchNote();
    fetchCategories();
  }, []);

  useMemo(() => {
    document.title = title;
  }, [date]);

  if (isNoteLoading) {
    return <PageLoader />;
  }

  const submit = async (e) => {
    e.preventDefault();
    const newDate = Date.now();
    await FireBase.updateNote(title, body, currentCategory, newDate, isFavorite, params.id);
    navigate("/notes/main");
  };

  const validateNote = (title, body) => {
    return title.length > 0 && body.length > 0;
  };

  return (
    <div>
      <Header />
      <main className="main">
        {isCreateModalVisible ? (
          <CreateCategoryModal
            fetchCategories={fetchCategories}
            allCategories={allCategories}
            isModalVisible={isCreateModalVisible}
            setIsModalVisible={setIsCreateModalVisible}
          />
        ) : (
          false
        )}
        {isDeleteModalVisible ? (
          <Modal>
            <span className="modal__text">Вы действительно хотите удалить эту заметку?</span>
            <div className="modal__buttons">
              <Button
                onClick={async (e) => {
                  setIsDeleteModalVisible(false);
                  await FireBase.deleteNote(params.id);
                  navigate("/notes/main");
                }}
                className={`modal__button hover-disabled`}>
                Да
              </Button>
              <Button
                onClick={() => {
                  setIsDeleteModalVisible(false);
                }}
                className={"button--invert modal__button hover-disabled"}>
                Нет
              </Button>
            </div>
          </Modal>
        ) : (
          false
        )}
        <NotePage submit={submit}>
          <NotePageHeader
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            noteId={params.id}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            setIsCreateModalVisible={setIsCreateModalVisible}
            allCategories={allCategories}
            date={date}
            title={title}
            setTitle={setTitle}
            body={body}
            isConfirmDisabled={isConfirmDisabled}
            setIsConfirmDisabled={setIsConfirmDisabled}
            validateNote={validateNote}
            conttrolsRef={ref}
            setIsDeleteModalVisible={setIsDeleteModalVisible}
          />
          <NotePageBody
            title={title}
            body={body}
            setBody={setBody}
            setTitle={setTitle}
            setIsConfirmDisabled={setIsConfirmDisabled}
            validateNote={validateNote}
          />
        </NotePage>
      </main>
    </div>
  );
};

export default NotePageId;
