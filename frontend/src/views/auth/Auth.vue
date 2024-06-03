<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getRedirectResult, signInWithEmailAndPassword, signOut, } from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'

const router = useRouter()
const route = useRoute()

const auth = useFirebaseAuth() // only exists on client side

const email = ref(null)
const password = ref(null)
const errorMessage = ref()


function signin() {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("succesfully log in");
      router.push(route.query.redirect || '/home/overview')
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      switch (errorCode) {
        case 'auth/missing-email':
            errorMessage.value = "Invalid Email"
            setInterval(() => {
                errorMessage.value = ''
            }, 4000);
            break;
            
            case 'auth/missing-password':
                errorMessage.value = "Password is missing"
                setInterval(() => {
                    errorMessage.value = ''
            }, 4000);
            break;
        case 'auth/too-many-requests':
            errorMessage.value = "Too many request try again later"
            setInterval(() => {
                errorMessage.value = ''
            }, 4000);
            break;
            
        default:
            errorMessage.value = "Email or Pasword Incorrect"
            setInterval(() => {
                errorMessage.value = ''
            }, 4000);
            break;
      }
    });
}

// onMounted(() => {
//   getRedirectResult(auth).catch((reason) => {
//     console.error('Failed redirect result', reason)
//     error.value = reason
//   })
// })
</script>
<template>
    
    <div class=" mx-auto flex flex-col items-center gap-3 drop-shadow-lg">
        <img src="/RMES-logo.png" width="100px" alt="">
        <div class="bg-white flex flex-col items-center rounded-xl px-24 py-14">
            <img src="/avatar.png" width="50px">
            <h4>Welcome, Admin!</h4>
            <p>Sign in to continue</p>
            <div>
                <Message  class="bg-red-200 border-red-400 text-red-600" v-if="errorMessage">{{ errorMessage }}</Message>
                <label for="email" class="block text-900 font-medium mb-2">Email</label>
                <InputText v-model="email" id="email" type="email"  placeholder="Enter your email" class="bg-white w-full mb-5" />
                <label for="password" class="block text-900  font-medium mb-2">Password</label>
                <InputText v-model="password" id="password" type="password" placeholder="Password" class="bg-white w-full mb-5" />
                <div class="flex items-center justify-between mb-5 gap-5">
                    <div class="flex items-center">
                        <Checkbox  id="rememberme1" binary class="mr-2"></Checkbox>
                        <label for="rememberme1">Remember me</label>
                    </div>
                    <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                </div>
                <Button label="Sign In" severity="info" @click="signin" class="w-full bg-blue-600 text-white hover:bg-blue-800"></Button>
            </div>
        </div>
    </div>
</template>