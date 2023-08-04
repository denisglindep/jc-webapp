<template>
  <div>
    <v-select
      v-model="selectedCountry"
      :items="countryCodes"
      label="Country Code"
      outlined
      @update:modelValue="onCountryChange"
      name="selectedCountry"
    >
      <!-- <template v-slot:item="{ item }">
        <div>
          <img
            :src="getFlagEmoji(item.value)"
            alt="Flag"
            style="width: 20px; height: 20px; margin-right: 5px"
          />
          {{ item.text }}
        </div>
      </template> -->
    </v-select>
    <v-text-field v-model="phoneNumber" label="Phone Number" outlined></v-text-field>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
import { useField, configure } from 'vee-validate';
// import { required, regex } from '@vee-validate/rules';
// import { getEmojiDataFromNative } from 'emoji-mart-vue';

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `The ${ctx.field} field is required.`,
      phone: 'Invalid phone number format.'
    };
    return messages[ctx.rule.name] || '';
  }
});

const { value: selectedCountry } = useField('selectedCountry');
const { value: phoneNumber, errorMessage: phoneNumberError } = useField('phoneNumber');

// const phoneNumberRules = ref([required, regex]);

// const phoneNumberCounter = ref(15); // Set your desired maximum phone number length here

const countryCodes = [
  { title: '+1 (United States)', value: '1' },
  { title: '+44 (United Kingdom)', value: '44' }
  // Add more country codes as needed
];

// const { handleSubmit } = useForm();

// Validate the phone number format
// phoneNumberRules.value[1] = regex;
// phoneNumberRules.value[1].message = phoneNumberError.value;

// Define a regex pattern for phone number validation (adjust as needed)
// phoneNumberRules.value[1].params = {
//   pattern: /^[0-9]+$/ // Only allow digits in the phone number
// };

// Function to get the flag emoji based on the selected country code
// const getFlagEmoji = (countryCode) => {
//   const countryCodeWithoutPlus = countryCode.replace('+', '');
//   const emojiData = getEmojiDataFromNative(countryCodeWithoutPlus);
//   return emojiData?.native || '';
// };

// Function to handle country code change
const onCountryChange = () => {
  console.log(11, selectedCountry?.value);
  // You can add any additional logic here if needed when the country code changes
};
</script>
