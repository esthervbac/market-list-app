import React, { useState, useEffect } from "react";
import api from "../api/client";
import { Plus, Trash2, Eye } from "lucide-react";

interface ShoppingList {
  _id: string;
  title: string;
}

interface DashboardProps {
  onSelectList: (id: string) => void;
  onLogout: () => void;
}

export default function Dashboard({ onSelectList, onLogout }: DashboardProps) {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [newListName, setNewListName] = useState("");

  const fetchLists = async () => {
    try {
      const response = await api.get("/shopping-list");
      setLists(response.data.data || []);
    } catch (err) {
      console.error("Erro ao buscar listas", err);
    }
  };

  useEffect(() => {
    const loadLists = async () => {
      await fetchLists();
    };

    loadLists();
  }, []);

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    try {
      await api.post("/shopping-list", { title: newListName, items: [] });
      setNewListName("");
      fetchLists();
    } catch (err) {
      console.error("Erro ao criar lista", err);
    }
  };

  const handleDeleteList = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Deseja mesmo deletar esta lista?")) return;
    try {
      await api.delete(`/shopping-list/${id}`);
      fetchLists();
    } catch (err) {
      console.error("Erro ao deletar lista", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-brand-purple to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Minhas Listas
          </h1>
          <button
            onClick={onLogout}
            className="text-sm bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 cursor-pointer"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleCreateList} className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Ex: Compras do Mês"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-zinc-300 bg-white focus:outline-emerald-500 shadow-xs"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-5 rounded-xl flex items-center gap-1 hover:bg-emerald-700 cursor-pointer"
          >
            <Plus size={20} /> <span className="hidden sm:inline">Criar</span>
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lists.map((list) => (
            <div
              key={list._id}
              onClick={() => onSelectList(list._id)}
              className="bg-white p-5 rounded-xl shadow-xs border border-zinc-200 flex justify-between items-center cursor-pointer hover:shadow-md transition"
            >
              <span className="font-semibold text-lg text-zinc-700">
                {list.title}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                  <Eye size={18} />
                </button>
                <button
                  onClick={(e) => handleDeleteList(list._id, e)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
