// src/services/firebaseData.js
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * Escucha registros en tiempo real.
 * @param {function} callback - Función que recibe cada registro nuevo.
 * @returns {function} unsubscribe - Función para detener el listener.
 */
export const escucharRegistros = (callback) => {
  const ref = collection(db, "TelemetriaPopping/Chiller/Registros");
  const q = query(ref, orderBy("timestamp", "asc")); // ascendente para tiempo real

  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        callback(change.doc.data());
      }
    });
  });

  return unsubscribe; // para limpiar cuando el componente se desmonte
};
