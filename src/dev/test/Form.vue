<template>
<v-app>
    <lq-v-form name="_test" action="https://www.google.com/">
        <lq-v-mobile-number v-bind="$attrs"/>
        <v-btn color="primary" type="submit" >Submit</v-btn>
    </lq-v-form>
</v-app>
</template>
<script>
export default {
    props: {
        formName: String
    }
}
</script>