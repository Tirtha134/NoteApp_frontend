import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/ContextProvider";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";
import Profile from "./Profile"; 
import { toast } from "react-toastify";
import "./Home.css";
import pic from "../assets/pic.png"; // Image inside src/assets/

const Home = () => {
  const { user: authUser, loading } = useAuth();

  // Notes state
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  // Profile state
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);

  /* ================= FETCH NOTES ================= */
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note", {
        withCredentials: true,
      });

      if (data.success) setNotes(data.notes);
    } catch (error) {
      toast.error("Failed to fetch notes ❌");
    }
  };

  /* ================= ADD NOTE ================= */
  const addNote = async (title, description) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Note added successfully ✅");
        setModalOpen(false);
        fetchNotes();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Add failed ❌");
    }
  };

  /* ================= EDIT NOTE ================= */
  const editNote = async (id, title, description) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Note updated successfully ✏️");
        setModalOpen(false);
        setCurrentNote(null);
        fetchNotes();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed ❌");
    }
  };

  /* ================= DELETE NOTE ================= */
  const deleteNote = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Note deleted 🗑️");
        fetchNotes();
      }
    } catch (error) {
      toast.error("Delete failed ❌");
    }
  };

  /* ================= FETCH PROFILE ================= */
  const openProfile = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/verify",
        { withCredentials: true }
      );
      if (data.success) {
        setProfileUser(data.user); // includes password/hash
        setProfileOpen(true);
      }
    } catch (error) {
      toast.error("Failed to fetch profile ❌");
    }
  };

  /* ================= INITIAL FETCH ================= */
  useEffect(() => {
    if (!loading && authUser) fetchNotes();
  }, [loading, authUser]);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="home">
      {/* ================= NAVBAR ================= */}
      <Navbar setQuery={setQuery} openProfile={openProfile} />

      {/* ================= WELCOME ================= */}
      {!authUser && (
        <div className="welcome">
          <img src={pic} alt="welcome" />
          <h2>Welcome to NoteApp 📝</h2>
          <p>Please login to start managing your notes.</p>
        </div>
      )}

      {/* ================= NOTES ================= */}
      {authUser && (
        <>
          <div className="notes-header">
            <h2>Your Notes</h2>
            <span>{notes.length} Notes</span>
          </div>

          <div className="notes-container">
            {notes.length > 0 ? (
              notes
                .filter(
                  (note) =>
                    note.title.toLowerCase().includes(query.toLowerCase()) ||
                    note.description
                      .toLowerCase()
                      .includes(query.toLowerCase())
                )
                .map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={(note) => {
                      setCurrentNote(note);
                      setModalOpen(true);
                    }}
                    onDelete={deleteNote}
                  />
                ))
            ) : (
              <div className="empty-state">
                <h3>No Notes Yet 📭</h3>
                <p>Click + button to create your first note.</p>
              </div>
            )}
          </div>

          {/* ================= FAB BUTTON ================= */}
          <button
            className="fab"
            onClick={() => {
              setCurrentNote(null);
              setModalOpen(true);
            }}
          >
            +
          </button>
        </>
      )}

      {/* ================= NOTE MODAL ================= */}
      {isModalOpen && (
        <NoteModal
          onClose={() => {
            setModalOpen(false);
            setCurrentNote(null);
          }}
          addNote={addNote}
          editNote={editNote}
          currentNote={currentNote}
        />
      )}

      {/* ================= PROFILE CARD ================= */}
      {isProfileOpen && profileUser && (
        <Profile user={profileUser} onClose={() => setProfileOpen(false)} />
      )}
    </div>
  );
};

export default Home;
