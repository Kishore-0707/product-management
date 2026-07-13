export default {
  install(app) {
    console.log("my plugin Installed");

    app.config.globalProperties.$rules = {
      required: (value) => !!value || "This field is required",

      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email",

      password: (value) => value.length >= 8 || "Password must be atleast 8 characters",

      username: (value) =>
        /^[a-zA-Z0-9_]+$/.test(value) || "Only letters, numbers and underscore are allowed",
    };
  },
};
