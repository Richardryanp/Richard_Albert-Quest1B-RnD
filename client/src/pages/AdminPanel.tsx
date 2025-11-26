// AdminPanel.tsx
import { useEffect, useState } from "react";

export type Feedback = {
  id: string;
  name: string;
  email: string;
  eventName: string;
  division: "LnT" | "EEO" | "PR" | "HRD" | "RnD";
  rating: number;
  comment?: string;
  suggestion?: string;
  createdAt: string;
  status: "open" | "in-review" | "resolved";
};

export default function AdminPanel() {
  const [data, setData] = useState<Feedback[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // DRAFTS: stores unsaved local edits for each card
  const [drafts, setDrafts] = useState<Record<string, Partial<Feedback>>>({});

  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/api/feedback");
    const json = await res.json();
    setData(json);

    // reset drafts whenever new data loads
    const initialDrafts: Record<string, Partial<Feedback>> = {};
    json.forEach((fb: Feedback) => {
      initialDrafts[fb.id] = { ...fb };
    });
    setDrafts(initialDrafts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // UPDATE LOCAL FIELD (not server)
  const updateDraft = (id: string, field: string, value: any) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // SAVE TO SERVER ONLY WHEN USER CLICKS SAVE
  const saveItem = async (id: string) => {
    const draft = drafts[id];
    await fetch(`http://localhost:4000/api/feedback/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });

    fetchData();
    alert("Save Succesfully!");
  };

  const deleteItem = async (id: string) => {
    await fetch(`http://localhost:4000/api/feedback/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  // FILTERED VIEW
  const filtered = data.filter((fb) => {
    const searchMatch =
      fb.name.toLowerCase().includes(search.toLowerCase()) ||
      fb.email.toLowerCase().includes(search.toLowerCase()) ||
      fb.eventName.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "all" ? true : fb.status === statusFilter;

    return searchMatch && statusMatch;
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-sky-600 mb-6">Admin Panel</h2>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, event..."
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-3 py-2 border rounded-lg shadow-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in-review">In Review</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {filtered.map((fb) => {
          const d = drafts[fb.id]; // grab draft for this card

          return (
            <div
              key={fb.id}
              className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{fb.name}</h3>
                <span className="text-gray-500 text-sm">{fb.email}</span>
              </div>

              {/* Editable fields */}
              <div className="grid grid-cols-2 gap-4 mt-3">
                {/* Event */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Event
                  </label>
                  <input
                    value={d?.eventName || ""}
                    onChange={(e) =>
                      updateDraft(fb.id, "eventName", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Division */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Division
                  </label>
                  <select
                    value={d?.division}
                    onChange={(e) =>
                      updateDraft(fb.id, "division", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option>LnT</option>
                    <option>EEO</option>
                    <option>PR</option>
                    <option>HRD</option>
                    <option>RnD</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={d?.rating}
                    onChange={(e) =>
                      updateDraft(fb.id, "rating", Number(e.target.value))
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Status
                  </label>
                  <select
                    value={d?.status}
                    onChange={(e) =>
                      updateDraft(fb.id, "status", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="open">open</option>
                    <option value="in-review">in-review</option>
                    <option value="resolved">resolved</option>
                  </select>
                </div>
              </div>

              {/* Comment */}
              <div className="mt-3">
                <label className="block text-sm text-gray-500 mb-1">
                  Comment
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  value={d?.comment || ""}
                  onChange={(e) =>
                    updateDraft(fb.id, "comment", e.target.value)
                  }
                />
              </div>

              {/* Suggestion */}
              <div className="mt-3">
                <label className="block text-sm text-gray-500 mb-1">
                  Suggestion
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  value={d?.suggestion || ""}
                  onChange={(e) =>
                    updateDraft(fb.id, "suggestion", e.target.value)
                  }
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-between mt-4">
                {/* Save */}
                <button
                  onClick={() => saveItem(fb.id)}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow"
                >
                  Save
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteItem(fb.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
