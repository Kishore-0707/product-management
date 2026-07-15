import { defineStore } from "pinia";
import { useProductStore } from "./product";
import axios from "axios";
import toast from "@/utility/toast";
import api from "@/api/services";
import { useLocale } from "vuetify/lib/composables/locale.mjs";

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
      const response = await api.get("/users");
      this.userdetails = response.data;
      console.log(this.userdetails);
    },
    async login(user) {
      console.log("login function");

      try {
        const response = await api.post("/login", user);

        console.log(response.data);

        const { token, user: loggedUser } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        this.uid = loggedUser.uid;
        this.role = loggedUser.role;

        toast.success("Login Successfully");

        return loggedUser;
      } catch (error) {
        toast.error("Invalid username or password");
        console.log(error);
        return null;
      }
    },
    logout() {
      console.log("Logout Excuted");
      this.role = "";
      this.currentUser = false;
      this.uid = null;
      localStorage.removeItem("user");
      toast.success("Logout Successfully");
    },
    restore() {
      console.log("Restore Excuted");
      const isUserLogin = JSON.parse(localStorage.getItem("user"));
      if (isUserLogin) {
        console.log("USer Reload Excuted");
        this.role = isUserLogin.role;
        this.uid = isUserLogin.uid;
        this.currentUser = true;
      }
    },
    async addUsers(users) {
      const newID =
        this.userdetails.length === 0
          ? 1
          : Math.max(...this.userdetails.map((user) => user.uid)) + 1;
      await api.post(`/users`, {
        uid: newID,
        ...users,
      });
    },
  },
});
