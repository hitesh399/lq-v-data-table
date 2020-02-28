<template>
<v-app>
    <lq-v-form name="_test">
        <lq-v-mobile-number v-bind="$attrs"/>
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