<template>
  <v-text-field
    v-model="searchKey"
    placeholder="Search..."
    clearable
  ></v-text-field>
</template>

<script>

export default {
    data(){
        return {
            searchKey: '',
        };
    }
}
</script>
