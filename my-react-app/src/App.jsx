import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: task, completed: false }
    ]);

    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const completed = tasks.filter((item) => item.completed).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5">

      <div className="w-full max-w-lg bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-[fadeIn_0.7s_ease-out]">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            My Todo List
          </h1>
          <p className="text-gray-500">
            Organize your day, one task at a time!
          </p>
        </div>

        <div className="flex gap-2 mb-7">

          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="flex-1 min-w-0 border-2 border-gray-200 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          />

          <button
            onClick={addTask}
            className="bg-purple-600 text-white px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-purple-700 hover:scale-105 active:scale-95 shadow-lg"
          >
            Add +
          </button>

        </div>

        <div className="flex justify-between bg-purple-50 p-4 rounded-xl mb-6 text-center">
          <div>
            <p className="text-gray-500 text-sm">Total Tasks</p>
            <h2 className="text-2xl font-bold text-purple-600">
              {tasks.length}
            </h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-2xl font-bold text-green-500">
              {completed}
            </h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-2xl font-bold text-orange-500">
              {tasks.length - completed}
            </h2>
          </div>
        </div>

        <div className="space-y-3">

          {tasks.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-[slideIn_0.4s_ease-out]"
            >

              <div className="flex items-center gap-3 min-w-0">

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                  className="w-5 h-5 accent-purple-600 cursor-pointer"
                />

                <span
                  className={`break-all transition-all duration-300 ${
                    item.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700 font-medium"
                  }`}
                >
                  {item.text}
                </span>

              </div>

              <button
                onClick={() => deleteTask(item.id)}
                className="text-red-500 font-semibold transition-all duration-300 hover:text-red-700 hover:scale-110 shrink-0"
              >
                Delete
              </button>

            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-10 animate-pulse">
              <p className="text-5xl mb-3">📝</p>
              <p className="text-gray-400">
                No tasks yet. Add your first task!
              </p>
            </div>
          )}

        </div>

        {tasks.length > 0 && (
          <div className="mt-7">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>
                {Math.round((completed / tasks.length) * 100)}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-700"
                style={{
                  width: `${(completed / tasks.length) * 100}%`
                }}
              />
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

    </div>
  );
}

export default App;