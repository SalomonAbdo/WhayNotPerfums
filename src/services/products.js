import { db } from "../firebase/client";
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";

/**
 * Obtiene todos los productos de la colección 'products'
 */
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
        // Combinamos el ID del documento con sus datos
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};

/**
 * Obtiene un producto por su ID
 * @param {string} id
 */
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No se encontró el producto!");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
};

/**
 * Verifica el stock de un producto
 * @param {string} id
 */
export const checkStock = async (id) => {
    const product = await getProductById(id);
    if (!product) return 0;
    return product.stock || 0;
};

/**
 * Añade un nuevo producto
 * @param {object} productData
 */
export const addProduct = async (productData) => {
    try {
        const docRef = await addDoc(collection(db, "products"), {
            ...productData,
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error añadiendo producto: ", error);
        return { success: false, error: error.message };
    }
};

/**
 * Elimina un producto por ID
 * @param {string} id
 */
export const deleteProduct = async (id) => {
    try {
        await deleteDoc(doc(db, "products", id));
        return { success: true };
    } catch (error) {
        console.error("Error eliminando producto: ", error);
        return { success: false, error: error.message };
    }
};

/**
 * Actualiza un producto existente
 * @param {string} id
 * @param {object} productData
 */
export const updateProduct = async (id, productData) => {
    try {
        console.log(`Attempting to update product ${id}`, productData);
        if (!id) throw new Error("ID is required for update");

        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {
            ...productData,
            updatedAt: serverTimestamp()
        });
        console.log(`Product ${id} updated successfully`);
        return { success: true };
    } catch (error) {
        console.error("Error actualizando producto: ", error);
        return { success: false, error: error.message };
    }
};
