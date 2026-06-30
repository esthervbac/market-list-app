import React, { useState, useEffect } from "react";
import api from "../api/client";
import { ArrowLeft, Plus, Trash2, Share2 } from "lucide-react";

interface Item {
  _id?: string;
  name: string;
  quantity: number;
}

interface ListDetailsProps {
  listId: string;
  onBack: () => void;
}

export default function ListDetails({ listId, onBack }: ListDetailsProps) {
  const [listName, setListName] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isCancelled = false;

    const loadListDetails = async () => {
      try {
        const response = await api.get(`/shopping-list/${listId}`);
        if (isCancelled) return;
        setListName(response.data.title);
        setItems(response.data.items || []);
      } catch (err) {
        if (!isCancelled) {
          console.error("Erro ao carregar itens", err);
        }
      }
    };

    void loadListDetails();

    return () => {
      isCancelled = true;
    };
  }, [listId]);

  const updateItemsOnAPI = async (updatedItems: Item[]) => {
    try {
      await api.put(`/shopping-list/${listId}`, {
        title: listName,
        items: updatedItems,
      });
      setItems(updatedItems);
    } catch (err) {
      console.error("Erro ao atualizar itens na API", err);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    const newItem: Item = {
      name: itemName,
      quantity,
    };

    const updatedItems = [...items, newItem];
    await updateItemsOnAPI(updatedItems);

    setItemName("");
    setQuantity(1);
  };

  const handleDeleteItem = async (indexToDelete: number) => {
    const updatedItems = items.filter((_, index) => index !== indexToDelete);
    await updateItemsOnAPI(updatedItems);
  };

  const handleShareWhatsApp = () => {
    let message = `🛒 *Lista de Mercado: ${listName}* \n\n`;
    items.forEach((item) => {
      message += `🔹 ${item.name} (${item.quantity}x)\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://api.whatsapp.com/send?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-brand-purple to-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-zinc-200 p-6">
        <div className="flex items-center justify-between mb-6 border-b border-zinc-100 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900 cursor-pointer"
          >
            <ArrowLeft size={20} /> Voltar
          </button>
          <h2 className="text-xl font-bold text-zinc-800">{listName}</h2>
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-700 cursor-pointer"
          >
            <Share2 size={16} /> Enviar
          </button>
        </div>

        <form
          onSubmit={handleAddItem}
          className="flex flex-col sm:flex-row gap-2 mb-6"
        >
          <input
            type="text"
            placeholder="Nome do item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="flex-1 p-2.5 border border-zinc-300 rounded-lg bg-zinc-50 focus:outline-emerald-500"
          />
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full sm:w-20 p-2.5 border border-zinc-300 rounded-lg bg-zinc-50 text-center focus:outline-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white p-2.5 rounded-lg flex justify-center items-center gap-1 hover:bg-emerald-700 cursor-pointer"
          >
            <Plus size={20} /> Add
          </button>
        </form>

        <div className="space-y-2">
          {items.length === 0 ? (
            <p className="text-center text-zinc-400 py-4">
              Sua lista está vazia.
            </p>
          ) : (
            items.map((item, index) => (
              <div
                key={item._id || index}
                className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl border border-zinc-200"
              >
                <span className="text-zinc-700 font-medium">
                  {item.name}{" "}
                  <span className="text-zinc-400 text-sm">
                    ({item.quantity}x)
                  </span>
                </span>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="text-red-500 hover:bg-red-50 p-1.5 rounded-full cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
