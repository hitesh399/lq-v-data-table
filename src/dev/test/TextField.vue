<template>
    <lq-v-form name="_test" :action="action">
        <lq-v-text-field v-bind="$attrs"/>
    </lq-v-form>
</template>
<script>
export default {
    props: {
        formName: String,
        action: String
    }
}
</script>