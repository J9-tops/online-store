"use client";

import { useEffect, useState } from "react";

const useCreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then(setCategory);
  }, []);

  const addCategory = async () => {
    const res = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const newCategory = await res.json();
      setCategory([...category, newCategory]);
      setTitle("");
      setDescription("");
    }
  };
  return { addCategory };
};

export default useCreateCategory;
