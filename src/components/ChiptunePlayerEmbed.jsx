import { useState , useEffect} from "react";

export default function ChiptunePlayerEmbed() {
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  // Load default song from public/assets/sample.chip
  useEffect(() => {
    const loadDefaultSong = async () => {
      try {
        const response = await fetch("/assets/community.chip");
        const text = await response.text();
        setNoteText(text);
      } catch (err) {
        console.error("Failed to load default song", err);
      }
    };
    loadDefaultSong();
  }, []);

  const handleRender = async () => {
    if (!noteText.trim()) return;
    setLoading(true);
    setAudioUrl(null);

    try {
      const response = await fetch("http://localhost:8000/render", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: noteText,
      });

      if (!response.ok) {
        alert("Error rendering audio!");
        setLoading(false);
        return;
      }

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error(err);
      alert("Failed to connect to chiptune service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md prose prose-invert">
      <h2 className="text-2xl font-bold">Chiptune Player</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={6}
        placeholder={"Enter notes"}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={handleRender}
        disabled={loading}
      >
        {loading ? "Rendering..." : "Play"}
      </button>

      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
}

