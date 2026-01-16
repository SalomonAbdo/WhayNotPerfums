import { db } from "../firebase/client";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

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

