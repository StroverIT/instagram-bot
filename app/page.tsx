"use client";

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    instagramCookies: "",
    instagramProfile: "",
  });

  const onChangeHandler = (e: any) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async () => {
    const response = await fetch("/api/insta-scrapper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <main className="flex items-center justify-center h-screen text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Instagram Scrapper</h1>
        <p className="text-lg mt-4">
          Enter your Instagram cookies and profile URL to get started
        </p>
        <div className="mt-2 ">
          <label>Instagram URL: </label>
          <input
            name="instagramProfile"
            className="text-black"
            onChange={onChangeHandler}
            value={data.instagramProfile}
          />
        </div>
        <div className="mt-2">
          <label>Instagram Cookies: </label>
          <input
            className="text-black"
            name="instagramCookies"
            onChange={onChangeHandler}
            value={data.instagramCookies}
          />
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </main>
  );
}
