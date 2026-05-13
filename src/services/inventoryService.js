import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const inventoryCollection = collection(db, "inventory");

export async function getInventory() {
  const snapshot = await getDocs(inventoryCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function seedInventory(products) {
  const seedPromises = products.map((item) =>
    setDoc(doc(db, "inventory", item.id), {
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      dailyLimit: item.dailyLimit,
      isAvailable: item.isAvailable,
      batchNote: item.batchNote,
      updatedAt: new Date().toISOString(),
    })
  );

  await Promise.all(seedPromises);
}

export async function updateInventoryItem(id, updates) {
  await updateDoc(doc(db, "inventory", id), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}