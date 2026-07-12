import { defineStore } from "pinia";
import { useProductStore } from "./product";
import axios from "axios";
import toast from "@/utility/toast";

export const useAuthStore = defineStore("user", {
  state: () => ({
    currentUser: false,
    role: "",
    uid: null,
    userdetails: [],
    
    // { uid : 1, username : "kishore", password : "admin@123", role : "admin"},
    // { uid : 2, username : "user", password : "user@123", role : "user"}
    // ],
  }),
  getters: {},
  actions: {
    async fetchUsers() {
      const response = await axios.get("http://localhost:3000/users");
      this.userdetails = response.data;
      // console.log(this.userdetails);
    },
    login(user) {
      console.log("login function");

      const value = this.userdetails.find(
        (users) => users.username === user.username && users.password === user.password,
      );
      if (value !== undefined) {
        this.role = value.role;
        this.uid = value.uid;
        toast.success("Login Succesfully")
        sessionStorage.setItem("User", JSON.stringify(value));
      }
      else{
        toast.error("Failed to login")
      }

      return value;
    },
    logout() {
      console.log("Logout Excuted");
      this.role = "";
      this.currentUser = false;
      this.uid = null;
      sessionStorage.removeItem("User")
      toast.success("Logout Successfully")
    },
    restore() {
      console.log("Restore Excuted")
      const isUserLogin = JSON.parse(sessionStorage.getItem("User"));
      if (isUserLogin) {
        console.log("USer Reload Excuted")
        this.role = isUserLogin.role;
        this.uid = isUserLogin.uid;
        this.currentUser = true
      }
    },
  },
});
