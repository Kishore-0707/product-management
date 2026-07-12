<script setup>
import fancybutton from './fancybutton.vue';
</script>
<template>
    <v-container>
        <v-card>
            <v-card-title>
                Register
            </v-card-title>
            <v-form>
                <v-text-field label="Name" placeholder="Enter the name"></v-text-field>
                <v-text-field label="username" placeholder="Enter the user name"></v-text-field>
                <v-text-field label="Email" placeholder="Enter the email id"></v-text-field>
                <v-text-field label="password" placeholder="Enter the password" type="password"></v-text-field>
                <v-text-field label="DOB" ></v-text-field>

                <v-card-actions>
                    <fancybutton variant="flat" color="danger" class="d-flex ml-16">
                        register
                    </fancybutton>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>