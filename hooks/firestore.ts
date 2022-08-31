// import { getDatabase, ref, onValue, set,get,remove } from 'firebase/database';

// const db = getDatabase();

// const getTask = () => {
//     const reference = ref(db, 'tasks/');
//     return get(reference);
// }

// const storeTask = (task:object) => {
//     const reference = ref(db, 'tasks/');
//     return set(reference, { task });
// }

// const updateTask = (taskId:string,task:object) => {
//     const reference = ref(db, 'tasks/'+ taskId);
//     return set(reference, { task });
// }

// const deleteTask = (taskId:string,task:object) => {
//     const reference = ref(db, 'tasks/'+ taskId);
//     return remove(reference);
// }

// export { storeTask,updateTask,deleteTask,getTask }

import { getFirestore, setDoc, doc } from "firebase/firestore";

const firestore = getFirestore();

const setTask = setDoc(doc(firestore, "reacttodoapp-ffe2e", "mario"), {
  employment: "plumber",
  outfitColor: "red",
  specialAttack: "fireball",
});
