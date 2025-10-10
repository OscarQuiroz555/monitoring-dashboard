// src/services/firebaseData.js
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * Escucha registros en tiempo real (solo documentos agregados).
 * Mantiene el orden cronológico por timestamp.
 * @param {function} callback - Función que recibe cada registro nuevo.
 * @returns {function} unsubscribe - Función para detener el listener.
 */
export const escucharRegistros = (callback) => {
  if (typeof callback !== "function") {
    console.error("[escucharRegistros] El callback debe ser una función");
    return () => {};
  }

  const ref = collection(db, "TelemetriaPopping/Chiller/Registros");
  const q = query(ref, orderBy("timestamp", "asc")); // ascendente para tiempo real

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          try {
            callback(change.doc.data());
          } catch (error) {
            console.error("[escucharRegistros] Error procesando documento:", error);
          }
        }
      });
    },
    (error) => console.error("[escucharRegistros] onSnapshot error:", error)
  );

  return unsubscribe; // para limpiar cuando el componente se desmonte
};
