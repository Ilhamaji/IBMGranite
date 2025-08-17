import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const { loading, setLoading } = useLoading();
  const [data, setData] = useState([]);
  const [myPrompt, setMyPrompt] = useState([]);

  const postResponse = async () => {
    setLoading(true);
    const response = await axios.post(process.env.VITE_URL_BE, {
      prompt,
    });

    setData((prev) => [...prev, response.data.data]);
    setMyPrompt((prev) => [...prev, prompt]);
    setPrompt("");
    setLoading(false);
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className="block min-h-screen w-full bg-neutral-900 px-10 sm:px-20 md:px-40 lg:px-60 xl:px-96">
      <div className="flex flex-row h-fit gap-2 w-full top-0 sticky py-4">
        <input
          type="text"
          value={prompt ?? ""}
          className="p-2 w-full bg-white rounded-2xl"
          placeholder="Ask me anything"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="hover:cursor-pointer rounded-2xl bg-black text-white p-3 hover:bg-neutral-950 hover:text-neutral-300"
          onClick={postResponse}
        >
          Push
        </button>
      </div>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.length > 0
            ? data.map((item, index) => (
                <div className="flex flex-col gap-4 w-full">
                  <div
                    className="p-4 bg-neutral-500 text-white w-fit rounded-2xl ml-auto mr-0 justify-end"
                    key={index}
                  >
                    {myPrompt[index]}
                  </div>
                  <div
                    className="p-4 bg-neutral-700 text-white w-fit rounded-2xl ml-auto mr-0 justify-start"
                    key={index}
                  >
                    {item}
                  </div>
                </div>
              ))
            : ""}
        </div>
      )}
    </div>
  );
}
