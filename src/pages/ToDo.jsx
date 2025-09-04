import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "normal",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchPopup, setSearchPopup] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    try {
      const parsed = storedTasks ? JSON.parse(storedTasks) : [];
      if (Array.isArray(parsed)) {
        setTasks(parsed);
        setFilteredTasks(parsed);
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }
    try {
      const current = JSON.stringify(tasks);
      const existing = localStorage.getItem("tasks");
      if (existing !== current) {
        localStorage.setItem("tasks", current);
      }
      if (!isFiltered) {
        setFilteredTasks(tasks);
      }
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks, isFiltered, isInitialMount]);

  const openSidebar = () => {
    setShowSidebar(true);
    setFormData({ title: "", description: "", priority: "normal" });
    setEditIndex(null);
  };

  const closeSidebar = () => setShowSidebar(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedTasks;
    if (editIndex !== null) {
      updatedTasks = [...tasks];
      updatedTasks[editIndex] = formData;
    } else {
      updatedTasks = [...tasks, formData];
    }

    setTasks(updatedTasks);
    setFormData({ title: "", description: "", priority: "normal" });
    setShowSidebar(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(tasks[index]);
    setShowSidebar(true);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    setFilteredTasks(updated);
    if (updated.length === 0) {
      localStorage.removeItem("tasks");
    } else {
      localStorage.setItem("tasks", JSON.stringify(updated));
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      const suggest = tasks
        .map((task) => task.title)
        .filter((title) => title.toLowerCase().startsWith(value.toLowerCase()));
      setSuggestions([...new Set(suggest)]);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchPopup(true);
      return;
    }

    const matched = tasks.filter((task) =>
      task.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    if (matched.length === 0) {
      setSearchPopup(true);
    } else {
      setFilteredTasks(matched);
      setIsFiltered(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setFilteredTasks(tasks);
    setIsFiltered(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-300 text-black px-1 py-3 font-sans">
      <div className="max-w-7xl mx-auto border-2 border-gray-400 rounded-xl shadow-lg flex">
      
        {showSidebar && (
          <div className="w-80 bg-white border-r border-gray-300 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editIndex !== null ? "Edit Task" : "Add Task"}
              </h2>
              <button
                type="button"
                onClick={closeSidebar}
                className="text-black text-2xl font-bold hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

       
              <div className="flex items-center gap-3">
                <input
                  id="prio-important"
                  type="radio"
                  name="priority"
                  value="important"
                  checked={formData.priority === "important"}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <label
                  htmlFor="prio-important"
                  className={`px-4 py-2 rounded-md border text-sm cursor-pointer select-none
                  ${
                    formData.priority === "important"
                      ? "bg-purple-700 text-white border-purple-700"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Important
                </label>

                <input
                  id="prio-normal"
                  type="radio"
                  name="priority"
                  value="normal"
                  checked={formData.priority === "normal"}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <label
                  htmlFor="prio-normal"
                  className={`px-4 py-2 rounded-md border text-sm cursor-pointer select-none
                  ${
                    formData.priority === "normal"
                      ? "bg-purple-700 text-white border-purple-700"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Normal
                </label>
              </div>

              <button
                type="submit"
                className="bg-purple-800 hover:bg-purple-700 px-4 py-2 rounded w-full text-white font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        )}


        <div className="flex-1 px-6 py-6">
          <h1 className="text-6xl font-extrabold text-center mb-10 text-purple-900">
            To Do List
          </h1>


          <div className="flex justify-center gap-3 mb-10 items-center">
            {isFiltered && (
              <button onClick={clearSearch} className="text-purple-700 text-xl">
                <FiArrowLeft className="hover:text-purple-500" />
              </button>
            )}
            <div className="relative w-60">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInput}
                placeholder="Search..."
                className="w-full px-1 py-3 rounded-lg bg-white text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-purple-600 hover:text-purple-800"
              >
                <FiSearch size={16} />
              </button>
              {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 z-10 max-h-40 overflow-y-auto shadow">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setSearchQuery(s);
                        handleSearch();
                        setSuggestions([]);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={openSidebar}
              className="bg-purple-900 text-white px-6 py-3 rounded-lg hover:bg-purple-700 shadow-md"
            >
              Add Task
            </button>
          </div>

  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTasks.map((task, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl min-h-[250px] max-w-[300px] w-full mx-auto flex flex-col justify-between shadow-lg border ${
                  task.priority === "important"
                    ? "bg-yellow-100 border-black text-black"
                    : "bg-green-100 border-black text-black"
                }`}
              >
                <div>
                  <h3 className="font-bold text-xl mb-2">{task.title}</h3>
                  <p className="whitespace-pre-wrap text-sm">
                    {task.description}
                  </p>
                </div>
                <div className="flex justify-start gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {searchPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg border border-gray-300 text-center space-y-4">
            <p className="text-lg text-gray-800">Task not found</p>
            <button
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
              onClick={() => setSearchPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDo;
