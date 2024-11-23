import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, addDoc,  collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword ,onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firebaseConfig = {
    apiKey: "sua_chave_api", //Substitua pela sua chave API
    authDomain: "kritical-firebase.firebaseapp.com",
    projectId: "kritical-firebase",
    storageBucket: "kritical-firebase.firebasestorage.app",
    messagingSenderId: "278815680150",
    appId: "1:278815680150:web:1e505bf422456d18dfc4b7"
  };

  public db;
  public auth;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(app);
    this.auth = getAuth(app);
  }

  loginUsuario(email:string, senha:string):any {
    const res = signInWithEmailAndPassword(this.auth, email, senha);
    return res;
  }

  criaUsuario(email:string, senha:string, gamertag:string):any {
    const res = createUserWithEmailAndPassword(this.auth, email, senha);
    return res;
  }

  userFirestore(uid: string, email: string, senha: string, gamertag: string) {
    const userRef = doc(this.db, 'usuarios', uid);
    return setDoc(userRef, {
      email: email,
      senha: senha,
      gamertag: gamertag,
      dataCadastro: new Date()
    });
  }
  passwordReset(email:string) {
    return sendPasswordResetEmail(this.auth, email); //Chama a função sendPasswordResetEmail
  }

  async adicionaDoc(reviewData: any) {
    try {
      const docRef = await addDoc(collection(this.db, "reviews"), reviewData);  // Aqui a coleção e os dados da avaliação
      console.log("Avaliação enviada com sucesso:", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      throw error;  // Propaga o erro para ser tratado na página
    }
  }

  monitoraAuth(callback: (user: any) => void) {
    onAuthStateChanged(this.auth, callback);
  }
}