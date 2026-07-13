<script setup>
import { useAuthStore } from '@/stores/userAuth.js';
import fancybutton from './fancybutton.vue';
import { getCurrentInstance, reactive, ref, onMounted, onUpdated, watch } from 'vue';
import toast from '@/utility/toast.js';
import { useRouter } from 'vue-router';

const { appContext } = getCurrentInstance()

const rules = appContext.config.globalProperties.$rules;
const userStore= useAuthStore()
const router = useRouter()

const form = ref(null)
const data = reactive({
    name: "",
    username: "",
    password: "",
    email: "",
    dob:"",
    role:"",
})
const roles= ["admin", "user"];

const usernameExists = (value) => {
  return (
    !userStore.userdetails.some(
      user => user.username.toLowerCase() === value.toLowerCase()
    ) || "Username already exists"
  );
};

onMounted(() => {
  console.log("Fetching users !!");
  userStore.fetchUsers();
});

async function save(){
    console.log(userStore.userdetails);
     const { valid } = await form.value.validate();

  if (!valid){
    toast.error("invalid crenditials");
    return;
  } 

  userStore.addUsers(data);
  toast.success("Registered successfully")
  router.push('/')
}

</script>
<template>
    <v-container>
        <v-card>
            <v-card-title>
                Register
            </v-card-title>
            <v-form ref="form" @submit.prevent="save">
                <v-text-field label="Name" placeholder="Enter the name" v-model="data.name" :rules="[rules.required]"></v-text-field>
                <v-text-field label="username" placeholder="Enter the user name"  v-model="data.username" :rules="[rules.required, rules.username, usernameExists]"></v-text-field>
                <v-text-field label="Email" placeholder="Enter the email id"  v-model="data.email" :rules="[rules.required, rules.email]"></v-text-field>
                <v-text-field label="password" placeholder="Enter the password" type="password"  v-model="data.password" :rules="[rules.required, rules.password]"></v-text-field>
                <v-text-field label="DOB" type="date" v-model="data.dob" :rules="[rules.required]"></v-text-field>
                <v-select label="Role" :items="roles" v-model="data.role" :rules="[rules.required]" placeholder="Select a role"></v-select>

                <v-card-actions>
                    <fancybutton variant="flat" color="danger" class="d-flex ml-16" type="submit">
                        register
                    </fancybutton>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>