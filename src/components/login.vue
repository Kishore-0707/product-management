<script setup>
import Fancybutton from "@/components/fancybutton.vue";
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/userAuth";
import { useRouter } from "vue-router";
import { useRules } from "vuetify/labs/rules";
import { RouterLink } from "vue-router";


const userStore = useAuthStore();
const rules = useRules()
const router = useRouter();

const rolesError = ref("");
const roles = ref(null);
const user = reactive({
  username: "",
  password: "",
});

function Submit() {
  roles.value = userStore.login(user);
  if (roles.value === undefined) {
    rolesError.value = "Invalid login";
  } else {
    router.push("/");
    userStore.currentUser = true;
    rolesError.value = "Login";
  }
}
</script>
<template>
    

    <v-container  style="margin-top: 100px;" class="pa-4 mt-20  justify-center">
    <v-card class="pa-6 " style="width: 900px;">
    <v-form @submit.prevent="Submit()">
      <v-text-field
          v-model="user.username"
          label="Username"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          class="text-field"
          :rules="[rules.required('You have to fill this field ')]"
        />

        <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          class="text-field"
          :rules="[rules.required('You have to fill this field')]"
        />
      <Fancybutton class="buttons" type="submit">login</Fancybutton>
      <p style="color :red" v-if=" roles === undefined">{{ rolesError }}</p>
    </v-form>
    <v-spacer></v-spacer>
    <p style="align-items: center; text-align: center;">Don't have an account? <RouterLink to="/register">register</RouterLink> </p>

    <p>{{ user.username }} {{ user.password }}</p>
    </v-card>

  </v-container>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
  padding: 40px;
  flex-wrap: wrap;
}

.text-field {
  width: 800px;
  padding: 20px 20px 20px 20px;
  margin: 10px;
  font-size: 100px;
}
.buttons {
  justify-content: center;
  align-items: center;
  width: 200%;
  padding-left: 70px;
  padding-right: 70px;
  margin-left: 50%;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}
</style>
