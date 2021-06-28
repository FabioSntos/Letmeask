import toast, { Toaster } from 'react-hot-toast';

import { useParams } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
// import { useAuth } from '../hooks/useAuth';

import logoImage from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';

import '../styles/room.scss';
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  <Toaster position="top-center" reverseOrder={false} />;
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {}

  async function handleDeleteQuestion(questionId: string) {
    function notify() {
      toast.success('Pergunta removida com sucesso!');
    }

    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      notify();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImage} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>

          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="deletar pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
