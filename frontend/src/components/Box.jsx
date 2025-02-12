import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://chatapplication-mern.onrender.com");

const Box = () => {
  const param = useParams();

  const [name] = useState(param.id);
  const [text, setText] = useState("");
  const [mess, setMess] = useState([]);

  const getMessage = async () => {
    try {
      const response = await fetch(
        "https://chatapplication-mern.onrender.com/getmessage"
      );
      const data = await response.json();
      if (data && Array.isArray(data.message)) {
        setMess(data.message);
      } else {
        setMess([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    getMessage();

    socket.on("refreshMessages", () => {
      getMessage();
    });

    return () => {
      socket.off("refreshMessages");
    };
  }, []);

  const deleteOne = async (id) => {
    try {
      const res = await fetch(
        `https://chatapplication-mern.onrender.com/message/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setMess((prevMess) => prevMess.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const sending = async () => {
    try {
      const result = await fetch(
        "https://chatapplication-mern.onrender.com/message",
        {
          method: "POST",
          body: JSON.stringify({ text, name }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();

      if (result.ok) {
        getMessage();
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center pt-[20px]">
      <div className="shadow w-full md:w-[700px] h-[560px]">
        <div className="flex justify-center">
          <h1 className="pb-4 pt-2 font-serif text-[20px] text-[#c04798]">
            Enjoy--Chats....
          </h1>
        </div>

        <div
          className="h-[450px] p-3 flex flex-col-reverse items-center overflow-y-auto gap-4 custom-scrollbar"
          style={{ direction: "ltr" }}
        >
          {mess.length > 0 ? (
            mess.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 shadow p-1 rounded-tr-2xl w-full"
              >
                <h1 className="text-[#419277] font-medium">
                  {" "}
                  {item.name ? item.name : "user"}{" "}
                </h1>
                <div className="flex gap-2">
                  <p className="font-serif text-[14px] text-gray-500 w-[95%]">
                    {item.text}
                  </p>
                  <p
                    className="-mt-[20px] bg-[#e22b2b] text-white rounded-full h-[20px] w-[20px] items-center flex pl-[2px] cursor-pointer"
                    onClick={() => deleteOne(item._id)}
                  >
                    <MdOutlineDeleteOutline />
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No messages available</p>
          )}
        </div>

        <div className="p-2 pl-4 pr-4 flex gap-2 items-center">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Your Message.. "
            className="w-[560px] outline-none border border-gray-400 p-2 rounded-full text-gray-800 placeholder:text-[14px] pl-6"
          />
          <button
            className="hover:bg-sky-800 rounded-full bg-sky-600 p-2 pl-3 pr-3"
            onClick={sending}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Box;
