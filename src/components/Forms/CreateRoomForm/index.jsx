import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from "react-toastify";

const CreateRoomForm = ({ uuid, socket, setUser }) => {

  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };

    if (!name) return toast.dark("Please enter your name!");
    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  };

  return (
    <form className="form col-md-12 mt-5 ">
      <div  className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group border border-1 rounded-2">
        <div className="input-group d-flex align-items-center jusitfy-content-center">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border-0 rounded-2 "
            disabled
            placeholder="Generate room code"
          />
          <div className="input-group-append m-1">
            <button
              className="btn btn-primary btn-sm me-1"
              onClick={() => setRoomId(uuid())}
              type="button"
            >
            generate
            </button>
            <CopyToClipboard text={roomId}>
            <button
              className="btn btn-outline-danger btn-sm me-2"
              type="button"
            >
            copy
            </button>
            </CopyToClipboard>
          </div>

        </div>
      </div>
      <button
        type="submit"
        onClick={handleCreateRoom}
        className="mt-4 btn btn-primary btn-block form-control"
      >
      Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
