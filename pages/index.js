import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [vibeInput, setVibeInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vibe: vibeInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      
      setResult(data.result);
      setVibeInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>spotivibe</title>
        <link rel="icon" href="/music_note.png" />
      </Head>

      <main className={styles.main}>
        <img src="/music_note.png" className={styles.icon} />
        <h3>spotivibe</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="vibe"
            placeholder="Enter a vibe"
            value={vibeInput}
            onChange={(e) => setVibeInput(e.target.value)}
          />
          <input type="submit" value="Generate Playlist" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
